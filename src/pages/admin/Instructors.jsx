import React, { useEffect, useState } from "react";
import InstructorHeader from "../../components/admin/instructor/InstructorHeader";
import SummaryStats from "../../components/admin/instructor/SummaryStats";
import InstructorTable from "../../components/admin/instructor/InstructorTable";
import { allInstructor } from "../../redux/slice/instructorSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { allCourse } from "../../redux/slice/couseSlice";
import { useTotalRevenue } from "../../tanstack/query/fetchTotalRevenue";
import getSweetAlert from "../../util/alert/sweetAlert";


export default function Instructors() {

    const [search, setSearch] = useState("");

    const dispatch = useDispatch(),
        { isInstructorLoading, getInstructorData, isInstructorError } = useSelector(state => state?.instructor),
        { isCourseLoading, getCourseData, isCourseError } = useSelector(state => state?.course),
        { isLoading: isRevenueLoading, data: revenueData, error: hasRevenueError } = useTotalRevenue();

    const noPendingData = getInstructorData?.filter(ins => ins?.application_status != "pending");

    const filtered = noPendingData?.filter(i => i?.name?.toLowerCase()?.includes(search?.toLowerCase()) || i?.email?.toLowerCase()?.includes(search?.toLowerCase()));

    useEffect(() => {
        dispatch(allInstructor())
            .then(res => {
                // console.log('Response for fetching all instructor', res)
            }).catch(err => {
                console.log('Error occured', err);
            })
    }, [dispatch]);

    useEffect(() => {
        // if (!getCourseData.length || getCourseData.length === 0) {
        dispatch(allCourse({ status: 'approved', is_active: true, is_admin_block: false }))
            .then(res => {
                // console.error("response from course section", res);
            })
            .catch((err) => {
                getSweetAlert('Oops...', 'Something went wrong!', 'error');
                console.error("Error occurred", err);
            });
        // }
    }, [dispatch]);

    // console.log('All available instructors', noPendingData);

    return (
        <div className="space-y-6">
            <InstructorHeader search={search} setSearch={setSearch} />

            {/* Summary */}
            <SummaryStats isInstructorLoading={isInstructorLoading} getInstructorData={noPendingData} getCourseData={getCourseData}
                isCourseLoading={isCourseLoading} isRevenueLoading={isRevenueLoading} revenueData={revenueData} />

            {/* Table + Expandable Course Rows */}
            {isInstructorLoading ? <Loader2 className="inline animate-spin my-5 mx-50 w-12 h-12" /> :
                <InstructorTable filtered={filtered} getInstructorData={noPendingData} />}
        </div>
    );
}
