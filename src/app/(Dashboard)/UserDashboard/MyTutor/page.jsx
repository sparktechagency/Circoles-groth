"use client";
import { Spin, Empty, Avatar, Rate, Tag, message } from "antd";
import Link from "next/link";
import { useMytutorQuery } from "../../../../redux/features/tutorapis/TutorApi";
import { useEffect } from "react";

const MyTutorsPage = () => {
  const { data, isLoading, isError, error } = useMytutorQuery();
  const mytutor = true; // Assuming user has tutors

  useEffect(() => {
    if (isError) {
      message.error(error?.data?.message || "Failed to load tutor data");
    }
  }, [isError, error]);

  const tutors = data ? Object.values(data.tutors) : [];
  const pagination = data?.pagination || { from: 0, to: 0, total: 0 };
  console.log("tutors", tutors);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {mytutor ? (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">My Tutors</h1>
            <p className="text-gray-500">
              Showing {pagination.from}-{pagination.to} of {pagination.total}{" "}
              tutors
            </p>
          </div>

          {tutors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-6">
              {tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar
                      size={64}
                      src={
                        tutor.avatar ||
                        "https://randomuser.me/api/portraits/women/44.jpg"
                      }
                      className="bg-gray-200"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{tutor.name}</h2>
                      <p className="text-gray-600">{tutor.expertise_area}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag color="blue">{tutor.language}</Tag>
                      <Tag color="green">${tutor.session_charge}/session</Tag>
                    </div>

                    <div className="flex items-center gap-2">
                      {tutor.avg_rating ? (
                        <>
                          <Rate
                            disabled
                            allowHalf
                            defaultValue={tutor.avg_rating}
                            className="text-sm"
                          />
                          <span className="text-sm text-gray-500">
                            ({tutor.total_reviews} reviews)
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">
                          No ratings yet
                        </span>
                      )}
                    </div>

                    <div className="pt-4">
                      <Link
                        href={`/browseCourse/instructor/${tutor.id}`}
                        className="text-primary hover:text-primary-dark font-medium"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty description="No tutors found" />
          )}
        </div>
      ) : (
        <div className="text-center w-fit mx-auto pt-[100px]">
          <svg
            width="240"
            height="246"
            viewBox="0 0 140 146"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Your empty state SVG here */}
          </svg>

          <div className="space-y-4 py-4">
            <p className="text-[#667085] text-[14px]">Opps...!</p>
            <p className="text-[#667085] text-[14px]">
              You haven't enrolled with any tutors yet.
            </p>
          </div>
          <Link
            className="text-[#14698A] text-[16px] flex text-center w-fit mx-auto items-center space-x-2 font-medium"
            href="/findTutors"
          >
            Find a tutor now{" "}
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.83398 14.474L14.1673 6.14062M14.1673 6.14062H5.83398M14.1673 6.14062V14.474"
                stroke="#14698A"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTutorsPage;
