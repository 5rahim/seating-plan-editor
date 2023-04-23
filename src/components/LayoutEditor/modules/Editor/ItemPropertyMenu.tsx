import { Box, Button, Flex, FormControl, FormLabel, HStack, Icon, InputGroup, Link, SlideFade, Stack, useToast, VStack } from '@chakra-ui/react'
import { IconType } from '@react-icons/all-files'
import { BiAdjust } from '@react-icons/all-files/bi/BiAdjust'
import { BiBorderBottom } from '@react-icons/all-files/bi/BiBorderBottom'
import { BiBorderLeft } from '@react-icons/all-files/bi/BiBorderLeft'
import { BiBorderRight } from '@react-icons/all-files/bi/BiBorderRight'
import { BiBorderTop } from '@react-icons/all-files/bi/BiBorderTop'
import { BiChair } from '@react-icons/all-files/bi/BiChair'
import { BiRectangle } from '@react-icons/all-files/bi/BiRectangle'
import { BiRestaurant } from '@react-icons/all-files/bi/BiRestaurant'
import { BiStreetView } from '@react-icons/all-files/bi/BiStreetView'
import { BiWalk } from '@react-icons/all-files/bi/BiWalk'
import { BsSpeaker } from '@react-icons/all-files/bs/BsSpeaker'
import { FaCocktail } from '@react-icons/all-files/fa/FaCocktail'
import { FaSpeakerDeck } from '@react-icons/all-files/fa/FaSpeakerDeck'
import { FcSpeaker } from '@react-icons/all-files/fc/FcSpeaker'
import { FiSpeaker } from '@react-icons/all-files/fi/FiSpeaker'
import { SiAirtable } from "@react-icons/all-files/si/SiAirtable"
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { itemsAtom } from '../../atoms/data.atom'
import { selectedItemAtom } from '../../atoms/items.atom'
import { usePrevItems } from '../../hooks/use-prev-items'
import { useSelectedItem } from '../../hooks/use-selected-item'
import { useTranslation } from '../../hooks/use-translation'
import EditorContent from '../../ui/EditorContent'
import EditorHeader from '../../ui/EditorHeader'
import EditorInput, { EditorNumberInput, EditorNumberMeterAddon } from '../../ui/EditorInput'
import { targetsAtom } from './index'


interface ItemPropertyMenuProps {
   children?: React.ReactNode
}

