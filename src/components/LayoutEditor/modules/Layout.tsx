import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import ItemPropertyMenu from './Editor/ItemPropertyMenu'
import Navbar from './Navbar'

interface LayoutProps {
   children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
   
   const { children, ...rest } = props
   
   return (
      <>
         <Flex>
            <Navbar />
            <Box as="main">
               {children}
            </Box>
         </Flex>
      </>
   )
   
}

export default Layout
