import React, { useState } from 'react';
import UploadCourseVideoModal from '../modal/UploadCourseVideoModal';
import ShowCourseVideoModal from '../modal/ShowCourseVideoModal';
import InstructorSpecificCourseDetailsHeader from './details-comp/InstructorSpecificCourseDetailsHeader';
import InstructorSpecificCourseItemsRow from './details-comp/InstructorSpecificCourseItemsRow';
import { useCourseVideos } from '../../../../../tanstack/query/fetchLectureVideo';

const InstructorSpecificCourseDetails = ({ selectedCourse, setSelectedCourse, setExpandedSections, editForm, setEditForm, setShowEditModal, setShowDeleteModal,
     expandedSections, apiCalls, setCourseContent }) => {
    const { isLoading, data: lectureData, error } = useCourseVideos({ courseId: selectedCourse?.id });

    const [showVideoModal, setShowVideoModal] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(null);
    const [uploadForm, setUploadForm] = useState({ title: '', duration: '', type: 'video', sectionId: null });

    const handleDeleteVideo = (sectionId, videoId) => {
        apiCalls.deleteVideo(selectedCourse.id, videoId);

        setCourseContent(prev => ({
            ...prev,
            [selectedCourse.id]: {
                ...prev[selectedCourse.id],
                sections: prev[selectedCourse.id].sections.map(section =>
                    section.id === sectionId
                        ? { ...section, lessons: section.lessons.filter(l => l.id !== videoId) }
                        : section
                )
            }
        }));
    };

    const handleUploadVideo = () => {
        const newLesson = {
            id: Date.now(),
            title: uploadForm.title,
            type: uploadForm.type,
            duration: uploadForm.duration,
            views: 0,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            uploadedAt: new Date().toISOString().split('T')[0]
        };

        apiCalls.uploadVideo(selectedCourse.id, uploadForm.sectionId, uploadForm);

        setCourseContent(prev => ({
            ...prev,
            [selectedCourse.id]: {
                ...prev[selectedCourse.id],
                sections: prev[selectedCourse.id].sections.map(section =>
                    section.id === uploadForm.sectionId
                        ? { ...section, lessons: [...section.lessons, newLesson] }
                        : section
                )
            }
        }));

        setShowUploadModal(null);
        setUploadForm({ title: '', duration: '', type: 'video', sectionId: null });
    };

    const courseSection = [{
        id: 1,
        title: 'Demo lecture video',
        type: 'demo'
    }, {
        id: 2,
        title: 'Course lecture video',
        type: 'video'
    }, {
        id: 3,
        title: 'Course document',
        type: 'document'
    }, {
        id: 4,
        title: 'Certification question set',
        type: 'exam'
    }]

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <InstructorSpecificCourseDetailsHeader lectureData={lectureData} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} editForm={editForm} setEditForm={setEditForm} setShowEditModal={setShowEditModal} setShowDeleteModal={setShowDeleteModal} apiCalls={apiCalls} />

                <div className="space-y-4">
                    {courseSection?.map(section => (
                        <InstructorSpecificCourseItemsRow key={section?.id} lectureData={lectureData} selectedCourse={selectedCourse} expandedSections={expandedSections} setExpandedSections={setExpandedSections} section={section} handleDeleteVideo={handleDeleteVideo} setShowVideoModal={setShowVideoModal}
                            uploadForm={uploadForm} setUploadForm={setUploadForm} setShowUploadModal={setShowUploadModal} />
                    ))}
                </div>
            </div>

            {/* Video Player Modal */}
            {showVideoModal && (
                <ShowCourseVideoModal showVideoModal={showVideoModal} setShowVideoModal={setShowVideoModal} />
            )}

            {/* Upload Video Modal */}
            {showUploadModal && (
                <UploadCourseVideoModal handleUploadVideo={handleUploadVideo} setShowUploadModal={setShowUploadModal} setUploadForm={setUploadForm} uploadForm={uploadForm} />
            )}
        </div>
    )
}

export default InstructorSpecificCourseDetails