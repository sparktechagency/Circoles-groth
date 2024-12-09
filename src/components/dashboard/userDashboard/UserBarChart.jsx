// components/BarChart.jsx
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { Dropdown, Menu } from "antd";

const yearlyData = [
  { month: "Jan", session: 400, onlineProgram: 300 },
  { month: "Feb", session: 700, onlineProgram: 500 },
  { month: "Mar", session: 500, onlineProgram: 400 },
  { month: "Apr", session: 600, onlineProgram: 450 },
  { month: "May", session: 450, onlineProgram: 400 },
  { month: "Jun", session: 800, onlineProgram: 600 },
  { month: "Jul", session: 650, onlineProgram: 500 },
  { month: "Aug", session: 600, onlineProgram: 450 },
  { month: "Sep", session: 550, onlineProgram: 400 },
  { month: "Oct", session: 700, onlineProgram: 550 },
  { month: "Nov", session: 800, onlineProgram: 600 },
  { month: "Dec", session: 500, onlineProgram: 350 },
];

const monthlyData = [
  { day: "1", session: 40, onlineProgram: 30 },
  { day: "2", session: 70, onlineProgram: 50 },
  { day: "3", session: 50, onlineProgram: 40 },
  { day: "4", session: 60, onlineProgram: 45 },
  { day: "5", session: 45, onlineProgram: 40 },
  { day: "6", session: 80, onlineProgram: 60 },
  { day: "7", session: 65, onlineProgram: 50 },
  { day: "8", session: 60, onlineProgram: 45 },
  { day: "9", session: 55, onlineProgram: 40 },
  { day: "10", session: 70, onlineProgram: 55 },
];

const UserBarChart = () => {
  const [filter, setFilter] = useState("This Year");
  const [data, setData] = useState(yearlyData);

  // Dropdown menu for filter
  const menu = (
    <Menu
      onClick={(e) => {
        setFilter(e.key);
        setData(e.key === "This Year" ? yearlyData : monthlyData);
      }}
    >
      <Menu.Item key="This Year">This Year</Menu.Item>
      <Menu.Item key="This Month">This Month</Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Statics</h2>
        <Dropdown overlay={menu}>
          <span className="cursor-pointer text-gray-500">{filter}</span>
        </Dropdown>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={filter === "This Year" ? "month" : "day"} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="onlineProgram" stackId="a" fill="#7F56D9" />
          <Bar dataKey="session" stackId="a" fill="#E0D5FA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserBarChart;
