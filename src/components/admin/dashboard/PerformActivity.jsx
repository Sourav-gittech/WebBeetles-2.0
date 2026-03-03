import React from 'react'
import { Activity, BookOpen, BookOpenCheck, ClipboardCheck, DollarSign, Users } from 'lucide-react'
import SectionHeader from './common/sectionHeader'

const PerformActivity = () => {
    return (
        <div className="bg-[#111] p-5 rounded-2xl border border-white/5 shadow-xl">
            <SectionHeader title="Platform Activity" />
            <div className="space-y-3">
                {[
                    { text: 'Course "React Mastery" approved', sub: "2m ago", icon: <BookOpen size={14} className="text-yellow-400" /> },
                    { text: "New student enrolled in Python DS", sub: "8m ago", icon: <Users size={14} className="text-purple-400" /> },
                    { text: "Instructor application submitted", sub: "23m ago", icon: <ClipboardCheck size={14} className="text-yellow-400" /> },
                    { text: "₹4,999 payment received", sub: "41m ago", icon: <DollarSign size={14} className="text-yellow-500" /> },
                    { text: "New course submitted for review", sub: "1h ago", icon: <BookOpenCheck size={14} className="text-purple-400" /> },
                    { text: "System maintenance completed", sub: "2h ago", icon: <Activity size={14} className="text-gray-500" /> },
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                        <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-300 leading-snug">{item.text}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{item.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PerformActivity