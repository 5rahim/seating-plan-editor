import { v4 as uuid } from 'uuid'
import { _getTargetData } from '../helpers'
import { Item } from '../types/types'

export const useElementManipulation = () => {
   
   return {
      getItemsFromElements: (targets: (HTMLElement | SVGElement)[], newId: boolean = true, callback?: () => void): Item[] => {
         
         let items: Item[] = []
         
         targets.map((t) => {
      
            const data = _getTargetData(t)
            if (!!data) {
               items.push({
                  ...data,
                  id: newId ? uuid() : data.id,
                  transform: t.getAttribute('style')?.replaceAll('transform: ', '').replaceAll(';', '') ?? data.transform,
               })
            }
         })
         
         callback && callback()
         
         return items
         
      },
      getTargetsFromIds: (ids: string[]) => {
         
         let targets: (HTMLElement | SVGElement)[] = []
         
         ids.map(id => {
            const target = document.getElementsByClassName(`target${id}`)[0]
            targets.push(target as HTMLElement)
         })
         
         return targets
         
      },
      deleteItemsFromElements: (targets: (HTMLElement | SVGElement)[], currentItems: Item[], callback?: () => void): Item[] => {
   
         let items: Item[] = currentItems
         
         targets.map((target) => {
            const data = _getTargetData(target)
            if (!!data) {
               items = items.filter(i => i.id !== data.id)
            }
         })
         
         callback && callback()
         
         return items
      
      }
   }
   
}
