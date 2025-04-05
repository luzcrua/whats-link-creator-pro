
import { Layout } from "@/components/layout";
import { WhatsappLinkGenerator } from "@/components/whatsapp-link-generator";

const Index = () => {
  return (
    <Layout>
      <section className="flex flex-col items-center justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="max-w-3xl text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Gerador de Links para WhatsApp
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Crie links personalizados em segundos para enviar mensagens automáticas no WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl">
        <WhatsappLinkGenerator />
      </section>
      
      <section className="mx-auto max-w-3xl mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Como funciona?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md">
            <div className="mb-2 font-semibold">1. Insira os dados</div>
            <p className="text-sm text-muted-foreground">
              Digite o número de telefone no formato internacional e escreva sua mensagem personalizada.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md">
            <div className="mb-2 font-semibold">2. Gere o link</div>
            <p className="text-sm text-muted-foreground">
              Clique no botão "Gerar Link" e obtenha instantaneamente seu link personalizado do WhatsApp.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md">
            <div className="mb-2 font-semibold">3. Compartilhe</div>
            <p className="text-sm text-muted-foreground">
              Copie o link gerado e compartilhe em suas redes sociais, sites ou com seus clientes.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
