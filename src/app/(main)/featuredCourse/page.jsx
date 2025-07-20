"use client";

import React, { useState } from "react";

import { Button, Tabs, Spin } from "antd";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import {
  useGetAllCourseQuery,
  useGetcategorysQuery,
} from "../../../redux/features/CourseApi";
import CourseCard from "../../../components/ui/CourseCard";

const PopularCourses = () => {
  const [page, setPage] = useState(1);
  const per_page = 6; // Adjust as needed
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
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center">
        <Spin size="large" />
      </div>
    );
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
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category.id
                    ? "bg-sixth text-primary"
                    : "bg-gray-100 hover:bg-gray-200 hover:text-gray-400"
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
                  enrollLink={`/courses/${course.slug}`}
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
    </div>
  );
};

export default PopularCourses;
