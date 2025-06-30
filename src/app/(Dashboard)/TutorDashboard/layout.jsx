"use client";

import React, { useState, useEffect } from "react";
import TutorSidebar from "../../../components/dashboard/tutorDashboard/TutorSidebar";
import TopHeader from "../../../components/dashboard/TopHeader";
import { FormDataProvider } from "../../../components/utils/FormDataContext";
import { useGetOwnprofileQuery } from "../../../redux/features/AuthApi";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetOwnprofileQuery();
  const router = useRouter();

  const isTutor = data?.user?.[0]?.role === "tutor";

  // Redirect only after loading completes and user is not tutor
  useEffect(() => {
    if (!isLoading && !isTutor) {
      router.push("/");
    }
  }, [isLoading, isTutor, router]);

  if (isLoading) {
    return <p className="text-center w-full">Loading...</p>;
  }

  return (
    <div className="flex items-center bg-gray-200">
      {/* sidebar */}
      <div>
        <TutorSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* content area */}
      <div className={`${isOpen ? "w-full" : "w-full ml-[312px]"} w-full`}>
        <TopHeader isOpen={isOpen} />
        <FormDataProvider>{children}</FormDataProvider>
      </div>
    </div>
  );
};

export default Layout;
