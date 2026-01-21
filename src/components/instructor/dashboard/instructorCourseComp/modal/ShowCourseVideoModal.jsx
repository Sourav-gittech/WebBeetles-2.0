import React from 'react'
import { Clock, Eye, X } from 'lucide-react'

const ShowCourseVideoModal = ({ setShowVideoModal, showVideoModal }) => {
    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl max-w-5xl w-full border border-gray-800">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold">{showVideoModal.title}</h2>
                    <button onClick={() => setShowVideoModal(null)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <iframe
                            src={showVideoModal.videoUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div className="mt-4 flex items-center gap-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {showVideoModal.duration}
                        </span>
                        <span className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            {showVideoModal.views} views
                        </span>
                        <span>Uploaded: {showVideoModal.uploadedAt}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowCourseVideoModal