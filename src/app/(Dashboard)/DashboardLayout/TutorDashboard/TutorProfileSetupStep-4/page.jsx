
// 'use client';

// import React, { useState } from "react";
// import { Steps, Form, Input, Select, Tag, Button, Switch, message } from "antd";
// import { useRouter } from "next/navigation";

// const { Step } = Steps;
// const { Option } = Select;

// const Availability = () => {


//   const [isInPerson, setIsInPerson] = useState(true);
//   const [isOnline, setIsOnline] = useState(false);
//   const [days, setDays] = useState([]);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [rate, setRate] = useState("");

//   const [currentSetp, setCurrentrSetps] = useState(3)
//   const [selectedSubjects, setSelectedSubjects] = useState(["Physics", "Chemistry", "Biology"]);
//   const suggestions = ["Physics", "Chemistry", "Biology", "Philosophy", "Architecture"];
//   const [form] = Form.useForm(); // Form instance
//   const router = useRouter();

//   const handleAddSubject = (subject) => {
//     if (selectedSubjects.length < 3 && !selectedSubjects.includes(subject)) {
//       setSelectedSubjects([...selectedSubjects, subject]);
//     }
//   };

//   const handleRemoveSubject = (removedSubject) => {
//     setSelectedSubjects(selectedSubjects.filter((subject) => subject !== removedSubject));
//   };

//   // Handle form submission
//   const handleFormSubmit = (values) => {
//     console.log({
//       ...values,
//       selectedSubjects,
//     });
// setCurrentrSetps(4)


//     router.push('/DashboardLayout/TutorDashboard/publishToComunity')
//   };


//   const handleDaySelection = (value) => {
//     setDays(value);
//   };

//   const addTimeSlot = (start, end) => {
//     if (start && end) {
//       setTimeSlots([...timeSlots, { start, end }]);
//       message.success("Time slot added!");
//     }
//   };

//   const removeTimeSlot = (index) => {
//     setTimeSlots(timeSlots.filter((_, i) => i !== index));
//   };


//   return (
//     <div className="flex gap-8 p-6 bg-white h-screen pt-8">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-[#F9FAFB] p-4 h-fit rounded-lg">
//         <div className="py-6 space-y-2">
//           <h1>Welcome to Circooles</h1>
//           <p className="text-sm text-[#667085]">
//             Follow these steps to apply for an account on the Circooles Tutor Platform:
//           </p>
//         </div>

//         <Steps direction="vertical" current={currentSetp} className="text-left">
//           <Step className="h-[60px] font-bold text-[#000000]" title="Basic Info" />
//           <Step className="h-[60px] font-bold text-[#000000]" title="Professional Info" />
//           <Step className="h-[60px] font-bold text-[#000000]" title="Qualifications" />
//           <Step className="h-[60px] font-bold text-[#000000]" title="Availability" />
//         </Steps>
//       </div>

//       <div className="p-6 w-full bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Availability</h2>

//       {/* In-Person Availability */}
//       <div className="mb-6">
//         <div className="flex items-center mb-4">
//           <Switch
//             checked={isInPerson}
//             onChange={(checked) => setIsInPerson(checked)}
//           />
//           <p className="ml-3">I’m able to take session in-person.</p>
//         </div>

//         {isInPerson && (
//           <div className="space-y-4">
//             <Select
        
//               mode="multiple"
//               placeholder="Select available days"
//               className="w-full border rounded-lg p-2"
//               onChange={handleDaySelection}
//               allowClear
//             >
//               {["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
//                 <Option key={day} value={day}>
//                   {day}
//                 </Option>
//               ))}
//             </Select>

//             <div className="flex space-x-4 items-center">
//               <Input placeholder="Start Time" className="w-1/2" type="time" />
//               <Input placeholder="End Time" className="w-1/2" type="time" />
//               <Button
//                 onClick={() =>
//                   addTimeSlot("10:00 AM", "11:00 AM") // Example: Replace with state inputs
//                 }
//                 className="bg-blue-500 text-white"
//               >
//                 Add
//               </Button>
//             </div>

//             <div className="mt-4">
//               {timeSlots.map((slot, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2"
//                 >
//                   <p>
//                     {slot.start} - {slot.end}
//                   </p>
//                   <Button
//                     danger
//                     onClick={() => removeTimeSlot(index)}
//                     size="small"
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Online Availability */}
//       <div className="mb-6">
//         <div className="flex items-center mb-4">
//           <Switch
//             checked={isOnline}
//             onChange={(checked) => setIsOnline(checked)}
//           />
//           <p className="ml-3">I’m able to take session online only.</p>
//         </div>

//         {isOnline && (
//           <div className="space-y-4">
//             <Select
//               mode="multiple"
//               placeholder="Select available days"
//               className="w-full"
//               onChange={handleDaySelection}
//               allowClear
//             >
//               {["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
//                 <Option key={day} value={day}>
//                   {day}
//                 </Option>
//               ))}
//             </Select>

//             <div className="flex space-x-4 items-center">
//               <Input classNames="h-[44px]" placeholder="Start Time" className="w-1/2" type="time" />
//               <Input classNames="h-[44px]" placeholder="End Time" className="w-1/2" type="time" />
//               <Button
//                 onClick={() =>
//                   addTimeSlot("10:00 AM", "11:00 AM") // Example: Replace with state inputs
//                 }
//                 className="bg-blue-500 text-white h-[44px]"
//               >
//                 Add
//               </Button>
//             </div>

