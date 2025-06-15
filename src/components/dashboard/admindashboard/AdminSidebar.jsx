"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import logo from "/public/images/logo.png";
import { useRouter } from "next/navigation";
import { Avatar, Input, Layout, Menu, Popover, Progress } from "antd";
import {
  SearchOutlined,
  PlayCircleFilled,
  LogoutOutlined,
  UserOutlined,
  LockFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import { HiOutlineSupport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { BsStack } from "react-icons/bs";
import Swal from "sweetalert2";

const { Sider } = Layout;
import { RxCross2 } from "react-icons/rx";
import { IoMdMenu } from "react-icons/io";

import avater from "/public/images/Avatar.png";
import Image from "next/image";
import { useGetOwnprofileQuery } from "../../../redux/features/AuthApi";
const AdminSidebar = () => {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data, isLoading } = useGetOwnprofileQuery();
  const user = data?.user[0];
  console.log("user", user);
  // Ensure the component is mounted before rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlemobilemenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const adminmenuitems = [
    {
      path: "/AdminDashboard",
      title: "Dashboard",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 20V10M12 20V4M6 20V14"
            stroke="#667085"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/AdminDashboard/CreateNewcourse",
      title: "Create new course",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M5 12H19"
            stroke="#667085"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/AdminDashboard/OnlinePrograms",
      title: "Manage Courses",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 17L12 22L22 17M2 12L12 17L22 12M12 2L2 7L12 12L22 7L12 2Z"
            stroke="#667085"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/AdminDashboard/ManageUsers",
      title: "Users",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
            stroke="#667085"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/AdminDashboard/Verification",
      title: "Verification",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M14 11H8M10 15H8M16 7H8M14.5 19L16.5 21L21 16.5"
            stroke="#667085"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/AdminDashboard/transaction",
      title: "Transactions",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 10H23M3 4H21C22.1046 4 23 4.89543 23 6V18C23 19.1046 22.1046 20 21 20H3C1.89543 20 1 19.1046 1 18V6C1 4.89543 1.89543 4 3 4Z"
            stroke="#667085"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged out!", "You're logged out.", "success");
        router.push("/auth/login");
      }
    });
  };

  const bottomMenuItems = [
    {
      id: "2",
      path: "/AdminDashboard/accountSeetings",
      title: "Settings",
      icon: <IoSettingsOutline size={20} color="#667085" />,
    },
  ];

  // Render nothing until client-side hydration
  if (!isMounted) return null;

  return (
    <div>
      {/* Mobile menu button */}
      <div className="absolute top-2 xl:hidden lg:hidden block left-4 w-full h-16 z-50">
        {/* mobile menu  */}
        <button onClick={handlemobilemenu}>
          {mobileMenu ? (
            <IoMdMenu size={25} style={{ color: "#0E68E7" }} />
          ) : (
            <RxCross2 size={25} style={{ color: "#0E68E7" }} />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <Sider
        width={312}
        className={`bg-white sidebar-menu  ${
          mobileMenu ? "hidden" : "block"
        } absolute xl:block lg:block overflow-scroll  `}
        style={{
          position: "fixed",
          width: 312,
          left: 0,
          top: 0,
          bottom: 0,
          background: "#ffffff",
        }}
      >
        <img src={logo.src} alt="Logo" className="mx-auto py-6 w-[264px]" />
        {/* <div className="px-2">
          <Input
            placeholder="Search"
            className="w-full mt-4 px-4 py-2 mb-6"
            prefix={<SearchOutlined className="text-xl text-gray-500" />}
          />
        </div> */}
        <div className={` `}>
          <Menu
            className={`h-[calc(100vh-400px)]  flex-cols items-center justify-between`}
            defaultSelectedKeys={["1"]}
            mode="inline"
            style={{ background: "#ffffff", color: "black" }}
          >
            {adminmenuitems.map((item, index) => (
              <Menu.Item
                key={index}
                icon={item.icon}
                style={{
                  color: router.pathname === item.path ? "red" : "#000000",
                  fontWeight: router.pathname === item.path ? "bold" : "normal",
                  fontSize: "16px",
                }}
              >
                <Link className="font-bold text-black" href={item.path}>
                  <span className="text-[#344054]">{item.title}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>

          <Menu>
            <div className="">
              <div className="py-4  ">
                {bottomMenuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Menu.Item
                      key={item?.id}
                      icon={item.icon}
                      style={{
                        color: isActive ? "blue" : "#fff",
                        fontWeight: isActive ? "bold" : "normal",
                        fontSize: "16px",
                        padding: "0 10px",
                        backgroundColor: isActive ? "#F2F5FC" : "transparent",
                      }}
                    >
                      <Link href={item.path}>
                        <span className="text-[#344054]">{item.title}</span>
                      </Link>
                    </Menu.Item>
                  );
                })}
              </div>

              <div className="flex gap-8 mt-6 px-4">
                <Avatar
                  size={40}
                  icon={<Image height={40} width={40} src={user?.avatar} />}
                />

                <div>
                  <h1 className="text-black text-sm">{user?.name}</h1>
                  <h1 className="text-black text-sm">{user?.email}</h1>
                </div>
                <div onClick={handleLogout} className="cursor-pointer ">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5 25.5H12.1667C11.7246 25.5 11.3007 25.3244 10.9882 25.0118C10.6756 24.6993 10.5 24.2754 10.5 23.8333V12.1667C10.5 11.7246 10.6756 11.3007 10.9882 10.9882C11.3007 10.6756 11.7246 10.5 12.1667 10.5H15.5M21.3333 22.1667L25.5 18M25.5 18L21.3333 13.8333M25.5 18H15.5"
                      stroke="#667085"
                      stroke-width="1.67"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Menu>
        </div>
      </Sider>
    </div>
  );
};

export default AdminSidebar;
