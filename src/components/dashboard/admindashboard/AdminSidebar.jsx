"use client";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import logo from "../../../assets/images/logo.png";
import { useGetOwnprofileQuery } from "../../../redux/features/AuthApi";

const { Sider } = Layout;

const AdminSidebar = ({ isOpen, setIsOpen }) => {
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
  const user = data?.user?.[0];
  const router = useRouter();
  const pathname = usePathname();

  const [selectedKey, setSelectedKey] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // --- Menu Item Definitions ---
  const adminMenuItems = [
    {
      key: "/AdminDashboard",
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
      key: "/AdminDashboard/CreateNewcourse",
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
      key: "/AdminDashboard/OnlinePrograms",
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
      key: "/AdminDashboard/ManageUsers",
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
      key: "/AdminDashboard/Verification",
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
      key: "/AdminDashboard/transaction",
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
      key: "/AdminDashboard/accountSeetings",
      path: "/AdminDashboard/accountSeetings",
      title: "Settings",
      icon: IoSettingsOutline,
    },
  ];

  const allMenuItems = [...adminMenuItems, ...bottomMenuItems];

  useEffect(() => {
    setIsMounted(true);
    const bestMatch = allMenuItems
      .map((item) => item.path)
      .filter((path) => pathname.startsWith(path))
      .sort((a, b) => b.length - a.length)[0];

    setSelectedKey(bestMatch || "");
  }, [pathname]);

  const handleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

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
        Cookies.remove("token");
        Swal.fire("Logged out!", "You're logged out.", "success");
        router.push("/auth/login");
      }
    });
  };

  if (!isMounted) return null;

  return (
    <>
      <div className="absolute top-2 xl:hidden lg:hidden block left-4 w-full h-16 z-50">
        <button onClick={handleMobileMenu}>
          {isOpen ? (
            <RxCross2 size={25} style={{ color: colors.secondary }} />
          ) : (
            <IoMdMenu size={25} style={{ color: colors.secondary }} />
          )}
        </button>
      </div>

      <Sider
        width={312}
        className={`sidebar-menu ${
          !isOpen ? "hidden" : "block"
        } xl:block lg:block overflow-y-auto`}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 40,
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
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ backgroundColor: colors.primary, border: "none" }}
          >
            {adminMenuItems.map((item) => {
              const isActive = selectedKey === item.key;
              const itemColor = isActive ? colors.secondary : colors.fifth;
              return (
                <Menu.Item
                  key={item.key}
                  icon={item.icon({ stroke: itemColor })}
                  style={{ borderRadius: "6px", margin: "0 16px 4px 16px" }}
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

          <div>
            <Menu
              className="mb-[calc(100%-5px)]"
              mode="inline"
              selectedKeys={[selectedKey]}
              style={{ backgroundColor: colors.primary, border: "none" }}
            >
              {bottomMenuItems.map((item) => {
                const isActive = selectedKey === item.key;
                const IconComponent = item.icon;
                const itemColor = isActive ? colors.secondary : colors.fifth;
                return (
                  <Menu.Item
                    key={item.key}
                    icon={
                      <IconComponent size={20} style={{ color: itemColor }} />
                    }
                    style={{ borderRadius: "6px", margin: "0 16px" }}
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

            <div className="flex items-center gap-3 px-4 pb-4">
              <Avatar
                style={{ width: "40px", height: "40px" }}
                src={user?.avatar ? user.avatar : undefined}
                icon={!user?.avatar && <UserOutlined />}
              />
              <div className="flex-1 overflow-hidden">
                <span className="block text-white font-semibold text-sm truncate">
                  {user?.name}
                </span>
                <p className="text-gray-400 text-sm truncate">{user?.email}</p>
              </div>
              <button onClick={handleLogout} className="cursor-pointer p-2">
                <LogoutOutlined
                  style={{ fontSize: "20px", color: colors.fifth }}
                />
              </button>
            </div>
          </div>
        </div>
      </Sider>
    </>
  );
};

export default AdminSidebar;
