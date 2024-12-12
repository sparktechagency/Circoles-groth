'use client';

import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Select, Steps, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import Link from "next/link";
const { Step } = Steps;
const { Option } = Select;

const Page = () => {
    const [form] = Form.useForm();

    // Upload props
    const uploadProps = {
        name: "file",
        multiple: false,
        maxCount: 1,
        accept: "image/*",
        action: "/api/upload", // Replace with your server endpoint
        onChange(info) {
            const { status } = info.file;
            if (status === "done") {
                console.log("Uploaded File Info:", info.file); // Log file info
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                console.log("Upload Error:", info.file);
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    
    // Handle form submission
    const onFinish = (values) => {
        console.log("Form Values:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.error("Form Errors:", errorInfo);
    };

    return (
        <div className="h-fit pt-8 bg-white p-6">
            {/* Header */}
            <div className="space-y-6">
                <h1 className="text-[#000000] font-semibold text-[38px]">
                    Upload Required Documents
                </h1>
                <p className="text-[#667085] text-[14px]">
                    Get verified by providing your authentic documents.{" "}
                    <span className="text-[#14698A] font-bold">Learn More</span>
                </p>
                <div className="max-w-6xl mx-auto">
                    <Steps direction="horizontal" current={1} className="text-left">
                        <Step className="h-[60px] font-bold text-[#000000]" title="Academic Certificate" />
                        <Step className="h-[60px] font-bold text-[#000000]" title="ID Verification" />
                        <Step className="h-[60px] font-bold text-[#000000]" title="Professional Certificate" />
                    </Steps>
                </div>
            </div>

            {/* Form */}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                     {/* Academic Certificate */}
                     <Form.Item
                    label="Select ID Type"
                    name="idType"
                    rules={[{ required: true, message: "Please select your academic certificate!" }]}
                >
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
                        <Option value="1">Passprot</Option>
                        <Option value="2">National ID</Option>
                      
                    </Select>
                </Form.Item>

          <div className="flex items-center justify-center space-x-4 w-full">
                  {/* Upload Profile Picture */}
                  <Form.Item
                    style={{ backgroundColor: 'white',width:'100%' }}
                    label="Front side of ID Card"
                    name="frontsideID"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                >
                    <Dragger style={{ backgroundColor: 'white' }} {...uploadProps}>
                        <p className="ant-upload-drag-icon bg-white  w-fit mx-auto">
                            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="40" height="40" rx="20" fill="#F2F4F7" />
                                <rect x="3" y="3" width="40" height="40" rx="20" stroke="#F9FAFB" stroke-width="6" />
                                <g clip-path="url(#clip0_441_12530)">
                                    <path d="M26.3335 26.3352L23.0002 23.0019M23.0002 23.0019L19.6669 26.3352M23.0002 23.0019V30.5019M29.9919 28.3269C30.8047 27.8838 31.4467 27.1826 31.8168 26.334C32.1868 25.4855 32.2637 24.5379 32.0354 23.6408C31.807 22.7436 31.2865 21.9481 30.5558 21.3797C29.8251 20.8113 28.9259 20.5025 28.0002 20.5019H26.9502C26.698 19.5262 26.2278 18.6205 25.5752 17.8527C24.9225 17.0849 24.1042 16.4751 23.182 16.069C22.2597 15.663 21.2573 15.4713 20.2503 15.5084C19.2433 15.5455 18.2578 15.8104 17.3679 16.2832C16.4779 16.7561 15.7068 17.4244 15.1124 18.2382C14.518 19.0519 14.1158 19.9898 13.936 20.9814C13.7563 21.9729 13.8036 22.9923 14.0746 23.9629C14.3455 24.9335 14.8329 25.8301 15.5002 26.5852" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_441_12530">
                                        <rect width="20" height="20" fill="white" transform="translate(13 13)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </p>
                        <p className="ant-upload-text text-[#475467]"> <span className="text-[#14698A] font-bold">Click to upload</span> or drag and drop </p>
                        <p className="ant-upload-hint text-[#475467]">Supports a single image upload (JPEG/PNG only).</p>
                    </Dragger>
                </Form.Item>
                {/* Academic Certificate */}



                {/* Upload Profile Picture */}
                <Form.Item
                    style={{ backgroundColor: 'white',width:'100%' }}
                    label="Back side of ID Card"
                    name="BacksideID"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                >
                    <Dragger style={{ backgroundColor: 'white' }} {...uploadProps}>
                        <p className="ant-upload-drag-icon bg-white  w-fit mx-auto">
                            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="40" height="40" rx="20" fill="#F2F4F7" />
                                <rect x="3" y="3" width="40" height="40" rx="20" stroke="#F9FAFB" stroke-width="6" />
                                <g clip-path="url(#clip0_441_12530)">
                                    <path d="M26.3335 26.3352L23.0002 23.0019M23.0002 23.0019L19.6669 26.3352M23.0002 23.0019V30.5019M29.9919 28.3269C30.8047 27.8838 31.4467 27.1826 31.8168 26.334C32.1868 25.4855 32.2637 24.5379 32.0354 23.6408C31.807 22.7436 31.2865 21.9481 30.5558 21.3797C29.8251 20.8113 28.9259 20.5025 28.0002 20.5019H26.9502C26.698 19.5262 26.2278 18.6205 25.5752 17.8527C24.9225 17.0849 24.1042 16.4751 23.182 16.069C22.2597 15.663 21.2573 15.4713 20.2503 15.5084C19.2433 15.5455 18.2578 15.8104 17.3679 16.2832C16.4779 16.7561 15.7068 17.4244 15.1124 18.2382C14.518 19.0519 14.1158 19.9898 13.936 20.9814C13.7563 21.9729 13.8036 22.9923 14.0746 23.9629C14.3455 24.9335 14.8329 25.8301 15.5002 26.5852" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_441_12530">
                                        <rect width="20" height="20" fill="white" transform="translate(13 13)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </p>
                        <p className="ant-upload-text text-[#475467]"> <span className="text-[#14698A] font-bold">Click to upload</span> or drag and drop </p>
                        <p className="ant-upload-hint text-[#475467]">Supports a single image upload (JPEG/PNG only).</p>
                    </Dragger>
                </Form.Item>
       
          </div>




                {/* Save & Continue Button */}
                <Form.Item>
                    <div className="flex justify-end gap-4 items-center  py-6">
                        <Button style={{ height: "44px", fontSize: "16px", fontWeight: 400 }}>
                            Cancel
                        </Button>
                        <Link href={'/DashboardLayout/TutorDashboard/Verification/verificationStep3'}>
                        <Button
                        htmlType="submit"
                            style={{ height: "44px", fontSize: "16px", fontWeight: 400,backgroundColor:'#14698A' }}
                            type="primary"
                        >
                            Save changes
                        </Button>
                        </Link>
                    </div>
                </Form.Item>


            </Form>
        </div>
    );
};

export default Page;
