import { Input, InputProps, Text, TextProps } from '@chakra-ui/react'
import React from 'react'

interface EditorHeaderProps {
   children?: React.ReactNode
}

const EditorHeader: React.FC<EditorHeaderProps & TextProps> = (props) => {
   
   const { children, ...rest } = props
   
   return (
      <>
         <Text
            sx={{
               px: 4,
               py: 2,
               // borderColor: '#3f334c',
               bgColor: '#ddd',
               textTransform: 'uppercase',
               fontWeight: 600,
               '&:hover': {
                  borderColor: '#534462'
               }
            }}
            {...rest}
         >
            {children}
         </Text>
      </>
   )
   
}

export default EditorHeader
