"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import logo from "../../../assets/images/logo.png"; // Assuming logo is in this path
import { usePathname, useRouter } from "next/navigation";
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

const AdminSidebar = ({ setIsOpen, isOpen }) => {
  // --- Your Provided Color Palette ---
  const colors = {
    primary: "#08284F",
    secondary: "#F97200",
    third: "#395371",
    fourth: "#5a6f88",
    fifth: "#8d9cae",
    sixth: "#e6eaed",
  };

  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data } = useGetOwnprofileQuery();
  const user = data?.user[0];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlemobilemenu = () => {
    setMobileMenu(!mobileMenu);
    setIsOpen(!mobileMenu);
  };

  // --- Menu Item Definitions ---
  // Icons are now functions that accept a color prop for dynamic styling.
  const adminmenuitems = [
    {
      path: "/AdminDashboard",
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
      path: "/AdminDashboard/CreateNewcourse",
      title: "Create new course",
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
            d="M12 5V19M5 12H19"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/AdminDashboard/OnlinePrograms",
      title: "Manage Courses",
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
      path: "/AdminDashboard/ManageUsers",
      title: "Users",
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
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/AdminDashboard/Verification",
      title: "Verification",
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
            d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M14 11H8M10 15H8M16 7H8M14.5 19L16.5 21L21 16.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      path: "/AdminDashboard/transaction",
      title: "Transactions",
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
            d="M1 10H23M3 4H21C22.1046 4 23 4.89543 23 6V18C23 19.1046 22.1046 20 21 20H3C1.89543 20 1 19.1046 1 18V6C1 4.89543 1.89543 4 3 4Z"
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
      path: "/AdminDashboard/accountSeetings",
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
          backgroundColor: colors.primary, // Use primary color for background
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
            className="mb-[calc(100%-5px)]"
            mode="inline"
            style={{ backgroundColor: colors.primary, border: "none" }}
          >
            {adminmenuitems.map((item, index) => {
              const isActive = pathname === item.path;
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
              mode="inline"
              style={{ backgroundColor: colors.primary, border: "none" }}
            >
              {bottomMenuItems.map((item) => {
                const isActive = pathname === item.path;
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
              <div className="flex-grow">
                <h1
                  style={{
                    color: colors.sixth,
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  {user?.name}
                </h1>
                <h1 style={{ color: colors.fifth, fontSize: "14px" }}>
                  {user?.email}
                </h1>
              </div>
              <div onClick={handleLogout} className="cursor-pointer">
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

export default AdminSidebar;
