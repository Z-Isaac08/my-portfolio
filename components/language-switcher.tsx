"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useTransition } from "react";

const locales = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
      window.location.reload();
    });
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Languages className="h-4 w-4 text-muted-foreground" />
      <div className="flex items-center">
        {locales.map((loc, index) => (
          <span key={loc.code} className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => switchLocale(loc.code)}
              disabled={isPending || locale === loc.code}
              className={cn(
                "h-auto px-1.5 py-0.5 text-xs font-medium transition-colors",
                locale === loc.code
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {loc.label}
            </Button>
            {index < locales.length - 1 && (
              <span className="text-muted-foreground/50">|</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
