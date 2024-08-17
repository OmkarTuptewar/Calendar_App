import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  Text,
  Tooltip,
  WrapItem,
} from "@chakra-ui/react";

const Calendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    fetch("https://calendarapp-server.onrender.com/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  const handleEditClick = (eventInfo) => {
    setSelectedEvent(eventInfo.event);
    setTitle(eventInfo.event.title);
    setDescription(eventInfo.event.extendedProps?.description || "");
    setStart(eventInfo.event.startStr);
    setEnd(eventInfo.event.endStr);
    onOpen();
  };

  const handleEditSubmit = () => {
    if (!title.trim()) return;

    const updatedEvent = {
      id: selectedEvent.id, 
      title,
      description,
      start: start,
      end: end,
    };

    fetch("https://calendarapp-server.onrender.com/api/events", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        );
        onClose();
      });
  };

  const handleDeleteEvent = (id) => {
    fetch(`https://calendarapp-server.onrender.com/api/events?id=${id}`, {
      method: "DELETE",
    }).then(() => {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    });
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(eventInfo) => (
          <Box p={3} bg="gray.800" borderRadius="md" shadow="lg">
          <Box width="120px" overflow="hidden" whiteSpace="nowrap">
            <WrapItem>
              <Tooltip
                label={
                  <Box p={3} bg="gray.700" borderRadius="md">
                    <Text fontWeight="bold" color="blue.300" mb={1}>
                      Title:
                    </Text>
                    <Text fontSize="lg" color="white" mb={2}>
                      {eventInfo.event.title}
                    </Text>
                    <Box borderBottom="1px" borderColor="gray.600" mb={2} />
                    <Text fontWeight="bold" color="gray.400">
                      Event:
                    </Text>
                    <Text fontSize="md" color="gray.300">
                      {eventInfo.event.extendedProps?.description || "No description"}
                    </Text>
                  </Box>
                }
                hasArrow
                arrowSize={15}
                placement="top"
                bg="gray.700"
                color="white"
                rounded="md"
                p={2}
              >
                <Box
                  width="120px"
                  bgGradient="linear(to-r, blue.600, blue.400)"
                  borderRadius="md"
                  p={3}
                  shadow="md"
                  overflow="hidden"
                >
                  <Text
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    fontWeight="bold"
                    color="white"
                    fontSize="md"
                    mb={1}
                  >
                    {eventInfo.event.title}
                  </Text>
                  <Text
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    fontSize="sm"
                    color="gray.200"
                  >
                    {eventInfo.event.extendedProps?.description || "No description"}
                  </Text>
                </Box>
              </Tooltip>
            </WrapItem>
        
            <Box mt={3} display="flex" gap={2}>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDeleteEvent(eventInfo.event.id)}
                variant="outline"
              >
                Delete
              </Button>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => handleEditClick(eventInfo)}
                variant="outline"
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
        )}
      />

      {selectedEvent && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                mt={4}
              />
              <Input
                placeholder="Start Date"
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                mt={4}
              />
              <Input
                placeholder="End Date"
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                mt={4}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={handleEditSubmit}
                disabled={!title.trim()} 
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Calendar;
