"use client";
import React, { useState } from "react";
import { Calendar, Button, Badge, Modal, List } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import * as dateFns from "date-fns";
import { useStudentUpcommingseassionsQuery } from "../../../../redux/features/tutorapis/TutorApi";
import { Avatar, Tag, Spin, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UpcomingSessionsPage = () => {
  const {
    data: upcomingData,
    isLoading,
    isError,
  } = useStudentUpcommingseassionsQuery();
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);

  // Transform API data into calendar events
  const transformSessionsToEvents = () => {
    if (!upcomingData?.sessions?.data) return [];

    return upcomingData.sessions.data.map((session) => {
      // Parse date in "MMM dd, yyyy" format (e.g., "Jul 07, 2025")
      const date = dateFns.parse(session.date, "MMM dd, yyyy", new Date());
      return {
        id: session.id,
        date,
        year: dateFns.getYear(date),
        month: dateFns.getMonth(date),
        day: dateFns.getDate(date),
        time: session.time_slot,
        title: `Session with ${session.tutor_name}`,
        type: session.type,
        status: session.status,
        zoomLink: session.zoom_link,
        tutorId: session.tutor_id,
        tutorName: session.tutor_name,
      };
    });
  };

  const events = transformSessionsToEvents();

  // Get sessions for a specific date
  const getSessionsForDate = (date) => {
    if (!date) return [];
    return events.filter((event) => dateFns.isSameDay(event.date, date));
  };

  // Render calendar cell with session indicators
  const renderCell = (date) => {
    const sessions = getSessionsForDate(date);
    const isToday = dateFns.isToday(date);
    const isSelected = selectedDate && dateFns.isSameDay(date, selectedDate);

    return (
      <div
        className={`calendar-cell ${isToday ? "today" : ""} ${
          isSelected ? "selected" : ""
        }`}
        onClick={() => handleDateClick(date)}
      >
        <div className="cell-date">{dateFns.getDate(date)}</div>
        {sessions.length > 0 && (
          <div className="calendar-session-indicator">
            <div className="session-count-badge">
              {sessions.length} session{sessions.length > 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const sessions = getSessionsForDate(date);
    if (sessions.length > 0) {
      setOpen(true);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedDate(null);
  };

  // Get upcoming sessions sorted by date
  const getUpcomingSessionsList = () => {
    return [...events].sort((a, b) => a.date - b.date);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="Failed to load upcoming sessions" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6">
      <h1 className="text-2xl font-bold mb-6">Upcoming Sessions</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Calendar
            bordered
            onSelect={handleDateClick}
            renderCell={renderCell}
            className="custom-calendar"
          />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Your Upcoming Sessions
            </h2>
            {events.length > 0 ? (
              <List>
                {getUpcomingSessionsList().map((session) => (
                  <List.Item
                    key={session.id}
                    className="mb-3 p-3 bg-white rounded cursor-pointer hover:bg-blue-50"
                    onClick={() => {
                      setSelectedDate(session.date);
                      setOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-center min-w-[40px]">
                        <div className="font-bold text-blue-600">
                          {dateFns.format(session.date, "dd")}
                        </div>
                        <div className="text-xs text-gray-500">
                          {dateFns.format(session.date, "MMM")}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{session.tutorName}</div>
                        <div className="text-sm text-gray-600">
                          {session.time} •{" "}
                          <Tag
                            color={
                              session.type === "online" ? "blue" : "orange"
                            }
                            className="text-xs"
                          >
                            {session.type}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                ))}
              </List>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No upcoming sessions scheduled
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sessions Modal */}
      <Modal open={open} onClose={closeModal} size="sm" backdrop="static">
        <Modal.Header>
          <Modal.Title>
            Sessions on{" "}
            {selectedDate && dateFns.format(selectedDate, "MMMM dd, yyyy")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDate && getSessionsForDate(selectedDate).length > 0 ? (
            <List>
              {getSessionsForDate(selectedDate).map((session) => (
                <List.Item key={session.id} className="mb-4 p-3 border-b">
                  <div className="flex items-start gap-4">
                    <Avatar
                      size={48}
                      icon={<UserOutlined />}
                      src={`https://randomuser.me/api/portraits/men/${session.tutorId}.jpg`}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{session.tutorName}</h3>
                        <Tag
                          color={
                            session.status === "completed" ? "green" : "blue"
                          }
                        >
                          {session.status}
                        </Tag>
                      </div>
                      <p className="text-gray-600">{session.time}</p>
                      <p className="text-sm mt-1">
                        <Tag
                          color={session.type === "online" ? "blue" : "orange"}
                        >
                          {session.type}
                        </Tag>
                      </p>
                    </div>
                  </div>
                  {session.zoomLink && (
                    <div className="mt-3 text-center">
                      <Button
                        appearance="primary"
                        href={session.zoomLink}
                        target="_blank"
                        className="w-full"
                      >
                        Join Zoom Session
                      </Button>
                    </div>
                  )}
                </List.Item>
              ))}
            </List>
          ) : (
            <div className="text-center py-4">
              <p>No sessions scheduled for this date</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} appearance="subtle">
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx global>{`
        .custom-calendar .rs-calendar-table-cell-content {
          height: 80px;
          padding: 5px;
        }
        .calendar-cell {
          height: 100%;

          flex-direction: column;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
        }
        .calendar-cell:hover {
          background-color: #f0f7ff;
        }
        .calendar-cell.today {
          background-color: #e6f7ff;
        }
        .calendar-cell.selected {
          background-color: #d0e3ff;
        }
        .cell-date {
          align-self: flex-end;
        }
        .calendar-session-indicator {
          flex-grow: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .session-count-badge {
          background-color: #3498ff;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default UpcomingSessionsPage;
