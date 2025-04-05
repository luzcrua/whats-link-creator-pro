
import { Share } from "lucide-react";
import { Button } from "./ui/button";
import { memo } from "react";
import { Translations } from "@/contexts/language-context";

interface FooterProps {
  translations: Translations;
  handleShareOnWhatsApp: () => void;
}

const Footer = memo(({ translations, handleShareOnWhatsApp }: FooterProps) => {
  return (
    <footer className="border-t py-6 mt-auto">
      <div className="container max-w-screen-lg mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>{translations.footerText}</p>
        <div className="flex items-center justify-center mt-4 gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleShareOnWhatsApp} 
            className="text-whatsapp hover:text-whatsapp-dark"
            aria-label="Share on WhatsApp"
          >
            <Share className="h-5 w-5 animate-pulse-green" />
          </Button>
        </div>
        <p className="mt-4 text-xs">
          iDealizado por <a 
            href="https://instagram.com/arinelson.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-whatsapp hover:text-whatsapp-dark transition-colors"
          >ARINELSON SANTOS</a>
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
