
import { Layout } from "@/components/layout";
import { WhatsappLinkGenerator } from "@/components/whatsapp-link-generator";
import { useLanguage } from "@/contexts/language-context";
import { memo, lazy, Suspense } from "react";

// Create a separate HowItWorks component to enable code splitting
const HowItWorks = lazy(() => import("@/components/how-it-works"));

const Index = memo(() => {
  const { translations } = useLanguage();
  
  return (
    <Layout>
      <section className="flex flex-col items-center justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="max-w-3xl text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations.mainTitle}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {translations.mainSubtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl">
        <WhatsappLinkGenerator />
      </section>
      
      <Suspense fallback={<div className="h-64 mt-16"></div>}>
        <HowItWorks />
      </Suspense>
    </Layout>
  );
});

Index.displayName = "Index";

export default Index;
