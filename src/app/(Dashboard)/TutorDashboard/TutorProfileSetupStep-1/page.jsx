"use client";
import React, { useState, useEffect } from "react"; // useEffect ইম্পোর্ট করুন
import { useRouter } from "next/navigation";

const BasicInfo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formValues, setFormValues] = useState({
    address: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  console.log("file", file);
  useEffect(() => {
    const savedDataString = localStorage.getItem("tutorProfileData");
    if (savedDataString) {
      const savedData = JSON.parse(savedDataString);

      if (savedData.basicInfo) {
        setFormValues(savedData.basicInfo);
        if (savedData.basicInfo.avatarDataUrl) {
          setPreview(savedData.basicInfo.avatarDataUrl);
        }
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;

        setPreview(base64); // For preview image

        // ✅ Save base64 in localStorage, NOT the file
        localStorage.setItem("profileimage", base64);

        // Optional: store file info metadata
        localStorage.setItem(
          "profileimage_meta",
          JSON.stringify({
            name: selectedFile.name,
            type: selectedFile.type,
          })
        );
      };

      reader.readAsDataURL(selectedFile); // ✅ Convert file to base64
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!preview) newErrors.avatar = "Please upload a profile picture!";
    if (!formValues.address.trim())
      newErrors.address = "Please input your address!";
    if (!formValues.description.trim())
      newErrors.description = "Please input a description!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const existingDataString = localStorage.getItem("profielsetup1");
      const existingData = existingDataString
        ? JSON.parse(existingDataString)
        : {};

      const basicInfoData = {
        previewimage: preview,
        avatar: {
          name: file?.name,
          type: file?.type,
          size: file?.size,
          lastModified: file?.lastModified,
        },
        address: formValues.address,
        description: formValues.description,
      };

      localStorage.setItem("profielsetup1", JSON.stringify(basicInfoData));

      router.push("/TutorDashboard/TutorProfileSetupStep-2");
    }
  };

  return (
    <div className="lg:flex flex-cols gap-8 p-6 bg-white min-h-screen pt-8">
      {/* Sidebar */}
      <div className="lg:w-1/4 w-full bg-[#F9FAFB] p-4 h-fit rounded-lg">
        <div className="py-6 space-y-2">
          <h1 className="text-xl font-bold">Welcome to LearnenTech</h1>
          <p className="text-sm text-[#667085]">
            Follow these steps to apply for an account on the LearnenTech Tutor
            Platform:
          </p>
        </div>

        <div className="flex flex-col space-y-4 mt-4">
          <div
            className={`flex items-center h-[60px] ${
              currentStep >= 0 ? "font-bold text-[#14698A]" : "text-[#000000]"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 0 ? "bg-[#14698A] text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span>Basic Info</span>
          </div>
          <div
            className={`flex items-center h-[60px] ${
              currentStep >= 1 ? "font-bold text-[#14698A]" : "text-[#000000]"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 1 ? "bg-[#14698A] text-white" : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span>Professional Info</span>
          </div>
          <div
            className={`flex items-center h-[60px] ${
              currentStep >= 2 ? "font-bold text-[#14698A]" : "text-[#000000]"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 2 ? "bg-[#14698A] text-white" : "bg-gray-200"
              }`}
            >
              3
            </div>
            <span>Qualifications</span>
          </div>
          <div
            className={`flex items-center h-[60px] ${
              currentStep >= 3 ? "font-bold text-[#14698A]" : "text-[#000000]"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 3 ? "bg-[#14698A] text-white" : "bg-gray-200"
              }`}
            >
              4
            </div>
            <span>Availability</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="lg:w-3/4 w-full">
        <h1 className="text-lg mb-4 text-[38px] font-semibold pl-2 border-l-4 border-[#14698A]">
          Basic Info
        </h1>
        <form className="pt-[48px] px-4" onSubmit={handleSubmit}>
          {/* Profile Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <div className="flex items-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-1 text-sm text-gray-600">
                        Click to upload
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
            {errors.avatar && (
              <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-6 mt-16">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14698A]`}
              placeholder="e.g. 123 Main Street, New York"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              maxLength={200}
              className={`w-full px-3 py-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14698A]`}
              rows={5}
              placeholder="Tell us about yourself..."
            />
            <div className="flex justify-between mt-1">
              <p className="text-sm text-gray-500">
                {formValues.description.length}/200 characters
              </p>
              <p className="text-sm text-[#475467]">
                Good description helps to engage more learners.
              </p>
            </div>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 items-center py-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ height: "44px", fontSize: "16px", fontWeight: 400 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#14698A] text-white rounded-lg hover:bg-[#115a75] transition-colors"
              style={{ height: "44px", fontSize: "16px", fontWeight: 400 }}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;
