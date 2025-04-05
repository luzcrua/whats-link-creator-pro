
import { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";
import { MessageSquare } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col theme-transition">
      <header className="border-b py-3 px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-screen-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-whatsapp animate-pulse-green" />
            <span className="font-bold text-xl md:text-2xl">AriWhats</span>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 container max-w-screen-lg mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="border-t py-6 mt-auto">
        <div className="container max-w-screen-lg mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AriWhats - Gerador de Links para WhatsApp</p>
        </div>
      </footer>
    </div>
  );
}
