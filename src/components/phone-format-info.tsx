
import { useLanguage } from "@/contexts/language-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function PhoneFormatInfo() {
  const { translations } = useLanguage();

  return (
    <div className="mt-6 animate-fade-in">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="phone-format">
          <AccordionTrigger className="text-base font-medium">
            {translations.phoneFormatTitle}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 text-sm">
              <p>{translations.phoneFormatDescription}</p>
              
              <div className="grid gap-3 md:grid-cols-2">
                {translations.countryExamples.map((country, index) => (
                  <div key={index} className="rounded-md border p-3 bg-card shadow-sm">
                    <div className="font-medium">{country.label}</div>
                    <div className="text-muted-foreground text-xs mt-1">{country.format}</div>
                    <div className="mt-2">
                      <span className="text-xs font-medium">Example: </span>
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">{country.example}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
