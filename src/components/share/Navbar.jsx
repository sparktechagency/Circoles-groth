"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  Menu,
  Drawer,
  Modal,
  Collapse,
  Checkbox,
  Avatar,
} from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  TeamOutlined,
  RocketOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useGetOwnprofileQuery } from "../../redux/features/AuthApi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import SearchBar from "../home/search/SearchBar";
import { RxCross2 } from "react-icons/rx";

const { Panel } = Collapse;

const Navbar = () => {
  const { data, isLoading, refetch } = useGetOwnprofileQuery();
  const user = data?.user?.[0]; // Access the first user object directly
  const token = Cookies.get("token");

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);
  const showSearchModal = () => setIsSearchModalVisible(true);
  const closeSearchModal = () => setIsSearchModalVisible(false);

  const onCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
    // You might want to trigger a search/filter action here
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Logged out!",
          "You've been successfully logged out.",
          "success"
        );
        Cookies.remove("token");
        router.push("/auth/login");
        if (drawerVisible) closeDrawer();
      }
    });
  };

  // User Dropdown Menu for Desktop
  const userMenu = (
    <Menu>
      <Menu.Item key="dashboard">
        <Link
          href={
            user?.role === "tutor"
              ? "/TutorDashboard"
              : user?.role === "admin"
              ? "/AdminDashboard"
              : "/UserDashboard"
          }
        >
          Dashboard
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Reusable Menu Content Components
  const TutorMenuContent = () => (
    <div className="p-2 space-y-2 bg-[#F9FAFB] rounded-lg">
      <Link
        href={"/tutorService/inpersonTutor"}
        onClick={closeDrawer}
        className="block rounded-md hover:bg-gray-100"
      >
        <div className="flex space-x-3 p-2">
          <svg
            width="20"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1 flex-shrink-0"
          >
            <path
              d="M1 18.5C1 17.837 1.26339 17.2011 1.73223 16.7322C2.20107 16.2634 2.83696 16 3.5 16H17M1 18.5C1 19.163 1.26339 19.7989 1.73223 20.2678C2.20107 20.7366 2.83696 21 3.5 21H17V1H3.5C2.83696 1 2.20107 1.26339 1.73223 1.73223C1.26339 2.20107 1 2.83696 1 3.5V18.5Z"
              stroke="#14698A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <strong className="text-base font-semibold text-[#101828]">
              In-person
            </strong>
            <p className="text-[#475467] text-sm">
              One-on-one personalized tutoring
            </p>
          </div>
        </div>
      </Link>
      <Link
        href={"/tutorService/onlineTutor"}
        onClick={closeDrawer}
        className="block rounded-md hover:bg-gray-100"
      >
        <div className="flex space-x-3 p-2">
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1 flex-shrink-0"
          >
            <path
              d="M11 1L1 13H10L9 21L19 9H10L11 1Z"
              stroke="#14698A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <strong className="text-base font-semibold text-[#101828]">
              Online
            </strong>
            <p className="text-[#475467] text-sm">Tutoring anytime, anywhere</p>
          </div>
        </div>
      </Link>
    </div>
  );

  const CategoryFilterContent = () => (
    <div className="p-4 bg-white">
      <Collapse
        defaultActiveKey={["1", "2", "3"]}
        ghost
        expandIconPosition="end"
      >
        {/* Category - Tutor */}
        <Panel
          header="Tutor"
          key="1"
          className="text-gray-800 font-medium bg-white"
        >
          <Checkbox.Group
            onChange={onCategoryChange}
            className="flex flex-col gap-2"
          >
            {pathname === "/TopRatedTutor" ? (
              <>
                <h3 className="mb-2 font-semibold">Expertise in</h3>
                <Checkbox value="Physics">Physics Expert</Checkbox>
                <Checkbox value="Chemistry">Chemistry Expert</Checkbox>
                <Checkbox value="Math">Math Expert</Checkbox>
                <Checkbox value="biology">Biology Expert</Checkbox>
              </>
            ) : (
              <Checkbox value="Tutor">Tutor</Checkbox>
            )}
          </Checkbox.Group>
        </Panel>
        {/* Category - Online Programs */}
        {pathname !== "/TopRatedTutor" && (
          <Panel
            header="Online Programs"
            key="2"
            className="text-gray-800 font-medium bg-white"
          >
            <Collapse defaultActiveKey={["2-1"]} ghost>
              <Panel header="Data Science" key="2-1">
                <Checkbox.Group
                  onChange={onCategoryChange}
                  className="flex flex-col gap-2"
                >
                  <Checkbox value="Introduction to Data Science">
                    Introduction to Data Science
                  </Checkbox>
                  <Checkbox value="Python for Data Science">
                    Python for Data Science Bootcamp
                  </Checkbox>
                  <Checkbox value="Data Science Specialization">
                    Data Science Specialization
                  </Checkbox>
                </Checkbox.Group>
              </Panel>
            </Collapse>
          </Panel>
        )}
        {/* Category - Difficulty Level */}
        {pathname !== "/TopRatedTutor" && (
          <Panel
            header="Difficulty Level"
            key="3"
            className="text-gray-800 font-medium bg-white"
          >
            <Checkbox.Group
              onChange={onCategoryChange}
              className="flex flex-col gap-2"
            >
              <Checkbox value="Beginner">Beginner</Checkbox>
              <Checkbox value="Intermediate">Intermediate</Checkbox>
              <Checkbox value="Advanced">Advanced</Checkbox>
            </Checkbox.Group>
          </Panel>
        )}
      </Collapse>
    </div>
  );

  return (
    <>
      <header className="h-[72px]">
        {" "}
        {/* Placeholder to prevent content overlap with fixed navbar */}
        <nav className="w-full px-4 sm:px-8 py-4 bg-primary mx-auto flex justify-between items-center shadow-md fixed top-0 z-50 h-[72px]">
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={150}
                height={50}
                priority
                style={{ height: "auto" }}
              />
            </Link>
          </div>

          {/* Center: Search Bar (Desktop Only) */}
          <div className="hidden lg:flex flex-1   max-w-4xl mx-4">
            <SearchBar pathname={pathname} />
          </div>

          {/* Right Side: Links & Auth */}
          <div className="flex items-center space-x-4">
            {/* Desktop Links */}
            <ul className="hidden lg:flex items-center space-x-6 text-white">
              <li>
                <Link
                  href="/onlinePrograms"
                  className="text-base hover:text-gray-200"
                >
                  Online Programs
                </Link>
              </li>
              <li>
                <Dropdown overlay={<TutorMenuContent />} trigger={["hover"]}>
                  <Button
                    type="text"
                    className="text-white text-base p-0 h-auto hover:!bg-transparent hover:text-gray-200"
                  >
                    <p className="text-white"> Tutor Service</p>{" "}
                    <DownOutlined className="text-xs text-white" />
                  </Button>
                </Dropdown>
              </li>
              <li>
                <Link
                  href="/auth/Becomeatutor"
                  className="text-base hover:text-gray-200"
                >
                  Become a Tutor
                </Link>
              </li>
            </ul>

            {/* Auth Section (Desktop) */}
            <div className="hidden lg:flex items-center pl-4">
              {isLoading ? (
                <Button type="primary" loading>
                  Loading
                </Button>
              ) : token && user ? (
                <Dropdown overlay={userMenu} trigger={["click"]}>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar
                      size="default"
                      icon={<UserOutlined />}
                      src={user.avatar}
                    />
                    <span className="text-base font-medium text-white">
                      {user.name || "User"}
                    </span>
                    <DownOutlined className="text-xs text-white" />
                  </div>
                </Dropdown>
              ) : (
                <Link href={"/auth/login"}>
                  <button className=" bg-fourth h-[44px]  w-[100px] rounded-lg text-base text-white hover:text-gray-200">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Icons */}
            <div className="lg:hidden flex items-center space-x-4">
              <SearchOutlined
                className="text-2xl text-white cursor-pointer"
                onClick={showSearchModal}
              />
              <MenuOutlined
                className="text-2xl text-white cursor-pointer"
                onClick={showDrawer}
              />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Search Modal */}
      <Modal
        title="Search"
        open={isSearchModalVisible}
        onCancel={closeSearchModal}
        footer={null}
      >
        <SearchBar pathname={pathname} onSearch={closeSearchModal} />
      </Modal>

      {/* Mobile Drawer */}
      <Drawer
        title={<Image src={logo} alt="Menu Logo" width={100} height={30} />}
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
        closeIcon={<RxCross2 className="text-white" size={24} />}
        width={300}
        style={{
          zIndex: 9999,
          overflow: "auto",
          height: "100vh",
          color: "white",
          backgroundColor: "#08284F",
        }}
      >
        <div className="flex flex-col h-full">
          {token && user && (
            <div className="p-4 mb-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Avatar
                  size="large"
                  icon={<UserOutlined className="text-white" />}
                  src={user.avatar}
                />
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <Link
                href={
                  user.role === "tutor"
                    ? "/TutorDashboard"
                    : user.role === "admin"
                    ? "/AdminDashboard"
                    : "/UserDashboard"
                }
                onClick={closeDrawer}
              >
                <Button type="primary" block className="mt-4">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          )}

          <div className="flex-grow space-y-2">
            <Menu
              mode="vertical"
              selectable={false}
              className="border-none bg-transparent"
            >
              <Menu.Item key="programs">
                <Link href="/onlinePrograms" onClick={closeDrawer}>
                  <AppstoreOutlined className="text-white" /> Online Programs
                </Link>
              </Menu.Item>
              <Menu.Item key="become-tutor">
                <Link href="/auth/Becomeatutor" onClick={closeDrawer}>
                  <RocketOutlined className="text-white" /> Become a Tutor
                </Link>
              </Menu.Item>
            </Menu>
            <Collapse ghost expandIconPosition="end" className="bg-transparent">
              <Panel
                header={
                  <>
                    <TeamOutlined className="mr-2 text-white" />
                    <span className="text-white"> Tutor Service</span>
                  </>
                }
                key="1"
              >
                <TutorMenuContent />
              </Panel>
              <Panel
                header={
                  <>
                    <FilterOutlined className="mr-2 text-white" />
                    <span className="text-white">Category Filters</span>
                  </>
                }
                key="2"
              >
                <CategoryFilterContent />
              </Panel>
            </Collapse>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200">
            {token ? (
              <Button
                onClick={handleLogout}
                type="primary"
                danger
                block
                icon={<LogoutOutlined />}
              >
                Log Out
              </Button>
            ) : (
              <div className="space-y-4">
                <Link href={"/auth/login"} onClick={closeDrawer}>
                  <Button
                    style={{ backgroundColor: "#08284F" }}
                    className="text-white bg-[#08284F] mb-4"
                    block
                  >
                    Log In
                  </Button>
                </Link>
                <Link href={"/auth/signup"} onClick={closeDrawer}>
                  <Button
                    style={{
                      backgroundColor: "#08284F",
                      color: "white",
                      borderColor: "#08284F",
                    }}
                    className="text-white bg-[#08284F] mb-4"
                    block
                    type="primary"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
