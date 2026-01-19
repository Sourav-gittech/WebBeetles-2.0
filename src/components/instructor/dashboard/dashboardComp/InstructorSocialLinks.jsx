import React, { useState } from 'react'
import { Edit3, ExternalLink, LinkIcon, Loader2, Plus, X } from 'lucide-react';
import { useDispatch } from 'react-redux';

const InstructorSocialLinks = ({instructorDetails}) => {

    const socialLinks = instructorDetails?.social_links || [];

    const [tempSocials, setTempSocials] = useState([]);
    const [editingSocials, setEditingSocials] = useState(false);
    const [updatingSocials, setUpdatingSocials] = useState(false);

    const dispatch = useDispatch();
    
    let instructor_obj = {
        bio: instructorDetails?.bio,
        expertise: instructorDetails?.expertise,
        socialLinks: instructorDetails?.socialLinks
    }

    // console.log('Instructor details', instructor_obj);

    // handle social 
    const handleSocialsSave = async () => {
        setUpdatingSocials(true);
        const cleanedSocials = tempSocials
            .filter(s => s.platform.trim() && s.url.trim())
            .map(({ platform, url }) => ({ platform, url }));

        instructor_obj = { ...instructor_obj, socialLinks: cleanedSocials };

        if (tempSocials.length === 0) {
            toastifyAlert.warn("Socials cannot be empty!");
            return;
        }
        else {
            dispatch(updateInstructor(instructor_obj))
                .then(res => {
                    console.log('Response from socials update', res);
                    if (res.meta.requestStatus === "fulfilled") {
                        setEditingSocials(false);
                        toastifyAlert.success(res.payload.message);
                    }
                })
                .catch(err => {
                    console.error("Error occurred in updating socials", err);
                    getSweetAlert("Oops...", "Something went wrong!", "error");
                })
                .finally(() => {
                    setUpdatingSocials(false);
                });
        }
    };

    const addSocialLink = () => {
        setTempSocials([...tempSocials, { platform: "", url: "", _id: Date.now().toString() }]);
    };

    const updateSocialLink = (id, field, value) => {
        setTempSocials(tempSocials.map(s => s._id === id ? { ...s, [field]: value } : s));
    };

    const removeSocialLink = (id) => {
        setTempSocials(tempSocials.filter(s => s._id !== id));
    };

    const getSocialIcon = (platform) => {
        const p = (platform || "").toLowerCase();

        if (p.includes("linkedin")) return <Linkedin size={16} className="text-blue-600" />;
        if (p.includes("twitter") || p.includes("x.com")) return <Twitter size={16} className="text-sky-500" />;
        if (p.includes("github")) return <Github size={16} className="text-gray-800 dark:text-gray-200" />;
        if (p.includes("instagram")) return <Instagram size={16} className="text-pink-500" />;
        if (p.includes("facebook")) return <Facebook size={16} className="text-blue-500" />;
        if (p.includes("youtube")) return <Youtube size={16} className="text-red-600" />;
        if (p.includes("dribbble")) return <Dribbble size={16} className="text-pink-400" />;
        if (p.includes("twitch")) return <Twitch size={16} className="text-purple-500" />;

        if (p.includes("pinterest")) return <FaPinterest size={16} className="text-red-500" />;
        if (p.includes("discord")) return <FaDiscord size={16} className="text-indigo-500" />;
        if (p.includes("slack")) return <FaSlack size={16} className="text-purple-400" />;
        if (p.includes("reddit")) return <FaReddit size={16} className="text-orange-500" />;

        if (p.includes("mailto:") || p.includes("@")) return <Mail size={16} className="text-rose-600" />;
        if (p.includes("http") || p.includes("www")) return <Globe size={16} className="text-green-600" />;

        return <Globe size={16} />;
    };

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-blue-500/30 flex items-center justify-center border border-blue-400/30"><LinkIcon size={18} className="text-blue-300" /></div>
                    Social Links
                </h2>
                {!editingSocials && <button onClick={() => { setTempSocials([...socialLinks]); setEditingSocials(true); }} className="text-xs sm:text-sm text-purple-200 hover:text-white font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all border border-white/20"><Edit3 size={14} className="inline mr-1" /> Edit</button>}
            </div>

            {!editingSocials ? (
                <div className="space-y-2">
                    {socialLinks.length > 0 ? socialLinks.map((link, idx) => (
                        <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 hover:bg-white/15 px-4 py-3 rounded-lg border border-white/10 hover:border-white/30 transition-all group">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 text-blue-300 group-hover:scale-110 transition-transform">{getSocialIcon(link.platform)}</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm capitalize">{link.platform}</p>
                                <p className="text-purple-200 text-xs truncate">{link.url}</p>
                            </div>
                            <ExternalLink size={16} className="text-purple-300 group-hover:text-white" />
                        </a>
                    )) : <p className="text-purple-200 text-sm">No social links.</p>}
                </div>
            ) : (
                <div className="space-y-3">
                    {tempSocials.map((link) => (
                        <div key={link._id} className="flex gap-2">
                            <input type="text" value={link.platform} onChange={(e) => updateSocialLink(link._id, 'platform', e.target.value)}
                                placeholder="Platform" className="w-1/3 bg-white/10 text-purple-100 placeholder:text-purple-300/50 rounded-lg px-3 py-2 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400/50" />
                            <input type="url" value={link.url} onChange={(e) => updateSocialLink(link._id, 'url', e.target.value)}
                                placeholder="URL" className="flex-1 bg-white/10 text-purple-100 placeholder:text-purple-300/50 rounded-lg px-3 py-2 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400/50" />
                            <button onClick={() => removeSocialLink(link._id)} className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-2 rounded-lg border border-red-400/30"><X size={16} /></button>
                        </div>
                    ))}
                    <button onClick={addSocialLink}
                        className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold border border-white/20 flex items-center justify-center gap-2">
                        <Plus size={16} /> Add Link
                    </button>
                    <div className="flex gap-2">
                        <button onClick={handleSocialsSave} disabled={updatingSocials} className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
                            {updatingSocials ? <><Loader2 size={14} className="inline animate-spin mr-2" />Saving...</> : 'Save'}
                        </button>
                        <button onClick={() => setEditingSocials(false)} disabled={updatingSocials} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold border border-white/20">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InstructorSocialLinks