// import { useState, useEffect } from "react";


// function safeStringify(obj) {
//     const seen = new Set();
//     return JSON.stringify(obj, (key, value) => {
//       if (typeof value === 'object' && value !== null) {
//         if (seen.has(value)) return;
//         seen.add(value);
//       }
//       return value;
//     });
//   }

// export const useEventDB = () => {
//   const [events, setEvents] = useState(() => {
//     const storedEvents = localStorage.getItem("events");
//     return storedEvents ? JSON.parse(storedEvents) : [];
//   });

 

//   useEffect(() => {
//     try {
//       localStorage.setItem("events", safeStringify(events));
//     } catch (error) {
//       console.error("Error saving events to localStorage", error);
//     }
//   }, 
//   [events]);

//   // Function to add a new event
//   const addEvent = (newEvent) => {
//     setEvents([
//       ...events,
//       {
//         ...newEvent,
//         id: Date.now().toString(),
//         extendedProps: {
//           description: newEvent.description || '', // Ensure description is defined
//         },
//       },
//     ]);
//   };

//   // Function to delete an event by id
//   const deleteEvent = (eventId) => {
//     setEvents(events.filter((event) => event.id !== eventId));
//   };

//   // Function to edit an existing event
//   const editEvent = (updatedEvent) => {
//     setEvents(
//       events.map((event) =>
//         event.id === updatedEvent.id
//           ? {
//               ...event,
//               ...updatedEvent,
//               extendedProps: {
//                 ...event.extendedProps,
//                 ...updatedEvent.extendedProps, // Merge extendedProps
//               },
//             }
//           : event
//       )
//     );
//   };

//   return {
//     events,
//     addEvent,
//     deleteEvent,
//     editEvent,
//   };
// };
