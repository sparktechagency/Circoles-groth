import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  ClockCircleOutlined,
  UsergroupDeleteOutlined,
  ArrowUpOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Rate, Dropdown, Menu } from "antd";
import { useDeleteCourseMutation } from "../../redux/features/adminapis/AdminApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ManageCourseCard = ({
  courseimage,
  courseTitle,
  rating,
  price,
  reviews,
  duration,
  students,
  enrollLink,
  id,
  language,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
  const router = useRouter();
  const handleMenuClick = async (e) => {
    setDropdownVisible(false);
    if (e.key === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await deleteCourse(id).unwrap();
            if (res?.success) {
              Swal.fire("Deleted!", "Course has been deleted.", "success");
            }
            console.log("id", id);
          } catch (error) {
            console.error("Error deleting course:", error);
          }
        }
      });

      // Add your delete logic here
    } else if (e.key === "curriculum") {
      router.push(`/AdminDashboard/curriculam/${id}`);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="curriculum">
        <div className="flex items-center">
          <EditOutlined className="mr-2" />
          <span>Add Curriculum</span>
        </div>
      </Menu.Item>
      <Menu.Item key="delete" danger>
        <div className="flex items-center">
          <DeleteOutlined className="mr-2" />
          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden relative">
      {/* Three-dot menu button */}
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        visible={dropdownVisible}
        onVisibleChange={(visible) => setDropdownVisible(visible)}
        placement="bottomRight"
      >
        <button
          className="absolute top-2 left-2 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDropdownVisible(!dropdownVisible);
          }}
        >
          <MoreOutlined className="text-white text-lg bg-black bg-opacity-50 rounded-full p-1" />
        </button>
      </Dropdown>

      {/* COURSE CARD BANNER IMAGE HERE */}
      <div className="relative">
        <Image
          className="w-full h-64 object-cover"
          src={courseimage}
          alt="Course"
          height={500}
          width={500}
        />

        <div className="p-2 bg-[#00000099] absolute w-fit top-2 right-2 rounded-lg px-4 text-white">
          <span className="text-[16px] font-normal">Course</span>
        </div>
      </div>

      {/* COURSE CARD DETAILS HERE */}
      <div className="p-4">
        <div className="flex justify-between items-center pt-5">
          <div className="flex items-center justify-center mb-2">
            <span className="text-yellow-500 text-sm">
              <Rate disabled allowHalf count={1} defaultValue={rating} />{" "}
              <span className="text-[#475467] font-bold text-[16px]">
                {rating}
              </span>
            </span>
            <span className="text-[#475467] font-normal text-sm ml-2">
              ({reviews})
            </span>
          </div>
        </div>

        <h5 className="text-lg font-bold tracking-tight text-[#1D2939] mb-2">
          {courseTitle}
        </h5>

        <div className="flex items-center justify-between text-[#475467] text-sm py-4 border-b border-[#E5E7EB]">
          <span className="mr-4 flex items-center font-medium">
            <ClockCircleOutlined className="text-lg pr-2" />
            {duration}
          </span>
          <span className="flex items-center font-normal">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0003 7.69206C14.0003 11.374 11.0156 14.3587 7.33366 14.3587M14.0003 7.69206C14.0003 4.01016 11.0156 1.02539 7.33366 1.02539M14.0003 7.69206H0.666992M7.33366 14.3587C3.65176 14.3587 0.666992 11.374 0.666992 7.69206M7.33366 14.3587C9.00118 12.5332 9.94883 10.164 10.0003 7.69206C9.94883 5.22008 9.00118 2.85096 7.33366 1.02539M7.33366 14.3587C5.66614 12.5332 4.71849 10.164 4.66699 7.69206C4.71849 5.22008 5.66614 2.85096 7.33366 1.02539M0.666992 7.69206C0.666992 4.01016 3.65176 1.02539 7.33366 1.02539"
                stroke="#475467"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[14px] font-medium pl-1"> {language}</span>
          </span>
        </div>
        <div className="flex justify-between items-center py-4">
          <span className="text-lg font-semibold text-[#000000]">
            € {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ManageCourseCard;
