
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getLanguageFromIP } from "@/lib/ip-detection";

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
  // Initial language state - will be updated after IP detection
  const [language, setLanguageState] = useState<Language>('en'); // Default to English until detection completes
  const [translations, setTranslations] = useState<Translations>({} as Translations);
  const [isLoading, setIsLoading] = useState(true);

  // Detect language from IP on first load
  useEffect(() => {
    const detectLanguage = async () => {
      try {
        setIsLoading(true);
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang') as Language | null;
        
        if (langParam && availableLanguages.some(lang => lang.code === langParam)) {
          // URL parameter takes highest priority
          setLanguageState(langParam);
          localStorage.setItem('language', langParam);
        } else {
          // Check localStorage or detect from IP
          const savedLanguage = localStorage.getItem('language') as Language;
          
          if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
            setLanguageState(savedLanguage);
          } else {
            // No valid saved language, detect from IP
            const detectedLanguage = await getLanguageFromIP();
            setLanguageState(detectedLanguage);
            localStorage.setItem('language', detectedLanguage);
          }
        }
      } catch (error) {
        console.error('Error initializing language:', error);
        // Fall back to English if detection fails
        setLanguageState('en');
      } finally {
        setIsLoading(false);
      }
    };
    
    detectLanguage();
  }, []);

  // Update translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translations = await import(`../translations/${language}.ts`);
        setTranslations(translations.default);
        document.documentElement.lang = language; // Set html lang attribute
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // If translations fail to load, try to fall back to English
        if (language !== 'en') {
          const fallbackTranslations = await import(`../translations/en.ts`);
          setTranslations(fallbackTranslations.default);
          document.documentElement.lang = 'en';
        }
      }
    };
    
    loadTranslations();
    localStorage.setItem('language', language);
  }, [language]);

  // Set language function
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Show loading indicator or content
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-whatsapp"></div>
      </div>
    );
  }

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
