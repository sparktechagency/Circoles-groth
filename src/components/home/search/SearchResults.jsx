"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Spin, Card, Rate, Empty, Avatar, Tag } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSearchQuery } from "../../../redux/features/CourseApi";
import Link from "next/link";

const SearchResults = ({ visible, searchQuery, onClose, filters }) => {
  const { data: searchResult, isLoading: isSearchLoading } = useSearchQuery({
    search: searchQuery,
    category_id: filters?.category_id,
    type: filters?.type,
    subject_id: filters?.subject_id,
  });

  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    if (searchQuery.trim() === "") {
      setFilteredResults([]);
      return;
    }

    setIsLoading(true);

    if (searchResult?.success) {
      if (filters?.type === "tutor") {
        setFilteredResults(searchResult.tutors?.data || []);
      } else {
        setFilteredResults(searchResult.courses?.data || []);
      }
      setIsLoading(false);
    }
  }, [visible, searchQuery, searchResult, filters?.type]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-[999] mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto"
        >
          {isLoading || isSearchLoading ? (
            <div className="p-4 flex justify-center">
              <Spin />
            </div>
          ) : filteredResults?.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
              {filters?.type === "tutor"
                ? filteredResults.map((tutor) => (
                    <motion.div
                      key={tutor.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TutorCard tutor={tutor} onClick={onClose} />
                    </motion.div>
                  ))
                : filteredResults.map((course) => (
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
            <div className="p-4">
              <Empty
                description={
                  <span className="text-gray-500">
                    No results found for "{searchQuery}"
                  </span>
                }
              />
            </div>
          ) : (
            <div className="p-4">
              <Empty description="Start typing to search" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CourseCard = ({ course, onClick }) => (
  <Card
    onClick={onClick}
    hoverable
    className="border border-gray-100 rounded-md h-full hover:shadow-md transition-shadow"
  >
    <Link href={`/browseCourse/${course.id}`}>
      <div className="flex flex-row items-center justify-center gap-8">
        <div className="w-1/3">
          {course.thumbnail ? (
            <img
              alt={course.title}
              src={course.thumbnail}
              className="w-full object-cover rounded-lg"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Course+Image";
              }}
            />
          ) : (
            <div className="h-40 bg-gray-100 flex items-center justify-center rounded-t-lg">
              <BookOutlined className="text-3xl text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex flex-col h-full">
          <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
            {course.title}
          </h4>
          <p className="text-sm text-gray-500 mb-2">
            {course.category} • {course.language}
          </p>
          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <span className="text-primary font-semibold">
                ${course.price}
              </span>
              {course.rating ? (
                <div className="flex items-center">
                  <Rate
                    disabled
                    allowHalf
                    value={course.rating}
                    className="text-sm"
                  />
                  <span className="text-xs text-gray-500 ml-1">
                    ({course.total_reviews})
                  </span>
                </div>
              ) : (
                <span className="text-xs text-gray-400">No ratings yet</span>
              )}
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>
                <BookOutlined className="mr-1" />
                {course.duration} hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </Card>
);

const TutorCard = ({ tutor, onClick }) => (
  <Card
    onClick={onClick}
    hoverable
    className="border border-gray-100 rounded-md h-full hover:shadow-md transition-shadow"
  >
    <Link href={`/tutor/${tutor.id}`}>
      <div className="flex flex-row items-center gap-4">
        <div className="w-1/4">
          <Avatar
            size={80}
            src={tutor.avatar}
            icon={<UserOutlined />}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col flex-1">
          <h4 className="font-medium text-gray-800 mb-1">{tutor.name}</h4>
          <p className="text-sm text-gray-500 mb-2">{tutor.expertise_area}</p>

          <div className="flex flex-wrap gap-1 mb-2">
            {tutor.subjects?.map((subject, index) => (
              <Tag key={index} color="blue">
                {subject}
              </Tag>
            ))}
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <span className="text-primary font-semibold">
                {tutor.session_charge}
              </span>
              {tutor.language && (
                <span className="text-xs text-gray-500">{tutor.language}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  </Card>
);

export default SearchResults;
