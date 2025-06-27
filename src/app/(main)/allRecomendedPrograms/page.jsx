"use client";

import { Breadcrumb } from "antd";
import React, { useState } from "react";
import RecomendedPrograms from "../../../components/home/RecomendedPrograms";
import CourseReloade from "../../../components/ui/CourseReloade";
import { useGetallprogramsQuery } from "../../../redux/features/programsApi";
import SkeletonLoader from "../../../components/SkeletonLoader";
import ProgramCard from "../../../components/ui/ProgramCard";
const page = () => {
  const [page, setPage] = useState(1);
  const per_page = 6;

  // Fetch programs with pagination
  const {
    data: programsData,
    isLoading: programsLoading,
    error: programsError,
  } = useGetallprogramsQuery({
    per_page,
    page,
  });

  // Combine all programs from all categories
  const allPrograms =
    programsData?.categories?.data?.flatMap((category) =>
      category.courses.map((course) => ({
        ...course,
        categoryName: category.name,
        categoryTotalCourses: category.total_courses,
      }))
    ) || [];

  if (programsLoading) {
    return <SkeletonLoader rows={4} avatar />;
  }

  if (programsError) {
    return <CourseReloade name="Programs" />;
  }

  return (
    <div>
      <div className="flex items-center justify-center py-8">
        <Breadcrumb
          items={[
            {
              title: "Home",
            },
            {
              title: "TopRatedTutor",
            },
          ]}
        />
      </div>
      <div className="container mx-auto px-4 my-4">
        <h1 className="xl:text-[32px] lg:text-[32px] font-black leading-none text-2xl text-[#000000] font-Merriweather italic pb-8">
          All Recomended Programs
        </h1>
        {/* Program cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4">
          {allPrograms.length > 0 ? (
            allPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                categoryName={program.categoryName}
                totalCourses={program.categoryTotalCourses}
                courseimage={program.thumbnail}
                courseTitle={program.title}
                instructor="Instructor Name"
                rating={program.rating}
                price={program.price}
                reviews={program.total_reviews}
                duration={program.duration}
                students={0}
                enrollLink={program.id}
              />
            ))
          ) : (
            <p className="col-span-3 text-center py-8">No programs available</p>
          )}
        </div>

        {/* Pagination controls */}
        {programsData?.categories?.last_page > 2 && (
          <div className="flex justify-center mt-8 gap-4">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
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
      </div>
    </div>
  );
};

export default page;
