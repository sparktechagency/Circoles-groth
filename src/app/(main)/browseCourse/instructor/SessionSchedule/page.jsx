'use client'
import { useState } from 'react';
import { Badge, Button, Calendar, Card, message, Steps } from 'antd';
import { useRouter } from 'next/navigation';


const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const router = useRouter();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const times = ['3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM','6:00 PM'];

  const handleContinue = () => {
    if (!selectedDate ) {
      message.error('Please select a day and time!');
      return;
    }
    console.log('Selected Day:', selectedDate);
    console.log('Selected Time:', selectedTime);
    router.push('/browseCourse/instructor/payment'); // Navigate to the payment page
  };

  const handleCancel = () => {
    router.back(); // Go to the previous page
  };




  const handleSelect = (date) => {
    setSelectedDate(date);
  };

  const getListData = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const availability = {
      "2025-03-01": ["3:30 PM", "4:00 PM", "4:30 PM"],
      "2025-03-05": ["5:00 PM", "6:00 PM"],
    };
    return availability[dateStr] || [];
  };

  return (
    <div className="min-h-screen flex items-center justify-center container mx-auto   p-4">
      <div className="w-full   p-6 h-full max-w-4xl">
        <Steps current={0} className="mb-6 max-w-sm mx-auto">
          <Steps.Step title="Schedule" />
          <Steps.Step title="Payment" />
        </Steps>

        <h2 className="text-lg font-medium mb-4">Select your Session Schedule</h2>

        {/* Calendar */}
        <Card className="mt-6 w-full mb-6 p-4">
              <h2 className="text-lg font-semibold text-[#1D2939] mb-4">
                Availability
              </h2>
              <Calendar
                fullscreen={false}
                dateCellRender={(value) => {
                  const listData = getListData(value);
                  return (
                    <ul>
                      {listData.map((item, index) => (
                        <li key={index}>
                          <Badge status="success" text={item} />
                        </li>
                      ))}
                    </ul>
                  );
                }}
                onSelect={handleSelect}
              />
              {selectedDate && (
                <div className="mt-4">
                  <p className="text-gray-700 font-semibold">
                    Selected Date: {selectedDate.format("YYYY-MM-DD")}
                  </p>
                </div>
              )}
            </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button onClick={handleCancel} className="bg-white h-[48px] border border-[#D0D5DD] min-w-[156px] font-semibold text-[#344054]">
            Cancel
          </Button>
          <Button style={{backgroundColor:'#14698A'}} onClick={handleContinue} className='bg-white h-[48px] border border-[#D0D5DD] min-w-[156px] font-semibold text-white'>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
