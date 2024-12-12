'use client'
import { Table, Button, Tag, Dropdown, Menu, Modal, DatePicker, message } from "antd";
import { EllipsisOutlined, LeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import avater from '/public/images/Avatar.png'
import Image from "next/image";
const UpcomingSession = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);
  const [isRescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleCancelSession = () => {
    setCancelModalVisible(false);
    message.success("Session has been canceled.");
  };

  const handleRescheduleSession = () => {
    setRescheduleModalVisible(false);
    message.success("Session has been rescheduled.");
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          setSelectedSession(record);
          setCancelModalVisible(true);
        }}
      >
        Cancel Session
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setSelectedSession(record);
          setRescheduleModalVisible(true);
        }}
      >
        Reschedule
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: " date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Days",
      dataIndex: "Days",
      key: "Days",
    },
    {
      title: "Time slots",
      dataIndex: "Timeslots",
      key: "Timeslots",
      
    },
    {
      title: "Tutor",
      dataIndex: "Tutor",
      key: "Tutor",
      
    },
    
    {
      title: "",
      dataIndex: "zoomLink",
      key: "zoomLink",
      render: (text) => (
        <Button
         
        >
         <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_316_23745)">
<path d="M13.9173 4.08268L9.83398 6.99935L13.9173 9.91602V4.08268Z" stroke="#1253BB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.66732 2.91602H2.25065C1.60632 2.91602 1.08398 3.43835 1.08398 4.08268V9.91602C1.08398 10.5603 1.60632 11.0827 2.25065 11.0827H8.66732C9.31165 11.0827 9.83398 10.5603 9.83398 9.91602V4.08268C9.83398 3.43835 9.31165 2.91602 8.66732 2.91602Z" stroke="#1253BB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_316_23745">
<rect width="14" height="14" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>

          Join Session 
        </Button>
      ),
    },
    {

      key: "actions",
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          } />
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Olivia Ryhe",
      Timeslots: "10:00 am-12 pm",
      avatar: "/avatar1.jpg",
      status: "Online",
      zoomLink: "https://zoom.us/",
    },
    {
      key: "2",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },
    {
      key: "3",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Olivia Ryhe",
      Timeslots: "10:00 am-12 pm",
      avatar: "/avatar1.jpg",
      status: "Online",
      zoomLink: "https://zoom.us/",
    },
    {
      key: "4",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },
    {
      key: "5",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Olivia Ryhe",
      Timeslots: "10:00 am-12 pm",
      avatar: "/avatar1.jpg",
      status: "Online",
      zoomLink: "https://zoom.us/",
    },
    {
      key: "6",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },
    {
      key: "7",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },
    {
      key: "8",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Olivia Ryhe",
      Timeslots: "10:00 am-12 pm",
      avatar: "/avatar1.jpg",
      status: "Online",
      zoomLink: "https://zoom.us/",
    },
    {
      key: "9",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },
    {
      key: "10",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },
    {
      key: "11",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Olivia Ryhe",
      Timeslots: "10:00 am-12 pm",
      avatar: "/avatar1.jpg",
      status: "Online",
      zoomLink: "https://zoom.us/",
    },
    {
      key: "12",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },
    {
      key: "13",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Olivia Ryhe",
      Timeslots: "10:00 am-12 pm",
      avatar: "/avatar1.jpg",
      status: "Online",
      zoomLink: "https://zoom.us/",
    },
    {
      key: "14",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },
    {
      key: "15",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Olivia Ryhe",
      Timeslots: "10:00 am-12 pm",
      avatar: "/avatar1.jpg",
      status: "Online",
      zoomLink: "https://zoom.us/",
    },
    {
      key: "16",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },
    {
      key: "17",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },
    {
      key: "18",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Olivia Ryhe",
      Timeslots: "10:00 am-12 pm",
      avatar: "/avatar1.jpg",
      status: "Online",
      zoomLink: "https://zoom.us/",
    },
    {
      key: "19",
      date: "Jan 6, 2024",
      Days: "Saturday",
     Tutor: "Phoenix Baker",
      Timeslots: "10:00 am-12 pm",
      zoomLink: null,
    },

    // Add more data rows as needed
  ];

  return (
    <div className="p-6 bg-white  ">

      <div className="flex items-center space-x-2 text-gray-600 py-8">
        <span onClick={() => rourter.back()} className="cursor-pointer"> <LeftOutlined /> Back</span>
        <span>/</span>
        <span>My tutor</span>
        <span>/</span>
        <span className="text-black font-semibold">View session</span>
      </div>


      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: data.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />

      {/* Cancel Modal */}
      <Modal
        title="Cancel Session"
        visible={isCancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        onOk={handleCancelSession}
      >
        <p>Are you sure you want to cancel this session?</p>
      </Modal>

      {/* Reschedule Modal */}
      <Modal
        title="Reschedule Session"
        visible={isRescheduleModalVisible}
        onCancel={() => setRescheduleModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setRescheduleModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleRescheduleSession}
          >
            Confirm
          </Button>,
        ]}
      >
        <p>Select a new date and time:</p>
        <DatePicker
          showTime
          onChange={(value) => setSelectedDate(value)}
          className="w-full"
        />
      </Modal>
    </div>
  );
};

export default UpcomingSession;
