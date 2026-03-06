import React, { useEffect, useState } from "react";
import InstructorHeader from "../../components/admin/instructor/InstructorHeader";
import SummaryStats from "../../components/admin/instructor/SummaryStats";
import InstructorTable from "../../components/admin/instructor/InstructorTable";
import { allInstructor } from "../../redux/slice/instructorSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { allCourse } from "../../redux/slice/couseSlice";
import { useTotalRevenue } from "../../tanstack/query/fetchTotalRevenue";


export default function Instructors() {
    const dispatch = useDispatch(),
        { isInstructorLoading, getInstructorData, isInstructorError } = useSelector(state => state?.instructor),
        { isCourseLoading, getCourseData, isCourseError } = useSelector(state => state?.course),
        { isLoading: isRevenueLoading, data: revenueData, error: hasRevenueError } = useTotalRevenue();

    const [search, setSearch] = useState("");

    const filtered = getInstructorData?.filter(i => i?.name?.toLowerCase()?.includes(search?.toLowerCase()) || i?.email?.toLowerCase()?.includes(search?.toLowerCase()));

    useEffect(() => {
        dispatch(allInstructor())
            .then(res => {
                // console.log('Response for fetching all instructor', res)
            }).catch(err => {
                console.log('Error occured', err);
            })
    }, [dispatch]);

    useEffect(() => {
        dispatch(allCourse({ status: 'approved' }))
            .then(res => {
                // console.log('Response for fetching all instructor', res)
            }).catch(err => {
                console.log('Error occured', err);
            })
    }, [dispatch]);

    // console.log('All available instructors', getInstructorData);

    return (
        <div className="space-y-6">
            <InstructorHeader search={search} setSearch={setSearch} />

            {/* Summary */}
            <SummaryStats isInstructorLoading={isInstructorLoading} getInstructorData={getInstructorData} getCourseData={getCourseData}
                isCourseLoading={isCourseLoading} isRevenueLoading={isRevenueLoading} revenueData={revenueData} />

            {/* Table + Expandable Course Rows */}
            {isInstructorLoading ? <Loader2 className="inline animate-spin my-5 mx-50 w-12 h-12" /> :
                <InstructorTable filtered={filtered} getInstructorData={getInstructorData} />}
        </div>
    );
}
