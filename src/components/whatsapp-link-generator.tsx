
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Copy, Check, MessageSquare, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { PhoneFormatInfo } from "./phone-format-info";
import { encodeMessageForWhatsApp } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

export function WhatsappLinkGenerator() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [includeMessage, setIncludeMessage] = useState(true);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const linkRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { translations } = useLanguage();

  // Handle phone number input validation
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(value);
  };

  // Generate WhatsApp link
  const generateLink = () => {
    if (!phoneNumber) {
      toast({
        title: translations.requiredFieldsTitle,
        description: translations.phoneRequiredDescription || translations.requiredFieldsDescription,
        variant: "destructive",
      });
      return;
    }

    if (includeMessage && !message) {
      toast({
        title: translations.requiredFieldsTitle,
        description: translations.messageRequiredDescription || translations.requiredFieldsDescription,
        variant: "destructive",
      });
      return;
    }

    let link = `https://wa.me/${phoneNumber}`;
    
    // Only add message parameter if includeMessage is true and message exists
    if (includeMessage && message) {
      // Use our enhanced emoji encoding function
      const encodedMessage = encodeMessageForWhatsApp(message);
      link = `${link}?text=${encodedMessage}`;
    }
    
    setGeneratedLink(link);

    toast({
      title: translations.linkGeneratedTitle,
      description: translations.linkGeneratedDescription,
    });
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    if (linkRef.current) {
      linkRef.current.select();
      
      // Use the modern clipboard API for better compatibility
      try {
        navigator.clipboard.writeText(linkRef.current.value)
          .then(() => {
            setCopied(true);
            
            toast({
              title: translations.linkCopiedTitle,
              description: translations.linkCopiedDescription,
            });
            
            // Reset copy status after 2 seconds
            setTimeout(() => setCopied(false), 2000);
          });
      } catch (err) {
        // Fallback for older browsers
        document.execCommand("copy");
        setCopied(true);
        
        toast({
          title: translations.linkCopiedTitle,
          description: translations.linkCopiedDescription,
        });
        
        // Reset copy status after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  // Open link in new tab
  const openLink = () => {
    if (generatedLink) {
      window.open(generatedLink, "_blank");
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <Card className="border-2 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl md:text-3xl font-bold">{translations.mainTitle}</CardTitle>
          <CardDescription>
            {translations.mainSubtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{translations.phoneNumberLabel}</Label>
              <Input
                id="phone"
                placeholder={translations.phoneNumberPlaceholder}
                value={phoneNumber}
                onChange={handlePhoneInput}
                maxLength={15}
                className="transition-all focus-visible:ring-whatsapp"
              />
              <p className="text-xs text-muted-foreground">
                {translations.phoneNumberHelp}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 py-2">
              <Switch
                id="include-message"
                checked={includeMessage}
                onCheckedChange={setIncludeMessage}
              />
              <Label htmlFor="include-message">{translations.includeMessageLabel || "Include personalized message"}</Label>
            </div>
            
            {includeMessage && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="message">{translations.messageLabel}</Label>
                <Textarea
                  id="message"
                  placeholder={translations.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="resize-y min-h-[100px] transition-all focus-visible:ring-whatsapp"
                />
              </div>
            )}
            
            <Button 
              onClick={generateLink} 
              className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white"
              size="lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" /> {translations.generateButton}
            </Button>
          </div>
          
          {/* Generated Link */}
          {generatedLink && (
            <div className="space-y-3 animate-scale-in pt-2">
              <Label htmlFor="result">{translations.generatedLinkLabel}</Label>
              <div className="flex">
                <Input
                  ref={linkRef}
                  id="result"
                  value={generatedLink}
                  readOnly
                  className="rounded-r-none"
                />
                <Button 
                  onClick={copyToClipboard} 
                  className={`rounded-l-none ${
                    copied ? "bg-green-600" : "bg-whatsapp hover:bg-whatsapp-dark"
                  } text-white`}
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>
              
              <Button 
                onClick={openLink} 
                variant="outline" 
                className="w-full border-whatsapp hover:border-whatsapp-dark text-whatsapp hover:text-whatsapp-dark"
              >
                <ExternalLink className="mr-2 h-5 w-5" /> {translations.openWhatsappButton}
              </Button>
            </div>
          )}

          <PhoneFormatInfo />
        </CardContent>
      </Card>
    </div>
  );
}
