"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { Avatar, Spin, Alert, Empty, Button } from "antd";
import { formatDistanceToNow } from "date-fns";
import avg from "/public/images/Avatar.png";
import {
  useGetAllNotificationQuery,
  useMarkasReadNotificationMutation,
} from "../../../redux/features/AuthApi"; // Adjust this import path as needed

const formatTimeAgo = (dateString) => {
  if (!dateString) return "";
  try {
    return `${formatDistanceToNow(new Date(dateString))} ago`;
  } catch (error) {
    return "a while ago";
  }
};

const Notifications = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const {
    data: notificationsData,
    isLoading,
    isFetching, // Indicates when a new page is being fetched
    isError,
    error,
  } = useGetAllNotificationQuery({ page, per_page: 8 }); // You can adjust per_page

  const [markasReadNotification] = useMarkasReadNotificationMutation();

  const handleNotificationClick = async (notification) => {
    if (notification.read_at === null) {
      try {
        await markasReadNotification(notification.id).unwrap();
      } catch (err) {
        console.error("Failed to mark notification as read: ", err);
      }
    }
  };

  // 👇 Component for the pagination controls
  const PaginationControls = () => {
    if (
      !notificationsData ||
      notificationsData.total <= notificationsData.per_page
    ) {
      return null; // Don't show controls if there's only one page
    }

    return (
      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <Button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1 || isFetching}
          loading={isFetching && page > 1}
        >
          Previous
        </Button>
        <span className="text-gray-600">
          Page {notificationsData.current_page} of {notificationsData.last_page}
        </span>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={!notificationsData.next_page_url || isFetching}
          loading={isFetching && page < notificationsData.last_page}
        >
          Next
        </Button>
      </div>
    );
  };

  const renderContent = () => {
    // isLoading is for the very first load; isFetching is for any load
    if (isLoading) {
      return (
        <div className="text-center mt-20">
          <Spin size="large" />
        </div>
      );
    }

    if (isError) {
      return (
        <Alert
          className="mt-6"
          message="Error"
          description={error?.data?.message || "Failed to load notifications."}
          type="error"
          showIcon
        />
      );
    }

    const notifications = notificationsData?.data;

    if (!notifications || notifications.length === 0) {
      return (
        <div className="mt-20">
          <Empty description="No Notifications Found" />
        </div>
      );
    }

    return (
      <div className={`${isFetching ? "opacity-50" : ""}`}>
        <div className="mt-4 space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`flex justify-between items-center p-4 rounded-lg transition-all duration-200 ${
                notification.read_at === null
                  ? "bg-blue-50 cursor-pointer hover:shadow-md"
                  : "bg-white shadow-sm"
              }`}
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-gray-800 font-medium">
                    {notification.data.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatTimeAgo(notification.created_at)}
                  </p>
                </div>
              </div>
              {notification.read_at === null && (
                <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 ml-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="px-6 py-4 bg-gray-50 min-h-screen">
      <div
        onClick={() => router.back()}
        className="flex items-center cursor-pointer text-gray-600 mb-4"
      >
        <IoIosArrowBack size={20} />
        <span className="ml-2 text-lg font-medium">Back</span>
      </div>

      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
      </div>

      {renderContent()}
      <PaginationControls />
    </div>
  );
};

export default Notifications;
