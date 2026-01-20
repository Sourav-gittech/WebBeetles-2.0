import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addVideo = createAsyncThunk('videoSlice/addVideo',
    async (video, { rejectWithValue }) => {

    }
)

const initialState = {
    isVideoLoading: false,
    videoData: [],
    hasVideoError: null
}

export const videoSlice = createSlice({
    name: 'videoSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //add video
            .addCase(addVideo.pending, (state, action) => {
                state.isVideoLoading = true;
            })
            .addCase(addVideo.fulfilled, (state, action) => {
                state.isVideoLoading = false;
                state.videoData = action.payload;
                state.hasVideoError = null;
            })
            .addCase(addVideo.rejected, (state, action) => {
                state.isVideoLoading = false;
                state.videoData = null;
                state.hasVideoError = action.payload;
            })
    }
})

export default videoSlice.reducer;