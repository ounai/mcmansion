import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { languageLocalStorageKey } from '../state/appSettings';
import { defaultLanguage } from '.';

import enTranslation from '../assets/i18n/en.json';
import fiTranslation from '../assets/i18n/fi.json';

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation
    },
    fi: {
      translation: fiTranslation
    }
  },
  lng: localStorage.getItem(languageLocalStorageKey) ?? defaultLanguage,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
