
import { Translations } from "@/contexts/language-context";

const translations: Translations = {
  // General
  websiteTitle: "AriWhats",
  
  // Header
  headerTitle: "AriWhats",
  
  // Main section
  mainTitle: "Generatore di Link per WhatsApp",
  mainSubtitle: "Crea link personalizzati in pochi secondi per inviare messaggi automatici su WhatsApp.",
  
  // Form
  phoneNumberLabel: "Inserisci il numero di telefono (con prefisso internazionale):",
  phoneNumberPlaceholder: "Es.: 393471234567",
  phoneNumberHelp: "Usa il formato internazionale senza il simbolo +",
  messageLabel: "Inserisci il tuo messaggio personalizzato:",
  messagePlaceholder: "Es.: Ciao, vorrei fissare un appuntamento...",
  generateButton: "Genera Link",
  
  // Results
  generatedLinkLabel: "Link generato:",
  copyButton: "Copia Link",
  openWhatsappButton: "Apri in WhatsApp",
  
  // How it works section
  howItWorksTitle: "Come funziona?",
  step1Title: "1. Inserisci i dati",
  step1Description: "Inserisci il numero di telefono in formato internazionale e scrivi il tuo messaggio personalizzato.",
  step2Title: "2. Genera il link",
  step2Description: "Clicca sul pulsante \"Genera Link\" e ottieni istantaneamente il tuo link personalizzato per WhatsApp.",
  step3Title: "3. Condividi",
  step3Description: "Copia il link generato e condividilo sui tuoi social media, siti web o con i tuoi clienti.",
  
  // Notifications
  requiredFieldsTitle: "Campi obbligatori",
  requiredFieldsDescription: "Per favore, compila il numero di telefono e il messaggio.",
  linkGeneratedTitle: "Link generato con successo!",
  linkGeneratedDescription: "Ora puoi copiare e condividere il link.",
  linkCopiedTitle: "Link copiato!",
  linkCopiedDescription: "Il link è stato copiato negli appunti.",
  
  // Footer
  footerText: "© 2025 AriWhats - Generatore di Link per WhatsApp",
  
  // Phone format information
  phoneFormatTitle: "Formato del numero per paese",
  phoneFormatDescription: "Inserisci il numero con il prefisso internazionale senza il simbolo +",
  countryExamples: [
    {
      label: "Italia",
      format: "+39 3XX XXX XXXX",
      example: "393471234567"
    }
  ]
};

export default translations;
