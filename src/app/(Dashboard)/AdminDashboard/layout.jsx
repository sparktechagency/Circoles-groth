"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/dashboard/admindashboard/AdminSidebar";
import TopHeader from "../../../components/dashboard/TopHeader";
import { useRouter } from "next/navigation";
import { useGetOwnprofileQuery } from "../../../redux/features/AuthApi";

const Layout = ({ children }) => {
  const { data, isLoading } = useGetOwnprofileQuery();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (data?.user?.[0]?.role !== "admin") {
        router.push("/");
      } else {
        setCheckingAccess(false); // access granted
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
      {/* sidebar  */}
      <div>
        <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* content area */}
      <div className={` ${isOpen ? "w-full " : "w-full ml-[312px]"} w-full `}>
        <TopHeader isOpen={isOpen} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
