"use client";
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Alert, message } from "antd";

import { useRouter } from "next/navigation";
import AuthLayout from "../../../../components/AuthLayout";
import { useUpdatePasswordMutation } from "../../../../redux/features/AuthApi";
import Swal from "sweetalert2";

const UpdatePassword = () => {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message
  const [alertType, setAlertType] = useState(null);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const formdata = new FormData();
    const { old_password, password, password_confirmation } = values;
    formdata.append("old_password", old_password);
    formdata.append("password", password);
    formdata.append("password_confirmation", password_confirmation);
    if (password !== password_confirmation) {
      setAlertMessage("Passwords do not match");
      setAlertType("error");
    } else {
      try {
        const resp = await updatePassword(formdata).unwrap();
        console.log("response ---------", resp);
        if (resp?.success) {
          Swal.fire("Success", resp?.message, "success");
          form.resetFields();
          router.push("/AdminDashboard");
        }

        if (!resp?.success) {
          Swal.fire(
            "Warning",
            resp?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong", "error");
        console.log("error", error);
      }

      // router.push("/AdminDashboard");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthLayout>
      <div className=" max-w-xl mx-auto pt-32 px-4  h-[830px] rounded-lg">
        {alertMessage && (
          <Alert
            message={alertMessage}
            type={alertType}
            showIcon
            className="mb-4"
          />
        )}
        <div className="bg-white rounded-lg p-6 ">
          <div className="text-start">
            <h1 className="text-3xl font-bold pb-4 ">UpdatePassword</h1>
          </div>
          <div className="w-full mx-auto  ">
            <div className="flex justify-start items-center ">
              <Form
                name="page"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ width: "100%" }}
              >
                <Form.Item
                  label={
                    <label
                      htmlFor="old_password"
                      className="text-sm text-[#344054] font-medium"
                    >
                      Current password
                    </label>
                  }
                  name="old_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Enter new password!",
                      type: "password",
                    },
                  ]}
                  required={false}
                >
                  <Input.Password
                    className="border border-[#D0D5DD] p-2 text-[16px] text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#dde2eb]"
                    placeholder="Enter new password"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <label
                      htmlFor="password"
                      className="text-sm text-[#344054] font-medium"
                    >
                      New password
                    </label>
                  }
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Enter new password!",
                      type: "password",
                    },
                  ]}
                  required={false}
                >
                  <Input.Password
                    className="border border-[#D0D5DD] p-2 text-[16px] text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#dde2eb]"
                    placeholder="Enter new password"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <label
                      htmlFor="password"
                      className="text-sm text-[#344054] font-medium"
                    >
                      Confirm password
                    </label>
                  }
                  name="password_confirmation"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Enter Confirm password!",
                      type: "password",
                    },
                  ]}
                  required={false}
                >
                  <Input.Password
                    className="border border-[#D0D5DD] p-2 text-[16px] text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#dde2eb]"
                    placeholder="Re-enter new Password"
                  />
                </Form.Item>

                <div className="flex items-center justify-end space-x-4">
                  <Form.Item>
                    <Button
                      onClick={router.back}
                      className="text-[#FFFFFF] text-[16px] font-semibold bg-primary p-6"
                      style={{
                        backgroundColor: "transparent",
                        color: "#14698A",
                        border: "1px solid #14698A",
                      }}
                      size="large"
                      type="primary"
                      block
                    >
                      cancel
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={isLoading}
                      disabled={isLoading}
                      className="text-[#FFFFFF] text-[16px] font-semibold bg-primary p-6"
                      style={{ backgroundColor: "#14698A" }}
                      size="large"
                      type="primary"
                      htmlType="submit"
                      block
                    >
                      Save changes
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default UpdatePassword;
