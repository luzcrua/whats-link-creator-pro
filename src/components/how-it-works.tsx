
import { useLanguage } from "@/contexts/language-context";
import { memo } from "react";

const HowItWorks = memo(() => {
  const { translations } = useLanguage();
  
  return (
    <section className="mx-auto max-w-3xl mt-16">
      <h2 className="text-2xl font-bold mb-6 text-center">{translations.howItWorksTitle}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md">
          <div className="mb-2 font-semibold">{translations.step1Title}</div>
          <p className="text-sm text-muted-foreground">
            {translations.step1Description}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md">
          <div className="mb-2 font-semibold">{translations.step2Title}</div>
          <p className="text-sm text-muted-foreground">
            {translations.step2Description}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md">
          <div className="mb-2 font-semibold">{translations.step3Title}</div>
          <p className="text-sm text-muted-foreground">
            {translations.step3Description}
          </p>
        </div>
      </div>
    </section>
  );
});

HowItWorks.displayName = "HowItWorks";

export default HowItWorks;
