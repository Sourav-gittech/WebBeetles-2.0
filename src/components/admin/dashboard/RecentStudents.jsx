import React from 'react'
import SectionHeader from './common/sectionHeader'

const RecentStudents = ({RECENT_STUDENTS}) => {
    return (
        <div className="bg-[#111] p-6 rounded-2xl border border-white/5 shadow-xl">
            <SectionHeader title="Recent Signups" linkTo="/admin/users" />
            <div className="space-y-3">
                {RECENT_STUDENTS.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {s.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{s.name}</p>
                            <p className="text-xs text-gray-500 truncate">{s.course}</p>
                        </div>
                        <span className="text-xs text-gray-600 flex-shrink-0">{s.joined}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentStudents