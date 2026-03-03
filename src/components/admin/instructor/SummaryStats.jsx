import React from 'react'

const SummaryStats = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
                { label: "Total Instructors", value: "142" },
                { label: "Total Courses Published", value: "328" },
                { label: "Avg. Student Rating", value: "4.73 ★" },
                { label: "Revenue Attributed", value: "₹14.2L" },
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