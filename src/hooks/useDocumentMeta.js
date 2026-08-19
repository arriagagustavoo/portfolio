import { useEffect } from 'react'
import { useLanguage } from '../i18n/languageContext'

const siteUrl = "https://arriagagustavoo.com"

function upsertMeta(attribute, name, content){
    let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);

    if(!tag){
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
    }

    tag.setAttribute('content', content);
}

function upsertLink(rel, hreflang, href){
    let selector = `link[rel="${rel}"]`;

    if(hreflang){
        selector = `link[rel="${rel}"][hreflang="${hreflang}"]`;
    }

    let tag = document.head.querySelector(selector);

    if(!tag){
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);

        if(hreflang){
            tag.setAttribute('hreflang', hreflang);
        }

        document.head.appendChild(tag);
    }

    tag.setAttribute('href', href);
}

function removeLinks(rel){
    document.head.querySelectorAll(`link[rel="${rel}"]`).forEach((tag) => {
        tag.remove();
    });
}

// neutralPath is the path with no language prefix: '' for home, null for a page with no translation
function useDocumentMeta(meta, neutralPath){

    const { language } = useLanguage();

    useEffect(() => {
        document.title = meta.title;

        upsertMeta('name', 'description', meta.description);
        upsertMeta('property', 'og:title', meta.title);
        upsertMeta('property', 'og:description', meta.description);

        // a 404 is not a real page, so it gets no canonical and nothing to translate to
        if(neutralPath === null){
            removeLinks('canonical');
            removeLinks('alternate');
            return;
        }

        let englishPath = neutralPath;
        if(englishPath === ''){
            englishPath = '/';
        }

        const englishUrl = siteUrl + englishPath;
        const spanishUrl = siteUrl + '/es' + neutralPath;

        let canonicalUrl;
        let locale;
        if(language === 'es'){
            canonicalUrl = spanishUrl;
            locale = 'es_US';
        }else{
            canonicalUrl = englishUrl;
            locale = 'en_US';
        }

        upsertMeta('property', 'og:url', canonicalUrl);
        upsertMeta('property', 'og:locale', locale);

        upsertLink('canonical', null, canonicalUrl);
        upsertLink('alternate', 'en', englishUrl);
        upsertLink('alternate', 'es', spanishUrl);
        upsertLink('alternate', 'x-default', englishUrl);
    }, [meta, neutralPath, language]);
}

export default useDocumentMeta
