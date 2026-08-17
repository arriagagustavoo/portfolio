import { createContext, useContext } from 'react'

const LanguageContext = createContext(null)

export default LanguageContext

// language, basePath, otherBasePath, neutralPath and copy
export function useLanguage(){
    return useContext(LanguageContext)
}

export function useCopy(){
    return useContext(LanguageContext).copy
}
