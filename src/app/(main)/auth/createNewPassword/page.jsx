"use client";
import React, { useState } from "react";
import { Form, Input, Button, Alert, message } from "antd";
import { useRouter } from "next/navigation";
import { useCreateNewpasswordMutation } from "../../../../redux/features/AuthApi";
import AuthLayout from "../../../../components/AuthLayout";

const PasswordResetPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [createpassword, { isLoading }] = useCreateNewpasswordMutation();

  const onFinish = async (values) => {
    const formdata = new FormData();
    // if (values.password !== values.password_confirmation) {
    //   setAlertMessage("Passwords do not match");
    //   setAlertType("error");
    //   return;
    // }

    // setAlertMessage("Password matched");
    // setAlertType("success");
    const payload = {
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    try {
      const resp = await createpassword(payload).unwrap();
      console.log("sendingdata---------", values);
      console.log("response ---------", resp);
      if (resp?.success) {
        message.success(resp.message);
        form.resetFields();
        router.push("/auth/login");
      } else {
        message.error(resp?.message || "Password reset failed");
      }
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto pt-32 px-4">
        {/* {alertMessage && (
          <Alert
            message={alertMessage}
            type={alertType}
            showIcon
            className="mb-4"
            closable
          />
        )} */}

        <div className="text-start">
          <h1 className="text-3xl font-bold mb-4">Create a new password</h1>
        </div>

        <div className="lg:max-w-lg w-full mx-auto pt-8">
          <Form
            name="password_reset"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <PasswordField
              name="password"
              label="New password"
              placeholder="Enter new password"
              isNewPassword
            />

            <PasswordField
              name="password_confirmation"
              label="Confirm password"
              placeholder="Re-enter new password"
            />

            <Form.Item>
              <button className="text-[#FFFFFF] font-semibold text-[16px] px-6 py-3 rounded-md bg-primary w-full">
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
};

const PasswordField = ({ name, label, placeholder, isNewPassword = false }) => (
  <Form.Item
    label={<span className="text-sm text-[#344054] font-medium">{label}</span>}
    name={name}
    rules={[
      { required: true, message: `Please input your ${label.toLowerCase()}!` },
      ...(isNewPassword
        ? [
            { min: 6, message: "Password must be at least 6 characters" },
            {
              pattern: /[A-Z]/,
              message: "Must contain at least one uppercase letter",
            },
            { pattern: /[0-9]/, message: "Must contain at least one number" },
          ]
        : []),
    ]}
    required={false}
  >
    <Input.Password
      className="border border-[#D0D5DD] p-2 text-base text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#dde2eb]"
      placeholder={placeholder}
    />
  </Form.Item>
);

export default PasswordResetPage;
