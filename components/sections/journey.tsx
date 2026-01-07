"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GraduationCap, Briefcase, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionContainer, SectionHeader } from "@/components/section-container";
import { MotionSection } from "@/components/motion";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/utils";

const typeIcons = {
  education: GraduationCap,
  work: Briefcase,
  project: Rocket,
} as const;

const typeColors = {
  education: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  work: "bg-green-500/10 text-green-500 border-green-500/20",
  project: "bg-purple-500/10 text-purple-500 border-purple-500/20",
} as const;

export function Journey() {
  const t = useTranslations("journey");

  return (
    <SectionContainer id="journey">
      <MotionSection>
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => {
              const Icon = typeIcons[exp.type];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "relative grid gap-4 md:grid-cols-2 md:gap-8",
                    isEven ? "md:text-right" : ""
                  )}
                >
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute left-4 md:left-1/2 w-3 h-3 rounded-full border-2 bg-background",
                      "transform -translate-x-1.5 md:-translate-x-1.5 mt-1.5",
                      typeColors[exp.type].replace("bg-", "border-").split(" ")[0]
                    )}
                  />

                  {/* Content */}
                  <div
                    className={cn(
                      "pl-10 md:pl-0",
                      isEven ? "md:pr-12" : "md:col-start-2 md:pl-12"
                    )}
                  >
                    <motion.div
                      className="glass rounded-xl p-5"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      {/* Type badge and period */}
                      <div
                        className={cn(
                          "flex items-center gap-3 mb-3 flex-wrap",
                          isEven ? "md:flex-row-reverse" : ""
                        )}
                      >
                        <Badge
                          variant="outline"
                          className={cn("text-xs", typeColors[exp.type])}
                        >
                          <Icon className="h-3 w-3 mr-1" />
                          {t(`types.${exp.type}`)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {exp.period}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="font-semibold mb-1">{exp.title}</h3>
                      <p className="text-sm text-primary mb-2">
                        {exp.organization}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-3">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <ul
                        className={cn(
                          "space-y-1.5",
                          isEven ? "md:text-right" : ""
                        )}
                      >
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className={cn(
                              "flex items-start gap-2 text-xs text-muted-foreground",
                              isEven ? "md:flex-row-reverse" : ""
                            )}
                          >
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Empty column for layout */}
                  <div
                    className={cn(
                      "hidden md:block",
                      isEven ? "md:col-start-2" : "md:col-start-1"
                    )}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </MotionSection>
    </SectionContainer>
  );
}
