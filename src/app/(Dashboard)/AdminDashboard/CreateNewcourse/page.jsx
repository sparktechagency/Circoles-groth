"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Input, Select, Button, Form, message } from "antd";
import { GoStack } from "react-icons/go";
import { IoClipboardOutline, IoPlayCircleOutline } from "react-icons/io5";
import { PiMonitorLight } from "react-icons/pi";
import PublishCourse from "../../../../components/dashboard/admindashboard/PublishCourse";
import CurriculumSection from "../../../../components/dashboard/admindashboard/CurriculumSection";
import CourseDetails from "../../../../components/dashboard/admindashboard/CourseDetails";
import { useGetAllCategoryQuery } from "../../../../redux/features/adminapis/AdminApi";

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const CreateNewCourse = () => {
  const { data: categoriesData, isLoading } = useGetAllCategoryQuery();
  const [activekey, setactivekey] = useState("1");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();

  const [allDeta, setAllDeta] = useState();

  // const formData = new FormData();

  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }

  // Initialize categories and subcategories
  useEffect(() => {
    if (categoriesData?.categories?.length > 0) {
      const firstCategory = categoriesData.categories[0];
      setSelectedCategory(firstCategory.id);
      setSubCategories(firstCategory.sub_categories || []);

      // If first category has no subcategories, show a message
      if (firstCategory.sub_categories?.length === 0) {
        message.info(`${firstCategory.name} has no subcategories`);
      }
    }
  }, [categoriesData]);

  const handleCategoryChange = (value) => {
    const category = categoriesData.categories.find((cat) => cat.id === value);
    setSelectedCategory(value);
    setSubCategories(category?.sub_categories || []);
    form.setFieldsValue({ sub_category_id: undefined }); // Reset subcategory

    // Show message if category has no subcategories
    if (category?.sub_categories?.length === 0) {
      message.info(`${category.name} has no subcategories`);
    }
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        setAllDeta(values);
        // If category has no subcategories, set sub_category_id to null
        if (subCategories.length === 0) {
          values.sub_category_id = null;
        }
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
                    style={{
                      height: "44px",
                      fontSize: "16px",
                      border: "1px solid #D0D5DD",
                      borderRadius: "5px",
                    }}
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
                    style={{
                      height: "44px",
                      fontSize: "16px",
                      border: "1px solid #D0D5DD",
                      borderRadius: "5px",
                    }}
                    placeholder="Your course subtitle"
                  />
                </Form.Item>

                {/* Price */}
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: "Please enter the price" },
                    {
                      pattern: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid price (e.g. 89.99)",
                    },
                  ]}
                >
                  <Input
                    style={{
                      height: "44px",
                      fontSize: "16px",
                      border: "1px solid #D0D5DD",
                      borderRadius: "5px",
                    }}
                    placeholder="Your course price"
                    type="number"
                    step="0.01"
                  />
                </Form.Item>

                <div className="flex items-center justify-between gap-6">
                  {/* Course Category */}
                  <Form.Item
                    label="Course Category"
                    name="category_id"
                    rules={[
                      { required: true, message: "Please select a category" },
                    ]}
                    className="w-full"
                  >
                    <Select
                      placeholder="Select category"
                      style={{
                        height: "44px",
                        fontSize: "16px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "5px",
                      }}
                      onChange={handleCategoryChange}
                      loading={isLoading}
                    >
                      {categoriesData?.categories?.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {/* Course Sub-category */}
                  <Form.Item
                    label="Course Sub-category"
                    name="sub_category_id"
                    rules={[
                      {
                        required: subCategories.length > 0,
                        message: "Please select a sub-category",
                      },
                    ]}
                    className="w-full"
                  >
                    <Select
                      placeholder={
                        subCategories.length > 0
                          ? "Select sub-category"
                          : "No subcategories available"
                      }
                      style={{
                        height: "44px",
                        fontSize: "16px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "5px",
                      }}
                      disabled={!selectedCategory || subCategories.length === 0}
                      loading={isLoading}
                    >
                      {subCategories?.map((subCategory) => (
                        <Option key={subCategory.id} value={subCategory.id}>
                          {subCategory.name}
                        </Option>
                      ))}
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
                    style={{
                      height: "44px",
                      fontSize: "16px",
                      border: "1px solid #D0D5DD",
                      borderRadius: "5px",
                    }}
                    placeholder="What is primarily taught in your course?"
                  />
                </Form.Item>

                <div className="grid grid-cols-4 gap-6">
                  {/* Select Language */}
                  <Form.Item
                    label="Language"
                    name="language"
                    rules={[
                      { required: true, message: "Please select a language" },
                    ]}
                  >
                    <Select
                      placeholder="Select language"
                      style={{
                        height: "44px",
                        fontSize: "16px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "5px",
                      }}
                    >
                      <Option value="English">English</Option>
                      <Option value="Spanish">Spanish</Option>
                      <Option value="French">French</Option>
                      <Option value="German">German</Option>
                    </Select>
                  </Form.Item>

                  {/* Course Level */}
                  <Form.Item
                    label="Course Level"
                    name="c_level"
                    rules={[
                      { required: true, message: "Please select a level" },
                    ]}
                  >
                    <Select
                      placeholder="Select level"
                      style={{
                        height: "44px",
                        fontSize: "16px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "5px",
                      }}
                    >
                      <Option value="Beginner">Beginner</Option>
                      <Option value="Intermediate">Intermediate</Option>
                      <Option value="Advanced">Advanced</Option>
                    </Select>
                  </Form.Item>

                  {/* Duration */}
                  <Form.Item
                    label="Duration (hours)"
                    name="duration"
                    rules={[
                      { required: true, message: "Please add a duration" },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Please enter a valid number",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        height: "44px",
                        fontSize: "16px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "5px",
                      }}
                      placeholder="Course duration in hours"
                      type="number"
                    />
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
              <CourseDetails
                setactivekey={setactivekey}
                setAllDeta={setAllDeta}
                // formdata={formData}
              />
            </div>
          </TabPane>

          {/* <TabPane
            tab={
              <span className="flex items-center gap-2 text-[#1D2939] font-semibold">
                <PiMonitorLight size={24} />
                Curriculum
              </span>
            }
            key="3"
          >
            <div>
              <CurriculumSection setactivekey={setactivekey} />
            </div>
          </TabPane> */}

          <TabPane
            tab={
              <span className="flex items-center gap-2 text-[#1D2939] font-semibold">
                <IoPlayCircleOutline size={24} />
                Publish Course
              </span>
            }
            key="3"
          >
            <div>
              <PublishCourse allDeta={allDeta} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateNewCourse;
