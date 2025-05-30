"use client";

import React, { useState } from "react";
import ProgramCard from "../ui/ProgramCard";
import { Button, Tabs, Spin } from "antd";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import { useGetcategorysQuery } from "../../redux/features/CourseApi";
import { useGetallprogramsQuery } from "../../redux/features/programsApi";

const RecomendedPrograms = () => {
  const [page, setPage] = useState(1);
  const per_page = 6;
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch programs with pagination
  const {
    data: programsData,
    isLoading: programsLoading,
    error: programsError,
  } = useGetallprogramsQuery({
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

  // Combine all programs from all categories for "All" tab
  const allPrograms =
    programsData?.categories?.data?.flatMap((category) => category.courses) ||
    [];

  // Filter programs by category
  const filteredPrograms =
    activeCategory === "all"
      ? allPrograms
      : programsData?.categories?.data?.find(
          (category) => category.id.toString() === activeCategory
        )?.courses || [];

  // Prepare categories for tabs
  const categories = [
    { id: "all", name: "All Programs" },
    ...(programsData?.categories?.data?.map((category) => ({
      id: category.id.toString(),
      name: category.name,
    })) || []),
  ];

  if (programsLoading || categoriesLoading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (programsError) {
    return (
      <div className="container mx-auto py-16 px-4">
        <p>Error loading programs. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="xl:text-[32px] lg:text-[32px] font-black leading-none text-2xl text-[#000000] font-Merriweather italic pb-8">
        Recommended Programs
      </h1>

      {/* Tabs for categories */}
      <Tabs
        defaultActiveKey="all"
        activeKey={activeCategory}
        onChange={handleTabChange}
        tabBarStyle={{ borderBottom: "none" }}
      >
        {categories.map((category) => (
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
            {/* Program cards for each category */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4">
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                  <ProgramCard
                    key={program.id}
                    courseimage={program.thumbnail}
                    courseTitle={program.title}
                    instructor="Instructor Name" // Update with actual field if available
                    rating={program.rating}
                    price={program.price}
                    reviews={program.total_reviews}
                    duration={program.duration}
                    students={0} // Update with actual field if available
                    enrollLink={`/programs/${program.slug}`}
                  />
                ))
              ) : (
                <p className="col-span-3 text-center py-8">
                  No programs available in this category
                </p>
              )}
            </div>

            {/* Pagination controls */}
            {activeCategory === "all" &&
              programsData?.categories?.last_page > 1 && (
                <div className="flex justify-center mt-8 gap-4">
                  <Button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center">
                    Page {page} of {programsData?.categories?.last_page}
                  </span>
                  <Button
                    disabled={page === programsData?.categories?.last_page}
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
          href="/allRecomendedPrograms"
        >
          View all <RightOutlined className="font-bold pl-1" />
        </Link>
      </div>
    </div>
  );
};

export default RecomendedPrograms;
