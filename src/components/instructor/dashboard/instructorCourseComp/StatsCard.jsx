import React from 'react'
import { BookOpen, IndianRupee, Star, Users } from 'lucide-react';

const StatsCard = ({courses,getCourseData}) => {

    const StatCard = ({ icon: Icon, value, label, gradient }) => (
        <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 border border-opacity-30`}>
            <Icon className="w-8 h-8 mb-2" />
            <h3 className="text-3xl font-bold mb-1">{value}</h3>
            <p className="text-sm text-gray-400">{label}</p>
        </div>
    );

    return (
        <>
            <StatCard icon={BookOpen} value={getCourseData?.length} label="Total Courses" gradient="from-purple-600/20 to-purple-800/20 border-purple-700/30" />
            <StatCard icon={Users} value={courses.reduce((a, c) => a + c.students, 0).toLocaleString()} label="Total Students" gradient="from-blue-600/20 to-blue-800/20 border-blue-700/30" />
            <StatCard icon={IndianRupee} value={`${courses.reduce((a, c) => a + c.revenue, 0).toLocaleString()}`} label="Total Revenue" gradient="from-green-600/20 to-green-800/20 border-green-700/30" />
            <StatCard icon={Star} value="4.7" label="Avg Rating" gradient="from-yellow-600/20 to-yellow-800/20 border-yellow-700/30" />
        </>
    )
}

export default StatsCard