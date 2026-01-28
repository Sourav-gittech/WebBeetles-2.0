import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../util/supabase/supabase";

export const makePayment = createAsyncThunk('paymentSlice/makePayment',
    async ({ orderId, payment_status }) => {
        // console.log('Received data in payment slice', orderId, payment_status);

        const res = await supabase.from('purchases').update({ payment_status: payment_status }).eq('razorpay_order_id', orderId).select().single();
        // console.log('Response from payment slice', res);

        if (res.error) throw res.error;

        return res.data;
    });


const initialState = {
    isPaymentPending: false,
    getPaymentData: {},
    isPaymentError: null
}

export const paymentSlice = createSlice({
    name: 'paymentSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(makePayment.pending, (state, action) => {
            state.isPaymentPending = true;
        })
        builder.addCase(makePayment.fulfilled, (state, action) => {
            state.isPaymentPending = false;
            state.getPaymentData = action.payload;
            state.isPaymentError = null;
        })
        builder.addCase(makePayment.rejected, (state, action) => {
            state.isPaymentPending = false;
            state.getPaymentData = [];
            state.isPaymentError = action.error?.message;
        })
    }
})

export default paymentSlice.reducer;