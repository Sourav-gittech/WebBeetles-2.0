import React, { useState } from "react";
import InstructorReviewHeader from "../../components/admin/instructor-review/InstructorReviewHeader";
import StatsCounter from "../../components/admin/instructor-review/StatsCounter";
import ApplicationTable from "../../components/admin/instructor-review/ApplicationTable";
import DocumentViewerModal from "../../components/admin/instructor-review/DocumentViewerModal";
import ProfileModal from "../../components/admin/instructor-review/ProfileModal";

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
            <InstructorReviewHeader />

            {/* Status counters */}
            <StatsCounter APPLICATIONS={APPLICATIONS} decisions={decisions} />

            {/* Applications Table */}
            <ApplicationTable APPLICATIONS={APPLICATIONS} decisions={decisions} setModal={setModal} setDocViewer={setDocViewer} decide={decide} />

            {/* ── Profile Modal ─────────────────────────────────────────── */}
            {modal && (
                <ProfileModal setModal={setModal} modal={modal} setDocViewer={setDocViewer} decide={decide} />
            )}

            {/* ── Document Viewer Modal ─────────────────────────────────── */}
            {docViewer && <DocumentViewerModal app={docViewer} onClose={() => setDocViewer(null)} />}
        </div>
    );
}
