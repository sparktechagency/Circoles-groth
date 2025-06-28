"use client";
import { Tabs, Pagination, Spin } from "antd";
import MycourseCard from "../../../../components/dashboard/userDashboard/MyCourseCard";
import MyProgramCard from "../../../../components/ui/MyProgramCard";
import {
  useEnrolledCourseProgressQuery,
  useEnrolledCoursesQuery,
} from "../../../../redux/features/userDashboard/UserDashboardApi";
import { useState } from "react";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: enrolledCourseData, isLoading } = useEnrolledCoursesQuery({
    page: currentPage,
    per_page: pageSize,
  });

  const enrolled = enrolledCourseData?.success || false;
  const totalCourses = enrolledCourseData?.courses?.total || 0;
  const courses = enrolledCourseData?.courses?.data || [];

  console.log("enrolledCourseData", courses);

  const onChange = (key) => {
    console.log(key);
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const items = [
    {
      key: "1",
      label: "My Courses",
      children: (
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4">
                {courses.map((item) => (
                  <MycourseCard
                    courseimage={item?.thumbnail}
                    courseTitle={item?.title}
                    rating={item?.rating}
                    reviews={item?.total_reviews}
                    duration={item?.duration}
                    enrollLink={item?.id}
                    progress={item?.progress}
                    language={item?.language}
                  />
                ))}
              </div>
              {totalCourses > pageSize && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalCourses}
                    onChange={handlePageChange}
                    showSizeChanger={true}
                    pageSizeOptions={["10", "20", "50"]}
                  />
                </div>
              )}
            </>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "My Programs",
      children: (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4">
            <div className="col-span-full text-center py-8">
              <p className="text-lg">No programs enrolled yet</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen p-6">
      {enrolled ? (
        <Tabs
          className="text-xlf w-full"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-lg">No courses enrolled yet</p>
          <p className="text-gray-500 mt-2">
            Explore our courses and start learning today!
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
