"use client";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Cookies from "js-cookie";
import {
  useResetpasswordMutation,
  useVerifyemailMutation,
} from "../../../../redux/features/AuthApi";
import AuthLayout from "../../../../components/AuthLayout";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const isRegegistation = searchParams.get("isRegegistation") || null;

  const [verifyemail, { isLoading }] = useVerifyemailMutation();
  const [resetpassword, { isLoading: isLoading2 }] = useResetpasswordMutation();

  const [otp, setOtp] = useState(["", "", "", ""]);

  const onFinish = async (values) => {
    const otpValue = otp.join("");
    console.log("Success:", otpValue);

    try {
      const resp = await verifyemail({ otp: otpValue }).unwrap();
      console.log("response ---------", resp);
      if (resp?.token) {
        Cookies.set("token", resp.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        router.push(
          `${isRegegistation && resp?.token ? "/" : "/auth/createNewPassword"}`
        );
        console.log("usr", resp?.user);
        setUser(resp?.user);
        return message.success(resp.message);
      }
      if (!resp?.success) {
        return message.error(resp.message);
      }
    } catch (error) {
      console.log(error);
      return message.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleresend = async () => {
    try {
      const resp = await resetpassword({ email }).unwrap();
      console.log("response ---------", resp);
      if (resp?.success) {
        return message.success(resp.message);
      }

      if (!resp?.success) {
        return message.error(resp.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      return message.error(error?.data?.message || "Something went wrong");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value, index) => {
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    if (value.length === 1 && index < 3) {
      document.getElementById(`otpInput-${index + 1}`).focus();
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto pt-32 px-4">
        <div className="text-start">
          <h1 className="text-3xl font-bold mb-4">OTP verification</h1>
          <h3 className="text-[#475467] text-[16px]">
            We’ve sent you a verification code to <br /> {email}
          </h3>
        </div>
        <div className="lg:max-w-lg w-full mx-auto pt-8 ">
          <div className="flex justify-start items-center ">
            <Form
              name="page"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ maxWidth: "500px", width: "100%" }}
            >
              {/* OTP Input */}
              <div className="flex justify-between   ">
                {otp.map((digit, index) => (
                  <Input
                    placeholder="0"
                    className="text-6xl text-[#D0D5DD]"
                    key={index}
                    id={`otpInput-${index}`}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    style={{
                      width: "80px",
                      height: "80px",
                      textAlign: "center",
                      fontSize: "24px",
                    }}
                  />
                ))}
              </div>

              <Form.Item className="pt-6">
                <button className="text-[#FFFFFF] font-semibold text-[16px] px-6 py-3 rounded-md bg-primary w-full">
                  {isLoading ? "Verifying..." : "Verify"}
                </button>
              </Form.Item>
            </Form>
          </div>
          <div className="text-start lg:mt-4">
            Didn’t received code?{" "}
            <button onClick={handleresend}>
              <span className="text-primary font-semibold hover:underline">
                {isLoading2 ? "Resending..." : "Resend"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Page;
