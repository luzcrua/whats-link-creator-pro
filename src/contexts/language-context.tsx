
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available languages
export type Language = 'pt' | 'en' | 'es' | 'de' | 'it' | 'fr';

// Define translation structure
export interface Translations {
  // General
  websiteTitle: string;
  
  // Header
  headerTitle: string;
  
  // Main section
  mainTitle: string;
  mainSubtitle: string;
  
  // Form
  phoneNumberLabel: string;
  phoneNumberPlaceholder: string;
  phoneNumberHelp: string;
  messageLabel: string;
  messagePlaceholder: string;
  generateButton: string;
  
  // New switch for including message
  includeMessageLabel: string;
  phoneRequiredDescription: string;
  messageRequiredDescription: string;
  
  // Results
  generatedLinkLabel: string;
  copyButton: string;
  openWhatsappButton: string;
  
  // How it works section
  howItWorksTitle: string;
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
  
  // Notifications
  requiredFieldsTitle: string;
  requiredFieldsDescription: string;
  linkGeneratedTitle: string;
  linkGeneratedDescription: string;
  linkCopiedTitle: string;
  linkCopiedDescription: string;
  
  // Footer
  footerText: string;
  
  // Phone format information
  phoneFormatTitle: string;
  phoneFormatDescription: string;
  countryExamples: {
    label: string;
    format: string;
    example: string;
  }[];
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
  availableLanguages: {
    code: Language;
    name: string;
  }[];
}

const availableLanguages = [
  { code: 'pt' as Language, name: 'Português' },
  { code: 'en' as Language, name: 'English' },
  { code: 'es' as Language, name: 'Español' },
  { code: 'de' as Language, name: 'Deutsch' },
  { code: 'it' as Language, name: 'Italiano' },
  { code: 'fr' as Language, name: 'Français' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get from localStorage or default to 'pt'
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)
      ? savedLanguage
      : 'pt';
  });
  
  const [translations, setTranslations] = useState<Translations>({} as Translations);

  // Update translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      const translations = await import(`../translations/${language}.ts`);
      setTranslations(translations.default);
    };
    
    loadTranslations();
    localStorage.setItem('language', language);
  }, [language]);

  // Set language function
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        translations, 
        availableLanguages 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
