// "use client";
// import React, { useState, useEffect } from "react";
// import { Calendar, Button, Badge, Modal } from "rsuite";
// import "rsuite/dist/rsuite.min.css";
// import * as dateFns from "date-fns";
// import { useUpcommingseassionsQuery } from "../../../../redux/features/tutorapis/TutorApi";

// const Page = () => {
//   const { data } = useUpcommingseassionsQuery();
//   const [events, setEvents] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [meetings, setMeetings] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedMeeting, setSelectedMeeting] = useState(null);

//   // Transform API data into calendar events format
//   useEffect(() => {
//     if (data?.success && data?.session?.data) {
//       const formattedEvents = data.session.data.map((session) => {
//         const date = new Date(session.date);
//         return {
//           year: date.getFullYear(),
//           month: date.getMonth(),
//           day: date.getDate(),
//           events: [
//             {
//               id: session.id,
//               title: `${session.student_name} - ${
//                 session.type === "online" ? "Online" : "In-person"
//               }`,
//               time: session.time_slot,
//               zoomLink: session.zoom_link,
//               status: session.status,
//               type: session.type,
//               studentName: session.student_name,
//               email: session.email,
//             },
//           ],
//         };
//       });

//       // Group events by date
//       const groupedEvents = formattedEvents.reduce((acc, event) => {
//         const key = `${event.year}-${event.month}-${event.day}`;
//         if (!acc[key]) {
//           acc[key] = {
//             year: event.year,
//             month: event.month,
//             day: event.day,
//             events: [],
//           };
//         }
//         acc[key].events.push(...event.events);
//         return acc;
//       }, {});

//       setEvents(Object.values(groupedEvents));
//     }
//   }, [data]);

//   // Retrieve events for a specific date
//   const getTodoList = (date) => {
//     const year = dateFns.getYear(date);
//     const month = dateFns.getMonth(date);
//     const day = dateFns.getDate(date);

//     const matchedMeeting = events.find(
//       (event) =>
//         event.year === year && event.month === month && event.day === day
//     );

//     return matchedMeeting ? matchedMeeting.events : [];
//   };

//   // Render calendar cell content
//   const renderCell = (date) => {
//     const list = getTodoList(date);

//     if (list.length) {
//       return (
//         <ul className="calendar-todo-list">
//           {list.map((item, index) => (
//             <li key={index}>
//               <Badge /> <b>{item.time}</b> - {item.title}
//             </li>
//           ))}
//         </ul>
//       );
//     }

//     return null;
//   };

//   const handleDateClick = (date) => {
//     const todoList = getTodoList(date);
//     setSelectedDate(date);
//     setMeetings(todoList);
//     setOpen(true);
//   };

//   const handleJoinMeeting = (meeting) => {
//     setSelectedMeeting(meeting);
//     if (meeting.zoomLink) {
//       // Open Zoom link in a new tab
//       window.open(meeting.zoomLink, "_blank", "noopener,noreferrer");
//     }
//   };

//   const closeModal = () => {
//     setOpen(false);
//     setSelectedDate(null);
//     setMeetings([]);
//     setSelectedMeeting(null);
//   };

//   return (
//     <div className="bg-white p-4">
//       <h2>Upcoming Sessions</h2>
//       <Calendar bordered onSelect={handleDateClick} renderCell={renderCell} />

//       {/* Modal for showing meetings */}
//       <Modal open={open} onClose={closeModal} size="md" centered>
//         <Modal.Header>
//           <Modal.Title>
//             Meetings on{" "}
//             {selectedDate ? dateFns.format(selectedDate, "MMMM dd, yyyy") : ""}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {meetings.length > 0 ? (
//             <ul className="p-4 space-y-4">
//               {meetings.map((meeting, index) => (
//                 <li key={index} className="border-b pb-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-semibold">{meeting.title}</h4>
//                       <p className="text-gray-600">
//                         <b>Time:</b> {meeting.time}
//                       </p>
//                       <p className="text-gray-600">
//                         <b>Status:</b> {meeting.status}
//                       </p>
//                     </div>
//                     {meeting.zoomLink && meeting.type === "online" && (
//                       <Button
//                         appearance="primary"
//                         color="green"
//                         onClick={() => handleJoinMeeting(meeting)}
//                         className="ml-4"
//                       >
//                         Join Zoom Meeting
//                       </Button>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No meetings scheduled for this date.</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={closeModal} appearance="subtle">
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Page;

