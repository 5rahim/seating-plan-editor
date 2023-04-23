import {
   BoxProps, Flex, Input, InputProps, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField,
   NumberInputProps, NumberInputStepper,
} from '@chakra-ui/react'
import React from 'react'

interface EditorInputProps {
   children?: React.ReactNode
}

const inputStyles = {
   borderColor: '#ddd',
   bgColor: '#fff',
   borderWidth: '2px',
   '&:hover': {
      borderColor: '#eee',
   },
}

const EditorInput: React.FC<EditorInputProps & InputProps> = (props) => {
   
   const { children, ...rest } = props
   
   return (
      <>
         <Input
            sx={inputStyles}
            {...rest}
         />
      </>
   )
   
}

export default EditorInput

export const EditorNumberInput: React.FC<EditorInputProps & NumberInputProps> = (props) => {
   
   const { children, ...rest } = props
   
   return (
      <>
         <NumberInput
            step={0.1}
            min={0.1}
            max={9999999}
            allowMouseWheel={true}
            {...rest}
         >
            <Flex>
               <NumberInputField sx={inputStyles} />
            </Flex>
            <NumberInputStepper>
               <NumberIncrementStepper borderColor="#ddd" />
               <NumberDecrementStepper borderColor="#ddd" />
            </NumberInputStepper>
         </NumberInput>
      </>
   )
   
}


export const EditorNumberMeterAddon: React.FC<EditorInputProps & BoxProps> = (props) => {
   
   const { children, ...rest } = props
   
   return (
      <>
         <Flex
            children="m"
            sx={{
               alignItems: 'center',
               borderRadius: 'md',
               fontWeight: '600',
               bgColor: '#fafafa',
               borderColor: '#ddd',
               color: '#717171',
               borderWidth: '2px',
               ml: 1,
               px: 2,
            }}
         />
      </>
   )
   
}

