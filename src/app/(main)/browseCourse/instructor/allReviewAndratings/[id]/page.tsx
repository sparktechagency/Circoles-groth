"use client";
import ReviewCard from "../../../../../../components/ui/ReviewCard";
import ratingimage from "/public/images/srahkhan.png";
import Link from "next/link";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Rate, Pagination, Empty } from "antd";
import { useState } from "react";
import { useGetAvarageRatingQuery } from "../../../../../../redux/features/CourseApi";

interface Review {
  review_by: string;
  avatar: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface RatingData {
  tutor_id: number;
  average_rating: number;
  total_reviews: number;
  star_counts: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  reviews: Review[];
  current_page: number;
  last_page: number;
  per_page: number;
}

const page = ({ params }) => {
  const { id } = params;
  const [page, setPage] = useState(1);
  const per_page = 10;

  const { data, isLoading, isError } = useGetAvarageRatingQuery({ id, per_page, page });
  const ratingData: RatingData = data || {
    tutor_id: 0,
    average_rating: 0,
    total_reviews: 0,
    star_counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    reviews: [],
    current_page: 1,
    last_page: 1,
    per_page: 10
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-lg">Loading reviews...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8 p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500 text-lg">
            Error loading reviews. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 p-4">
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Rate
            disabled
            count={1}
            defaultValue={ratingData.average_rating}
            allowHalf
            style={{ fontSize: "34px", marginRight: "10px" }}
          />
          <p
            className="text-2xl font-bold text-[#475467]"
            style={{ fontSize: "20px" }}
          >
            {ratingData.average_rating.toFixed(1)}
          </p>
          <p
            className="text-[16px] font-medium text-[#475467]"
            style={{ marginLeft: "10px" }}
          >
            <strong className="text-2xl font-bold">Course rating</strong> ({ratingData.total_reviews.toLocaleString()} reviews)
          </p>
        </div>
        
        {[5, 4, 3, 2, 1].map((stars) => (
          <div
            key={stars}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Rate
              disabled
              defaultValue={stars}
              count={5}
              style={{ fontSize: "18px", marginRight: "10px" }}
            />
            <p className="text-[16px] text-[#1D2939] font-semibold">
              {stars} Star
            </p>
            <p
              className="text-sm font-medium text-[#1253BB] underline"
              style={{ marginLeft: "10px" }}
            >
              ({ratingData.star_counts[stars as keyof typeof ratingData.star_counts] || 0} Students)
            </p>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <h1 className="text-lg font-bold text-[#475467] font-Merriweather mt-14 pb-6">
          {ratingData.total_reviews.toLocaleString()} reviews & ratings
        </h1>

        {/* Course rating and reviews here */}
        <div className="w-full">
          {ratingData.reviews.length > 0 ? (
            <>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                {ratingData.reviews.map((review, index) => (
                  <ReviewCard 
                    key={index} 
                    review={{
                      name: review.review_by,
                      avatar: review.avatar || ratingimage,
                      rating: review.rating,
                      time: review.created_at,
                      comment: review.comment
                    }} 
                  />
                ))}
              </div>
              {ratingData.last_page > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    current={page}
                    total={ratingData.total_reviews}
                    pageSize={per_page}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center py-12">
              <Empty
                description={
                  <div className="text-center">
                    <h3 className="text-xl font-medium text-gray-700">
                      No reviews yet
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Be the first to review this course
                    </p>
                  </div>
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;