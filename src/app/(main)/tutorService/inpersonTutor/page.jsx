"use client";

import { Breadcrumb, Button, Pagination, Tabs } from "antd";
import React, { useState } from "react";
import TopratedTutorCard from "../../../../components/ui/TopratedTutorCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useGetinpersonTutorQuery } from "../../../../redux/features/programsApi";
import SkeletonLoader from "../../../../components/SkeletonLoader";

const page = () => {
  const [page, setPage] = useState(1);
  const per_page = 9;
  const { data, isLoading } = useGetinpersonTutorQuery({ per_page, page });
  const [activeKey, setActiveKey] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const times = ["3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "6:00 PM"];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Extract unique categories from tutor data
  const getUniqueCategories = () => {
    if (!data?.tutors?.data) return ["All"];

    const categories = new Set(["All"]);
    data.tutors.data.forEach((tutor) => {
      // Add expertise area as a category
      if (tutor.expertise_area) categories.add(tutor.expertise_area);
      // Add all subjects as categories
      tutor.subjects?.forEach((subject) => categories.add(subject));
    });
    return Array.from(categories);
  };

  const categories = getUniqueCategories();

  // Filter tutors by category
  const filterTutorsByCategory = (category) => {
    if (!data?.tutors?.data) return [];
    if (category === "All") return data.tutors.data;
    return data.tutors.data.filter(
      (tutor) =>
        tutor.expertise_area === category ||
        (tutor.subjects && tutor.subjects.includes(category))
    );
  };

  // Handle tab change OR ACTIVE KEY
  const handleTabChange = (key) => {
    setActiveKey(key);
    setCurrentPage(1); // Reset to the first page when the category changes
  };

  // Calculate paginated data
  const getPaginatedData = (category) => {
    const filteredData = filterTutorsByCategory(category);
    return filteredData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  };

  if (isLoading) {
    return <SkeletonLoader />;
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
              title: "Tutor sevice",
            },
            {
              title: "In-person",
            },
          ]}
        />
      </div>

      <div className="container mx-auto py-16 px-4">
        <div className="flex items-end space-x-1">
          <h1 className="text-2xl font-bold">Available </h1>
          <strong className="font-normal text-[#667085] text-[16px] italic">
            ({data?.tutors?.total || 0} tutors)
          </strong>
        </div>

        {/* Tabs for categories */}
        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          onChange={handleTabChange}
          tabBarStyle={{
            borderBottom: "none",
          }}
        >
          {categories.map((category, index) => (
            <Tabs.TabPane
              tab={
                <button
                  className={`category-button ${
                    activeKey === String(index + 1) ? "active-tab" : ""
                  }`}
                >
                  {category}
                </button>
              }
              className="pt-8"
              key={index + 1}
            >
              {/* Tutor cards for each category */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4">
                {getPaginatedData(category).map((tutor) => (
                  <TopratedTutorCard
                    key={tutor.id}
                    tutorName={tutor.name}
                    tutorImage={tutor.avatar}
                    expertise={tutor.expertise_area}
                    subjects={tutor.subjects?.join(", ")}
                    sessionCharge={tutor.session_charge}
                    rating={tutor.avg_rating}
                    reviews={tutor.total_reviews}
                    availability={tutor.offline}
                    profileLink={`/browseCourse/instructor/${tutor.id}`}
                  />
                ))}
              </div>
            </Tabs.TabPane>
          ))}
        </Tabs>

        {/* Custom styles */}
        <div className="flex justify-center items-center gap-4 mt-8  p-6 w-full">
          <div className="flex justify-center items-center gap-4 w-full">
            <div className="text-center text-white mt-2">
              Page {currentPage} of{" "}
              {Math.ceil((data?.tutors?.data?.length || 0) / pageSize)}
            </div>
            <Pagination
              current={currentPage}
              total={data?.tutors?.data?.length || 0}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
              className="text-center"
              itemRender={(page, type) => {
                if (type === "prev") {
                  return (
                    <Button className="custom-icon">
                      <LeftOutlined
                        style={{ color: "#1890ff", fontSize: "16px" }}
                      />{" "}
                      <span>Previous</span>
                    </Button>
                  );
                }
                if (type === "next") {
                  return (
                    <Button className="custom-icon">
                      <span>Next</span>{" "}
                      <RightOutlined
                        style={{ color: "#1890ff", fontSize: "16px" }}
                      />
                    </Button>
                  );
                }
                return <button className="page-number">{page}</button>;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
