import React from 'react'
import { Upload, X } from 'lucide-react'

const UploadCourseVideoModal = ({ handleUploadVideo, setShowUploadModal, setUploadForm, uploadForm }) => {
    
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl p-8 max-w-2xl w-full border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Upload Content</h2>
                    <button onClick={() => setShowUploadModal(null)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Content Type</label>
                        <select value={uploadForm.type} onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors">
                            <option value="video">Video</option>
                            <option value="quiz">Quiz</option>
                            <option value="assignment">Assignment</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input type="text" value={uploadForm.title} onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })} placeholder="Lesson title" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Duration</label>
                        <input type="text" value={uploadForm.duration} onChange={(e) => setUploadForm({ ...uploadForm, duration: e.target.value })} placeholder="e.g., 15:30" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    {uploadForm.type === 'video' && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Video File</label>
                            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                                <Upload className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                                <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-500">MP4, MOV, AVI (max. 500MB)</p>
                                <input type="file" accept="video/*" className="hidden" />
                            </div>
                        </div>
                    )}
                    <div className="flex gap-3 pt-4">
                        <button onClick={handleUploadVideo} disabled={!uploadForm.title || !uploadForm.duration} className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors">
                            Upload
                        </button>
                        <button onClick={() => setShowUploadModal(null)} className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadCourseVideoModal