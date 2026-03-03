import React, { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale, LinearScale,
    PointElement, LineElement,
    BarElement, Tooltip, Filler, Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
    Users, BookOpen, Star, ShoppingCart,
    TrendingUp, ClipboardCheck, BookOpenCheck,
    DollarSign, Check, X,
    Activity, FileText, Bell, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import StatCardHeader from "../../components/admin/dashboard/StatCardHeader";
import EnrollmentChartView from "../../components/admin/dashboard/chart/EnrollmentChartView";
import RecentStudents from "../../components/admin/dashboard/RecentStudents";
import RevenueChartView from "../../components/admin/dashboard/chart/RevenueChartView";
import PendingInstructorReview from "../../components/admin/dashboard/PendingInstructorReview";
import TopCourse from "../../components/admin/dashboard/TopCourse";
import PendingCourseApproval from "../../components/admin/dashboard/PendingCourseApproval";
import TopCategory from "../../components/admin/dashboard/TopCategory";
import PerformActivity from "../../components/admin/dashboard/PerformActivity";
import QuickActions from "../../components/admin/dashboard/QuickActions";
import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler, Legend);

// --- Chart Options Helper ---
const baseChartOptions = (yLabel = "") => ({
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: "#111",
            titleColor: "#fff", bodyColor: "#9ca3af",
            borderColor: "rgba(168,85,247,0.3)", borderWidth: 1,
            padding: 12, displayColors: false,
            callbacks: {
                label: (ctx) => `${yLabel}${ctx.parsed.y.toLocaleString()}`,
            },
        },
    },
    scales: {
        x: { ticks: { color: "#6b7280", font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.04)" }, border: { display: false } },
        y: { ticks: { color: "#6b7280", font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.04)" }, border: { display: false } },
    },
    animation: { duration: 700, easing: "easeInOutQuart" },
});

// --- Top Courses Table ---
const TOP_COURSES = [
    { title: "Advanced React Patterns", instructor: "Dr. Sarah Jenkins", category: "Development", students: 2840, revenue: "₹1,42,000", rating: 4.9 },
    { title: "Python for Data Science", instructor: "Michael Chang", category: "Data", students: 2190, revenue: "₹1,09,500", rating: 4.8 },
    { title: "UI/UX Bootcamp 2024", instructor: "Jessica Wong", category: "Design", students: 1875, revenue: "₹93,750", rating: 4.7 },
    { title: "Node.js Mastery", instructor: "Prof. Arthur P.", category: "Development", students: 1460, revenue: "₹73,000", rating: 4.6 },
    { title: "Digital Marketing Pro", instructor: "Anita Desai", category: "Marketing", students: 1280, revenue: "₹64,000", rating: 4.5 },
];

// --- Pending Queue Items ---
const PENDING_INSTRUCTORS = [
    { name: "Brandon Lee", subject: "Machine Learning", applied: "1h ago" },
    { name: "Priya Mehra", subject: "Video Editing", applied: "3h ago" },
    { name: "Carlos Ruiz", subject: "Graphic Design", applied: "6h ago" },
];
const PENDING_COURSES = [
    { title: "Flutter Development Bootcamp", instructor: "Michael Chang", submitted: "2h ago" },
    { title: "AWS Cloud Practitioner", instructor: "Dr. Sarah Jenkins", submitted: "5h ago" },
    { title: "Excel for Finance", instructor: "Anita Desai", submitted: "Yesterday" },
];

// --- Recent Students ---
const RECENT_STUDENTS = [
    { name: "Aditi Sharma", email: "aditi@example.com", joined: "12m ago", course: "React Patterns" },
    { name: "Rahul Verma", email: "rahul@example.com", joined: "45m ago", course: "Python DS" },
    { name: "Sayan Ghosh", email: "sayan@example.com", joined: "2h ago", course: "UI/UX Bootcamp" },
    { name: "Priya Das", email: "priya@example.com", joined: "4h ago", course: "Node.js Mastery" },
];

// --- Section Header ---
function SectionHeader({ title, linkTo, linkLabel = "View All" }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">{title}</h2>
            {linkTo && (
                <Link to={linkTo} className="text-xs text-purple-400 hover:text-yellow-400 flex items-center gap-1 transition-colors">
                    {linkLabel} <ChevronRight size={14} />
                </Link>
            )}
        </div>
    );
}

// --- Main Dashboard ---
export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <DashboardHeader />

            {/* === ROW 1: Stat Cards (8 cards in 4-col grid) === */}
            <StatCardHeader />

            {/* === ROW 2: Charts (2/3 + 1/3) === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <EnrollmentChartView />

                {/* Recent Students */}
                <RecentStudents RECENT_STUDENTS={RECENT_STUDENTS} />
            </div>

            {/* === ROW 3: Revenue chart + Two pending queues === */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Revenue bar */}
                <RevenueChartView />

                {/* Pending Instructor Reviews */}
                <PendingInstructorReview PENDING_INSTRUCTORS={PENDING_INSTRUCTORS} />
            </div>

            {/* === ROW 4: Top Courses Table + Pending Course Queue === */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Top Courses Table */}
                <TopCourse TOP_COURSES={TOP_COURSES} />

                {/* Pending Course Approvals */}
                <PendingCourseApproval PENDING_COURSES={PENDING_COURSES} />
            </div>

            {/* === ROW 5: Top Categories + Platform Activity Feed === */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Category Breakdown */}
                <TopCategory />

                {/* Activity Feed */}
                <PerformActivity />

                {/* Quick Actions */}
                <QuickActions />
            </div>
        </div>
    );
}
