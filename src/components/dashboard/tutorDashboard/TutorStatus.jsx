"use client";
import React, { useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { FaUser } from "react-icons/fa6";
import { SiPaypal } from "react-icons/si";
import { useTutorstaticsQuery } from "../../../redux/features/tutorapis/TutorApi";
import SelectBox from "../../share/dashboard/SelectBox";

const TutorStatus = () => {
  const [filter, setFilter] = useState("all");
  const {
    data: statusdata,
    isLoading,
    isError,
    error,
  } = useTutorstaticsQuery(filter);
  const [selectedCard, setSelectedCard] = useState(null);

  const data = statusdata?.data;
  console.log("data", data);

  const cardData = [
    {
      id: 1,
      icon: (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="60" height="60" rx="8" fill="white" />
          <path
            opacity="0.2"
            d="M19.5 19.5V38.5L21.5 40.5H40.5V19.5H19.5Z"
            fill="#7F56D9"
          />
          <path
            d="M19.5 31.9091V20.5C19.5 20.2348 19.6054 19.9804 19.7929 19.7929C19.9804 19.6054 20.2348 19.5 20.5 19.5H39.5C39.7652 19.5 40.0196 19.6054 40.2071 19.7929C40.3946 19.9804 40.5 20.2348 40.5 20.5V39.5C40.5 39.7652 40.3946 40.0196 40.2071 40.2071C40.0196 40.3946 39.7652 40.5 39.5 40.5H30.9545"
            stroke="#7F56D9"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M30 33L22 41L18 37"
            stroke="#7F56D9"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      title: data?.totalEnrolledCourses || "0",
      description: "total EnrolledCourses",
    },

    {
      id: 2,
      icon: (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="60" height="60" rx="8" fill="white" />
          <path
            opacity="0.2"
            d="M30 18C27.5726 18 25.2022 18.7362 23.2019 20.1114C21.2016 21.4866 19.6653 23.436 18.796 25.7025C17.9266 27.9689 17.7651 30.4457 18.3326 32.8058C18.9002 35.166 20.1701 37.2985 21.9749 38.9219V38.9217C22.7278 37.4405 23.8761 36.1966 25.2926 35.3279C26.709 34.4592 28.3384 33.9996 30 34C29.0111 34 28.0444 33.7068 27.2222 33.1573C26.3999 32.6079 25.759 31.827 25.3806 30.9134C25.0022 29.9998 24.9032 28.9945 25.0961 28.0245C25.289 27.0546 25.7652 26.1637 26.4645 25.4645C27.1637 24.7652 28.0546 24.289 29.0246 24.0961C29.9945 23.9031 30.9998 24.0022 31.9134 24.3806C32.8271 24.759 33.6079 25.3999 34.1574 26.2221C34.7068 27.0444 35 28.0111 35 29C35 30.3261 34.4732 31.5978 33.5355 32.5355C32.5979 33.4732 31.3261 34 30 34C31.6616 33.9996 33.291 34.4592 34.7074 35.3279C36.1239 36.1966 37.2722 37.4405 38.0252 38.9217C39.8299 37.2984 41.0999 35.1658 41.6674 32.8057C42.2349 30.4456 42.0734 27.9688 41.204 25.7024C40.3347 23.436 38.7984 21.4865 36.7981 20.1113C34.7978 18.7362 32.4274 18 30 18Z"
            fill="#D92D20"
          />
          <path
            d="M30 42C36.6274 42 42 36.6274 42 30C42 23.3726 36.6274 18 30 18C23.3726 18 18 23.3726 18 30C18 36.6274 23.3726 42 30 42Z"
            stroke="#D92D20"
            stroke-width="2"
            stroke-miterlimit="10"
          />
          <path
            d="M30 34C32.7614 34 35 31.7614 35 29C35 26.2386 32.7614 24 30 24C27.2386 24 25 26.2386 25 29C25 31.7614 27.2386 34 30 34Z"
            stroke="#D92D20"
            stroke-width="2"
            stroke-miterlimit="10"
          />
          <path
            d="M21.9751 38.9218C22.7284 37.4408 23.8767 36.1971 25.2931 35.3284C26.7095 34.4598 28.3387 34 30.0002 34C31.6617 34 33.2909 34.4598 34.7073 35.3284C36.1237 36.1971 37.272 37.4407 38.0253 38.9217"
            stroke="#D92D20"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      title: data?.totalStudents || "0",
      description: "Ttotal Students",
    },

    {
      id: 4,
      icon: (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="60" height="60" rx="8" fill="white" />
          <path
            opacity="0.2"
            d="M16.999 26.1055H42.999L42.9998 37.9989C42.9998 38.2642 42.8944 38.5185 42.7069 38.706C42.5193 38.8936 42.265 38.9989 41.9998 38.9989H17.9998C17.7345 38.9989 17.4802 38.8936 17.2926 38.706C17.1051 38.5185 16.9998 38.2642 16.9998 37.9989L16.999 26.1055Z"
            fill="#475467"
          />
          <path
            d="M42 21H18C17.4477 21 17 21.4477 17 22V38C17 38.5523 17.4477 39 18 39H42C42.5523 39 43 38.5523 43 38V22C43 21.4477 42.5523 21 42 21Z"
            stroke="#475467"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M34.999 35H38.999"
            stroke="#475467"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M28.999 35H30.999"
            stroke="#475467"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.999 26.1055H42.999"
            stroke="#475467"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      title: `$${data?.totalEarnings || "0"}`,
      description: "Total Earnings",
    },
  ];

  const handleCardClick = (cardIndex) => {
    setSelectedCard(cardIndex);
  };

  const handleSelectChange = (value) => {
    setFilter(value);
    console.log("Selected", value);
  };

  const selectOptions = [
    { value: "weekly", label: "weekly" },
    { value: "monthly", label: "monthly" },
    { value: "yearly", label: "yearly" },
  ];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-xl rounded-b-none ">
      <div className="flex justify-between w-full">
        <div className="pr-8">
          <SelectBox
            options={selectOptions}
            placeholder="Week"
            onChange={(value) => handleSelectChange(value)}
            style={{ width: 100 }}
          />
        </div>
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-[12px]">
        {cardData.map((card, index) => {
          const bgColors = [
            "bg-[#F9F5FF]",
            "bg-[#ECFDF3]",
            "bg-[#FEF3F2]",
            "bg-[#F9FAFB]",
          ];
          const selectedBgColor =
            selectedCard === index
              ? "bg-[#D8F0FF]"
              : bgColors[index % bgColors.length];

          return (
            <div
              key={card.id}
              className={`flex justify-between items-center rounded-2xl cursor-pointer ${selectedBgColor}  h-[184px] `}
              onClick={() => handleCardClick(index)}
            >
              <div className=" gap-4 p-6 w-fit">
                <div>{card.icon}</div>
                <div className="pt-2">
                  <h1 className="text-[24px] font-semibold">{card.title}</h1>
                  <p className="text-sm text-[#4E5566] font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorStatus;
