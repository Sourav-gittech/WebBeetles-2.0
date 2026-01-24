import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance/axiosInstance";
import { endPoint_addCourse, endPoint_allCourse, endPoint_categoryWiseCourse, endPoint_sepeficCourse, endPoint_userEnrolledCourse } from "../../api/apiUrl/apiUrl";
import supabase from "../../util/supabase/supabase";

// all course action
export const allCourse = createAsyncThunk('courseSlice/allCourse',
    async ({ category_id, instructor_id, is_active, status }, { rejectWithValue }) => {

        let query = supabase.from("courses").select(`id,title,description,price,status,thumbnail,created_at,is_active,is_completed,
                    is_exam_scheduled,category:categories (id,name,description,category_image,status),
                    instructor:instructors (id,name,email,profile_image_url,bio,expertise,social_links,is_verified,application_status)
                    `).order("created_at", { ascending: false });

        if (category_id) {
            query = query.eq('category_id', category_id);
        }

        if (instructor_id) {
            query = query.eq('instructor_id', instructor_id);
        }

        if (is_active) {
            query = query.eq('is_active', is_active);
        }

        if (status) {
            query = query.eq('status', status);
        }

        const res = await query;
        console.log('Response for fetching all course', res);

        if (res?.error) return rejectWithValue(res?.error.message);
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