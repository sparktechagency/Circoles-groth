"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetTutorVerificationDetailsQuery,
  useMarkAsVerifiedMutation,
} from "../../../../../redux/features/adminapis/AdminApi";
import {
  Button,
  Card,
  Divider,
  Image,
  Typography,
  Spin,
  Descriptions,
  Tabs,
  Tag,
} from "antd";
import {
  FileDoneOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const { data, isLoading } = useGetTutorVerificationDetailsQuery(id);
  const [markAsVerified, { isLoading: markAsVerifiedLoading }] =
    useMarkAsVerifiedMutation();

  const handleVerifyTutor = async () => {
    try {
      const response = await markAsVerified(id);
      console.log("response", response);
      if (response?.data?.success) {
        Swal.fire("Success", response?.message, "success");
        router.push("/AdminDashboard/Verification");
      }
      if (!response?.data?.success) {
        Swal.fire(
          "Opps!!",
          response?.error?.data?.message || "Failed to mark as verified"
        );
      }
    } catch (error) {
      Swal.fire("Opps!!", error?.data?.message || "Failed to mark as verified");
      console.log("error", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!data?.success || !data?.tutor_info) {
    return (
      <div className="p-6">
        <Title level={3}>No verification data found</Title>
      </div>
    );
  }

  const { academic_certificates, id_card, tsc } = data.tutor_info;
  console.log("data", data);
  return (
    <div className="p-6 bg-[#ffffffcb] ">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="mb-0">
          Tutor Verification Documents
        </Title>
        <Tag color="blue">Verification ID: {id}</Tag>
      </div>

      <Tabs defaultActiveKey="1">
        {/* Academic Certificates Tab */}
        <TabPane
          tab={
            <span>
              <FileDoneOutlined />
              Academic Certificates
            </span>
          }
          key="1"
        >
          <Card className="shadow-sm">
            {academic_certificates?.length > 0 ? (
              academic_certificates.map((cert, index) => (
                <div key={index}>
                  <Descriptions
                    title={cert.certificate}
                    column={1}
                    bordered
                    className="mb-6"
                  >
                    <Descriptions.Item label="Document Type">
                      {cert.certificate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Preview">
                      <Image
                        width="100%"
                        style={{
                          maxWidth: "600px",
                          border: "1px solid #f0f0f0",
                        }}
                        src={cert.image}
                        alt={`${cert.certificate} certificate`}
                        preview={{
                          maskClassName: "rounded-lg",
                        }}
                      />
                    </Descriptions.Item>
                  </Descriptions>
                  {index < academic_certificates.length - 1 && <Divider />}
                </div>
              ))
            ) : (
              <Text type="secondary">No academic certificates submitted</Text>
            )}
          </Card>
        </TabPane>

        {/* ID Verification Tab */}
        <TabPane
          tab={
            <span>
              <IdcardOutlined />
              ID Verification
            </span>
          }
          key="2"
        >
          <Card className="shadow-sm">
            {id_card ? (
              <Descriptions bordered column={1}>
                <Descriptions.Item label="ID Type">
                  {id_card?.type?.toUpperCase()}
                </Descriptions.Item>
                <Descriptions.Item label="Front Side">
                  <Image
                    width="100%"
                    style={{ maxWidth: "400px", border: "1px solid #f0f0f0" }}
                    src={id_card?.front_side}
                    alt="ID Front Side"
                    preview
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Back Side">
                  <Image
                    width="100%"
                    style={{ maxWidth: "400px", border: "1px solid #f0f0f0" }}
                    src={id_card?.back_side}
                    alt="ID Back Side"
                    preview
                  />
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Text type="secondary">No ID verification submitted</Text>
            )}
          </Card>
        </TabPane>

        {/* TSC Certificate Tab */}
        <TabPane
          tab={
            <span>
              <SafetyCertificateOutlined />
              TSC Certificate
            </span>
          }
          key="3"
        >
          <Card className="shadow-sm">
            {tsc ? (
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Certificate Number">
                  {tsc?.number}
                </Descriptions.Item>
                <Descriptions.Item label="Document Preview">
                  <Image
                    width="100%"
                    style={{ maxWidth: "600px", border: "1px solid #f0f0f0" }}
                    src={tsc?.image}
                    alt="TSC Certificate"
                    preview
                  />
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Text type="secondary">No TSC certificate submitted</Text>
            )}
          </Card>
        </TabPane>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Button
          loading={markAsVerifiedLoading}
          disabled={data?.tutor_info?.is_verified}
          onClick={handleVerifyTutor}
          type="primary"
          size="large"
          style={{ backgroundColor: "#14698A" }}
          className="min-w-32 h-12 "
        >
          {markAsVerifiedLoading ? "Approving..." : "Approve"}
        </Button>
      </div>
    </div>
  );
};

export default Page;
