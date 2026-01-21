import React from 'react';
import { DollarSign, Edit2, PlayCircle, Star, Trash2, Users } from 'lucide-react';

const CourseCard = ({ course, setSelectedCourse, setExpandedSections, setEditForm, setShowEditModal, setShowDeleteModal }) => {
    return (
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-600 transition-all group">
            <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => { setSelectedCourse(course); setExpandedSections({ 1: true }); }}>
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${course.status === 'published' ? 'bg-green-500' : 'bg-yellow-500 text-black'}`}>
                    {course.status}
                </span>
                <span className={`absolute top-11 right-4 px-3 py-1 rounded-full text-xs font-semibold ${course.status === 'published' ? 'bg-green-500' : 'bg-yellow-500 text-black'}`}>
                    {course.status}
                </span>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <PlayCircle className="w-4 h-4" />
                        <span>{course.totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                        <DollarSign className="w-4 h-4" />
                        <span>${course.revenue}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => { setEditForm(course); setShowEditModal(course); }} className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                        <Edit2 className="w-4 h-4" />
                        Edit
                    </button>
                    <button onClick={() => setShowDeleteModal(course)} className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseCard