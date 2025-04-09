
import { Translations } from "@/contexts/language-context";

const translations: Translations = {
  // General
  websiteTitle: "AriWhats",
  
  // Header
  headerTitle: "AriWhats",
  
  // Main section
  mainTitle: "WhatsApp Link-Generator",
  mainSubtitle: "Erstellen Sie in Sekundenschnelle benutzerdefinierte Links, um automatische Nachrichten auf WhatsApp zu senden.",
  
  // Form
  phoneNumberLabel: "Geben Sie die Telefonnummer ein (mit Ländervorwahl):",
  phoneNumberPlaceholder: "Bsp.: 491701234567",
  phoneNumberHelp: "Verwenden Sie das internationale Format ohne das + Symbol",
  messageLabel: "Geben Sie Ihre benutzerdefinierte Nachricht ein:",
  messagePlaceholder: "Bsp.: Hallo, ich möchte einen Termin vereinbaren...",
  generateButton: "Link generieren",
  includeMessageLabel: "Benutzerdefinierte Nachricht einschließen",
  phoneRequiredDescription: "Bitte geben Sie eine gültige Telefonnummer ein.",
  messageRequiredDescription: "Bitte geben Sie eine Nachricht ein, die in Ihrem WhatsApp-Link enthalten sein soll.",
  
  // Results
  generatedLinkLabel: "Generierter Link:",
  copyButton: "Link kopieren",
  openWhatsappButton: "In WhatsApp öffnen",
  
  // How it works section
  howItWorksTitle: "Wie funktioniert es?",
  step1Title: "1. Daten eingeben",
  step1Description: "Geben Sie die Telefonnummer im internationalen Format ein und schreiben Sie Ihre benutzerdefinierte Nachricht.",
  step2Title: "2. Link generieren",
  step2Description: "Klicken Sie auf die Schaltfläche \"Link generieren\" und erhalten Sie sofort Ihren benutzerdefinierten WhatsApp-Link.",
  step3Title: "3. Teilen",
  step3Description: "Kopieren Sie den generierten Link und teilen Sie ihn in Ihren sozialen Medien, Websites oder mit Ihren Kunden.",
  
  // Notifications
  requiredFieldsTitle: "Pflichtfelder",
  requiredFieldsDescription: "Bitte füllen Sie die Telefonnummer und die Nachricht aus.",
  linkGeneratedTitle: "Link erfolgreich generiert!",
  linkGeneratedDescription: "Jetzt können Sie den Link kopieren und teilen.",
  linkCopiedTitle: "Link kopiert!",
  linkCopiedDescription: "Der Link wurde in die Zwischenablage kopiert.",
  
  // Footer
  footerText: "© 2025 AriWhats - WhatsApp Link-Generator",
  
  // Phone format information
  phoneFormatTitle: "Telefonnummernformat nach Land",
  phoneFormatDescription: "Geben Sie die Nummer mit der Landesvorwahl ohne das + Symbol ein",
  countryExamples: [
    {
      label: "Deutschland",
      format: "+49 170 XXXXXXX",
      example: "491701234567"
    },
    {
      label: "Österreich",
      format: "+43 664 XXXXXXX",
      example: "43664123456"
    },
    {
      label: "Schweiz",
      format: "+41 79 XXX XX XX",
      example: "41791234567"
    }
  ]
};

export default translations;
