"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Shield, Users, Sparkles, BookOpen, Code2, Compass } from "lucide-react";
import { SectionContainer, SectionHeader } from "@/components/section-container";
import { MotionSection, MotionStagger, MotionItem } from "@/components/motion";

const approaches = [
  { icon: Shield, key: 0 },
  { icon: Users, key: 1 },
  { icon: Sparkles, key: 2 },
] as const;

export function About() {
  const t = useTranslations("about");

  return (
    <SectionContainer id="about" className="gradient-bg">
      <MotionSection>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column - Philosophy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t("intro")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Compass className="h-5 w-5 text-primary" />
                {t("philosophy.title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("philosophy.content")}
              </p>
            </motion.div>

            {/* Currently working on */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                {t("currently.title")}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    {t("currently.learning")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    {t("currently.building")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    {t("currently.exploring")}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Right column - Approach cards */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {t("approach.title")}
            </h3>
            <MotionStagger className="space-y-4">
              {approaches.map((item, index) => {
                const Icon = item.icon;
                return (
                  <MotionItem key={index}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="glass rounded-xl p-5 cursor-default"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">
                            {t(`approach.items.${index}.title`)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {t(`approach.items.${index}.description`)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </MotionItem>
                );
              })}
            </MotionStagger>
          </div>
        </div>
      </MotionSection>
    </SectionContainer>
  );
}
