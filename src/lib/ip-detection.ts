
import { Language } from "@/contexts/language-context";

// Map of country codes to languages
const countryToLanguageMap: Record<string, Language> = {
  // Portuguese speaking countries
  BR: 'pt', // Brazil
  PT: 'pt', // Portugal
  AO: 'pt', // Angola
  MZ: 'pt', // Mozambique
  CV: 'pt', // Cape Verde
  GW: 'pt', // Guinea-Bissau
  TL: 'pt', // East Timor
  
  // English speaking countries
  US: 'en', // United States
  GB: 'en', // United Kingdom
  CA: 'en', // Canada (also French, but primarily English)
  AU: 'en', // Australia
  NZ: 'en', // New Zealand
  IE: 'en', // Ireland
  
  // Spanish speaking countries
  ES: 'es', // Spain
  MX: 'es', // Mexico
  AR: 'es', // Argentina
  CO: 'es', // Colombia
  CL: 'es', // Chile
  PE: 'es', // Peru
  VE: 'es', // Venezuela
  
  // German speaking countries
  DE: 'de', // Germany
  AT: 'de', // Austria
  CH: 'de', // Switzerland (also French and Italian, but for simplicity)
  
  // Italian speaking countries
  IT: 'it', // Italy
  SM: 'it', // San Marino
  VA: 'it', // Vatican City
  
  // French speaking countries
  FR: 'fr', // France
  BE: 'fr', // Belgium (also Dutch and German, but for simplicity)
  MC: 'fr', // Monaco
  LU: 'fr', // Luxembourg (also German, but for simplicity)
};

// Default language if country not found
const defaultLanguage: Language = 'en';

/**
 * Gets the user's country code from IP address.
 * Uses the free ipapi.co service which doesn't require API keys.
 */
export async function getUserCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error('Failed to detect user country:', error);
    return ''; // Return empty string if detection fails
  }
}

/**
 * Determines the language to use based on user's country.
 * Falls back to defaultLanguage if country not in map.
 */
export async function getLanguageFromIP(): Promise<Language> {
  // Check if there's already a language saved
  const savedLanguage = localStorage.getItem('language') as Language;
  if (savedLanguage) {
    return savedLanguage;
  }
  
  try {
    const country = await getUserCountry();
    return country && countryToLanguageMap[country] 
      ? countryToLanguageMap[country] 
      : defaultLanguage;
  } catch (error) {
    console.error('Error detecting language from IP:', error);
    return defaultLanguage;
  }
}
