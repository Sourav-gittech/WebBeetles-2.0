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
    async (data) => {
        // console.log('Received data in update instructor details slice', data);

        const res = await axiosInstance.post(endPoint_editInstructorProfile, data);
        // console.log('Response from Update instructor slice', res);

        return res.data;
    });


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