import React from 'react'
import SectionHeader from './common/sectionHeader'
import { Check, X } from 'lucide-react'

const PendingInstructorReview = ({PENDING_INSTRUCTORS}) => {
    return (
        <div className="bg-[#111] p-5 rounded-2xl border border-white/5 lg:col-span-2 shadow-xl flex flex-col">
            <SectionHeader title="Pending Instructor Reviews" linkTo="/admin/instructor-reviews" />
            <div className="space-y-3 flex-1">
                {PENDING_INSTRUCTORS.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[#161616] rounded-xl hover:bg-[#1a1a1a] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 text-xs font-bold flex-shrink-0">
                            {p.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.subject} · {p.applied}</p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                            <button className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"><Check size={13} /></button>
                            <button className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"><X size={13} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PendingInstructorReview