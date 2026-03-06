import React, { useState } from 'react'
import { Mail, BookOpen, ChevronDown, Loader2 } from "lucide-react";
import { formatDateDDMMYYYYHHMM } from '../../../util/dateFormat/dateFormat';
import { useInstructorCourses } from '../../../tanstack/query/fetchInstructorCourses';
import { useInstructorStats } from '../../../tanstack/query/fetchInstructorStats';
import CourseRow from './CourseRow';
import ConfirmStatusModal from '../common/modal/ConfirmStatusModal';
import { useDispatch, useSelector } from 'react-redux';
import { allInstructor, updateInstructorBlockUnblockStatus } from '../../../redux/slice/instructorSlice';
import hotToast from '../../../util/alert/hot-toast';
import getSweetAlert from '../../../util/alert/sweetAlert';

const TableRow = ({ inst }) => {

    const [expanded, setExpanded] = useState(null);
    const [openMarkModal, setOpenMarkModal] = useState(false);
    const [instructorId, setInstructorId] = useState(null);
    const [changeStatus, setChangeStatus] = useState(null);

    const dispatch = useDispatch();
    const { isInstructorLoading, getInstructorData, isInstructorError } = useSelector(state => state?.instructor);
    const { isLoading: isCourseLoading, data: courseData, error: courseError } = useInstructorCourses(inst?.id);
    const { isLoading: isStatsLoading, data: statusData, error: statsError } = useInstructorStats(inst?.id);

    const STATUS_COLORS = {
        Active: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        Suspended: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const handleMark = () => {
        dispatch(updateInstructorBlockUnblockStatus({ id: instructorId, status: changeStatus }))
            .then(res => {
                // console.log('Response for updating status', res);

                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(allInstructor());
                    hotToast(`Instructor ${changeStatus ? 'blocked' : 'unblocked'} successfully!`, "success");
                    setOpenMarkModal(false);
                }
            })
            .catch(err => {
                console.log('Error occured', err);
                getSweetAlert("Error", `Something went wrong while ${!changeStatus ? 'blocked' : 'unblocked'} the instructor.`, "error");
            })
    }


    return (
        <>
            <tr className="hover:bg-white/[0.02] transition-colors group text-center">
                <td className="pl-6 py-4">
                    <ChevronDown size={16} className={`text-gray-600 transition-transform duration-200 cursor-pointer ${expanded === inst?.id ? "rotate-180" : ""}`} onClick={() => setExpanded(expanded === inst?.id ? null : inst?.id)} />
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-sm border border-white/10 flex-shrink-0">
                            {inst?.profile_image_url ? <img className='rounded-full' src={inst?.profile_image_url} alt={inst?.name?.charAt(0)} /> : inst?.name?.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors text-left">{inst?.name ?? 'N/A'}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 text-left"><Mail size={11} />{inst?.email ?? 'N/A'}</p>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 font-medium">
                    <div className="flex items-center gap-1.5"><BookOpen size={13} className="text-purple-400" />{isCourseLoading ? <Loader2 className='w-4 h-4 inline animate-spin' /> : courseData?.length ?? 'N/A'}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 font-medium">{isStatsLoading ? <Loader2 className='w-4 h-4 inline animate-spin' /> : statusData?.totalStudents ?? 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-yellow-500 font-semibold">{"₹" + (isStatsLoading ? <Loader2 className='w-4 h-4 inline animate-spin' /> : statusData?.totalRevenue?.toLocaleString() ?? 'N/A')}</td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                        {formatDateDDMMYYYYHHMM(inst?.last_login)}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[inst?.is_blocked ? 'Suspended' : 'Active']}`}>{inst?.is_blocked ? 'Blocked' : 'Active'}</span>
                </td>
                <td className="px-6 py-4">
                    <button className={`px-3 py-1 rounded-xl cursor-pointer ${inst?.is_blocked ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:text-green-200 hover:bg-green-500/40 hover:border-green-500/50' :
                        'bg-red-500/10 text-red-500 border-red-500/20 hover:text-red-200 hover:bg-red-500/40 hover:border-red-500/50'}`} onClick={() => { setOpenMarkModal(true); setInstructorId(inst?.id); setChangeStatus(!inst?.is_blocked); }}>{!inst?.is_blocked ? 'Block' : 'Active'}</button>
                </td>
            </tr>
            {expanded === inst?.id && (
                <tr className="bg-[#0d0d0d]">
                    <td colSpan={8} className="px-8 py-4 text-sm">
                        <div className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Published Courses by {inst?.name}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {courseData?.slice(0, 3)?.map((course, i) => (
                                <CourseRow key={i} course={course} i={i} />
                            ))}
                            {courseData?.length > 3 && (
                                <div className="bg-[#161616] rounded-xl p-3 border border-white/5 flex items-center justify-center text-xs text-purple-400 hover:text-yellow-400 transition-colors cursor-pointer">
                                    +{courseData?.length - 3} more course{courseData?.length - 3 > 1 ? 's' : ''}
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            )}

            {openMarkModal && (
                <ConfirmStatusModal setOpenMarkModal={setOpenMarkModal} handleMark={handleMark} isLoading={isInstructorLoading}
                    title={`${!changeStatus ? 'Unblock' : 'Block'} instructor`} subTitle={`Are you sure you want to ${!changeStatus ? 'unblock' : 'block'} the instructor`} />
            )}
        </>
    )
}

export default TableRow