"use client";

import React, { useState } from "react";
import TutorSidebar from "../../../components/dashboard/tutorDashboard/TutorSidebar";
import TopHeader from "../../../components/dashboard/TopHeader";

const layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center bg-gray-200">
      {/* sidebar  */}

      <div>
        <TutorSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* content area */}
      <div className={` ${isOpen ? "w-full " : "w-full ml-[312px]"} w-full `}>
        <TopHeader isOpen={isOpen} />
        {children}
      </div>
    </div>
  );
};

export default layout;
