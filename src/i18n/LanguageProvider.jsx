import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LanguageContext from './languageContext'
import en from './en'
import es from './es'

const dictionaries = { en: en, es: es }

// the url is the only source of truth, which is why no pre-paint script is needed
function readLanguage(pathname){
    if(pathname === '/es' || pathname.startsWith('/es/')){
        return 'es'
    }else{
        return 'en'
    }
}

// the path with the language prefix stripped: '' for home, '/privacy' for the policy
function readNeutralPath(pathname, language){
    let rest = pathname;

    if(language === 'es'){
        rest = pathname.slice(3);
    }

    if(rest === '/' || rest === ''){
        return '';
    }else{
        return rest;
    }
}

function LanguageProvider({ children }){

    const location = useLocation();

    const language = readLanguage(location.pathname);
    const neutralPath = readNeutralPath(location.pathname, language);

    let basePath;
    let otherBasePath;
    if(language === 'es'){
        basePath = '/es';
        otherBasePath = '';
    }else{
        basePath = '';
        otherBasePath = '/es';
    }

    // lang switches screen reader pronunciation, data-lang is the css hook
    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.setAttribute('data-lang', language);
    }, [language]);

    const value = {
        language: language,
        basePath: basePath,
        otherBasePath: otherBasePath,
        neutralPath: neutralPath,
        copy: dictionaries[language],
    };

    return (
        <LanguageContext.Provider value = {value}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider
