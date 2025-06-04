"use client";
import React, { useState } from "react";
import {
  Table,
  Tag,
  Dropdown,
  Menu,
  Input,
  Space,
  Checkbox,
  message,
} from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import {
  useDeleteuserMutation,
  useUserManagementQuery,
} from "../../../../redux/features/adminapis/AdminApi";
import Swal from "sweetalert2";

const VerificationTable = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const per_page = 10;
  const { data: userData, isLoading } = useUserManagementQuery({
    per_page,
    page,
    search: searchText,
  });
  const [deleteuser, { isLoading: deleting }] = useDeleteuserMutation();
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      title: "",
      key: "select",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleRowSelect(e, record.id)}
          checked={selectedRows.includes(record.id)}
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
            src={record.avatar || "https://ui-avatars.com/api/?name=User"}
            alt="Avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="mb-0 font-medium">{record.name}</p>
            <p className="text-sm text-gray-500">{record.email}</p>
          </div>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          color={
            role === "admin" ? "gold" : role === "tutor" ? "blue" : "green"
          }
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Space>
          <span className="cursor-pointer">
            <svg
              onClick={() => handleDelete(record.id)}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15.0013H14.1667M14.1667 15.0013H27.5M14.1667 15.0013V26.668C14.1667 27.11 14.3423 27.5339 14.6548 27.8465C14.9674 28.159 15.3913 28.3346 15.8333 28.3346H24.1667C24.6087 28.3346 25.0326 28.159 25.3452 27.8465C25.6577 27.5339 25.8333 27.11 25.8333 26.668V15.0013H14.1667ZM16.6667 15.0013V13.3346C16.6667 12.8926 16.8423 12.4687 17.1548 12.1561C17.4674 11.8436 17.8913 11.668 18.3333 11.668H21.6667C22.1087 11.668 22.5326 11.8436 22.8452 12.1561C23.1577 12.4687 23.3333 12.8926 23.3333 13.3346V15.0013M18.3333 19.168V24.168M21.6667 19.168V24.168"
                stroke="#475467"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="restrict">Restrict the user</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <span className="cursor-pointer">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0001 20.832C20.4603 20.832 20.8334 20.4589 20.8334 19.9987C20.8334 19.5385 20.4603 19.1654 20.0001 19.1654C19.5398 19.1654 19.1667 19.5385 19.1667 19.9987C19.1667 20.4589 19.5398 20.832 20.0001 20.832Z"
                  stroke="#475467"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.0001 14.9987C20.4603 14.9987 20.8334 14.6256 20.8334 14.1654C20.8334 13.7051 20.4603 13.332 20.0001 13.332C19.5398 13.332 19.1667 13.7051 19.1667 14.1654C19.1667 14.6256 19.5398 14.9987 20.0001 14.9987Z"
                  stroke="#475467"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.0001 26.6654C20.4603 26.6654 20.8334 26.2923 20.8334 25.832C20.8334 25.3718 20.4603 24.9987 20.0001 24.9987C19.5398 24.9987 19.1667 25.3718 19.1667 25.832C19.1667 26.2923 19.5398 26.6654 20.0001 26.6654Z"
                  stroke="#475467"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Dropdown> */}
        </Space>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleRowSelect = (e, key) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, key]);
    } else {
      setSelectedRows(selectedRows.filter((rowKey) => rowKey !== key));
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteuser(id).unwrap();
        console.log("response", response);
        if (response?.success) {
          setSelectedRows(selectedRows.filter((rowKey) => rowKey !== id));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Search Bar */}
      <Input
        style={{ height: "44px" }}
        placeholder="Search users by name or email"
        prefix={<SearchOutlined />}
        className="mb-4"
        onChange={handleSearch}
        value={searchText}
      />
      {/* Table */}
      <Table
        title={() => (
          <div
            style={{ color: "#101828", fontWeight: "500", fontSize: "18px" }}
          >
            Total users{" "}
            <span className="text-sm text-[#344054] font-medium">
              {userData?.total_users || 0} users
            </span>
          </div>
        )}
        style={{ color: "#475467" }}
        columns={columns}
        dataSource={userData?.users?.data || []}
        bordered
        pagination={{
          current: userData?.users?.current_page || 1,
          pageSize: userData?.users?.per_page || per_page,
          total: userData?.total_users || 0,
          onChange: (page) => setPage(page),
          position: ["bottomCenter"],
          showSizeChanger: false,
        }}
        rowKey="id"
        rowClassName="hover:bg-gray-50"
      />
    </div>
  );
};

export default VerificationTable;
