"use client";

import React, { useState } from "react";
import { Tabs, Input, Select, Button, Menu, Form } from "antd";
import { GoStack } from "react-icons/go";
import { IoClipboardOutline, IoPlayCircleOutline } from "react-icons/io5";
import { PiMonitorLight } from "react-icons/pi";
import PublishCourse from "../../../../components/dashboard/admindashboard/PublishCourse";
import CurriculumSection from "../../../../components/dashboard/admindashboard/CurriculumSection";
import CourseDetails from "../../../../components/dashboard/admindashboard/CourseDetails";

// import { GoStack, MdDetails, FaClipboardList, AiOutlineCheckCircle } from 'react-icons/all'; // Import icons

const { TabPane } = Tabs;
const { Option } = Select;

const CreateNewCourse = () => {
  const [activekey, setactivekey] = useState("1");

  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        setactivekey("2");
        console.log("Form Data:", values);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  return (
    <div className="bg-white h-screen">
      <div className="container mx-auto mb-10">
        <Tabs
          activeKey={activekey}
          onChange={setactivekey}
          tabBarStyle={{ marginBottom: 32 }}
        >
          <TabPane
            tab={
              <span className="flex items-center gap-2 text-[#1D2939] font-semibold">
                <GoStack size={24} />
                Basic Information
              </span>
            }
            key="1"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4 py-6 border-b-2 border-[#E5E7EB]">
                Basic Information
              </h2>
              <Form form={form} layout="vertical" className="space-y-4">
                {/* Title */}
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please enter the title" },
                  ]}
                >
                  <Input
                    style={{ height: "44px", fontSize: "16px" }}
                    placeholder="Your course title"
                  />
                </Form.Item>

                {/* Subtitle */}
                <Form.Item
                  label="Subtitle"
                  name="subtitle"
                  rules={[
                    { required: true, message: "Please enter the subtitle" },
                  ]}
                >
                  <Input
                    style={{ height: "44px", fontSize: "16px" }}
                    placeholder="Your course subtitle"
                  />
                </Form.Item>

                {/* Pricing */}
                <Form.Item
                  label="Pricing"
                  name="pricing"
                  rules={[
                    { required: true, message: "Please select the pricing" },
                  ]}
                >
                  <Select
                    placeholder="Select..."
                    style={{ height: "44px", fontSize: "16px" }}
                  >
                    <Option value="free">Free</Option>
                    <Option value="paid">Paid</Option>
                  </Select>
                </Form.Item>

                {/* Platform Fees */}
                <Form.Item
                  label="Platform Fees"
                  name="platformFees"
                  initialValue="20%"
                >
                  <Input
                    style={{ height: "44px", fontSize: "16px" }}
                    disabled
                  />
                </Form.Item>

                <div className="flex items-center justify-between gap-6">
                  {/* Course Category */}
                  <Form.Item
                    label="Course Category"
                    name="category"
                    rules={[
                      { required: true, message: "Please select a category" },
                    ]}
                    className="w-full"
                  >
                    <Select
                      placeholder="Select..."
                      style={{ height: "44px", fontSize: "16px" }}
                    >
                      <Option value="development">Development</Option>
                      <Option value="design">Design</Option>
                    </Select>
                  </Form.Item>

                  {/* Course Sub-category */}
                  <Form.Item
                    label="Course Sub-category"
                    name="subCategory"
                    rules={[
                      {
                        required: true,
                        message: "Please select a sub-category",
                      },
                    ]}
                    className="w-full"
                  >
                    <Select
                      placeholder="Select..."
                      style={{ height: "44px", fontSize: "16px" }}
                    >
                      <Option value="web-development">Web Development</Option>
                      <Option value="graphic-design">Graphic Design</Option>
                    </Select>
                  </Form.Item>
                </div>

                {/* Course Topic */}
                <Form.Item
                  label="Course Topic"
                  name="topic"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the course topic",
                    },
                  ]}
                >
                  <Input
                    style={{ height: "44px", fontSize: "16px" }}
                    placeholder="What is primarily taught in your course?"
                  />
                </Form.Item>

                <div className="grid grid-cols-4 gap-6">
                  {/* Select Language */}
                  <Form.Item
                    label="Select Language"
                    name="language"
                    rules={[
                      { required: true, message: "Please select a language" },
                    ]}
                  >
                    <Select
                      placeholder="Select..."
                      style={{ height: "44px", fontSize: "16px" }}
                    >
                      <Option value="english">English</Option>
                      <Option value="spanish">Spanish</Option>
                    </Select>
                  </Form.Item>
                  {/* Subtitle Language */}
                  <Form.Item
                    label="Subtitle Language (Optional)"
                    name="subtitleLanguage"
                  >
                    <Select
                      placeholder="Select..."
                      style={{ height: "44px", fontSize: "16px" }}
                    >
                      <Option value="english">English</Option>
                      <Option value="spanish">Spanish</Option>
                    </Select>
                  </Form.Item>

                  {/* Course Level */}
                  <Form.Item
                    label="Course Level"
                    name="level"
                    rules={[
                      { required: true, message: "Please select a level" },
                    ]}
                  >
                    <Select
                      placeholder="Select..."
                      style={{ height: "44px", fontSize: "16px" }}
                    >
                      <Option value="beginner">Beginner</Option>
                      <Option value="intermediate">Intermediate</Option>
                    </Select>
                  </Form.Item>

                  {/* Duration */}
                  <Form.Item
                    label="Duration"
                    name="duration"
                    rules={[
                      { required: true, message: "Please select a duration" },
                    ]}
                  >
                    <Select
                      placeholder="Select..."
                      style={{ height: "44px", fontSize: "16px" }}
                    >
                      <Option value="1">1 Hour</Option>
                      <Option value="2">2 Hours</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="flex justify-between mt-8">
                  <Button>Cancel</Button>
                  <Button
                    onClick={handleSave}
                    style={{
                      height: "44px",
                      fontSize: "16px",
                      backgroundColor: "#14698A",
                    }}
                    type="primary"
                  >
                    Save & Next
                  </Button>
                </div>
              </Form>
            </div>
          </TabPane>

          {/* Additional TabPanes */}
          <TabPane
            tab={
              <span className="flex items-center gap-2 text-[#1D2939] font-semibold">
                <IoClipboardOutline size={24} />
                Details
              </span>
            }
            key="2"
          >
            <div>
              <CourseDetails setactivekey={setactivekey} />
            </div>
          </TabPane>

          <TabPane
            tab={
              <span className="flex items-center gap-2 text-[#1D2939] font-semibold">
                <PiMonitorLight size={24} />
                Curriculum
              </span>
            }
            key="3"
          >
            <div>
              {" "}
              {/* Add content for the Curriculum tab here */}
              <CurriculumSection setactivekey={setactivekey} />
            </div>
          </TabPane>

          <TabPane
            tab={
              <span className="flex items-center gap-2 text-[#1D2939] font-semibold">
                <IoPlayCircleOutline size={24} />
                Publish Course
              </span>
            }
            key="4"
          >
            <div>
              {/* Add content for the Publish Course tab here */}
              <PublishCourse />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateNewCourse;
