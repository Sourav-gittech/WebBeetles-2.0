import React, { useState } from "react";
import { Search, Eye, Check, X, FileText, Mail, Calendar, Download, ExternalLink, ChevronLeft, Loader2 } from "lucide-react";

// NOTE: `document` field holds the Supabase public URL of the file uploaded during signup.
// When Supabase bucket is live, this URL will be populated from the `instructors` table.
const APPLICATIONS = [
    {
        id: 1,
        name: "Brandon Lee",
        email: "brandon@example.com",
        applied: "2024-02-25",
        subject: "Machine Learning",
        bio: "PhD researcher specializing in ML and AI at MIT. 7+ years of industry experience at Google.",
        expertise: ["Python", "TensorFlow", "ML Ops", "AI Research"],
        status: "Pending",
        // TODO: Replace with real Supabase public URL when bucket is connected
        document: null, // e.g. "https://<project>.supabase.co/storage/v1/object/public/instructor/document/doc_1_..."
        documentName: "Brandon_Lee_Credentials.pdf",
    },
    {
        id: 2,
        name: "Priya Mehra",
        email: "priya.m@example.com",
        applied: "2024-02-24",
        subject: "Video Production",
        bio: "Award-winning Director & Editor with 12 years of filmmaking experience. Worked with Netflix and Amazon.",
        expertise: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
        status: "Pending",
        document: null,
        documentName: "Priya_Mehra_Portfolio.pdf",
    },
    {
        id: 3,
        name: "Carlos Ruiz",
        email: "carlos@example.com",
        applied: "2024-02-22",
        subject: "Graphic Design",
        bio: "Senior Brand Designer at Adobe. Led campaigns for Fortune 500 companies.",
        expertise: ["Photoshop", "Illustrator", "Brand Identity", "Figma"],
        status: "Pending",
        document: null,
        documentName: "Carlos_Ruiz_Portfolio.pdf",
    },
    {
        id: 4,
        name: "Emma Johnson",
        email: "emma@example.com",
        applied: "2024-02-20",
        subject: "Digital Finance",
        bio: "CFA with 15 years in investment banking and fintech consulting.",
        expertise: ["Financial Modeling", "Excel", "Bloomberg", "FRM"],
        status: "Pending",
        document: null,
        documentName: "Emma_Johnson_Resume.pdf",
    },
];

// ─── Document Viewer Modal ────────────────────────────────────────────────────
function DocumentViewerModal({ app, onClose }) {
    const [iframeLoading, setIframeLoading] = useState(true);

    const docUrl = app.document;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <FileText size={18} className="text-purple-400" />
                        <div>
                            <p className="text-sm font-semibold text-white">{app.documentName || "Qualification Document"}</p>
                            <p className="text-xs text-gray-500">Submitted by {app.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {docUrl && (
                            <>
                                <a
                                    href={docUrl}
                                    download={app.documentName}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-lg transition-colors text-xs font-medium"
                                >
                                    <Download size={13} /> Download
                                </a>
                                <a
                                    href={docUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-lg transition-colors text-xs font-medium"
                                >
                                    <ExternalLink size={13} /> Open in Tab
                                </a>
                            </>
                        )}
                        <button
                            onClick={onClose}
                            className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all ml-2"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Viewer Body */}
                <div className="flex-1 overflow-hidden relative rounded-b-2xl bg-[#111]">
                    {docUrl ? (
                        <>
                            {iframeLoading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-[#111]">
                                    <Loader2 size={32} className="text-purple-500 animate-spin" />
                                    <p className="text-sm text-gray-500">Loading document…</p>
                                </div>
                            )}
                            <iframe
                                src={docUrl}
                                title={app.documentName}
                                className="w-full h-full border-0 rounded-b-2xl"
                                onLoad={() => setIframeLoading(false)}
                            />
                        </>
                    ) : (
                        // Placeholder — shown until Supabase bucket is connected
                        <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                <FileText size={36} className="text-purple-400" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-lg mb-1">{app.documentName}</p>
                                <p className="text-gray-500 text-sm max-w-sm">
                                    The document uploaded by <span className="text-gray-300">{app.name}</span> during signup will appear here once the Supabase storage bucket is connected.
                                </p>
                            </div>
                            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs px-4 py-2 rounded-lg">
                                Supabase bucket integration pending
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function InstructorReviews() {
    const [modal, setModal] = useState(null);
    const [docViewer, setDocViewer] = useState(null);
    const [decisions, setDecisions] = useState({});

    const decide = (id, action) => {
        setDecisions((prev) => ({ ...prev, [id]: action }));
        setModal(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">New Instructor Applications</h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Review credentials and approve or reject applicants before they can access the instructor portal.
                    </p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
                    <input
                        placeholder="Search applicants..."
                        className="pl-9 pr-4 py-2 bg-[#1a1a1a] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-64"
                    />
                </div>
            </div>

            {/* Status counters */}
            <div className="flex gap-4 flex-wrap">
                <div className="bg-[#111] px-5 py-3 rounded-xl border border-white/5 text-sm font-medium text-white">
                    Pending <span className="text-yellow-400 ml-2">{APPLICATIONS.filter((a) => !decisions[a.id]).length}</span>
                </div>
                <div className="bg-[#111] px-5 py-3 rounded-xl border border-white/5 text-sm font-medium text-white">
                    Approved <span className="text-green-500 ml-2">{Object.values(decisions).filter((d) => d === "approved").length}</span>
                </div>
                <div className="bg-[#111] px-5 py-3 rounded-xl border border-white/5 text-sm font-medium text-white">
                    Rejected <span className="text-red-500 ml-2">{Object.values(decisions).filter((d) => d === "rejected").length}</span>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-[#151515]">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject Area</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Documents</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {APPLICATIONS.map((app) => (
                                <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Profile Modal ─────────────────────────────────────────── */}
            {modal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setModal(null)}
                >
                    <div
                        className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-2xl border border-white/10">
                                    {modal.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{modal.name}</h3>
                                    <p className="text-sm text-gray-400">{modal.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setModal(null)}
                                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Bio</p>
                                <p className="text-sm text-gray-300 leading-relaxed">{modal.bio}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {modal.expertise.map((e, i) => (
                                        <span key={i} className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md font-medium">
                                            {e}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Document preview card */}
                            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <FileText size={28} className="text-purple-500/60 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-white">{modal.documentName || `${modal.name} — Qualification Documents`}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Certificates, gov ID, and portfolio submitted via onboarding form.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setModal(null);
                                        setDocViewer(modal);
                                    }}
                                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-xs font-semibold shadow-lg shadow-purple-500/20"
                                >
                                    <Eye size={13} /> View Document
                                </button>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-5 border-t border-white/5 flex items-center justify-end gap-3 bg-[#0d0d0d] rounded-b-2xl">
                            <button
                                onClick={() => setModal(null)}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-colors text-sm font-medium"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => decide(modal.id, "rejected")}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl transition-colors text-sm font-semibold"
                            >
                                <X size={16} /> Reject Application
                            </button>
                            <button
                                onClick={() => decide(modal.id, "approved")}
                                className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors text-sm font-semibold shadow-lg shadow-purple-500/20"
                            >
                                <Check size={16} /> Approve Instructor
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Document Viewer Modal ─────────────────────────────────── */}
            {docViewer && <DocumentViewerModal app={docViewer} onClose={() => setDocViewer(null)} />}
        </div>
    );
}
