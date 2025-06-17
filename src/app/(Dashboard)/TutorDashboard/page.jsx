import React from "react";
import Status from "../../../components/dashboard/Status";
import RevenueChart from "../../../components/dashboard/tutorDashboard/RevenueChart";
import TutorStatus from "../../../components/dashboard/tutorDashboard/TutorStatus";
const page = () => {
  return (
    <div className="min-h-screen w-full">
      <TutorStatus />
      <RevenueChart />
    </div>
  );
};

export default page;
