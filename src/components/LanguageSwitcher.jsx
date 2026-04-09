import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium"
        title="切換語言 / Change Language"
      >
        <Globe size={20} />
        <span className="text-sm">{currentLanguage?.flag} {currentLanguage?.code}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-emerald-200 rounded-lg shadow-lg z-50 min-w-[180px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors duration-150 flex items-center gap-2 ${
                i18n.language === lang.code ? 'bg-emerald-100 font-semibold text-emerald-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <div>
                <div className="font-medium">{lang.name}</div>
                <div className="text-xs text-gray-500">{lang.code}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
