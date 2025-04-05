
import { Translations } from "@/contexts/language-context";

const translations: Translations = {
  // General
  websiteTitle: "AriWhats",
  
  // Header
  headerTitle: "AriWhats",
  
  // Main section
  mainTitle: "Gerador de Links para WhatsApp",
  mainSubtitle: "Crie links personalizados em segundos para enviar mensagens automáticas no WhatsApp.",
  
  // Form
  phoneNumberLabel: "Digite o número de telefone (com DDI e DDD):",
  phoneNumberPlaceholder: "Ex.: 5582987654321",
  phoneNumberHelp: "Formato internacional (ex.: 5582987654321 para números brasileiros)",
  messageLabel: "Digite a mensagem personalizada:",
  messagePlaceholder: "Ex.: Olá, gostaria de agendar um horário...",
  generateButton: "Gerar Link",
  
  // Results
  generatedLinkLabel: "Link gerado:",
  copyButton: "Copiar Link",
  openWhatsappButton: "Abrir no WhatsApp",
  
  // How it works section
  howItWorksTitle: "Como funciona?",
  step1Title: "1. Insira os dados",
  step1Description: "Digite o número de telefone no formato internacional e escreva sua mensagem personalizada.",
  step2Title: "2. Gere o link",
  step2Description: "Clique no botão \"Gerar Link\" e obtenha instantaneamente seu link personalizado do WhatsApp.",
  step3Title: "3. Compartilhe",
  step3Description: "Copie o link gerado e compartilhe em suas redes sociais, sites ou com seus clientes.",
  
  // Notifications
  requiredFieldsTitle: "Campos obrigatórios",
  requiredFieldsDescription: "Por favor, preencha o número de telefone e a mensagem.",
  linkGeneratedTitle: "Link gerado com sucesso!",
  linkGeneratedDescription: "Agora você pode copiar e compartilhar o link.",
  linkCopiedTitle: "Link copiado!",
  linkCopiedDescription: "O link foi copiado para a área de transferência.",
  
  // Footer
  footerText: "© 2025 AriWhats - Gerador de Links para WhatsApp",
  
  // Phone format information
  phoneFormatTitle: "Formato de número por país",
  phoneFormatDescription: "Insira o número com o código do país (DDI) sem o símbolo +",
  countryExamples: [
    {
      label: "Brasil",
      format: "+55 (DDD) XXXXX-XXXX",
      example: "5511987654321"
    }
  ]
};

export default translations;
