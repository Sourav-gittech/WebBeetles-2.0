import React, { useEffect, useState } from 'react'
import { Award, Play, Target, BarChart3, Trophy } from "lucide-react";

const StudentDashboardRecentActivity = () => {

    const [recentActivity, setRecentActivity] = useState([]);

    const fetchDashboardData = async () => {
        try {
            setRecentActivity([
                { id: 1, course: "Advanced React & Redux", action: "Completed lesson", time: "2 hours ago", type: "completed" },
                { id: 2, course: "Full Stack Development", action: "Started new module", time: "1 day ago", type: "started" },
                { id: 3, course: "UI/UX Design", action: "Earned certificate", time: "3 days ago", type: "certificate" },
                { id: 4, course: "JavaScript Essentials", action: "Quiz passed with 95%", time: "5 days ago", type: "quiz" }
            ]);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } 
    };

    const activityIcons = {
        completed: <Award size={16} className="text-green-400" />,
        started: <Play size={16} className="text-blue-400" />,
        certificate: <Trophy size={16} className="text-yellow-400" />,
        quiz: <Target size={16} className="text-purple-400" />
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><BarChart3 size={28} className="text-purple-300" />Recent Activity</h2>
            <div className="space-y-4">
                {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0 hover:bg-white/5 p-3 rounded-xl transition-all">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                            {activityIcons[activity.type] || activityIcons.completed}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white mb-1">{activity.action}</p>
                            <p className="text-xs text-purple-200">{activity.course}</p>
                        </div>
                        <span className="text-xs text-purple-300 whitespace-nowrap">{activity.time}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StudentDashboardRecentActivity