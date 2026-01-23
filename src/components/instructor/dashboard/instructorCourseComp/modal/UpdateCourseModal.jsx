import React from 'react'
import { X } from 'lucide-react'

const UpdateCourseModal = ({ setShowEditModal, editForm, setEditForm, apiCalls, setCourses, setSelectedCourse, selectedCourse }) => {

    const features = editForm.features && editForm.features.length ? editForm.features : [""];

    const handleFeatureChange = (index, value) => {
        const updated = [...(editForm.features || [""])];
        updated[index] = value;
        setEditForm({ ...editForm, features: updated });
    };

    const addFeature = () => {
        if ((editForm.features || []).length >= 6) return;
        setEditForm({
            ...editForm,
            features: [...(editForm.features || [""]), ""],
        });
    };

    const removeFeature = (index) => {
        if (index === 0) return; // first always stays
        const updated = [...editForm.features];
        updated.splice(index, 1);
        setEditForm({ ...editForm, features: updated });
    };

    const handleEditCourse = () => {
        apiCalls.updateCourse(editForm.id, editForm);
        setCourses(courses.map(c => c.id === editForm.id ? { ...c, ...editForm } : c));
        if (selectedCourse?.id === editForm.id) setSelectedCourse({ ...selectedCourse, ...editForm });
        setShowEditModal(null);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-gray-900 rounded-xl p-8 max-w-2xl w-full border border-gray-800 my-8">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">Edit Course</h2>
                    <button onClick={() => setShowEditModal(null)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Course Title</label>
                        <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Price</label>
                            <input type="number" value={editForm.revenue} onChange={(e) => setEditForm({ ...editForm, revenue: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Course Features
                            </label>

                            <div className="space-y-3">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input type="text" value={feature} placeholder={`Feature ${index + 1}`}
                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                        />

                                        {index !== 0 && (
                                            <button type="button" onClick={() => removeFeature(index)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {features.length < 6 && (
                                    <button type="button" onClick={addFeature}
                                        className="text-sm text-purple-400 hover:text-purple-300 cursor-pointer">
                                        + Add Feature
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button onClick={handleEditCourse} className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors">
                            Save Changes
                        </button>
                        <button onClick={() => setShowEditModal(null)} className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCourseModal