import React from 'react'

const DeleteCourseModal = ({ setCourses, setSelectedCourse, selectedCourse, showDeleteModal, setShowDeleteModal }) => {

    const handleDeleteCourse = (id) => {
        apiCalls.deleteCourse(id);
        setCourses(courses.filter(c => c.id !== id));
        setShowDeleteModal(null);
        if (selectedCourse?.id === id) setSelectedCourse(null);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-800">
                <h2 className="text-2xl font-bold mb-4">Delete Course?</h2>
                <p className="text-gray-400 mb-6">Are you sure you want to delete "{showDeleteModal.title}"? This action cannot be undone.</p>
                <div className="flex gap-3">
                    <button onClick={() => handleDeleteCourse(showDeleteModal.id)} className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
                        Delete
                    </button>
                    <button onClick={() => setShowDeleteModal(null)} className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCourseModal