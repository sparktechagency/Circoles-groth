"use client";
import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import tutorimg from "/public/images/becometutor.png";
import AuthLayout from "../../../../components/AuthLayout";
import { useRegisterMutation } from "../../../../redux/features/AuthApi";
import { useRouter } from "next/navigation";

const { Option } = Select;

const Signup = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const onFinish = async (values) => {
    const allData = { ...values, role: "tutor" };
    try {
      const resp = await register(allData).unwrap();
      console.log("response ---------", resp);
      if (resp?.success) {
        message.success(resp.message || "successfully registered");
        form.resetFields();
        router.push(
          `/auth/otpverification?email=${values.email}&isRegegistation=true`
        );
      }
      if (resp?.success === false) {
        message.error(resp.message || "Something went wrong");
      }
      if (resp?.email) {
        message.error(resp.email[0] || "Something went wrong");
      }
    } catch (error) {
      message.error(error.data.message || "Something went wrong");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const inputStyles =
    "w-full h-11 border border-[#D0D5DD] rounded-lg p-2.5 text-base text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#14698A] focus:shadow-sm";
  const selectStyles =
    "w-full h-11 border border-[#D0D5DD] rounded-lg text-base text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#14698A]";
  const buttonStyles =
    "bg-[#14698A] text-white text-base font-semibold h-11 rounded-lg hover:bg-[#105a75] focus:bg-[#105a75]";

  return (
    <AuthLayout>
      <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 px-4 py-12 lg:px-12 lg:py-24 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl font-bold mb-2">Become Tutor</h1>
              <p className="text-[#475467] text-base">
                Please enter your details.
              </p>
            </div>

            <Form
              name="signin"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{ role: "tutor" }}
            >
              <Form.Item
                label="Name*"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
                required={false}
              >
                <Input className={inputStyles} placeholder="Enter your Name" />
              </Form.Item>

              <Form.Item
                label="Email*"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    type: "email",
                  },
                ]}
                required={false}
              >
                <Input className={inputStyles} placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Password*"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                required={false}
              >
                <Input.Password
                  className={inputStyles}
                  placeholder="Enter your password"
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password*"
                name="password_confirmation"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
                required={false}
              >
                <Input.Password
                  className={inputStyles}
                  placeholder="Confirm your password"
                />
              </Form.Item>

              <Form.Item
                label="Which education levels are you interested in tutoring?*"
                name="edu_level"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one education level!",
                  },
                ]}
              >
                <Select
                  className={selectStyles}
                  allowClear
                  placeholder="Select education levels"
                  dropdownStyle={{ borderRadius: "8px" }}
                >
                  <Option value="1">Primary</Option>
                  <Option value="2">Middle School</Option>
                  <Option value="3">High School</Option>
                  <Option value="4">College</Option>
                  <Option value="5">Graduate</Option>
                  <Option value="6">Post-Graduate</Option>
                </Select>
              </Form.Item>

              {/* Hidden role field */}
              <Form.Item name="role" hidden>
                <Input type="hidden" />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={isLoading}
                  className={buttonStyles}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full lg:w-1/2 lg:h-screen order-first lg:order-last">
          <div className="relative w-full h-64 lg:h-full">
            <Image
              src={tutorimg}
              alt="Tutor illustration"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
