
'use client';

import React, { useState } from "react";
import { Steps, Form, Input, Select, Tag, Button } from "antd";
import { useRouter } from "next/navigation";

const { Step } = Steps;
const { Option } = Select;

const ProfessionalInfo = () => {
  const [currentSetp, setCurrentrSetps] = useState(1)
  const [selectedSubjects, setSelectedSubjects] = useState(["Physics", "Chemistry", "Biology"]);
  const suggestions = ["Physics", "Chemistry", "Biology", "Philosophy", "Architecture"];
  const [form] = Form.useForm(); // Form instance
  const router = useRouter();

  const handleAddSubject = (subject) => {
    if (selectedSubjects.length < 3 && !selectedSubjects.includes(subject)) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleRemoveSubject = (removedSubject) => {
    setSelectedSubjects(selectedSubjects.filter((subject) => subject !== removedSubject));
  };

  // Handle form submission
  const handleFormSubmit = (values) => {
    console.log({
      ...values,
      selectedSubjects,
    });
setCurrentrSetps(2)


    router.push('/TutorDashboard/TutorProfileSetupStep-3')
  };

  return (
    <div className="flex gap-8 p-6 bg-white h-screen pt-8">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#F9FAFB] p-4 h-fit rounded-lg">
        <div className="py-6 space-y-2">
          <h1>Welcome to Circooles</h1>
          <p className="text-sm text-[#667085]">
            Follow these steps to apply for an account on the Circooles Tutor Platform:
          </p>
        </div>

        <Steps direction="vertical" current={currentSetp} className="text-left">
          <Step className="h-[60px] font-bold text-[#000000]" title="Basic Info" />
          <Step className="h-[60px] font-bold text-[#000000]" title="Professional Info" />
          <Step className="h-[60px] font-bold text-[#000000]" title="Qualifications" />
          <Step className="h-[60px] font-bold text-[#000000]" title="Availability" />
        </Steps>
      </div>

      {/* Form Section */}
      <div className="w-3/4">
        <h1 className="text-lg mb-4 text-[30px] font-semibold pl-2 border-l-4 border-[#14698A]">Professional Info</h1>
        <Form
          form={form}
          className="pt-[48px]"
          layout="vertical"
          onFinish={handleFormSubmit} // Form submission handler
        >
          {/* Subject Taught */}
          <Form.Item label={<p className="text-[#344054] text-[14px] font-medium">Subject Taught</p>}>
            <Select
              style={{
                height: "44px",
                borderRadius: "8px",
                border: "1px solid #D0D5DD",
                color: "#667085",
                fontSize: "16px",
              }}
              placeholder="Select"
              className="w-full mt-2"
              onSelect={handleAddSubject}
            >
              {suggestions.map((subject) => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSubjects.map((subject) => (
                <Tag
                  style={{
                    height: "28px",
                    backgroundColor: "#000000",
                    paddingTop: "2px",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                  key={subject}
                  closable
                  onClose={() => handleRemoveSubject(subject)}
                >
                  {subject}
                </Tag>
              ))}
            </div>
          </Form.Item>

          {/* Designation */}
          <Form.Item label="Designation" name="designation">
            <Input
              style={{
                height: "44px",
                borderRadius: "8px",
                border: "1px solid #D0D5DD",
                color: "#667085",
                fontSize: "16px",
              }}
              placeholder="e.g. Professor"
            />
          </Form.Item>

          {/* Organization */}
          <Form.Item label="Organization" name="organization">
            <Input
              style={{
                height: "44px",
                borderRadius: "8px",
                border: "1px solid #D0D5DD",
                color: "#667085",
                fontSize: "16px",
              }}
              placeholder="e.g. City University"
            />
          </Form.Item>

          {/* Teaching Experience */}
          <Form.Item label="Teaching Experience" name="teachingExperience">
            <Select
              style={{
                height: "44px",
                borderRadius: "8px",
                border: "1px solid #D0D5DD",
                color: "#667085",
                fontSize: "16px",
              }}
              placeholder="Select"
              className="w-full"
            >
              <Option value="1">1 year</Option>
              <Option value="2">2 years</Option>
              <Option value="3">3+ years</Option>
            </Select>
          </Form.Item>

          {/* Expertise Area */}
          <Form.Item label="Expertise Area" name="expertiseArea">
            <Input
              style={{
                height: "44px",
                borderRadius: "8px",
                border: "1px solid #D0D5DD",
                color: "#667085",
                fontSize: "16px",
              }}
              placeholder="e.g. Data Structures"
            />
          </Form.Item>

          <div className="flex justify-end gap-4 items-center py-6">
            <Button
              onClick={() => router.back()}
              style={{ height: "44px", fontSize: "16px", fontWeight: 400 }}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              style={{
                height: "44px",
                fontSize: "16px",
                fontWeight: 400,
                backgroundColor: "#14698A",
                color: "#FFFFFF",
              }}
              type="primary"
            >
              Save changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfessionalInfo;
