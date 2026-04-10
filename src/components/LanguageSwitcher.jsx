import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'zh-TW', label: '中' },
  { code: 'en', label: '英' },
  { code: 'ja', label: '日' },
  { code: 'ko', label: '韓' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
  };

  return (
    <div className="flex items-center gap-2 rounded-full bg-white/50 px-3 py-1 backdrop-blur-md">
      {LANGUAGES.map((lang, index) => (
        <React.Fragment key={lang.code}>
          <button
            onClick={() => handleChange(lang.code)}
            className={`text-xs tracking-[0.16em] transition-colors ${
              i18n.language === lang.code ? 'text-[#1A1A1A] font-semibold' : 'text-[#8A8580] hover:text-[#1A1A1A]'
            }`}
          >
            {lang.label}
          </button>
          {index < LANGUAGES.length - 1 && <span className="text-[#CFC7BE]">|</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
