import React, { useState } from "react";
import { BookOpen, User, Clock, Check, X, Search, Eye, ChevronRight } from "lucide-react";

const PENDING_COURSES = [
    { id: 1, title: "Flutter & Dart Complete Bootcamp", instructor: "Michael Chang", cat: "Development", submitted: "2024-02-25", duration: "18h 45m", modules: 12, price: "₹2,499", lessons: 148, level: "Beginner to Advanced", preview: "Build stunning mobile apps for iOS and Android with Flutter 3.0 and native Dart. Includes real-world e-commerce project build from scratch." },
    { id: 2, title: "AWS Certified Cloud Practitioner", instructor: "Dr. Sarah Jenkins", cat: "Cloud", submitted: "2024-02-24", duration: "24h 10m", modules: 16, price: "₹3,499", lessons: 192, level: "Beginner", preview: "Complete preparation for the AWS CCP exam. Covers core AWS services, billing, security, and cloud architecture with hands-on labs." },
    { id: 3, title: "Microsoft Excel for Finance Professionals", instructor: "Anita Desai", cat: "Finance", submitted: "2024-02-23", duration: "9h 30m", modules: 7, price: "₹1,499", lessons: 74, level: "Intermediate", preview: "Master financial modeling, pivot tables, and advanced Excel functions used in investment banking, FP&A, and corporate finance." },
    { id: 4, title: "Creative Video Editing with DaVinci Resolve", instructor: "Priya Mehra", cat: "Design", submitted: "2024-02-22", duration: "14h 20m", modules: 10, price: "₹1,999", lessons: 110, level: "Beginner to Advanced", preview: "Professional-grade video editing using the industry-leading DaVinci Resolve 18. Includes color grading, Fusion VFX, and Fairlight audio mixing." },
];

const APPROVED_COURSES = [
    { id: 10, title: "Advanced React Patterns", instructor: "Dr. Sarah Jenkins", cat: "Development", approvedDate: "2024-02-20", students: 2840, revenue: "₹1,42,000" },
    { id: 11, title: "Python for Data Science", instructor: "Michael Chang", cat: "Data", approvedDate: "2024-02-18", students: 2190, revenue: "₹1,09,500" },
];

export default function ApproveCourses() {
    const [preview, setPreview] = useState(null);
    const [decisions, setDecisions] = useState({});

    const decide = (id, action) => {
        setDecisions(prev => ({ ...prev, [id]: action }));
        setPreview(null);
    };

    const pending = PENDING_COURSES.filter(c => !decisions[c.id]);
    const approved = [...APPROVED_COURSES, ...PENDING_COURSES.filter(c => decisions[c.id] === "approved")];
    const rejected = PENDING_COURSES.filter(c => decisions[c.id] === "rejected");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Course Approvals</h1>
                    <p className="text-gray-500 mt-1 text-sm">Review new courses submitted by instructors and publish them to the student catalogue.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
                    <input placeholder="Search courses..." className="pl-9 pr-4 py-2 bg-[#1a1a1a] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-64" />
                </div>
            </div>

            {/* Counts */}
            <div className="flex gap-4 flex-wrap">
                <div className="bg-[#111] px-5 py-3 rounded-xl border border-white/5 text-sm font-medium text-white">Pending <span className="text-yellow-400 ml-2">{pending.length}</span></div>
                <div className="bg-[#111] px-5 py-3 rounded-xl border border-white/5 text-sm font-medium text-white">Approved <span className="text-green-500 ml-2">{approved.length}</span></div>
                <div className="bg-[#111] px-5 py-3 rounded-xl border border-white/5 text-sm font-medium text-white">Rejected <span className="text-red-500 ml-2">{rejected.length}</span></div>
            </div>

            {/* Pending Table */}
            <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#151515]">
                    <h2 className="text-sm font-semibold text-white">Pending Review</h2>
                    <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-md border border-yellow-500/20">{pending.length} Awaiting</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructor</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Content</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {pending.map(course => (
                                <tr key={course.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                                                <BookOpen size={18} />
                                            </div>
                                            <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors max-w-[200px]">{course.title}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400 font-medium">
                                        <div className="flex items-center gap-1.5"><User size={13} className="text-purple-400" />{course.instructor}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md font-medium">{course.cat}</span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-500">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
                                            <span className="flex items-center gap-1"><BookOpen size={11} />{course.modules} modules · {course.lessons} lessons</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-yellow-500 font-semibold">{course.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{course.submitted}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => setPreview(course)} className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-lg transition-colors text-xs font-semibold">
                                                <Eye size={13} /> Preview
                                            </button>
                                            <button onClick={() => decide(course.id, "approved")} className="p-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-lg transition-colors"><Check size={15} /></button>
                                            <button onClick={() => decide(course.id, "rejected")} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg transition-colors"><X size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {pending.length === 0 && (
                                <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-500 text-sm">No pending courses — all caught up!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Approved Courses List */}
            <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#151515]">
                    <h2 className="text-sm font-semibold text-white">Live on Platform</h2>
                    <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/20">{approved.length} Published</span>
                </div>
                <div className="divide-y divide-white/5">
                    {approved.map(c => (
                        <div key={c.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group">
                            <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0"><Check size={16} /></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors truncate">{c.title}</p>
                                <p className="text-xs text-gray-500">{c.instructor} · Published {c.approvedDate || "Just now"}</p>
                            </div>
                            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md hidden sm:block">{c.cat}</span>
                            {c.students && <span className="text-sm text-gray-400 hidden md:block">{c.students.toLocaleString()} students</span>}
                            {c.revenue && <span className="text-sm text-yellow-500 font-semibold hidden md:block">{c.revenue}</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Preview Modal */}
            {preview && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setPreview(null)}>
                    <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <div>
                                <h3 className="text-xl font-bold text-white">{preview.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{preview.instructor} · {preview.cat}</p>
                            </div>
                            <button onClick={() => setPreview(null)} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"><X size={20} /></button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { label: "Duration", value: preview.duration },
                                    { label: "Modules", value: preview.modules },
                                    { label: "Lessons", value: preview.lessons },
                                    { label: "Price", value: preview.price },
                                ].map((s, i) => (
                                    <div key={i} className="bg-[#1a1a1a] rounded-xl p-3 border border-white/5 text-center">
                                        <div className="text-lg font-bold text-white">{s.value}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Level</p>
                                <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md font-medium">{preview.level}</span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Course Overview</p>
                                <p className="text-sm text-gray-300 leading-relaxed">{preview.preview}</p>
                            </div>
                        </div>
                        <div className="p-5 border-t border-white/5 flex justify-end gap-3 bg-[#0d0d0d] rounded-b-2xl">
                            <button onClick={() => setPreview(null)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm font-medium transition-colors">Close</button>
                            <button onClick={() => decide(preview.id, "rejected")} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-sm font-semibold transition-colors"><X size={16} /> Reject</button>
                            <button onClick={() => decide(preview.id, "approved")} className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-purple-500/20"><Check size={16} /> Publish Course</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
