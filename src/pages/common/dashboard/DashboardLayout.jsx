import React, { useEffect, useState } from "react";
import DashboardSidebar from "../../../layout/common/sidebar";
import StudentDashboard from "../../../components/student/dashboard/StudentDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InstructorDashboard from "../../../components/instructor/dashboard/InstructorDashboard";
import AddCourseForm from "../../../components/instructor/dashboard/AddCourseForm";
import MyCoursesPage from "../../../components/student/dashboard/MyCoursesPage";
import InstructorCourse from "../../../components/instructor/dashboard/InstructorCourse";
import { specificInstructor } from "../../../redux/slice/instructorSlice";
import { checkLoggedInStudent } from "../../../redux/slice/authSlice/checkStudentAuthSlice";
import { Loader2 } from "lucide-react";

const DashboardLayout = ({ currentPage }) => {

  const [activePage, setActivePage] = useState(currentPage ? currentPage : "dashboard"),
    { user_type } = useParams(),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { isStudentLoading, studentAuthData: getStudentData, studentError } = useSelector(state => state.checkAuth),
    { isInstructorPending, getInstructorData, isInstructorError } = useSelector(state => state.instructor);

  // console.log('user_type', user_type);
  // console.log('currentPage', currentPage);
  // console.log('student Auth Data', getStudentData);
  // console.log('Instructor details', getInstructorData);

  useEffect(() => {
    dispatch(checkLoggedInStudent())
      .then(res => {
        // console.log('Response for fetching user profile', res);
      })
      .catch((err) => {
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
        console.log("Error occurred", err);
      });
  }, [dispatch]);


  useEffect(() => {
    const handleOpenAddCourse = () => setActivePage("student-myCourses");
    window.addEventListener("open-user-course", handleOpenAddCourse);

    return () => {
      window.removeEventListener("open-user-course", handleOpenAddCourse);
    };
  }, []);

  useEffect(() => {
    const handleOpenAddCourse = () => setActivePage("instructor-add-myCourses");
    window.addEventListener("open-add-course", handleOpenAddCourse);

    return () => {
      window.removeEventListener("open-add-course", handleOpenAddCourse);
    };
  }, []);

  useEffect(() => {
    const handleOpenAddCourse = () => setActivePage("instructor-myCourses");
    window.addEventListener("open-instructor-course", handleOpenAddCourse);

    return () => {
      window.removeEventListener("open-instructor-course", handleOpenAddCourse);
    };
  }, []);

  useEffect(() => {
    const handleOpenAddCourse = () => setActivePage("requestInstructor");
    window.addEventListener("open-request-instructor", handleOpenAddCourse);

    return () => {
      window.removeEventListener("open-request-instructor", handleOpenAddCourse);
    };
  }, []);

  // console.log('active page', activePage);

  const renderContent = () => {
    switch (activePage) {
      case 'student-dashboard':
        return <StudentDashboard studentDetails={getStudentData} />;
      case 'home':
        navigate('/');
        return;
      case 'allCourses':
        navigate('/course');
        return;
      case 'student-myCourses':
        return <MyCoursesPage studentData={getStudentData} />;
      case 'instructor-dashboard':
        return <InstructorDashboard instructorDetails={getInstructorData} />
      case 'instructor-myCourses':
        return <InstructorCourse instructorDetails={getInstructorData} />;
      case 'instructor-add-myCourses':
        return <AddCourseForm />;
      default:
        // return <InstructorDashboard instructorDetails={getInstructorData} />
      return user_type === "student" ? (
        <StudentDashboard studentDetails={getStudentData} />
      ) : (
        <InstructorDashboard instructorDetails={getInstructorData} />
      );
    }
  }

  if (isStudentLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
        <p className="text-purple-200 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      {/* Pass setActivePage as a prop to Sidebar */}
      <DashboardSidebar setActivePage={setActivePage} activePage={activePage} user_type={user_type} userData={user_type === "student" ? getStudentData : getInstructorData} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()} {/* Display content based on the activePage */}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
