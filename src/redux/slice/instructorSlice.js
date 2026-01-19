import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance/axiosInstance";
import { endPoint_allInstructor, endPoint_editInstructorProfile, endPoint_requestInstructor, endPoint_requestInstructorStatus, endPoint_sepeficInstructor } from "../../api/apiUrl/apiUrl";
import supabase from "../../util/supabase/supabase";

// request instructor action 
export const instructorRequest = createAsyncThunk('instructorSlice/instructorRequest',
    async ({ payload, id }, { rejectWithValue }) => {
        // console.log('Received data in instructor request slice', payload,id);

        // Upload document if present
        let docUrl = null, docId = null;
        const document = payload.document;

        if (document) {
            const fileName = `doc_${id}_${Date.now()}.${document.name.split(".").pop()}`;
            const { data: uploadData, error: uploadError } = await supabase.storage.from("instructor/document").upload(fileName, document, { upsert: true });
            // console.log('Uploading document data', uploadData, ' error', uploadError);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage.from("instructor/document").getPublicUrl(fileName);

            docUrl = publicUrlData.publicUrl;
            docId = uploadData.path;
        }

        const instructorData = {
            document: docUrl,
            bio: payload?.bio,
            expertise: payload?.expertise,
            social_links: payload?.social_links,
            application_complete: true
        }
        const res = await supabase.from("instructors").update(instructorData).eq('id', id).select().single();
        // console.log('Response from instructor request slice', res);

        if (res?.error) {
            return rejectWithValue(res?.error.message);
        }
        return res.data;
    });


// request status action 
export const instructorRequestStatus = createAsyncThunk('instructorSlice/instructorRequestStatus',
    async (data) => {
        console.log('Received data in instructor request status slice', data);

        const res = await axiosInstance.post(endPoint_requestInstructorStatus, data);
        console.log('Response from instructor request status slice', res);

        return res.data;
    });

// all instructor action 
export const allInstructor = createAsyncThunk('instructorSlice/allInstructor',
    async () => {
        const res = await axiosInstance.get(endPoint_allInstructor);
        // console.log('Response from all instructor slice', res);

        return res.data;
    });

// specific instructor action 
export const specificInstructor = createAsyncThunk('instructorSlice/specificInstructor',
    async (id) => {
        // console.log('Received data in specific instructor details slice', id);

        const res = await axiosInstance.get(`${endPoint_sepeficInstructor}/${id}`);
        // console.log('Response from specific instructor slice', res);

        return res.data;
    });

// Update instructor action 
export const updateInstructor = createAsyncThunk('updateInstructor/specificInstructor',
    async ({ data, id }, { rejectWithValue, dispatch }) => {
        // console.log('update data', data, ' instructor Id', id);

        try {
            // Fetch existing instructor profile
            const { data: instructor, error: fetchErr } = await supabase.from("instructors").select("profile_image").eq("id", id).single();
            // console.log('Fetched profile image', instructor);

            if (fetchErr) throw fetchErr;

            // Create new filename
            let image_name, publicUrl;
            if (data?.profileImage) {

                const file = data.profileImage;
                const newFileName = `${id}_${Date.now()}.${file.name.split(".").pop()}`;

                // delete old image from bucket
                const res1 = await supabase.storage.from("instructor").remove([`image/${instructor.profile_image}`]);

                // Upload new file
                const res = await supabase.storage.from("instructor/image").upload(newFileName, file, { upsert: true });

                if (res.error) throw res.error;
                // console.log('upload data', res.data);

                image_name = res?.data?.path;

                // Get public URL
                const { data: publicUrlData } = supabase.storage.from("instructor/image").getPublicUrl(newFileName);

                publicUrl = publicUrlData.publicUrl;
            }

            // Update DB with PUBLIC URL again
            const res = await supabase.from("instructors").update({
                profile_image_url: data?.profileImage ? publicUrl : data.profile_image_url,
                profile_image: data?.profileImage ? image_name : data.profile_image,
                bio: data?.bio,
                expertise: data?.expertise,
                social_links: data?.social_links
            }).eq("id", id).select().single();
            // console.log('Response after updating instructor data', res);

            if (res?.error) throw res?.error;

            return res?.data;
        } catch (err) {
            console.error("Error updating profile:", err);
            return rejectWithValue(err.message);
        }
    }
);


const initialState = {
    isInstructorPending: false,
    isInstructorLoading: false,
    getInstructorData: [],
    isInstructorError: null
}

export const instructorSlice = createSlice({
    name: 'instructorSlice',
    initialState,
    extraReducers: (builder) => {
        // request instructor slice 
        builder.addCase(instructorRequest.pending, (state, action) => {
            state.isInstructorLoading = true;
        })
        builder.addCase(instructorRequest.fulfilled, (state, action) => {
            state.isInstructorLoading = false;
            state.getInstructorData = action.payload;
            state.isInstructorError = null;
        })
        builder.addCase(instructorRequest.rejected, (state, action) => {
            state.isInstructorLoading = false;
            state.getInstructorData = [];
            state.isInstructorError = action.error?.message;
        })

        // instructor request status slice 
        builder.addCase(instructorRequestStatus.pending, (state, action) => {
            state.isInstructorLoading = true;
        })
        builder.addCase(instructorRequestStatus.fulfilled, (state, action) => {
            state.isInstructorLoading = false;
            state.getInstructorData = action.payload;
            state.isInstructorError = null;
        })
        builder.addCase(instructorRequestStatus.rejected, (state, action) => {
            state.isInstructorLoading = false;
            state.getInstructorData = [];
            state.isInstructorError = action.error?.message;
        })

        // all instructor slice 
        builder.addCase(allInstructor.pending, (state, action) => {
            state.isInstructorLoading = true;
        })
        builder.addCase(allInstructor.fulfilled, (state, action) => {
            state.isInstructorLoading = false;
            state.getInstructorData = action.payload;
            state.isInstructorError = null;
        })
        builder.addCase(allInstructor.rejected, (state, action) => {
            state.isInstructorLoading = false;
            state.getInstructorData = [];
            state.isInstructorError = action.error?.message;
        })

        // specific instructor slice 
        builder.addCase(specificInstructor.pending, (state, action) => {
            state.isInstructorLoading = true;
        })
        builder.addCase(specificInstructor.fulfilled, (state, action) => {
            state.isInstructorLoading = false;
            state.getInstructorData = action.payload;
            state.isInstructorError = null;
        })
        builder.addCase(specificInstructor.rejected, (state, action) => {
            state.isInstructorLoading = false;
            state.getInstructorData = [];
            state.isInstructorError = action.error?.message;
        })

        // update instructor slice 
        builder.addCase(updateInstructor.pending, (state, action) => {
            state.isInstructorLoading = true;
        })
        builder.addCase(updateInstructor.fulfilled, (state, action) => {
            state.isInstructorLoading = false;
            state.getInstructorData = { ...state.getInstructorData, ...action.payload };
            state.isInstructorError = null;
        })
        builder.addCase(updateInstructor.rejected, (state, action) => {
            state.isInstructorLoading = false;
            state.getInstructorData = [];
            state.isInstructorError = action.error?.message;
        })

    }
})

export default instructorSlice.reducer;