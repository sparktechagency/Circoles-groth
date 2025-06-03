"use client";

import { Breadcrumb, Tabs } from "antd";

import React, { useState } from "react";
import tutor from "/public/images/tutor.png";
import TopratedTutorCard from "../../../components/ui/TopratedTutorCard";
import TopRatedMentor from "../../../components/home/TopRatedMentor";

const page = () => {
  const [activeKey, setActiveKey] = useState("1");

  const course = [
    {
      id: 1,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Management Basic - Course",
      duration: "Physics Expert",
      students: 176,
      price: "€ 29.00",
      enrollLink: "ENROLL NOW",
      imageLink: tutor,
      category: `All courses`,
    },
    {
      id: 1,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Management Basic - Course",
      duration: "Physics Expert",
      students: 176,
      price: "€ 29.00",
      enrollLink: "ENROLL NOW",
      imageLink: tutor,
      category: `All courses`,
    },
    {
      id: 1,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Management Basic - Course",
      duration: "Physics Expert",
      students: 176,
      price: "€ 29.00",
      enrollLink: "ENROLL NOW",
      imageLink: tutor,
      category: `All courses`,
    },
    {
      id: 1,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Management Basic - Course",
      duration: "Physics Expert",
      students: 176,
      price: "€ 29.00",
      enrollLink: "ENROLL NOW",
      imageLink: tutor,
      category: `All courses`,
    },
    {
      id: 1,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Management Basic - Course",
      duration: "Physics Expert",
      students: 176,
      price: "€ 29.00",
      enrollLink: "ENROLL NOW",
      imageLink: tutor,
      category: `All courses`,
    },
    {
      id: 1,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Management Basic - Course",
      duration: "Physics Expert",
      students: 176,
      price: "€ 29.00",
      enrollLink: "ENROLL NOW",
      imageLink: tutor,
      category: `All courses`,
    },
    {
      id: 1,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Management Basic - Course",
      duration: "Physics Expert",
      students: 176,
      price: "€ 29.00",
      enrollLink: "ENROLL NOW",
      imageLink: tutor,
      category: `All courses`,
    },
    {
      id: 1,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Management Basic - Course",
      duration: "Physics Expert",
      students: 176,
      price: "€ 29.00",
      enrollLink: "ENROLL NOW",
      imageLink: tutor,
      category: `All courses`,
    },
    {
      id: 2,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Advanced Product Strategy - Course",
      duration: "Physics Expert",
      students: 150,
      price: "€ 35.00",
      enrollLink: "ENROLL NOW",
      imageLink: "https://i.ibb.co.com/xLN7bSQ/category2.png",
      category: `Graphic Design`,
    },
    {
      id: 3,
      instructor: "John Michael",
      rating: 4.6,
      reviews: 2987,
      courseTitle: "Product Roadmaps for Success",
      duration: "Physics Expert",
      students: 200,
      price: "€ 27.00",
      enrollLink: "ENROLL NOW",
      imageLink: "https://i.ibb.co.com/vPfYHr7/category1.png",
      category: `UI/UX Design`,
    },
    {
      id: 4,
      instructor: "John Michael",
      rating: 4.8,
      reviews: 3500,
      courseTitle: "Mastering Agile Product Management",
      duration: "Physics Expert",
      students: 250,
      price: "€ 40.00",
      enrollLink: "ENROLL NOW",
      imageLink: "https://i.ibb.co.com/xLN7bSQ/category2.png",
      category: `Programming`,
    },
    {
      id: 5,
      instructor: "John Michael",
      rating: 4.9,
      reviews: 3800,
      courseTitle: "Product Leadership for Managers",
      duration: "Physics Expert",
      students: 300,
      price: "€ 50.00",
      enrollLink: "ENROLL NOW",
      imageLink: tutor,
      category: `Artificial Intelligence`,
    },
    {
      id: 6,
      instructor: "John Michael",
      rating: 4.5,
      reviews: 2800,
      courseTitle: "Foundations of Product Development",
      duration: "Physics Expert",
      students: 180,
      price: "€ 25.00",
      enrollLink: "ENROLL NOW",
      imageLink: "https://i.ibb.co.com/vPfYHr7/category1.png",
      category: `Business Management`,
    },
    {
      id: 7,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Marketing Essentials",
      duration: "Physics Expert",
      students: 190,
      price: "€ 30.00",
      enrollLink: "ENROLL NOW",
      imageLink: "https://i.ibb.co.com/xLN7bSQ/category2.png",
      category: `3D`,
    },
    {
      id: 8,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Analytics for Beginners",
      duration: "Physics Expert",
      students: 220,
      price: "€ 33.00",
      enrollLink: "ENROLL NOW",
      imageLink: tutor,
      category: `Sports`,
    },
    {
      id: 9,
      instructor: "John Michael",
      rating: 4.6,
      reviews: 3100,
      courseTitle: "Building Digital Products",
      duration: "Physics Expert",
      students: 210,
      price: "€ 37.00",
      enrollLink: "ENROLL NOW",
      imageLink: "https://i.ibb.co.com/vPfYHr7/category1.png",
      category: `All courses`,
    },
  ];

  //   FILTER COURSES BY CATEGORY
  const categories = [...new Set(course.map((item) => item.category))];
  const filterCoursesByCategory = (category) => {
    return course.filter((item) => item.category === category);
  };

  // Handle tab change OR ACTIVE KEY
  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <div>
      <div className="flex items-center justify-center py-8">
        <Breadcrumb
          items={[
            {
              title: "Home",
            },

            {
              title: "Top Rated Tutor",
            },
          ]}
        />
      </div>

      <div className="container mx-auto py-16 px-4">
        {/* <Tabs
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
    
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-4">
                {filterCoursesByCategory(category).map((item) => (
                  <TopratedTutorCard
                    key={item.id}
                    courseimage={item.imageLink}
                    courseTitle={item.courseTitle}
                    instructor={item.instructor}
                    rating={item.rating}
                    price={item.price}
                    reviews={item.reviews}
                    duration={item.duration}
                    students={item.students}
                    enrollLink={item.id}
                  />
                ))}
              </div>
            </Tabs.TabPane>
          ))}
        </Tabs> */}

        <TopRatedMentor />

        {/* Custom styles */}
      </div>
    </div>
  );
};

export default page;
