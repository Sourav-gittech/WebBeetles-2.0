import React, { useState } from "react";
import { ShoppingCart, Globe } from "lucide-react";
import SectionCard from "../../components/admin/common/SectionCard";
import Input from "../../components/admin/common/Input";
import SettingsHeader from "../../components/admin/settings/SettingsHeader";
import PlatformIdentity from "../../components/admin/settings/PlatformIdentity";
import PlatformToggle from "../../components/admin/settings/PlatformToggle";
import SystemStatus from "../../components/admin/settings/SystemStatus";
import PlatformSummary from "../../components/admin/settings/PlatformSummary";
import DangerZone from "../../components/admin/settings/DangerZone";
import Certification from "../../components/admin/settings/Certification";

export default function Settings() {
    const [gst, setGst] = useState("18");
    const [promoCodes, setPromoCodes] = useState([
        { code: "WELCOME50", discount: "50", type: "Percentage", uses: 142, max: 500, active: true },
        { code: "FLAT200", discount: "200", type: "Flat", uses: 78, max: 200, active: true },
    ]);

    const [cartEnabled, setCartEnabled] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <SettingsHeader />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Settings */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Platform Identity */}
                    <PlatformIdentity />

                    {/* Platform Toggles */}
                    <PlatformToggle cartEnabled={cartEnabled} setCartEnabled={setCartEnabled} maintenanceMode={maintenanceMode} setMaintenanceMode={setMaintenanceMode } />

                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                   <SystemStatus />

                    <PlatformSummary gst={gst} cartEnabled={cartEnabled} maintenanceMode={maintenanceMode} promoCodes={promoCodes}/>

                    <Certification />
                    
                    <DangerZone />
                </div>
            </div>
        </div>
    );
}
