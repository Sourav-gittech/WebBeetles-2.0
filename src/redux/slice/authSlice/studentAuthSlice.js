import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../../util/supabase";

// register action
export const studentRegister = createAsyncThunk('studentAuthSlice/studentRegister',
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Data received for student registration', data);

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password
            });

            if (authError) throw authError;
            const userId = authData?.user?.id;

            // Upload profile image if present
            let imageUrl = null, imageId = null;
            const file = data.profile_image;
            if (file) {
                const fileName = `${userId}_${Date.now()}.${file.name.split(".").pop()}`;
                const { data: uploadData, error: uploadError } = await supabase.storage.from("student").upload(fileName, file, { upsert: true });
                // console.log('Uploading image data', uploadData, ' error', uploadError);

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage.from("student").getPublicUrl(fileName);

                imageUrl = publicUrlData.publicUrl;
                imageId = uploadData.path;
            }

            // Insert into public.users table 
            const res = await supabase.from("students").insert([{
                id: userId,
                name: data.name,
                email: data.email,
                profile_image_url: imageUrl,
                profile_image: imageId,
                is_verified: "pending",
                is_blocked: false,
                created_at: new Date(),
                updated_at: new Date(),
            }]);

            if (res.error) throw res.error;

            // console.log('Response for student registration', res.data);

            return res.data;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue({ message: err.message });
            }
        }
    }
)

// verify-email action
export const studentEmailVerify = createAsyncThunk('studentAuthSlice/studentEmailVerify',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            // Verify OTP with Supabase
            const { data, error } = await supabase.auth.verifyOtp({
                email: email,
                token: otp,
                type: 'email',
            });

            if (error) {
                // On failed OTP verification → mark rejected if still pending
                const { data: student } = await supabase.from("students").select("is_verified").eq("email", email).single();

                if (student?.is_verified === "pending") {
                    await supabase.from("students").update({ is_verified: "rejected" }).eq("email", email);
                }

                throw error;
            }

            // OTP success → mark fulfilled if still pending
            const { data: student } = await supabase.from("students").select("is_verified").eq("email", email).single();

            if (student?.is_verified === "pending" || student?.is_verified === "rejected") {
                await supabase.from("students").update({ is_verified: "fulfilled" }).eq("email", email);
            }

            return data;
        } catch (err) {
            return rejectWithValue({ message: err.message });
        }
    }
)

// login action
export const studentLogin = createAsyncThunk('studentAuthSlice/studentLogin',
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Data received for user login', data);

            const res = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            if (res.error) throw res.error;

            // console.log('Response for user login', res);

            return res.data;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue({ message: err.message });
            }
        }
    }
)

// forget password action
export const studentForgetPassword = createAsyncThunk('studentAuthSlice/studentForgetPassword',
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Data received for forget password', data);

            // Check if user exists 
            const { data: existingUser, error: fetchError } = await supabase.from("students").select("email").eq("email", data.email).single();

            if (!existingUser) {
                return rejectWithValue({
                    message: "No account found with this email."
                });
            }

            const res = await supabase.auth.signInWithOtp({
                email: data.email,
                options: {
                    emailRedirectTo: undefined,
                }
            });
            // console.log('Response for forget password', res);

            return res.data;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue({ message: err.message });
            }
        }
    }
)

// reset password action
// export const studentResetPassword = createAsyncThunk('studentAuthSlice/studentResetPassword',
//     async (data, { rejectWithValue }) => {
//         try {
//             console.log('Data received for reset password', data);

//             // Verify OTP
//             const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
//                 type: "email",
//                 email: data.email,
//                 token: data.otp,
//             });

//             if (verifyError) throw verifyError;

//             // Update password
//             const res = await supabase.auth.updateUser({
//                 password: data.newPassword,
//             });

//             if (res.error) throw res.error;
//             console.log('Response for reset password', res);

//             return res.data;
//         } catch (err) {
//             if (err.response && err.response.data) {
//                 return rejectWithValue(err.response.data);
//             } else {
//                 return rejectWithValue({ message: err.message });
//             }
//         }
//     }
// )


// verify OTP action
export const verifyOtpForReset = createAsyncThunk("studentAuthSlice/verifyOtpForReset",
    async (data, { rejectWithValue }) => {
        // console.log('Received data for OTP verification in slice', data);

        const { data: verifyData, error } = await supabase.auth.verifyOtp({
            type: "email",
            email: data.email,
            token: data.otp,
        });

        if (error) {
            return rejectWithValue({ message: "Invalid or expired OTP" });
        }

        // Return session so frontend can store it
        return verifyData.session;
    }
);

