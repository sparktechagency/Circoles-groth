'use client'
import React, { useState } from "react";
import { Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";


import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { useRouter } from "next/navigation";


const Sidebar = ({ selectedMenuItems }) => {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => setMobileMenu(!mobileMenu);

  return (
    <div>
      {/* Mobile Menu Button */}
      <div className="absolute top-2 xl:hidden lg:hidden block left-4 w-full h-16 z-50">
        <button onClick={handleMobileMenu}>
          {mobileMenu ? (
            <span>Close</span>
          ) : (
            <span>Menu</span>
          )}
        </button>
      </div>

      <aside
        className={`sidebar-menu ${
          mobileMenu ? "hidden" : "block"
        } absolute xl:block lg:block overflow-scroll`}
        style={{
          position: "fixed",
          width: 312,
          left: 0,
          top: 0,
          bottom: 0,
          background: "#1E1E1E",
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
        <Menu
          mode="inline"
          style={{ background: "#1E1E1E", color: "white" }}
          defaultSelectedKeys={["1"]}
        >
          {selectedMenuItems.map((item, index) => (
            <Menu.Item
              key={`item-${index}`}
              icon={item.icon}
              style={{
                color: router.pathname === item.path ? "red" : "#fff",
                fontWeight: router.pathname === item.path ? "bold" : "normal",
                fontSize: "16px",
              }}
            >
              <Link href={item.path}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </aside>
    </div>
  );
};

export default Sidebar;
