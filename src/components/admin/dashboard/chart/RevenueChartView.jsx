import React, { useMemo } from 'react'
import baseChartOptions from '../common/ChartOptions';
import { Bar } from 'react-chartjs-2';

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

const RevenueChartView = () => {
    return (
        <div className="bg-[#111] p-6 rounded-2xl border border-white/5 lg:col-span-3 shadow-xl">
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-semibold text-white">Revenue vs Refunds</h2>
                <span className="text-xs text-gray-500">2024</span>
            </div>
            <p className="text-2xl font-bold text-white mb-6">₹14,19,000 <span className="text-sm font-normal text-yellow-500 ml-1">this year</span></p>
            <div className="h-56"><RevenueChart /></div>
        </div>
    )
}

export default RevenueChartView