import React from 'react'
import InstructorLessonItem from './InstructorLessonItem';
import { ChevronDown, ChevronRight, Edit2, Trash2, Upload } from 'lucide-react';

const InstructorSpecificCourseItemsRow = ({ expandedSections, setExpandedSections, section, handleDeleteVideo, setShowVideoModal,uploadForm, setUploadForm, setShowUploadModal }) => {
    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="flex items-center justify-between p-4 bg-gray-800">
                <button onClick={() => setExpandedSections(prev => ({ ...prev, [section.id]: !prev[section.id] }))} className="flex items-center gap-4 flex-1">
                    {expandedSections[section.id] ? <ChevronDown className="w-5 h-5 text-purple-400" /> : <ChevronRight className="w-5 h-5 text-purple-400" />}
                    <div className="text-left">
                        <h3 className="font-semibold text-lg">{section.title}</h3>
                        <p className="text-sm text-gray-400">{section.lessons.length} lessons • {section.duration}</p>
                    </div>
                </button>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {expandedSections[section.id] && (
                <div>
                    {section.lessons.map((lesson) => <InstructorLessonItem key={lesson.id} lesson={lesson} sectionId={section.id} handleDeleteVideo={handleDeleteVideo} setShowVideoModal={setShowVideoModal} />)}
                    <div className="p-4 border-t border-gray-800">
                        <button onClick={() => { setUploadForm({ ...uploadForm, sectionId: section.id }); setShowUploadModal(true); }} className="w-full py-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/50 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-purple-400">
                            <Upload className="w-5 h-5" />
                            Upload Video / Add Content
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InstructorSpecificCourseItemsRow