import React from 'react';
import { IndianRupee, Edit2, PlayCircle, Star, Trash2, Users, CircleOff, CircleCheckBig } from 'lucide-react';
import { useCourseVideos } from '../../../../tanstack/query/fetchLectureVideo';

const CourseCard = ({ course, setSelectedCourse, setExpandedSections, setEditForm, setShowEditModal, setShowDeleteModal }) => {

    const { isLoading, data: lectureData, error } = useCourseVideos({ courseId: course?.id });

    return (

        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-600 transition-all group">
            <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => { setSelectedCourse(course); setExpandedSections({ 1: true }); }}>
                <img src={course?.thumbnail} alt={course?.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white`}>
                    {course?.category?.name ? (course?.category?.name?.split(" ")?.map(c => c?.charAt(0)?.toUpperCase() + c?.slice(1)?.toLowerCase())?.join(" ")) : 'N/A'}
                </span>
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${course?.status === 'approved' ? 'bg-green-500' : course?.status === 'pending' ? 'bg-yellow-500 text-black' : 'bg-red-500'}`}>
                    {course?.status?.charAt(0)?.toUpperCase() + course?.status?.slice(1)?.toLowerCase()}
                </span>
                <span className={`absolute top-11 right-4 px-3 py-1 rounded-full text-xs font-semibold ${course.is_active ? 'bg-green-500' : 'bg-yellow-500 text-black'}`}>
                    {course?.is_active ? 'Active' : 'Draft'}
                </span>
                <span className={`absolute top-18 right-4 px-3 py-1 rounded-full text-xs font-semibold ${!course.is_completed ? 'bg-purple-500' : 'bg-blue-500 text-white'}`}>
                    {!course?.is_completed ? 'Running' : 'Completed'}
                </span>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{course?.title?.toUpperCase() ?? 'N/A'}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{course?.students ?? 0} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{course?.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <PlayCircle className="w-4 h-4" />
                        <span>{lectureData?.length ?? 0} lesson{lectureData?.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                        <IndianRupee className="w-4 h-4" />
                        <span>{course?.price?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 0}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => { setEditForm(course); setShowEditModal(course); }} className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <Edit2 className="w-4 h-4" />
                        Edit
                    </button>
                    <button onClick={() => setShowDeleteModal(course)} className={`flex-1 py-2 ${course?.is_active ? 'bg-yellow-600 hover:bg-yellow-700 text-black' : 'bg-green-600 hover:bg-green-700'} rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer`}>
                        {course?.is_active ? <CircleOff className="w-4 h-4" /> : <CircleCheckBig className="w-4 h-4" />}
                        {!course?.is_active ? 'Active' : 'Draft'}
                    </button>
                    <button onClick={() => setShowDeleteModal(course)} className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseCard