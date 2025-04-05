
import { Layout } from "@/components/layout";
import { WhatsappLinkGenerator } from "@/components/whatsapp-link-generator";
import { useLanguage } from "@/contexts/language-context";

const Index = () => {
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
    </Layout>
  );
};

export default Index;
