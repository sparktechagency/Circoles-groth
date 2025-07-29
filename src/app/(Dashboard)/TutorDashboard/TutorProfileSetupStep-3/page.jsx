"use client";

import React, { useState } from "react";
import { Steps, Form, Input, Select, Button } from "antd";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Option } = Select;

const ProfessionalInfo = () => {
  const [form] = Form.useForm(); // Form instance
  const [currentStep, setCurrentStep] = useState(2);
  const [qualifications, setQualifications] = useState([
    { language: "", degree: "", institute: "", graduation_year: "" },
  ]);
  const router = useRouter();

  const handleAddQualification = () => {
    setQualifications([
      ...qualifications,
      { language: "", degree: "", institute: "", graduation_year: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index][field] = value;
    setQualifications(updatedQualifications);
  };

  const handleFormSubmit = () => {
    console.log("Qualifications:", qualifications);
    localStorage.setItem("profilesetup3", JSON.stringify(qualifications));
    setCurrentStep(3);
    router.push("/TutorDashboard/TutorProfileSetupStep-4");
  };

  return (
    <div className="lg:flex flex-cols gap-8 p-6 bg-white h-screen pt-8">
      {/* Sidebar */}
      <div className="lg:w-1/4 w-full bg-[#F9FAFB] p-4 h-fit rounded-lg">
        <div className="py-6 space-y-2">
          <h1>Welcome to LearnenTech</h1>
          <p className="text-sm text-[#667085]">
            Follow these steps to apply for an account on the LearnenTech Tutor
            Platform:
          </p>
        </div>

        <Steps direction="vertical" current={currentStep} className="text-left">
          <Step
            className="h-[60px] font-bold text-[#000000]"
            title="Basic Info"
          />
          <Step
            className="h-[60px] font-bold text-[#000000]"
            title="Professional Info"
          />
          <Step
            className="h-[60px] font-bold text-[#000000]"
            title="Qualifications"
          />
          <Step
            className="h-[60px] font-bold text-[#000000]"
            title="Availability"
          />
        </Steps>
      </div>

      {/* Form Section */}
      <div className="lg:w-3/4 w-full">
        <h1 className="text-lg mb-4 text-[30px] font-semibold pl-2 border-l-4 border-[#14698A]">
          Qualifications
        </h1>
        <Form
          form={form}
          className="pt-[48px]"
          layout="vertical"
          onFinish={handleFormSubmit} // Form submission handler
        >
          {qualifications.map((qualification, index) => (
            <div key={index} className="mb-4 ">
              <Form.Item label="language" required>
                <Input
                  style={{
                    height: "44px",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                    color: "#667085",
                    fontSize: "16px",
                  }}
                  placeholder="language"
                  value={qualification.language}
                  onChange={(e) =>
                    handleInputChange(index, "language", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Degree" required>
                <Input
                  style={{
                    height: "44px",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                    color: "#667085",
                    fontSize: "16px",
                  }}
                  placeholder="e.g. BA"
                  value={qualification.degree}
                  onChange={(e) =>
                    handleInputChange(index, "degree", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Institute" required>
                <Input
                  style={{
                    height: "44px",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                    color: "#667085",
                    fontSize: "16px",
                  }}
                  placeholder="E.g. City University"
                  value={qualification.institute}
                  onChange={(e) =>
                    handleInputChange(index, "institute", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Year of Graduation" required>
                <Input
                  type="number"
                  style={{
                    height: "44px",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                    color: "#667085",
                    fontSize: "16px",
                  }}
                  placeholder="Year of Graduation"
                  value={qualification?.graduation_year}
                  onChange={(e) =>
                    handleInputChange(index, "graduation_year", e.target.value)
                  }
                />
              </Form.Item>
            </div>
          ))}

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
