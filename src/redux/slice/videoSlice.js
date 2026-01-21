import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../util/supabase/supabase";

export const addVideo = createAsyncThunk('videoSlice/addVideo',
    async (data, { rejectWithValue }) => {
        // console.log('Receive data in add video slice', data);

        let videoUrl = null, imageId = null;
        const file = data.video_url;
        if (file) {
            const fileName = `${data?.course_id}_${Date.now()}.${file.name.split(".").pop()}`;
            const { data: uploadData, error: uploadError } = await supabase.storage.from("lecture").upload(fileName, file, { upsert: true });
            // console.log('Uploading image data', uploadData, ' error', uploadError);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage.from("lecture").getPublicUrl(fileName);

            videoUrl = publicUrlData.publicUrl;
            imageId = uploadData.path;
        }

        const res = await supabase.from("lectures").insert([{ ...data, video_url: videoUrl }]);
        // console.log('Response for adding video', res);

        if (res.error) return rejectWithValue(res?.error?.message);

        return res.data;
    }
)

export const fetchVideo = createAsyncThunk("videoSlice/fetchVideo",
    async ({ course_id, status }, { rejectWithValue }) => {
        try {
            // console.log('Fetching video details', course_id, status);
            let query = supabase.from("lectures").select("*").eq("course_id", course_id).order("created_at", { ascending: true });

            if (status) {
                query = query.eq("status", status);
            }

            const res = await query;
            // console.log('Response for fetching lecture videos', res);

            if (res?.error) throw res?.error;

            return res?.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


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