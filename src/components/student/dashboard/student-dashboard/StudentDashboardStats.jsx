import React, { useState } from 'react'
import { BookOpen, TrendingUp, Award, Clock, Target } from "lucide-react";

const StudentDashboardStats = () => {

    const [stats, setStats] = useState({ coursesEnrolled: 0, coursesCompleted: 0, coursePending: 0, certificatesEarned: 0 });

    const statCards = [
        { icon: BookOpen, value: stats.coursesEnrolled, label: "Courses Enrolled", color: "purple", trend: "+2" },
        { icon: Award, value: stats.coursesCompleted, label: "Courses Completed", color: "green", trend: "+1" },
        { icon: Clock, value: stats.coursePending, label: "Courses In-progress", color: "blue", trend: "+5h" },
        { icon: Target, value: stats.certificatesEarned, label: "Certificates Earned", color: "orange", trend: "+1" }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {statCards.map((stat, i) => (
                <div key={i} className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${stat.color}-500/40 to-${stat.color}-600/40 backdrop-blur-sm flex items-center justify-center border border-${stat.color}-400/30 shadow-lg group-hover:scale-110 transition-transform`}>
                            <stat.icon className="text-white" size={26} />
                        </div>
                        <span className="text-green-400 text-xs font-bold flex items-center gap-1 bg-green-500/20 px-2.5 py-1.5 rounded-lg border border-green-400/30">
                            <TrendingUp size={14} />{stat.trend}
                        </span>
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-purple-100 text-sm font-medium">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}

export default StudentDashboardStats