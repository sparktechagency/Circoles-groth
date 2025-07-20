"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Calendar,
  Card,
  message,
  Steps,
  Tag,
  Divider,
  Alert,
  TimePicker,
  Row,
  Col,
  Popover,
} from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useGetinstrucotorDetialsQuery } from "../../../../../../redux/features/CourseApi";

import Swal from "sweetalert2";
import { useBookAtutorMutation } from "../../../../../../redux/features/tutorapis/TutorApi";

dayjs.extend(weekday);
dayjs.extend(localeData);

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState([null, null]);
  const [availability, setAvailability] = useState({});
  const [weeklyAvailability, setWeeklyAvailability] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params?.id;
  const type = searchParams.get("type");
  const cost = searchParams.get("cost");
  const [bookAtutor, { isLoading: isBookAtutorLoading }] =
    useBookAtutorMutation();
  const { data, isLoading } = useGetinstrucotorDetialsQuery(id);

  useEffect(() => {
    if (data?.tutor) {
      const schedule =
        type === "online" ? data.tutor.online : data.tutor.offline;
      const { processedAvailability, weeklyAvail } =
        processAvailability(schedule);
      setAvailability(processedAvailability);
      setWeeklyAvailability(weeklyAvail);
    }
  }, [data, type]);

  const processAvailability = (schedule) => {
    const availabilityMap = {};
    const weeklyAvailabilityMap = {};

    if (schedule?.length > 0) {
      schedule.forEach((slot) => {
        weeklyAvailabilityMap[slot.day.toLowerCase()] = slot.time;
      });

      for (let i = 0; i < 30; i++) {
        const date = dayjs().add(i, "day");
        const dayName = date.format("dddd").toLowerCase();
        const daySchedule = schedule.find(
          (item) => item.day.toLowerCase() === dayName
        );

        if (daySchedule) {
          availabilityMap[date.format("YYYY-MM-DD")] = daySchedule.time;
        }
      }
    }

    return {
      processedAvailability: availabilityMap,
      weeklyAvail: weeklyAvailabilityMap,
    };
  };

  const handleContinue = async () => {
    if (!selectedDate || !selectedTimeRange[0] || !selectedTimeRange[1]) {
      message.error("Please select a date and valid time slot!");
      return;
    }

    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const formattedTime = `${selectedTimeRange[0].format(
      "hh:mm a"
    )} - ${selectedTimeRange[1].format("hh:mm a")}`;
    const numericCost = cost.replace(/\$/g, "").trim();
    // Create form data with proper structure
    const formData = new FormData();
    formData.append("tutor_id", id);
    formData.append("schedule[0][date]", formattedDate);
    formData.append("schedule[0][time]", formattedTime);
    formData.append("session_cost", numericCost);
    formData.append("type", type);
    formData.append("redirect_url", process.env.NEXT_PUBLIC_REDIRECT_URL_TUTOR);

    try {
      const response = await bookAtutor(formData).unwrap();
      console.log("api response", response);
      if (response.success) {
        router.push(response?.payment_url);
      } else {
        message.error(response.message || "Booking failed");
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire(
        "Error",
        error?.data?.message || "Failed to book session",
        "error"
      );
    }
  };

  const handleDateSelect = (date) => {
    const dayName = date.format("dddd").toLowerCase();
    if (weeklyAvailability[dayName]) {
      setSelectedDate(date);
      setSelectedTimeRange([null, null]);
      message.success(`Select a time between ${weeklyAvailability[dayName]}`);
    } else {
      message.warning(`Tutor is not available on ${date.format("dddd")}`);
    }
  };

  const disabledDate = (current) => {
    const dayName = current.format("dddd").toLowerCase();
    return (
      current.isBefore(dayjs().subtract(1, "day")) ||
      !weeklyAvailability[dayName]
    );
  };

  const disabledTime = (current) => {
    if (!selectedDate) return { disabledHours: () => [] };

    const dayName = selectedDate.format("dddd").toLowerCase();
    const availableRange = weeklyAvailability[dayName];
    if (!availableRange) return { disabledHours: () => [] };

    const [startStr, endStr] = availableRange.split(" - ");
    const startHour = dayjs(startStr, "hh:mm a").hour();
    const endHour = dayjs(endStr, "hh:mm a").hour();

    const disabledHours = [];
    for (let i = 0; i < 24; i++) {
      if (i < startHour || i > endHour) {
        disabledHours.push(i);
      }
    }

    return { disabledHours: () => disabledHours };
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">Loading tutor availability...</div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Steps current={0} className="mb-8">
        <Steps.Step title="Schedule" />
        <Steps.Step title="Payment" />
        <Steps.Step title="Confirmation" />
      </Steps>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Book {type === "online" ? "Online" : "In-Person"} Session
        </h1>
        <p className="text-gray-600">{cost} per session</p>
      </div>

      <Card className="mb-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Tutor's Weekly Availability
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(weeklyAvailability).map(([day, time]) => (
              <Tag
                color="blue"
                key={day}
                className="px-3 py-1 text-sm font-medium"
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}: {time}
              </Tag>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Select Session Date
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <span className="text-sm">Unavailable</span>
            </div>
          </div>
        </div>

        <Calendar
          fullscreen={false}
          mode="month"
          disabledDate={disabledDate}
          onSelect={handleDateSelect}
          className="border rounded-lg p-2"
          headerRender={({ value, onChange }) => (
            <div className="flex justify-between items-center mb-4 px-2">
              <Button
                onClick={() => onChange(value.subtract(1, "month"))}
                className="flex items-center"
              >
                <span className="mr-1">←</span> Prev
              </Button>
              <div className="font-semibold text-gray-700">
                {value.format("MMMM YYYY")}
              </div>
              <Button
                onClick={() => onChange(value.add(1, "month"))}
                className="flex items-center"
              >
                Next <span className="ml-1">→</span>
              </Button>
            </div>
          )}
          dateCellRender={(value) => {
            const dayName = value.format("dddd").toLowerCase();
            const isAvailable = weeklyAvailability[dayName];
            const isSelected = selectedDate?.isSame(value, "day");
            const isToday = value.isSame(dayjs(), "day");
            const isPast = value.isBefore(dayjs(), "day");

            return (
              <Popover
                content={
                  isAvailable
                    ? `Available: ${weeklyAvailability[dayName]}`
                    : "Not available"
                }
                placement="top"
              >
                <div
                  className={`h-full p-1 rounded-lg flex flex-col ${
                    isSelected ? "bg-blue-50 border border-blue-200" : ""
                  } ${isToday ? "border border-blue-400" : ""} ${
                    isAvailable
                      ? "hover:bg-gray-50 cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-sm font-medium ${
                        isAvailable ? "text-gray-800" : "text-gray-400"
                      } ${isSelected ? "text-blue-600" : ""}`}
                    >
                      {value.date()}
                    </span>
                    {isToday && (
                      <span className="text-xs bg-blue-500 text-white px-1 rounded">
                        Today
                      </span>
                    )}
                  </div>
                  {isAvailable && !isPast && (
                    <div className="text-xs text-green-600 mt-1 truncate">
                      {weeklyAvailability[dayName]}
                    </div>
                  )}
                </div>
              </Popover>
            );
          }}
        />

        {selectedDate &&
          weeklyAvailability[selectedDate.format("dddd").toLowerCase()] && (
            <div className="mt-8">
              <Divider orientation="left" className="text-gray-800 font-medium">
                Select Time for {selectedDate.format("dddd, MMMM D")}
              </Divider>

              <Row gutter={16} className="mt-4">
                <Col xs={24} sm={12}>
                  <div className="mb-2 text-gray-700">Start Time</div>
                  <TimePicker
                    format="hh:mm a"
                    minuteStep={15}
                    disabledTime={disabledTime}
                    onChange={(time) =>
                      setSelectedTimeRange([time, selectedTimeRange[1]])
                    }
                    className="w-full"
                    placeholder="Start time"
                    size="large"
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <div className="mb-2 text-gray-700">End Time</div>
                  <TimePicker
                    format="hh:mm a"
                    minuteStep={15}
                    disabledTime={disabledTime}
                    onChange={(time) =>
                      setSelectedTimeRange([selectedTimeRange[0], time])
                    }
                    className="w-full"
                    placeholder="End time"
                    size="large"
                  />
                </Col>
              </Row>

              {selectedTimeRange[0] && selectedTimeRange[1] && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Your Selection
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700">
                        <span className="font-medium">Date:</span>{" "}
                        {selectedDate.format("dddd, MMMM D, YYYY")}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Time:</span>{" "}
                        <Tag color="blue">
                          {selectedTimeRange[0].format("hh:mm a")} -{" "}
                          {selectedTimeRange[1].format("hh:mm a")}
                        </Tag>
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <span className="font-medium">Type:</span>{" "}
                        <Tag color={type === "online" ? "blue" : "green"}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Tag>
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Price:</span> ${cost}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        <div className="flex justify-end gap-4 mt-8">
          <Button onClick={() => router.back()} className="min-w-[120px] h-10">
            Cancel
          </Button>
          <button
            type="primary"
            onClick={handleContinue}
            disabled={!selectedTimeRange[0] || !selectedTimeRange[1]}
            className="min-w-[120px] h-10 bg-primary hover:bg-primary text-white rounded-md"
          >
            {isBookAtutorLoading ? "Loading..." : "Continue"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SchedulePage;
