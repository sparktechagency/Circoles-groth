"use client";
import React from "react";
import { Form, Input, Button, Select } from "antd";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import Image from "next/image";
import signupimage from "/public/images/logo.png";
import googleicon from "/public/images/google.png";
import SignupCarousel from "@/components/utils/SignupCarosel";
import tutorimg from '/public/images/becometutor.png'

const { Option } = Select;
const Signup = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthLayout>
      <div className="xl:flex lg:flex md:flex lg:max-h-screen lg:h-screen md:flex-row items-center justify-between mx-auto overflow-hidden">
        {/* Left Section */}
        <div className="min-[1440px]:px-[40px] min-[1440px]:mt-[30px] xl:px-24 lg:px-12 lg:py-36 md:mx-auto md:px-3 xl:w-6/12 md:w-6/12 h-full xl:pb-0 md:pb-0 pb-12 flex flex-col justify-center">
          
          <div className="min-[2035px]:px-[200px] lg:px-12 xl:px-36 md:px-0">
            <div className="md:text-start text-center lg:my-4 my-8">
              <h1 className="text-3xl font-bold mb-4 md:text-start text-center">Become Tutor</h1>
              <h3 className="text-[#475467] text-[16px]">Please enter your details.</h3>
            </div>
            <Form
              className="md:px-0 px-6 md:mx-0 mx-auto"
              name="signin"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ maxWidth: "400px", width: "100%" }}
            >
              <Form.Item
                label={<label className="text-sm text-[#344054] font-medium">Name*</label>}
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
                required={false}
              >
                <Input
                  className="min-[2035px]:w-[500px] min-[2035px]:h-[50px] min-[375px]:w-[330px] min-[320px]:w-[290px] w-[360px] h-[44px] border border-[#D0D5DD] p-2 text-[16px] text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#dde2eb]"
                  placeholder="Enter your Name"
                />
              </Form.Item>

              <Form.Item
                label={<label className="text-sm text-[#344054] font-medium">Email*</label>}
                name="email"
                rules={[{ required: true, message: "Please input your email!", type: "email" }]}
                required={false}
              >
                <Input
                  className="min-[2035px]:w-[500px] min-[2035px]:h-[50px] min-[375px]:w-[330px] min-[320px]:w-[290px]  w-[360px] h-[44px] border border-[#D0D5DD] p-2 text-[16px] text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#dde2eb]"
                  placeholder="Enter your email"
                />
              </Form.Item>


                <Form.Item
                
                label={  <label
                  htmlFor="education-levels"
                  className="text-sm text-[#344054] font-medium"
                >
                  Which education levels are you interested in tutoring?*
                </label>}
                >

                 <div >
    
      <Select
       className="min-[2035px]:w-[500px] min-[2035px]:h-[50px] min-[375px]:w-[330px] min-[320px]:w-[290px]  w-[360px] h-[44px] border border-[#D0D5DD] p-2 text-[16px] text-[#667085] font-normal hover:border-[#D0D5DD] focus:border-[#dde2eb]"
                
        id="education-levels"
        mode="multiple" // Enables multiple selections
        allowClear // Adds a clear button
       
        placeholder="Select education levels"
       
   
      >
        <Option value="Primary">Primary</Option>
        <Option value="Middle School">Middle School</Option>
        <Option value="High School">High School</Option>
        <Option value="College">College</Option>
        <Option value="Graduate">Graduate</Option>
        <Option value="Post-Graduate">Post-Graduate</Option>
      </Select>
    </div>  
                  
                  
                </Form.Item>          

              <Form.Item className=" min-[2035px]:w-[500px] min-[2035px]:h-[50px] min-[375px]:w-[330px] min-[320px]:w-[290px]  w-[360px] h-[44px]">
                <Link href="/auth/signup/intarest">
                <Button style={{backgroundColor:'#14698A'}} className="text-[#FFFFFF] text-[16px] font-semibold p-6" size="" type="primary" htmlType="submit" block>
                Submit
                </Button>
               </Link>
              </Form.Item>

       
            </Form>
        
          </div>
        </div>

        {/* Right Section (Carousel) */}
        <div className="order-first md:order-last h-screen overflow-hidden md:w-6/12">
          <Image src={tutorimg} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
