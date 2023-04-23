import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { itemsAtom, useData } from '../atoms/data.atom'
import { _getAllCurrentItems } from '../helpers'
import { Item } from '../types/types'


export const useSaveProject = () => {
   
   const [, setItems] = useAtom(itemsAtom)
   const {data} = useData()

   return {
      saveProject: () => {
         
         let currentItems = _getAllCurrentItems()
   
         console.log({
            ...data,
            items: currentItems
         })
      },
   }
   
}
