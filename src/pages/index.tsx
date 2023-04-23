import { atom } from 'jotai'
import dynamic from 'next/dynamic'
import { EditorData } from '../components/LayoutEditor/types/types'
// import LayoutEditor from '../components/LayoutEditor'

const countAtom = atom(0)
const doubleAtom = atom((get) => get(countAtom) * 2)

const LayoutEditor = dynamic(import('../components/LayoutEditor'), { ssr: false })

export default function Home() {
   
   const data: EditorData = {
      floorPlan: {
         name: 'Venue 1',
         imageUrl: '/assets/floor_plan_04.png',
         width: 936,
         height: 979,
      },
      items: [
         {
            id: 'a1',
            name: 'Table 1',
            type: 'table',
            width: 65*2,
            length: 65*2,
            transform: 'translate(195px, 348px)',
            addons: {
               chairQuantity: 8,
               type: 'oval',
            },
         },
         {
            id: 'a2',
            name: 'Table 2',
            type: 'table',
            width: 65,
            length: 65,
            transform: '',
            addons: {
               chairQuantity: 5,
               type: 'oval',
            },
         },
         {
            id: 'a3',
            name: 'Table 3',
            type: 'table',
            width: 65*4,
            length: 65,
            transform: '',
            addons: {
               chairQuantity: [4, 1, 4, 1],
               type: 'rectangular',
            },
         },
         {
            id: 'a4',
            name: 'Table 4',
            type: 'table',
            width: 65,
            length: 65,
            transform: '',
            addons: {
               chairQuantity: [1, 1, 1, 1],
               type: 'rectangular',
            },
         },
      ],
   }
   
   return (
      <LayoutEditor data={data} />
   )
}
