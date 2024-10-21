import React from 'react';

interface LanguageToggleProps {
  language: 'en' | 'dk';
  setLanguage: (lang: 'en' | 'dk') => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  return (
    <button
      className="px-3 py-1 rounded-full bg-[#009D86] text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009D86]"
      onClick={() => setLanguage(language === 'en' ? 'dk' : 'en')}
    >
      {language === 'en' ? 'DK' : 'EN'}
    </button>
  );
};