import { useSetAtom } from 'jotai'
import React, { ReactNode, useEffect } from 'react'
import { dataAtom, useData } from './atoms/data.atom'
import { useFloorPlan } from './atoms/floorPlan.atom'
import Editor from './modules/Editor'
import Layout from './modules/Layout'
import { EditorData } from './types/types'


interface LayoutEditorProps {
   locale?: 'fr' | 'en'
   data?: EditorData
   children?: ReactNode
}

const LayoutEditor: React.FC<LayoutEditorProps> = (props) => {
   
   const { children, data, ...rest } = props
   
   const setData = useSetAtom(dataAtom)
   
   if(!data) return <></>
   
   useEffect(() => {
      setData(data)
   }, [])
   
   return (
      <Layout>
         <Editor />
      </Layout>
   )
   
}

export default LayoutEditor
