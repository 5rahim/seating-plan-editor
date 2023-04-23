import { CSSObject, Flex, Icon, Text } from '@chakra-ui/react'
import { IconType } from '@react-icons/all-files'
import { BiAdjust } from '@react-icons/all-files/bi/BiAdjust'
import { BiChair } from '@react-icons/all-files/bi/BiChair'
import { BiQuestionMark } from '@react-icons/all-files/bi/BiQuestionMark'
import { BiRectangle } from '@react-icons/all-files/bi/BiRectangle'
import { BiRestaurant } from '@react-icons/all-files/bi/BiRestaurant'
import { BiStreetView } from '@react-icons/all-files/bi/BiStreetView'
import { BiWalk } from '@react-icons/all-files/bi/BiWalk'
import { BiWifi0 } from '@react-icons/all-files/bi/BiWifi0'
import { BsSpeaker } from '@react-icons/all-files/bs/BsSpeaker'
import { FaCocktail } from '@react-icons/all-files/fa/FaCocktail'
import { SiAirtable } from '@react-icons/all-files/si/SiAirtable'
import { useAtom } from 'jotai'
import React, { memo, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { itemAtomFamily, selectedItemIdAtom } from '../../atoms/items.atom'
import { Item, TableAddons } from '../../types/types'
import { lockSpacesAtom } from '../Navbar'
import { targetsAtom } from './index'

interface ItemProps {
   children?: React.ReactNode
   data: Item
}

const Item: React.FC<ItemProps> = memo((props) => {
   
   const { children, data, ...rest } = props
   
   const [selectedItemId, setSelectedItemId] = useAtom(selectedItemIdAtom)
   const [item, setItem] = useAtom(itemAtomFamily(data.id))
   
   const [spacesLocked] = useAtom(lockSpacesAtom)
   
   const selectableClass = item.type === 'space' ? (spacesLocked ? `` : `target-selectable`) : 'target-selectable'
   
   useEffect(() => {
      setItem(data)
   }, [])
   
   useEffect(() => {
      // console.log(data.id, 're-renders')
   })
   
   let styles: CSSObject = {}
   
   
   switch (data.type) {
      /**
       * Table
       */
      case 'table':
         const addons = data.addons as TableAddons
         styles = {
            bgColor: "#596dff",
            border: "3px solid #3a49be",
            borderRadius: addons.type === 'oval' ? '50%' : "5px",
            color: '#fff',
            zIndex: 4
         }
         break
      case 'stage':
         styles = {
            bgColor: "#8f77ff",
            border: "3px solid #4735a1",
            borderRadius: "5px",
            color: '#fff',
            zIndex: 1,
         }
         break
      case 'speaker':
         styles = {
            bgColor: "#62c84c",
            border: "3px solid #339d49",
            borderRadius: "5px",
            color: '#fff',
            zIndex: 2,
         }
         break
      case 'buffet':
         styles = {
            bgColor: "#ffab5b",
            border: "3px solid #f18722",
            borderRadius: "5px",
            color: '#fff',
            zIndex: 2,
         }
         break
      case 'bar':
         styles = {
            bgColor: "#62d1e3",
            border: "3px solid #398895",
            borderRadius: "5px",
            color: '#fff',
            zIndex: 2,
         }
         break
      case 'space':
         styles = {
            bgColor: "#f3f3f3",
            border: "1px solid #ddd",
            borderRadius: "0px",
            color: '#000',
            zIndex: 0,
         }
         break
      case 'object':
         styles = {
            bgColor: "#dfdfdf",
            border: "3px solid #b9b9b9",
            borderRadius: "5px",
            color: '#000',
            zIndex: 2,
         }
         break
   }
   
   
   let ItemIcon: IconType | null
   
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
         ItemIcon = null
         break
      default:
         ItemIcon = BiQuestionMark
         break
   }
   
   function renderOvalTableChairs(w: number, h: number, numberOfChairs: number) {
      
      let chairs: number[] = []
      
      for (let i = 1; i <= numberOfChairs; i++) {
         chairs.push(i)
      }
      
      let width = w / 2
      let height = h / 2
      let angle = 0
      let step = 2 * Math.PI / chairs.length
      let radius = width + 20
      
      angle = -90 * Math.PI / 180
      
      return chairs.map((c, index) => {
            
            var x = Math.round(width + radius * Math.cos(angle)) - ( 35 / 2 ) + 2
            var y = Math.round(height + radius * Math.sin(angle)) - ( 35 / 2 ) - 4
            
            let rotationBase = -0
            let rotation = rotationBase + 360 / chairs.length * index
            
            angle = angle - step
            
            return (
               <Icon
                  key={c}
                  as={BiChair}
                  color="messenger.700"
                  width="27px"
                  height="35px"
                  borderRadius="md"
                  bgColor="#eee"
                  position="absolute"
                  right={x + 'px'}
                  top={y + 'px'}
                  transform={'rotate(' + rotation + 'deg)'}
                  zIndex="1"
               />
            )
         },
      )
   }
   
   function renderRectangularTableChairs(w: number, h: number, chairArr: [number, number, number, number]) {
      
      const types = ['top', 'right', 'bottom', 'left']
      
      try {
         return chairArr?.map((c, index) => {
         
               let chairs: number[] = []
         
               const type = types[index]
               let styles: CSSObject = {}
         
               switch (type) {
                  case 'top':
                     styles = {
                        justifyContent: 'space-around',
                        top: `-${40}px`
                     }
                     break
                  case 'right':
                     styles = {
                        justifyContent: 'space-around',
                        right: `-${44}px`,
                        transform: 'rotate(90deg)',
                        width: h,
                     }
                     break
                  case 'bottom':
                     styles = {
                        justifyContent: 'space-around',
                        transform: 'rotate(180deg)',
                        bottom: `-${40}px`
                     }
                     break
                  case 'left':
                     styles = {
                        justifyContent: 'space-around',
                        left: `-${44}px`,
                        transform: 'rotate(-90deg)',
                        width: h,
                     }
                     break
               }
         
               for (let i = 1; i <= c; i++) {
                  chairs.push(i)
               }
         
               return (
                  <Flex
                     key={uuid()}
                     sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        ...styles,
                     }}
                  >
                     {chairs?.map(chair => {
                        return (
                           <Icon
                              key={uuid()}
                              as={BiChair}
                              color="messenger.700"
                              width="27px"
                              height="35px"
                              borderRadius="md"
                              bgColor="#eee"
                              position="relative"
                              zIndex="1"
                           />
                        )
                     })}
                  </Flex>
               )
         
               return <></>
         
            },
         )
      } catch (e) {
      
      }
   }
   
   return (
      <>
         <Flex
            data-item-data={JSON.stringify(item)}
            width={item.width + 'px'}
            height={item.length + 'px'}
            data-item-id={data.id}
            sx={styles}
            className={`target target${data.id} ${selectableClass}`}
            position="absolute"
            css={'transform: ' + item.transform + ';'}
            zIndex="4"
         >
            
            {/*Table chairs*/}
            <Flex position="relative" w="100%" h="100%">
               {( item.type === 'table' && item.addons?.type === 'oval' ) ?
                  renderOvalTableChairs(item.width, item.length, item.addons.chairQuantity as number) : null}
               
               {( item.type === 'table' && item.addons?.type === 'rectangular' ) ?
                  renderRectangularTableChairs(item.width, item.length, item.addons.chairQuantity as [number, number, number, number]) : null}
            </Flex>
            
            
            
               <Flex
                  w="100%" h="100%" position="absolute" justifyContent="center" alignItems="center"
                  fontWeight="600"
               >
                  {ItemIcon && <Icon
                     position="absolute"
                     as={ItemIcon}
                     color="#2c2c2d"
                     fontSize="2.5rem"
                     opacity=".4"
                  />}
                  {item.name.length > 0 && (<Text zIndex="1">{item.name}</Text>)}
               </Flex>
            
         </Flex>
      </>
   )
   
})

export default Item
