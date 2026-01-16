import React from 'react'
import LessonItem from './lesson-item/LessonItem'

const CourseContent = ({getSpecificCourseData}) => {
  return (
    <>
      {getSpecificCourseData?.sections?.map((section, index) => (
        <div key={index} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          <button onClick={() => setExpandedSections(prev => ({ ...prev, [section.id]: !prev[section.id] }))} className="w-full flex items-center justify-between p-4 hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-4">
              {expandedSections[section.id] ? <ChevronDown className="w-5 h-5 text-purple-400" /> : <ChevronRight className="w-5 h-5 text-purple-400" />}
              <div className="text-left">
                <h3 className="font-semibold text-lg">{section.sectionTitle}</h3>
                <p className="text-sm text-gray-400">{section.lectures.length} lessons • 20.00</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">1/{section.lectures.length} completed</div>
          </button>
          {expandedSections[section.id] && (
            <div className="border-t border-gray-800">
              {section.lectures.map((lesson, index) => <LessonItem key={index} lesson={lesson} />)}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default CourseContent