import React from 'react'
import SectionCard from '../common/SectionCard'
import { AlertCircle, Percent } from 'lucide-react'
import Input from '../common/Input'

const Tax = ({gst,setGst}) => {
    return (
        <SectionCard icon={Percent} title="Tax & GST Configuration">
            <div className="space-y-4">
                <Input label="Global GST Rate" value={gst} onChange={setGst} type="number" suffix="%" hint="Applies to all course purchases. Existing invoices remain unaffected." />
                <div className="flex items-start gap-3 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-500/80">Changing the GST rate will immediately apply to all new purchases and cart calculations.</p>
                </div>
            </div>
        </SectionCard>
    )
}

export default Tax