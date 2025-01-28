'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Button, Badge, Modal } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import * as dateFns from 'date-fns'; // For date utilities

// Fetch events dynamically (replace this with your API integration)
async function fetchEvents() {
  // Simulated API response
  return [
    {
      year: 2024,
      month: 11, // December (0-indexed)
      day: 25,
      events: [
        { time: '10:30 am', title: 'Christmas Celebration', link: 'https://example.com/christmas' }
      ]
    },
    {
      year: 2024,
      month: 6, // July (0-indexed)
      day: 10,
      events: [
        { time: '10:30 am', title: 'Team Meeting', link: 'https://example.com/meeting1' },
        { time: '12:00 pm', title: 'Project Briefing', link: 'https://example.com/meeting2' }
      ]
    },
    {
      year: 2024,
      month: 11, // July (0-indexed)
      day: 15,
      events: [
        { time: '09:30 am', title: 'Products Introduction', link: 'https://example.com/meeting3' },
        { time: '12:30 pm', title: 'Client Meeting', link: 'https://example.com/meeting4' },
        { time: '02:00 pm', title: 'Design Discussion', link: 'https://example.com/meeting5' },
        { time: '05:00 pm', title: 'Testing Session', link: 'https://example.com/meeting6' }
      ]
    }
  ];
}

const Page = () => {
  const [events, setEvents] = useState([]); // Stores all fetched events
  const [selectedDate, setSelectedDate] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data); // Store fetched events
    };

    loadEvents();
  }, []);

  // Retrieve events for a specific date
  const getTodoList = (date) => {
    const year = dateFns.getYear(date);
    const month = dateFns.getMonth(date); // 0-indexed (January is 0)
    const day = dateFns.getDate(date);

    const matchedMeeting = events.find(
      (event) => event.year === year && event.month === month && event.day === day
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
    setOpen(true); // Open modal
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedDate(null);
    setMeetings([]);
  };

  return (
    <div className="bg-white p-4">
      <h2>Upcoming Sessions</h2>
      <Calendar bordered onSelect={handleDateClick} renderCell={renderCell} />

      {/* Modal for showing meetings */}
      <Modal open={open} onClose={closeModal} size="sm" centered>
        <Modal.Header>
          <Modal.Title>
            Meetings on {selectedDate ? dateFns.format(selectedDate, 'MMMM dd, yyyy') : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {meetings.length > 0 ? (
            <ul className='p-4'>
              {meetings.map((meeting, index) => (
                <li key={index} className="mb-2">
                  <Badge /> <b>{meeting.time}</b> - {meeting.title}
                  <Button
                    appearance="link"
                    target="_blank"
                    href={meeting.link}
                    className="ml-2"
                  >
                    Join
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No meetings scheduled for this date.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} appearance="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Page;
