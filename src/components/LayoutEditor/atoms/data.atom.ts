import { atom, useAtom } from 'jotai'
import { withImmer } from 'jotai/immer'
import { focusAtom } from 'jotai/optics'
import { EditorData, Item } from '../types/types'

const initialData: EditorData = {
   floorPlan: {
      name: '',
      imageUrl: '',
      width: 0,
      height: 0,
   },
   items: [],
}

export const dataAtom = withImmer(atom<EditorData>(initialData))

export const itemsAtom = withImmer(focusAtom<EditorData, Item[], void>(dataAtom, optic => optic.prop('items')))


export function useData() {
   
   const [data] = useAtom(dataAtom)
   
   return {
      data,
   }
   
}
