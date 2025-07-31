"use client";
import { Alert, Button, Form, Image, Input, Spin, Upload, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import { MdEmail, MdOutlineCloudUpload } from "react-icons/md";
import {
  useGetOwnprofileQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/AuthApi";
// Ensure this path is correct for your project

const SettingsPage = () => {
  const [form] = Form.useForm();

  // This state holds the URL for the image to be displayed
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const { data, isLoading, error } = useGetOwnprofileQuery();
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateProfileMutation();

  const userData = data?.user?.[0];

  // Effect to set initial form values and the default image
  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        name: userData.name,
        email: userData.email,
      });
      // 1. On load, set the preview to the user's current avatar URL
      setAvatarPreview(userData.avatar);
    }
  }, [userData, form]);

  // Handle form submission
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("_method", "PUT");

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const res = await updateProfile(formData).unwrap();
      message.success(res?.message || "Profile updated successfully!");
    } catch (err) {
      message.error(err?.data?.message || "Failed to update profile.");
    }
  };

  // Props for the Ant Design Upload component
  const uploadProps = {
    name: "avatar",
    showUploadList: false,
    customRequest: ({ file, onSuccess }) => onSuccess("ok"),
    onChange: (info) => {
      if (info.file.status === "done") {
        const file = info.file.originFileObj;
        setAvatarFile(file);
        // 2. When a new image is selected, update the preview to its local URL
        setAvatarPreview(URL.createObjectURL(file));
      }
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto">
        <Alert
          message="Error"
          description="Failed to load profile."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full mx-auto">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-5 border p-6 rounded-lg shadow-md bg-white"
      >
        {/* ... Name and Email Form.Item are unchanged ... */}
        <Form.Item
          name="name"
          label={<span className="font-medium text-[#344054]">Full Name</span>}
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input placeholder="e.g., Omar" style={{ height: "44px" }} />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="font-medium text-[#344054]">Email</span>}
          rules={[{ required: true, type: "email" }]}
        >
          <Input
            prefix={<MdEmail size={20} className="text-gray-400" />}
            style={{ height: "44px" }}
            disabled
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium text-[#344054]">Profile Photo</span>
          }
        >
          <div className="w-full flex items-center gap-6">
            {/* This Image component always shows the current preview URL */}
            <Image
              width={80}
              height={70}
              className="rounded-full object-cover"
              src={avatarPreview}
              fallback="https://via.placeholder.com/80"
            />
            <div className="w-full">
              <Dragger {...uploadProps} className="border-dashed">
                <p className="ant-upload-drag-icon">
                  <MdOutlineCloudUpload
                    size={40}
                    className="mx-auto text-gray-400"
                  />
                </p>
                <p className="ant-upload-text text-[#1253BB] font-semibold">
                  Click to upload
                </p>
                <p className="ant-upload-hint text-xs">
                  PNG, JPG, GIF (MAX. 5MB)
                </p>
              </Dragger>
            </div>
          </div>
        </Form.Item>

        <div className="flex justify-end gap-4 items-center pt-4 border-t mt-6">
          <Button
            style={{ height: "44px", fontSize: "16px" }}
            disabled={isUpdateLoading}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdateLoading}
            style={{
              height: "44px",
              fontSize: "16px",
              backgroundColor: "#14698A",
            }}
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SettingsPage;
