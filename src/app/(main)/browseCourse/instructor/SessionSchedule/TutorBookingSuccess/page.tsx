"use client";
import { Button, Card, Result, Space, Typography, Spin, Alert } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { PrinterOutlined, HomeOutlined } from "@ant-design/icons";
import { useStoretutorpaymentMutation } from "../../../../../../redux/features/tutorapis/TutorApi";
import { useEffect, useRef, useState } from "react";

const { Title, Text } = Typography;

enum PaymentStatus {
  VERIFYING = "verifying",
  SUCCESS = "success",
  ERROR = "error",
}

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [storetutorpayment] = useStoretutorpaymentMutation();
  const hasPosted = useRef(false);

  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.VERIFYING);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [paymentData, setPaymentData] = useState<any>(null);

  const reference = searchParams.get("reference");
  const tutorId = searchParams.get("tutor_id");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const cost = searchParams.get("cost");
  const type = searchParams.get("type");

  useEffect(() => {
    if (!reference || hasPosted.current) return;

    const verifyPayment = async () => {
      hasPosted.current = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        const response = await storetutorpayment({ body: { reference } }).unwrap();
        console.log("Payment verification successful:", response);
        setPaymentData(response.data);
        setStatus(PaymentStatus.SUCCESS);
      } catch (error: any) {
        console.error("Payment verification failed:", error);
        setStatus(PaymentStatus.ERROR);
        setErrorMessage(
          error.data?.message ||
          error.message ||
          "An unexpected error occurred. Please try again later."
        );
      }
    };

    verifyPayment();
  }, [reference, storetutorpayment]);

  const formattedDate = new Date(date || paymentData?.metadata?.start_date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (status === PaymentStatus.VERIFYING) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Card className="shadow-lg border-0">
          <div className="flex flex-col items-center justify-center py-12">
            <Spin size="large" />
            <Title level={4} className="mt-4">Verifying your payment...</Title>
            <Text className="text-gray-500">Please wait while we confirm your transaction</Text>
          </div>
        </Card>
      </div>
    );
  }

  if (status === PaymentStatus.ERROR) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <Card className="shadow-lg border-0">
          <Result
            status="error"
            title="Payment Verification Failed"
            subTitle={errorMessage}
            extra={[
              <Button
                type="primary"
                key="home"
                icon={<HomeOutlined />}
                onClick={() => router.push("/UserDashboard")}
                style={{ backgroundColor: "#14698A", borderColor: "#564FFD" }}
              >
                Go to Dashboard
              </Button>,
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="shadow-lg border-0">
        <Result
          status="success"
          title="Booking Confirmed!"
          subTitle="Your payment was successful and your session has been scheduled."
          extra={[
            <Button
              type="primary"
              key="home"
              icon={<HomeOutlined />}
              onClick={() => router.push("/UserDashboard")}
              style={{ backgroundColor: "#14698A", borderColor: "#564FFD" }}
            >
              Go to Dashboard
            </Button>,
            <Button
              key="print"
              icon={<PrinterOutlined />}
              onClick={() => window.print()}
            >
              Print Receipt
            </Button>,
          ]}
        />

        <div className="mt-8 border-t pt-6">
          <Title level={4} className="mb-4">
            Booking Details
          </Title>

          <Space direction="vertical" size="middle" className="w-full">
            <div className="flex justify-between">
              <Text strong>Reference Number:</Text>
              <Text>{paymentData?.reference || "N/A"}</Text>
            </div>

            <div className="flex justify-between">
              <Text strong>Tutor Name:</Text>
              <Text>{paymentData?.metadata?.tutor_name || tutorId}</Text>
            </div>

            <div className="flex justify-between">
              <Text strong>Session Date:</Text>
              <Text>{formattedDate}</Text>
            </div>

            <div className="flex justify-between">
              <Text strong>Time Slot:</Text>
              <Text>{decodeURIComponent(time) || paymentData?.metadata?.booking_time}</Text>
            </div>

            <div className="flex justify-between">
              <Text strong>Session Type:</Text>
              <Text className="capitalize">{type || paymentData?.metadata?.booking_type}</Text>
            </div>

            <div className="flex justify-between">
              <Text strong>Amount Paid:</Text>
              <Text>{(paymentData?.amount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: paymentData?.currency || 'USD'
              }) || `$${cost}`}</Text>
            </div>

            <div className="flex justify-between">
              <Text strong>Payment Method:</Text>
              <Text className="capitalize">{paymentData?.channel || 'Card'}</Text>
            </div>

            <div className="flex justify-between">
              <Text strong>Transaction Date:</Text>
              <Text>{new Date(paymentData?.paid_at).toLocaleString()}</Text>
            </div>
          </Space>
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <Title level={5} className="mb-2">
            Next Steps
          </Title>
          <Space direction="vertical">
            <Text>
              1. A confirmation has been sent to {paymentData?.customer?.email || 'your email'}
            </Text>
            <Text>
              2. For online sessions, the meeting link will be shared 24 hours before
            </Text>
            <Text>3. Contact support if you have any questions</Text>
          </Space>
        </div>

        {paymentData?.authorization && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <Title level={5} className="mb-2">
              Payment Card Details
            </Title>
            <Space direction="vertical" size="small">
              <Text>
                <Text strong>Card Type:</Text> {paymentData.authorization.card_type}
              </Text>
              <Text>
                <Text strong>Bank:</Text> {paymentData.authorization.bank}
              </Text>
              <Text>
                <Text strong>Card Number:</Text> **** **** **** {paymentData.authorization.last4}
              </Text>
            </Space>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PaymentSuccess;