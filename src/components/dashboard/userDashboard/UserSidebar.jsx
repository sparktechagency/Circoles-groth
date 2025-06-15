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
const UserSidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlemobilemenu = () => {
    setMobileMenu(!mobileMenu);
    setIsOpen(!mobileMenu);
  };

  const userMenuItems = [
    {
      path: "/UserDashboard",
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
      path: "/UserDashboard/EnrolledCourses",
      title: "Enrolled Courses",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#667085"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 8L16 12L10 16V8Z"
            stroke="#667085"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/UserDashboard/MyTutor",
      title: "My Tutor",
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
      path: "/UserDashboard/UpcomingSession",
      title: "Upcoming Session",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 7L16 12L23 17V7Z"
            stroke="#667085"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
            stroke="#667085"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  ];

  const content = (
    <div className="w-40">
      <p className="mb-2">
        <Link href="/profile" className="flex items-center gap-2">
          <UserOutlined size={18} /> <span className="text-md">Profile</span>
        </Link>
      </p>
      <p className="mb-3">
        <Link href="/change-password" className="flex items-center gap-2">
          <LockFilled size={18} />{" "}
          <span className="text-md">Change Password</span>
        </Link>
      </p>
    </div>
  );

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
      path: "/UserDashboard/UseraccountSeetings",
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
          {isOpen ? (
            <RxCross2 size={25} style={{ color: "#0E68E7" }} />
          ) : (
            <IoMdMenu size={25} style={{ color: "#0E68E7" }} />
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
          color: "#344054",
          width: 312,
          left: 0,
          top: 0,
          bottom: 0,
          background: "#ffffff",
        }}
      >
        <img src={logo.src} alt="Logo" className="mx-auto py-6 w-[264px]" />
        <div className="px-2">
          <Input
            placeholder="Search"
            className="w-full mt-4 px-4 py-2 mb-6"
            prefix={<SearchOutlined className="text-xl text-gray-500" />}
          />
        </div>
        <div className={`  `}>
          <Menu
            className={` h-[calc(100vh-500px)] `}
            mode="inline"
            style={{ background: "#ffffff", color: "#344054" }}
          >
            {userMenuItems.map((item, index) => (
              <Menu.Item
                key={index}
                icon={item.icon}
                style={{
                  color: "#344054",
                  fontWeight: router.pathname === item.path ? "bold" : "normal",
                  fontSize: "16px",
                }}
              >
                <Link className="font-bold text-[#344054]" href={item.path}>
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
              {/* <div className="bg-[#F9FAFB] p-4 rounded-md   ">
            <h3 className="text-[16px] font-semibold text-[#101828] ">Course Progress</h3>
            <p className="text-[14px] text-[#667085]  leading-6 pt-4 ">You’ve completed 80% of UX Design  Course. Enroll new courses?</p>
          <Progress className="py-2" percent={80}  strokeColor={"#7F56D9"} showInfo={false} />
            <h3 className="text-'[16px] font-bold text-[#6941C6] py-2"><span className="text-[#475467]">Dismiss</span> Browse New Course</h3>
          </div> */}

              <div className="flex gap-8 mt-6 px-4">
                <Popover
                  className="cursor-pointer"
                  placement="bottom"
                  content={content}
                >
                  <Avatar
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "gray",
                    }}
                    icon={<Image src={avater} />}
                  />
                </Popover>
                <div>
                  <h1 className="text-black text-sm">John Doe</h1>
                  <h1 className="text-black text-sm">ex@ample.com</h1>
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

export default UserSidebar;