"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Button, Badge, Modal, Input, InputGroup } from "rsuite"; // Import Input and InputGroup
import "rsuite/dist/rsuite.min.css";
import * as dateFns from "date-fns";
import Swal from "sweetalert2"; // For user feedback

// Import the new mutation hook along with the query hook
import {
  useUpcommingseassionsQuery,
  useUpdateSessionZoomLinkMutation,
} from "../../../../redux/features/tutorapis/TutorApi";

const Page = () => {
  const { data, isLoading: isLoadingSessions } = useUpcommingseassionsQuery();
  // --- NEW: Instantiate the mutation hook ---
  const [updateZoomLink, { isLoading: isUpdating, isError, error }] =
    useUpdateSessionZoomLinkMutation();

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [open, setOpen] = useState(false);

  // --- NEW: State for managing the inline editing in the modal ---
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [newZoomLink, setNewZoomLink] = useState("");

  // Transform API data into calendar events format (no changes here)
  useEffect(() => {
    if (data?.success && data?.session?.data) {
      const formattedEvents = data.session.data.map((session) => ({
        year: new Date(session.date).getFullYear(),
        month: new Date(session.date).getMonth(),
        day: new Date(session.date).getDate(),
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
      }));

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

  // --- NEW: Function to handle the start of editing ---
  const handleEditClick = (session) => {
    setEditingSessionId(session.id);
    setNewZoomLink(session.zoomLink || ""); // Pre-fill with existing link or empty string
  };

  // --- NEW: Function to cancel editing ---
  const handleCancelClick = () => {
    setEditingSessionId(null);
    setNewZoomLink("");
  };

  // --- NEW: Function to save the updated link ---
  const handleSaveClick = async (sessionId) => {
    const formData = {
      sessionId,
      zoomLink: newZoomLink,
      _method: "PUT",
    };
    try {
      const res = await updateZoomLink(formData).unwrap(); // Use unwrap to catch errors here
      console.log("res", res);
      // Swal.fire({
      //   icon: "success",
      //   title: "Zoom Link Updated!",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });

      // Close the editing UI
      handleCancelClick();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.data?.message || "An unexpected error occurred.",
      });
    }
  };

  // Retrieve events for a specific date (no changes here)
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

  // Render calendar cell content (no changes here)
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
    if (meeting.zoomLink) {
      window.open(meeting.zoomLink, "_blank", "noopener,noreferrer");
    }
  };

  const closeModal = () => {
    setOpen(false);
    handleCancelClick(); // Also cancel any edits when closing the modal
  };

  return (
    <div className="bg-white p-4">
      <h2>Upcoming Sessions</h2>
      <Calendar bordered onSelect={handleDateClick} renderCell={renderCell} />

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
              {meetings.map((meeting) => (
                <li key={meeting.id} className="border-b pb-4 space-y-2">
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
                    {/* --- MODIFIED: Show Join button only when not editing --- */}
                    {meeting.type === "online" &&
                      editingSessionId !== meeting.id && (
                        <Button
                          appearance="primary"
                          color="green"
                          disabled={!meeting.zoomLink}
                          onClick={() => handleJoinMeeting(meeting)}
                          className="ml-4"
                        >
                          Join Zoom Meeting
                        </Button>
                      )}
                  </div>

                  {/* --- NEW: Conditional rendering for edit UI --- */}
                  {meeting.type === "online" && (
                    <div>
                      {editingSessionId === meeting.id ? (
                        // EDITING VIEW
                        <div className="space-y-2">
                          <InputGroup>
                            <InputGroup.Addon>URL</InputGroup.Addon>
                            <Input
                              value={newZoomLink}
                              onChange={(value) => setNewZoomLink(value)}
                              placeholder="https://zoom.us/j/..."
                            />
                          </InputGroup>
                          <div className="flex gap-2">
                            <Button
                              appearance="primary"
                              color="blue"
                              loading={isUpdating}
                              onClick={() => handleSaveClick(meeting.id)}
                            >
                              Save
                            </Button>
                            <Button
                              appearance="subtle"
                              onClick={handleCancelClick}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // DISPLAY VIEW
                        <Button
                          appearance="ghost"
                          size="sm"
                          onClick={() => handleEditClick(meeting)}
                        >
                          {meeting.zoomLink ? "Update Link" : "Add Link"}
                        </Button>
                      )}
                    </div>
                  )}
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
