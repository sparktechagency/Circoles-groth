"use client";

import React, { useState } from "react";
import {
  Steps,
  Form,
  Input,
  Select,
  Button,
  Switch,
  message,
  TimePicker,
} from "antd";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const { Step } = Steps;
const { Option } = Select;

const Availability = () => {
  const [isInPerson, setIsInPerson] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [timeZone, setTimeZone] = useState("GMT+6");
  const [sessionCharge, setSessionCharge] = useState("");
  const [offlineAvailability, setOfflineAvailability] = useState([]);
  const [onlineAvailability, setOnlineAvailability] = useState([]);
  const [currentStep] = useState(3);
  const [form] = Form.useForm();
  const router = useRouter();

  const daysOfWeek = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  const handleAddAvailability = (type, day, startTime, endTime) => {
    if (!day) {
      message.error("Please select a day");
      return;
    }
    if (!startTime || !endTime) {
      message.error("Please select start and end time");
      return;
    }

    const newSlot = {
      day: day.toLowerCase(),
      time: `${dayjs(startTime).format("hh:mm A")} - ${dayjs(endTime).format(
        "hh:mm A"
      )}`,
    };

    if (type === "offline") {
      setOfflineAvailability([...offlineAvailability, newSlot]);
    } else {
      setOnlineAvailability([...onlineAvailability, newSlot]);
    }

    message.success("Time slot added!");
    form.resetFields([`${type}Day`, `${type}StartTime`, `${type}EndTime`]);
  };

  const handleRemoveAvailability = (type, index) => {
    if (type === "offline") {
      setOfflineAvailability(offlineAvailability.filter((_, i) => i !== index));
    } else {
      setOnlineAvailability(onlineAvailability.filter((_, i) => i !== index));
    }
  };

  const handleFormSubmit = () => {
    const formData = {
      time_zone: timeZone,
      online: onlineAvailability,
      offline: offlineAvailability,
      session_charge: sessionCharge,
    };

    console.log("formData", formData);

    localStorage.setItem("profilesetup4", JSON.stringify(formData));
    router.push("/TutorDashboard/publishToComunity");
  };

  return (
    <div className="flex gap-8 p-6 bg-white min-h-screen pt-8">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#F9FAFB] p-4 h-fit rounded-lg">
        <div className="py-6 space-y-2">
          <h1 className="text-xl font-bold">Welcome to Circooles</h1>
          <p className="text-sm text-[#667085]">
            Follow these steps to apply for an account on the Circooles Tutor
            Platform:
          </p>
        </div>

        <Steps direction="vertical" current={currentStep} className="text-left">
          <Step
            className="h-[60px] font-bold text-[#000000]"
            title="Basic Info"
          />
          <Step
            className="h-[60px] font-bold text-[#000000]"
            title="Professional Info"
          />
          <Step
            className="h-[60px] font-bold text-[#000000]"
            title="Qualifications"
          />
          <Step
            className="h-[60px] font-bold text-[#000000]"
            title="Availability"
          />
        </Steps>
      </div>

      {/* Main Form */}
      <div className="w-3/4 p-6 bg-white rounded-lg">
        <h1 className="text-lg mb-4 text-[30px] font-semibold pl-2 border-l-4 border-[#14698A]">
          Availability
        </h1>

        <Form form={form} onFinish={handleFormSubmit}>
          {/* In-Person Availability */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-4">
              <Switch
                checked={isInPerson}
                onChange={setIsInPerson}
                className="bg-gray-300"
              />
              <span className="ml-3 text-gray-700">
                I'm able to take session in-person
              </span>
            </div>

            {isInPerson && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Form.Item name="offlineDay" className="flex-1 mb-0">
                    <Select
                      placeholder="Select day"
                      className="w-full h-[44px] border bg-white rounded-md"
                    >
                      {daysOfWeek.map((day) => (
                        <Option key={day} value={day}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item name="offlineStartTime" className="flex-1 mb-0">
                    <TimePicker
                      format="hh:mm A"
                      className="w-full h-[44px] border bg-white rounded-md"
                      placeholder="Start Time"
                    />
                  </Form.Item>

                  <Form.Item name="offlineEndTime" className="flex-1 mb-0">
                    <TimePicker
                      format="hh:mm A"
                      className="w-full h-[44px] border bg-white rounded-md"
                      placeholder="End Time"
                    />
                  </Form.Item>

                  <Button
                    onClick={() => {
                      form
                        .validateFields([
                          "offlineDay",
                          "offlineStartTime",
                          "offlineEndTime",
                        ])
                        .then((values) => {
                          handleAddAvailability(
                            "offline",
                            values.offlineDay,
                            values.offlineStartTime,
                            values.offlineEndTime
                          );
                        })
                        .catch(() => {});
                    }}
                    className="h-[44px] bg-[#14698A] text-white"
                  >
                    Add
                  </Button>
                </div>

                {offlineAvailability.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">
                      In-Person Availability:
                    </h3>
                    <div className="space-y-2">
                      {offlineAvailability.map((slot, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-white rounded-lg border"
                        >
                          <span className="text-gray-700">
                            {slot.day.charAt(0).toUpperCase() +
                              slot.day.slice(1)}
                            : {slot.time}
                          </span>
                          <Button
                            danger
                            onClick={() =>
                              handleRemoveAvailability("offline", index)
                            }
                            size="small"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Online Availability */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-4">
              <Switch
                checked={isOnline}
                onChange={setIsOnline}
                className="bg-gray-300"
              />
              <span className="ml-3 text-gray-700">
                I'm able to take session online only
              </span>
            </div>

            {isOnline && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Form.Item name="onlineDay" className="flex-1 mb-0">
                    <Select
                      placeholder="Select day"
                      className="w-full h-[44px] border bg-white rounded-md"
                    >
                      {daysOfWeek.map((day) => (
                        <Option key={day} value={day}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item name="onlineStartTime" className="flex-1 mb-0">
                    <TimePicker
                      format="hh:mm A"
                      className="w-full h-[44px] border bg-white rounded-md"
                      placeholder="Start Time"
                    />
                  </Form.Item>

                  <Form.Item name="onlineEndTime" className="flex-1 mb-0">
                    <TimePicker
                      format="hh:mm A"
                      className="w-full h-[44px] border bg-white rounded-md"
                      placeholder="End Time"
                    />
                  </Form.Item>

                  <Button
                    onClick={() => {
                      form
                        .validateFields([
                          "onlineDay",
                          "onlineStartTime",
                          "onlineEndTime",
                        ])
                        .then((values) => {
                          handleAddAvailability(
                            "online",
                            values.onlineDay,
                            values.onlineStartTime,
                            values.onlineEndTime
                          );
                        })
                        .catch(() => {});
                    }}
                    className="h-[44px] bg-[#14698A] text-white"
                  >
                    Add
                  </Button>
                </div>

                {onlineAvailability.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Online Availability:</h3>
                    <div className="space-y-2">
                      {onlineAvailability.map((slot, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-white rounded-lg border"
                        >
                          <span className="text-gray-700">
                            {slot.day.charAt(0).toUpperCase() +
                              slot.day.slice(1)}
                            : {slot.time}
                          </span>
                          <Button
                            danger
                            onClick={() =>
                              handleRemoveAvailability("online", index)
                            }
                            size="small"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Time Zone and Session Charge */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <Form.Item
                label="Time Zone"
                name="timeZone"
                rules={[{ required: true, message: "Please select time zone" }]}
              >
                <Select
                  className="w-full h-[44px] border bg-white rounded-md"
                  value={timeZone}
                  onChange={setTimeZone}
                >
                  {[
                    "GMT",
                    "GMT+1",
                    "GMT+2",
                    "GMT+3",
                    "GMT+4",
                    "GMT+5",
                    "GMT+6",
                  ].map((zone) => (
                    <Option key={zone} value={zone}>
                      {zone}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Session Charge"
                name="sessionCharge"
                rules={[
                  { required: true, message: "Please enter session charge" },
                ]}
              >
                <Input
                  type="number"
                  value={sessionCharge}
                  onChange={(e) => setSessionCharge(e.target.value)}
                  className="w-full  bg-white rounded-md"
                  addonAfter="$"
                />
              </Form.Item>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              20% platform fee will be applied to your rate. You will receive
              KES12.00 after the fee.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="h-[44px] bg-[#14698A] text-white px-6"
            >
              Save Availability
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Availability;
