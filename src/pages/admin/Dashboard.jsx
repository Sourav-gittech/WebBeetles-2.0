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
    DollarSign, ArrowRight, Check, X, Eye,
    Activity, FileText, Bell, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

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

// --- Enrollment Line Chart ---
function EnrollmentChart() {
    const data = useMemo(() => ({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Enrollments",
            data: [310, 420, 380, 520, 490, 640, 580, 710, 660, 820, 775, 940],
            fill: true,
            backgroundColor: (ctx) => {
                const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 240);
                g.addColorStop(0, "rgba(168,85,247,0.3)"); g.addColorStop(1, "rgba(168,85,247,0)"); return g;
            },
            borderColor: "#a855f7", borderWidth: 2.5,
            tension: 0.4, pointRadius: 0, pointHoverRadius: 5,
            pointHoverBackgroundColor: "#a855f7", pointHoverBorderColor: "#fff",
        }],
    }), []);
    return <div className="h-full"><Line data={data} options={baseChartOptions()} /></div>;
}

// --- Revenue Bar Chart ---
function RevenueChart() {
    const data = useMemo(() => ({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Revenue (₹)",
                data: [45000, 62000, 54000, 78000, 91000, 105000, 98000, 122000, 118000, 138000, 143000, 165000],
                backgroundColor: "rgba(168,85,247,0.6)", borderRadius: 6, borderSkipped: false,
            },
            {
                label: "Refunds (₹)",
                data: [2200, 3100, 2700, 3900, 4550, 5250, 4900, 6100, 5900, 6900, 7150, 8250],
                backgroundColor: "rgba(239,68,68,0.4)", borderRadius: 6, borderSkipped: false,
            },
        ],
    }), []);
    const opts = {
        ...baseChartOptions("₹"), plugins: {
            ...baseChartOptions("₹").plugins,
            legend: {
                display: true,
                labels: { color: "#9ca3af", usePointStyle: true, pointStyleWidth: 10, boxHeight: 8, font: { size: 12 } },
            },
        },
        scales: {
            x: { ticks: { color: "#6b7280", font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.04)" }, border: { display: false } },
            y: { ticks: { color: "#6b7280", font: { size: 11 }, callback: v => `₹${(v / 1000).toFixed(0)}k` }, grid: { color: "rgba(255,255,255,0.04)" }, border: { display: false } },
        },
    };
    return <div className="h-full"><Bar data={data} options={opts} /></div>;
}

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

