import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Feather, Globe, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure by default",
    desc: "Your identity, fully in your control",
  },
  { icon: Zap, title: "Blazing fast", desc: "Built on the Internet Computer" },
  {
    icon: Globe,
    title: "Truly decentralized",
    desc: "No central authority, no censorship",
  },
];

export default function LoginPage() {
  const { login, isLoggingIn, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" label="Initializing…" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Background accent */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-elevated">
            <Feather className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="font-display font-bold text-4xl text-foreground tracking-tight">
              SocialSphere
            </h1>
            <p className="text-muted-foreground mt-1.5">
              A decentralized social platform for everyone
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="w-full grid gap-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-card border border-border/50 shadow-subtle"
            >
              <div className="h-9 w-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="w-full flex flex-col items-center gap-3">
          <Button
            size="lg"
            className="w-full h-12 font-display font-semibold text-base rounded-xl shadow-elevated transition-smooth"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="login.submit_button"
          >
            {isLoggingIn ? (
              <LoadingSpinner size="sm" />
            ) : (
              "Continue with Internet Identity"
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Your data stays with you. No email, no password, no third parties.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-12 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
