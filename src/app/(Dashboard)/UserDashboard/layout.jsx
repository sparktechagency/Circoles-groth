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

  const isUser = data?.user?.[0]?.role === "user";

  useEffect(() => {
    if (!isLoading && !isUser) {
      router.push("/");
    }
  }, [isLoading, isUser, router]);

  if (isLoading) {
    return <p className="text-center w-full">Loading...</p>;
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