// --- Stat Card Component ---
function StatCard({ icon: Icon, label, value, sub, trend, trendUp = true, iconColor = "text-purple-400" }) {
    return (
        <div className="bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all duration-200 shadow-xl group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-[#1a1a1a] border border-white/5 ${iconColor}`}>
                    <Icon size={20} />
                </div>
                {trend && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${trendUp ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"}`}>
                        {trend}
                    </span>
                )}
            </div>
            <div className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{value}</div>
            <div className="text-sm text-gray-400">{label}</div>
            {sub && <div className="text-xs text-gray-600 mt-1">{sub}</div>}
        </div>
    );
}

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
            <div>
                <h1 className="text-3xl font-bold text-white">WebBeetles Admin Console</h1>
                <p className="text-gray-500 mt-1 text-sm">Welcome back, Admin. Here's what's happening on WebBeetles.</p>
            </div>

            {/* === ROW 1: Stat Cards (8 cards in 4-col grid) === */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Students" value="12,847" trend="+15.5%" sub="Registered users" />
                <StatCard icon={BookOpen} label="Active Courses" value="328" trend="+5.3%" sub="Published & live" />
                <StatCard icon={Users} label="Total Instructors" value="142" trend="+2.2%" iconColor="text-yellow-400" sub="Approved experts" />
                <StatCard icon={DollarSign} label="Total Revenue" value="₹14.2L" trend="+18.4%" sub="This financial year" />
                <StatCard icon={ShoppingCart} label="Active Cart Sessions" value="1,284" trend="-3.1%" trendUp={false} iconColor="text-yellow-400" sub="Pending checkout" />
                <StatCard icon={TrendingUp} label="Completion Rate" value="82%" trend="+4.1%" sub="Avg across all courses" />
                <StatCard icon={ClipboardCheck} label="Pending Reviews" value="3" trend="New" sub="Instructor applications" iconColor="text-yellow-400" />
                <StatCard icon={BookOpenCheck} label="Courses to Approve" value="8" trend="Pending" sub="Awaiting admin review" />
            </div>

            {/* === ROW 2: Charts (2/3 + 1/3) === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-[#111] p-6 rounded-2xl border border-white/5 lg:col-span-2 shadow-xl">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-base font-semibold text-white">Monthly Enrollments</h2>
                        <span className="text-xs text-gray-500">2024 — All Courses</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-6">9,248 <span className="text-sm font-normal text-yellow-500 ml-1">+22.4%</span></p>
                    <div className="h-56">
                        <EnrollmentChart />
                    </div>
                </div>

                {/* Recent Students */}
                <div className="bg-[#111] p-6 rounded-2xl border border-white/5 shadow-xl">
                    <SectionHeader title="Recent Signups" linkTo="/admin/users" />
                    <div className="space-y-3">
                        {RECENT_STUDENTS.map((s, i) => (
                            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    {s.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{s.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{s.course}</p>
                                </div>
                                <span className="text-xs text-gray-600 flex-shrink-0">{s.joined}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* === ROW 3: Revenue chart + Two pending queues === */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Revenue bar */}
                <div className="bg-[#111] p-6 rounded-2xl border border-white/5 lg:col-span-3 shadow-xl">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-base font-semibold text-white">Revenue vs Refunds</h2>
                        <span className="text-xs text-gray-500">2024</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-6">₹14,19,000 <span className="text-sm font-normal text-yellow-500 ml-1">this year</span></p>
                    <div className="h-56"><RevenueChart /></div>
                </div>

                {/* Pending Instructor Reviews */}
                <div className="bg-[#111] p-5 rounded-2xl border border-white/5 lg:col-span-2 shadow-xl flex flex-col">
                    <SectionHeader title="Pending Instructor Reviews" linkTo="/admin/instructor-reviews" />
                    <div className="space-y-3 flex-1">
                        {PENDING_INSTRUCTORS.map((p, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-[#161616] rounded-xl hover:bg-[#1a1a1a] transition-colors">
                                <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 text-xs font-bold flex-shrink-0">
                                    {p.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{p.name}</p>
                                    <p className="text-xs text-gray-500">{p.subject} · {p.applied}</p>
                                </div>
                                <div className="flex gap-1 flex-shrink-0">
                                    <button className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"><Check size={13} /></button>
                                    <button className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"><X size={13} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* === ROW 4: Top Courses Table + Pending Course Queue === */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Top Courses Table */}
                <div className="bg-[#111] rounded-2xl border border-white/5 shadow-xl lg:col-span-3 overflow-hidden">
                    <div className="p-5 flex items-center justify-between border-b border-white/5">
                        <h2 className="text-base font-semibold text-white">Top Performing Courses</h2>
                        <Link to="/admin/approve-courses" className="text-xs text-purple-400 hover:text-yellow-400 flex items-center gap-1 transition-colors">
                            Manage <ChevronRight size={14} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Course</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Students</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rating</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {TOP_COURSES.map((c, i) => (
                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-5 py-3">
                                            <p className="text-sm font-medium text-white group-hover:text-yellow-400 transition-colors truncate max-w-[180px]">{c.title}</p>
                                            <p className="text-xs text-gray-500">{c.instructor}</p>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-gray-300 font-medium">{c.students.toLocaleString()}</td>
                                        <td className="px-5 py-3 text-sm text-yellow-500 font-semibold">{c.revenue}</td>
                                        <td className="px-5 py-3">
                                            <span className="flex items-center gap-1 text-sm text-gray-300">
                                                <Star size={13} className="fill-yellow-400 text-yellow-400" /> {c.rating}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pending Course Approvals */}
                <div className="bg-[#111] p-5 rounded-2xl border border-white/5 shadow-xl lg:col-span-2 flex flex-col">
                    <SectionHeader title="Courses Awaiting Approval" linkTo="/admin/approve-courses" />
                    <div className="space-y-3 flex-1">
                        {PENDING_COURSES.map((c, i) => (
                            <div key={i} className="p-3 bg-[#161616] rounded-xl hover:bg-[#1a1a1a] transition-colors group">
                                <div className="flex items-start justify-between mb-1">
                                    <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors leading-tight">{c.title}</p>
                                    <div className="flex gap-1 flex-shrink-0 ml-2">
                                        <button className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"><Check size={13} /></button>
                                        <button className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"><X size={13} /></button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">{c.instructor} · {c.submitted}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* === ROW 5: Top Categories + Platform Activity Feed === */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Category Breakdown */}
                <div className="bg-[#111] p-5 rounded-2xl border border-white/5 shadow-xl">
                    <SectionHeader title="Top Course Categories" />
                    <div className="space-y-4">
                        {[
                            { label: "Web Development", pct: 38, color: "bg-purple-500" },
                            { label: "Data Science", pct: 27, color: "bg-yellow-500" },
                            { label: "Design (UI/UX)", pct: 18, color: "bg-fuchsia-500" },
                            { label: "Marketing", pct: 10, color: "bg-blue-500" },
                            { label: "Others", pct: 7, color: "bg-gray-600" },
                        ].map((cat, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">{cat.label}</span>
                                    <span className="text-white font-semibold">{cat.pct}%</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-2">
                                    <div className={`${cat.color} h-2 rounded-full transition-all`} style={{ width: `${cat.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-[#111] p-5 rounded-2xl border border-white/5 shadow-xl">
                    <SectionHeader title="Platform Activity" />
                    <div className="space-y-3">
                        {[
                            { text: 'Course "React Mastery" approved', sub: "2m ago", icon: <BookOpen size={14} className="text-yellow-400" /> },
                            { text: "New student enrolled in Python DS", sub: "8m ago", icon: <Users size={14} className="text-purple-400" /> },
                            { text: "Instructor application submitted", sub: "23m ago", icon: <ClipboardCheck size={14} className="text-yellow-400" /> },
                            { text: "₹4,999 payment received", sub: "41m ago", icon: <DollarSign size={14} className="text-yellow-500" /> },
                            { text: "New course submitted for review", sub: "1h ago", icon: <BookOpenCheck size={14} className="text-purple-400" /> },
                            { text: "System maintenance completed", sub: "2h ago", icon: <Activity size={14} className="text-gray-500" /> },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                                <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-300 leading-snug">{item.text}</p>
                                    <p className="text-xs text-gray-600 mt-0.5">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-[#111] p-5 rounded-2xl border border-white/5 shadow-xl">
                    <SectionHeader title="Quick Actions" />
                    <div className="space-y-2.5">
                        {[
                            { label: "Review Instructor Applications", to: "/admin/instructor-reviews", badge: "3 Pending", icon: <ClipboardCheck size={16} /> },
                            { label: "Approve New Courses", to: "/admin/approve-courses", badge: "8 Pending", icon: <BookOpenCheck size={16} /> },
                            { label: "Manage All Users", to: "/admin/users", badge: null, icon: <Users size={16} /> },
                            { label: "View Platform Analytics", to: "/admin/analytics", badge: null, icon: <TrendingUp size={16} /> },
                            { label: "Update Promo Codes", to: "/admin/settings", badge: null, icon: <FileText size={16} /> },
                            { label: "Update GST & Tax Rules", to: "/admin/settings", badge: null, icon: <Bell size={16} /> },
                        ].map((action, i) => (
                            <Link key={i} to={action.to} className="flex items-center justify-between w-full px-4 py-2.5 bg-[#161616] hover:bg-[#1e1e1e] rounded-xl transition-all group border border-transparent hover:border-purple-500/20">
                                <div className="flex items-center gap-2.5 text-gray-400 group-hover:text-white transition-colors">
                                    <span className="text-purple-400 group-hover:text-yellow-400 transition-colors">{action.icon}</span>
                                    <span className="text-sm font-medium">{action.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {action.badge && <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-md border border-yellow-500/20 font-medium">{action.badge}</span>}
                                    <ChevronRight size={14} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
