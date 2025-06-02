"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import heroimg from "/public/images/browseheroimg.png";
import {
  Breadcrumb,
  Button,
  Dropdown,
  Input,
  Menu,
  Pagination,
  Spin,
} from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import CourseCard from "../../../../components/ui/CourseCard";
import { useGetAllCourseByCategoryQuery } from "../../../../redux/features/CourseApi";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const per_page = 8;
  const { slug } = useParams();

  // Extract category and category_id from slug
  let category = "";
  let category_id = "";
  if (Array.isArray(slug)) {
    [, category, category_id] = slug;
  }

  const {
    data: courseData,
    isLoading,
    isFetching,
  } = useGetAllCourseByCategoryQuery({
    page: currentPage,
    per_page,
    id: category_id,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-center py-8">
        <Breadcrumb
          items={[
            { title: "Home" },
            { title: "Online programs" },
            { title: category },
          ]}
        />
      </div>

      {/* Category Title */}
      <div className="container mx-auto">
        <h1 className="py-12 text-2xl font-normal italic">{category}</h1>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4 pb-12">
          {courseData?.courses?.data?.map((course) => (
            <CourseCard
              key={course.id}
              courseimage={course.thumbnail}
              courseTitle={course.title}
              instructor={course.instructor || "Expert Instructor"} // Fallback if no instructor
              rating={course.rating || 0} // Default to 0 if no rating
              price={`€ ${course.price}`}
              reviews={course.total_reviews}
              duration={`${course.duration} Hours`}
              students={course.total_enrollment || 0}
              enrollLink={`/course/${course.slug}`} // Updated to use course slug
              subtitle={course.subtitle}
              level={course.c_level}
            />
          ))}
        </div>

        {/* Pagination */}
        {courseData?.courses?.last_page > 1 && (
          <div className="flex justify-center my-8">
            <Pagination
              current={currentPage}
              total={courseData?.courses?.total || 0}
              pageSize={per_page}
              onChange={handlePageChange}
              showSizeChanger={false}
              disabled={isFetching}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
