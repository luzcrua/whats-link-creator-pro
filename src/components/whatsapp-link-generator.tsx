
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Copy, Check, MessageSquare, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WhatsappLinkGenerator() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const linkRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Handle phone number input validation
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(value);
  };

  // Generate WhatsApp link
  const generateLink = () => {
    if (!phoneNumber || !message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o número de telefone e a mensagem.",
        variant: "destructive",
      });
      return;
    }

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create the WhatsApp API URL
    const link = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}`;
    
    setGeneratedLink(link);

    toast({
      title: "Link gerado com sucesso!",
      description: "Agora você pode copiar e compartilhar o link.",
    });
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    if (linkRef.current) {
      linkRef.current.select();
      document.execCommand("copy");
      setCopied(true);
      
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
      
      // Reset copy status after 2 seconds
      setTimeout(() => setCopied(false), 2000);
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
          <CardTitle className="text-2xl md:text-3xl font-bold">Gerador de Links para WhatsApp</CardTitle>
          <CardDescription>
            Crie links personalizados para enviar mensagens automáticas no WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Digite o número de telefone (com DDI e DDD):</Label>
              <Input
                id="phone"
                placeholder="Ex.: 5582987654321"
                value={phoneNumber}
                onChange={handlePhoneInput}
                maxLength={15}
                className="transition-all focus-visible:ring-whatsapp"
              />
              <p className="text-xs text-muted-foreground">
                Formato internacional (ex.: 5582987654321 para números brasileiros)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Digite a mensagem personalizada:</Label>
              <Textarea
                id="message"
                placeholder="Ex.: Olá, gostaria de agendar um horário..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="resize-y min-h-[100px] transition-all focus-visible:ring-whatsapp"
              />
            </div>
            
            <Button 
              onClick={generateLink} 
              className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white"
              size="lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" /> Gerar Link
            </Button>
          </div>
          
          {/* Generated Link */}
          {generatedLink && (
            <div className="space-y-3 animate-scale-in pt-2">
              <Label htmlFor="result">Link gerado:</Label>
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
                <ExternalLink className="mr-2 h-5 w-5" /> Abrir no WhatsApp
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
