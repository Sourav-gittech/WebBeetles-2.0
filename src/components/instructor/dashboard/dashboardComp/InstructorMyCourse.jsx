import React from 'react'
import { ChevronRight, DollarSign, Eye, Star, Target, TrendingUp, Users, Video } from 'lucide-react'

const InstructorMyCourse = ({courses}) => {
    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 gap-2">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-blue-500/30 flex items-center justify-center border border-blue-400/30"><Video className="text-blue-300" size={18} /></div>
                    My Courses
                </h2>
                <button onClick={() => window.dispatchEvent(new CustomEvent("open-instructor-course"))} className="inline-flex items-center gap-1 text-purple-200 hover:text-white font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all border border-white/20 active:scale-95">
                    View All<ChevronRight size={14} />
                </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
                {courses.map((c) => (
                    <div key={c.id} className="group bg-white/5 rounded-xl p-3 sm:p-4 hover:bg-white/15 transition-all border border-white/10 hover:border-white/30 hover:shadow-2xl">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <div className="relative flex-shrink-0">
                                <img src={c.thumbnail} alt={c.title} className="w-full sm:w-32 lg:w-40 h-24 sm:h-24 lg:h-28 rounded-lg object-cover ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
                                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">Published</div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-white text-sm sm:text-base lg:text-lg mb-2 group-hover:text-blue-200 transition-colors line-clamp-2">{c.title}</h3>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md text-xs text-purple-200 font-medium border border-white/10"><Users size={12} />{c.students.toLocaleString()}</span>
                                    <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md text-xs text-purple-200 font-medium border border-white/10"><DollarSign size={12} />${c.revenue.toLocaleString()}</span>
                                    <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md text-xs text-purple-200 font-medium border border-white/10"><Star size={12} className="text-yellow-400 fill-yellow-400" />{c.rating}</span>
                                    <span className="inline-flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-md border border-green-400/30 text-green-300 text-xs font-bold"><TrendingUp size={12} />{c.trend}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white/10 rounded-lg p-2 sm:p-2.5 border border-white/20">
                                        <div className="flex items-center gap-1.5 mb-1"><Eye size={12} className="text-blue-400" /><span className="text-xs text-purple-200 font-medium">Views</span></div>
                                        <p className="text-base sm:text-lg font-bold text-white">{c.views.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-2 sm:p-2.5 border border-white/20">
                                        <div className="flex items-center gap-1.5 mb-1"><Target size={12} className="text-green-400" /><span className="text-xs text-purple-200 font-medium">Done</span></div>
                                        <p className="text-base sm:text-lg font-bold text-white">{c.completion}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InstructorMyCourse