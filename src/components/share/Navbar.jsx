"use client";
import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Dropdown,
  Menu,
  Drawer,
  Modal,
  Select,
  Collapse,
  Checkbox,
  Avatar,
} from "antd";

const { Panel } = Collapse;
import {
  ShoppingCartOutlined,
  MenuOutlined,
  SearchOutlined,
  DownOutlined,
  GlobalOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Option } from "antd/es/mentions";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetOwnprofileQuery } from "../../redux/features/AuthApi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import SearchBar from "../home/search/SearchBar";
const Navbar = () => {
  const { data, isLoading } = useGetOwnprofileQuery();

  const user = data?.user;
  const token = Cookies.get("token");

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const pathname = usePathname();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showDrawer = () => {
    setDrawerVisible(true);
  };
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const [selectedCategories, setSelectedCategories] = useState([]);

  const onCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
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
        Swal.fire("Logged out!", "You're logged out.", "success");
        Cookies.remove("token");
        router.push("/auth/login");
      }
    });
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const categoryMenu = (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
      <p className="text-sm text-gray-500">
        Helps you to find what actually you're looking for
      </p>
      <Collapse
        defaultActiveKey={["1", "2", "3"]}
        ghost
        expandIconPosition="end"
        className="mt-4"
      >
        {/* Category - Tutor */}
        <Panel
          header="Tutor"
          key="1"
          className="text-gray-800 font-medium bg-white"
        >
          <Checkbox.Group onChange={onCategoryChange}>
            {pathname === "/TopRatedTutor" && (
              <div className="flex flex-col gap-2">
                <h3>Expertice in</h3>
                <Checkbox value="Physics">Physics Expert</Checkbox>
                <Checkbox value="Chemistry">Chemistry Expert</Checkbox>
                <Checkbox value="Math">Math Expert</Checkbox>
                <Checkbox value="biology">biology Expert</Checkbox>
              </div>
            )}
            {pathname !== "/TopRatedTutor" && (
              <div className="flex flex-col gap-2">
                <Checkbox value="Tutor">Tutor</Checkbox>
              </div>
            )}
          </Checkbox.Group>
        </Panel>

        {/* Category - Online Programs */}
        <Panel
          header="Online Programs"
          key="2"
          className={`text-gray-800 font-medium bg-white ${
            pathname === "/TopRatedTutor" && "hidden"
          }`}
        >
          <Collapse defaultActiveKey={["2-1"]} ghost>
            <Panel header="Data Science" key="2-1">
              <Checkbox.Group onChange={onCategoryChange}>
                <div className="flex flex-col gap-2">
                  <Checkbox value="Introduction to Data Science">
                    Introduction to Data Science
                  </Checkbox>
                  <Checkbox value="Python for Data Science">
                    Python for Data Science and Machine Learning Bootcamp
                  </Checkbox>
                  <Checkbox value="Data Science Specialization">
                    Data Science Specialization
                  </Checkbox>
                  <Checkbox value="Data Science Fundamentals">
                    Data Science Fundamentals with Python and SQL
                  </Checkbox>
                  <Checkbox value="Machine Learning">Machine Learning</Checkbox>
                  <Checkbox value="Applied Data Science">
                    Applied Data Science with Python Specialization
                  </Checkbox>
                  <Checkbox value="SQL for Data Science">
                    SQL for Data Science
                  </Checkbox>
                  <Checkbox value="AI Literacy">AI Literacy</Checkbox>
                </div>
              </Checkbox.Group>
            </Panel>
          </Collapse>
        </Panel>

        {/* Category - Difficulty Level */}
        <Panel
          header="Difficulties Level"
          key="3"
          className={`text-gray-800 font-medium bg-white ${
            pathname === "/TopRatedTutor" && "hidden"
          }`}
        >
          <Checkbox.Group onChange={onCategoryChange}>
            <div className="flex flex-col gap-2">
              <Checkbox value="Beginner">Beginner</Checkbox>
              <Checkbox value="Intermediate">Intermediate</Checkbox>
              <Checkbox value="Advanced">Advanced</Checkbox>
            </div>
          </Checkbox.Group>
        </Panel>
      </Collapse>
    </div>
  );

  const TutorMewnu = (
    <Menu className="max-w-[300px] w-full space-y-2">
      <Menu.Item key="1">
        <Link href={"/tutorService/inpersonTutor"}>
          <div className="flex space-x-1">
            <div className="pt-2">
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 18.5C1 17.837 1.26339 17.2011 1.73223 16.7322C2.20107 16.2634 2.83696 16 3.5 16H17M1 18.5C1 19.163 1.26339 19.7989 1.73223 20.2678C2.20107 20.7366 2.83696 21 3.5 21H17V1H3.5C2.83696 1 2.20107 1.26339 1.73223 1.73223C1.26339 2.20107 1 2.83696 1 3.5V18.5Z"
                  stroke="#14698A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <strong className="text-lg font-semibold text-[#101828]">
                In-person
              </strong>
              <p className="text-[#475467] text-sm">
                One-on-one personalized in-person tutoring
              </p>
            </div>
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item key="2">
        <Link href={"/tutorService/onlineTutor"}>
          <div className="flex space-x-2">
            <div className="pt-2">
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1L1 13H10L9 21L19 9H10L11 1Z"
                  stroke="#14698A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <strong className="text-lg font-semibold text-[#101828]">
                Online
              </strong>
              <p className="text-[#475467] text-sm">
                Personalized online tutoring, anytime, anywhere.
              </p>
            </div>
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="dashboard">
        <Link href="/UserDashboard">Dashboard</Link>
      </Menu.Item>

      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="w-full p-4 bg-white mx-auto flex justify-between items-center shadow-sm">
      {/* Left Side: Logo */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="w-full flex-1">
        <SearchBar pathname={pathname} />
      </div>

      {/* Right Side: Links (Hidden on small screens) */}
      <div className="">
        <ul className="hidden lg:flex items-center space-x-6">
          <li>
            {" "}
            <Link href="/onlinePrograms" className="text-sm pl-2">
              Online Programs
            </Link>
          </li>
          <li>
            {" "}
            <Dropdown
              className="border-none"
              overlay={TutorMewnu}
              trigger={["hover"]}
            >
              <Button>
                Tutor Service <DownOutlined />
              </Button>
            </Dropdown>
          </li>
          <li>
            <Link href={`/auth/Becomeatutor`} className="text-sm pl-2">
              Become a Tutor
            </Link>
          </li>
          <li>
            {isLoading ? (
              <Button
                className="text-[#FFFFFF] font-semibold text-[16px] p-5 bg-primary"
                style={{ backgroundColor: "#14698A" }}
                type="primary"
                loading
              >
                Loading
              </Button>
            ) : (
              <>
                {token ? (
                  <div className="relative">
                    <Dropdown overlay={userMenu} trigger={["click"]}>
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={toggleLogout}
                      >
                        <Avatar
                          size="default"
                          icon={<UserOutlined />}
                          src={user?.avatar}
                          className="bg-primary"
                        />
                        <span className="text-sm font-medium">
                          {user?.name || "User"}
                        </span>
                        <DownOutlined className="text-xs" />
                      </div>
                    </Dropdown>
                  </div>
                ) : (
                  <Link href={"/auth/login"}>
                    <Button
                      className="text-[#FFFFFF] font-semibold text-[16px] p-5 bg-primary"
                      style={{ backgroundColor: "#14698A" }}
                      type="primary"
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button (Visible on small screens) */}
      <div className="lg:hidden">
        <MenuOutlined className="text-2xl" onClick={showDrawer} />
      </div>

      {/* Modal for language selection */}
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <h2 className="text-lg font-semibold mb-4">
          Choose Your Preferred Language
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          Select a language from the dropdown to change the language of the
          website.
        </p>

        <p className=" text-sm text-gray-500">
          Note: Changing the language will refresh the page to apply your
          selection.
        </p>
        <p className="mb-4 text-sm text-gray-500">
          If you encounter any issues, please try reloading the page manually.
        </p>
      </Modal>

      {/* Drawer for mobile menu */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span>Menu</span>
            {token && (
              <div className="flex items-center space-x-2">
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  src={user?.avatar}
                  className="bg-primary"
                />
                <span className="text-sm font-medium">
                  {user?.name || "User"}
                </span>
              </div>
            )}
          </div>
        }
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
        width={300}
      >
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <Dropdown overlay={categoryMenu} trigger={["click"]}>
              <Button className="mb-4 w-full">Category</Button>
            </Dropdown>
            <Dropdown overlay={TutorMewnu} trigger={["click"]}>
              <Button className="w-full text-left mb-2">
                Tutor Service <DownOutlined />
              </Button>
            </Dropdown>
            <div className="flex flex-col ">
              <Link
                href="/onlinePrograms"
                className="text-base font-medium py-2 px-2 rounded hover:bg-gray-100"
                onClick={closeDrawer}
              >
                Online Programs
              </Link>

              <Link
                href="/auth/Becomeatutor"
                className="text-base font-medium py-2 px-2 rounded hover:bg-gray-100"
                onClick={closeDrawer}
              >
                Become a Tutor
              </Link>
            </div>
          </div>

          <div className="mt-auto pb-4">
            {token ? (
              <Button
                onClick={() => {
                  handleLogout();
                  closeDrawer();
                }}
                className="w-full"
                type="primary"
                danger
                icon={<LogoutOutlined />}
              >
                Log Out
              </Button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href={"/auth/login"} onClick={closeDrawer}>
                  <Button className="w-full">Log In</Button>
                </Link>
                <Link href={"/auth/signup"} onClick={closeDrawer}>
                  <Button className="w-full" type="primary">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
