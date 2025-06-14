"use client";
import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ManageCourseCard from "../../../../components/ui/ManageCourseCard";
import {
  useDeleteCourseMutation,
  useManageallCourseQuery,
} from "../../../../redux/features/adminapis/AdminApi";

const { Option } = Select;

const MycourseCard = () => {
  const [page, setPage] = useState(1);
  const per_page = 6;
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [ratingFilter, setRatingFilter] = useState("");
  const [allCourses, setAllCourses] = useState([]);

  const {
    data: coursesData,
    isLoading: coursesLoading,
    error: coursesError,
  } = useManageallCourseQuery({
    per_page,
    page,
    search: "",
    sort: sortBy,
    rating: ratingFilter,
  });

  // Store all courses when data is loaded
  useEffect(() => {
    if (coursesData?.courses?.data) {
      setAllCourses(coursesData.courses.data);
    }
  }, [coursesData]);

  // Extract categories from courses data
  const categories = allCourses.reduce((acc, course) => {
    if (!acc.includes(course.category)) {
      acc.push(course.category);
    }
    return acc;
  }, []);

  // Filter courses based on multiple criteria
  const filteredCourses = allCourses.filter((course) => {
    // Search filter
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      activeCategory === "all" || course.category === activeCategory;

    // Rating filter
    const matchesRating =
      !ratingFilter ||
      (ratingFilter === "5" && course.rating >= 5) ||
      (ratingFilter === "4" && course.rating >= 4) ||
      (ratingFilter === "3" && course.rating >= 3);

    return matchesSearch && matchesCategory && matchesRating;
  });

  // Sort courses based on selected option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "latest") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "oldest") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else if (sortBy === "popular") {
      return (b.total_reviews || 0) - (a.total_reviews || 0);
    }
    return 0;
  });

  if (coursesLoading) return <div>Loading...</div>;
  if (coursesError) return <div>Error loading courses</div>;

  return (
    <div className="p-4 bg-white">
      {/* Search Input */}

      {/* Dropdowns for Sort By, Category, and Ratings */}
      <div className="flex flex-wrap justify-between space-x-4">
        <div className="mb-4">
          <p className="text-[16px] font-medium text-[#344054] pb-2">Search</p>
          <Input
            className="text-[#D0D5DD] border-[1px] border-[#D0D5DD] rounded-[4px] w-[300px] h-[40px] bg-white"
            placeholder="Search your courses..."
            prefix={<SearchOutlined style={{ color: "#D0D5DD" }} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <p className="text-[16px] font-medium text-[#344054] pb-2">Sort by</p>
          <Select
            defaultValue="latest"
            className="text-[#D0D5DD] border-[1px] border-[#D0D5DD] rounded-[4px] w-[300px] h-[40px] bg-white"
            style={{ borderColor: "#D0D5DD" }}
            onChange={(value) => setSortBy(value)}
          >
            <Option value="latest">Newest</Option>
            <Option value="oldest">Oldest</Option>
            <Option value="popular">Most Popular</Option>
          </Select>
        </div>

        <div>
          <p className="text-[16px] font-medium text-[#344054] pb-2">
            Category
          </p>
          <Select
            defaultValue="all"
            className="text-[#D0D5DD] border-[1px] border-[#D0D5DD] rounded-[4px] w-[300px] h-[40px] bg-white"
            style={{ borderColor: "#D0D5DD" }}
            onChange={(value) => setActiveCategory(value)}
          >
            <Option value="all">All Categories</Option>
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <p className="text-[16px] font-medium text-[#344054] pb-2">Ratings</p>
          <Select
            defaultValue=""
            className="text-[#D0D5DD] border-[1px] border-[#D0D5DD] rounded-[4px] w-[300px] h-[40px] bg-white"
            style={{ borderColor: "#D0D5DD" }}
            onChange={(value) => setRatingFilter(value)}
          >
            <Option value="">All Ratings</Option>
            <Option value="5">5 Stars</Option>
            <Option value="4">4 Stars & Up</Option>
            <Option value="3">3 Stars & Up</Option>
          </Select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 gap-4 py-6">
        {sortedCourses.map((course) => (
          <ManageCourseCard
            key={course.id}
            courseimage={course.thumbnail}
            courseTitle={course.title}
            instructor="Instructor Name"
            rating={course.rating}
            price={course.price}
            reviews={course.total_reviews}
            duration={course.duration}
            students={0}
            id={course.id}
            language={course.language}
            category={course.category}
          />
        ))}
      </div>

      {/* Pagination - Note: Now using frontend filtering, you might want to adjust pagination */}
      {coursesData?.courses?.last_page > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {coursesData?.courses?.last_page}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === coursesData?.courses?.last_page}
            className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MycourseCard;
