"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Spin, Card } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const demoCourses = [
  {
    id: 3,
    title: "Mastering Laravel Framework",
    slug: "mastering-laravel-framework-1",
    thumbnail:
      "http://10.0.80.13:8050/uploads/admin/course/thumbnail/1733735815_image-1200x800.png",
    category: "Technology",
    category_slug: "technology",
    category_id: 1,
    duration: 40,
    language: "English",
    price: "99.99",
    rating: 4.5,
    total_reviews: 2,
    type: "course",
  },
  {
    id: 4,
    title: "Advanced Physics Tutoring",
    slug: "advanced-physics-tutoring",
    thumbnail: "http://example.com/physics-thumbnail.jpg",
    category: "Science",
    category_slug: "science",
    category_id: 2,
    duration: 30,
    language: "English",
    price: "79.99",
    rating: 4.8,
    total_reviews: 15,
    type: "tutor",
    subject: "Physics",
  },
];

const defaultCourses = [
  {
    id: 1,
    title: "Popular: Web Development Bootcamp",
    type: "course",
    category: "Programming",
    rating: 4.7,
    price: "89.99",
  },
  {
    id: 2,
    title: "Featured: Math Tutoring",
    type: "tutor",
    subject: "Mathematics",
    rating: 4.9,
    price: "59.99",
  },
  {
    id: 3,
    title: "Popular: Web Development Bootcamp",
    type: "course",
    category: "Programming",
    rating: 4.7,
    price: "89.99",
  },
  {
    id: 4,
    title: "Featured: Math Tutoring",
    type: "tutor",
    subject: "Mathematics",
    rating: 4.9,
    price: "59.99",
  },
  {
    id: 5,
    title: "Popular: Web Development Bootcamp",
    type: "course",
    category: "Programming",
    rating: 4.7,
    price: "89.99",
  },
  {
    id: 6,
    title: "Featured: Math Tutoring",
    type: "tutor",
    subject: "Mathematics",
    rating: 4.9,
    price: "59.99",
  },
  {
    id: 7,
    title: "Popular: Web Development Bootcamp",
    type: "course",
    category: "Programming",
    rating: 4.7,
    price: "89.99",
  },
  {
    id: 8,
    title: "Featured: Math Tutoring",
    type: "tutor",
    subject: "Mathematics",
    rating: 4.9,
    price: "59.99",
  },
];

const SearchResults = ({ visible, searchQuery, onClose }) => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    if (searchQuery.trim() === "") {
      setFilteredCourses(defaultCourses);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    const timer = setTimeout(() => {
      const filtered = demoCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [visible, searchQuery]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-72 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 flex justify-center">
              <Spin />
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CourseCard course={course} onClick={onClose} />
                </motion.div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="p-4 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Start typing to search
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CourseCard = ({ course, onClick }) => (
  <Card
    hoverable
    className="border-0 rounded-md h-full"
    onClick={onClick}
    cover={
      course.thumbnail ? (
        <img
          alt={course.title}
          src={course.thumbnail}
          className="h-40 object-cover"
        />
      ) : null
    }
  >
    <div className="flex items-start">
      <div className="bg-blue-100 p-2 rounded-lg mr-3">
        {course.type === "tutor" ? (
          <UserOutlined className="text-blue-500 text-lg" />
        ) : (
          <BookOutlined className="text-blue-500 text-lg" />
        )}
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{course.title}</h4>
        <p className="text-sm text-gray-500">
          {course.type === "tutor"
            ? `Tutor - ${course.subject}`
            : `Course - ${course.category}`}
        </p>
        <div className="flex justify-between mt-2">
          <span className="text-primary font-semibold">${course.price}</span>
          <span className="text-yellow-500">★ {course.rating}</span>
        </div>
      </div>
    </div>
  </Card>
);

export default SearchResults;
