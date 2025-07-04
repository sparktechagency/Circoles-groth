"use client";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Calendar,
  Badge,
  Tag,
  Rate,
  Divider,
  Tabs,
  Spin,
} from "antd";
import {
  ArrowUpOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  LaptopOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useGetinstrucotorDetialsQuery } from "../../../../../redux/features/CourseApi";
import Image from "next/image";
import instactor from "/public/images/Instructor2.png";

const TutorProfilePage = ({ params }) => {
  const { id } = params;
  const { data, isLoading } = useGetinstrucotorDetialsQuery(id);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("online");
  const tutor = data?.tutor;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Process availability data for the calendar
  const processAvailability = (sessions) => {
    const availabilityMap = {};

    sessions?.forEach((session) => {
      const dayNumber = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ].indexOf(session.day.toLowerCase());

      // Find next occurrence of this day
      const date = new Date();
      while (date.getDay() !== dayNumber) {
        date.setDate(date.getDate() + 1);
      }

      const dateStr = date.toISOString().split("T")[0];
      if (!availabilityMap[dateStr]) {
        availabilityMap[dateStr] = [];
      }
      availabilityMap[dateStr].push(session.time);
    });

    return availabilityMap;
  };

  const onlineAvailability = processAvailability(tutor?.online);
  const offlineAvailability = processAvailability(tutor?.offline);

  // Custom calendar cell renderer
  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const onlineTimes = onlineAvailability[dateStr] || [];
    const offlineTimes = offlineAvailability[dateStr] || [];

    return (
      <div className="calendar-availability">
        {onlineTimes.map((time, i) => (
          <div key={`online-${i}`} className="time-slot online">
            <ClockCircleOutlined className="mr-1" />
            {time}
          </div>
        ))}
        {offlineTimes.map((time, i) => (
          <div key={`offline-${i}`} className="time-slot offline">
            <ClockCircleOutlined className="mr-1" />
            {time}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto xl:px-6 p-4">
      <div className="lg:mt-12 md:mt-8 mt-6 w-full">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-shrink-0">
            <Avatar
              size={120}
              src={tutor?.avatar}
              icon={<UserOutlined />}
              className="border-2 border-gray-200"
            />
          </div>
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-gray-800">{tutor?.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Tag color="blue" className="flex items-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M10.6663 13V2.33333C10.6663 1.97971 10.5259 1.64057 10.2758 1.39052C10.0258 1.14048 9.68663 1 9.33301 1H6.66634C6.31272 1 5.97358 1.14048 5.72353 1.39052C5.47348 1.64057 5.33301 1.97971 5.33301 2.33333V13M2.66634 3.66667H13.333C14.0694 3.66667 14.6663 4.26362 14.6663 5V11.6667C14.6663 12.403 14.0694 13 13.333 13H2.66634C1.92996 13 1.33301 12.403 1.33301 11.6667V5C1.33301 4.26362 1.92996 3.66667 2.66634 3.66667Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {tutor?.expertise_area || "Tutor"}
              </Tag>
              <div className="flex items-center text-gray-600">
                <EnvironmentOutlined className="mr-1" />
                {tutor?.address || "Location not specified"}
              </div>
            </div>
            <div className="mt-3">
              <Rate
                disabled
                allowHalf
                defaultValue={tutor?.rating || 4.5}
                className="text-lg"
              />
              <span className="ml-2 text-gray-500">
                ({tutor?.total_reviews || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <Card className="my-6 shadow-sm max-w-lg">
          <h2 className="text-lg font-bold text-[#1D2939] pb-2">
            Book {tutor?.name || "John Doe"}
          </h2>
          <hr />

          {/* Online Booking Option */}
          {tutor?.online?.length > 0 ? (
            <Link
              href={`/browseCourse/instructor/SessionSchedule/${tutor?.id}?type=online&cost=${tutor?.session_charge}`}
            >
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
                <button type="primary" className="bg-transparent border-none">
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
            <Link
              href={`/browseCourse/instructor/SessionSchedule/${tutor?.id}?type=offline&cost=${tutor?.session_charge}`}
            >
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
                <button type="primary" className="bg-transparent border-none">
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

        {/* Availability Calendar Section */}
        <Card
          title="Availability Calendar"
          className="mb-8 shadow-sm"
          headStyle={{ fontSize: "18px", fontWeight: "600" }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: "online",
                label: (
                  <span className="flex items-center">
                    <LaptopOutlined className="mr-2" />
                    Online Sessions
                  </span>
                ),
                children: (
                  <div className="availability-calendar">
                    <Calendar
                      fullscreen={false}
                      dateCellRender={dateCellRender}
                      onSelect={(date) => setSelectedDate(date)}
                    />
                    {selectedDate && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium">
                          {selectedDate.format("dddd, MMMM D, YYYY")}
                        </h4>
                        <div className="mt-2">
                          {onlineAvailability[
                            selectedDate.format("YYYY-MM-DD")
                          ]?.map((time, i) => (
                            <Tag key={i} color="blue" className="m-1">
                              {time}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                key: "offline",
                label: (
                  <span className="flex items-center">
                    <UserOutlined className="mr-2" />
                    In-Person Sessions
                  </span>
                ),
                children: (
                  <div className="availability-calendar">
                    <Calendar
                      fullscreen={false}
                      dateCellRender={dateCellRender}
                      onSelect={(date) => setSelectedDate(date)}
                    />
                    {selectedDate && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium">
                          {selectedDate.format("dddd, MMMM D, YYYY")}
                        </h4>
                        <div className="mt-2">
                          {offlineAvailability[
                            selectedDate.format("YYYY-MM-DD")
                          ]?.map((time, i) => (
                            <Tag key={i} color="green" className="m-1">
                              {time}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
          />
        </Card>

        {/* About Section */}
        <Card title="About" className="mb-8 shadow-sm">
          <p className="text-gray-700 whitespace-pre-line">
            {tutor?.about || "No information provided."}
          </p>
        </Card>

        {/* Subjects Section */}
        {tutor?.subjects && Object.keys(tutor.subjects).length > 0 && (
          <Card title="Subjects" className="mb-8 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {Object.values(tutor.subjects).map((subject, index) => (
                <Tag key={index} color="geekblue">
                  {subject}
                </Tag>
              ))}
            </div>
          </Card>
        )}

        {/* Reviews Section */}
        <Card
          title={`Reviews (${tutor?.total_reviews || 0})`}
          className="shadow-sm"
        >
          {tutor?.reviews?.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                {tutor.reviews.slice(0, 4).map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
              {tutor.reviews.length > 4 && (
                <div className="mt-4 text-center">
                  <Link
                    href={`/browseCourse/instructor/allReviewAndratings/${tutor?.id}`}
                    className="inline-flex items-center text-blue-600"
                  >
                    View all reviews{" "}
                    <ArrowUpOutlined className="rotate-45 ml-1" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center py-4">No reviews yet</p>
          )}
        </Card>
      </div>

      <style jsx>{`
        .calendar-availability {
          min-height: 80px;
        }
        .time-slot {
          font-size: 12px;
          margin: 2px 0;
          padding: 2px 4px;
          border-radius: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .time-slot.online {
          background-color: #e6f7ff;
          color: #1890ff;
        }
        .time-slot.offline {
          background-color: #f6ffed;
          color: #52c41a;
        }
        .availability-calendar :global(.ant-picker-cell-inner) {
          min-height: 100px;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <Card className="review-card">
      <div className="flex items-start">
        <Avatar src={review.avatar} size={48} />
        <div className="ml-4">
          <div className="flex items-center">
            <h4 className="font-medium">{review.name}</h4>
            <Rate
              disabled
              defaultValue={review.rating}
              className="ml-3 text-sm"
              allowHalf
            />
          </div>
          <p className="text-gray-500 text-sm mt-1">
            {new Date(review.date).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mt-2">{review.comment}</p>
        </div>
      </div>
    </Card>
  );
};

export default TutorProfilePage;
