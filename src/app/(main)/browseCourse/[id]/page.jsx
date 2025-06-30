"use client";
import { Card, Avatar, Button, Rate, Spin } from "antd";
import { message } from "antd";
import React, { useState } from "react";
import instactor from "./Instructor.png";
import instactor2 from "./Instructor2.png";
import student from "./Instructor.png";
import Image from "next/image";
import { Collapse } from "antd";
import {
  ClockCircleOutlined,
  PlayCircleOutlined,
  RocketOutlined,
  MobileOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  CheckOutlined,
  FolderOutlined,
  FileOutlined,
  ArrowUpOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import ReviewCard from "../../../../components/ui/ReviewCard";
import Link from "next/link";
import CourseCard from "../../../../components/ui/CourseCard";
import { useRouter } from "next/navigation";
import {
  useGetCourseDetailsQuery,
  usePurchaseCourseMutation,
} from "../../../../redux/features/CourseApi";
import SkeletonLoader from "../../../../components/SkeletonLoader";
import Cookies from "js-cookie";

const Page = ({ params }) => {
  const token = Cookies.get("token");
  const { id } = params;
  const { data: courseData, isLoading, isError } = useGetCourseDetailsQuery(id);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { Panel } = Collapse;
  const [messageApi, contextHolder] = message.useMessage();
  // const redirect_url = "http://localhost:3000/browseCourse/success";
  const [purchaseCourse, { isLoading: isPurchasing }] =
    usePurchaseCourseMutation();
  // console.log("courseData", courseData?.course?.full_program);

  const handlepurchase = async () => {
    const alldata = {
      course_id: id,
      redirect_url: process.env.NEXT_PUBLIC_BASE_URL,
    };
    const res = await purchaseCourse({ body: alldata }).unwrap();
    console.log("res", res);
    if (res?.error) {
      messageApi.open({
        type: "error",
        content: res?.error?.data?.message,
      });
    }
    if (res?.success) {
      router.push(`${res?.payment_url}`);
    }
  };

  if (isLoading) {
    return <SkeletonLoader rows={4} avatar />;
  }

  if (isError || !courseData?.success) {
    return (
      <div className="container mx-auto py-16 px-4">
        <p>Error loading course details. Please try again later.</p>
      </div>
    );
  }

  const course = courseData.course;

  console.log("fullprogram", course.full_program);
  return (
    <div>
      {contextHolder}
      <div className="mb-10">
        {/* Hero Section */}
        <div className="xl:bg-[#1D2939] lg:bg-[#1D2939] bg-transparent">
          <div className="container mx-auto flex gap-4 relative py-6 lg:px-6 px-2">
            {/* Left Side Content */}
            <div className="xl:max-w-2xl lg:max-w-xl w-full space-y-3 xl:block lg:block hidden">
              <h1 className="text-white text-2xl font-bold font-Merriweather">
                {course.title}
              </h1>
              <div className="flex items-start justify-start mb-2">
                <span className="text-yellow-500 text-sm flex items-center justify-center">
                  <Rate
                    className="text-xl"
                    allowHalf
                    disabled
                    count={1}
                    defaultValue={course.rating}
                  />{" "}
                  <span className="text-[#FFFFFF] font-bold text-[14px]">
                    {course.rating}
                  </span>
                </span>
                <span className="text-[#FFFFFF] font-normal text-sm ml-2 pt-1">
                  ({course.total_reviews})
                </span>
              </div>
              <p className="text-[#D0D5DD] text-sm font-normal pb-4">
                {course.description}
              </p>

              <div className="bg-[#344054] p-6 rounded-sm">
                <div className="flex items-center justify-start gap-16 px-2 pt-4">
                  <div>
                    <ul className="list-none text-[#E4E7EC] text-sm space-y-4">
                      <li className="flex items-center space-x-2">
                        <ClockCircleOutlined />
                        <span>{course.duration} Hours</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckSquareOutlined />
                        <span>Quiz</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <MobileOutlined />
                        <span>Access on Mobile & TV</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CalendarOutlined />
                        <span>Last updated on {course.last_updated}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="xl:max-w-2xl lg:max-w-sm mx-auto bg-white border-2 border-[#dee0e2] rounded-lg xl:fixed lg:fixed block xl:right-[9%] lg:right-[1%] max-[1440]:fixed max-[1024]:right-[6px] max-[1440]:fixed max-[1440]:right-[0%] lg:shadow-lg z-50 mb-8 w-[465px] max-h-screen">
              <div className="relative border border-white rounded-lg">
                {course.trailer_video.includes("youtube.com") ||
                course.trailer_video.includes("youtu.be") ? (
                  <iframe
                    className="rounded-lg w-full h-64"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      course.trailer_video
                    )}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    className="rounded-lg w-full h-64"
                    autoPlay
                    loop
                    controls
                    playsInline
                    src={course.trailer_video}
                  ></video>
                )}

                <p className="absolute bottom-2 left-1/3 mt-2 ml-2 bg-opacity-70 text-sm font-bold text-[#FCFCFD]">
                  Preview this course
                </p>
              </div>

              <div className="xl:mt-1 mt-1 p-4">
                <div className="flex items-center space-x-2">
                  <Avatar.Group maxCount={5}>
                    {Array.from({
                      length: Math.min(10, course.total_enrollment),
                    }).map((_, i) => (
                      <Avatar key={i} src={student.src} />
                    ))}
                  </Avatar.Group>
                  <span className="text-[#263238] text-[12px] font-normal">
                    <span className="text-[#0C2A56] font-semibold">
                      + {Math.max(0, course.total_enrollment - 5)}
                    </span>{" "}
                    Students enrolled the course
                  </span>
                </div>

                <div className="flex items-center justify-between xl:py-4">
                  <h3 className="text-2xl font-bold mt-2">€{course.price}</h3>
                  <span className="bg-[#F2F4F7] h-[44px] px-4 text-[#344054] font-semibold rounded-sm flex items-center justify-center py-1 text-xs">
                    {course.c_level}
                  </span>
                </div>

                <div className="text-[#1D2939]">
                  <p>
                    <strong className="text-sm font-semibold">
                      Whom this course is for:
                    </strong>
                  </p>
                  <ul className="list-disc list-inside text-sm text-[#475467] space-y-1 py-2 pb-8">
                    {course.targer_audience.map((audience, index) => (
                      <li key={index}>{audience}</li>
                    ))}
                  </ul>
                </div>

                <Button
                  loading={isPurchasing}
                  disabled={isPurchasing || !token}
                  type="primary"
                  size="large"
                  block
                  style={{ backgroundColor: "#14698A" }}
                  className="px-6 bg-primary"
                  onClick={handlepurchase}
                >
                  €{course.price} ENROLL NOW
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto lg:px-6 px-2">
          {/* You'll Learn Section */}
          <div className="border border-[#D9D9D9] rounded-lg my-12 p-6 xl:max-w-2xl lg:max-w-xl w-full">
            <h1 className="text-3xl font-bold mb-8">You'll learn</h1>
            <div>
              <ul className="list-none lg:text-lg md:text-lg text-sm text-[#475467] font-normal space-y-[20px] py-2 pb-8">
                {course.teach_course.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-start gap-2"
                  >
                    <CheckOutlined />
                    <li>{item}</li>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          {/* Course Curriculum Section */}
          <div className="xl:max-w-2xl lg:max-w-xl w-full my-12 border border-[#D9D9D9] rounded-lg p-4">
            <h1 className="text-3xl font-bold mb-8">Course Curriculum</h1>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-between lg:gap-6 md:gap-6 gap-1">
                <div className="text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <FolderOutlined className="text-xl text-[#4E5566]" />
                  {course.total_section} Sections
                </div>
                <div className="text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <PlayCircleOutlined className="text-xl text-[#4E5566]" />
                  {course.total_lecture} lectures
                </div>
                <div className="text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <ClockCircleOutlined className="text-xl text-[#4E5566]" />
                  {course.duration}h
                </div>
              </div>
            </div>

            <div className="mx-auto bg-[#F2F4F7] rounded-md lg:p-4 md:p-4 p-0 border-none">
              <Collapse
                defaultActiveKey={["1"]}
                accordion
                expandIconPosition="right"
                className="bg-[#F2F4F7] rounded-lg border-none"
              >
                {course.curriculum.map((section, sectionIndex) => (
                  <Panel
                    key={section.id}
                    header={
                      <div className="">
                        <div className="text-lg font-semibold text-[#475467]">
                          {section.section_name}
                        </div>
                        <div className="text-xs text-[#98A2B3] font-normal">
                          {section.lectures.length} Lectures •{" "}
                          {Math.floor(course.duration / course.total_section)}{" "}
                          Hours
                        </div>
                      </div>
                    }
                    className="mb-2 bg-transparent"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <div className="space-y-3 cursor-pointer">
                      {section.lectures.map((lecture) => (
                        <div
                          key={lecture.id}
                          className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-4"
                        >
                          <div className="flex items-center">
                            <div className="bg-[#F2F4F7] text-[#475467] w-10 h-10 rounded-lg flex items-center justify-center mr-4 font-bold">
                              {lecture.id}
                            </div>
                            <div>
                              <p className="font-semibold text-[#475467] text-[16px]">
                                {lecture.title}
                              </p>
                              <p className="text-sm text-[#98A2B3]">
                                {lecture.description}
                              </p>
                            </div>
                          </div>
                          <div>
                            <PlayCircleOutlined className="text-[#14698A] text-2xl" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </div>
          </div>

          {/* Course Rating and Reviews */}
          <div className="lg:mt-28 md:mt-24 xl:max-w-2xl lg:max-w-xl w-full">
            <h1 className="text-3xl font-bold mb-8 text-[#1D2939] font-Merriweather">
              <Rate
                className="text-4xl text-[#FDB022]"
                count={1}
                defaultValue={course.rating}
              />
              <span className="px-4">{course.rating}</span> Course Rating{" "}
              <span className="text-lg text-[#475467] font-Inter">
                ({course.total_reviews} students reviewed)
              </span>
            </h1>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 mt-10">
              {course.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {/* <Link
              href={"#"}
              className="inline-flex items-center text-[#475467] border-b-2 border-[#475467] mt-8 text-[16px] font-semibold"
            >
              Show all reviews
              <ArrowUpOutlined className="rotate-45 text-xl pl-2" />
            </Link> */}
          </div>

          {/* Instructor Section */}
          {/* <div className="lg:mt-28 md:mt-24 mt-12 xl:max-w-2xl lg:max-w-xl w-full">
            <h1 className="text-3xl font-bold mb-8 text-[#1D2939] font-Merriweather">
              Instructor
            </h1>
            <div className="flex items-center justify-start px-2 mb-9">
              <Image
                height={56}
                width={56}
                src={instactor}
                alt="instructor"
                className="rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold border-b-2 text-[#1D2939] border-[#1D2939] w-fit">
                  Instructor Name
                </h3>
                <p className="text-[#475467] text-[16px] font-normal">
                  Head of Product Management
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start justify-start mb-2">
                <span className="text-yellow-500 text-sm flex items-center justify-center">
                  <Rate
                    className="text-2xl pr-2"
                    allowHalf
                    count={1}
                    defaultValue={4.5}
                  />{" "}
                  <span className="text-[#475467] font-bold text-[18px]">
                    4.5
                  </span>
                </span>
                <span className="text-[#475467] font-normal text-lg ml-2 pt-1">
                  (8,250 <span className="text-[#0E68E7]">Reviews</span>)
                </span>
              </div>
              <div className="flex items-start justify-start mb-2">
                <span className="text-[#475467] text-sm flex items-center justify-center">
                  <UsergroupAddOutlined className="text-2xl pr-2" />
                </span>
                <span className="text-[#475467] font-normal text-lg ml-2 pt-1">
                  {course.total_enrollment} Students
                </span>
              </div>
              <div className="flex items-start justify-start mb-2">
                <span className="text-[#475467] text-sm flex items-center justify-center">
                  <PlayCircleOutlined className="text-2xl pr-2" />
                </span>
                <span className="text-[#475467] font-normal text-lg ml-2">
                  254 Courses
                </span>
              </div>
            </div>
          </div> */}

          {/* About Section */}
          {/* <div className="bg-white my-12 xl:max-w-2xl lg:max-w-xl w-full relative">
            <h2 className="text-lg font-semibold text-[#475467] mb-4">About</h2>
            <div
              className={`relative ${
                !isExpanded ? "max-h-40 overflow-hidden" : ""
              }`}
            >
              <p className="text-[#475467] mb-4">{course.description}</p>
              <p className="text-[#475467]">{course.subtitle}</p>

              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white to-transparent pointer-events-none"></div>
              )}
            </div>

            <button
              className="text-blue-500 mt-4"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          </div> */}

          {/* Other Courses Section */}
          <div className="bg-white lg:mt-32 md:mt-28 mt-12 xl:max-w-2xl lg:max-w-xl w-full">
            <div className="max-w-lg p-6 bg-gray-100 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold mb-6 text-gray-900 font-Merriweather">
                Checkout Full Program
              </h1>
              <div className="bg-primary p-6 text-white rounded-lg shadow-lg">
                <ul className="space-y-3">
                  {course?.full_program?.map((item) => (
                    <li className="flex items-center gap-2">
                      ✅{" "}
                      <span className="text-lg">
                        <Link href={`/browseCourse/category/${item?.title}`}>
                          {item?.title}
                        </Link>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
