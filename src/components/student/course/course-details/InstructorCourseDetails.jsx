import React, { useEffect, useState } from 'react';
import { HiArrowRight } from "react-icons/hi";
import { RiBookOpenLine } from "react-icons/ri";
import { FaRegClock, FaMobileAlt, FaCertificate } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import Lottie from "lottie-react";
import loaderAnimation from '../../../../assets/animations/loader.json';
import ReviewCourse from './ReviewCourse';
import { useDispatch, useSelector } from 'react-redux';
import getSweetAlert from '../../../../util/alert/sweetAlert';
import { useNavigate } from "react-router-dom";
import { checkLoggedInUser } from '../../../../redux/slice/authSlice/checkUserAuthSlice';
import { Loader2 } from 'lucide-react';
import { makePayment } from '../../../../redux/slice/paymentSlice';

const CREATE_ORDER_URL = "https://eqmsrzosavtfxwmpipii.functions.supabase.co/create-order";
const VERIFY_PAYMENT_URL = "https://eqmsrzosavtfxwmpipii.functions.supabase.co/verify-payment";

const InstructorCourseDetails = ({ courseData: getSpecificCourseData }) => {
    const dispatch = useDispatch(),
        navigate = useNavigate(),
        [paymentActive, setPaymentActive] = useState(false),
        { userAuthData } = useSelector(state => state.checkAuth);

    useEffect(() => {
        dispatch(checkLoggedInUser()).catch(err => {
            console.error("Error occurred", err);
            getSweetAlert("Error", "Something went wrong.", "error");
        });
    }, []);

    // Load Razorpay SDK dynamically
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Handle payment process
    const handlePayment = async () => {
        if (!getSpecificCourseData?.id) return;

        const sdkLoaded = await loadRazorpay();
        if (!sdkLoaded) {
            getSweetAlert("Error", "Razorpay failed to load. Please check your internet.", "error");
            return;
        }

        try {
            setPaymentActive(true);

            const token = sessionStorage.getItem('student_token');

            // Create order via Supabase function
            // console.log("Creating order...");
            const orderRes = await fetch(CREATE_ORDER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ courseId: getSpecificCourseData.id })
            });
            // console.log("Order response object:", orderRes);

            if (!orderRes.ok) {
                const err = await orderRes.text();
                throw new Error(err || "Failed to create order");
            }

            const paymentRes = await orderRes.json();
            // console.log("Order response JSON:", paymentRes);

            // Open Razorpay checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: paymentRes.amount,
                currency: paymentRes.currency,
                name: "WebBeetles",
                description: "Course Purchase",
                order_id: paymentRes.orderId,
                prefill: {
                    name: paymentRes.user?.name || "User",
                    email: paymentRes.user?.email || "user@example.com",
                },
                theme: { color: "#7C3AED" },
                handler: async function (response) {
                    // Verify payment via Supabase function
                    try {
                        const verifyRes = await fetch(VERIFY_PAYMENT_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                ...response,
                                courseId: getSpecificCourseData.id
                            })
                        });

                        const result = await verifyRes.json();

                        if (verifyRes.ok) {
                            dispatch(makePayment({ orderId: paymentRes?.orderId, payment_status: 'success' }))
                                .then(res => {
                                    // console.log('Response for payment status', res);

                                    if (res.meta.requestStatus === "fulfilled") {

                                        getSweetAlert("Success!", "Payment completed successfully!", "success");
                                        setTimeout(() => navigate("/student/dashboard"), 1500);
                                    } else {
                                        getSweetAlert('Oops...', res.payload, 'info');
                                    }
                                })
                                .catch(err => {
                                    console.log('Error occured', err);
                                    getSweetAlert('Oops...', 'Something went wrong!', 'error');
                                });
                        } else {
                            dispatch(makePayment({ orderId: paymentRes?.orderId, payment_status: 'failed' }))
                                .then(res => {
                                    // console.log('Response for payment status', res);

                                    if (res.meta.requestStatus === "fulfilled") {

                                        //  console.error("Payment verification failed:", result);
                                        getSweetAlert("Oops...", "Payment verification failed!", "error");
                                    } else {
                                        getSweetAlert('Oops...', res.payload, 'info');
                                    }
                                })
                                .catch(err => {
                                    console.log('Error occured', err);
                                    getSweetAlert('Oops...', 'Something went wrong!', 'error');
                                });
                        }
                    } catch (err) {
                        dispatch(makePayment({ orderId: paymentRes?.orderId, payment_status: 'failed' }))
                            .then(res => {
                                // console.log('Response for payment status', res);

                                if (res.meta.requestStatus === "fulfilled") {

                                    // console.error("Verification error:", err);
                                    getSweetAlert("Error", "Payment verification failed.", "error");
                                } else {
                                    getSweetAlert('Oops...', res.payload, 'info');
                                }
                            })
                            .catch(err => {
                                console.log('Error occured', err);
                                getSweetAlert('Oops...', 'Something went wrong!', 'error');
                            });
                    }
                }
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", (err) => {
                dispatch(makePayment({ orderId: paymentRes?.orderId, payment_status: 'failed' }))
                    .then(res => {
                        // console.log('Response for payment status', res);

                        if (res.meta.requestStatus === "fulfilled") {

                            // console.error("Payment failed:", err);
                            getSweetAlert("Failed", "Payment was not completed.", "error");
                        } else {
                            getSweetAlert('Oops...', res.payload, 'info');
                        }
                    })
                    .catch(err => {
                        console.log('Error occured', err);
                        getSweetAlert('Oops...', 'Something went wrong!', 'error');
                    });
            });

            rzp.open();

        } catch (err) {
            console.error("Payment error:", err);
            getSweetAlert("Error", "Failed to initiate payment.", "error");
        }
        finally {
            setPaymentActive(false);
        }
    };

    return (
        <div className="bg-black p-6 rounded-3xl shadow-lg text-white">
            {!getSpecificCourseData?.instructor ? (
                <div className="flex justify-center items-center min-h-[70vh]">
                    <Lottie
                        animationData={loaderAnimation}
                        loop={true}
                        className="w-40 h-40 sm:w-52 sm:h-52"
                    />
                </div>
            ) : (
                <>
                    <h3 className="text-lg font-semibold mb-4">Instructor</h3>
                    <div className="flex items-center gap-3 mb-6">
                        <img
                            src={getSpecificCourseData?.instructor?.profile_image_url}
                            alt="Instructor"
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p className="font-semibold">{getSpecificCourseData?.instructor?.name ?? 'N/A'}</p>
                            <p className="text-sm text-gray-400">{(getSpecificCourseData.instructor.role?.charAt(0)?.toUpperCase() + getSpecificCourseData.instructor.role?.slice(1)?.toLowerCase()) ?? 'Instructor'}</p>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-3">This course includes:</h3>
                    <ul>
                        <li className="flex items-center gap-3 py-3">
                            <FaRegClock className="text-purple-500" />
                            54 Hours of Learn-Anywhere Videos
                        </li>
                        <li className="flex items-center gap-3 py-3">
                            <RiBookOpenLine className="text-purple-500" />
                            Lifetime Learning Access
                        </li>
                        <li className="flex items-center gap-3 py-3">
                            <FaMobileAlt className="text-purple-500" />
                            Compatible with All Devices
                        </li>
                        <li className="flex items-center gap-3 py-3">
                            <FaCertificate className="text-purple-500" />
                            Certified Learning Achievement
                        </li>
                    </ul>

                    <div className="flex flex-col items-start mt-3">
                        <p className="text-purple-500 text-2xl font-bold mb-4 flex items-center">
                            <MdCurrencyRupee className="inline mr-1" />
                            {getSpecificCourseData?.price?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}
                        </p>

                        <button disabled={paymentActive}
                            type="button" onClick={() => {
                                if (userAuthData) handlePayment();
                                else navigate('/signin');
                            }}
                            className={`flex mb-5 mt-1 items-center justify-center gap-2 w-full text-white backdrop-blur-md border 
                                    border-white/30 px-5 py-3 rounded-full transition ${paymentActive ?
                                    'cursor-not-allowed bg-gray-500 border-gray-400 opacity-60 hover:bg-gray-500 hover:border-gray-400' :
                                    'cursor-pointer hover:bg-purple-800 hover:border-purple-600 hover:opacity-90 bg-purple-600'}`}>
                            {paymentActive ? <Loader2 className='animate-spin w-4 h-4' /> : ''} Buy Now <HiArrowRight className="text-lg" />
                        </button>
                    </div>
                </>
            )}
            <ReviewCourse />
        </div>
    );
};

export default InstructorCourseDetails;
