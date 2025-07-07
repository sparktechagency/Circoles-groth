"use client";

import React, { useState, useEffect } from "react";
import UserSidebar from "../../../components/dashboard/userDashboard/UserSidebar";
import TopHeader from "../../../components/dashboard/TopHeader";
import { useGetOwnprofileQuery } from "../../../redux/features/AuthApi";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetOwnprofileQuery();
  const router = useRouter();

  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (data?.user?.[0]?.role !== "user") {
        router.push("/");
      } else {
        setCheckingAccess(false); // Access granted
      }
    }
  }, [isLoading, data, router]);

  if (isLoading || checkingAccess) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Checking access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center bg-gray-200">
      {/* sidebar */}
      <div>
        <UserSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* content area */}
      <div className={`${isOpen ? "w-full" : "w-full ml-[312px]"} w-full`}>
        <TopHeader isOpen={isOpen} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
