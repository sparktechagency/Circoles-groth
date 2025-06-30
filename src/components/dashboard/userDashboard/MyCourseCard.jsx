import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ClockCircleOutlined,
  UsergroupDeleteOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { Progress, Rate } from "antd";

const MyCourseCard = ({
  courseimage,
  courseTitle,
  rating,
  reviews,
  duration,
  enrollLink,
  progress,
  language,
}) => {
  return (
    <Link
      href={`/UserDashboard/EnrolledCourses/EnroledCourseDetails/${enrollLink}`}
    >
      <div className=" w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* COURSE CARD BANNER IMGE HERE */}
        <div className="relative">
          <Image
            className="w-full h-64 object-cover"
            src={courseimage}
            alt="Course"
            height={500}
            width={500}
          />

          <div className="p-2 bg-[#00000099] absolute w-fit top-2  right-2 rounded-lg px-4 text-white ">
            <span className="text-[16px] font-normal">Course</span>
          </div>
        </div>
        {/* COURSE CARD DETAILS HERE */}
        <div className="p-4">
          <div className="flex justify-between items-center pt-5">
            <h5 className="text-lg font-bold tracking-tight text-[#1D2939] mb-2">
              {courseTitle}
            </h5>
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

          <div>
            <Progress
              strokeColor={"#039855"}
              trailColor="#D1FADF"
              percent={progress}
            />

            <span className="text-[#667085] text-[16px]">
              {progress} % completed
            </span>
          </div>
          <div className="flex items-center justify-between text-[#475467] text-sm py-4 ">
            <span className="mr-4 flex items-center font-medium">
              <ClockCircleOutlined className="text-lg pr-2 " />
              {duration}
            </span>
            <span className="flex items-center font-normal ">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="text-[14px] font-medium pl-1"> {language}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyCourseCard;
