import React from 'react'
import { calculateRating } from '../../../../../function/getRating'

const CourseDetails = ({ selectedCourse }) => {

    return (
        <div className="flex items-start justify-between mb-6">
            <div>
                <h1 className="text-4xl font-bold mb-3">{selectedCourse.title}</h1>
                <p className="text-lg text-gray-400 mb-4">by {selectedCourse.instructor.name}</p>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                    {[
                        { icon: Clock, text: '20:00' },
                        { icon: BookOpen, text: `15 Lessons` },
                        { icon: Award, text: 'Certificate Available' }
                    ].map((item, i) => (
                        <span key={i} className="flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            {item.text}
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 min-w-[280px]">
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Course Progress</span>
                        <span className="font-semibold text-purple-400">70%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all" style={{ width: `70%` }} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-800 rounded-lg p-3">
                        <div className="text-gray-400 mb-1">Completed</div>
                        <div className="font-semibold text-lg">10/15</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                        <div className="text-gray-400 mb-1">Rating</div>
                        <div className="font-semibold text-lg flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            {calculateRating(getSpecificCourseData)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails