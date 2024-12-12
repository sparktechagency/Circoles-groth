"use client";

import { Button, Card, Descriptions } from "antd";
import React from "react";
import avater from '/public/images/profile.png'
import Image from "next/image";
import { useRouter } from "next/navigation";
const PublishToCommunity = () => {
    const router=useRouter()
    return (
        <div className="p-6 bg-white min-h-screen ">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Publish to Community</h1>
               
          <div className="flex justify-end gap-4 items-center py-6">
            <Button
              onClick={() => router.back()}
              style={{ height: "44px", fontSize: "16px", fontWeight: 400 }}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              style={{
                height: "44px",
                fontSize: "16px",
                fontWeight: 400,
                backgroundColor: "#14698A",
                color: "#FFFFFF",
              }}
              type="primary"
            >
              Save changes
            </Button>
          </div>
            </div>

            {/* Subtitle */}
            <p className="text-[#667085] mb-8">
                A well-crafted profile boosts your visibility and connects you with
                learners eager to learn from you.{" "}
                <a href="#" className="text-blue-600">
                    Learn More
                </a>
            </p>

            <div className="bg-[#FFFCF5] p-4 rounded-lg flex items-center space-x-4 ">
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9998 8.00118V12.0012M11.9998 16.0012H12.0098M10.2898 2.86118L1.81978 17.0012C1.64514 17.3036 1.55274 17.6465 1.55177 17.9957C1.55079 18.3449 1.64127 18.6883 1.8142 18.9917C1.98714 19.2951 2.2365 19.5479 2.53748 19.725C2.83847 19.9021 3.18058 19.9973 3.52978 20.0012H20.4698C20.819 19.9973 21.1611 19.9021 21.4621 19.725C21.7631 19.5479 22.0124 19.2951 22.1854 18.9917C22.3583 18.6883 22.4488 18.3449 22.4478 17.9957C22.4468 17.6465 22.3544 17.3036 22.1798 17.0012L13.7098 2.86118C13.5315 2.56729 13.2805 2.3243 12.981 2.15567C12.6814 1.98703 12.3435 1.89844 11.9998 1.89844C11.656 1.89844 11.3181 1.98703 11.0186 2.15567C10.7191 2.3243 10.468 2.56729 10.2898 2.86118Z" stroke="#F79009" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>
                <p className="text-[14px] text-[#344054] ">Please note: You cannot publish your tutor profile until your documents have been verified. Ensure all required documents are uploaded for review. Once verified, you’ll be able to share your profile with students. <span className="text-[#F79009]">Verify Documents</span> </p>
            </div>

            {/* Content Section */}
            <div className="bg-white  ">
                {/* Basic Info */}
                <div


                    className="mb-6 mt-8"

                >
                    <h3 className="text-xl font-blod text-[#000000] py-4">Basic Info</h3>
                    <div className=" gap-6">
                        <Image
                            src={avater}
                            alt="Profile"
                            className="w-24 h-24 object-cover my-4 "
                        />
                        <Descriptions column={1} className="w-full">
                            <Descriptions.Item label="Full Name">John Doe</Descriptions.Item>
                            <Descriptions.Item label="Email">johndoe@gmail.com</Descriptions.Item>
                            <Descriptions.Item label="Phone Number">
                                +123 4587 7875
                            </Descriptions.Item>
                            <Descriptions.Item label="Address">
                                123 Main Street, New York
                            </Descriptions.Item>


                            <span className="text-[#667085] opacity-70">Decription</span>
                            <div className="text-[#344054]">
                                Explore the features and functionality of our platform with this
                                interactive demo. Get a hands-on experience of how our tools
                                can simplify your tasks, enhance productivity, and drive
                                results. In this demo, you'll discover intuitive navigation,
                                customizable settings, and powerful integrations designed to
                                meet your needs. Dive in and see firsthand how easy it is to
                                streamline your workflow and achieve more with our platform.

                            </div>
                        </Descriptions>
                    </div>
                </div>

                {/* Professional Info */}
                <div

                    className="mb-6"

                >

                    <h3 className="text-xl font-blod text-[#000000] py-4">Professional Info</h3>
                    <Descriptions column={1}>
                        <Descriptions.Item label="Subject Taught">
                            Physics, Chemistry, Biology
                        </Descriptions.Item>
                        <Descriptions.Item label="Designation">
                            Assistant Professor
                        </Descriptions.Item>
                        <Descriptions.Item label="Organization">
                            City University
                        </Descriptions.Item>
                        <Descriptions.Item label="Teaching Experience">
                            6 Years
                        </Descriptions.Item>
                        <Descriptions.Item label="Expertise Area">
                            Data Structure
                        </Descriptions.Item>
                    </Descriptions>
                </div>

                {/* Qualifications */}
                <div

                    className="mb-6"

                >
                    <h3 className="text-xl font-blod text-[#000000] py-4">Qualifications</h3>
                    <Descriptions column={1}>
                        <Descriptions.Item label="Degree">MSC</Descriptions.Item>
                        <Descriptions.Item label="Institute">
                            Daffodil International University
                        </Descriptions.Item>
                        <Descriptions.Item label="Year of Graduation">
                            2018
                        </Descriptions.Item>
                    </Descriptions>
                </div>

                {/* Availability */}
                <div

                    className="mb-6"

                >
                    <h3 className="text-xl font-blod text-[#000000] py-4">Availability</h3>
                    <Descriptions column={1}>
                        <Descriptions.Item label="Availability Status">
                            In-person
                        </Descriptions.Item>
                        <Descriptions.Item label="Available Days">
                            Saturday, Sunday, Monday
                        </Descriptions.Item>
                        <Descriptions.Item label="Free Hours">
                            10:00 am–11:00 am <br /> 3:00 pm–4:00 pm
                        </Descriptions.Item>
                        <Descriptions.Item label="Time Zone">America</Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        </div>
    );
};

export default PublishToCommunity;
