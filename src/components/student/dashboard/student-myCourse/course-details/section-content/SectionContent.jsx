import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Lock } from 'lucide-react';
import LessonItem from './lesson-item/LessonItem';
import { formatToHHMMSS } from '../../../../../../util/timeFormat/timeFormat';
import { useLectureProgress } from '../../../../../../tanstack/query/fetchVideoProgressDetails';

const SectionContent = ({ section, getSpecificCourseData, userAuthData }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const sectionLectures = useMemo(() => {
        if (!Array.isArray(getSpecificCourseData)) return [];

        return section.type === 'demo'
            ? getSpecificCourseData.filter(v => v.isPreview === true)
            : getSpecificCourseData.filter(v => v.isPreview === false);

    }, [getSpecificCourseData, section.type]);

    const { isLoading, data: progressData, error } = useLectureProgress({ student_id: userAuthData?.id, course_id: getSpecificCourseData?.[0]?.course_id, type: section.type });

    const totalSeconds = sectionLectures?.reduce((acc, value) => acc + Number(value?.duration || 0), 0) || 0;
    const totalLectureTiming = formatToHHMMSS(totalSeconds);

    const completedLecture = progressData?.filter(lecture => lecture?.completed);

    // console.log('Lecture progress details', progressData);

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <button
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 transition-colors ${section?.type == 'exam' ? 'cursor-not-allowed' : 'cursor'}`}>
                <div className='flex items-center gap-4'>
                    {section?.type != 'exam' ? (
                        isExpanded ? (
                            <ChevronDown className={`w-5 h-5 text-purple-400 ${section?.type == 'exam' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={() => (section?.type == 'exam' ? null : setIsExpanded(prev => !prev))} />
                        ) : (
                            <ChevronRight className={`w-5 h-5 text-purple-400 ${section?.type == 'exam' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={() => (section?.type == 'exam' ? null : setIsExpanded(prev => !prev))}
                            />
                        )) : (
                        <Lock className="w-5 h-5 text-gray-400 cursor-not-allowed" />
                    )}
                    <div className="text-left">
                        <h3 className="font-semibold text-lg">
                            {section?.title?.split(' ')?.map(t => t?.charAt(0)?.toUpperCase() + t?.slice(1)?.toLowerCase())?.join(" ") ?? 'N/A'}
                        </h3>
                        {section?.type != 'exam' ? (
                            <p className="text-sm text-gray-400">
                                {sectionLectures?.length ?? 0} Lesson{sectionLectures?.length > 1 ? 's' : ''}
                                {section?.type != 'document' && (<> • {totalLectureTiming}</>)}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-400">
                                Course not completed yet
                            </p>
                        )}
                    </div>
                </div>
                {section?.type != 'exam' && (
                    <div className="text-sm text-gray-400"> {completedLecture?.length ?? 0}/{sectionLectures?.length} completed </div>
                )}
            </button>

            {isExpanded && (
                <div className="border-t border-gray-800">
                    {sectionLectures?.map((lesson, index) => (
                        <LessonItem key={lesson.id ?? index} lesson={lesson} userAuthData={userAuthData} type={section?.type} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SectionContent;
