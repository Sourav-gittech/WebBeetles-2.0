import { ChevronRight, Star } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const TopCourse = ({TOP_COURSES}) => {
    return (
        <div className="bg-[#111] rounded-2xl border border-white/5 shadow-xl lg:col-span-3 overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-white/5">
                <h2 className="text-base font-semibold text-white">Top Performing Courses</h2>
                <Link to="/admin/approve-courses" className="text-xs text-purple-400 hover:text-yellow-400 flex items-center gap-1 transition-colors">
                    Manage <ChevronRight size={14} />
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Course</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Students</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {TOP_COURSES.map((c, i) => (
                            <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-5 py-3">
                                    <p className="text-sm font-medium text-white group-hover:text-yellow-400 transition-colors truncate max-w-[180px]">{c.title}</p>
                                    <p className="text-xs text-gray-500">{c.instructor}</p>
                                </td>
                                <td className="px-5 py-3 text-sm text-gray-300 font-medium">{c.students.toLocaleString()}</td>
                                <td className="px-5 py-3 text-sm text-yellow-500 font-semibold">{c.revenue}</td>
                                <td className="px-5 py-3">
                                    <span className="flex items-center gap-1 text-sm text-gray-300">
                                        <Star size={13} className="fill-yellow-400 text-yellow-400" /> {c.rating}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TopCourse