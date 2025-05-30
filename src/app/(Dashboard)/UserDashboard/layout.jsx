import TopHeader from "../../components/dashboard/TopHeader";
import UserSidebar from "../../components/dashboard/userDashboard/UserSidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex items-center bg-gray-200">
      {/* sidebar  */}

      <div>
        <UserSidebar />
      </div>

      {/* content area */}
      <div className="w-full ml-[312px] w-full mt-[80px]">
        <TopHeader />
        {children}
      </div>
    </div>
  );
};

export default layout;
