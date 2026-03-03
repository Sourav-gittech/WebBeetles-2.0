import React from 'react'
import SectionCard from '../common/SectionCard'
import { Plus, Ticket } from 'lucide-react'
import PromocodeRow from './PromocodeRow'

const Promocode = ({ promoCodes, newCode, setNewCode, newDiscount, setNewDiscount, addPromo, togglePromo, removePromo }) => {
    return (
        <SectionCard icon={Ticket} title="Promo Codes & Discounts">
            {/* Add New */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                <input
                    value={newCode} onChange={e => setNewCode(e.target.value)}
                    placeholder="Code (e.g. SALE30)"
                    className="px-3 py-2.5 bg-[#1a1a1a] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 uppercase font-medium"
                />
                <input
                    value={newDiscount} onChange={e => setNewDiscount(e.target.value)} type="number"
                    placeholder="Discount %"
                    className="px-3 py-2.5 bg-[#1a1a1a] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <button onClick={addPromo} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors">
                    <Plus size={16} /> Add Code
                </button>
            </div>
            {/* Code Table */}
            <div className="space-y-2">
                {promoCodes.map((p, i) => (
                    <PromocodeRow key={i} p={p} togglePromo={togglePromo} removePromo={removePromo} i={i} />
                ))}
            </div>
        </SectionCard>
    )
}

export default Promocode