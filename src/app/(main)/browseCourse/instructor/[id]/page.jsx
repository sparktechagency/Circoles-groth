"use client";
import React, { useState } from "react";
import { Avatar, Badge, Button, Calendar, Card, Rate, Tabs } from "antd";
import Image from "next/image";

import instactor from "/public/images/Instructor2.png";
import ratingimage from "./srahkhan.png";

import {
  ArrowUpOutlined,
  GlobalOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import CourseCard from "../../../../../components/ui/CourseCard";
import ReviewCard from "../../../../../components/ui/ReviewCard";
import Link from "next/link";
import { useGetinstrucotorDetialsQuery } from "../../../../../redux/features/CourseApi";

const page = ({ params }) => {
  const { id } = params;

  const { data, isLoading } = useGetinstrucotorDetialsQuery(id);
  const [activeKey, setActiveKey] = useState("2");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const times = ["3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "6:00 PM"];

  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelect = (date) => {
    setSelectedDate(date);
  };

  const getListData = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const availability = {
      "2025-03-01": ["3:30 PM", "4:00 PM", "4:30 PM"],
      "2025-03-05": ["5:00 PM", "6:00 PM"],
    };
    return availability[dateStr] || [];
  };

  if (isLoading) {
    return <p>loading..</p>;
  }

  const tutor = data?.tutor;

  return (
    <div>
      <div className="container mx-auto xl:px-6 p-4">
        <div className=" lg:mt-28 md:mt-24 mt-12  w-full ">
          <h1 className="text-3xl font-bold mb-24 text-[#1D2939] font-Merriweather">
            Instructor
          </h1>
          <div className=" p-6 ">
            {/* Profile Header */}
            <div className="">
              <Avatar size={120} src={tutor?.avatar}>
                {tutor?.avatar ? (
                  <image src={tutor.avatar} alt={tutor.name} />
                ) : (
                  <image className="w-full" src={instactor} alt="Instructor" />
                )}
              </Avatar>
              <div className="mt-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  {tutor?.name || "John Doe"}
                </h1>
                <p className="text-[#475467] flex items-center space-x-2">
                  <span>
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.6663 13V2.33333C10.6663 1.97971 10.5259 1.64057 10.2758 1.39052C10.0258 1.14048 9.68663 1 9.33301 1H6.66634C6.31272 1 5.97358 1.14048 5.72353 1.39052C5.47348 1.64057 5.33301 1.97971 5.33301 2.33333V13M2.66634 3.66667H13.333C14.0694 3.66667 14.6663 4.26362 14.6663 5V11.6667C14.6663 12.403 14.0694 13 13.333 13H2.66634C1.92996 13 1.33301 12.403 1.33301 11.6667V5C1.33301 4.26362 1.92996 3.66667 2.66634 3.66667Z"
                        stroke="#667085"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>{" "}
                  <span>
                    {tutor?.expertise_area
                      ? `Expert in ${tutor.expertise_area}`
                      : "Head of Product Management at Google"}
                  </span>
                </p>
                <p className="text-[#475467]">
                  {tutor?.address || "Los Angeles, Southern California, U.S"}
                </p>
              </div>
            </div>

            {/* Booking Section */}
            <Card className="mt-6 shadow-sm max-w-lg">
              <h2 className="text-lg font-bold text-[#1D2939] pb-2">
                Book {tutor?.name || "John Doe"}
              </h2>
              <hr />

              {/* Online Booking Option */}
              {tutor?.online?.length > 0 ? (
                <Link href={`/browseCourse/instructor/SessionSchedule`}>
                  <div className="flex items-center justify-between mt-4 pb-2">
                    <p className="flex items-center gap-2 text-[#344054] pb-2 text-[16px] font-semibold">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23 7L16 12L23 17V7Z"
                          stroke="#14698A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
                          stroke="#14698A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Online{" "}
                      <span className="font-semibold">
                        {tutor?.session_charge || "€15.00"}/session
                      </span>
                    </p>
                    <button
                      type="primary"
                      className="bg-transparent border-none"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.83301 14.1663L14.1663 5.83301M14.1663 5.83301H5.83301M14.1663 5.83301V14.1663"
                          stroke="#344054"
                          strokeWidth="1.67"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center justify-between mt-4 pb-2 opacity-40 cursor-not-allowed">
                  <p className="flex items-center gap-2 text-[#344054] pb-2 text-[16px] font-semibold">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23 7L16 12L23 17V7Z"
                        stroke="#E4E7EC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z"
                        stroke="#E4E7EC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Online - Not available
                  </p>
                  <button
                    type="primary"
                    className="bg-transparent border-none"
                    disabled
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.83301 14.1663L14.1663 5.83301M14.1663 5.83301H5.83301M14.1663 5.83301V14.1663"
                        stroke="#E4E7EC"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
              <hr />

              {/* Offline Booking Option */}
              {tutor?.offline?.length > 0 ? (
                <Link href={`/browseCourse/instructor/SessionSchedule`}>
                  <div className="flex items-center justify-between mt-4 pb-2">
                    <p className="flex items-center gap-2 text-[#344054] pb-2 text-[16px] font-semibold">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                          stroke="#14698A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      In-person{" "}
                      <span className="font-semibold">
                        {tutor?.session_charge || "€15.00"}/session
                      </span>
                    </p>
                    <button
                      type="primary"
                      className="bg-transparent border-none"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.83301 14.1663L14.1663 5.83301M14.1663 5.83301H5.83301M14.1663 5.83301V14.1663"
                          stroke="#344054"
                          strokeWidth="1.67"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center justify-between mt-4 pb-2 opacity-40 cursor-not-allowed">
                  <p className="flex items-center gap-2 text-[#344054] pb-2 text-[16px] font-semibold">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="#E4E7EC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    In-person - Not available
                  </p>
                  <button
                    type="primary"
                    className="bg-transparent border-none"
                    disabled
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.83301 14.1663L14.1663 5.83301M14.1663 5.83301H5.83301M14.1663 5.83301V14.1663"
                        stroke="#E4E7EC"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
              <hr />
            </Card>
            {/* Availability Section */}
            <Card className="mt-6 max-w-2xl p-4">
              <h2 className="text-lg font-semibold text-[#1D2939] mb-4">
                Availability
              </h2>
              <Calendar
                fullscreen={false}
                dateCellRender={(value) => {
                  const listData = getListData(value);
                  return (
                    <ul>
                      {listData.map((item, index) => (
                        <li key={index}>
                          <Badge status="success" text={item} />
                        </li>
                      ))}
                    </ul>
                  );
                }}
                onSelect={handleSelect}
              />
              {selectedDate && (
                <div className="mt-4">
                  <p className="text-gray-700 font-semibold">
                    Selected Date: {selectedDate.format("YYYY-MM-DD")}
                  </p>
                </div>
              )}
            </Card>

            {/* About Section */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-700">About</h2>
              <p className="mt-4 text-gray-600">
                {tutor?.about ||
                  "I'm a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer."}
              </p>
              {tutor?.about && (
                <p className="mt-2 text-blue-500 cursor-pointer">Show more</p>
              )}
            </div>

            {/* Subjects Section */}
            {tutor?.subjects && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Subjects
                </h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {Object.values(tutor.subjects).map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className=" bg-white ">
            <div>
              <h1 className="text-lg font-bold  text-[#475467] font-Merriweather mt-14 pb-6">
                {tutor?.total_reviews || "4.2k"} reviews & ratings
              </h1>

              {/* Course rating and reviews here---------------------------------------------- */}
              <div className="  w-full ">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2  ">
                  {tutor?.reviews?.slice(0, 4).map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </div>
                {tutor?.reviews?.length > 4 && (
                  <Link
                    href={"/browseCourse/instructor/allReviewAndratings"}
                    className="inline-flex items-center text-[#475467] border-b-2 border-[#475467] mt-8 text-[16px] font-semibold "
                  >
                    Show all reviews
                    <ArrowUpOutlined className="rotate-45 text-xl pl-2" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
