import React, { useState } from "react";
import InstructorHeader from "../../components/admin/instructor/InstructorHeader";
import SummaryStats from "../../components/admin/instructor/SummaryStats";
import InstructorTable from "../../components/admin/instructor/InstructorTable";

const INSTRUCTORS = [
    { id: 1, name: "Dr. Sarah Jenkins", email: "sarah@example.com", joined: "2023-11-10", subject: "Web Development", courses: 14, students: 4280, revenue: "₹2,14,000", rating: 4.9, status: "Active" },
    { id: 2, name: "Prof. Arthur Pendelton", email: "arthur@example.com", joined: "2023-12-05", subject: "Data Science", courses: 8, students: 2190, revenue: "₹1,09,500", rating: 4.7, status: "Active" },
    { id: 3, name: "Dr. Elena Rostova", email: "elena@example.com", joined: "2024-01-15", subject: "Design", courses: 3, students: 875, revenue: "₹43,750", rating: 4.5, status: "Suspended" },
    { id: 4, name: "Michael Chang", email: "michael@example.com", joined: "2024-02-01", subject: "Data Science", courses: 5, students: 1460, revenue: "₹73,000", rating: 4.8, status: "Active" },
    { id: 5, name: "Jessica Wong", email: "jessica@example.com", joined: "2024-02-12", subject: "Design", courses: 2, students: 560, revenue: "₹28,000", rating: 4.6, status: "Active" },
];

export default function Instructors() {
    const [search, setSearch] = useState("");

    const filtered = INSTRUCTORS.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <InstructorHeader search={search} setSearch={setSearch} />

            {/* Summary */}
            <SummaryStats />

            {/* Table + Expandable Course Rows */}
            <InstructorTable filtered={filtered} />
        </div>
    );
}
