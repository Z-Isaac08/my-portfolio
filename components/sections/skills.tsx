"use client";

import { MotionItem, MotionSection, MotionStagger } from "@/components/motion";
import {
  SectionContainer,
  SectionHeader,
} from "@/components/section-container";
import { skillCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Skills() {
  const t = useTranslations("skills");

  return (
    <SectionContainer id="skills" className="gradient-bg">
      <MotionSection>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <MotionStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <MotionItem key={category.id}>
                <motion.div
                  className="glass rounded-xl p-6 h-full"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-5">
                    {category.description}
                  </p>

                  {/* Skills list */}
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                      />
                    ))}
                  </div>
                </motion.div>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </MotionSection>
    </SectionContainer>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const percentage = (level / 5) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium">{name}</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((dot) => (
            <motion.span
              key={dot}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: dot * 0.05 }}
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                dot <= level ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
}
