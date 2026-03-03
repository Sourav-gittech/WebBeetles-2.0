import React, { useState } from 'react'
import { Ban, Calendar, Eye, Mail, MoreVertical, Shield, Trash2 } from 'lucide-react'

const TableRow = ({u}) => {

    const [menu, setMenu] = useState(null);

    const STATUS_COLORS = {
        Active: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        Inactive: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
        <tr className="hover:bg-white/[0.02] transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center text-white font-bold text-sm border border-white/10 flex-shrink-0">
                        {u.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">{u.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={11} /> {u.email}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <Shield size={13} className="text-purple-400" /> {u.role}
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-300 font-medium">{u.courses} courses</td>
            <td className="px-6 py-4 text-sm text-yellow-500 font-semibold">{u.spent}</td>
            <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1.5 mt-4">
                <Calendar size={13} /> {u.joined}
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[u.status]}`}>
                    {u.status}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="relative inline-block">
                    <button onClick={() => setMenu(menu === u.id ? null : u.id)} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <MoreVertical size={17} />
                    </button>
                    {menu === u.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-30 overflow-hidden">
                            <button onClick={() => setMenu(null)} className="w-full px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 text-left flex items-center gap-2 transition-colors"><Eye size={14} /> View Profile</button>
                            <button onClick={() => setMenu(null)} className="w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 text-left flex items-center gap-2 transition-colors"><Ban size={14} /> Suspend User</button>
                            <button onClick={() => setMenu(null)} className="w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 text-left flex items-center gap-2 transition-colors"><Trash2 size={14} /> Delete User</button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default TableRow