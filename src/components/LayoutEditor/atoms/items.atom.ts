import { atom, WritableAtom } from 'jotai'
import { withImmer } from 'jotai/immer'
import { atomFamily } from 'jotai/utils'
import { _changeObjectById } from '../helpers'
import { Item } from '../types/types'
import { itemsAtom } from './data.atom'


export const selectedItemIdAtom = withImmer(atom<string | null>(null))

export const itemAtomFamily = atomFamily<string, WritableAtom<Item, any>>((id: string) =>
   atom((get) => get(itemsAtom).filter(i => i.id === id)[0],
      (get, set, arg: Item) => {
         set(itemsAtom, _changeObjectById<Item>(arg.id, arg)(get(itemsAtom)))
      },
   ),
)

/**
 * Selected Item Atom
 * Getter => return Item from itemsAtom
 * Setter => change value of Item from itemsAtom
 * @type {WritableAtom<Item | null, ((draft: Draft<Item | null>) => void) | Item | null>}
 */
export const selectedItemAtom = withImmer(atom<Item | null, Item | null, any>(
   get => {
      if (get(selectedItemIdAtom)) {
         return get(itemAtomFamily(get(selectedItemIdAtom) ?? ''))
      } else {
         return null
      }
   },
   (get, set, arg) => {
      if (get(selectedItemIdAtom)) {
         set(itemAtomFamily(get(selectedItemIdAtom) ?? ''), arg)
      }
   },
))

/**
 * Editable Item Atom
 * Setter => change property of Item from itemsAtom
 * @type {WritableAtom<Item | null, ((draft: Draft<Item | null>) => void) | Item | null>}
 */
export const editSelectedItemAtom = withImmer(atom<Item | null, any, any>(
   null,
   (get, set, arg) => {
      if (get(selectedItemIdAtom)) {
         set(itemAtomFamily(get(selectedItemIdAtom) ?? ''), { ...get(itemAtomFamily(get(selectedItemIdAtom) ?? '')), ...arg })
         // console.log(get(itemAtomFamily(get(selectedItemIdAtom) ?? '')))
      }
   },
))
/**
 * Editable Item Atom
 * Setter => change property of Item from itemsAtom
 * @type {WritableAtom<Item | null, ((draft: Draft<Item | null>) => void) | Item | null>}
 */
export const editItemAtom = withImmer(atom<Item | null, any, any>(
   null,
   (get, set, arg) => {
      const { id, data } = arg
      set(itemAtomFamily(id), { ...get(itemAtomFamily(id)), ...data })
   },
))



