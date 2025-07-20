"use client";
import React, { useState, useRef } from "react";
import { GrDocumentVerified } from "react-icons/gr";
import { IoIosTrophy } from "react-icons/io";
import {
  PlayCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Card, Progress, Button, Row, Col } from "antd";
import { ArrowUp } from "lucide-react";
import UserBarChart from "../../../components/dashboard/userDashboard/UserBarChart";
import {
  useEnrolledCourseProgressQuery,
  useGetStudentStatusQuery,
} from "../../../redux/features/userDashboard/UserDashboardApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Mycourses = () => {
  const router = useRouter();
  const { data: statusData, isLoading: statusLoading } =
    useGetStudentStatusQuery();
  const { data: enrolledCourseData, isLoading: enrolledCourseLoading } =
    useEnrolledCourseProgressQuery();
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Transform status data into card format
  const cardData = [
    {
      id: 1,
      icon: (
        <PlayCircleOutlined style={{ fontSize: "30px", color: "#0E68E7" }} />
      ),
      title: statusData?.data?.enrolled_courses || "0",
      description: "Enrolled Courses",
    },
    {
      id: 2,
      icon: (
        <GrDocumentVerified style={{ fontSize: "30px", color: "#7F56D9" }} />
      ),
      title: statusData?.data?.active_courses || "0",
      description: "Active Courses",
    },
    {
      id: 3,
      icon: <IoIosTrophy style={{ fontSize: "30px", color: "#039855" }} />,
      title: statusData?.data?.complete_courses || "0",
      description: "Completed Courses",
    },
  ];

  const handleCardClick = (cardIndex) => {
    setSelectedCard(cardIndex);
  };

  // Course card colors
  const courseColors = [
    { bg: "#6941C6", progress: "#9E77ED" },
    { bg: "#006838", progress: "#66BB6A" },
    { bg: "#0E68E7", progress: "#7F56D9" },
    { bg: "#7F56D9", progress: "#9E77ED" },
  ];

  // Get enrolled courses data
  const enrolledCourses = enrolledCourseData?.course_progresses?.data || [];
  const showCarousel = enrolledCourses.length > 2;
  const totalSlides = Math.ceil(enrolledCourses.length / 2);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const getVisibleCourses = () => {
    const startIndex = currentSlide * 2;
    return enrolledCourses.slice(startIndex, startIndex + 2);
  };

  return (
    <div className="bg-white p-6">
      {/* Status Cards */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 mt-[12px]">
        {cardData.map((card, index) => {
          const bgColors = ["bg-[#ECFDF3]", "bg-[#F9F5FF]", "bg-[#FEF3F2]"];
          const selectedBgColor =
            selectedCard === index
              ? "bg-[#D8F0FF]"
              : bgColors[index % bgColors.length];

          return (
            <div
              key={card.id}
              className={`flex justify-between items-center rounded-2xl cursor-pointer h-[150px] ${selectedBgColor}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="flex gap-4 p-6 w-fit">
                <div
                  className={`bg-[#F6F6F6] px-6 py-6 rounded-xl flex items-center justify-center ${
                    selectedCard === index
                      ? "bg-white text-[#0E68E7]"
                      : "px-4 bg-[#FFFFFF]"
                  }`}
                >
                  {card.icon}
                </div>
                <div>
                  <h1 className="text-[24px] font-semibold">{card.title}</h1>
                  <p className="text-sm text-[#4E5566] font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enrolled Courses Section */}
      {enrolledCourses.length > 0 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>

          {showCarousel ? (
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <Button
                  icon={<LeftOutlined />}
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="flex items-center justify-center w-10 h-10"
                />
                <div className="text-gray-500">
                  {currentSlide + 1} / {totalSlides}
                </div>
                <Button
                  icon={<RightOutlined />}
                  onClick={nextSlide}
                  disabled={currentSlide === totalSlides - 1}
                  className="flex items-center justify-center w-10 h-10"
                />
              </div>
              <div className="flex space-x-4 overflow-hidden">
                {getVisibleCourses().map((course, index) => (
                  <div key={course.id} className="w-1/2 px-2">
                    <CourseCard
                      course={course}
                      colors={
                        courseColors[
                          (currentSlide * 2 + index) % courseColors.length
                        ]
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Row gutter={16}>
              {enrolledCourses.map((course, index) => (
                <Col key={course.id} span={24 / enrolledCourses.length}>
                  <CourseCard
                    course={course}
                    colors={courseColors[index % courseColors.length]}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}

      {/* Display when no courses are enrolled */}
      {!enrolledCourseLoading && enrolledCourses.length === 0 && (
        <div className="my-8 p-8 text-center bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold">No courses enrolled yet</h3>
          <p className="text-gray-600 mt-2">
            Explore our courses and start learning today!
          </p>
          <Link href="/">
            <Button type="primary" className="mt-4">
              Browse Courses
            </Button>
          </Link>
        </div>
      )}

      <UserBarChart />
    </div>
  );
};

// Extracted CourseCard component for better reusability
const CourseCard = ({ course, colors }) => {
  const router = useRouter();
  const progressPercent = Math.round(course.progress);

  return (
    <Card
      className="w-full"
      style={{
        backgroundColor: colors.bg,
        borderRadius: "12px",
        padding: "20px",
        color: "#fff",
        marginBottom: "16px",
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div
        className="flex"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Progress
          type="circle"
          className="rounded-full"
          percent={progressPercent}
          width={250}
          strokeColor={{
            "0%": colors.progress,
            "100%": colors.progress,
          }}
          format={() => (
            <div>
              <strong className="text-[46px] font-bold text-white">
                {progressPercent}%
              </strong>
              <p
                className="font-semibold"
                style={{ fontSize: "22px", color: "#FFFFFF", margin: 5 }}
              >
                Completed
              </p>
            </div>
          )}
        />
        <div className="xl:pl-4">
          <div
            style={{
              textAlign: "right",
              color: "#D7CCC8",
              fontSize: "14px",
            }}
          >
            <div className="">
              <span className="py-4 rounded-full px-6 bg-white text-[#475467] text-[14px]">
                {course.completed_lectures}/{course.total_lectures}
              </span>
            </div>
          </div>
          <div className="pr-12" style={{ marginTop: "10px", color: "#fff" }}>
            <h3 className="text-white font-bold text-[34px]">
              {course.course_title}
            </h3>
            <p className="text-white text-xl font-semibold">
              Progress: {progressPercent}%
            </p>
          </div>
          <Button
            onClick={() =>
              router.push(
                `/UserDashboard/EnrolledCourses/EnroledCourseDetails/${course.course_id}`
              )
            }
            className="py-6 px-12 w-full mt-4"
            type="primary"
            style={{
              backgroundColor: "#fff",
              color: "#000000",
              fontWeight: "bold",
              display: "flex",
            }}
          >
            Continue <ArrowUp className="rotate-90" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Mycourses;
