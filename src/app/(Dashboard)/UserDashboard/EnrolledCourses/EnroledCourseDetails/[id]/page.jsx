"use client";
import { Avatar, Button, Collapse } from "antd";
const { Panel } = Collapse;

const panels = [
  { id: "01", title: "Getting started", time: "02:30 min", isVideo: true },
  { id: "02", title: "Basic Fundamental", time: "10:30 min", isVideo: true },
  { id: "03", title: "Practice Project", fileSize: "5.3 MB", isVideo: false },
  { id: "04", title: "Basic Fundamental", time: "10:30 min", isVideo: true },
  { id: "05", title: "Basic Fundamental", time: "10:30 min", isVideo: true },
  { id: "06", title: "Basic Fundamental", time: "10:30 min", isVideo: true },
];

import React from "react";
import {
  ClockCircleOutlined,
  PlayCircleOutlined,
  FolderOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useParams } from "next/navigation";

const EnroledCourse = () => {
  const { id } = useParams();
  console.log("id", id);
  return (
    <div className="bg-white p-6">
      <h1 className="text-[24px] font-bold ">UX Design Course</h1>
      <div className="xl:flex justify-between gap-6 item-center  mb-4 container mx-auto">
        {/* left content ---------- */}
        <div className=" w-full">
          <video
            type="video/mp4"
            className="w-full mt-24 rounded-2xl"
            src="https://videos.pexels.com/video-files/4629800/4629800-uhd_2560_1440_25fps.mp4"
            controls
          ></video>
          <h1 className="text-[24px] font-bold py-4 ">Getting started</h1>

          {/* avater  */}
          <div>
            <div className="lg:flex flex-col justify-between space-x-2">
              <div>
                <p className="text-[#263238] text-[14px] font-normal flex items-center gap-2">
                  Last updated :{" "}
                  <span className="text-[#1D2939] block text-[14px] font-semibold">
                    Oct 26, 2024
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* decription here */}
          <div>
            <h1 className="text-[24px] font-bold py-4 ">
              Lectures Description
            </h1>
            <p className="text-[14px] font-normal leading-8">
              We cover everything you need to build your first website. From
              creating your first page through to uploading your website to the
              internet. We’ll use the world’s most popular (and free) web design
              tool called Visual Studio Code. There are exercise files you can
              download and then work along with me. At the end of each video I
              have a downloadable version of where we are in the process so that
              you can compare your project with mine. This will enable you to
              see easily where you might have a problem. We will delve into all
              the good stuff such as how to create your very own mobile burger
              menu from scratch learning some basic JavaScript and jQuery. If
              that all sounds a little too fancy - don’t worry, this course is
              aimed at people new to web design and who have never coded before.
              We’ll start right at the beginning and work our way through step
              by step.
            </p>
          </div>
        </div>

        {/* ritht content --------------- */}
        <div className="xl:max-w-2xl  w-full">
          {/* Course curriculum section here ------------- */}
          <div className="xl:max-w-2xl  w-full  my-12  lg:p-4 p-0">
            {/* lacture folder ----------------- */}
            <div className="flex items-center justify-between mb-4 pl-8 ">
              <div className="flex flex-wrap items-center justify-between lg:gap-6 md:gap-6 gap-1">
                <div className="lg:text-[16px] text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <FolderOutlined className="lg:text-2xl text-xl text-[#4E5566]" />{" "}
                  6 Sections
                </div>
                <div className="lg:text-[16px] text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <PlayCircleOutlined className="lg:text-2xl text-xl text-[#4E5566]" />{" "}
                  202 lectures
                </div>
                <div className="lg:text-[16px] text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <ClockCircleOutlined className="lg:text-2xl text-xl text-[#4E5566]" />{" "}
                  19h 37m
                </div>
              </div>
            </div>

            {/* course outline here----------------------------------------------------------- */}
            <div className=" mx-auto  rounded-md lg:p-4 md:p-4 p-0 border-none">
              <Collapse
                defaultActiveKey={["1"]}
                accordion
                expandIconPosition="right"
                className=" p-4 rounded-lg border-none"
              >
                {/* dropswon/panel one --------------- */}
                <Panel
                  header={
                    <div className="">
                      <div className="text-lg font-semibold text-[#475467]">
                        Introduction to Product Management
                      </div>
                      <div className="text-xs text-[#98A2B3] font-normal">
                        06 Lectures • 30 Minutes
                      </div>
                    </div>
                  }
                  key="1"
                  className="mb-2 bg-transparent "
                  style={{ backgroundColor: "transparent" }}
                >
                  <div className="space-y-3 cursor-pointer">
                    {/* Add space between items */}
                    {panels.map((panel) => (
                      <div
                        key={panel.id}
                        className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-4" // Adjust margin, padding and shadow
                      >
                        <div className="flex items-center">
                          <div className="bg-[#F2F4F7] text-[#475467] w-10 h-10 rounded-lg flex items-center justify-center mr-4 font-bold">
                            {panel.id}
                          </div>
                          <div>
                            <p className="font-semibold text-[#475467] text-[16px]">
                              {panel.title}
                            </p>
                            {panel.isVideo ? (
                              <p className="text-sm text-[#98A2B3]">
                                {panel.time}
                              </p>
                            ) : (
                              <p className="text-sm text-[#98A2B3]">
                                {panel.fileSize}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          {panel.isVideo ? (
                            <PlayCircleOutlined className="text-[#14698A] text-2xl" />
                          ) : (
                            <FileOutlined className="text-[#14698A] text-2xl" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>

                {/* dropswon/panel tow --------------- */}
                <Panel
                  header={
                    <div className="">
                      <div className="text-lg font-semibold text-[#475467]">
                        Introduction to Product Management
                      </div>
                      <div className="text-xs text-[#98A2B3] font-normal">
                        06 Lectures • 30 Minutes
                      </div>
                    </div>
                  }
                  key="2"
                  className="mb-2 bg-transparent"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div className="space-y-3 cursor-pointer">
                    {/* Add space between items */}
                    {panels.map((panel) => (
                      <div
                        key={panel.id}
                        className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-4" // Adjust margin, padding and shadow
                      >
                        <div className="flex items-center">
                          <div className="bg-[#F2F4F7] text-[#475467] w-10 h-10 rounded-lg flex items-center justify-center mr-4 font-bold">
                            {panel.id}
                          </div>
                          <div>
                            <p className="font-semibold text-[#475467] text-[16px]">
                              {panel.title}
                            </p>
                            {panel.isVideo ? (
                              <p className="text-sm text-[#98A2B3]">
                                {panel.time}
                              </p>
                            ) : (
                              <p className="text-sm text-[#98A2B3]">
                                {panel.fileSize}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          {panel.isVideo ? (
                            <PlayCircleOutlined className="text-[#14698A] text-2xl" />
                          ) : (
                            <FileOutlined className="text-[#14698A] text-2xl" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
                {/* dropswon/panel three --------------- */}
                <Panel
                  header={
                    <div className="">
                      <div className="text-lg font-semibold text-[#475467]">
                        Introduction to Product Management
                      </div>
                      <div className="text-xs text-[#98A2B3] font-normal">
                        06 Lectures • 30 Minutes
                      </div>
                    </div>
                  }
                  key="3"
                  className="mb-2 bg-transparent"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div className="space-y-3 cursor-pointer">
                    {/* Add space between items */}
                    {panels.map((panel) => (
                      <div
                        key={panel.id}
                        className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-4" // Adjust margin, padding and shadow
                      >
                        <div className="flex items-center">
                          <div className="bg-[#F2F4F7] text-[#475467] w-10 h-10 rounded-lg flex items-center justify-center mr-4 font-bold">
                            {panel.id}
                          </div>
                          <div>
                            <p className="font-semibold text-[#475467] text-[16px]">
                              {panel.title}
                            </p>
                            {panel.isVideo ? (
                              <p className="text-sm text-[#98A2B3]">
                                {panel.time}
                              </p>
                            ) : (
                              <p className="text-sm text-[#98A2B3]">
                                {panel.fileSize}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          {panel.isVideo ? (
                            <PlayCircleOutlined className="text-[#14698A] text-2xl" />
                          ) : (
                            <FileOutlined className="text-[#14698A] text-2xl" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnroledCourse;
