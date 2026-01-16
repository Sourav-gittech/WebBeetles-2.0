import { configureStore } from "@reduxjs/toolkit";
import studentAuthSliceReducer from "../slice/authSlice/studentAuthSlice";
import categorySliceReducer from "../slice/categorySlice";
import checkStudentAuthSliceReducer from "../slice/authSlice/checkStudentAuthSlice";
import courseSliceReducer from "../slice/couseSlice";
import studentProfileSliceReducer from "../slice/studentSlice";
import specificCourseSliceReducer from "../slice/specificCourseSlice";
import specificCategorySliceReducer from "../slice/specificCategorySlice";
import contactAuthSliceReducer from "../slice/contactSlice";
import specificInstructorSliceReducer from "../slice/specificInstructorSlice";
import instructorSliceReducer from "../slice/instructorSlice";
import reviewSliceReducer from "../slice/reviewSlice";

const store = configureStore({
    reducer: {
        checkAuth: checkStudentAuthSliceReducer,
        studentAuth: studentAuthSliceReducer,
        student: studentProfileSliceReducer,
        category: categorySliceReducer,
        course: courseSliceReducer,
        specificCourse: specificCourseSliceReducer,
        specificCategory: specificCategorySliceReducer,
        query: contactAuthSliceReducer,
        review: reviewSliceReducer,
        instructor: instructorSliceReducer,
        specificInstructor: specificInstructorSliceReducer
    }
});

export default store;