"use client";
import { useState } from "react";
import { Rate, Progress } from "antd";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "antd/es/skeleton/Title";
import SelectBox from "../../share/dashboard/SelectBox";
import { useEarningQuery } from "../../../redux/features/adminapis/AdminApi";

const AdminRevenueChart = () => {
  const [filter, setFilter] = useState("monthly");

  const { data, isLoading } = useEarningQuery(filter);
  console.log("data", data);

  // Transform the API data for the chart
  const chartData =
    data?.totalEarnings?.map((item) => ({
      name: item.month?.substring(0, 3), // Short month name (Jan, Feb, etc)
      amt: parseFloat(item.total_earnings) || 0, // Convert string to number, default to 0
    })) || [];

  const formatYAxis = (tickItem) => {
    return `$${tickItem}`;
  };

  const handleSelectChange = (value) => {
    setFilter(value);
    console.log("Selected", value);
  };

  const selectOptions = [
    { value: "monthly", label: "this month" },
    { value: "yearly", label: "this Year" },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#FFFFFF] rounded-2xl rounded-t-none p-2 pr-14">
      <div className="flex justify-between px-4 py-2 border-b-2 border-[#E9EAF0]">
        <div>
          <h1 className="text-[#1D2026] text-lg font-medium">Earnings</h1>
        </div>
        <div>
          <Title>This month</Title>
          <SelectBox
            options={selectOptions}
            placeholder="Revenue"
            onChange={handleSelectChange}
            style={{ width: 100 }}
          />
        </div>
      </div>

      <br />
      <ResponsiveContainer width="100%" height={480}>
        <AreaChart data={chartData} syncId="anyId">
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#564FFD" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#564FFD" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis axisLine={false} dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, "Earnings"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area
            isAnimationActive={false}
            strokeWidth={3}
            stroke="#564FFD"
            type="monotone"
            dataKey="amt"
            fill="url(#colorAmt)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminRevenueChart;
