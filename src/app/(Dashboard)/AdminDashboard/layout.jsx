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

  const admin = data?.user?.[0]?.role === "admin";
  console.log("admin", admin);
  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/");
    }
  }, [isLoading, admin, router]);

  if (isLoading) {
    return <p className="text-center w-full">Loading...</p>;
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
