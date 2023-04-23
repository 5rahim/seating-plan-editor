import * as R from 'ramda'
import { Item } from './types/types'

type StorageArray<T> = T[]
type Param<T> = T | null | undefined

// export const _getIndexByField = (field: string, value: Param<string>) => (arr: StorageArray<any>): number | null => {
//    const index = arr.findIndex((v: any) => v[field] === value)
//    return (value && index !== -1) ? index : null
// }

// INSERT

export const _insertObject = <T>(object: T) => (arr: T[]) => {
   return [...arr, object]
}
export const _insertObjects = <T>(object: T[]) => (arr: T[]) => {
   return [...arr, ...object]
}

// SELECT 1

export const _selectObjectById = <T>(id: Param<string>) => (arr: T[]): T | null => {
   const index = arr.findIndex((v: any) => v.id === id)
   return (id && index !== -1) ? arr[index] : null
}

export const _selectObjectByField = <T>(field: string, value: Param<string>) => (arr: T[]): T | null => {
   const index = arr.findIndex((v: any) => v[field] === value)
   return (value && index !== -1) ? arr[index] : null
}

// SELECT *

export const _selectAllObjectsByField = <T>(field: string, value: Param<string>) => (arr: T[]): T[] | null => {
   return arr.filter((object: any) => object[field] === value)
}

// UPDATE

export const _updateObjectById = <T>(id: string, property: string, newValue: any) => (arr: T[]): T[] => {
   return R.map(R.when(R.propEq('id', id), R.assoc(property, newValue)))(arr as any) as T[]
}

export const _changeObjectById = <T>(id: string, newValue: T) => (arr: T[]): T[] => {
   const index = arr.findIndex((v: any) => v['id'] === id)
   const newArr = [...arr]
   newArr[index] = newValue
   return newArr
}

// DELETE

export const _removeObjectById = <T>(id: string) => (arr: T[]): T[] => {
   return R.reject(R.propEq('id', id), arr as any)
}

export const _removeObjectByField = <T>(field: string, value: Param<string>) => (arr: T[]): T[] => {
   return R.reject(R.propEq(field, value), arr as any)
}

// export const _findById = (id: string | null, arr: any) => id ? R.find(R.propEq(id, 'id'))(arr) : undefined

/**
 * Returns object from array of objects where field id is found
 * @param {string | null | undefined} id
 * @param arr
 * @returns {any}
 */
export const _findById = (id: string | null | undefined, arr: any) => {
   const index = arr.findIndex((v: any) => v.id === id)
   return ( id && index !== -1 ) ? arr[index] : null
}
/**
 * Returns object from array of objects where field id is found
 * @param {string | null | undefined} id
 * @param arr
 * @returns {any}
 */
export const _findBy = (field: string, id: string | null | undefined, arr: any) => {
   const index = arr.findIndex((v: any) => v[field] === id)
   return ( id && index !== -1 ) ? arr[index] : null
}

export const _updateAt = (id: string, transform: any) => R.map(R.when(R.propEq('id', id), transform))

export const _getAllCurrentItems = (): Item[] => {
   const htmlElements = Array.from(document.getElementsByClassName('target')) as HTMLElement[]
   
   let arr: Item[] = []
   
   htmlElements?.map(t => {
      const dataAttr = t.getAttribute('data-item-data')
      const data = ( dataAttr?.length && dataAttr?.length > 0 ) ? JSON.parse(dataAttr ?? '') : undefined
      if (!!data) {
         arr.push({ ...data, transform: t.getAttribute('style')?.replaceAll('transform: ', '').replaceAll(';', '') ?? data.transform })
      }
   })
   
   return arr
}

export const _getTargetData = (target: HTMLElement | SVGElement): Item | undefined => {
   
   const dataAttr = target.getAttribute('data-item-data')
   return ( dataAttr?.length && dataAttr?.length > 0 ) ? JSON.parse(dataAttr ?? '') : undefined
   
}

export const _translateItem = (item: Item, offsetX: number, offsetY: number): Item => {
   
   const stylesArr = item.transform.replaceAll(', ', ',').split(' ')
   const translateString = stylesArr.filter(a => a.includes('translate'))[0]
   const translateIndex = stylesArr.findIndex(a => a.includes('translate'))
   
   const valuesArr = translateString.replaceAll('translate(', '').replaceAll(')', '').replaceAll('px', '').split(',').map(a => parseFloat(a))
   const newValuesArr = [valuesArr[0]+offsetX, valuesArr[1]+offsetY]
   
   let newStylesArr = [...stylesArr]
   newStylesArr[translateIndex] = `translate(${newValuesArr[0]}px,${newValuesArr[1]}px)`

   return { ...item, transform: newStylesArr.join(' ') }
}
