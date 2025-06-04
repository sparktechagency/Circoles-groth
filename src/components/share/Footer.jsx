"use client";

import React from "react";
import logo from "/public/images/footerlogo.png";
import Image from "next/image";
import { Button } from "antd";
import {
  GlobalOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  TwitterOutlined,
  PhoneOutlined,
  MailFilled,
} from "@ant-design/icons";
import Link from "next/link";

import { Select } from "antd";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes("/auth")) return null;

  return (
    <div>
      <footer className="px-4 divide-y bg-[#000000] text-gray-100 relative z-50">
        <div className="px-4">
          <div className=" flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
            {/* left side menu  */}
            <div className="lg:w-1/3 text-[#F9FAFB] text-sm font-normal space-y-4">
              <div
                rel="noopener noreferrer"
                href="#"
                className="flex justify-start space-x-3 lg:justify-start pb-4"
              >
                <Image src={logo} alt="Pantagonostis" />
              </div>
              <p>
                {" "}
                <Link href={"/becomeInstructor"}>Become an Instructor</Link>
              </p>
              <p>About us</p>

              {/* <Button
                className="text-[#FFFFFF] hover:text-white bg-[#000000] hover:bg-[#000000] border-[1px]  border-[#E4E7EC] text-[16px] font-semibold p-6"
                size="large"
                type="primary"
              >
                English <GlobalOutlined />
              </Button> */}
            </div>
            {/* right side menu items  */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  text-sm gap-x-3 gap-y-8 lg:w-2/3 w-full">
              {/* MENU ITEM ONE  */}
              <div className="space-y-3 text-start">
                <h3 className="  text-[#FFFFFF] font-bold text-[16px] pb-3 font-Merriweather">
                  Programs
                </h3>
                <div className="flex   gap-6">
                  <ul className="space-y-[12px] text-[#E4E7EC] text-sm">
                    <li>
                      <Link rel="noopener noreferrer" href="#">
                        Art & Design
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="#">
                        Development
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="#">
                        Communication
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="#">
                        Videography
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="#">
                        Photography
                      </Link>
                    </li>
                  </ul>
                  <ul className="space-y-[12px] text-[#E4E7EC] text-sm">
                    <li>
                      <Link rel="noopener noreferrer" href="#">
                        Marketing
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="#">
                        Content Writing
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="#">
                        Finance
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="#">
                        Science
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="#">
                        Networking
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* MENU ITEM TWO  */}
              <div className="space-y-3 pl-12">
                <h3 className="  text-[#FFFFFF] font-bold text-[16px] pb-3 font-Merriweather">
                  Help & Support
                </h3>
                <ul className="space-y-[12px] text-[#E4E7EC] text-sm">
                  <li>
                    <Link rel="noopener noreferrer" href="/FAQS">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link rel="noopener noreferrer" href="/contactUs">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link rel="noopener noreferrer" href="/PrivacyAndPolicy">
                      Privacy & Policy
                    </Link>
                  </li>
                  <li>
                    <Link rel="noopener noreferrer" href="/TermsAndConditions">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link rel="noopener noreferrer" href="/courseEnrolmentHelp">
                      Course Enrollment Help
                    </Link>
                  </li>
                </ul>
              </div>
              {/* SOCIAL MEDIA MENU ITEM   */}
              <div className="space-y-3">
                <div className="text-[#E4E7EC] text-[16px] font-semibold space-y-4 pt-4">
                  <div>
                    <PhoneOutlined className="rotate-90 text-lg text-[#4BCAE9] pr-2" />
                    <span className="text-[#E4E7EC]">+(00)-000-000-0000</span>
                  </div>
                  <div className="pl-2">
                    <MailFilled className=" text-lg text-[#4BCAE9] pr-2" />
                    <span className="text-[#E4E7EC]">
                      support@circooles.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* copyright  */}
          <div className="flex justify-center  border-t-2 border-[#475467] py-4">
            <p className="text-sm text-[#E4E7EC]">
              © Circooles 2025 | All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
