import React, { useState } from "react";
import { Search, Filter, Mail, BookOpen, Star, Calendar, ChevronDown, Check, X, Eye } from "lucide-react";

const INSTRUCTORS = [
    { id: 1, name: "Dr. Sarah Jenkins", email: "sarah@example.com", joined: "2023-11-10", subject: "Web Development", courses: 14, students: 4280, revenue: "₹2,14,000", rating: 4.9, status: "Active" },
    { id: 2, name: "Prof. Arthur Pendelton", email: "arthur@example.com", joined: "2023-12-05", subject: "Data Science", courses: 8, students: 2190, revenue: "₹1,09,500", rating: 4.7, status: "Active" },
    { id: 3, name: "Dr. Elena Rostova", email: "elena@example.com", joined: "2024-01-15", subject: "Design", courses: 3, students: 875, revenue: "₹43,750", rating: 4.5, status: "Suspended" },
    { id: 4, name: "Michael Chang", email: "michael@example.com", joined: "2024-02-01", subject: "Data Science", courses: 5, students: 1460, revenue: "₹73,000", rating: 4.8, status: "Active" },
    { id: 5, name: "Jessica Wong", email: "jessica@example.com", joined: "2024-02-12", subject: "Design", courses: 2, students: 560, revenue: "₹28,000", rating: 4.6, status: "Active" },
];

const STATUS_COLORS = {
    Active: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Suspended: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function Instructors() {
    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState(null);

    const filtered = INSTRUCTORS.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Instructor Management</h1>
                    <p className="text-gray-500 mt-1 text-sm">View instructor profiles, course portfolios, and revenue contributions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] text-white rounded-xl text-sm font-medium border border-white/5 transition-all">
                        <Filter size={15} /> Filter
                    </button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
                        <input
                            value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search instructors..."
                            className="pl-9 pr-4 py-2 bg-[#1a1a1a] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-64 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Instructors", value: "142" },
                    { label: "Total Courses Published", value: "328" },
                    { label: "Avg. Student Rating", value: "4.73 ★" },
                    { label: "Revenue Attributed", value: "₹14.2L" },
                ].map((s, i) => (
                    <div key={i} className="bg-[#111] p-4 rounded-xl border border-white/5 shadow-xl">
                        <div className="text-xl font-bold text-white">{s.value}</div>
                        <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Table + Expandable Course Rows */}
            <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-[#151515]">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-8"></th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructor</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Courses</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Students</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map(inst => (
                                <React.Fragment key={inst.id}>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
