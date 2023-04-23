import { atom, useAtom } from 'jotai'
import { withImmer } from 'jotai/immer'
import { focusAtom } from 'jotai/optics'
import { selectAtom } from 'jotai/utils'
import { EditorData, FloorPlan } from '../types/types'
import { dataAtom } from './data.atom'

const floorPlanAtom = withImmer(focusAtom<EditorData, FloorPlan, void>(dataAtom, (optic) => optic.prop('floorPlan')))


export function useFloorPlan() {
   
   const [floorPlan] = useAtom(floorPlanAtom)
   
   return {
      floorPlan
   }
   
}
