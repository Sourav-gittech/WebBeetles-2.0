import React from 'react'
import { Edit2, Eye, FileText, Play, PlayCircle, Trash2 } from 'lucide-react';

const InstructorLessonItem = ({ lesson, sectionId, handleDeleteVideo, setShowVideoModal }) => {
    const iconMap = { video: PlayCircle, quiz: FileText };
    const Icon = iconMap[lesson.type] || PlayCircle;

    return (
        <div className="flex items-center justify-between p-4 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0">
            <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                    <h4 className="font-medium">{lesson.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="capitalize">{lesson.type}</span>
                        <span>•</span>
                        <span>{lesson.duration}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{lesson.views} views</span>
                        </div>
                        {lesson.uploadedAt && (
                            <>
                                <span>•</span>
                                <span>Uploaded: {lesson.uploadedAt}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                {lesson.type === 'video' && (
                    <button onClick={() => setShowVideoModal(lesson)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Play
                    </button>
                )}
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors">
                    <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteVideo(sectionId, lesson.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default InstructorLessonItem