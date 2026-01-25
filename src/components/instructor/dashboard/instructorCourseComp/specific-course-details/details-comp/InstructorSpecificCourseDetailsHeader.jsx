import React, { useState } from 'react'
import { CheckCheck, ChevronRight, Clock, Edit2, Star, Trash2, Users } from 'lucide-react';
import UpdateCourseModal from '../../modal/UpdateCourseModal';
import DeleteCourseAndLectureModal from '../../modal/DeleteCourseAndLectureModal';

const InstructorSpecificCourseDetailsHeader = ({ lectureData, selectedCourse, setSelectedCourse, editForm, setEditForm }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deletedData, setDeletedData] = useState(null);
    const deleteType = 'course';

    const totalLectureTiming = lectureData?.reduce((acc, value) => acc + Number(value?.duration || 0), 0).toFixed(2);

    const canMarkComplete = selectedCourse?.status === "approved" && selectedCourse?.is_completed === false;

    return (
        <>
            <button onClick={() => setSelectedCourse(null)} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6 cursor-pointer">
                <ChevronRight className="w-5 h-5 rotate-180" />
                Back to Courses
            </button>

            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-3">{selectedCourse?.title?.toUpperCase() ?? 'N/A'}</h1>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2"><Users className="w-4 h-4" />{selectedCourse.students} students</span>
                        <span className="flex items-center gap-2"><Star className="w-4 h-4" />{selectedCourse.rating} rating</span>
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{totalLectureTiming}</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => { setEditForm(selectedCourse); setShowEditModal(true); }} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2 cursor-pointer">
                        <Edit2 className="w-4 h-4" />
                        Edit Course
                    </button>
                    <button onClick={() => { setShowDeleteModal(true); setDeletedData(selectedCourse); }} className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center gap-2 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <button
                    disabled={!canMarkComplete}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${canMarkComplete
                        ? 'bg-green-600 cursor-pointer hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed opacity-60 text-green-200'}`}>
                    {selectedCourse?.is_completed ? (
                        'Completed') : (
                        <>
                            <CheckCheck className="w-5 h-5" />
                            Mark Complete
                        </>
                    )}
                </button>
            </div>

            {/* Delete Course Modal */}
            {showDeleteModal && (
                <DeleteCourseAndLectureModal setShowDeleteLectureModal={setShowDeleteModal} deletedData={deletedData} deleteType={deleteType} />
            )}

            {/* Edit Course Modal */}
            {showEditModal && (
                <UpdateCourseModal setShowEditModal={setShowEditModal} editForm={editForm} setEditForm={setEditForm} />
            )}
        </>
    )
}

export default InstructorSpecificCourseDetailsHeader