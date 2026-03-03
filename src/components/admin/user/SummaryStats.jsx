import React from 'react'

const SummaryStats = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
                { label: "Total Students", value: "12,847" },
                { label: "Active Users", value: "10,921" },
                { label: "Inactive / Churned", value: "1,926" },
                { label: "Revenue from Users", value: "₹1.42 Cr" },
            ].map((s, i) => (
                <div key={i} className="bg-[#111] p-4 rounded-xl border border-white/5 shadow-xl">
                    <div className="text-xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
            ))}
        </div>
    )
}

export default SummaryStats