const SectionCard = ({ icon: Icon, title, children }) => {
    return (
        <div className="bg-[#111] p-6 rounded-2xl border border-white/5 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
                    <Icon size={18} />
                </div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
            </div>
            {children}
        </div>
    );
}

export default SectionCard;