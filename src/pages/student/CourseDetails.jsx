import React from "react";
import { useParams } from "react-router-dom";
import CourseDetailsBanner from "../../components/student/course/course-details/CourseDetailsBanner";
import CourseDetailsDesc from "../../components/student/course/course-details/CourseDetailsDesc";

const CourseDetails = () => {

    const { courseId } = useParams();
    const decodedCourseId = decodeURIComponent(courseId);

    return (
        <>
            <CourseDetailsBanner />
            <CourseDetailsDesc course={decodedCourseId} />

        </>
    )
}

export default CourseDetails;



