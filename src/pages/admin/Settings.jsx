import React, { useState } from "react";
import { Save, Percent, Ticket, ShoppingCart, Globe, BellRing, AlertCircle, Plus, Trash2, Palette, Mail } from "lucide-react";

function SectionCard({ icon: Icon, title, children }) {
    return (
        <div className="bg-[#111] p-6 rounded-2xl border border-white/5 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
                    <Icon size={18} />
                </div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function Toggle({ value, onChange, label, description }) {
    return (
        <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-white/5">
            <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
            </div>
            <button
                onClick={() => onChange(!value)}
                className={`w-11 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0 ${value ? "bg-purple-600" : "bg-gray-700"}`}
            >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all ${value ? "left-6" : "left-1"}`} />
            </button>
        </div>
    );
}

function Input({ label, value, onChange, type = "text", suffix, hint }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
            <div className="relative">
                <input
                    type={type} value={value} onChange={e => onChange(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-[#1a1a1a] border border-white/5 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                />
                {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{suffix}</span>}
            </div>
            {hint && <p className="text-xs text-gray-600 mt-1.5">{hint}</p>}
        </div>
    );
}

export default function Settings() {
    const [gst, setGst] = useState("18");
    const [cartEnabled, setCartEnabled] = useState(true);
    const [promoEnabled, setPromoEnabled] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [newSignups, setNewSignups] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [platformName, setPlatformName] = useState("WebBeetles");
    const [tagline, setTagline] = useState("Learn. Grow. Succeed.");
    const [supportEmail, setSupportEmail] = useState("support@webbeetles.com");

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
                <div>
                    <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
                    <p className="text-gray-500 mt-1 text-sm">Control all global configuration for the WebBeetles platform.</p>
                </div>
                
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Settings */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Platform Identity */}
                    <SectionCard icon={Globe} title="Platform Identity">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="Platform Name" value={platformName} onChange={setPlatformName} />
                            <Input label="Tagline" value={tagline} onChange={setTagline} />
                            <Input label="Support Email" value={supportEmail} onChange={setSupportEmail} type="email" />
                            <Input label="Support Phone" value="+91 9876 543 210" onChange={() => { }} />
                        </div>
                    </SectionCard>

                    {/* Tax & GST */}
                    <SectionCard icon={Percent} title="Tax & GST Configuration">
                        <div className="space-y-4">
                            <Input label="Global GST Rate" value={gst} onChange={setGst} type="number" suffix="%" hint="Applies to all course purchases. Existing invoices remain unaffected." />
                            <div className="flex items-start gap-3 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
                                <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-yellow-500/80">Changing the GST rate will immediately apply to all new purchases and cart calculations.</p>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Promo Codes */}
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
                                <div key={i} className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-xl border border-white/5 group">
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
                            ))}
                        </div>
                    </SectionCard>

                    {/* Platform Toggles */}
                    <SectionCard icon={ShoppingCart} title="Platform Feature Toggles">
                        <div className="space-y-3">
                            <Toggle value={cartEnabled} onChange={setCartEnabled} label="Enable Cart / Multi-Course Purchase" description="Allow students to add multiple courses before checking out." />
                            <Toggle value={promoEnabled} onChange={setPromoEnabled} label="Enable Promo Code Entry at Checkout" description="Show the promo code input field in the cart." />
                            <Toggle value={newSignups} onChange={setNewSignups} label="Allow New Student Registrations" description="Disable to pause new user signups during maintenance." />
                            <Toggle value={emailNotifications} onChange={setEmailNotifications} label="Send Email Notifications" description="Trigger enrollment, approval, and system emails." />
                            <div className={`rounded-xl overflow-hidden transition-all duration-300 ${maintenanceMode ? "ring-2 ring-red-500/30" : ""}`}>
                                <Toggle value={maintenanceMode} onChange={setMaintenanceMode} label="🚨 Maintenance Mode" description="Makes the entire student site show a maintenance page." />
                            </div>
                        </div>
                    </SectionCard>

                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-[#111] p-5 rounded-2xl border border-white/5 shadow-2xl">
                        <h3 className="text-base font-bold text-white mb-4">System Status</h3>
                        <div className="space-y-3">
                            {[
                                { label: "Payment Gateway (Razorpay)", status: "Operational" },
                                { label: "Email Service", status: "Operational" },
                                { label: "Database (PostgreSQL)", status: "Optimized" },
                                { label: "CDN (Course Videos)", status: "Operational" },
                                { label: "Auth Service", status: "Operational" },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <span className="text-xs text-gray-500">{s.label}</span>
                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-yellow-500">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span> {s.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#111] p-5 rounded-2xl border border-white/5 shadow-2xl">
                        <h3 className="text-base font-bold text-white mb-4">Platform Summary</h3>
                        <div className="space-y-3">
                            {[
                                { label: "Platform Version", value: "v2.4.1" },
                                { label: "Current GST Rate", value: `${gst}%` },
                                { label: "Cart Status", value: cartEnabled ? "Enabled" : "Disabled" },
                                { label: "Active Promo Codes", value: promoCodes.filter(p => p.active).length },
                                { label: "Maintenance Mode", value: maintenanceMode ? "🔴 ON" : "🟡 OFF" },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <span className="text-xs text-gray-500">{s.label}</span>
                                    <span className="text-xs font-semibold text-white">{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#111] p-5 rounded-2xl border border-white/5 shadow-2xl">
                        <h3 className="text-base font-bold text-white mb-4">Danger Zone</h3>
                        <div className="space-y-2.5">
                            <button className="w-full px-4 py-2.5 bg-red-500/10 hover:bg-red-500/15 text-red-500 border border-red-500/20 rounded-xl text-sm font-semibold transition-colors text-left">
                                Clear All Cart Sessions
                            </button>
                            <button className="w-full px-4 py-2.5 bg-red-500/10 hover:bg-red-500/15 text-red-500 border border-red-500/20 rounded-xl text-sm font-semibold transition-colors text-left">
                                Flush Email Queue
                            </button>
                            <button className="w-full px-4 py-2.5 bg-red-500/10 hover:bg-red-500/15 text-red-500 border border-red-500/20 rounded-xl text-sm font-semibold transition-colors text-left">
                                Reset Analytics Cache
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
