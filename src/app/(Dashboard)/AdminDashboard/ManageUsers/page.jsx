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
            role: 'frontend Dev',

            status: "Verified",
        },
        {
            key: "2",
            name: "Phoenix Baker",
            username: "@phoenix",
            email: "phoenix@untitledui.com",
            role: 'frontend Dev',

            status: "Declined",
        },
        {
            key: "3",
            name: "Lana Steiner",
            username: "@lana",
            email: "lana@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "4",
            name: "Demi Wilkinson",
            username: "@demi",
            email: "demi@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "5",
            name: "Candice Wu",
            username: "@candice",
            email: "candice@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "6",
            name: "Olivia Rhye",
            username: "@olivia",
            email: "olivia@untitledui.com",
            role: 'frontend Dev',

            status: "Verified",
        },
        {
            key: "7",
            name: "Phoenix Baker",
            username: "@phoenix",
            email: "phoenix@untitledui.com",
            role: 'frontend Dev',

            status: "Declined",
        },
        {
            key: "8",
            name: "Lana Steiner",
            username: "@lana",
            email: "lana@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "9",
            name: "Demi Wilkinson",
            username: "@demi",
            email: "demi@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "10",
            name: "Candice Wu",
            username: "@candice",
            email: "candice@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "11",
            name: "Olivia Rhye",
            username: "@olivia",
            email: "olivia@untitledui.com",
            role: 'frontend Dev',

            status: "Verified",
        },
        {
            key: "12",
            name: "Phoenix Baker",
            username: "@phoenix",
            email: "phoenix@untitledui.com",
            role: 'frontend Dev',

            status: "Declined",
        },
        {
            key: "13",
            name: "Lana Steiner",
            username: "@lana",
            email: "lana@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "14",
            name: "Demi Wilkinson",
            username: "@demi",
            email: "demi@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "15",
            name: "Candice Wu",
            username: "@candice",
            email: "candice@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "16",
            name: "Olivia Rhye",
            username: "@olivia",
            email: "olivia@untitledui.com",
            role: 'frontend Dev',

            status: "Verified",
        },
        {
            key: "17",
            name: "Phoenix Baker",
            username: "@phoenix",
            email: "phoenix@untitledui.com",
            role: 'frontend Dev',

            status: "Declined",
        },
        {
            key: "18",
            name: "Lana Steiner",
            username: "@lana",
            email: "lana@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "19",
            name: "Demi Wilkinson",
            username: "@demi",
            email: "demi@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },

        {
            key: "20",
            name: "Candice Wu",
            username: "@candice",
            email: "candice@untitledui.com",
            role: 'frontend Dev',

            status: "Pending",
        },
        {
            key: "21",
            name: "mehedi",
            username: "@mehedi",
            email: "candice@untitledui.com",
            role: 'frontend Dev',

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
            title: "Role",
            dataIndex: "role",
            key: "role",
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
                        <svg onClick={() => handleDelete(record.key)} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 15.0013H14.1667M14.1667 15.0013H27.5M14.1667 15.0013V26.668C14.1667 27.11 14.3423 27.5339 14.6548 27.8465C14.9674 28.159 15.3913 28.3346 15.8333 28.3346H24.1667C24.6087 28.3346 25.0326 28.159 25.3452 27.8465C25.6577 27.5339 25.8333 27.11 25.8333 26.668V15.0013H14.1667ZM16.6667 15.0013V13.3346C16.6667 12.8926 16.8423 12.4687 17.1548 12.1561C17.4674 11.8436 17.8913 11.668 18.3333 11.668H21.6667C22.1087 11.668 22.5326 11.8436 22.8452 12.1561C23.1577 12.4687 23.3333 12.8926 23.3333 13.3346V15.0013M18.3333 19.168V24.168M21.6667 19.168V24.168" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>


                    <Dropdown
                        overlay={
                            <Menu>


                                <Menu.Item key="restrict" >
                                    Restrict the user
                                </Menu.Item>

                            </Menu>
                        }
                        trigger={["click"]}
                    >
                        <span className="cursor-pointer">

                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.0001 20.832C20.4603 20.832 20.8334 20.4589 20.8334 19.9987C20.8334 19.5385 20.4603 19.1654 20.0001 19.1654C19.5398 19.1654 19.1667 19.5385 19.1667 19.9987C19.1667 20.4589 19.5398 20.832 20.0001 20.832Z" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.0001 14.9987C20.4603 14.9987 20.8334 14.6256 20.8334 14.1654C20.8334 13.7051 20.4603 13.332 20.0001 13.332C19.5398 13.332 19.1667 13.7051 19.1667 14.1654C19.1667 14.6256 19.5398 14.9987 20.0001 14.9987Z" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.0001 26.6654C20.4603 26.6654 20.8334 26.2923 20.8334 25.832C20.8334 25.3718 20.4603 24.9987 20.0001 24.9987C19.5398 24.9987 19.1667 25.3718 19.1667 25.832C19.1667 26.2923 19.5398 26.6654 20.0001 26.6654Z" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>

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
                style={{ height: '44px' }}
                placeholder="Search users by name or email"
                prefix={<SearchOutlined />}
                className="mb-4"
                onChange={handleSearch}
            />
            {/* Table */}
            <Table
                title={() => (
                    <div style={{ color: '#101828', fontWeight: '500', fontSize: '18px' }}>
                        Total users <span className="text-sm text-[#344054] font-medium">100k users</span>
                    </div>
                )}
                style={{ color: '#475467' }}
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
