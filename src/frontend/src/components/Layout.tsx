import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";
import { BottomBar, Sidebar } from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col pb-20 md:pb-0">
        {children}
      </main>
      <BottomBar />
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "bg-card border-border text-foreground",
            description: "text-muted-foreground",
          },
        }}
      />
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border/60 px-4 md:px-6 py-4 flex items-center justify-between gap-4">
      <div>
        <h1 className="font-display font-bold text-lg text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
