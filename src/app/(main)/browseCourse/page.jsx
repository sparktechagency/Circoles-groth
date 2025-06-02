"use client";
import Image from "next/image";
import React, { useState } from "react";
import heroimg from "/public/images/browseheroimg.png";
import { Button, Dropdown, Menu, Input, Pagination } from "antd";
import { SearchOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import CourseCard from "../../../components/ui/CourseCard";
import { useGetAllCourseQuery } from "../../../redux/features/CourseApi";

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const per_page = 6;
  const { data, isLoading, isFetching } = useGetAllCourseQuery({
    per_page,
    page: currentPage,
  });

  // Group courses by category
  const coursesByCategory = {};
  if (data?.courses?.data) {
    data.courses.data.forEach((course) => {
      if (!coursesByCategory[course.category]) {
        coursesByCategory[course.category] = [];
      }
      coursesByCategory[course.category].push(course);
    });
  }

  const categoryMenu = (
    <Menu>
      {Object.keys(coursesByCategory).map((category, index) => (
        <Menu.Item key={index}>{category}</Menu.Item>
      ))}
    </Menu>
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {/* Hero section with image and search bar and category dropdown */}
      <div
        style={{ backgroundImage: `url(${heroimg.src})` }}
        className="w-full min-h-[407px] bg-cover py-6"
      >
        <div className="lg:pt-28 md:pt-28 py-12 px-6">
          <div className="flex s-mobile:py-6 l-mobile:flex-wrap m-mobile:flex-wrap s-mobile:flex-wrap items-center justify-between max-w-2xl mx-auto ">
            <div className=" lg:my-8 md:my-8 my-2 ">
              <div className="xl:flex lg:flex flex-wrap items-center space-x-2 pr-4 s-mobile:pr-[8px] pl-4 s-mobile:pl-[8px]  xl:border-r-2 lg:border-r-2 md:border-r-2 border-white">
                <h1 className="text-white lg:text-4xl md:text-4xl text-2xl font-bold">
                  16K
                </h1>
                <span className=" text-white lg:text-[24px] md:text-[24px] text-sm font-normal">
                  instractors
                </span>
              </div>
            </div>
            <div className=" lg:my-8 md:my-8 my-2 ">
              <div className="xl:flex lg:flex flex-wrap items-center space-x-2 pr-4 s-mobile:pr-[8px]  s-mobile:pl-[2px] xl:border-r-2 lg:border-r-2 md:border-r-2  border-white">
                <h1 className="text-white lg:text-4xl md:text-4xl text-2xl font-bold">
                  120k
                </h1>
                <span className=" text-white lg:text-[24px] md:text-[24px] text-sm font-normal">
                  Graduates
                </span>
              </div>
            </div>
            <div className=" lg:my-8 md:my-8 my-2 ">
              <div className="xl:flex lg:flex flex-wrap items-center space-x-2  ">
                <h1 className="text-white lg:text-4xl md:text-4xl text-2xl font-bold">
                  150k
                </h1>
                <span className=" text-white lg:text-[24px] md:text-[24px] text-sm font-normal">
                  Members
                </span>
              </div>
            </div>
          </div>
          <div className=" w-full max-w-3xl  mx-auto flex items-center space-x-2">
            <Input
              placeholder="Search for course"
              className="w-full h-[57px] text-[#667085] text-[16px] px-4"
              prefix={<SearchOutlined size={15} className="text-[#667085]" />}
              suffix={
                <div>
                  <div className="border-l-2  text-[#1D2939] font-normal border-[#D0D5DD]">
                    <Dropdown
                      className="border-none"
                      overlay={categoryMenu}
                      trigger={["hover"]}
                    >
                      <Button className="text-lg">
                        Category <DownOutlined className="text-lg" />{" "}
                      </Button>
                    </Dropdown>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
      {/* End of Hero section */}

      <div className="container mx-auto px-4">
        {/* Render courses by category */}
        {Object.entries(coursesByCategory).map(([category, courses]) => (
          <React.Fragment key={category}>
            <div className="flex justify-between pb-[32px] pt-[82px]">
              <h1 className="lg:text-[36px] md:text-[28px] text-18px font-normal leading-none text-2xl text-[#101828] font-Merriweather text-start italic">
                {category}
              </h1>
              <div>
                <Link
                  className="font-bold border-b-2 pb-0 border-[#1D2939] text-[#000000]"
                  href={`/browseCourse/category/${encodeURIComponent(
                    category
                  )}`}
                >
                  View all <RightOutlined className="font-bold pl-1" />{" "}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4 pb-[82px]">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  courseimage={course.thumbnail}
                  courseTitle={course.title}
                  instructor="Instructor Name"
                  rating={course.rating || 0}
                  price={`€ ${course.price}`}
                  reviews={course.total_reviews}
                  duration={`${course.duration} Hours`}
                  students={0}
                  enrollLink={course.slug}
                />
              ))}
            </div>
          </React.Fragment>
        ))}

        {/* Pagination controls */}
        <div className="flex justify-center my-8">
          <Pagination
            current={currentPage}
            total={data?.courses?.total || 0}
            pageSize={per_page}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
            disabled={isFetching}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
