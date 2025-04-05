
import { Translations } from "@/contexts/language-context";

const translations: Translations = {
  // General
  websiteTitle: "AriWhats",
  
  // Header
  headerTitle: "AriWhats",
  
  // Main section
  mainTitle: "WhatsApp Link Generator",
  mainSubtitle: "Create custom links in seconds to send automatic messages on WhatsApp.",
  
  // Form
  phoneNumberLabel: "Enter the phone number (with country code):",
  phoneNumberPlaceholder: "Ex.: 12125551234",
  phoneNumberHelp: "Use international format without the + symbol",
  messageLabel: "Enter your custom message:",
  messagePlaceholder: "Ex.: Hello, I would like to schedule an appointment...",
  generateButton: "Generate Link",
  
  // Results
  generatedLinkLabel: "Generated link:",
  copyButton: "Copy Link",
  openWhatsappButton: "Open in WhatsApp",
  
  // How it works section
  howItWorksTitle: "How it works?",
  step1Title: "1. Enter the data",
  step1Description: "Type the phone number in international format and write your custom message.",
  step2Title: "2. Generate the link",
  step2Description: "Click the \"Generate Link\" button and instantly get your custom WhatsApp link.",
  step3Title: "3. Share",
  step3Description: "Copy the generated link and share it on your social media, websites, or with your customers.",
  
  // Notifications
  requiredFieldsTitle: "Required fields",
  requiredFieldsDescription: "Please fill in the phone number and message.",
  linkGeneratedTitle: "Link generated successfully!",
  linkGeneratedDescription: "Now you can copy and share the link.",
  linkCopiedTitle: "Link copied!",
  linkCopiedDescription: "The link has been copied to the clipboard.",
  
  // Footer
  footerText: "© 2025 AriWhats - WhatsApp Link Generator",
  
  // Phone format information
  phoneFormatTitle: "Phone number format by country",
  phoneFormatDescription: "Enter the number with the country code without the + symbol",
  countryExamples: [
    {
      label: "United States & Canada",
      format: "+1 (XXX) XXX-XXXX",
      example: "12125551234"
    },
    {
      label: "United Kingdom",
      format: "+44 7XXX XXXXXX",
      example: "447900123456"
    },
    {
      label: "Australia",
      format: "+61 4XX XXX XXX",
      example: "61412345678"
    },
    {
      label: "India",
      format: "+91 9XXXXXXXX",
      example: "919876543210"
    }
  ]
};

export default translations;
