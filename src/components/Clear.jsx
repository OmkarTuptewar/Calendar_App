import React from 'react';
import { Button } from '@chakra-ui/react';

const ClearStorageButton = () => {
  const handleClear = () => {
    localStorage.clear(); // Clears all localStorage data
    // or
    // localStorage.removeItem("events"); // Clears specific item
    console.log("LocalStorage has been cleared.");
  };

  return (
    <Button colorScheme="red" onClick={handleClear}>
      Clear Local Storage
    </Button>
  );
};

export default ClearStorageButton;
