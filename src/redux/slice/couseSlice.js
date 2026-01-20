import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance/axiosInstance";
import { endPoint_addCourse, endPoint_allCourse, endPoint_categoryWiseCourse, endPoint_sepeficCourse, endPoint_userEnrolledCourse } from "../../api/apiUrl/apiUrl";
import supabase from "../../util/supabase/supabase";

// all course action
export const allCourse = createAsyncThunk('courseSlice/allCourse',
    async () => {
        const res = await axiosInstance.get(endPoint_allCourse);
        // console.log('Response for fetching all course', res);

        return res.data;
    }
)

// category wise course action
export const categoryWiseCourse = createAsyncThunk('courseSlice/categoryWiseCourse',
    async (cat_slag) => {
        // console.log('Receive data in category wise course slice', cat_slag);

        const res = await axiosInstance.get(`${endPoint_categoryWiseCourse}/${cat_slag}`);
        // console.log('Response for fetching category wise course', res);

        return res.data;
    }
)

// add course action
export const createCourse = createAsyncThunk('courseSlice/createCourse',
    async (data) => {
        // console.log('Receive data in add course slice', data);

        let imageUrl = null, imageId = null;
        const file = data?.thumbnail?.[0];
        if (file) {
            const fileName = `${data?.title}_${Date.now()}.${file.name.split(".").pop()}`;
            const { data: uploadData, error: uploadError } = await supabase.storage.from("course").upload(fileName, file, { upsert: true });
            // console.log('Uploading image data', uploadData, ' error', uploadError);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage.from("course").getPublicUrl(fileName);

            imageUrl = publicUrlData.publicUrl;
            imageId = uploadData.path;
        }

        const res = await supabase.from("courses").insert([{ ...data, thumbnail: imageUrl }]).select();
        // console.log('Response for adding course', res);

        if (res.error) return res?.error;

        const courseId = res?.data?.[0]?.id;

        return {
            course: res?.data?.[0],
            course_id: courseId,
        };
    }
)

// user wise course action
export const userWiseCourse = createAsyncThunk('userWiseCourse/createCourse',
    async () => {
        const res = await axiosInstance.get(endPoint_userEnrolledCourse);
        // console.log('Response for user wise course', res);

        return res.data;
    }
)

// // specific course action
// export const specificCourse = createAsyncThunk('courseSlice/specificCourse',
//     async (id) => {
//         console.log('Receive data for specific course',id);

//         const res = await axiosInstance.get(`${endPoint_sepeficCourse}/${id}`);
//         console.log('Response for fetching specific course', res);

//         return res.data;
//     }
// )

const initialState = {
    isCourseLoading: false,
    getCourseData: [],
    isCourseError: null
}

export const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {
        resetCourseState: () => initialState
    },
    extraReducers: (builder) => {

        // all course reducer
        builder.addCase(allCourse.pending, (state, action) => {
            state.isCourseLoading = true;
        })
        builder.addCase(allCourse.fulfilled, (state, action) => {
            state.isCourseLoading = false;
            state.getCourseData = action.payload;
            state.isCourseError = null;
        })
        builder.addCase(allCourse.rejected, (state, action) => {
            state.isCourseLoading = false;
            state.getCourseData = [];
            state.isCourseError = action.error?.message;
        })

        // category wise course reducer
        builder.addCase(categoryWiseCourse.pending, (state, action) => {
            state.isCourseLoading = true;
        })
        builder.addCase(categoryWiseCourse.fulfilled, (state, action) => {
            state.isCourseLoading = false;
            state.getCourseData = action.payload;
            state.isCourseError = null;
        })
        builder.addCase(categoryWiseCourse.rejected, (state, action) => {
            state.isCourseLoading = false;
            state.getCourseData = [];
            state.isCourseError = action.error?.message;
        })

        // add course reducer
        builder.addCase(createCourse.pending, (state, action) => {
            state.isCourseLoading = true;
        })
        builder.addCase(createCourse.fulfilled, (state, action) => {
            state.isCourseLoading = false;
            state.getCourseData = action.payload;
            state.isCourseError = null;
        })
        builder.addCase(createCourse.rejected, (state, action) => {
            state.isCourseLoading = false;
            state.getCourseData = [];
            state.isCourseError = action.error?.message;
        })

        // user wise course reducer
        builder.addCase(userWiseCourse.pending, (state, action) => {
            state.isCourseLoading = true;
        })
        builder.addCase(userWiseCourse.fulfilled, (state, action) => {
            state.isCourseLoading = false;
            state.getCourseData = action.payload;
            state.isCourseError = null;
        })
        builder.addCase(userWiseCourse.rejected, (state, action) => {
            state.isCourseLoading = false;
            state.getCourseData = [];
            state.isCourseError = action.error?.message;
        })

        // // specific course reducer
        // builder.addCase(specificCourse.pending, (state, action) => {
        //     state.isCourseLoading = true;
        // })
        // builder.addCase(specificCourse.fulfilled, (state, action) => {
        //     state.isCourseLoading = false;
        //     state.getCourseData = action.payload;
        //     state.isCourseError = null;
        // })
        // builder.addCase(specificCourse.rejected, (state, action) => {
        //     state.isCourseLoading = false;
        //     state.getCourseData = [];
        //     state.isCourseError = action.error?.message;
        // })

    }
});

export default courseSlice.reducer;

export const { resetCourseState } = courseSlice.actions;