import React, { useEffect, useState } from "react";
import InstructorReviewHeader from "../../components/admin/instructor-review/InstructorReviewHeader";
import StatsCounter from "../../components/admin/instructor-review/StatsCounter";
import ApplicationTable from "../../components/admin/instructor-review/ApplicationTable";
import DocumentViewerModal from "../../components/admin/instructor-review/modal/DocumentViewerModal";
import ProfileModal from "../../components/admin/instructor-review/modal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { allInstructor } from "../../redux/slice/instructorSlice";

export default function InstructorReviews() {

    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(null);
    const [docViewer, setDocViewer] = useState(null);

    const dispatch = useDispatch(),
        { isInstructorLoading, getInstructorData, isInstructorError } = useSelector(state => state?.instructor);

    const pendingRequest = getInstructorData?.filter(inst => inst?.application_status == 'pending');

    const filtered = pendingRequest?.filter(i => i?.name?.toLowerCase()?.includes(search?.toLowerCase()) || i?.email?.toLowerCase()?.includes(search?.toLowerCase()));

    useEffect(() => {
        dispatch(allInstructor())
            .then(res => {
                // console.log('Response for fetching all instructor', res)
            }).catch(err => {
                console.log('Error occured', err);
            })
    }, [dispatch]);

    // console.log('Instructor list', pendingRequest);

    return (
        <div className="space-y-6">
            <InstructorReviewHeader search={search} setSearch={setSearch} />

            {/* Status counters */}
            <StatsCounter isInstructorLoading={isInstructorLoading} getInstructorData={getInstructorData} />

            {/* Applications Table */}
            <ApplicationTable filtered={filtered} setModal={setModal} setDocViewer={setDocViewer} />

            {/* Profile Modal */}
            {modal && (
                <ProfileModal setModal={setModal} modal={modal} setDocViewer={setDocViewer} />
            )}

            {/* Document Viewer Modal */}
            {docViewer && <DocumentViewerModal app={docViewer} onClose={() => setDocViewer(null)} />}
        </div>
    );
}
