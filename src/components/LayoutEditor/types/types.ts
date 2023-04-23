import exp from 'constants'
import { ReactNode } from 'react'

export interface FloorPlan {
   name: string,
   imageUrl: string,
   width: number,
   height: number
}

export interface CatalogItem {
   id: string,
   name: string,
   type: string,
   width: number,
   length: number,
   rotation: number
}

export interface TableAddons {
   type: 'oval' | 'rectangular'
   chairQuantity: [number, number, number, number] | number
}

export interface Item {
   id: string
   name: string,
   type: string,
   width: number,
   length: number,
   transform: string,
   color?: string,
   addons: TableAddons | undefined
}

export interface EditorData {
   floorPlan: FloorPlan
   items: Item[]
}
