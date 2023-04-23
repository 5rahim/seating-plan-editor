import { Box, Button, Icon, useDisclosure } from '@chakra-ui/react'
import { BiLock } from '@react-icons/all-files/bi/BiLock'
import { BiLockOpen } from '@react-icons/all-files/bi/BiLockOpen'
import { atom, useAtom } from 'jotai'
import { withImmer } from 'jotai/immer'
import React from 'react'
import { useSaveProject } from '../hooks/use-save'
import { useSelectedItem } from '../hooks/use-selected-item'
import { useTranslation } from '../hooks/use-translation'
import AddItemModal from './Editor/AddItemModal'
import ItemPropertyMenu from './Editor/ItemPropertyMenu'

interface NavbarProps {
   children?: React.ReactNode
}

export const lockSpacesAtom = withImmer(atom<boolean>(false))

const Navbar: React.FC<NavbarProps> = (props) => {
   const t = useTranslation()
   const { children, ...rest } = props
   
   const { selectItem, changeItemProperty } = useSelectedItem()
   const addItemModal = useDisclosure()
   const { saveProject } = useSaveProject()
   
   const [spacesLocked, setLockSpaces] = useAtom(lockSpacesAtom)
   
   function addItem(type: string) {
      switch (type) {
         case 'table':
            break
         case 'podium':
            break
         case 'space':
            break
         case 'bar':
            break
      }
   }
   
   return (
      <>
         <Box
            as="nav"
            h="100vh"
            w="300px"
            bgColor="#fafafa"
            position="relative"
            borderRight="2px #ddd solid"
         >
            <Box p="5">
               <Button
                  w="full" colorScheme="yellow" mb="4"
                  onClick={() => {
                     saveProject()
                     // Array.from(document.getElementsByClassName('target')).map(e => {
                     //    changeItemProperty(e.getAttribute('data-item-id'), 'transform', e.getAttribute('style')?.replaceAll('transform: ',
                     // '')?.replaceAll(';', '') ?? '') })
                  }}
               >{t('save')}</Button>
               
               
               <Button
                  w="full" colorScheme="purple" mb="4"
                  onClick={addItemModal.onOpen}
               >{t('add_object')}</Button>
               
               
               <Button
                  w="full" colorScheme="gray" mb="4"
                  onClick={() => setLockSpaces(i => !i)}
                  leftIcon={<Icon as={spacesLocked ? BiLockOpen : BiLock} />}
               >{t(spacesLocked ? 'unlock_spaces' : 'lock_spaces')}</Button>
            
            </Box>
            
            <ItemPropertyMenu />
         
         </Box>
         
         <AddItemModal controls={addItemModal} />
      </>
   )
   
}

export default Navbar
