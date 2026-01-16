import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../util/supabase";
import { checkLoggedInStudent } from "./authSlice/checkStudentAuthSlice";

// update student profile action 
export const updateStudentProfile = createAsyncThunk("studentProfileSlice/updateStudentProfile",
    async ({ data, id }, { rejectWithValue, dispatch }) => {
        // console.log('update data', data, ' student Id', id);

        try {
            const file = data.profile_image;
            if (!file) return rejectWithValue("No file provided");

            // Fetch existing student profile
            const { data: student, error: fetchErr } = await supabase.from("students").select("profile_image").eq("id", id).single();
            // console.log('Fetched profile image', student);

            if (fetchErr) throw fetchErr;

            // delete old image from bucket
            if (student?.profile_image) {
                await supabase.storage.from("student").remove(student?.profile_image);
            }

            // Create new filename
            const ext = file.name.split(".").pop();
            const newFileName = `${id}_${Date.now()}.${file.name.split(".").pop()}.${ext}`;

            // Upload new file
            const res = await supabase.storage.from("student").upload(newFileName, file, { upsert: true });

            if (res.error) throw res.error;
            // console.log('upload data', res.data);

            const image_name = res?.data?.path;

            // Get public URL
            const { data: publicUrlData } = supabase.storage.from("student").getPublicUrl(newFileName);

            const publicUrl = publicUrlData.publicUrl;

            // Update DB with PUBLIC URL again
            const { data: updatedUser, error: updateErr } = await supabase.from("students").update({
                profile_image_url: publicUrl,
                profile_image: image_name,
            }).eq("id", id).select().single();

            if (updateErr) throw updateErr;
            dispatch(checkLoggedInStudent());
            
            return updatedUser;
        } catch (err) {
            console.error("Error updating profile:", err);
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    isStudentLoading: false,
    getStudentData: {},
    isStudentError: null,
};

export const studentProfileSlice = createSlice({
    name: "studentProfileSlice",
    initialState,
    extraReducers: (builder) => {
        // update user profile reducer 
        builder.addCase(updateStudentProfile.pending, (state) => {
            state.isStudentLoading = true;
        })
        builder.addCase(updateStudentProfile.fulfilled, (state, action) => {
            state.isStudentLoading = false;
            state.getStudentData = action.payload;
            state.isStudentError = null;
        })
        builder.addCase(updateStudentProfile.rejected, (state, action) => {
            state.isStudentLoading = false;
            state.getStudentData = {};
            state.isStudentError = action.error?.message;
        })
    },
});

export default studentProfileSlice.reducer;