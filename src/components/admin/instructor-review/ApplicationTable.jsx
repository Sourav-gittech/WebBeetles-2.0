import React from 'react'
import ApplicationRow from './ApplicationRow'

const ApplicationTable = ({ APPLICATIONS, decisions, setModal, setDocViewer, decide }) => {
    return (
        <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-[#151515]">
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject Area</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Documents</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {APPLICATIONS.map((app) => (
                            <ApplicationRow key={app.id} app={app} decisions={decisions} setModal={setModal} setDocViewer={setDocViewer} decide={decide} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ApplicationTable