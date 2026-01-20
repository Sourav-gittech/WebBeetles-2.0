import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../slice/authSlice/authSlice";
import categorySliceReducer from "../slice/categorySlice";
import checkUserAuthSliceReducer from "../slice/authSlice/checkUserAuthSlice";
import courseSliceReducer from "../slice/couseSlice";
import studentProfileSliceReducer from "../slice/studentSlice";
import specificCourseSliceReducer from "../slice/specificCourseSlice";
import specificCategorySliceReducer from "../slice/specificCategorySlice";
import contactAuthSliceReducer from "../slice/contactSlice";
import specificInstructorSliceReducer from "../slice/specificInstructorSlice";
import instructorSliceReducer from "../slice/instructorSlice";
import reviewSliceReducer from "../slice/reviewSlice";
import videoSliceReducer from "../slice/videoSlice";

const store = configureStore({
    reducer: {
        checkAuth: checkUserAuthSliceReducer,
        auth: authSliceReducer,
        student: studentProfileSliceReducer,
        category: categorySliceReducer,
        course: courseSliceReducer,
        specificCourse: specificCourseSliceReducer,
        specificCategory: specificCategorySliceReducer,
        query: contactAuthSliceReducer,
        review: reviewSliceReducer,
        instructor: instructorSliceReducer,
        specificInstructor: specificInstructorSliceReducer,
        lecture: videoSliceReducer
    }
});

export default store;