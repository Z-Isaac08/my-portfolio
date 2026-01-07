"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Github,
  Linkedin,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer, SectionHeader } from "@/components/section-container";
import { MotionSection } from "@/components/motion";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Contact() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Simulate form submission - in production, replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Open mailto as fallback
    const mailtoLink = `mailto:${siteConfig.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;

    setFormState("sent");
    setTimeout(() => setFormState("idle"), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("info.email"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: MapPin,
      label: t("info.location"),
      value: siteConfig.location,
    },
    {
      icon: Clock,
      label: t("info.availability"),
      value: t("info.availableText"),
    },
  ];

  return (
    <SectionContainer id="contact" className="gradient-bg">
      <MotionSection>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={cn(
                    "w-full px-4 py-2.5 rounded-lg",
                    "bg-background/50 border border-border",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                    "transition-all duration-200",
                    "placeholder:text-muted-foreground/60"
                  )}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={cn(
                    "w-full px-4 py-2.5 rounded-lg",
                    "bg-background/50 border border-border",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                    "transition-all duration-200",
                    "placeholder:text-muted-foreground/60"
                  )}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={cn(
                    "w-full px-4 py-2.5 rounded-lg resize-none",
                    "bg-background/50 border border-border",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                    "transition-all duration-200",
                    "placeholder:text-muted-foreground/60"
                  )}
                  placeholder="Your message..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={formState !== "idle"}
              >
                {formState === "idle" && (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {t("form.send")}
                  </>
                )}
                {formState === "sending" && (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t("form.sending")}
                  </>
                )}
                {formState === "sent" && (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Sent!
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Info cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const content = (
                  <motion.div
                    className="glass rounded-xl p-5 flex items-center gap-4"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {info.label}
                      </p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </motion.div>
                );

                return info.href ? (
                  <a key={info.label} href={info.href}>
                    {content}
                  </a>
                ) : (
                  <div key={info.label}>{content}</div>
                );
              })}
            </div>

            {/* Social links */}
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-4">{t("social")}</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={siteConfig.social.email} aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Decorative quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 border-l-2 border-primary/30"
            >
              <p className="text-muted-foreground italic">
                &ldquo;The best way to predict the future is to create it.&rdquo;
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                — Peter Drucker
              </p>
            </motion.div>
          </motion.div>
        </div>
      </MotionSection>
    </SectionContainer>
  );
}
