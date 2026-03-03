import React, { useState } from 'react'
import Promocode from '../../components/admin/charge/Promocode'
import Tax from '../../components/admin/charge/Tax'
import ChargeHeader from '../../components/admin/charge/ChargeHeader';

const Charges = () => {

    const [gst, setGst] = useState("18");

    const [promoCodes, setPromoCodes] = useState([
        { code: "WELCOME50", discount: "50", type: "Percentage", uses: 142, max: 500, active: true },
        { code: "FLAT200", discount: "200", type: "Flat", uses: 78, max: 200, active: true },
    ]);
    const [newCode, setNewCode] = useState("");
    const [newDiscount, setNewDiscount] = useState("");

    const addPromo = () => {
        if (!newCode || !newDiscount) return;
        setPromoCodes(prev => [...prev, { code: newCode.toUpperCase(), discount: newDiscount, type: "Percentage", uses: 0, max: 100, active: true }]);
        setNewCode(""); setNewDiscount("");
    };

    const removePromo = (i) => setPromoCodes(prev => prev.filter((_, idx) => idx !== i));
    const togglePromo = (i) => setPromoCodes(prev => prev.map((p, idx) => idx === i ? { ...p, active: !p.active } : p));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <ChargeHeader />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Settings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tax & GST */}
                    <Tax gst={gst} setGst={{ setGst }} />

                    {/* Promo Codes */}
                    <Promocode promoCodes={promoCodes} newCode={newCode} setNewCode={setNewCode} newDiscount={newDiscount} setNewDiscount={setNewDiscount}
                        addPromo={addPromo} togglePromo={togglePromo} removePromo={removePromo} />
                </div>
            </div>
        </div>
    )
}

export default Charges