import React, { useEffect, useState } from 'react';
import CourseCard from './instructorCourseComp/CourseCard';
import StatsCard from './instructorCourseComp/StatsCard';
import InstructorCourseListHeader from './instructorCourseComp/InstructorCourseListHeader';
import DeleteCourseModal from './instructorCourseComp/modal/DeleteCourseModal';
import UpdateCourseModal from './instructorCourseComp/modal/UpdateCourseModal';
import InstructorSpecificCourseDetails from './instructorCourseComp/specific-course-details/InstructorSpecificCourseDetails';
import { useDispatch, useSelector } from 'react-redux';
import { allCourse } from '../../../redux/slice/couseSlice';
import getSweetAlert from '../../../util/alert/sweetAlert';
import { Loader2 } from 'lucide-react';

const InstructorCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [courses, setCourses] = useState([
    { id: 1, title: "Advanced React & Redux Masterclass", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop", students: 1234, revenue: 15420, rating: 4.8, totalLessons: 35, duration: "12h 30m", status: "published" },
    { id: 2, title: "Full Stack Web Development Bootcamp", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop", students: 856, revenue: 10272, rating: 4.5, totalLessons: 36, duration: "18h 45m", status: "published" },
    { id: 3, title: "UI/UX Design Fundamentals", thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop", students: 2103, revenue: 25236, rating: 4.9, totalLessons: 24, duration: "8h 20m", status: "published" },
    { id: 4, title: "Python for Data Science", thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop", students: 543, revenue: 6516, rating: 4.7, totalLessons: 42, duration: "15h 10m", status: "draft" }
  ]);

  const [courseContent, setCourseContent] = useState({
    1: {
      sections: [
        {
          id: 1, title: "Getting Started with React", duration: "2h 15m", lessons: [
            { id: 1, title: "Introduction to React", type: "video", duration: "12:30", views: 1205, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", uploadedAt: "2024-08-15" },
            { id: 2, title: "Setting Up Development Environment", type: "video", duration: "18:45", views: 1150, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", uploadedAt: "2024-08-16" },
            { id: 3, title: "Your First React Component", type: "video", duration: "25:20", views: 1098, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", uploadedAt: "2024-08-17" },
            { id: 4, title: "Quiz: React Basics", type: "quiz", duration: "10:00", views: 987, uploadedAt: "2024-08-18" }
          ]
        },
        {
          id: 2, title: "State Management Patterns", duration: "3h 45m", lessons: [
            { id: 5, title: "Understanding State in React", type: "video", duration: "22:15", views: 945, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", uploadedAt: "2024-08-20" },
            { id: 6, title: "Props vs State", type: "video", duration: "16:30", views: 892, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", uploadedAt: "2024-08-21" },
            { id: 7, title: "Context API Deep Dive", type: "video", duration: "32:45", views: 856, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", uploadedAt: "2024-08-22" },
            { id: 8, title: "Introduction to Redux", type: "video", duration: "28:20", views: 812, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", uploadedAt: "2024-08-23" }
          ]
        }
      ]
    }
  });



  const dispatch = useDispatch(),
    { isUserLoading, userAuthData, userError } = useSelector(state => state.checkAuth),
    { isCourseLoading, getCourseData, isCourseError } = useSelector(state => state.course);

  useEffect(() => {
    dispatch(allCourse({ instructor_id: userAuthData?.id }))
      .then(res => {
        // console.log('Response for fetching instructorwise course', res);
      })
      .catch(err => {
        console.log('Error occured', err);
        getSweetAlert("Error", "Something went wrong.", "error");
      })
  }, [dispatch]);

  // console.log('Get course details', getCourseData);




  // API placeholder functions
  const apiCalls = {
    fetchCourses: async () => {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/instructor/courses');
      // const data = await response.json();
      // setCourses(data);
      console.log('API: Fetching courses...');
    },
    fetchCourseContent: async (courseId) => {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/instructor/courses/${courseId}/content`);
      // const data = await response.json();
      // setCourseContent(prev => ({ ...prev, [courseId]: data }));
      console.log(`API: Fetching content for course ${courseId}...`);
    },
    updateCourse: async (courseId, data) => {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/instructor/courses/${courseId}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(data)
      // });
      console.log(`API: Updating course ${courseId}...`, data);
    },
    deleteCourse: async (courseId) => {
      // TODO: Replace with actual API call
      // await fetch(`/api/instructor/courses/${courseId}`, { method: 'DELETE' });
      console.log(`API: Deleting course ${courseId}...`);
    },
    uploadVideo: async (courseId, sectionId, videoData) => {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append('video', videoData.file);
      // formData.append('title', videoData.title);
      // const response = await fetch(`/api/instructor/courses/${courseId}/sections/${sectionId}/videos`, {
      //   method: 'POST',
      //   body: formData
      // });
      console.log(`API: Uploading video to course ${courseId}, section ${sectionId}...`, videoData);
    },
    deleteVideo: async (courseId, videoId) => {
      // TODO: Replace with actual API call
      // await fetch(`/api/instructor/courses/${courseId}/videos/${videoId}`, { method: 'DELETE' });
      console.log(`API: Deleting video ${videoId}...`);
    }
  };


  if (selectedCourse) {

    return (

      <InstructorSpecificCourseDetails selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} setExpandedSections={setExpandedSections} setEditForm={setEditForm} setShowEditModal={setShowEditModal} setShowDeleteModal={setShowDeleteModal}
      editForm={editForm} expandedSections={expandedSections} apiCalls={apiCalls} setCourseContent={setCourseContent} />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <InstructorCourseListHeader />
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatsCard courses={courses} getCourseData={getCourseData} />
        </div>

        {isCourseLoading ? (
          <Loader2 className='w-15 h-15 animate-spin mx-auto' />
        ) :
          (<div className="grid grid-cols-3 gap-6">
            {getCourseData.map((course) => <CourseCard key={course.id} course={course} setSelectedCourse={setSelectedCourse} setExpandedSections={setExpandedSections} setEditForm={setEditForm} setShowEditModal={setShowEditModal} setShowDeleteModal={setShowDeleteModal} />)}
          </div>
          )}
      </div>

      {/* Delete Course Modal */}
      {showDeleteModal && (
        <DeleteCourseModal setSelectedCourse={setSelectedCourse} setCourses={setCourses} selectedCourse={selectedCourse} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
      )}

      {/* Edit Course Modal */}
      {showEditModal && (
        <UpdateCourseModal setShowEditModal={setShowEditModal} editForm={editForm} setEditForm={setEditForm} apiCalls={apiCalls} setCourses={setCourses} setSelectedCourse={setSelectedCourse} selectedCourse={selectedCourse} />
      )}
    </div>
  );
};

export default InstructorCourse;