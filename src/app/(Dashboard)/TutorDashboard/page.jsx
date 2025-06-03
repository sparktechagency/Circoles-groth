import React from "react";
import Status from "../../../components/dashboard/Status";
import RevenueChart from "../../../components/dashboard/tutorDashboard/RevenueChart";

const page = () => {
  return (
    <div className="min-h-screen w-full">
      <Status />
      <RevenueChart />
    </div>
  );
};

export default page;
