"use client";

import { Button, Card, Descriptions } from "antd";
import React from "react";
import avater from "/public/images/profile.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTutorProfileSetupMutation } from "../../../../redux/features/tutorapis/TutorApi";
import Swal from "sweetalert2";

const PublishToCommunity = () => {
  const router = useRouter();
  const [tutorProfileSetup, { isLoading }] = useTutorProfileSetupMutation();
  const base64ToFile = (base64Data, fileName, mimeType) => {
    const parts = base64Data.split(",");
    if (parts.length !== 2) {
      throw new Error("Invalid base64 string");
    }

    const byteString = atob(parts[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new File([ab], fileName, { type: mimeType });
  };
  const formData = new FormData();
  // Get all profile data from localStorage
  const profileSetup1 = JSON.parse(
    localStorage.getItem("profielsetup1") || "{}"
  );
  console.log("profielsetup1", profileSetup1);
  const base64String = localStorage.getItem("profileimage");
  const meta = JSON.parse(localStorage.getItem("profileimage_meta") || "{}");

  if (base64String && base64String.startsWith("data:image")) {
    const file = base64ToFile(
      base64String,
      meta.name || "avatar.jpg",
      meta.type || "image/jpeg"
    );
    formData.append("avatar", file); // ✅ Real File now
  }

  const profileSetup2 = JSON.parse(
    localStorage.getItem("profilesetup2") || "{}"
  );
  const profileSetup3 = JSON.parse(
    localStorage.getItem("profilesetup3") || "[]"
  );
  const profileSetup4 = JSON.parse(
    localStorage.getItem("profilesetup4") || "{}"
  );

  // Use actual file from input
  //   formData.append("avatar", profileSetup1.avatar);

  // Fix _method for Laravel
  formData.append("_method", "PUT");

  // Append all other fields
  formData.append("address", profileSetup1.address);
  formData.append("description", profileSetup1.description);
  formData.append("subjects_id", JSON.stringify(profileSetup2.subjects_id));
  formData.append("designation", profileSetup2.designation);
  formData.append("organization", profileSetup2.organization);
  formData.append("teaching_experience", profileSetup2.teaching_experience);
  formData.append("expertise_area", profileSetup2.expertise_area);
  if (Array.isArray(profileSetup3) && profileSetup3.length > 0) {
    const edu = profileSetup3[0];
    if (edu.language) formData.append("language", edu.language);
    if (edu.degree) formData.append("degree", edu.degree);
    if (edu.institute) formData.append("institute", edu.institute);

    const gradYear = parseInt(edu.graduation_year);
    if (!isNaN(gradYear)) {
      formData.append("graduation_year", gradYear);
    }
  }

  formData.append("time_zone", profileSetup4.time_zone);
  formData.append("session_charge", profileSetup4.session_charge);

  // Convert JSON fields
  formData.append("online", JSON.stringify(profileSetup4.online));
  formData.append("offline", JSON.stringify(profileSetup4.offline));

  const handleSubmit = async () => {
    formData.forEach((value, key) => console.log(key, value));

    try {
      const response = await tutorProfileSetup(formData).unwrap();
      console.log("response", response);
      if (response?.success) {
        localStorage.removeItem("profielsetup1");
        localStorage.removeItem("profilesetup2");
        localStorage.removeItem("profilesetup3");
        localStorage.removeItem("profilesetup4");
        Swal.fire("Success", response?.message, "success");
        router.push("/TutorDashboard");
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire("Opps!", "Something went wrong", "error");
    }

    // Here you would typically send the data to your backend
    // For now, we'll just log it and navigate
    // router.push("/TutorDashboard/success"); // Or wherever you want to navigate after submission
  };

  // Helper function to format time slots
  const formatTimeSlots = (slots) => {
    if (!slots || slots.length === 0) return "Not specified";
    return slots.map((slot) => `${slot.day}: ${slot.time}`).join(", ");
  };

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
            loading={isLoading}
            onClick={handleSubmit}
            style={{
              height: "44px",
              fontSize: "16px",
              fontWeight: 400,
              backgroundColor: "#14698A",
              color: "#FFFFFF",
            }}
            type="primary"
          >
            Submit for Review
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9998 8.00118V12.0012M11.9998 16.0012H12.0098M10.2898 2.86118L1.81978 17.0012C1.64514 17.3036 1.55274 17.6465 1.55177 17.9957C1.55079 18.3449 1.64127 18.6883 1.8142 18.9917C1.98714 19.2951 2.2365 19.5479 2.53748 19.725C2.83847 19.9021 3.18058 19.9973 3.52978 20.0012H20.4698C20.819 19.9973 21.1611 19.9021 21.4621 19.725C21.7631 19.5479 22.0124 19.2951 22.1854 18.9917C22.3583 18.6883 22.4488 18.3449 22.4478 17.9957C22.4468 17.6465 22.3544 17.3036 22.1798 17.0012L13.7098 2.86118C13.5315 2.56729 13.2805 2.3243 12.981 2.15567C12.6814 1.98703 12.3435 1.89844 11.9998 1.89844C11.656 1.89844 11.3181 1.98703 11.0186 2.15567C10.7191 2.3243 10.468 2.56729 10.2898 2.86118Z"
              stroke="#F79009"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-[14px] text-[#344054] ">
          Please note: You cannot publish your tutor profile until your
          documents have been verified. Ensure all required documents are
          uploaded for review. Once verified, you'll be able to share your
          profile with students.{" "}
          <span className="text-[#F79009]">Verify Documents</span>{" "}
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white">
        {/* Basic Info */}
        <div className="mb-6 mt-8">
          <h3 className="text-xl font-bold text-[#000000] py-4">Basic Info</h3>
          <div className="gap-6">
            {profileSetup1.previewimage && (
              <img
                src={profileSetup1.previewimage}
                alt="Profile"
                className="w-24 h-24 object-cover my-4 rounded-full"
              />
            )}
            <Descriptions column={1} className="w-full">
              <Descriptions.Item label="Address">
                {profileSetup1.address || "Not specified"}
              </Descriptions.Item>
              <span className="text-[#667085] opacity-70">Description</span>
              <div className="text-[#344054]">
                {profileSetup1.description || "No description provided"}
              </div>
            </Descriptions>
          </div>
        </div>

        {/* Professional Info */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#000000] py-4">
            Professional Info
          </h3>

          <Descriptions column={1}>
            <Descriptions.Item label="Designation">
              {profileSetup2.designation || "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Organization">
              {profileSetup2.organization || "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Teaching Experience">
              {profileSetup2.teaching_experience
                ? `${profileSetup2.teaching_experience} years`
                : "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Expertise Area">
              {profileSetup2.expertise_area || "Not specified"}
            </Descriptions.Item>
          </Descriptions>
        </div>

        {/* Qualifications */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#000000] py-4">
            Qualifications
          </h3>
          {profileSetup3.length > 0 ? (
            profileSetup3.map((qual, index) => (
              <Descriptions key={index} column={1} className="mb-4">
                <Descriptions.Item label="Degree">
                  {qual.degree || "Not specified"}
                </Descriptions.Item>
                <Descriptions.Item label="Institute">
                  {qual.institute || "Not specified"}
                </Descriptions.Item>
                <Descriptions.Item label="Year of Graduation">
                  {qual.graduation_year || "Not specified"}
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <p>No qualifications added</p>
          )}
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#000000] py-4">
            Availability
          </h3>
          <Descriptions column={1}>
            <Descriptions.Item label="Availability Status">
              {profileSetup4.online && profileSetup4.offline
                ? "Online and In-person"
                : profileSetup4.online
                ? "Online only"
                : profileSetup4.offline
                ? "In-person only"
                : "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Time Zone">
              {profileSetup4.time_zone || "Not specified"}
            </Descriptions.Item>
            <Descriptions.Item label="Session Charge">
              {profileSetup4.session_charge
                ? `$${profileSetup4.session_charge}`
                : "Not specified"}
            </Descriptions.Item>
            {profileSetup4.online && profileSetup4.online.length > 0 && (
              <Descriptions.Item label="Online Availability">
                {formatTimeSlots(profileSetup4.online)}
              </Descriptions.Item>
            )}
            {profileSetup4.offline && profileSetup4.offline.length > 0 && (
              <Descriptions.Item label="In-person Availability">
                {formatTimeSlots(profileSetup4.offline)}
              </Descriptions.Item>
            )}
          </Descriptions>
        </div>
      </div>
    </div>
  );
};

export default PublishToCommunity;
