"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Input, Select, Button, Form, message } from "antd";
import { GoStack } from "react-icons/go";
import { IoClipboardOutline, IoPlayCircleOutline } from "react-icons/io5";
import { PiMonitorLight } from "react-icons/pi";
import PublishCourse from "../../../../../components/dashboard/admindashboard/PublishCourse";
import CurriculumSection from "../../../../../components/dashboard/admindashboard/CurriculumSection";

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const AddCurriculam = () => {
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
                <PiMonitorLight size={24} />
                Curriculum
              </span>
            }
            key="1"
          >
            <div>
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
            key="2"
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

export default AddCurriculam;
