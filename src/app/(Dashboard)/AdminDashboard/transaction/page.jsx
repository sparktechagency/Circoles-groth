'use client'
import React, { useState } from "react";
import { Table, Tag } from "antd";

const TransactionHistory = () => {
  const [data, setData] = useState([
    {
      key: "1",
      date: "Jan 6, 2024",
      status: "Paid",
      name: "Olivia Rhye",
      email: "olivia@untitledui.com",
      avatar: "https://i.pravatar.cc/300?img=1",
      amount: "+€5.00",
    },
    {
      key: "2",
      date: "Jan 6, 2024",
      status: "Paid",
      name: "Phoenix Baker",
      email: "phoenix@untitledui.com",
      avatar: "https://i.pravatar.cc/300?img=2",
      amount: "+€5.00",
    },
    {
      key: "3",
      date: "Jan 6, 2024",
      status: "Paid",
      name: "Lana Steiner",
      email: "lana@untitledui.com",
      avatar: "https://i.pravatar.cc/300?img=3",
      amount: "+€5.00",
    },
    {
      key: "4",
      date: "Jan 5, 2024",
      status: "Paid",
      name: "Demi Wilkinson",
      email: "demi@untitledui.com",
      avatar: "https://i.pravatar.cc/300?img=4",
      amount: "+€5.00",
    },
    {
      key: "5",
      date: "Jan 5, 2024",
      status: "Paid",
      name: "Candice Wu",
      email: "candice@untitledui.com",
      avatar: "https://i.pravatar.cc/300?img=5",
      amount: "+€5.00",
    },
    // Add more rows as needed...
  ]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color="green" className="rounded-full">
          <span className="capitalize">{status}</span>
        </Tag>
      ),
    },
    {
      title: "From",
      key: "from",
      render: (record) => (
        <div className="flex items-center">
          <img
            src={record.avatar}
            alt={record.name}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <p className="text-gray-800 font-medium">{record.name}</p>
            <p className="text-gray-500 text-sm">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="text-green-600 font-medium">{amount}</span>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white h-screen ">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        Transaction History
      </h1>
      <Table
      className="shadow-lg rounded-lg"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
        }}
        bordered
        rowClassName="hover:bg-gray-50"
      />
    </div>
  );
};

export default TransactionHistory;
