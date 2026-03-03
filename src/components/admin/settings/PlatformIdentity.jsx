import React, { useState } from 'react'
import { Globe } from 'lucide-react'
import SectionCard from '../common/SectionCard'
import Input from '../common/Input'

const PlatformIdentity = () => {

    const [platformName, setPlatformName] = useState("WebBeetles");
    const [tagline, setTagline] = useState("Learn. Grow. Succeed.");
    const [supportEmail, setSupportEmail] = useState("support@webbeetles.com");

    return (
        <SectionCard icon={Globe} title="Platform Identity">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Platform Name" value={platformName} onChange={setPlatformName} />
                <Input label="Tagline" value={tagline} onChange={setTagline} />
                <Input label="Support Email" value={supportEmail} onChange={setSupportEmail} type="email" />
                <Input label="Support Phone" value="+91 9876 543 210" onChange={() => { }} />
            </div>
        </SectionCard>
    )
}

export default PlatformIdentity