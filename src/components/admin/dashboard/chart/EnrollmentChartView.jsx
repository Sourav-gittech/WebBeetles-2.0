import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2';
import baseChartOptions from "./../common/ChartOptions";

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

const EnrollmentChartView = () => {

    return (
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
    )
}

export default EnrollmentChartView