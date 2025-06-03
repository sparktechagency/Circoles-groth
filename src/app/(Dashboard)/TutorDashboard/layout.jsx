import React from "react";
import TutorSidebar from "../../../components/dashboard/tutorDashboard/TutorSidebar";
import TopHeader from "../../../components/dashboard/TopHeader";

const layout = ({ children }) => {
  return (
    <div className="flex items-center bg-gray-200">
      {/* sidebar  */}

      <div>
        <TutorSidebar />
      </div>

      {/* content area */}
      <div className="w-full ml-[312px] mt-[80px]">
        <TopHeader />
        {children}
      </div>
    </div>
  );
};

export default layout;
