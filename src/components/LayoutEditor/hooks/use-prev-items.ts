import { atom, useAtom } from 'jotai'
import { withImmer } from 'jotai/immer'
import { itemsAtom } from '../atoms/data.atom'
import { _getAllCurrentItems } from '../helpers'
import { Item } from '../types/types'

export const prevItemsAtom = withImmer(atom<Item[]>([]))

export const usePrevItems = () => {
   
   const [, setItems] = useAtom(itemsAtom)
   const [prevItems, setPrevItems] = useAtom(prevItemsAtom)
   
   return {
      prevItems,
      saveCurrentItems: () => {
         let arr = _getAllCurrentItems()
         setPrevItems(arr)
         
      },
      restorePrevItems: () => {
         if (prevItems.length > 0) {
            setItems(prevItems)
         }
      },
   }
   
}
