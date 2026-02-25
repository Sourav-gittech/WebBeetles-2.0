import React, { useState } from "react";
import { Users as UsersIcon, Search, Filter, Mail, Shield, Calendar, MoreVertical, Eye, Trash2, Ban, X } from "lucide-react";

const USERS = [
    { id: 1, name: "Subhradeep Nath", email: "subhradeep@example.com", joined: "2024-02-20", role: "Student", courses: 5, spent: "₹9,995", status: "Active" },
    { id: 2, name: "Aditi Sharma", email: "aditi@example.com", joined: "2024-02-18", role: "Student", courses: 3, spent: "₹5,997", status: "Active" },
    { id: 3, name: "Rahul Verma", email: "rahul@example.com", joined: "2024-02-15", role: "Student", courses: 1, spent: "₹1,999", status: "Inactive" },
    { id: 4, name: "Sayan Ghosh", email: "sayan@example.com", joined: "2024-02-10", role: "Student", courses: 7, spent: "₹13,993", status: "Active" },
    { id: 5, name: "Priya Das", email: "priya@example.com", joined: "2024-02-05", role: "Student", courses: 4, spent: "₹7,996", status: "Active" },
    { id: 6, name: "Diya Krishnan", email: "diya@example.com", joined: "2024-01-28", role: "Student", courses: 2, spent: "₹3,998", status: "Active" },
    { id: 7, name: "Mohit Jain", email: "mohit@example.com", joined: "2024-01-20", role: "Student", courses: 0, spent: "₹0", status: "Inactive" },
];

const STATUS_COLORS = {
    Active: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Inactive: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function Users() {
    const [search, setSearch] = useState("");
    const [menu, setMenu] = useState(null);
    const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">User Management</h1>
                    <p className="text-gray-500 mt-1 text-sm">View, manage, and control all registered students on the platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] text-white rounded-xl text-sm font-medium border border-white/5 transition-all">
                        <Filter size={15} /> Filter
                    </button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
                        <input
                            value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search users..."
                            className="pl-9 pr-4 py-2 bg-[#1a1a1a] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-64 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Summary stats */}
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

            {/* Table */}
            <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-[#151515]">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Courses</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map(u => (
                                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
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
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500 bg-[#151515]">
                    <div>Showing {filtered.length} of 12,847 users</div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors disabled:opacity-30 text-xs" disabled>Previous</button>
                        <span className="text-xs bg-purple-600 text-white px-2.5 py-1 rounded-lg">1</span>
                        <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors text-xs">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
