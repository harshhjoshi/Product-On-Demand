import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from './eng/translation.json';
import translationIT from './ita/translation.json';
// import translationFr from './french/translation.json';

export const resources = {
  en: {
    translation: translationEN,
  },
  it: {
    translation: translationIT,
  },
  // fr: {
  //   translation: translationFr,
  // },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

//
