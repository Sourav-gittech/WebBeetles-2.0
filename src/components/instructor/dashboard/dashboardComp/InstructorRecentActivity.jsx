import React from 'react'
import { BarChart3, CheckCircle2, MessageSquare, Star, Users } from 'lucide-react'

const InstructorRecentActivity = ({ activity }) => {

    const icons = {
        completed: <CheckCircle2 size={16} className="text-green-400" />,
        review: <Star size={16} className="text-yellow-400" />,
        question: <MessageSquare size={16} className="text-blue-400" />,
        enrolled: <Users size={16} className="text-purple-400" />
    };

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-5 lg:p-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 flex items-center gap-2">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-purple-500/30 flex items-center justify-center border border-purple-400/30"><BarChart3 size={18} className="text-purple-300" /></div>
                Recent Activity
            </h2>
            <div className="space-y-2 sm:space-y-3">
                {activity.map((a) => (
                    <div key={a.id} className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-white/10 last:border-0 last:pb-0 hover:bg-white/5 p-2 sm:p-3 rounded-lg transition-all group">
                        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform flex-shrink-0">{icons[a.type]}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-white mb-0.5 truncate">{a.student}</p>
                            <p className="text-xs text-purple-200 truncate">{a.action} • {a.course}</p>
                        </div>
                        <span className="text-xs text-purple-300 whitespace-nowrap">{a.time}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InstructorRecentActivity