//             <div className="mt-4">
//               {timeSlots.map((slot, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2"
//                 >
//                   <p>
//                     {slot.start} - {slot.end}
//                   </p>
//                   <Button
//                     danger
//                     onClick={() => removeTimeSlot(index)}
//                     size="small"
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Time Zone and Rate */}
//       <div className="mb-6">
//         <Select placeholder="Time Zone" className="w-full mb-4  h-[44px] border rounded-lg">
//           {["GMT", "EST", "PST", "IST"].map((zone) => (
//             <Option key={zone} value={zone}>
//               {zone}
//             </Option>
//           ))}
//         </Select>
//         <Input
//           placeholder="I will charge per session"
//           type="number"
//           value={rate}
//           onChange={(e) => setRate(e.target.value)}
//           className="w-full h-[44px]"
//         />
//         <p className="mt-2 text-sm text-gray-600">
//           20% platform fee will be applied to your rate. You will receive €12.00
//           after the fee.
//         </p>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Availability;


'use client';

import React, { useState } from "react";
import { Steps, Form, Input, Select, Tag, Button, Switch, message } from "antd";
import { useRouter } from "next/navigation";

const { Step } = Steps;
const { Option } = Select;

const Availability = () => {
  const [isInPerson, setIsInPerson] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [availability, setAvailability] = useState({});
  const [currentDay, setCurrentDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [rate, setRate] = useState("");

  const [currentStep, setCurrentStep] = useState(3);
  const [timeZone, setTimeZone] = useState("");

  const router = useRouter();

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const addTimeSlot = () => {
    if (!currentDay) {
      message.error("Please select a day.");
      return;
    }
    if (!startTime || !endTime) {
      message.error("Please enter both start and end times.");
      return;
    }
    if (startTime >= endTime) {
      message.error("Start time must be earlier than end time.");
      return;
    }

    setAvailability((prev) => {
      const daySlots = prev[currentDay] || [];
      return {
        ...prev,
        [currentDay]: [...daySlots, { start: startTime, end: endTime }],
      };
    });
    setStartTime("");
    setEndTime("");
    message.success("Time slot added!");
  };

  const removeTimeSlot = (day, index) => {
    setAvailability((prev) => {
      const daySlots = prev[day].filter((_, i) => i !== index);
      return { ...prev, [day]: daySlots };
    });
  };

  const handleFormSubmit = () => {
    console.log({
      isInPerson,
      isOnline,
      availability,
      rate,
      timeZone,
    });
    message.success("Availability saved!");
    setCurrentStep(4);
    router.push('/DashboardLayout/TutorDashboard/publishToComunity');
  };

  return (
    <div className="flex gap-8 p-6 bg-white h-screen pt-8">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#F9FAFB] p-4 h-fit rounded-lg">
        <div className="py-6 space-y-2">
          <h1>Welcome to Circooles</h1>
          <p className="text-sm text-[#667085]">
            Follow these steps to apply for an account on the Circooles Tutor Platform:
          </p>
        </div>

        <Steps direction="vertical" current={currentStep} className="text-left">
          <Step className="h-[60px] font-bold text-[#000000]" title="Basic Info" />
          <Step className="h-[60px] font-bold text-[#000000]" title="Professional Info" />
          <Step className="h-[60px] font-bold text-[#000000]" title="Qualifications" />
          <Step className="h-[60px] font-bold text-[#000000]" title="Availability" />
        </Steps>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Availability</h2>

        {/* Availability Toggle */}
        <div className="mb-6">
          <Switch
            checked={isInPerson}
            onChange={(checked) => setIsInPerson(checked)}
          />
          <p className="ml-3 inline-block">I’m able to take sessions in-person.</p>
        </div>

        <div className="mb-6">
          <Switch
            checked={isOnline}
            onChange={(checked) => setIsOnline(checked)}
          />
          <p className="ml-3 inline-block">I’m able to take sessions online only.</p>
        </div>

        {/* Day and Time Selection */}
        <div className="mb-6">
          <Select
            placeholder="Select a day"
            className="w-full mb-4"
            onChange={setCurrentDay}
          >
            {days.map((day) => (
              <Option key={day} value={day}>
                {day}
              </Option>
            ))}
          </Select>

          <div className="flex space-x-4 items-center">
            <Input
              placeholder="Start Time"
              className="w-1/2"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
              placeholder="End Time"
              className="w-1/2"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <Button
              onClick={addTimeSlot}
              className="bg-blue-500 text-white"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Time Slots Display */}
        {Object.keys(availability).map((day) => (
          <div key={day} className="mb-4">
            <h3 className="text-lg font-semibold">{day}</h3>
            {availability[day].map((slot, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2"
              >
                <p>
                  {slot.start} - {slot.end}
                </p>
                <Button
                  danger
                  onClick={() => removeTimeSlot(day, index)}
                  size="small"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ))}

        {/* Time Zone and Rate */}
        <div className="mb-6">
          <Select
            placeholder="Time Zone"
            className="w-full mb-4"
            onChange={setTimeZone}
          >
            {["GMT", "EST", "PST", "IST"].map((zone) => (
              <Option key={zone} value={zone}>
                {zone}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="I will charge per session"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full"
          />
          <p className="mt-2 text-sm text-gray-600">
            20% platform fee will be applied to your rate. You will receive €12.00 after the fee.
          </p>
        </div>

        <Button
          type="primary"
          onClick={handleFormSubmit}
          className="w-full"
        >
          Save Availability
        </Button>
      </div>
    </div>
  );
};

export default Availability;
