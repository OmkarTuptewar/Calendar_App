import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Calendar from './components/Calendar';
import AddEvent from './components/AddEvent';
import { Box } from '@chakra-ui/react';


const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data));
  }, []);

  const handleAddEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const handleDeleteEvent = (id) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <>
      <Navbar />
      <Box width="80%" height="80vh" mx="auto" my={4} >
      <AddEvent onAddEvent={handleAddEvent} />
      <Box
      border="10px"
      borderColor="black"
      borderRadius="md"
      
      p={4}
      shadow="md"
      overflow="hidden"
      mx="auto"
      mb={4}
    >
      <Calendar
        events={events}
        onDeleteEvent={handleDeleteEvent}
        onEditEvent={handleEditEvent}
      />
    </Box>

      </Box>
   
    </>
  );
};

export default App;
