import React, { useEffect, useState } from "react";
import { Users as UsersIcon, Search, Filter, Mail, Shield, Calendar, MoreVertical, Eye, Trash2, Ban, X, Loader2 } from "lucide-react";
import UserHeader from "../../components/admin/user/UserHeader";
import SummaryStats from "../../components/admin/user/SummaryStats";
import UserTable from "../../components/admin/user/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents } from "../../redux/slice/allStudentSlice";

const USERS = [
    { id: 1, name: "Subhradeep Nath", email: "subhradeep@example.com", joined: "2024-02-20", role: "Student", courses: 5, spent: "₹9,995", status: "Active" },
    { id: 2, name: "Aditi Sharma", email: "aditi@example.com", joined: "2024-02-18", role: "Student", courses: 3, spent: "₹5,997", status: "Active" },
    { id: 3, name: "Rahul Verma", email: "rahul@example.com", joined: "2024-02-15", role: "Student", courses: 1, spent: "₹1,999", status: "Inactive" },
    { id: 4, name: "Sayan Ghosh", email: "sayan@example.com", joined: "2024-02-10", role: "Student", courses: 7, spent: "₹13,993", status: "Active" },
    { id: 5, name: "Priya Das", email: "priya@example.com", joined: "2024-02-05", role: "Student", courses: 4, spent: "₹7,996", status: "Active" },
    { id: 6, name: "Diya Krishnan", email: "diya@example.com", joined: "2024-01-28", role: "Student", courses: 2, spent: "₹3,998", status: "Active" },
    { id: 7, name: "Mohit Jain", email: "mohit@example.com", joined: "2024-01-20", role: "Student", courses: 0, spent: "₹0", status: "Inactive" },
];

export default function Users() {

    const dispatch = useDispatch(),
        { isAllStudentLoading, getAllStudentData, isAllStudentError } = useSelector(state => state.allStudent);

    useEffect(() => {
        dispatch(fetchAllStudents())
            .then(res => {
                // console.log('Response for fetching all students', res);
            })
            .catch(err => {
                console.log('Error occured', err);
            })
    }, [dispatch]);

    const [search, setSearch] = useState("");
    const filtered = getAllStudentData?.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    // console.log('All available students', getAllStudentData);

    return (
        <div className="space-y-6">
            {/* Header */}
            <UserHeader search={search} setSearch={setSearch} />

            {/* Summary stats */}
            <SummaryStats getAllStudentData={getAllStudentData} />

            {/* Table */}
            {isAllStudentLoading ? <Loader2 className="inline animate-spin my-5 mx-50 w-12 h-12" /> :
                <UserTable filtered={filtered} allStudentData={getAllStudentData} />}

        </div>
    );
}
