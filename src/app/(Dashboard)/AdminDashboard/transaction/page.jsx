"use client";
import React, { useState } from "react";
import { Table, Tag } from "antd";
import { useTransectionQuery } from "../../../../redux/features/adminapis/AdminApi";

const TransactionHistory = () => {
  const [page, setPage] = useState(1);
  const per_page = 10;

  const { data: transectionData, isLoading } = useTransectionQuery({
    per_page,
    page,
  });

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
      render: (status) => {
        let color = status === "paid" ? "green" : "orange";
        return (
          <Tag color={color} className="rounded-full capitalize">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "From",
      key: "from",
      render: (record) => (
        <div className="flex items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              record.name
            )}&background=random`}
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
        <span className="text-green-600 font-medium">${amount}</span>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        Transaction History
      </h1>
      <Table
        className="shadow-lg rounded-lg"
        columns={columns}
        dataSource={transectionData?.transactions?.data || []}
        pagination={{
          current: page,
          pageSize: per_page,
          total: transectionData?.transactions?.total || 0,
          onChange: (page) => setPage(page),
          position: ["bottomCenter"],
          showSizeChanger: false,
        }}
        bordered
        rowKey="id"
        rowClassName="hover:bg-gray-50"
      />
    </div>
  );
};

export default TransactionHistory;
