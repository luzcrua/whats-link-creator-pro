
import { Translations } from "@/contexts/language-context";

const translations: Translations = {
  // General
  websiteTitle: "AriWhats",
  
  // Header
  headerTitle: "AriWhats",
  
  // Main section
  mainTitle: "Generador de Enlaces para WhatsApp",
  mainSubtitle: "Crea enlaces personalizados en segundos para enviar mensajes automáticos en WhatsApp.",
  
  // Form
  phoneNumberLabel: "Introduce el número de teléfono (con código de país):",
  phoneNumberPlaceholder: "Ej.: 5212345678",
  phoneNumberHelp: "Usa el formato internacional sin el símbolo +",
  messageLabel: "Introduce tu mensaje personalizado:",
  messagePlaceholder: "Ej.: Hola, me gustaría programar una cita...",
  generateButton: "Generar Enlace",
  includeMessageLabel: "Incluir mensaje personalizado",
  phoneRequiredDescription: "Por favor, introduce un número de teléfono válido.",
  messageRequiredDescription: "Por favor, introduce un mensaje para incluir en tu enlace de WhatsApp.",
  
  // Results
  generatedLinkLabel: "Enlace generado:",
  copyButton: "Copiar Enlace",
  openWhatsappButton: "Abrir en WhatsApp",
  
  // How it works section
  howItWorksTitle: "¿Cómo funciona?",
  step1Title: "1. Introduce los datos",
  step1Description: "Escribe el número de teléfono en formato internacional y redacta tu mensaje personalizado.",
  step2Title: "2. Genera el enlace",
  step2Description: "Haz clic en el botón \"Generar Enlace\" y obtén instantáneamente tu enlace personalizado de WhatsApp.",
  step3Title: "3. Comparte",
  step3Description: "Copia el enlace generado y compártelo en tus redes sociales, sitios web o con tus clientes.",
  
  // Notifications
  requiredFieldsTitle: "Campos obligatorios",
  requiredFieldsDescription: "Por favor, completa el número de teléfono y el mensaje.",
  linkGeneratedTitle: "¡Enlace generado con éxito!",
  linkGeneratedDescription: "Ahora puedes copiar y compartir el enlace.",
  linkCopiedTitle: "¡Enlace copiado!",
  linkCopiedDescription: "El enlace ha sido copiado al portapapeles.",
  
  // Footer
  footerText: "© 2025 AriWhats - Generador de Enlaces para WhatsApp",
  
  // Phone format information
  phoneFormatTitle: "Formato de número por país",
  phoneFormatDescription: "Introduce el número con el código de país sin el símbolo +",
  countryExamples: [
    {
      label: "México",
      format: "+52 55 XXXX XXXX",
      example: "525512345678"
    },
    {
      label: "España",
      format: "+34 6XX XXX XXX",
      example: "34612345678"
    },
    {
      label: "Argentina",
      format: "+54 9 11 XXXX-XXXX",
      example: "5491123456789"
    },
    {
      label: "Colombia",
      format: "+57 3XX XXX XXXX",
      example: "573123456789"
    }
  ]
};

export default translations;
