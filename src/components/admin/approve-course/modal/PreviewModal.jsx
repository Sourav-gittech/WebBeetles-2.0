import React from 'react'
import { Check, Play, ListVideo, X } from "lucide-react";

const PreviewModal = ({preview,setPreview}) => {
    const modal = ''
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setPreview(null)}>
            <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                        <h3 className="text-xl font-bold text-white">{preview.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{preview.instructor} · {preview.cat}</p>
                    </div>
                    <button onClick={() => setPreview(null)} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"><X size={20} /></button>
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
                    {/* Document preview card */}
                        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <ListVideo size={28} className="text-purple-500/60 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-white">{modal?.documentName || `${modal?.name} — Qualification Documents`}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Certificates, gov ID, and portfolio submitted via onboarding form.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setModal(null);
                                    setDocViewer(modal);
                                }}
                                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-xs font-semibold shadow-lg shadow-purple-500/20 cursor-pointer"
                            >
                                <Play size={13} /> Play Demo Video
                            </button>
                        </div>
                </div>
                <div className="p-5 border-t border-white/5 flex justify-end gap-3 bg-[#0d0d0d] rounded-b-2xl">
                    <button onClick={() => setPreview(null)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm font-medium transition-colors">Close</button>
                    <button onClick={() => decide(preview.id, "rejected")} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-sm font-semibold transition-colors"><X size={16} /> Reject Course</button>
                    <button onClick={() => decide(preview.id, "approved")} className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-purple-500/20"><Check size={16} /> Publish Course</button>
                </div>
            </div>
        </div>
    )
}

export default PreviewModal