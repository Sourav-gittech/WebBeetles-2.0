import React from 'react'
import { Check, X } from 'lucide-react'

const RejectCourseRow = ({ c }) => {
    return (
        <div className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0"><X size={16} /></div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors truncate">{c.title}</p>
                <p className="text-xs text-gray-500">{c.instructor} · Rejected {c.approvedDate || "Just now"}</p>
            </div>
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md hidden sm:block">{c.cat}</span>
            {/* {c.students && <span className="text-sm text-gray-400 hidden md:block">{c.students.toLocaleString()} students</span>} */}
            {c.revenue && <span className="text-sm text-orange-500 font-semibold hidden md:block">{c.revenue}</span>} 
        </div>
    )
}

export default RejectCourseRow