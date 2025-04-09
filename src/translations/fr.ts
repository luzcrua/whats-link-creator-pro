
import { Translations } from "@/contexts/language-context";

const translations: Translations = {
  // General
  websiteTitle: "AriWhats",
  
  // Header
  headerTitle: "AriWhats",
  
  // Main section
  mainTitle: "Générateur de Liens WhatsApp",
  mainSubtitle: "Créez des liens personnalisés en quelques secondes pour envoyer des messages automatiques sur WhatsApp.",
  
  // Form
  phoneNumberLabel: "Entrez le numéro de téléphone (avec l'indicatif du pays) :",
  phoneNumberPlaceholder: "Ex.: 33612345678",
  phoneNumberHelp: "Utilisez le format international sans le symbole +",
  messageLabel: "Entrez votre message personnalisé :",
  messagePlaceholder: "Ex.: Bonjour, je voudrais prendre rendez-vous...",
  generateButton: "Générer le Lien",
  includeMessageLabel: "Inclure un message personnalisé",
  phoneRequiredDescription: "Veuillez entrer un numéro de téléphone valide.",
  messageRequiredDescription: "Veuillez entrer un message à inclure dans votre lien WhatsApp.",
  
  // Results
  generatedLinkLabel: "Lien généré :",
  copyButton: "Copier le Lien",
  openWhatsappButton: "Ouvrir dans WhatsApp",
  
  // How it works section
  howItWorksTitle: "Comment ça marche ?",
  step1Title: "1. Entrez les données",
  step1Description: "Tapez le numéro de téléphone au format international et rédigez votre message personnalisé.",
  step2Title: "2. Générez le lien",
  step2Description: "Cliquez sur le bouton \"Générer le Lien\" et obtenez instantanément votre lien WhatsApp personnalisé.",
  step3Title: "3. Partagez",
  step3Description: "Copiez le lien généré et partagez-le sur vos réseaux sociaux, sites web ou avec vos clients.",
  
  // Notifications
  requiredFieldsTitle: "Champs obligatoires",
  requiredFieldsDescription: "Veuillez remplir le numéro de téléphone et le message.",
  linkGeneratedTitle: "Lien généré avec succès !",
  linkGeneratedDescription: "Vous pouvez maintenant copier et partager le lien.",
  linkCopiedTitle: "Lien copié !",
  linkCopiedDescription: "Le lien a été copié dans le presse-papiers.",
  
  // Footer
  footerText: "© 2025 AriWhats - Générateur de Liens WhatsApp",
  
  // Phone format information
  phoneFormatTitle: "Format de numéro par pays",
  phoneFormatDescription: "Entrez le numéro avec l'indicatif du pays sans le symbole +",
  countryExamples: [
    {
      label: "France",
      format: "+33 6 XX XX XX XX",
      example: "33612345678"
    },
    {
      label: "Canada (Québec)",
      format: "+1 (XXX) XXX-XXXX",
      example: "15141234567"
    },
    {
      label: "Belgique",
      format: "+32 4XX XX XX XX",
      example: "32475123456"
    },
    {
      label: "Suisse",
      format: "+41 7X XXX XX XX",
      example: "41781234567"
    }
  ]
};

export default translations;
