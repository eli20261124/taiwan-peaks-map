import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhTW from './locales/zh-TW.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';

const resources = {
  'zh-TW': { translation: zhTW },
  'en': { translation: en },
  'ja': { translation: ja },
  'ko': { translation: ko }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'zh-TW',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
