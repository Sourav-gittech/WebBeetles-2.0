import React, { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale, LinearScale,
    PointElement, LineElement,
    BarElement, ArcElement,
    Tooltip, Filler, Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { TrendingUp, Users, DollarSign, BookOpen, ShoppingCart, Star } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Filler, Legend);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const chartBase = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: "#111", titleColor: "#fff", bodyColor: "#9ca3af",
            borderColor: "rgba(168,85,247,0.3)", borderWidth: 1, padding: 12,
        },
    },
    scales: {
        x: { ticks: { color: "#6b7280", font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.04)" }, border: { display: false } },
        y: { ticks: { color: "#6b7280", font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.04)" }, border: { display: false } },
    },
    animation: { duration: 700 },
};

function KpiCard({ icon: Icon, label, value, trend, up = true }) {
    return (
        <div className="bg-[#111] p-5 rounded-2xl border border-white/5 shadow-xl hover:border-purple-500/20 transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-[#1a1a1a] rounded-xl border border-white/5 text-purple-400"><Icon size={20} /></div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${up ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"}`}>{trend}</span>
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
        </div>
    );
}

function ChartCard({ title, children, subtitle, full = false }) {
    return (
        <div className={`bg-[#111] p-6 rounded-2xl border border-white/5 shadow-xl ${full ? "col-span-full" : ""}`}>
            <div className="flex items-start justify-between mb-1">
                <h3 className="text-base font-semibold text-white">{title}</h3>
            </div>
            {subtitle && <p className="text-xs text-gray-500 mb-5">{subtitle}</p>}
            <div className="h-60">{children}</div>
        </div>
    );
}

export default function Analytics() {
    // Revenue line
    const revenueData = useMemo(() => ({
        labels: MONTHS,
        datasets: [{
            label: "Revenue (₹)", fill: true,
            data: [45000, 62000, 54000, 78000, 91000, 105000, 98000, 122000, 118000, 138000, 143000, 165000],
            backgroundColor: (ctx) => { const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 240); g.addColorStop(0, "rgba(168,85,247,0.35)"); g.addColorStop(1, "rgba(168,85,247,0)"); return g; },
            borderColor: "#a855f7", borderWidth: 2.5, tension: 0.4, pointRadius: 0, pointHoverRadius: 6,
            pointHoverBackgroundColor: "#a855f7", pointHoverBorderColor: "#fff",
        }],
    }), []);

    // Enrollment bar
    const enrollData = useMemo(() => ({
        labels: MONTHS,
        datasets: [{
            label: "New Enrollments",
            data: [310, 420, 380, 520, 490, 640, 580, 710, 660, 820, 775, 940],
            backgroundColor: (ctx) => { const v = ctx.parsed?.y || 0; return v > 700 ? "rgba(168,85,247,0.9)" : "rgba(168,85,247,0.5)"; },
            borderRadius: 6, borderSkipped: false,
        }],
    }), []);

    // Monthly Active Users
    const mauData = useMemo(() => ({
        labels: MONTHS,
        datasets: [
            {
                label: "Students",
                data: [3200, 3800, 3600, 4500, 4200, 5100, 4800, 5600, 5300, 6200, 5900, 6800],
                backgroundColor: "rgba(168,85,247,0.6)", borderRadius: 5, borderSkipped: false,
            },
            {
                label: "Instructors",
                data: [90, 105, 98, 120, 115, 130, 122, 140, 135, 148, 143, 152],
                backgroundColor: "rgba(234,179,8,0.6)", borderRadius: 5, borderSkipped: false,
            },
        ],
    }), []);

    // Completion rate line
    const completionData = useMemo(() => ({
        labels: MONTHS,
        datasets: [{
            label: "Completion %", fill: true,
            data: [72, 75, 68, 78, 82, 85, 81, 87, 89, 86, 90, 92],
            backgroundColor: (ctx) => { const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 240); g.addColorStop(0, "rgba(217,70,239,0.3)"); g.addColorStop(1, "rgba(217,70,239,0)"); return g; },
            borderColor: "#d946ef", borderWidth: 2.5, tension: 0.4,
            pointRadius: 4, pointBackgroundColor: "#d946ef", pointBorderColor: "#1a1a1a", pointBorderWidth: 2,
            pointHoverRadius: 7,
        }],
    }), []);

    // Doughnut - category
    const catData = useMemo(() => ({
        labels: ["Web Dev", "Data Science", "Design", "Marketing", "Others"],
        datasets: [{
            data: [38, 27, 18, 10, 7],
            backgroundColor: ["#a855f7", "#eab308", "#d946ef", "#3b82f6", "#374151"],
            borderColor: "#111", borderWidth: 3,
            hoverOffset: 8,
        }],
    }), []);

    // Doughnut - device
    const deviceData = useMemo(() => ({
        labels: ["Desktop", "Mobile", "Tablet"],
        datasets: [{
            data: [54, 38, 8],
            backgroundColor: ["#a855f7", "#eab308", "#7c3aed"],
            borderColor: "#111", borderWidth: 3,
            hoverOffset: 8,
        }],
    }), []);

    const lineOpts = {
        ...chartBase,
        plugins: { ...chartBase.plugins },
        scales: { ...chartBase.scales, y: { ...chartBase.scales.y, ticks: { ...chartBase.scales.y.ticks, callback: v => `₹${(v / 1000).toFixed(0)}k` } } },
    };

    const completionOpts = {
        ...chartBase,
        scales: { ...chartBase.scales, y: { ...chartBase.scales.y, min: 60, max: 100, ticks: { ...chartBase.scales.y.ticks, callback: v => `${v}%` } } },
    };

    const barOpts = { ...chartBase, plugins: { ...chartBase.plugins } };

    const mauOpts = {
        ...chartBase,
        plugins: {
            ...chartBase.plugins,
            legend: { display: true, labels: { color: "#9ca3af", usePointStyle: true, pointStyleWidth: 10, boxHeight: 8, font: { size: 12 } } },
        },
    };

    const doughnutOpts = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { position: "right", labels: { color: "#9ca3af", boxWidth: 12, boxHeight: 12, padding: 16, font: { size: 12 } } },
            tooltip: { backgroundColor: "#111", titleColor: "#fff", bodyColor: "#9ca3af", borderColor: "rgba(168,85,247,0.3)", borderWidth: 1, padding: 12 },
        },
        animation: { duration: 700 },
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Platform Analytics</h1>
                <p className="text-gray-500 mt-1 text-sm">Deep dive into growth, revenue, engagement and course performance across WebBeetles.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <KpiCard icon={DollarSign} label="Total Revenue" value="₹14.2L" trend="+18.4%" />
                <KpiCard icon={Users} label="Total Students" value="12,847" trend="+15.5%" />
                <KpiCard icon={BookOpen} label="Active Courses" value="328" trend="+5.3%" />
                <KpiCard icon={TrendingUp} label="Avg Completion" value="82%" trend="+4.1%" />
                <KpiCard icon={ShoppingCart} label="Cart Sessions" value="1,284" trend="-3.1%" up={false} />
                <KpiCard icon={Star} label="Avg Rating" value="4.7★" trend="+0.2" />
            </div>

            {/* Charts — Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Revenue Growth (2024)" subtitle="Monthly platform revenue from all course purchases">
                    <Line data={revenueData} options={lineOpts} />
                </ChartCard>
                <ChartCard title="Monthly Enrollments (2024)" subtitle="Number of new course enrollments per month">
                    <Bar data={enrollData} options={barOpts} />
                </ChartCard>
                <ChartCard title="Course Completion Rate" subtitle="Average completion % across all published courses">
                    <Line data={completionData} options={completionOpts} />
                </ChartCard>
                <ChartCard title="Monthly Active Users" subtitle="Students and instructors actively using the platform">
                    <Bar data={mauData} options={mauOpts} />
                </ChartCard>
                <ChartCard title="Courses by Category">
                    <Doughnut data={catData} options={doughnutOpts} />
                </ChartCard>
                <ChartCard title="User Traffic by Device">
                    <Doughnut data={deviceData} options={doughnutOpts} />
                </ChartCard>
            </div>

            {/* Top Performing Courses Table */}
            <div className="bg-[#111] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
                <div className="p-5 border-b border-white/5">
                    <h3 className="text-base font-semibold text-white">Top 10 Performing Courses</h3>
                    <p className="text-xs text-gray-500 mt-1">Ranked by total revenue generated this year.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#151515]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Students</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rating</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Completion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { title: "Advanced React Patterns", instructor: "Dr. Sarah Jenkins", cat: "Development", students: 2840, revenue: "₹1,42,000", rating: 4.9, comp: "88%" },
                                { title: "Python for Data Science", instructor: "Michael Chang", cat: "Data", students: 2190, revenue: "₹1,09,500", rating: 4.8, comp: "91%" },
                                { title: "UI/UX Bootcamp 2024", instructor: "Jessica Wong", cat: "Design", students: 1875, revenue: "₹93,750", rating: 4.7, comp: "84%" },
                                { title: "Node.js Mastery", instructor: "Prof. Arthur P.", cat: "Development", students: 1460, revenue: "₹73,000", rating: 4.6, comp: "79%" },
                                { title: "Digital Marketing Pro", instructor: "Anita Desai", cat: "Marketing", students: 1280, revenue: "₹64,000", rating: 4.5, comp: "76%" },
                            ].map((c, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-3 text-sm text-gray-600 font-semibold">#{i + 1}</td>
                                    <td className="px-6 py-3">
                                        <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">{c.title}</p>
                                        <p className="text-xs text-gray-500">{c.instructor}</p>
                                    </td>
                                    <td className="px-6 py-3"><span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-md">{c.cat}</span></td>
                                    <td className="px-6 py-3 text-sm text-gray-300 font-medium">{c.students.toLocaleString()}</td>
                                    <td className="px-6 py-3 text-sm text-yellow-500 font-semibold">{c.revenue}</td>
                                    <td className="px-6 py-3 text-sm text-gray-300 flex items-center gap-1 mt-3"><Star size={12} className="fill-yellow-400 text-yellow-400" /> {c.rating}</td>
                                    <td className="px-6 py-3 text-sm text-yellow-400 font-semibold">{c.comp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
