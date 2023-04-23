import { Box, Button, Link, useToast } from '@chakra-ui/react'
import { atom, useAtom } from 'jotai'
import { withImmer } from 'jotai/immer'
import MoveableHelper from 'moveable-helper'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import InfiniteViewer from 'react-infinite-viewer'
import Moveable from 'react-moveable'
import Selecto from 'react-selecto'
import { v4 as uuid } from 'uuid'
import { itemsAtom, useData } from '../../atoms/data.atom'
import { useFloorPlan } from '../../atoms/floorPlan.atom'
import { _translateItem } from '../../helpers'
import { useElementManipulation } from '../../hooks/use-item-manipulation'
import { usePrevItems } from '../../hooks/use-prev-items'
import { useSelectedItem } from '../../hooks/use-selected-item'
import { useTranslation } from '../../hooks/use-translation'
import { Item as ItemType } from '../../types/types'
import Item from './Item'

interface EditorProps {
   children?: ReactNode
}

export const targetsAtom = withImmer(atom<Array<SVGElement | HTMLElement>>([]))


const Editor: React.FC<EditorProps> = (props) => {
   
   const { children, ...rest } = props
   
   // Hooks
   const t = useTranslation()
   const { selectItem } = useSelectedItem()
   const { saveCurrentItems, restorePrevItems } = usePrevItems()
   const { floorPlan } = useFloorPlan()
   const { data } = useData()
   const [, setItems] = useAtom(itemsAtom)
   const toast = useToast()
   const { getItemsFromElements, deleteItemsFromElements, getTargetsFromIds } = useElementManipulation()
   
   
   const selectoRef = React.useRef<Selecto>(null)
   const moveableRef = React.useRef<Moveable>(null)
   const viewerRef = useRef<InfiniteViewer>(null)
   
   const [copiedData, setCopiedData] = useState<ItemType[]>([])
   const [newIds, setNewIds] = useState<string[]>([])
   const [targets, setTargets] = useAtom(targetsAtom)
   
   
   const [helper] = useState(() => {
      return new MoveableHelper()
   })
   
   useEffect(() => {
      setTimeout(() => {
         saveCurrentItems()
         viewerRef.current!.scrollCenter()
      }, 100)
   }, [])
   
   useEffect(() => {
      if (newIds.length > 0) {
         setTargets(getTargetsFromIds(newIds))
      }
   }, [newIds])
   
   
   useEffect(() => {
      
      const ctrlFunc = function (ev: KeyboardEvent) {
         
         ev = ev || window.event  // Event object 'ev'
         var key = ev.which || ev.keyCode // Detecting keyCode
         
         var ctrl = ev.ctrlKey ? ev.ctrlKey : ( ( key === 17 )
            ? true : false )
         
         if (key == 67) {
            setCopiedData([])
         }
         
         if (key === 46) {
            
            setItems(i => deleteItemsFromElements(targets, i, () => {
               toast({
                  title: t('deleted'),
                  description: <><Link onClick={restorePrevItems}>{t('undo')}</Link></>,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
               })
               saveCurrentItems()
               setTargets([])
            }))
            
         }
         
         if (key == 86 && ctrl) { // Ctrl + V
            // print in console.
            
            if (copiedData.length > 0) {
               
               let newIds: string[] = []
               
               copiedData.map(c => {
                  const newId = uuid()
                  setItems(i => [...i, _translateItem({ ...c, id: newId }, 20, 20)])
                  newIds.push(newId)
               })
               
               setNewIds(newIds)
               
            }
            
            
         } else if (key == 67 && ctrl) { // Ctrl + C
            
            setCopiedData(getItemsFromElements(targets, true, () => {
               toast({
                  title: t('copied'),
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
               })
            }))
            
         }
         
      }
      document.body.addEventListener("keydown", ctrlFunc, false)
      
      return () => document.body.removeEventListener('keydown', ctrlFunc)
      
   }, [targets, copiedData])
   
   if (!data || !floorPlan) return <></>
   
   return (
      <Box
         bgColor="#fff"
         // bgColor="#f6f0fd"
         id="container"
      >
         
         
         <Selecto
            ref={selectoRef}
            container={document.getElementById('#container')}
            dragContainer={document.getElementById('#container') ?? undefined}
            // dragContainer={window}
            selectableTargets={[".target-selectable"]}
            hitRate={0}
            selectByClick={true}
            selectFromInside={false}
            toggleContinueSelect={["shift"]}
            ratio={0}
            onDragStart={e => {
               const moveable = moveableRef.current!
               const target = e.inputEvent.target
               if (
                  moveable.isMoveableElement(target)
                  || targets.some(t => t === target || t.contains(target))
               ) {
                  e.stop()
               }
               // saveCurrentItems()
            }}
            onSelectEnd={e => {
               const moveable = moveableRef.current!
               if (e.isDragStart) {
                  e.inputEvent.preventDefault()
                  
                  moveable.waitToChangeTarget().then(() => {
                     moveable.dragStart(e.inputEvent)
                  })
               }
               setTargets(e.selected)
               // saveCurrentItems()
               
               // Select object
               if (e.selected?.length && e.selected.length === 1) {
                  selectItem(e.selected[0].getAttribute('data-item-id'))
               } else {
                  selectItem(null)
               }
            }}
         />
         
         
         <Button
            className="button" onClick={() => {
            viewerRef.current!.scrollCenter()
         }} style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 1,
         }}
         >Scroll Center
         </Button>
         <Button
            className="button"
            onClick={() => {
               restorePrevItems()
            }} style={{
            position: "fixed",
            top: "30px",
            right: "10px",
            zIndex: 1,
         }}
         >Go back
         </Button>
         
         
         <InfiniteViewer className="infinite-viewer" ref={viewerRef}>
            
            
            <Box
               bgImage={floorPlan.imageUrl}
               bgSize="cover"
               zIndex="1"
               // position="absolute"
               sx={{
                  width: `calc(${floorPlan.width}px / 1)`,
                  height: `calc(${floorPlan.height}px / 1)`,
               }}
            >
               
               <Moveable
                  // scrollable={true}
                  ref={moveableRef}
                  scrollContainer={() => viewerRef.current!.getElement()}
                  scrollThreshold={20}
                  getScrollPosition={() => {
                     return [
                        viewerRef.current!.getScrollLeft(),
                        viewerRef.current!.getScrollTop(),
                     ]
                  }}
                  onScroll={({ direction }) => {
                     // viewerRef.current!.scrollBy(direction[0] * 10, direction[1] * 10)
                  }}
                  target={targets}
                  draggable={true}
                  // resizable={true}
                  rotatable={true}
                  edgeDraggable={true}
                  // onDragStart={helper.onDragStart}
                  onDrag={e => {
                     e.target.style.transform = e.transform
                     // saveCurrentItems()
                  }}
                  // onResizeStart={helper.onResizeStart}
                  onResize={e => {
                     e.target.style.width = `${e.width}px`
                     e.target.style.height = `${e.height}px`
                     e.target.style.transform = e.drag.transform
                  }}
                  onRotateStart={helper.onRotateStart}
                  onRotate={(e) => {
                     helper.onRotate(e)
                     // saveCurrentItems()
                  }}
                  onClickGroup={e => {
                     selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget)
                  }}
                  onDragGroup={e => {
                     e.events.forEach(ev => {
                        ev.target.style.transform = ev.transform
                     })
                     // saveCurrentItems()
                  }}
                  snapDirections={{
                     top: true,
                     left: true,
                     bottom: true,
                     right: true,
                     center: true,
                     middle: true,
                  }}
                  elementSnapDirections={{
                     top: true,
                     left: true,
                     bottom: true,
                     right: true,
                     center: true,
                     middle: true,
                  }}
                  maxSnapElementGuidelineDistance={1000}
                  // horizontalGuidelines={[0, 100, 200, 300]}
                  // verticalGuidelines={[0, 100, 200, 300]}
                  snapGridWidth={65 / 4}
                  snapGridHeight={65 / 4}
                  snapDistFormat={(distance: number, type: "vertical" | "horizontal") => Math.round(distance / 65 * 100) / 100}
                  elementGuidelines={data.items.map(i => ( { element: `.target${i.id}` } ))}
                  snappable={true}
                  snapThreshold={5}
               />
               
               {data.items.map(i => {
                  return ( <Item key={i.id} data={i} /> )
               })}
            
            
            </Box>
         </InfiniteViewer>
      </Box>
   )
   
}

export default Editor
