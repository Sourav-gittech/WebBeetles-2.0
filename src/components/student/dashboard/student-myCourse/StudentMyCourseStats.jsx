import React, { useEffect, useState } from 'react'
import { Play, Award, BookOpen, CheckCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const StudentMyCourseStats = ({ purchaseItems }) => {

    const { isCourseLoading, getCourseData, isCourseError } = useSelector(state => state.course),
        [stats, setStats] = useState({ coursesEnrolled: 0, coursesCompleted: 0, coursePending: 0, certificatesEarned: 0 });

    const StatCard = ({ icon: Icon, value, label, gradient }) => (
        <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 border border-opacity-30`}>
            <Icon className="w-8 h-8 mb-2" />
            <h3 className="text-3xl font-bold mb-1">{value}</h3>
            <p className="text-sm text-gray-400">{label}</p>
        </div>
    );

    useEffect(() => {
        if (getCourseData?.courses?.length) {
            setStats({
                coursesEnrolled: getCourseData.courses.length,
                coursesCompleted: 3,
                hoursLearned: 47,
                certificatesEarned: 3,
            });
        }
    }, [getCourseData]);


    return (
        <>
            <div className="grid grid-cols-4 gap-6 mb-8">
                <StatCard icon={BookOpen} value={purchaseItems?.length ?? 0} label="Enrolled Courses" gradient="from-purple-600/20 to-purple-800/20 border-purple-700/30" />
                <StatCard icon={CheckCircle} value={stats.coursesCompleted} label="Completed" gradient="from-green-600/20 to-green-800/20 border-green-700/30" />
                <StatCard icon={Play} value={stats.hoursLearned ?? 0} label="In Progress" gradient="from-blue-600/20 to-blue-800/20 border-blue-700/30" />
                <StatCard icon={Award} value={stats.certificatesEarned} label="Certificates" gradient="from-orange-600/20 to-orange-800/20 border-orange-700/30" />
            </div>

            <div className="grid grid-cols-3 gap-6">
                {getCourseData?.courses?.map((course) => (
                    <CourseCard key={course._id} course={course} onClick={() => { setSelectedCourse(course); setExpandedSections({ 1: true }); }} />
                ))}
            </div>
        </>
    )
}

export default StudentMyCourseStats