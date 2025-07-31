"use client";

import { Badge } from "antd";
import { Header } from "antd/es/layout/layout";
import { usePathname, useRouter } from "next/navigation";
import { useGetOwnprofileQuery } from "../../redux/features/AuthApi";

const TopHeader = ({ isOpen }) => {
  const { data: usrData } = useGetOwnprofileQuery();
  const userinfo = usrData?.user?.[0];
  console.log("usrData", usrData);
  const pathname = usePathname();
  const router = useRouter();
  const getTitle = () => {
    switch (pathname) {
      case "/UserDashboard":
        return (
          <div className=" ">
            <h1 className="text-[#333333] font-bold text-[24px] font-Merriweather pb-0">
              Welcome back, Emily
            </h1>
          </div>
        );
      case "/TutorDashboard":
        return (
          <div className=" ">
            <h1 className="text-[#333333] font-bold text-[24px] font-Merriweather pb-0">
              Dashboard analytics
            </h1>
          </div>
        );

      case "/AdminDashboard":
        return (
          <div className=" ">
            <h1 className="text-[#333333] font-bold text-[24px] font-Merriweather pb-0">
              Welcome back, Alestra
            </h1>
          </div>
        );

      case "/UserDashboard/EnrolledCourses/EnroledCourseDetails":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Recorded classes
            </h1>
          </div>
        );
      case "/UserDashboard/EnrolledCourses":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Enrolled Courses
            </h1>
          </div>
        );
      case "/accountSeetings":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              accountSeetings
            </h1>
          </div>
        );
      case "/TutorDashboard/Earning":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">Finance</h1>
          </div>
        );
      case "/TutorDashboard/TutorProfileSetup":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              TutorProfileSetup
            </h1>
          </div>
        );
      case "/TutorDashboard/publishToComunity":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">Publish</h1>
          </div>
        );
      case "/TutorDashboard/Verification":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Tutor verification section
            </h1>
          </div>
        );
      case "/UserDashboard/MyTutor":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">My tutors</h1>
          </div>
        );
      case "/UserDashboard/UpcomingSession":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">Session</h1>
          </div>
        );
      case "/UserDashboard/UseraccountSeetings":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              accountSeetings
            </h1>
          </div>
        );
      case "/AdminDashboard/CreateNewcourse":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              CreateNewcourse
            </h1>
          </div>
        );
      case "/AdminDashboard/OnlinePrograms":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Manage Courses
            </h1>
          </div>
        );
      case "/AdminDashboard/ManageUsers":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              ManageUsers
            </h1>
          </div>
        );
      case "/AdminDashboard/Verification":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Verification
            </h1>
          </div>
        );
      case "/AdminDashboard/transaction":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              transaction
            </h1>
          </div>
        );

      case "/TutorDashboard/UpcomingSession":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              UpcomingSession
            </h1>
          </div>
        );
      case "/TutorDashboard/TutorProfileSetupStep-1":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Profile Setup-1
            </h1>
          </div>
        );
      case "/TutorDashboard/TutorProfileSetupStep-2":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Profile Setup
            </h1>
          </div>
        );
      case "/TutorDashboard/TutorProfileSetupStep-3":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Profile Setup
            </h1>
          </div>
        );
      case "/TutorDashboard/TutorProfileSetupStep-4":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Profile Setup
            </h1>
          </div>
        );

      case "/TutorDashboard/Verification/verificationStep1":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Tutor verification
            </h1>
          </div>
        );
      case "/TutorDashboard/Verification/verificationStep2":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Tutor verification
            </h1>
          </div>
        );
      case "/TutorDashboard/Verification/verificationStep3":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Tutor verification
            </h1>
          </div>
        );
      case "/TutorDashboard/TutorProfileSetupStep-4":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Tutor verification
            </h1>
          </div>
        );
      case "/TutorDashboard/Verification/verificationFee":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Tutor verification Fee
            </h1>
          </div>
        );
      case "/TutorDashboard/accountSeetings":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
              Tutor AccountSeetings
            </h1>
          </div>
        );
    }
  };
  const handleNotifications = () => {
    console.log("clicked");
    router.push("/notifications");
  };
  return (
    <div>
      <Header
        style={{
          background: "#F6F6F6",
          height: "80px",
          paddingTop: "20px",

          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div className="w-full justify-between flex items-center">
          <div className="">{getTitle()}</div>
          <div
            onClick={handleNotifications}
            className="cursor-pointer"
            style={{ zIndex: 11 }} // Ensure the badge has a higher z-index than other elements
          >
            <Badge color="#f79009" count={userinfo?.unread_notifications_count}>
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.73 20C11.5542 20.3031 11.3018 20.5547 10.9982 20.7295C10.6946 20.9044 10.3504 20.9965 10 20.9965C9.64962 20.9965 9.30539 20.9044 9.00177 20.7295C8.69816 20.5547 8.44581 20.3031 8.27 20M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z"
                  stroke="#101828"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Badge>
          </div>
        </div>
      </Header>
    </div>
  );
};
export default TopHeader;
