import React from 'react'
import { Eye, Check, X, FileText, Mail, Calendar } from "lucide-react";

const ApplicationRow = ({ app, decisions, setModal, setDocViewer, decide }) => {
    return (
        <tr className="hover:bg-white/[0.02] transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-sm border border-white/10 flex-shrink-0">
                        {app.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">{app.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail size={11} />
                            {app.email}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md font-medium">
                    {app.subject}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1 mt-4">
                <Calendar size={13} />
                {app.applied}
            </td>
            <td className="px-6 py-4">
                {decisions[app.id] ? (
                    <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${decisions[app.id] === "approved"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                            }`}
                    >
                        {decisions[app.id] === "approved" ? "Approved" : "Rejected"}
                    </span>
                ) : (
                    <span className="text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2.5 py-1 rounded-full font-semibold">
                        Pending Review
                    </span>
                )}
            </td>

            {/* Documents Column — View Document button */}
            <td className="px-6 py-4">
                <button
                    onClick={() => setDocViewer(app)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-lg transition-colors text-xs font-semibold"
                >
                    <FileText size={13} /> View Document
                </button>
            </td>

            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                    {/* View Profile */}
                    <button
                        onClick={() => setModal(app)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-lg transition-colors text-xs font-medium"
                    >
                        <Eye size={13} /> Profile
                    </button>
                    {!decisions[app.id] && (
                        <>
                            <button
                                onClick={() => decide(app.id, "approved")}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-lg transition-colors text-xs font-semibold"
                            >
                                <Check size={14} /> Approve
                            </button>
                            <button
                                onClick={() => decide(app.id, "rejected")}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg transition-colors text-xs font-semibold"
                            >
                                <X size={14} /> Reject
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default ApplicationRow