'use client'
import { Button, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CheckCircleOutlined } from '@ant-design/icons'; // Importing a celebratory icon

const PublishCourse = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePublish = () => {
    setIsModalVisible(true); // Show the modal
  };

  const handleOk = () => {
    router.push('/DashboardLayout/AdminDashboard');
    setIsModalVisible(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold border-b-2 border-[#E9EAF0] pb-4 mb-4">
        Publish Course
      </h2>
      <div className="flex item-start justify-between gap-4 mt-6">
        <div className="w-full">
          <p className="text-sm py-2 font-semibold text-[#1D2939]">Welcome Message</p>
          <Input.TextArea
            className="bg-white w-full"
            style={{
              height: "150px",
              borderColor: "#D0D5DD",
              color: "#667085",
              fontSize: "16px",
              fontWeight: 400,
            }}
            placeholder="Enter course starting message here..."
          />
        </div>

        <div className="w-full">
          <p className="text-sm py-2 font-semibold text-[#1D2939]">Congratulations Message</p>
          <Input.TextArea
            className="bg-white w-full"
            style={{
              height: "150px",
              borderColor: "#D0D5DD",
              color: "#667085",
              fontSize: "16px",
              fontWeight: 400,
            }}
            placeholder="Enter your course completed message here..."
          />
        </div>
      </div>
      <div className="flex justify-between mt-[48px]">
        <button className="h-[48px] text-[#475467] text-[16px] border-none font-semibold bg-transparent">Previous</button>
        <Button onClick={handlePublish}     style={{ height: '44px', fontSize: '16px',backgroundColor:'#14698A'}} type="primary">
          Publish
        </Button>
      </div>

      {/* Congratulation Modal */}
      <Modal
        title="Course Published Successfully!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Go to Dashboard"
        cancelText="Cancel"
        centered
        width={400} // Set a fixed width for a more compact design
        bodyStyle={{
          backgroundColor: '#f9f9f9', // Light background color for the modal body
          padding: '24px',
          fontSize: '16px',
        }}
        titleStyle={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#4CAF50', // Green color for success
          textAlign: 'center',
        }}
        footer={[
          <Button key="back" onClick={handleCancel} style={{ borderRadius: '5px', backgroundColor: '#f1f1f1' }}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} style={{ borderRadius: '5px', backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
            Go to Dashboard
          </Button>,
        ]}
      >
        <div className="text-center">
          <CheckCircleOutlined style={{ fontSize: '40px', color: '#4CAF50' }} />
          <p className="text-black">Your course has been successfully published!</p>
        </div>
      </Modal>
    </div>
  );
};

export default PublishCourse;
