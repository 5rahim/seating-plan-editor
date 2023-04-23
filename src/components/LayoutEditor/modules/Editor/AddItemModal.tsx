import {
   Box, Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useToast,
} from '@chakra-ui/react'
import { IconType } from '@react-icons/all-files'
import { BiRectangle } from '@react-icons/all-files/bi/BiRectangle'
import { BiRestaurant } from '@react-icons/all-files/bi/BiRestaurant'
import { BiStreetView } from '@react-icons/all-files/bi/BiStreetView'
import { BiWalk } from '@react-icons/all-files/bi/BiWalk'
import { BsSpeaker } from '@react-icons/all-files/bs/BsSpeaker'
import { FaCocktail } from '@react-icons/all-files/fa/FaCocktail'
import { SiAirtable } from '@react-icons/all-files/si/SiAirtable'
import { useAtom } from 'jotai'
import React from 'react'
import { itemsAtom } from '../../atoms/data.atom'
import { useTranslation } from '../../hooks/use-translation'
import { Item } from '../../types/types'
import { v4 as uuid } from 'uuid'

interface AddItemModalProps {
   controls: any
   children?: React.ReactNode
}

const AddItemModal: React.FC<AddItemModalProps> = (props) => {
   const toast = useToast()
   const t = useTranslation()
   const { children, controls, ...rest } = props
   
   const [items, setItems] = useAtom(itemsAtom)
   
   const objects = [
      {
         name: 'oval_table',
         icon: SiAirtable,
         data: {
            id: '...',
            name: '',
            type: 'table',
            width: 65,
            length: 65,
            transform: '',
            addons: {
               chairQuantity: 8,
               type: 'oval',
            },
         },
      },
      {
         name: 'rectangular_table',
         icon: SiAirtable,
         data: {
            id: '...',
            name: '',
            type: 'table',
            width: 65,
            length: 65,
            transform: '',
            addons: {
               chairQuantity: [1,1,1,1],
               type: 'rectangular',
            },
         },
      },
      {
         name: 'stage',
         icon: BiStreetView,
         data: {
            id: '...',
            name: '',
            type: 'stage',
            width: 65*3,
            length: 65*3,
            transform: '',
         },
      },
      {
         name: 'speaker',
         icon: BsSpeaker,
         data: {
            id: '...',
            name: '',
            type: 'speaker',
            width: 58,
            length: 117,
            transform: '',
         },
      },
      {
         name: 'buffet',
         icon: BiRestaurant,
         data: {
            id: '...',
            name: '',
            type: 'buffet',
            width: 65*4,
            length: 65,
            transform: '',
         },
      },
      {
         name: 'bar',
         icon: FaCocktail,
         data: {
            id: '...',
            name: '',
            type: 'bar',
            width: 65*2,
            length: 65,
            transform: '',
         },
      },
      {
         name: 'space',
         icon: BiWalk,
         data: {
            id: '...',
            name: '',
            type: 'space',
            width: 65*2,
            length: 65*2,
            transform: '',
         },
      },
      {
         name: 'object',
         icon: BiRectangle,
         data: {
            id: '...',
            name: '...',
            type: 'object',
            width: 65,
            length: 65,
            transform: '',
         },
      },
   ] as {
      name: string
      icon: IconType
      data: Item
   }[]
   
   function handleAddObject(data: Item) {
      setItems([...items, { ...data, id: uuid() }])
      controls.onClose()
   
      toast({
         title: t('added'),
         status: 'success',
         duration: 1000,
         isClosable: true,
      })
      
   }
   
   return (
      <>
         <Modal size="xl" isOpen={controls.isOpen} onClose={controls.onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{t('objects')}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
   
                  <Stack>
                     {objects.map(object => {
                        return (
                           <Flex
                              key={object.name}
                              p="2"
                              bgColor="#fff"
                              border="1px solid"
                              borderColor="#eee"
                              borderRadius="md"
                              gap="2"
                              alignItems="center"
                              cursor="pointer"
                              _hover={{
                                 bgColor: '#fafafa'
                              }}
                              onClick={() => handleAddObject(object.data)}
                           >
                              <Icon as={object.icon} w="35px" h="35px" bgColor="#eee" p="2" borderRadius="md" />
                              <Text fontWeight="600">{t(object.name)}</Text>
         
                           </Flex>
                        )
                     })}
                  </Stack>
                  
               </ModalBody>
               
               <ModalFooter>
                  <Button onClick={controls.onClose} variant="ghost">{t('close')}</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
   
}

export default AddItemModal