// reset password action
export const studentResetPassword = createAsyncThunk("studentAuthSlice/studentResetPassword",
    async (data, { rejectWithValue, getState, dispatch }) => {
        try {
            let session = getState().studentAuth.otpSession; // stored previously
            // console.log('session', session);

            // If session is missing → dispatch OTP verification
            if (!session) {
                const otpAction = await dispatch(verifyOtpForReset(data));

                if (otpAction.meta.requestStatus === "rejected") {
                    return rejectWithValue({ message: "Invalid or expired OTP" });
                }
                session = otpAction.payload; // session returned from verifyOtpForReset
            }

            if (!session) {
                return rejectWithValue({
                    message: "Session expired. Please request OTP again.",
                });
            }

            // Update user password
            const res = await supabase.auth.updateUser(
                { password: data.newPassword }
            );
            // console.log('Response for updating password', res);

            if (res.error) {
                if (res.error.message.includes("New password should be different from the old password.")) {
                    return rejectWithValue({
                        message: "New password cannot be the same as old password",
                    });
                }

                return rejectWithValue({
                    message: "An error occurred. Try again.",
                });
            }
            return res.data;
        } catch (err) {
            return rejectWithValue({ message: err.message });
        }
    }
);

// resend otp action
export const studentResendOTP = createAsyncThunk('studentAuthSlice/studentResendOTP',
    async (data, { rejectWithValue }) => {
        try {
            // console.log("Resending verification email for:", data.email);

            const { data: resendData, error } = await supabase.auth.resend({
                type: "signup",
                email: data.email,
            });

            if (error) throw error;

            // console.log("Resend email response:", resendData);

            return { message: "Verification email resent successfully." };
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue({ message: err.message });
            }
        }
    }
)


const initialState = {
    isStudentAuthLoading: false,
    getStudentAuthData: [],
    otpSession: null,
    isStudentAuthError: null
}

export const studentAuthSlice = createSlice({
    name: 'studentAuthSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            // register reducer
            .addCase(studentRegister.pending, (state, action) => {
                state.isStudentAuthLoading = true;
            })
            .addCase(studentRegister.fulfilled, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = action.payload;
                state.isStudentAuthError = null;
            })
            .addCase(studentRegister.rejected, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = [];
                state.isStudentAuthError = action.error?.message;
            })

            // email verify reducer
            .addCase(studentEmailVerify.pending, (state, action) => {
                state.isStudentAuthLoading = true;
            })
            .addCase(studentEmailVerify.fulfilled, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = action.payload;
                state.isStudentAuthError = null;
            })
            .addCase(studentEmailVerify.rejected, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = [];
                state.isStudentAuthError = action.error?.message;
            })

            // login reducer
            .addCase(studentLogin.pending, (state, action) => {
                state.isStudentAuthLoading = true;
            })
            .addCase(studentLogin.fulfilled, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = action.payload;
                state.isStudentAuthError = null;
            })
            .addCase(studentLogin.rejected, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = [];
                state.isStudentAuthError = action.error?.message;
            })

            // forget password reducer
            .addCase(studentForgetPassword.pending, (state, action) => {
                state.isStudentAuthLoading = true;
            })
            .addCase(studentForgetPassword.fulfilled, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = action.payload;
                state.isStudentAuthError = null;
            })
            .addCase(studentForgetPassword.rejected, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = [];
                state.isStudentAuthError = action.error?.message;
            })

            // reset password reducer
            .addCase(studentResetPassword.pending, (state, action) => {
                state.isStudentAuthLoading = true;
            })
            .addCase(studentResetPassword.fulfilled, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = action.payload;
                state.otpSession = null;
                state.isStudentAuthError = null;
            })
            .addCase(studentResetPassword.rejected, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = [];
                state.isStudentAuthError = action.error?.message;
            })

            // verify OTP reducer
            .addCase(verifyOtpForReset.pending, (state, action) => {
                state.isStudentAuthLoading = true;
            })
            .addCase(verifyOtpForReset.fulfilled, (state, action) => {
                state.isStudentAuthLoading = false;
                state.otpSession = action.payload;
            })
            .addCase(verifyOtpForReset.rejected, (state, action) => {
                state.isStudentAuthLoading = false;
                state.otpSession = null;
            })

            // resend OTP reducer
            .addCase(studentResendOTP.pending, (state, action) => {
                state.isStudentAuthLoading = true;
            })
            .addCase(studentResendOTP.fulfilled, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = action.payload;
                state.isStudentAuthError = null;
            })
            .addCase(studentResendOTP.rejected, (state, action) => {
                state.isStudentAuthLoading = false;
                state.getStudentAuthData = [];
                state.isStudentAuthError = action.error?.message;
            })
    }
});

export default studentAuthSlice.reducer;