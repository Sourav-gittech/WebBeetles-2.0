import { Trash2 } from 'lucide-react'
import React from 'react'

const PromocodeRow = ({ p, togglePromo, removePromo, i }) => {
    return (
        <div className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-xl border border-white/5 group">
            <code className="text-sm font-bold text-yellow-400 tracking-widest flex-shrink-0">{p.code}</code>
            <span className="text-xs text-gray-500 flex-shrink-0">{p.discount}{p.type === "Percentage" ? "%" : "₹"} off</span>
            <div className="flex-1 min-w-0 hidden sm:block">
                <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${Math.min((p.uses / p.max) * 100, 100)}%` }} />
                </div>
                <p className="text-xs text-gray-600 mt-1">{p.uses}/{p.max} uses</p>
            </div>
            <button onClick={() => togglePromo(i)} className={`w-9 h-5 rounded-full flex-shrink-0 transition-colors relative ${p.active ? "bg-purple-600" : "bg-gray-700"}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all ${p.active ? "left-[18px]" : "left-0.5"}`} />
            </button>
            <button onClick={() => removePromo(i)} className="p-1.5 text-red-500/50 hover:text-red-500 transition-colors flex-shrink-0"><Trash2 size={14} /></button>
        </div>
    )
}

export default PromocodeRow