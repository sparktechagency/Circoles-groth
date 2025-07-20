import Image from "next/image";
import React from "react";
import heroimg from "/public/images/heroimg.png";
import herobg from "/public/images/onlineschool.png";
import { Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="bg-[#F9FAFB]  min-h-[430px]">
      <section className="">
        <div className="container flex flex-col justify-center mx-auto   lg:flex-row lg:justify-between  ">
          {/* LEFT HERO SECTION */}
          <div className="flex flex-col justify-center p-6  text-center rounded-sm lg:max-w-[750px] xl:max-w-[750px] lg:text-left ">
            <div className="bg-white px-4 font-semibold pr-6 py-2 text-[#475467] w-fit rounded-3xl">
              🔥 Introducing
            </div>
            <h1 className="lg:text-[56px] text-4xl font-black leading-10 sm:text-6xl text-[#101828] font-Merriweather">
              Empowering Individuals and Organizations with Education Solutions
            </h1>
            <p className="mt-6 mb-8 text-[16px] font-normal sm:mb-12 text-[#475467] leading-8 ">
              Pantognostis is an online based educational platform, where you
              will find more than <br />
              pre recorded & live skills development courses.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link href="/browseCourse">
                <button className="text-[#FFFFFF] text-[16px] font-semibold p-4 rounded-md bg-primary ">
                  Explore Online Programs
                  <span>
                    {" "}
                    <ArrowUpOutlined className="rotate-45 text-xl" />
                  </span>
                </button>
              </Link>
              <Link href="/TopRatedTutor">
                <button className="text-white text-[16px] font-semibold p-4 rounded-md bg-fifth ">
                  FIND your TUTOR
                  <span>
                    {" "}
                    <ArrowUpOutlined className="rotate-45 text-xl" />
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT HERO SECTION */}
          <div className="w-full bg-no-repeat bg-contain bg-bottom   flex items-center justify-center">
            <div>
              <Image height={300} width={300} src={heroimg} alt="heroimg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
