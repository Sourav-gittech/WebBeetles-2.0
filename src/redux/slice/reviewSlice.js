import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../util/supabase/supabase";

// add review action 
export const addReviewRequest = createAsyncThunk("review/addReview",
    async ({ review_obj }, { rejectWithValue }) => {
        console.log('Review data', review_obj);

        const res = await supabase.from("course_reviews").upsert({ review_obj }, { onConflict: "course_id,student_id" }).select().single();
        console.log('Response for adding review', res);

        if (res?.error) return rejectWithValue(res?.error.message);
        return res?.data;
    }
);


// Fetch review action
export const fetchReviewsRequest = createAsyncThunk("review/fetchReviews",

    async ({ course_id, student_id }, { rejectWithValue }) => {
        console.log('Received course review details data', course_id, student_id);

        let query = supabase.from("course_reviews").select("*").eq("course_id", course_id).order("created_at", { ascending: false });

        if (student_id) {
            query = query.eq("student_id", student_id).single();
        }

        const res = await query;
        console.log('Response for fetching course review', res);

        if (res?.error && res?.error.code !== "PGRST116") {
            return rejectWithValue(res?.error.message);
        }

        return res?.data;
    }
);

const initialState = {
    isReviewPending: false,
    getReviewData: [],
    isReviewError: null
}

export const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            // add review slice 
            .addCase(addReviewRequest.pending, (state, action) => {
                state.isReviewPending = true;
            })
            .addCase(addReviewRequest.fulfilled, (state, action) => {
                state.isReviewPending = false;
                state.getReviewData = action.payload;
                state.isReviewError = null;
            })
            .addCase(addReviewRequest.rejected, (state, action) => {
                state.isReviewPending = false;
                state.getReviewData = [];
                state.isReviewError = action.error?.message;
            })

            // fetch review slice 
            .addCase(fetchReviewsRequest.pending, (state, action) => {
                state.isReviewPending = true;
            })
            .addCase(fetchReviewsRequest.fulfilled, (state, action) => {
                state.isReviewPending = false;
                state.getReviewData = action.payload;
                state.isReviewError = null;
            })
            .addCase(fetchReviewsRequest.rejected, (state, action) => {
                state.isReviewPending = false;
                state.getReviewData = [];
                state.isReviewError = action.error?.message;
            })
    }
})

export default reviewSlice.reducer;