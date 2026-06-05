"use client";

import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import {
  SectionContainer,
  SectionHeader,
} from "@/components/section-container";
import { motion } from "framer-motion";
import {
  Compass,
  Shield,
  Sparkles,
  Users,
  Rocket,
  CheckCircle,
  ThumbsUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

const approaches = [
  { icon: Shield, key: 0 },
  { icon: Users, key: 1 },
  { icon: Sparkles, key: 2 },
] as const;

const softSkillsIcons = [
  Rocket,
  Users,
  CheckCircle,
  ThumbsUp,
] as const;

export function About() {
  const t = useTranslations("about");

  return (
    <SectionContainer id="about" className="bg-transparent">
      <MotionSection>
        <SectionHeader title={t("title")} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center mx-auto"
        >
          <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            {t("intro")}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-rows-[auto_auto]">
          {/* Row 1: Philosophy (span 2) & Languages (span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 glass rounded-2xl p-6 md:p-8 flex flex-col justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,200,255,0.15)]"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Compass className="h-6 w-6 text-primary" />
              {t("philosophy.title")}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t("philosophy.content")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 glass rounded-2xl p-6 flex flex-col justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,200,255,0.15)]"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
              {t("profile.languages.title")}
            </h3>
            <div className="space-y-4">
              {[0, 1].map((index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium text-lg">
                    {t(`profile.languages.items.${index}.name`)}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {t(`profile.languages.items.${index}.level`)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 2: Savoir-être (span 2) & Approach (span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 glass rounded-2xl p-6 md:p-8 flex flex-col justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,200,255,0.15)]"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
              {t("profile.softSkills.title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
              {[0, 1, 2, 3].map((index) => {
                const Icon = softSkillsIcons[index];
                return (
                  <div key={index} className="flex items-center gap-4">
                    <Icon className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground/90 font-medium">
                      {t(`profile.softSkills.items.${index}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1 glass rounded-2xl p-6 flex flex-col justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,200,255,0.15)]"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              {t("approach.title")}
            </h3>
            <div className="space-y-4">
              {approaches.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-0.5">
                        {t(`approach.items.${index}.title`)}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t(`approach.items.${index}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </MotionSection>
    </SectionContainer>
  );
}
