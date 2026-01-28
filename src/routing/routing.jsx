import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import ScrollToTop from "../layout/scrollonTop";

// student - Layouts
import StudentNavbar from "../layout/student/StudentNavbar";
import StudentFooter from "../layout/student/StudentFooter";

// Pages - student
import Home from "../pages/student/Home";
import Signin from "../pages/student/auth/login/Signin";
import Signup from "../pages/student/auth/register/Signup";
import Error404 from "../pages/common/Error404";
import ForgetPassword from "../pages/student/auth/forgetPassword/ForgetPassword";
import ResetPassword from "../pages/student/auth/resetPassword/ResetPassword";
import Otp from "../pages/student/auth/otp/Otp";
import Cart from "../pages/student/cart/Cart";
import Course from "../pages/student/Course";
import Category from "../pages/student/Category";
import ContactUs from "../pages/student/ContactUs";
import CourseDetails from "../pages/student/CourseDetails";
import AboutUs from "../pages/student/AboutUs";
import CategoryDetails from "../pages/student/CategoryDetails";
import TermsOfService from "../pages/common/terms&policy/TermsOfService";
import PrivacyPolicy from "../pages/common/terms&policy/PrivacyPolicy";
import DashboardLayout from "../pages/common/dashboard/DashboardLayout";

// instructor - Layout
import InstructorNavbar from "../layout/instructor/InstructorNavbar";
import InstructorFooter from "../layout/instructor/InstructorFooter";

// Pages - instructor
import InstructorHome from "../pages/instructor/InstructorHome";
import InstructorSignup from "../pages/instructor/auth/register/InstructorSignup";
import InstructorSignin from "../pages/instructor/auth/login/InstructorSignin";
import InstructorResetPassword from "../pages/instructor/auth/resetPassword/InstructorResetPassword";
import InstructorForgetPassword from "../pages/instructor/auth/forgetPassword/InstructorForgetPassword";
import InstructorOtp from "../pages/instructor/auth/otp/InstructorOtp";
import InstructorRequestForm from "../pages/instructor/request/form/InstructorRequestForm";
import InstructorRequestStatus from "../pages/instructor/request/status/InstructorRequestStatus";


// Student Layout wrapper (must be used inside Router!)
const StudentLayout = ({ children }) => {
  const location = useLocation();

  // routes that should NOT show navbar + footer
  const hideLayoutRoutes = ["/user-signin", "/user-signup", "/404"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <StudentNavbar />}
      {children}
      {!hideLayout && <StudentFooter />}
    </>
  );
};

// Instructor Layout wrapper (must be used inside Router!)
const InstructorLayout = ({ children }) => {
  const location = useLocation();

  // routes that should NOT show navbar + footer
  const hideLayoutRoutes = ["/user-signin", "/user-signup", "/404"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <InstructorNavbar />}
      {children}
      {!hideLayout && <InstructorFooter />}
    </>
  );
};

const Routing = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>

        {/* student  */}

        {/* Pages with Layout */}
        <Route path="/" element={<StudentLayout> <Home /></StudentLayout>} />
        <Route path="/about" element={<StudentLayout> <AboutUs /></StudentLayout>} />
        <Route path="/course" element={<StudentLayout> <Course /></StudentLayout>} />
        <Route path="/course/course-details/:courseId" element={<StudentLayout> <CourseDetails /></StudentLayout>} />
        <Route path="/category" element={<StudentLayout> <Category /></StudentLayout>} />
        <Route path="/category/category-details/:categoryId" element={<StudentLayout> <CategoryDetails /></StudentLayout>} />
        <Route path="/contact" element={<StudentLayout> <ContactUs /></StudentLayout>} />
        <Route path="/terms" element={<StudentLayout> <TermsOfService /></StudentLayout>} />
        <Route path="/privacy" element={<StudentLayout> <PrivacyPolicy /></StudentLayout>} />

        {/* Pages (no navbar/footer) */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/cart" element={<Cart />} />


        {/* instructor */}

        {/* Pages with Layout */}
        <Route path="/instructor/" element={<InstructorLayout> <InstructorHome /></InstructorLayout>} />

        {/* Pages (no navbar/footer) */}
        <Route path="/instructor/signin" element={<InstructorSignin />} />
        <Route path="/instructor/signup" element={<InstructorSignup />} />
        <Route path="/instructor/forget-password" element={<InstructorForgetPassword />} />
        <Route path="/instructor/reset-password" element={<InstructorResetPassword />} />
        <Route path="/instructor/otp" element={<InstructorOtp />} />
        <Route path="/instructor/profile-form" element={<InstructorRequestForm />} />
        <Route path="/instructor/request-status" element={<InstructorRequestStatus />} />


        {/* common  */}

        {/* Pages (no navbar/footer) */}
        <Route path="/:user_type/dashboard" element={<DashboardLayout />} />


        {/* 404 Page (no navbar/footer) */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
