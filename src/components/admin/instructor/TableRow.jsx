import React, { useState } from 'react'
import { Mail, BookOpen, Star, ChevronDown } from "lucide-react";

const TableRow = ({inst}) => {

    const [expanded, setExpanded] = useState(null);

    const STATUS_COLORS = {
    Active: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Suspended: "bg-red-500/10 text-red-500 border-red-500/20",
};

    return (
        <React.Fragment>
            <tr className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => setExpanded(expanded === inst.id ? null : inst.id)}>
                <td className="pl-6 py-4">
                    <ChevronDown size={16} className={`text-gray-600 transition-transform duration-200 ${expanded === inst.id ? "rotate-180" : ""}`} />
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-sm border border-white/10 flex-shrink-0">
                            {inst.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">{inst.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={11} />{inst.email}</p>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-md">{inst.subject}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 font-medium">
                    <div className="flex items-center gap-1.5"><BookOpen size={13} className="text-purple-400" />{inst.courses}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 font-medium">{inst.students.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-yellow-500 font-semibold">{inst.revenue}</td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                        <Star size={13} className="fill-yellow-400 text-yellow-400" /> {inst.rating}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[inst.status]}`}>{inst.status}</span>
                </td>
            </tr>
            {expanded === inst.id && (
                <tr className="bg-[#0d0d0d]">
                    <td colSpan={8} className="px-8 py-4 text-sm">
                        <div className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Published Courses by {inst.name}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {Array.from({ length: Math.min(inst.courses, 3) }).map((_, i) => (
                                <div key={i} className="bg-[#161616] rounded-xl p-3 border border-white/5 hover:border-purple-500/20 transition-colors">
                                    <p className="text-sm font-semibold text-white mb-1">{["Advanced React Patterns", "Python for Data Science", "Node.js Mastery"][i] || `Course ${i + 1}`}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><BookOpen size={11} /> {[2840, 2190, 1460][i] || "—"} students</span>
                                        <span className="text-yellow-500 font-semibold">{["₹1,42,000", "₹1,09,500", "₹73,000"][i] || "—"}</span>
                                    </div>
                                </div>
                            ))}
                            {inst.courses > 3 && (
                                <div className="bg-[#161616] rounded-xl p-3 border border-white/5 flex items-center justify-center text-xs text-purple-400 hover:text-yellow-400 transition-colors cursor-pointer">
                                    +{inst.courses - 3} more courses
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </React.Fragment>
    )
}

export default TableRow