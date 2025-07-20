"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ClockCircleOutlined,
  UsergroupDeleteOutlined,
  ArrowUpOutlined,
  CreditCardOutlined,
  AppleOutlined,
  GoogleOutlined,
  LockFilled,
} from "@ant-design/icons";
import { Button, Modal, Rate, Space, Steps } from "antd";
import { Radio, Input, Form } from "antd";
import card1 from "/public/images/icons/card1.svg";
import card2 from "/public/images/icons/card2.svg";
import card3 from "/public/images/icons/card3.svg";
import card4 from "/public/images/icons/card4.svg";

import apple from "/public/images/icons/applepay.svg";
import google from "/public/images/icons/googlepay.svg";
import strype from "/public/images/icons/strype.svg";
import paypal from "/public/images/icons/paypal.svg";
import { useRouter } from "next/navigation";

const VerificationFee = () => {
  const carditems = [
    {
      id: 1,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Product Management Basic - Course",
      duration: "40 Hours",
      students: 176,
      price: "KES 29.00",
      enrollLink: "ENROLL NOW",
      imageLink: "https://i.ibb.co.com/17pL5Qj/caourse1.png",
      category: "All courses",
    },
    {
      id: 2,
      instructor: "John Michael",
      rating: 4.7,
      reviews: 3242,
      courseTitle: "Advanced Product Strategy - Course",
      duration: "45 Hours",
      students: 150,
      price: "KES 35.00",
      enrollLink: "ENROLL NOW",
      imageLink: "https://i.ibb.co.com/xLN7bSQ/category2.png",
      category: "Graphic Design",
    },
    {
      id: 3,
      instructor: "John Michael",
      rating: 4.6,
      reviews: 2987,
      courseTitle: "Product Roadmaps for Success",
      duration: "38 Hours",
      students: 200,
      price: "KES 27.00",
      enrollLink: "ENROLL NOW",
      imageLink: "https://i.ibb.co.com/vPfYHr7/category1.png",
      category: "UI/UX Design",
    },
    {
      id: 4,
      instructor: "John Michael",
      rating: 4.8,
      reviews: 3500,
      courseTitle: "Mastering Agile Product Management",
      duration: "50 Hours",
      students: 250,
      price: "KES 40.00",
      enrollLink: "ENROLL NOW",
      imageLink: "https://i.ibb.co.com/xLN7bSQ/category2.png",
      category: "Programming",
    },
  ];
  const [form] = Form.useForm();

  // Handle form submission
  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  //   modal
  const success = () => {
    Modal.success({
      content: (
        <div className="w-full py-4 space-y-2">
          <span className="text-8xl text-center mx-auto block">🎉</span>
          <h1 className="text-2xl font-bold text-[#34303E]">
            Congratulations! You’ve completed your Enrollment.
          </h1>
        </div>
      ),
      okText: <Link href={"/TutorDashboard"}>Go to Dashboard</Link>, // Customize the button text
      okButtonProps: {
        style: { backgroundColor: "#14698A", hight: "44px" }, // Customize button styles
      },
    });
  };

  const router = useRouter();
  const handleCancel = () => {
    router.back(); // Go to the previous page
  };

  return (
    <div className=" bg-white  p-4 mx-auto">
      <div className="max-w-xl mx-auto ">
        {/* right side of checkout page - */}
        <div className="">
          <h3 className="text-2xl font-bold mb-4 uppercase">Payment</h3>
          <div className=" border lg:p-6 md:p-6 p-2 rounded-lg">
            {/* Payment Encryption Notice */}
            <div className="flex lg:gap-3 md:gap-3 gap-1 items-center space-x-2 mb-4 bg-[#F2F4F7] text-[#475467] rounded-lg p-3">
              <div className="p-2 bg-[#E4E7EC] text-sm text-[#475467] rounded-full">
                <LockFilled className="text-2xl " />
              </div>
              <p>
                Payments are encrypted so that your credit card & payment
                details stay safe
              </p>
            </div>

            {/* Ant Design Form */}
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
            >
              {/* Payment Method */}
              <Form.Item
                name="paymentMethod"
                rules={[
                  {
                    required: true,
                    message: "Please select a payment method!",
                  },
                ]}
              >
                <div className="border p-4 rounded-md w-full flex items-center justify-between ">
                  <Radio
                    className="text-[#475467] text-sm font-medium"
                    value="creditCard "
                  >
                    Credit/Debit Card
                  </Radio>
                  <div className="flex items-center justify-center gap-2">
                    <Image src={card1} className="w-7 h-5 cursor-pointer" />
                    <Image src={card2} className="w-7 h-5 cursor-pointer" />
                    <Image src={card3} className="w-7 h-5 cursor-pointer" />
                    <Image src={card4} className="w-7 h-5 cursor-pointer" />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                name="paywith"
                rules={[
                  {
                    required: true,
                    message: "Please select a payment method!",
                  },
                ]}
              >
                <div className="border p-4 rounded-md w-full flex items-center justify-between ">
                  <Radio
                    className="text-[#475467] text-sm font-medium"
                    value="creditCard "
                  >
                    Pay with
                  </Radio>
                  <div className="flex items-center justify-center gap-2">
                    <Image src={apple} className="w-12 h-5 cursor-pointer" />
                    <Image src={google} className="w-12 h-5 cursor-pointer" />
                    <Image src={strype} className="w-12 h-5 cursor-pointer" />
                    <Image src={paypal} className="w-12 h-5 cursor-pointer" />
                  </div>
                </div>
              </Form.Item>

              <div className="bg-[#E4E7EC] p-6 rounded-md border ">
                {/* Name on card */}
                <Form.Item
                  name="nameOnCard"
                  label={
                    <label className="capitalize text-[#344054] text-sm font-medium">
                      Name on card
                    </label>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name on card!",
                    },
                  ]}
                >
                  <Input
                    className="text-[16px] text-[#98A2B3] font-normal p-2"
                    placeholder="John Doe"
                  />
                </Form.Item>

                {/* Card number */}
                <Form.Item
                  name="cardNumber"
                  label={
                    <label className="capitalize text-[#344054] text-sm font-medium">
                      Card number
                    </label>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your card number!",
                    },
                  ]}
                >
                  <Input
                    className="text-[16px] text-[#98A2B3] font-normal p-2"
                    type="number"
                    placeholder="1234 5678 9101 1121"
                  />
                </Form.Item>

                <div className="flex space-x-4">
                  {/* Expire date */}
                  <Form.Item
                    name="expireDate"
                    label={
                      <label className="capitalize text-[#344054] text-sm font-medium">
                        Expire date
                      </label>
                    }
                    className="w-1/2"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the expire date!",
                      },
                    ]}
                  >
                    <Input
                      className="text-[16px] text-[#98A2B3] font-normal p-2"
                      type="date"
                      placeholder="MM/YY"
                    />
                  </Form.Item>

                  {/* CVC */}
                  <Form.Item
                    name="cvc"
                    label={
                      <label className="capitalize text-[#344054] text-sm font-medium">
                        CVC/CVV code
                      </label>
                    }
                    className="w-1/2"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your CVC code!",
                      },
                    ]}
                  >
                    <Input
                      className="text-[16px] text-[#98A2B3] font-normal p-2"
                      placeholder="••••"
                    />
                  </Form.Item>
                </div>
              </div>

              {/* Terms */}
              <p className="text-sm text-[#475467] my-4">
                By completing your purchase you agree to these{" "}
                <a href="#" className="text-[#1253BB]">
                  Terms of Service
                </a>
                .
              </p>

              {/* Submit button */}
              <Form.Item>
                {/* Action Buttons */}
                <div className="w-full">
                  <Button
                    style={{ backgroundColor: "#14698A" }}
                    onClick={success}
                    className="bg-white h-[48px] border border-[#D0D5DD] min-w-[156px]  w-full font-semibold text-white"
                  >
                    KES87.00 Pay & Submit for Review
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationFee;
