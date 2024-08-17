import React from 'react'
import { SunIcon,MoonIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
const DarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    
    <header>
      <Button onClick={toggleColorMode}>
       {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
      </Button>
    </header>
  )
  
}

export default DarkMode
