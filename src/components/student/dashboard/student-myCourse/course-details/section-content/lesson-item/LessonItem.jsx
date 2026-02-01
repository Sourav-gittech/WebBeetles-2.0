import { CheckCircle, File, FileCheck, PlayCircle, X } from 'lucide-react';
import React, { useState } from 'react';

const LessonItem = ({ lesson }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = lesson?.type === 'document' ? File : PlayCircle;
    const isDocument = lesson?.type === 'document';

    return (
        <>
            <div
                className="flex items-center justify-between p-4 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0"
                onClick={() => setIsPlaying(true)}
            >
                <div className="flex items-center gap-4">
                    <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${lesson.completed ? "bg-green-500" : "bg-purple-600"
                            }`}
                    >
                        {lesson.completed ? (
                            lesson.type === 'document' ? (
                                <FileCheck className="w-4 h-4" />
                            ) : (
                                <CheckCircle className="w-4 h-4" />
                            )
                        ) : (
                            <Icon className="w-4 h-4" />
                        )}
                    </div>

                    <div>
                        <h4 className="font-medium">
                            {(lesson?.video_title?.charAt(0)?.toUpperCase() + lesson?.video_title?.slice(1)) ?? 'N/A'}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            {!isDocument && <span>{lesson?.duration ?? 'N/A'}</span>}
                        </div>
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(true);
                    }}
                    className={`px-4 py-2 cursor-pointer ${lesson.completed
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-purple-600 hover:bg-purple-700"
                        } rounded-lg text-sm font-medium transition-colors`}
                >
                    {lesson.completed ? "Review" : isDocument ? "View" : "Start"}
                </button>
            </div>

            {/* MODAL */}
            {isPlaying && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="relative w-[90%] md:w-[70%] lg:w-[60%] bg-black rounded-2xl overflow-hidden shadow-2xl">
                        {/* Close button */}
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 z-10 cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* VIDEO */}
                        {!isDocument && (
                            <video className="w-full h-full rounded-2xl" src={lesson?.video_url}
                                controls autoPlay />
                        )}

                        {/* DOCUMENT */}
                        {isDocument && (
                            <iframe src={lesson?.video_url} title="Document Viewer" className="w-full h-[80vh] rounded-2xl" />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default LessonItem;
