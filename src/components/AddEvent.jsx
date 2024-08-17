import React, { useState } from 'react';
import { Button, Input, Box, FormLabel } from '@chakra-ui/react';

const AddEvent = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newEvent = {
      title,
      description,
      start,
      end,
    };

    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
    .then(response => response.json())
    .then(newEvent => {
      onAddEvent(newEvent);
      setTitle('');
      setDescription('');
      setStart('');
      setEnd('');
    });
  };

  return (
    <Box
    mb={6}
    p={4}
   
    borderRadius="md"
    shadow="md"
    maxWidth="450px"
    mx="auto"
  >
    <FormLabel htmlFor="title" color="gray.700" mb={1}>
      Title
    </FormLabel>
    <Input
      id="title"
      placeholder="Enter event title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      mb={3}
      borderColor="gray.600"
    
     
    />
    
    <FormLabel htmlFor="description" color="gray.700" mb={1}>
      Event Description
    </FormLabel>
    <Input
      id="description"
      placeholder="Enter event description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      mb={3}
      borderColor="gray.600"
     
    />
    
    <FormLabel htmlFor="start" color="gray.700" mb={1}>
      Start Date
    </FormLabel>
    <Input
      id="start"
      placeholder="Select start date"
      type="datetime-local"
      value={start}
      onChange={(e) => setStart(e.target.value)}
      mb={3}
      borderColor="gray.600"
      bg="gray.700"
      color="white"
    />
    
    <FormLabel htmlFor="end" color="gray.700" mb={1}>
      End Date
    </FormLabel>
    <Input
      id="end"
      placeholder="Select end date"
      type="datetime-local"
      value={end}
      onChange={(e) => setEnd(e.target.value)}
      mb={4}
      borderColor="gray.600"
      bg="gray.700"
      color="white"
    />
    
    <Button
      colorScheme="blue"
      width="full"
      onClick={handleSubmit}
    >
      Add Event
    </Button>
  </Box>


  );
};

export default AddEvent;
