import React from 'react'
import { Check, Star } from 'lucide-react'

const LiveCourseRow = ({ c }) => {
    return (
        <div className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group">
            <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0"><Check size={16} /></div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors truncate">{c.title}</p>
                <p className="text-xs text-gray-500">{c.instructor} · Published {c.approvedDate || "Just now"} · <Star className='inline w-2.5 h-2.5 mb-1 mr-0.5 text-yellow-400' />4.8</p>
            </div>
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md hidden sm:block">{c.cat}</span>
            {c.students && <span className="text-sm text-gray-400 hidden md:block">{c.students.toLocaleString()} students</span>}
            {c.revenue && <span className="text-sm text-yellow-500 font-semibold hidden md:block">{c.revenue}</span>}
            {c.revenue && <span className="text-sm font-semibold hidden md:block">
                <button className='text-xs uppercase px-3.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-300/10 text-blue-400 hover:text-blue-300 border border-blue-500/20 hover:border-blue-400/20 cursor-pointer'>View</button>
            </span>}
        </div>
    )
}

export default LiveCourseRow