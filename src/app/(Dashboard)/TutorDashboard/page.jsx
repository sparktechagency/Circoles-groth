import React from "react";
import Status from "../../../components/dashboard/Status";
import RevenueChart from "../../../components/dashboard/tutorDashboard/RevenueChart";
import TutorStatus from "../../../components/dashboard/tutorDashboard/TutorStatus";
import AdminRevenueChart from "../../../components/dashboard/admindashboard/AdminRevenueChart";
const page = () => {
  return (
    <div className="min-h-screen w-full">
      <TutorStatus />
      <AdminRevenueChart />
    </div>
  );
};

export default page;
