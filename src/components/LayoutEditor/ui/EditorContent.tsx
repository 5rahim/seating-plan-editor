import { Box, BoxProps, Input, InputProps, Text } from '@chakra-ui/react'
import React from 'react'

interface EditorHeaderProps {
   children?: React.ReactNode
}

const EditorHeader: React.FC<EditorHeaderProps & BoxProps> = (props) => {
   
   const { children, ...rest } = props
   
   return (
      <>
         <Box
            sx={{
               p: '4'
            }}
            {...rest}
         >
            {children}
         </Box>
      </>
   )
   
}

export default EditorHeader
