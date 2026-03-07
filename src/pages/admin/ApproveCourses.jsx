import React, { useState } from "react";
import ApproveCourseHeader from "../../components/admin/approve-course/ApproveCourseHeader";
import ApproveCourseStats from "../../components/admin/approve-course/ApproveCourseStats";
import PendingTable from "../../components/admin/approve-course/PendingTable";
import LiveCourseTable from "../../components/admin/approve-course/live-course/LiveCourseTable";
import PreviewModal from "../../components/admin/approve-course/modal/previewModal";
import RejectedCourseTable from "../../components/admin/approve-course/reject-course/RejectedCourseTable";

const PENDING_COURSES = [
    { id: 1, title: "Flutter & Dart Complete Bootcamp", instructor: "Michael Chang", cat: "Development", submitted: "2024-02-25", duration: "18h 45m", modules: 12, price: "₹2,499", lessons: 148, level: "Beginner to Advanced", preview: "Build stunning mobile apps for iOS and Android with Flutter 3.0 and native Dart. Includes real-world e-commerce project build from scratch." },
    { id: 2, title: "AWS Certified Cloud Practitioner", instructor: "Dr. Sarah Jenkins", cat: "Cloud", submitted: "2024-02-24", duration: "24h 10m", modules: 16, price: "₹3,499", lessons: 192, level: "Beginner", preview: "Complete preparation for the AWS CCP exam. Covers core AWS services, billing, security, and cloud architecture with hands-on labs." },
    { id: 3, title: "Microsoft Excel for Finance Professionals", instructor: "Anita Desai", cat: "Finance", submitted: "2024-02-23", duration: "9h 30m", modules: 7, price: "₹1,499", lessons: 74, level: "Intermediate", preview: "Master financial modeling, pivot tables, and advanced Excel functions used in investment banking, FP&A, and corporate finance." },
    { id: 4, title: "Creative Video Editing with DaVinci Resolve", instructor: "Priya Mehra", cat: "Design", submitted: "2024-02-22", duration: "14h 20m", modules: 10, price: "₹1,999", lessons: 110, level: "Beginner to Advanced", preview: "Professional-grade video editing using the industry-leading DaVinci Resolve 18. Includes color grading, Fusion VFX, and Fairlight audio mixing." },
    { id: 11, title: "Flutter & Dart Complete Bootcamp", instructor: "Michael Chang", cat: "Development", submitted: "2024-02-25", duration: "18h 45m", modules: 12, price: "₹2,499", lessons: 148, level: "Beginner to Advanced", preview: "Build stunning mobile apps for iOS and Android with Flutter 3.0 and native Dart. Includes real-world e-commerce project build from scratch." },
    { id: 12, title: "AWS Certified Cloud Practitioner", instructor: "Dr. Sarah Jenkins", cat: "Cloud", submitted: "2024-02-24", duration: "24h 10m", modules: 16, price: "₹3,499", lessons: 192, level: "Beginner", preview: "Complete preparation for the AWS CCP exam. Covers core AWS services, billing, security, and cloud architecture with hands-on labs." },
    { id: 13, title: "Microsoft Excel for Finance Professionals", instructor: "Anita Desai", cat: "Finance", submitted: "2024-02-23", duration: "9h 30m", modules: 7, price: "₹1,499", lessons: 74, level: "Intermediate", preview: "Master financial modeling, pivot tables, and advanced Excel functions used in investment banking, FP&A, and corporate finance." },
    { id: 14, title: "Creative Video Editing with DaVinci Resolve", instructor: "Priya Mehra", cat: "Design", submitted: "2024-02-22", duration: "14h 20m", modules: 10, price: "₹1,999", lessons: 110, level: "Beginner to Advanced", preview: "Professional-grade video editing using the industry-leading DaVinci Resolve 18. Includes color grading, Fusion VFX, and Fairlight audio mixing." },
];

const APPROVED_COURSES = [
    { id: 10, title: "Advanced React Patterns", instructor: "Dr. Sarah Jenkins", cat: "Development", approvedDate: "2024-02-20", students: 2840, revenue: "₹1,42,000" },
    { id: 11, title: "Python for Data Science", instructor: "Michael Chang", cat: "Data", approvedDate: "2024-02-18", students: 2190, revenue: "₹1,09,500" },
    { id: 20, title: "Advanced React Patterns", instructor: "Dr. Sarah Jenkins", cat: "Development", approvedDate: "2024-02-20", students: 2840, revenue: "₹1,42,000" },
    { id: 21, title: "Python for Data Science", instructor: "Michael Chang", cat: "Data", approvedDate: "2024-02-18", students: 2190, revenue: "₹1,09,500" },
    { id: 30, title: "Advanced React Patterns", instructor: "Dr. Sarah Jenkins", cat: "Development", approvedDate: "2024-02-20", students: 2840, revenue: "₹1,42,000" },
    { id: 31, title: "Python for Data Science", instructor: "Michael Chang", cat: "Data", approvedDate: "2024-02-18", students: 2190, revenue: "₹1,09,500" },
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
            <ApproveCourseHeader />

            {/* Counts */}
            <ApproveCourseStats pending={pending} approved={approved} rejected={rejected} />

            {/* Pending Table */}
            <PendingTable pending={pending} setPreview={setPreview} decide={decide} />

            {/* Approved Courses List */}
            <LiveCourseTable approved={approved} />
            
            {/* Rejected Courses List */}
            <RejectedCourseTable rejected={approved} />

            {/* Preview Modal */}
            {preview && (
                <PreviewModal preview={preview} setPreview={setPreview} />
            )}
        </div>
    );
}
