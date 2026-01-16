import React, { useEffect, useState } from 'react'
import { Clock, Play, Star, Users, ArrowRight } from "lucide-react";
import { useSelector } from 'react-redux';

const StudentDashboardContinueLearning = () => {

    const { isCourseLoading, getCourseData, isCourseError } = useSelector(state => state.course);
    const [stats, setStats] = useState({ coursesEnrolled: 0, coursesCompleted: 0, coursePending: 0, certificatesEarned: 0 });

    // console.log(getCourseData);

    useEffect(() => {
        if (getCourseData?.courses?.length) {
            setStats({
                coursesEnrolled: getCourseData.courses.length,
                coursesCompleted: 3,
                coursePending: 47,
                certificatesEarned: 3,
            });
        }
    }, [getCourseData]);

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Play className="text-purple-300" size={28} />Continue Learning</h2>
                <button onClick={() => window.dispatchEvent(new CustomEvent("open-user-course"))} className="text-purple-200 hover:text-white font-semibold text-sm flex items-center gap-1 bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition-all border border-white/20">View All<ArrowRight size={16} /></button>
            </div>
            <div className="space-y-5">
                {getCourseData?.courses?.slice(0, 3).map((course) => (
                    <div key={course._id} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-white/30 hover:shadow-2xl">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-shrink-0">
                                <img src={`http://localhost:3005${course.thumbnail}`} alt={course.title} className="w-full sm:w-40 h-32 sm:h-28 rounded-xl object-cover ring-2 ring-white/20" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                    <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                                        <Play size={20} className="text-purple-600 ml-1" fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-purple-200 transition-colors line-clamp-1">{course.title}</h3>
                                <p className="text-sm text-purple-200 mb-3">by {course.instructor.name}</p>
                                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-purple-200 mb-4">
                                    <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg"><Star size={14} className="text-yellow-400" fill="currentColor" /><CourseRating courseId={course._id} /></span>
                                    <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg"><Users size={14} />40</span>
                                    <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg"><Clock size={14} />00.00</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-purple-200">Progress: 10/15 lessons</span>
                                        <span className="font-bold text-white bg-white/20 px-3 py-1 rounded-lg">70%</span>
                                    </div>
                                    <div className="h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 rounded-full transition-all duration-500 shadow-lg" style={{ width: `70%` }} />
                                    </div>
                                    <p className="text-xs text-purple-200 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>Category: <span className="font-semibold text-white">{course.category.name}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StudentDashboardContinueLearning