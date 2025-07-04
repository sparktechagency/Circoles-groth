"use client";
import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { message, Space } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

import Link from "next/link";
import Image from "next/image";
import logoimage from "/public/images/logoimage.png";
import googleicon from "/public/images/google.png";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import AuthLayout from "../../../../components/AuthLayout";
import { useLoginMutation } from "../../../../redux/features/AuthApi";

const signIn = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const onFinish = async (values) => {
    console.log(values);
    try {
      const resp = await login(values).unwrap();
      console.log("resp", resp);
      if (resp?.access_token) {
        messageApi.open({
          type: "success",
          content: resp.message || "login successfully",
        });
        Cookies.set("token", resp.access_token);

        if (resp?.user?.role === "admin") {
          router.push("/AdminDashboard");
        }

        if (resp?.user?.role === "tutor") {
          router.push("/TutorDashboard");
        } else {
          router.push("/");
        }
      }
      if (!resp?.access_token) {
        messageApi.open({
          type: "error",
          content: resp.message,
        });
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: error?.data?.message || "Something went wrong",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthLayout>
      {contextHolder}
      <div className="pt-12">
        <div className="text-center px-2 ">
          <div className="flex justify-center items-center mb-4">
            <Image src={logoimage} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Log in to your account</h1>
          <h3 className="text-[#475467] text-[16px]">
            Welcome back! Please enter your details.
          </h3>
        </div>
        <div className="lg:max-w-lg w-full mx-auto px-4">
          <div className="flex justify-center items-center ">
            <Form
              name="signin"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ maxWidth: "400px", width: "100%" }}
            >
              <Form.Item
                label={
                  <label
                    htmlFor="email"
                    className="text-sm text-[#344054] font-medium"
                  >
                    Email
                  </label>
                }
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
                <Input
                  className="border border-[#D0D5DD] p-2 text-[16px] text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#dde2eb]"
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                label={
                  <label
                    htmlFor="email"
                    className="text-sm text-[#344054] font-medium"
                  >
                    Password
                  </label>
                }
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                required={false}
              >
                <Input.Password
                  className="border border-[#D0D5DD] p-2 text-[16px] text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#dde2eb]"
                  placeholder="Enter your password"
                />
              </Form.Item>

              <div className="flex justify-between items-center">
                <Form.Item className="w-fit" valuePropName="checked">
                  <Checkbox className="text-[14px] text-[#344054] font-medium ">
                    Remember me
                  </Checkbox>
                </Form.Item>

                {/* Forgot Password Link */}
                <Link
                  href="/auth/forgetpassword"
                  className="text-[14px] text-[#195671] font-semibold hover:underline pb-4"
                >
                  Forgot password?
                </Link>
              </div>

              <Form.Item>
                <Button
                  className="text-[#FFFFFF] text-[16px] font-semibold p-6 bg-primary hover:bg-primary"
                  style={{ backgroundColor: "#14698A" }}
                  size="large"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  {isLoading ? "Loading..." : "Log in"}
                </Button>
              </Form.Item>

              {/* Google Sign In Button */}
              <Form.Item>
                <Link href="http://10.0.80.13:8050/api/auth/google?=http://10.0.80.13:8050/api/auth/google">
                  <Button
                    block
                    className="btn-google text-[#344054] text-[16px] font-semibold p-6 hover:border-[#344054] hover:bg-[#344054] hover:text-[#FFFFFF]"
                    style={{ marginBottom: "10px" }}
                  >
                    <Image src={googleicon} width={24} height={24} />
                    Log in with Google
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </div>
          <div className="text-center lg:mt-4">
            Don't have an account?{" "}
            <Link href="/auth/signup">
              <span className="text-[#195671] font-semibold hover:underline">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default signIn;
