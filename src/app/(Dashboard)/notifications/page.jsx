'use client';
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Avatar, Badge } from "antd";
import avg from "/public/images/Avatar.png";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Notifications = () => {
  const router = useRouter();

  return (
    <div className="px-6 py-4 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <div onClick={() => router.back()} className="flex items-center cursor-pointer text-gray-600 mb-4">
        <IoIosArrowBack size={20} />
        <span className="ml-2 text-lg font-medium">Back</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <a href="#" className="text-blue-500 hover:underline text-sm font-medium">
          See All
        </a>
      </div>

      {/* Notifications List */}
      <div className="mt-4 space-y-4">
        {/* Single Notification */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Avatar size={48}>
                <Image src={avg}/>
              </Avatar>
              <div>
                <p className="text-gray-800 font-medium">
                  <span className="font-bold text-gray-900">Leslie</span> shared a product
                </p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <Badge color="red" count={index === 0 ? 1 : 0} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
