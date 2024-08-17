import { Box, Flex, Text } from "@chakra-ui/react";
import DarkMode from "./DarkMode";


const Navbar = () => {
  return (
    <Box bg="gray.800" px={7}>
      <Flex h={20} alignItems="center" justifyContent="space-between">
        <Box />

        <Text color="white" fontSize="30px" fontWeight="bold">
          CALENDAR-APP
        </Text>
       
         <DarkMode/>
      </Flex>

    
    </Box>

  );
};



export default Navbar;
