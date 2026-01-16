import React from 'react'
import { calculateRating } from '../../../../../function/getRating';
import { getStarCount } from '../../../../../function/getStarCount';

const CourseReview = ({getSpecificCourseData}) => {
    return (
        <div className="bg-gray-900 rounded-xl p-8 mb-8 border border-gray-800">
            <div className="flex items-start gap-8">
                <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{calculateRating(getSpecificCourseData)}</div>
                    <Stars rating={Math.round(calculateRating(getSpecificCourseData))} />
                    <div className="text-sm text-gray-400 mt-2">Course Rating</div>
                </div>
                <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const counts = getStarCount()[0];
                        // console.log(counts);

                        const percentage = getStarCount()[1] != 0 ? (counts[star] / getStarCount()[1]) * 100 : 0;
                        return (
                            <div key={star} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-20">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">{star}</span>
                                </div>
                                <div className="flex-1 bg-gray-800 rounded-full h-2">
                                    <div className="bg-yellow-400 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
                                </div>
                                <span className="text-sm text-gray-400 w-12">{percentage.toFixed(0)}%</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default CourseReview