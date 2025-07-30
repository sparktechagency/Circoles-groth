"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import logo from "../../../assets/images/logo.png";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, Layout, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { IoSettingsOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const { Sider } = Layout;
import { RxCross2 } from "react-icons/rx";
import { IoMdMenu } from "react-icons/io";

import Image from "next/image";
import { useGetOwnprofileQuery } from "../../../redux/features/AuthApi";
import Cookies from "js-cookie";

const UserSidebar = ({ isOpen, setIsOpen }) => {
  // --- Color Palette ---
  const colors = {
    primary: "#08284F",
    secondary: "#F97200",
    third: "#395371",
    fourth: "#5a6f88",
    fifth: "#8d9cae",
    sixth: "#e6eaed",
  };

  const { data } = useGetOwnprofileQuery();
  const user = data?.user[0];
  const router = useRouter();
  const pathname = usePathname(); // Correct hook for getting the current path
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlemobilemenu = () => {
    setMobileMenu(!mobileMenu);
    setIsOpen(!mobileMenu);
  };

  // --- Menu Item Definitions ---
  const userMenuItems = [
    {
      path: "/UserDashboard",
      title: "Dashboard",
      icon: (props) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M18 20V10M12 20V4M6 20V14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/UserDashboard/EnrolledCourses",
      title: "Enrolled Courses",
      icon: (props) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 8L16 12L10 16V8Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/UserDashboard/MyTutor",
      title: "My Tutor",
      icon: (props) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M2 17L12 22L22 17M2 12L12 17L22 12M12 2L2 7L12 12L22 7L12 2Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/UserDashboard/UpcomingSession",
      title: "Upcoming Session",
      icon: (props) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M23 7L16 12L23 17V7Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const bottomMenuItems = [
    {
      id: "2",
      path: "/UserDashboard/UseraccountSeetings",
      title: "Settings",
      icon: IoSettingsOutline,
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
        Cookies.remove("token");
        router.push("/auth/login");
      }
    });
  };

  if (!isMounted) return null;

  return (
    <div>
      {/* --- Mobile Menu Button --- */}
      <div className="absolute top-2 xl:hidden lg:hidden block left-4 w-full h-16 z-50">
        <button onClick={handlemobilemenu}>
          {isOpen ? (
            <RxCross2 size={25} style={{ color: colors.secondary }} />
          ) : (
            <IoMdMenu size={25} style={{ color: colors.secondary }} />
          )}
        </button>
      </div>

      {/* --- Sidebar --- */}
      <Sider
        width={312}
        className={`sidebar-menu ${
          mobileMenu ? "hidden" : "block"
        } absolute xl:block lg:block overflow-y-auto`}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: colors.primary,
        }}
      >
        <Link href="/">
          <img src={logo.src} alt="Logo" className="mx-auto py-6 w-[264px]" />
        </Link>

        <div
          className="flex flex-col justify-between"
          style={{ height: "calc(100% - 120px)" }}
        >
          {/* --- Top Menu --- */}
          <Menu
            mode="inline"
            style={{ backgroundColor: colors.primary, border: "none" }}
          >
            {userMenuItems.map((item, index) => {
              const isActive = pathname === item.path; // Correct active state check
              const itemColor = isActive ? colors.secondary : colors.fifth;
              return (
                <Menu.Item
                  key={index}
                  icon={item.icon({ stroke: itemColor })}
                  style={{
                    borderRadius: "6px",
                    margin: "0 16px 4px 16px",
                  }}
                >
                  <Link href={item.path}>
                    <span
                      style={{
                        color: itemColor,
                        fontWeight: isActive ? "600" : "500",
                        fontSize: "16px",
                      }}
                    >
                      {item.title}
                    </span>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>

          {/* --- Bottom Section (Settings & User Profile) --- */}
          <div>
            <Menu
              className="mb-[calc(100%-5px)]"
              mode="inline"
              style={{ backgroundColor: colors.primary, border: "none" }}
            >
              {bottomMenuItems.map((item) => {
                const isActive = pathname === item.path; // Correct active state check
                const IconComponent = item.icon;
                const itemColor = isActive ? colors.primary : colors.fifth;

                return (
                  <Menu.Item
                    key={item.id}
                    icon={
                      <IconComponent size={20} style={{ color: itemColor }} />
                    }
                    style={{
                      backgroundColor: isActive ? colors.sixth : "transparent",
                      borderRadius: "6px",
                      margin: "0 16px",
                    }}
                  >
                    <Link href={item.path}>
                      <span
                        style={{
                          color: itemColor,
                          fontWeight: isActive ? "600" : "500",
                          fontSize: "16px",
                        }}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>

            <hr style={{ borderColor: colors.third, margin: "24px 16px" }} />

            <div className="flex items-center gap-3 px-4">
              <Avatar
                style={{ width: "40px", height: "40px" }}
                src={
                  user?.avatar ? (
                    <Image
                      width={40}
                      height={40}
                      src={user.avatar}
                      alt={user.name}
                    />
                  ) : null
                }
                icon={!user?.avatar && <UserOutlined />}
              />
              <div className="pr-2">
                <span
                  style={{
                    color: colors.sixth,
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  {user?.name}
                </span>
                <p style={{ color: colors.fifth, fontSize: "14px" }}>
                  {user?.email?.slice(0, 20) + "..."}
                </p>
              </div>
              <div onClick={handleLogout} className="cursor-pointer ">
                <LogoutOutlined
                  style={{ fontSize: "20px", color: colors.fifth }}
                />
              </div>
            </div>
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default UserSidebar;
