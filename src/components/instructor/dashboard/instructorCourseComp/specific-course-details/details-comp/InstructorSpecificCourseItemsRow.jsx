import React from 'react'
import InstructorLessonItem from './InstructorLessonItem';
import { ChevronDown, ChevronRight, FileBadge, LockKeyhole, Trash2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstructorSpecificCourseItemsRow = ({ lectureData, selectedCourse, expandedSections, setExpandedSections, section, handleDeleteVideo, setShowVideoModal, uploadForm, setUploadForm, setShowUploadModal }) => {

    let lecture = [];

    if (section?.type == 'demo') {
        lecture = lectureData?.filter(lecture => lecture?.isPreview == true);
    }
    else if (section?.type == 'video') {
        lecture = lectureData?.filter(lecture => lecture?.isPreview != true && lecture?.type == 'video');
    }
    else if (section?.type == 'document') {
        lecture = lectureData?.filter(lecture => lecture?.isPreview != true && lecture?.type == 'video');
    }
    const totalLectureTiming = lecture?.reduce((acc, value) => acc + Number(value?.duration || 0), 0).toFixed(2);

    const canExpand = section?.type === "demo" || (section?.type !== "exam" && selectedCourse?.status === "approved") || (section?.type === "exam" && selectedCourse?.is_completed);

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="flex items-center justify-between p-4 bg-gray-800">
                <button onClick={canExpand ? () =>
                    setExpandedSections(prev => ({
                        ...prev,
                        [section.id]: !prev[section.id],
                    })) : undefined}
                    className={`flex items-center gap-4 flex-1 ${canExpand ? "cursor-pointer" : "cursor-not-allowed opacity-70"}`} >
                    {canExpand ? (
                        expandedSections[section.id] ? (
                            <ChevronDown className="w-5 h-5 text-purple-400" />) : (
                            <ChevronRight className="w-5 h-5 text-purple-400" />)) : (
                        <LockKeyhole className="w-5 h-5 text-white" />
                    )}

                    <div className="text-left">
                        <h3 className="font-semibold text-lg">{section?.title ?? 'N/A'}</h3>
                        {section?.type !== "exam" ?
                            <p className="text-sm text-gray-400">
                                {lecture?.length} lesson{lecture?.length > 1 ? "s" : ""}
                                {section?.type !== "document" ? ` • ${totalLectureTiming}` : ""}
                            </p> : <p className="text-sm text-gray-400">
                                {selectedCourse?.is_exam_scheduled ? 'Already scheduled' : 'Not scheduled yet'}
                            </p>}
                    </div>
                </button>

                {/* <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-600/20 text-red-400 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div> */}
            </div>
            {expandedSections[section.id] && (
                <div>
                    {lecture?.map((lesson) => <InstructorLessonItem key={lesson?.id} lesson={lesson} sectionId={section.id} handleDeleteVideo={handleDeleteVideo} setShowVideoModal={setShowVideoModal} />)}

                    {section?.type != 'demo' && section?.type != 'exam' && (
                        <div className="p-4 border-t border-gray-800">
                            <button onClick={!selectedCourse?.is_completed ? () => { setUploadForm({ ...uploadForm, sectionId: section.id }); setShowUploadModal(true); } : undefined} className={`w-full py-3 bg-purple-600/20 border border-purple-600/50 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-purple-400 ${selectedCourse?.is_completed ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-purple-600/30'}`}>
                                <Upload className="w-5 h-5" />
                                Upload Video / Add Content
                            </button>
                        </div>
                    )}
                    {section?.type == 'exam' && (
                        <div className="p-4 border-t border-gray-800">
                            <Link to={!selectedCourse?.is_exam_scheduled ?'/question-set':''} className={`w-full py-3 bg-green-600/20 border border-green-600/50 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-green-400 ${selectedCourse?.is_exam_scheduled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600/30'}`}>
                                <FileBadge className="w-5 h-5" />
                                Set Question Paper
                            </Link>
                        </div>
                    )}

                </div>
            )}
        </div>
    )
}

export default InstructorSpecificCourseItemsRow