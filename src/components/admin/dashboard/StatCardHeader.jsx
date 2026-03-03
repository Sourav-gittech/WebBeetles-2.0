import React from 'react'
import { Users, BookOpen, ShoppingCart, TrendingUp, ClipboardCheck, BookOpenCheck, DollarSign } from "lucide-react";

const StatCardHeader = () => {

  function StatCard({ icon: Icon, label, value, sub, trend, trendUp = true, iconColor = "text-purple-400" }) {
    return (
      <div className="bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all duration-200 shadow-xl group">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-xl bg-[#1a1a1a] border border-white/5 ${iconColor}`}>
            <Icon size={20} />
          </div>
          {trend && (
            <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${trendUp ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"}`}>
              {trend}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
        {sub && <div className="text-xs text-gray-600 mt-1">{sub}</div>}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard icon={Users} label="Total Students" value="12,847" trend="+15.5%" sub="Registered users" />
      <StatCard icon={BookOpen} label="Active Courses" value="328" trend="+5.3%" sub="Published & live" />
      <StatCard icon={Users} label="Total Instructors" value="142" trend="+2.2%" iconColor="text-yellow-400" sub="Approved experts" />
      <StatCard icon={DollarSign} label="Total Revenue" value="₹14.2L" trend="+18.4%" sub="This financial year" />
      <StatCard icon={ShoppingCart} label="Active Cart Sessions" value="1,284" trend="-3.1%" trendUp={false} iconColor="text-yellow-400" sub="Pending checkout" />
      <StatCard icon={TrendingUp} label="Completion Rate" value="82%" trend="+4.1%" sub="Avg across all courses" />
      <StatCard icon={ClipboardCheck} label="Pending Reviews" value="3" trend="New" sub="Instructor applications" iconColor="text-yellow-400" />
      <StatCard icon={BookOpenCheck} label="Courses to Approve" value="8" trend="Pending" sub="Awaiting admin review" />
    </div>
  )
}

export default StatCardHeader