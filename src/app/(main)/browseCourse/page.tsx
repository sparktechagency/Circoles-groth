"use client";
import React, { useState, useEffect } from "react";
import heroimg from "/public/images/browseheroimg.png";
import { Input, Pagination, Empty } from "antd";
import { SearchOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import CourseCard from "../../../components/ui/CourseCard";
import { useGetallOnlineProgamsQuery } from "../../../redux/features/CourseApi";
import { useDebounce } from "use-debounce";

interface Course {
  id: string;
  title: string;
  category: string;
  category_id: string;
  thumbnail: string;
  price: number;
  duration: string;
  rating?: number;
  total_reviews?: number;
  slug: string;
  instructor_name?: string;
  total_students?: number;
}

interface ApiResponse {
  courses: {
    data: Course[];
    total: number;
  };
}

const BrowseCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const per_page = 6;

  const { data, isLoading, isFetching, error } = useGetallOnlineProgamsQuery({
    per_page,
    page: currentPage,
    search: debouncedQuery,
  });

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  // Group courses by category
  const coursesByCategory: Record<string, Course[]> = {};

  if (data?.courses?.data) {
    data.courses.data.forEach((course) => {
      const key = `${course.category}-${course.category_id}`;
      if (!coursesByCategory[key]) {
        coursesByCategory[key] = [];
      }
      coursesByCategory[key].push(course);
    });
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-lg">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Empty
        style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        description={
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-700">
              No courses found
            </h3>
            <p className="text-gray-500 mt-2">
              {searchQuery
                ? "Try a different search term"
                : "No courses available at the moment"}
            </p>
          </div>
        }
      />
    );
  }

  return (
    <div>
      {/* Hero section - Search will not reload page now */}
      <div
        style={{ backgroundImage: `url(${heroimg.src})` }}
        className="w-full min-h-[407px] bg-cover bg-center py-6"
        role="img"
        aria-label="Course browsing hero image"
      >
        <div className="lg:pt-28 md:pt-28 py-12 px-6">
          <div className="w-full max-w-3xl mx-auto">
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              onPressEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              placeholder="Search for courses..."
              className="w-full h-[57px] text-[#667085] text-[16px] px-4"
              prefix={<SearchOutlined className="text-[#667085]" />}
              aria-label="Search courses"
              allowClear
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {data?.courses?.data?.length ? (
          Object.entries(coursesByCategory).map(([key, courses]) => {
            const [category, category_id] = key.split("-");

            return (
              <React.Fragment key={key}>
                <div className="flex justify-between pb-[32px] pt-[82px]">
                  <h2 className="lg:text-[36px] md:text-[28px] text-2xl font-normal text-[#101828] font-Merriweather text-start italic">
                    {category}
                  </h2>
                  <div>
                    <Link
                      className="font-bold border-b-2 pb-0 border-[#1D2939] text-[#000000] hover:text-[#1D2939] transition-colors"
                      href={`/browseCourse/category/${encodeURIComponent(
                        category
                      )}/${encodeURIComponent(category_id)}`}
                      passHref
                    >
                      View all <RightOutlined className="font-bold pl-1" />
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-6 pb-[82px]">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      courseimage={course.thumbnail}
                      courseTitle={course.title}
                      rating={course.rating || 0}
                      price={`€ ${course.price.toLocaleString()}`}
                      reviews={course.total_reviews || 0}
                      duration={`${course.duration} Hours`}
                      students={course.total_students || 0}
                      enrollLink={course.slug}
                    />
                  ))}
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div className="flex justify-center items-center py-28">
            <Empty
              description={
                <div className="text-center">
                  <h3 className="text-xl font-medium text-gray-700">
                    No courses found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    {searchQuery
                      ? "Try a different search term"
                      : "No courses available at the moment"}
                  </p>
                </div>
              }
            />
          </div>
        )}

        {data?.courses?.total > per_page && (
          <div className="flex justify-center my-8">
            <Pagination
              current={currentPage}
              total={data?.courses?.total || 0}
              pageSize={per_page}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper
              disabled={isFetching}
              className="ant-pagination-custom"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCoursesPage;