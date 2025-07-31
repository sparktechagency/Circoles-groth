// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import logo from "../../../assets/images/logo.png";
// import { useRouter, usePathname } from "next/navigation";
// import { Avatar, Layout, Menu } from "antd";
// import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
// import { IoSettingsOutline } from "react-icons/io5";
// import Swal from "sweetalert2";

// const { Sider } = Layout;
// import { RxCross2 } from "react-icons/rx";
// import { IoMdMenu } from "react-icons/io";

// import Image from "next/image";
// import { useGetOwnprofileQuery } from "../../../redux/features/AuthApi";
// import Cookies from "js-cookie";

// const TutorSidebar = ({ isOpen, setIsOpen }) => {
//   // --- Color Palette ---
//   const colors = {
//     primary: "#08284F",
//     secondary: "#F97200",
//     third: "#395371",
//     fourth: "#5a6f88",
//     fifth: "#8d9cae",
//     sixth: "#e6eaed",
//   };

//   const { data } = useGetOwnprofileQuery();
//   const user = data?.user[0];
//   const router = useRouter();
//   const pathname = usePathname(); // Correct hook for getting the current path
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const handlemobilemenu = () => {
//     setMobileMenu(!mobileMenu);
//     setIsOpen(!mobileMenu);
//   };

//   // --- Menu Item Definitions ---
//   const tutorMenuItems = [
//     {
//       path: "/TutorDashboard",
//       title: "Dashboard",
//       icon: (props) => (
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           {...props}
//         >
//           <path
//             d="M18 20V10M12 20V4M6 20V14"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       ),
//     },
//     {
//       path: "/TutorDashboard/UpcomingSession",
//       title: "Upcoming Session",
//       icon: (props) => (
//         <svg
//           width="22"
//           height="20"
//           viewBox="0 0 22 20"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           {...props}
//         >
//           <path
//             d="M11 5C11 3.93913 10.5786 2.92172 9.82843 2.17157C9.07828 1.42143 8.06087 1 7 1H1V16H8C8.79565 16 9.55871 16.3161 10.1213 16.8787C10.6839 17.4413 11 18.2044 11 19M11 5V19M11 5C11 3.93913 11.4214 2.92172 12.1716 2.17157C12.9217 1.42143 13.9391 1 15 1H21V16H14C13.2044 16 12.4413 16.3161 11.8787 16.8787C11.3161 17.4413 11 18.2044 11 19"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       ),
//     },
//     {
//       path: "/TutorDashboard/TutorProfileSetupStep-1",
//       title: "Tutor Profile Setup",
//       icon: (props) => (
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           {...props}
//         >
//           <path
//             d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       ),
//     },
//     {
//       path: "/TutorDashboard/Verification",
//       title: "Verification",
//       icon: (props) => (
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           {...props}
//         >
//           <path
//             d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M14 11H8M10 15H8M16 7H8M14.5 19L16.5 21L21 16.5"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       ),
//     },
//     {
//       path: "/TutorDashboard/Earning",
//       title: "Earning",
//       icon: (props) => (
//         <svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           {...props}
//         >
//           <path
//             d="M1 10H23M3 4H21C22.1046 4 23 4.89543 23 6V18C23 19.1046 22.1046 20 21 20H3C1.89543 20 1 19.1046 1 18V6C1 4.89543 1.89543 4 3 4Z"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       ),
//     },
//   ];

//   const bottomMenuItems = [
//     {
//       id: "2",
//       path: "/TutorDashboard/accountSeetings",
//       title: "Settings",
//       icon: IoSettingsOutline,
//     },
//   ];

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out of your account.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Log out!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Cookies.remove("token");
//         Swal.fire("Logged out!", "You're logged out.", "success");
//         router.push("/auth/login");
//       }
//     });
//   };

//   if (!isMounted) return null;

//   return (
//     <div>
//       {/* --- Mobile Menu Button --- */}
//       <div className="absolute top-2 xl:hidden lg:hidden block left-4 w-full h-16 z-50">
//         <button onClick={handlemobilemenu}>
//           {isOpen ? (
//             <RxCross2 size={25} style={{ color: colors.secondary }} />
//           ) : (
//             <IoMdMenu size={25} style={{ color: colors.secondary }} />
//           )}
//         </button>
//       </div>

//       {/* --- Sidebar --- */}
//       <Sider
//         width={312}
//         className={`sidebar-menu ${
//           mobileMenu ? "hidden" : "block"
//         } absolute xl:block lg:block overflow-y-auto`}
//         style={{
//           position: "fixed",
//           left: 0,
//           top: 0,
//           bottom: 0,
//           backgroundColor: colors.primary,
//         }}
//       >
//         <Link href="/">
//           <img src={logo.src} alt="Logo" className="mx-auto py-6 w-[264px]" />
//         </Link>

//         <div
//           className="flex flex-col justify-between"
//           style={{ height: "calc(100% - 120px)" }}
//         >
//           {/* --- Top Menu --- */}
//           <Menu
//             mode="inline"
//             style={{ backgroundColor: colors.primary, border: "none" }}
//           >
//             {tutorMenuItems.map((item, index) => {
//               const isActive = pathname === item.path; // Correct active state check
//               const itemColor = isActive ? colors.secondary : colors.fifth;
//               return (
//                 <Menu.Item
//                   key={index}
//                   icon={item.icon({ stroke: itemColor })}
//                   style={{
//                     borderRadius: "6px",
//                     margin: "0 16px 4px 16px",
//                   }}
//                 >
//                   <Link href={item.path}>
//                     <span
//                       style={{
//                         color: itemColor,
//                         fontWeight: isActive ? "600" : "500",
//                         fontSize: "16px",
//                       }}
//                     >
//                       {item.title}
//                     </span>
//                   </Link>
//                 </Menu.Item>
//               );
//             })}
//           </Menu>

//           {/* --- Bottom Section (Settings & User Profile) --- */}
//           <div>
//             <Menu
//               className="mb-[calc(100%-5px)]"
//               mode="inline"
//               style={{ backgroundColor: colors.primary, border: "none" }}
//             >
//               {bottomMenuItems.map((item) => {
//                 const isActive = pathname === item.path; // Correct active state check
//                 const IconComponent = item.icon;
//                 const itemColor = isActive ? colors.primary : colors.fifth;

//                 return (
//                   <Menu.Item
//                     key={item.id}
//                     icon={
//                       <IconComponent size={20} style={{ color: itemColor }} />
//                     }
//                     style={{
//                       backgroundColor: isActive ? colors.sixth : "transparent",
//                       borderRadius: "6px",
//                       margin: "0 16px",
//                     }}
//                   >
//                     <Link href={item.path}>
//                       <span
//                         style={{
//                           color: itemColor,
//                           fontWeight: isActive ? "600" : "500",
//                           fontSize: "16px",
//                         }}
//                       >
//                         {item.title}
//                       </span>
//                     </Link>
//                   </Menu.Item>
//                 );
//               })}
//             </Menu>

//             <hr style={{ borderColor: colors.third, margin: "24px 16px" }} />

//             <div className="flex items-center gap-3 px-4">
//               <Avatar
//                 style={{ width: "40px", height: "40px" }}
//                 src={
//                   user?.avatar ? (
//                     <Image
//                       width={40}
//                       height={40}
//                       src={user.avatar}
//                       alt={user.name}
//                     />
//                   ) : null
//                 }
//                 icon={!user?.avatar && <UserOutlined />}
//               />
//               <div className="flex-grow">
//                 <h1
//                   style={{
//                     color: colors.sixth,
//                     fontWeight: "600",
//                     fontSize: "14px",
//                   }}
//                 >
//                   {user?.name}
//                 </h1>
//                 <h1 style={{ color: colors.fifth, fontSize: "14px" }}>
//                   {user?.email}
//                 </h1>
//               </div>
//               <div onClick={handleLogout} className="cursor-pointer">
//                 <LogoutOutlined
//                   style={{ fontSize: "20px", color: colors.fifth }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </Sider>
//     </div>
//   );
// };

// export default TutorSidebar;

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

const TutorSidebar = ({ isOpen, setIsOpen }) => {
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
  const tutorMenuItems = [
    {
      key: "/TutorDashboard",
      path: "/TutorDashboard",
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
      key: "/TutorDashboard/UpcomingSession",
      path: "/TutorDashboard/UpcomingSession",
      title: "Upcoming Session",
      icon: (props) => (
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M11 5C11 3.93913 10.5786 2.92172 9.82843 2.17157C9.07828 1.42143 8.06087 1 7 1H1V16H8C8.79565 16 9.55871 16.3161 10.1213 16.8787C10.6839 17.4413 11 18.2044 11 19M11 5V19M11 5C11 3.93913 11.4214 2.92172 12.1716 2.17157C12.9217 1.42143 13.9391 1 15 1H21V16H14C13.2044 16 12.4413 16.3161 11.8787 16.8787C11.3161 17.4413 11 18.2044 11 19"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "/TutorDashboard/TutorProfileSetupStep-1",
      path: "/TutorDashboard/TutorProfileSetupStep-1",
      title: "Tutor Profile Setup",
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
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "/TutorDashboard/Verification",
      path: "/TutorDashboard/Verification",
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
      key: "/TutorDashboard/Earning",
      path: "/TutorDashboard/Earning",
      title: "Earning",
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
      key: "/TutorDashboard/accountSeetings",
      path: "/TutorDashboard/accountSeetings",
      title: "Settings",
      icon: IoSettingsOutline,
    },
  ];

  const allMenuItems = [...tutorMenuItems, ...bottomMenuItems];

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
            {tutorMenuItems.map((item) => {
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

export default TutorSidebar;
