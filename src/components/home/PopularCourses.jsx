"use client";

import React, { useState } from "react";
import CourseCard from "../ui/CourseCard";
import { Button, Tabs, Spin } from "antd";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import {
  useGetAllCourseQuery,
  useGetcategorysQuery,
} from "../../redux/features/CourseApi";
import SkeletonLoader from "../../components/SkeletonLoader";

const PopularCourses = () => {
  const [page, setPage] = useState(1);
  const per_page = 6;
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch courses with pagination
  const {
    data: coursesData,
    isLoading: coursesLoading,
    error: coursesError,
  } = useGetAllCourseQuery({
    per_page,
    page,
  });

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetcategorysQuery();

  // Handle tab change
  const handleTabChange = (key) => {
    setActiveCategory(key);
    setPage(1); // Reset to first page when changing category
  };

  // Filter courses by category (client-side filtering)
  const filteredCourses =
    activeCategory === "all"
      ? coursesData?.courses?.data || []
      : coursesData?.courses?.data?.filter(
          (course) => course.category === activeCategory
        ) || [];

  // Extract unique categories from courses
  const allCategories = [
    { id: "all", name: "All Categories" },
    ...(categoriesData?.categories || []),
  ];

  if (coursesLoading || categoriesLoading) {
    return <SkeletonLoader rows={4} avatar />;
  }

  if (coursesError) {
    return (
      <div className="container mx-auto py-16 px-4">
        <p>Error loading courses. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="xl:text-[32px] lg:text-[32px] font-black leading-none text-2xl text-[#000000] font-Merriweather italic pb-8">
        Featured Courses
      </h1>

      {/* Tabs for categories */}
      <Tabs
        defaultActiveKey="all"
        activeKey={activeCategory}
        onChange={handleTabChange}
        tabBarStyle={{ borderBottom: "none" }}
      >
        {allCategories.map((category) => (
          <Tabs.TabPane
            tab={
              <button
                className={`category-button ${
                  activeCategory === category.id ? "active-tab" : ""
                }`}
              >
                {category.name}
              </button>
            }
            className="pt-8"
            key={category.id}
          >
            {/* Course cards for each category */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  courseimage={course.thumbnail}
                  courseTitle={course.title}
                  instructor="Instructor Name" // Update with actual field if available
                  rating={course.rating}
                  price={course.price}
                  reviews={course.total_reviews}
                  duration={course.duration}
                  students={0} // Update with actual field if available
                  enrollLink={course.id}
                  category={course.category}
                />
              ))}
            </div>

            {/* Pagination controls */}
            {activeCategory === "all" &&
              coursesData?.courses?.last_page > 1 && (
                <div className="flex justify-center mt-8 gap-4">
                  <Button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center">
                    Page {page} of {coursesData?.courses?.last_page}
                  </span>
                  <Button
                    disabled={page === coursesData?.courses?.last_page}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
          </Tabs.TabPane>
        ))}
      </Tabs>

      <div className="flex justify-end mt-8">
        <Link
          className="font-bold border-b-2 pb-0 border-[#1D2939] text-[#000000]"
          href="/featuredCourse"
        >
          View all <RightOutlined className="font-bold pl-1" />
        </Link>
      </div>
    </div>
  );
};

export default PopularCourses;
