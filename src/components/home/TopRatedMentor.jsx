"use client";

import { Breadcrumb, Tabs, Spin, Button } from "antd";
import React, { useState } from "react";
import { useGetcategorysQuery } from "../../redux/features/CourseApi";
import { useTopRatedTutorsQuery } from "../../redux/features/TutorApi";
import TopratedTutorCard from "../ui/TopratedTutorCard";
const TopRatedMentor = () => {
  const [page, setPage] = useState(1);
  const per_page = 6;
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch tutors with pagination
  const {
    data: tutorsData,
    isLoading: tutorsLoading,
    error: tutorsError,
  } = useTopRatedTutorsQuery({
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

  // Filter tutors by expertise area (category)
  const filteredTutors =
    activeCategory === "all"
      ? tutorsData?.tutors?.data || []
      : tutorsData?.tutors?.data?.filter(
          (tutor) => tutor.expertise_area === activeCategory
        ) || [];

  // Prepare categories for tabs
  const categories = [
    { id: "all", name: "All Tutors" },
    ...(categoriesData?.categories?.map((category) => ({
      id: category.name, // Using category name as it matches expertise_area
      name: category.name,
    })) || []),
  ];

  if (tutorsLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spin size="large" />
      </div>
    );
  }

  if (tutorsError) {
    return (
      <div className="container mx-auto py-16 px-4">
        <p>Error loading tutors. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center py-8">
        <Breadcrumb items={[{ title: "Home" }, { title: "Top Rated Tutor" }]} />
      </div>

      <div className="container mx-auto py-16 px-4">
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
              {/* Tutor cards for each category */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4">
                {filteredTutors.length > 0 ? (
                  filteredTutors.map((tutor) => (
                    <TopratedTutorCard
                      key={tutor.id}
                      tutorImage="/images/tutor.png" // Default image
                      tutorName={tutor.name}
                      expertise={tutor.expertise_area}
                      rating={tutor.avg_rating}
                      sessionCharge={tutor.session_charge}
                      reviews={tutor.total_reviews}
                      profileLink={`/browseCourse/instructor/${tutor.id}`}
                    />
                  ))
                ) : (
                  <p className="col-span-3 text-center py-8">
                    No tutors available in this category
                  </p>
                )}
              </div>

              {/* Pagination controls */}
              {activeCategory === "all" &&
                tutorsData?.tutors?.last_page > 1 && (
                  <div className="flex justify-center mt-8 gap-4">
                    <Button
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center">
                      Page {page} of {tutorsData?.tutors?.last_page}
                    </span>
                    <Button
                      disabled={page === tutorsData?.tutors?.last_page}
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
    </div>
  );
};

export default TopRatedMentor;
