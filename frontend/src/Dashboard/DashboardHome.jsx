import React from "react";
import DashboardCards from "./DashboardHome/DashboardCards";
import DashboardCharts from "./DashboardHome/DashboardCharts";
import QuickActions from "./DashboardHome/QuickActions";

const DashboardHome = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
        Dashboard Overview
        <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#cdcd14] rounded-full"></span>
      </h1>
      <DashboardCards />
      {/* <QuickActions /> */}
      <DashboardCharts />
    </div>
  );
};

export default DashboardHome;
