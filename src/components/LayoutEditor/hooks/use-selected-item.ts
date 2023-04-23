import { useAtom } from 'jotai'
import { editItemAtom, editSelectedItemAtom, selectedItemIdAtom } from '../atoms/items.atom'

export const useSelectedItem = () => {
   const [selectedItemId, setSelectedItemId] = useAtom(selectedItemIdAtom)
   const [, changeSelectedItemProperty] = useAtom(editSelectedItemAtom)
   const [, changeItemProperty] = useAtom(editItemAtom)
   return {
      selectedItemId,
      selectItem: (id: string | null) => {
         if (id) {
            setSelectedItemId(id)
         } else {
            setSelectedItemId(null)
         }
      },
      transformSelectedItem: (id: string | null, transform: string) => {
         if (id) {
            // console.log(transform.replaceAll(', ', ',').split(' '))
            changeSelectedItemProperty({ transform })
         }
      },
      changeItemProperty: (id: string | null, property: string, data: any) => {
         if (id) {
            changeItemProperty({ id, data: { [property]: data } })
         }
      },
   }
}
