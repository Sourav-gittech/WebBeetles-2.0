import React from 'react'
import { ChevronRight, Clock, Edit2, Plus, Star, Trash2, Users } from 'lucide-react';

const InstructorSpecificCourseDetailsHeader = ({ selectedCourse, setSelectedCourse, setEditForm, setShowEditModal, setShowDeleteModal }) => {
    return (
        <>
            <button onClick={() => setSelectedCourse(null)} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6">
                <ChevronRight className="w-5 h-5 rotate-180" />
                Back to Courses
            </button>

            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-3">{selectedCourse.title}</h1>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2"><Users className="w-4 h-4" />{selectedCourse.students} students</span>
                        <span className="flex items-center gap-2"><Star className="w-4 h-4" />{selectedCourse.rating} rating</span>
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{selectedCourse.duration}</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => { setEditForm(selectedCourse); setShowEditModal(selectedCourse); }} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
                        <Edit2 className="w-4 h-4" />
                        Edit Course
                    </button>
                    <button onClick={() => setShowDeleteModal(selectedCourse)} className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Section
                </button>
            </div>
        </>
    )
}

export default InstructorSpecificCourseDetailsHeader