import { atom, useAtom } from 'jotai'
import { withImmer } from 'jotai/immer'
import translations from '../translations'

const localeAtom = withImmer(atom<string>('fr'))

export const useTranslation = () => {
   const [locale] = useAtom(localeAtom)
   
   return (key: string): string => {
      return translations?.[key]?.[locale === 'fr' ? 0 : 1] ?? key
   }
}
