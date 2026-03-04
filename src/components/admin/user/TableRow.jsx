import React, { useState } from 'react'
import { Ban, Calendar, Eye, Mail, MoreVertical, Shield, Trash2 } from 'lucide-react'
import { formatDateDDMMYY } from '../../../util/dateFormat/dateFormat';
import { useUserWisePurchaseCourseDetails } from '../../../tanstack/query/fetchUserWisePurchaseCourseDetails';

const TableRow = ({ u }) => {

    const [menu, setMenu] = useState(null);
    const { isLoading, data, error } = useUserWisePurchaseCourseDetails(u?.id);
    // console.log("User wise course", data);

    const STATUS_COLORS = {
        Active: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        Inactive: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const VERIFIED_COLORS = {
        fulfilled: "bg-green-500/10 text-green-500 border-green-500/20",
        pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        rejected: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const totalAmount = (() => {
        const seenPurchases = new Set();

        return data?.reduce((acc, item) => {
            const purchaseId = item?.purchases?.id;

            if (!seenPurchases.has(purchaseId)) {
                seenPurchases.add(purchaseId);
                return acc + (item?.purchases?.amount || 0);
            }

            return acc;
        }, 0);
    })();

    return (
        <tr className="hover:bg-white/[0.02] transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center text-white font-bold text-sm border border-white/10 flex-shrink-0">
                        {u?.name?.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">{u?.name ?? 'N/A'}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={11} /> {u?.email ?? 'N/A'}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <Shield size={13} className="text-purple-400" /> {(u?.role?.charAt(0)?.toUpperCase() + u?.role?.slice(1)?.toLowerCase()) ?? 'N/A'}
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-300 font-medium">{data?.length ?? 0} course{data?.length > 1 ? 's' : ''}</td>
            <td className="px-6 py-4 text-sm text-yellow-500 font-semibold">{totalAmount?.toLocaleString() ?? 0}</td>
            <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1.5 mt-4">
                <Calendar size={13} /> {formatDateDDMMYY(u?.created_at)}
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${VERIFIED_COLORS[u?.is_verified]}`}>
                    {u?.is_verified == 'fulfilled' ? 'Verified' : u?.is_verified == 'pending' ? 'Pending' : 'Rejected'}
                </span>
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[u?.is_blocked ? 'Active' : 'Inactive']}`}>
                    {u?.is_blocked ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="relative inline-block">
                    <button onClick={() => setMenu(menu === u?.id ? null : u?.id)} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <MoreVertical size={17} />
                    </button>
                    {menu === u?.id && (
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