const ItemPropertyMenu: React.FC<ItemPropertyMenuProps> = (props) => {
   const t = useTranslation()
   const { children, ...rest } = props
   const toast = useToast()
   const { selectedItemId, selectItem } = useSelectedItem()
   
   const [item, setItem] = useAtom(selectedItemAtom)
   const [, setItems] = useAtom(itemsAtom)
   
   const [name, setName] = useState<string>(item?.name ?? '')
   const [icon, setIcon] = useState<IconType>(BiAdjust)
   
   const { saveCurrentItems, restorePrevItems } = usePrevItems()
   const [,setTargets] = useAtom(targetsAtom)
   
   
   useEffect(() => {
      if (item) {
         setName(item.name)
      }
   }, [item])
   
   function handleChangeName(e: any) {
      setItem(i => ( { ...item, name } ))
   }
   
   function handleChangeProperty(property: string, value: any) {
      setItem(i => ( { ...item, [property]: value } ))
   }
   
   let ItemIcon: IconType
   
   switch (item?.type) {
      case 'table':
         ItemIcon = SiAirtable
         break
      case 'stage':
         ItemIcon = BiStreetView
         break
      case 'speaker':
         ItemIcon = BsSpeaker
         break
      case 'buffet':
         ItemIcon = BiRestaurant
         break
      case 'bar':
         ItemIcon = FaCocktail
         break
      case 'space':
         ItemIcon = BiWalk
         break
      case 'object':
         ItemIcon = BiRectangle
         break
      default:
         ItemIcon = BiAdjust
         break
   }
   
   if (!selectedItemId || !item) return <></>
   
   function handleDeleteObject() {
      if (item) {
         saveCurrentItems()
         setItems(i => i.filter(o => o.id !== item.id))
         selectItem(null)
         setTargets([])
   
         toast({
            title: t('deleted'),
            description: <><Link onClick={restorePrevItems}>{t('undo')}</Link></>,
            status: 'error',
            duration: 5000,
            isClosable: true,
         })
      }
   }
   
   return (
      <>
         <SlideFade in={!!selectedItemId && !!item} offsetY="20px">
            <Box
               position="relative"
               minHeight="300px"
               width="100%"
               color="#000"
            >
               {/*{item.name}*/}
               
               <EditorHeader>{t('object_details')}: {t(item.type)}</EditorHeader>
               
               {/*<Divider color="#000" />*/}
               
               <EditorContent>
                  
                  <Flex
                     w="65px"
                     h="65px"
                     justifyContent="center"
                     borderRadius="8"
                     bgColor="#ddd"
                     alignItems="center"
                     margin="0 auto"
                  >
                     <Icon
                        as={ItemIcon}
                        color="#2c2c2d"
                        fontSize="2rem"
                     />
                  </Flex>
                  
                  <Stack>
                     <FormControl>
                        <FormLabel>{t('name')}:</FormLabel>
                        <EditorInput value={name} onChange={(e) => setName(e.target.value)} onBlur={handleChangeName} />
                     </FormControl>
                     
                     <FormControl>
                        {/*<FormLabel>{t('size')}:</FormLabel>*/}
                        <HStack gap="2">
                           
                           <Box>
                              <FormLabel>{t('width')}</FormLabel>
                              <InputGroup>
                                 <EditorNumberInput value={item.width / 65} onChange={(v) => handleChangeProperty('width', parseFloat(v) * 65)} />
                                 <EditorNumberMeterAddon />
                              </InputGroup>
                           </Box>
                           
                           {/*<Box mt="6">x</Box>*/}
                           
                           <Box>
                              <FormLabel>{t('length')}</FormLabel>
                              <InputGroup>
                                 <EditorNumberInput value={item.length / 65} onChange={(v) => handleChangeProperty('length', parseFloat(v) * 65)} />
                                 <EditorNumberMeterAddon />
                              </InputGroup>
                           </Box>
                        
                        </HStack>
                     </FormControl>
                  </Stack>
               
               </EditorContent>
               
               
               {/*Table chairs*/}
               {item.type === 'table' && <>
                   <EditorHeader>{t('chairs')}</EditorHeader>

                   <EditorContent>

                       <Flex
                           w="45px"
                           h="45px"
                           justifyContent="center"
                           borderRadius="8"
                           bgColor="#ddd"
                           alignItems="center"
                           margin="0 auto"
                           mb="2"
                       >
                           <Icon
                               as={BiChair}
                               color="#2c2c2d"
                               fontSize="1.5rem"
                           />
                       </Flex>
                      
                      {/*Oval*/}
                      {( item.type === 'table' && item.addons?.type === 'oval' ) && <FormControl>
                          <FormLabel>{t('chair_number')}</FormLabel>
                          <EditorNumberInput
                              value={item.addons.chairQuantity as number}
                              onChange={(v) => handleChangeProperty('addons', { ...item?.addons, chairQuantity: parseInt(v) })}
                              step={1}
                              max={30}
                              min={0}
                          />

                      </FormControl>}
                      
                      {/*Rectangular*/}
                      {( item.type === 'table' && item.addons?.type === 'rectangular' ) && <FormControl>
                          <FormLabel>{t('chair_number')}</FormLabel>

                          <VStack>
                              <Flex flexWrap="wrap">
                                 {[
                                    { index: 0, icon: BiBorderTop },
                                    { index: 1, icon: BiBorderRight },
                                    { index: 2, icon: BiBorderBottom },
                                    { index: 3, icon: BiBorderLeft },
                                 ].map(pos => {
                                    return (
                                       <Box key={pos.index.toString()} width="50%" p="1">
                                          <Icon fontSize="1.5rem" as={pos.icon} />
                                          <EditorNumberInput
                                             value={( item?.addons?.chairQuantity as [number, number, number, number] )?.[pos.index] ?? 0}
                                             onChange={(v) => {
                                                const newValue = parseInt(v)
                                                let newArr: [number, number, number, number] = [...( item?.addons?.chairQuantity as [number, number, number, number] )] ?? []
                                                newArr[pos.index] = newValue
                                                handleChangeProperty('addons', { ...item?.addons, chairQuantity: newArr })
                                             }}
                                             step={1}
                                             max={30}
                                             min={0}
                                          />
                                       </Box>
                                    )
                                 })}
                              </Flex>
                          </VStack>

                      </FormControl>}
                   </EditorContent>
               </>}
               
               <EditorContent>
                  <Button w="full" colorScheme="red" variant="ghost" onClick={handleDeleteObject}>{t('delete_object')}</Button>
               </EditorContent>
               
               
               <FormControl>
                  <Box m="4" p="1" fontSize="md" bgColor="#eee" borderRadius="md" overflow="hidden">
                     {/*<pre style={{ fontSize: '.9rem' }}>{JSON.stringify(item.transform.replaceAll(', ', ',').split(' ').filter(e => e.length > 0), null, 1)}</pre>*/}
                  </Box>
               </FormControl>
            
            </Box>
         </SlideFade>
      </>
   )
   
}

export default ItemPropertyMenu
