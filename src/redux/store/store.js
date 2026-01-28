import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../slice/authSlice/authSlice";
import categorySliceReducer from "../slice/categorySlice";
import checkUserAuthSliceReducer from "../slice/authSlice/checkUserAuthSlice";
import courseSliceReducer from "../slice/couseSlice";
import studentProfileSliceReducer from "../slice/studentSlice";
import contactAuthSliceReducer from "../slice/contactSlice";
import instructorSliceReducer from "../slice/instructorSlice";
import reviewSliceReducer from "../slice/reviewSlice";
import videoSliceReducer from "../slice/videoSlice";
import chargesSliceReducer from "../slice/chargesSlice";
import promocodeSliceReducer from "../slice/promocodeSlice";
import cartSliceReducer from "../slice/cartSlice";
import purchaseSliceReducer from "../slice/purchaseSlice";

const store = configureStore({
    reducer: {
        checkAuth: checkUserAuthSliceReducer,
        auth: authSliceReducer,
        student: studentProfileSliceReducer,
        instructor: instructorSliceReducer,
        category: categorySliceReducer,
        course: courseSliceReducer,
        lecture: videoSliceReducer,
        review: reviewSliceReducer,
        charge: chargesSliceReducer,
        cart: cartSliceReducer,
        promocode: promocodeSliceReducer,
        purchase: purchaseSliceReducer,
        query: contactAuthSliceReducer,
    }
});

export default store;