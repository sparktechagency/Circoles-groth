'use client'
import React, { useState } from "react";
import { Table, Tag, Dropdown, Menu, Input, Space, Checkbox, message } from "antd";
import { SearchOutlined, MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import userimg from '/public/images/Avatar.png'
import Image from "next/image";
const VerificationTable = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([
    {
      key: "1",
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@untitledui.com",
      paymentStatus: "Paid",
      status: "Verified",
    },
    {
      key: "2",
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@untitledui.com",
      paymentStatus: "Paid",
      status: "Declined",
    },
    {
      key: "3",
      name: "Lana Steiner",
      username: "@lana",
      email: "lana@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "4",
      name: "Demi Wilkinson",
      username: "@demi",
      email: "demi@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "5",
      name: "Candice Wu",
      username: "@candice",
      email: "candice@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "6",
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@untitledui.com",
      paymentStatus: "Paid",
      status: "Verified",
    },
    {
      key: "7",
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@untitledui.com",
      paymentStatus: "Paid",
      status: "Declined",
    },
    {
      key: "8",
      name: "Lana Steiner",
      username: "@lana",
      email: "lana@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "9",
      name: "Demi Wilkinson",
      username: "@demi",
      email: "demi@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "10",
      name: "Candice Wu",
      username: "@candice",
      email: "candice@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "11",
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@untitledui.com",
      paymentStatus: "Paid",
      status: "Verified",
    },
    {
      key: "12",
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@untitledui.com",
      paymentStatus: "Paid",
      status: "Declined",
    },
    {
      key: "13",
      name: "Lana Steiner",
      username: "@lana",
      email: "lana@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "14",
      name: "Demi Wilkinson",
      username: "@demi",
      email: "demi@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "15",
      name: "Candice Wu",
      username: "@candice",
      email: "candice@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "16",
      name: "Olivia Rhye",
      username: "@olivia",
      email: "olivia@untitledui.com",
      paymentStatus: "Paid",
      status: "Verified",
    },
    {
      key: "17",
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@untitledui.com",
      paymentStatus: "Paid",
      status: "Declined",
    },
    {
      key: "18",
      name: "Lana Steiner",
      username: "@lana",
      email: "lana@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "19",
      name: "Demi Wilkinson",
      username: "@demi",
      email: "demi@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      key: "20",
      name: "Candice Wu",
      username: "@candice",
      email: "candice@untitledui.com",
      paymentStatus: "Paid",
      status: "Pending",
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      title: "",
      key: "select",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleRowSelect(e, record.key)}
          checked={selectedRows.includes(record.key)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space className="flex items-center">
          <Image
            src={userimg}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="mb-0 font-medium">{record.name}</p>
            <p className="text-sm text-gray-500">{record.username}</p>
          </div>
        </Space>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Verified":
            color = "green";
            break;
          case "Declined":
            color = "red";
            break;
          case "Pending":
            color = "yellow";
            break;
          default:
            color = "gray";
        }
        return (
          <Tag color={color} className="capitalize">
          <span className="font-bold">  {status}</span>
          </Tag>
        );
      },
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Space>
          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(record.key)}
          />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="view">View Details</Menu.Item>
                {record.status === "Pending" && (
                  <Menu.Item key="verify" onClick={() => handleVerify(record.key)}>
                    Verify
                  </Menu.Item>
                )}
              </Menu>
            }
            trigger={["click"]}
          >
            <MoreOutlined className="cursor-pointer" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleRowSelect = (e, key) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, key]);
    } else {
      setSelectedRows(selectedRows.filter((rowKey) => rowKey !== key));
    }
  };

  const handleVerify = (key) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, status: "Verified" } : row
    );
    setData(updatedData);
    message.success('User has been verified.')
  };

  const handleDelete = (key) => {
    const updatedData = data.filter((row) => row.key !== key);
    setData(updatedData);
    message.success(`User has been deleted.`);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText)
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Search Bar */}
      <Input
      style={{height:'44px'}}
        placeholder="Search users by name or email"
        prefix={<SearchOutlined />}
        className="mb-4"
        onChange={handleSearch}
      />
      {/* Table */}
      <Table
     title={() => (
      <div style={{ color: '#475467', fontWeight: 'bold', fontSize: '16px' }}>
        Verification Requests
      </div>
    )}
      style={{color:'#475467'}}
        columns={columns}
        dataSource={filteredData}
        bordered
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
        }}
        rowClassName="hover:bg-gray-50"
      />
    </div>
  );
};

export default VerificationTable;
