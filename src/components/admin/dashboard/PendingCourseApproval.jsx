import React from 'react'
import SectionHeader from './common/sectionHeader'
import { Check, X } from 'lucide-react'

const PendingCourseApproval = ({PENDING_COURSES}) => {
    return (
        <div className="bg-[#111] p-5 rounded-2xl border border-white/5 shadow-xl lg:col-span-2 flex flex-col">
            <SectionHeader title="Courses Awaiting Approval" linkTo="/admin/approve-courses" />
            <div className="space-y-3 flex-1">
                {PENDING_COURSES.map((c, i) => (
                    <div key={i} className="p-3 bg-[#161616] rounded-xl hover:bg-[#1a1a1a] transition-colors group">
                        <div className="flex items-start justify-between mb-1">
                            <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors leading-tight">{c.title}</p>
                            <div className="flex gap-1 flex-shrink-0 ml-2">
                                <button className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"><Check size={13} /></button>
                                <button className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"><X size={13} /></button>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">{c.instructor} · {c.submitted}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PendingCourseApproval