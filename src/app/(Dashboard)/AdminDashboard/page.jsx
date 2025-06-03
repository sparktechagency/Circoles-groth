import React from "react";
import Status from "../../../components/dashboard/Status";
import AdminRevenueChart from "../../../components/dashboard/admindashboard/AdminRevenueChart";

const page = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <Status />
      <AdminRevenueChart />
    </div>
  );
};

export default page;
