import React from 'react'

const StatsCounter = ({ APPLICATIONS, decisions }) => {
    return (
        <div className="flex gap-4 flex-wrap">
            <div className="bg-[#111] px-5 py-3 rounded-xl border border-white/5 text-sm font-medium text-white">
                Pending <span className="text-yellow-400 ml-2">{APPLICATIONS.filter((a) => !decisions[a.id]).length}</span>
            </div>
            <div className="bg-[#111] px-5 py-3 rounded-xl border border-white/5 text-sm font-medium text-white">
                Approved <span className="text-green-500 ml-2">{Object.values(decisions).filter((d) => d === "approved").length}</span>
            </div>
            <div className="bg-[#111] px-5 py-3 rounded-xl border border-white/5 text-sm font-medium text-white">
                Rejected <span className="text-red-500 ml-2">{Object.values(decisions).filter((d) => d === "rejected").length}</span>
            </div>
        </div>
    )
}

export default StatsCounter