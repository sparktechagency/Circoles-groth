"use client";

import { Breadcrumb, Tabs, Button } from "antd";
import React, { useState } from "react";
import { useTopRatedTutorsQuery } from "../../redux/features/TutorApi";
import TopratedTutorCard from "../ui/TopratedTutorCard";
import SkeletonLoader from "../SkeletonLoader";
import CourseReloade from "../ui/CourseReloade";

const TopRatedMentor = () => {
  const [page, setPage] = useState(1);
  const per_page = 6;
  const [activeCategory, setActiveCategory] = useState("all");

  const {
    data: tutorsResponse = { tutors: { data: [], total: 0, last_page: 1 } },
    isLoading: tutorsLoading,
    error: tutorsError,
  } = useTopRatedTutorsQuery({ per_page, page });

  const tutorsData = tutorsResponse?.tutors?.data || [];
  const totalTutors = tutorsResponse?.tutors?.total || 0;
  const lastPage = tutorsResponse?.tutors?.last_page || 1;

  // Get unique subjects from all tutors
  const getUniqueSubjects = () => {
    const subjects = new Set(["all"]);
    tutorsData.forEach((tutor) => {
      tutor.subjects?.forEach((subject) => subjects.add(subject));
    });
    return Array.from(subjects).map((subject) => ({
      id: subject,
      name: subject === "all" ? "All Tutors" : subject,
    }));
  };

  const categories = getUniqueSubjects();

  // Filter tutors by active category
  const filteredTutors =
    activeCategory === "all"
      ? tutorsData
      : tutorsData.filter((tutor) => tutor.subjects?.includes(activeCategory));

  const handleTabChange = (key) => {
    setActiveCategory(key);
    setPage(1);
  };

  if (tutorsLoading) {
    return <SkeletonLoader rows={4} avatar />;
  }

  if (tutorsError) {
    return <CourseReloade name="tutors" />;
  }

  return (
    <div className="container mx-auto py-16 px-4">
      {/* <Breadcrumb
        items={[{ title: "Home" }, { title: "Tutors" }, { title: "Top Rated" }]}
        className="mb-8"
      /> */}

      <h1 className="text-3xl font-bold mb-8">Top Rated Mentors</h1>

      <Tabs
        defaultActiveKey="all"
        activeKey={activeCategory}
        onChange={handleTabChange}
        tabBarStyle={{ borderBottom: "none" }}
        className="mb-8"
      >
        {categories.map((category) => (
          <Tabs.TabPane
            tab={
              <button
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category.id
                    ? "bg-[#D1F5FC] text-[#195671]"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            }
            key={category.id}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredTutors.length > 0 ? (
                filteredTutors.map((tutor) => (
                  <TopratedTutorCard
                    key={tutor.id}
                    tutorImage={tutor.avatar || "/default-avatar.png"}
                    tutorName={tutor.name}
                    expertise={tutor.expertise_area}
                    subjects={tutor.subjects?.join(", ")}
                    rating={tutor.avg_rating}
                    sessionCharge={tutor.session_charge}
                    reviews={tutor.total_reviews}
                    languages={tutor.languages?.join(", ")}
                    timezone={tutor.timezone}
                    profileLink={`/browseCourse/instructor/${tutor.id}`}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-lg text-gray-500">
                    No tutors found in this category
                  </p>
                </div>
              )}
            </div>

            {activeCategory === "all" && lastPage > 1 && (
              <div className="flex justify-center mt-8 gap-4 items-center">
                <Button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="flex items-center gap-2 "
                >
                  Previous
                </Button>
                <span className="mx-4">
                  Page {page} of {lastPage}
                </span>
                <Button
                  disabled={page === lastPage}
                  onClick={() => setPage(page + 1)}
                  className="flex items-center gap-2"
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

export default TopRatedMentor;
