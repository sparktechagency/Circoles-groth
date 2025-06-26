"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Button, Badge, Modal } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import * as dateFns from "date-fns";
import { useUpcommingseassionsQuery } from "../../../../redux/features/tutorapis/TutorApi";

const Page = () => {
  const { data } = useUpcommingseassionsQuery();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // Transform API data into calendar events format
  useEffect(() => {
    if (data?.success && data?.session?.data) {
      const formattedEvents = data.session.data.map((session) => {
        const date = new Date(session.date);
        return {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          events: [
            {
              id: session.id,
              title: `${session.student_name} - ${
                session.type === "online" ? "Online" : "In-person"
              }`,
              time: session.time_slot,
              zoomLink: session.zoom_link,
              status: session.status,
              type: session.type,
              studentName: session.student_name,
              email: session.email,
            },
          ],
        };
      });

      // Group events by date
      const groupedEvents = formattedEvents.reduce((acc, event) => {
        const key = `${event.year}-${event.month}-${event.day}`;
        if (!acc[key]) {
          acc[key] = {
            year: event.year,
            month: event.month,
            day: event.day,
            events: [],
          };
        }
        acc[key].events.push(...event.events);
        return acc;
      }, {});

      setEvents(Object.values(groupedEvents));
    }
  }, [data]);

  // Retrieve events for a specific date
  const getTodoList = (date) => {
    const year = dateFns.getYear(date);
    const month = dateFns.getMonth(date);
    const day = dateFns.getDate(date);

    const matchedMeeting = events.find(
      (event) =>
        event.year === year && event.month === month && event.day === day
    );

    return matchedMeeting ? matchedMeeting.events : [];
  };

  // Render calendar cell content
  const renderCell = (date) => {
    const list = getTodoList(date);

    if (list.length) {
      return (
        <ul className="calendar-todo-list">
          {list.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  const handleDateClick = (date) => {
    const todoList = getTodoList(date);
    setSelectedDate(date);
    setMeetings(todoList);
    setOpen(true);
  };

  const handleJoinMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    if (meeting.zoomLink) {
      // Open Zoom link in a new tab
      window.open(meeting.zoomLink, "_blank", "noopener,noreferrer");
    }
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedDate(null);
    setMeetings([]);
    setSelectedMeeting(null);
  };

  return (
    <div className="bg-white p-4">
      <h2>Upcoming Sessions</h2>
      <Calendar bordered onSelect={handleDateClick} renderCell={renderCell} />

      {/* Modal for showing meetings */}
      <Modal open={open} onClose={closeModal} size="md" centered>
        <Modal.Header>
          <Modal.Title>
            Meetings on{" "}
            {selectedDate ? dateFns.format(selectedDate, "MMMM dd, yyyy") : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {meetings.length > 0 ? (
            <ul className="p-4 space-y-4">
              {meetings.map((meeting, index) => (
                <li key={index} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{meeting.title}</h4>
                      <p className="text-gray-600">
                        <b>Time:</b> {meeting.time}
                      </p>
                      <p className="text-gray-600">
                        <b>Status:</b> {meeting.status}
                      </p>
                    </div>
                    {meeting.zoomLink && meeting.type === "online" && (
                      <Button
                        appearance="primary"
                        color="green"
                        onClick={() => handleJoinMeeting(meeting)}
                        className="ml-4"
                      >
                        Join Zoom Meeting
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No meetings scheduled for this date.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} appearance="subtle">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Page;
