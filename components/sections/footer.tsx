"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/data";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <motion.a
              href="#"
              className="text-xl font-bold tracking-tight"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              IN<span className="text-muted-foreground">&apos;</span>CHO
            </motion.a>
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteConfig.name}. {t("copyright")}
            </p>
          </div>

          {/* Built with */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{t("builtWith")}</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
          </div>

          {/* Back to top */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="gap-2"
          >
            <ArrowUp className="h-4 w-4" />
            {tc("backToTop")}
          </Button>
        </div>
      </div>
    </footer>
  );
}
