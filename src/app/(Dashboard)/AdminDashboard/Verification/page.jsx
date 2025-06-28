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
  useDeleteVerifyuserMutation,
  useVerificationQuery,
} from "../../../../redux/features/adminapis/AdminApi";
import Swal from "sweetalert2";
import Link from "next/link";

const VerificationTable = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const per_page = 10;

  const { data: verificationData, isLoading } = useVerificationQuery({
    per_page,
    page,
    search: searchText,
  });

  console.log("verificationData", verificationData);

  const [deleteVerifyuser, { isLoading: deleting }] =
    useDeleteVerifyuserMutation();
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
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              record.name
            )}`}
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
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (status) => (
        <Tag color={status === "paid" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Verification Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "verified":
            color = "green";
            break;
          case "declined":
            color = "red";
            break;
          case "pending":
            color = "yellow";
            break;
          default:
            color = "gray";
        }
        return (
          <Tag color={color} className="capitalize">
            <span className="font-bold">{status}</span>
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
            className="text-red-500 cursor-pointer text-lg"
            onClick={() => handleDelete(record.id)}
          />
          <Dropdown
            overlay={
              <Menu>
                {record?.status === "verified" ? (
                  <Menu.Item key="view">
                    <Link href={`#`}>Tutor is Verified</Link>
                  </Menu.Item>
                ) : (
                  <Menu.Item key="view">
                    <Link href={`/AdminDashboard/Verification/${record.id}`}>
                      View Details
                    </Link>
                  </Menu.Item>
                )}

                {record.status === "pending" && (
                  <Menu.Item
                    key="verify"
                    onClick={() => handleVerify(record.id)}
                  >
                    Verify
                  </Menu.Item>
                )}
              </Menu>
            }
            trigger={["click"]}
          >
            <MoreOutlined
              style={{ fontSize: "20px", marginLeft: "18px" }}
              className="cursor-pointer"
            />
          </Dropdown>
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

  const handleVerify = (key) => {
    // In a real app, you would call an API to verify the tutor
    message.success(`Tutor with ID ${key} would be verified in a real app`);
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
        const response = await deleteVerifyuser(id).unwrap();
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
        placeholder="Search tutors by name or email"
        prefix={<SearchOutlined />}
        className="mb-4"
        onChange={handleSearch}
        value={searchText}
      />
      {/* Table */}
      <Table
        title={() => (
          <div
            style={{ color: "#475467", fontWeight: "bold", fontSize: "16px" }}
          >
            Verification Requests
          </div>
        )}
        style={{ color: "#475467" }}
        columns={columns}
        dataSource={verificationData?.tutor_infos?.data || []}
        bordered
        pagination={{
          current: verificationData?.tutor_infos?.current_page || 1,
          pageSize: verificationData?.tutor_infos?.per_page || per_page,
          total: verificationData?.tutor_infos?.total || 0,
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
