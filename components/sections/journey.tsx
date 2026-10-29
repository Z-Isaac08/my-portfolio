'use client';

import { MotionSection } from '@/components/motion';
import { SectionContainer, SectionHeader } from '@/components/section-container';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';

const experienceKeys = [
  { id: 'esatic-master', type: 'education' },
  { id: 'akiba-internship', type: 'work' },
  { id: 'esatic-licence', type: 'education' },
  { id: 'bac', type: 'education' },
] as const;

const typeIcons = {
  education: GraduationCap,
  work: Briefcase,
} as const;

const typeStyles = {
  education: {
    badge: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    text: 'text-blue-500 dark:text-blue-400',
    dot: 'border-blue-500',
    bullet: 'bg-blue-500',
  },
  work: {
    badge: 'bg-green-500/10 text-green-500 border-green-500/20',
    text: 'text-green-600 dark:text-green-400',
    dot: 'border-green-500',
    bullet: 'bg-green-500',
  },
} as const;

export function Journey() {
  const t = useTranslations('journey');

  return (
    <SectionContainer id="journey">
      <MotionSection>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {experienceKeys.map((exp, index) => {
              const Icon = typeIcons[exp.type];
              const styles = typeStyles[exp.type];
              const isEven = index % 2 === 0;

              const title = t(`experiences.${exp.id}.title`);
              const organization = t(`experiences.${exp.id}.organization`);
              const period = t(`experiences.${exp.id}.period`);
              const description = t(`experiences.${exp.id}.description`);
              const achievements = t.raw(`experiences.${exp.id}.achievements`) as string[];

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative grid gap-4 md:grid-cols-2 md:gap-8 text-left"
                >
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      'absolute left-4 md:left-1/2 w-3 h-3 rounded-full border-2 bg-background',
                      'transform -translate-x-1.5 md:-translate-x-1.5 mt-1.5',
                      styles.dot
                    )}
                  />

                  {/* Content */}
                  <div
                    className={cn('pl-10 md:pl-0', isEven ? 'md:pr-12' : 'md:col-start-2 md:pl-12')}
                  >
                    <motion.div
                      className="glass rounded-xl p-5"
                      whileHover={{ y: -2 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    >
                      {/* Type badge and period */}
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <Badge variant="outline" className={cn('text-xs', styles.badge)}>
                          <Icon className="h-3 w-3 mr-1" />
                          {t(`types.${exp.type}`)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{period}</span>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className={cn('text-sm font-medium mb-2', styles.text)}>{organization}</p>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-3">{description}</p>

                      {/* Achievements */}
                      <ul className="space-y-1.5 text-left">
                        {achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <span
                              className={cn('mt-1.5 h-1 w-1 rounded-full shrink-0', styles.bullet)}
                            />
                            <span>
                              {achievement.includes('http') ? (
                                <a
                                  href={achievement.split(' ').pop()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn('hover:underline', styles.text)}
                                >
                                  {achievement}
                                </a>
                              ) : (
                                achievement
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Empty column for layout */}
                  <div
                    className={cn('hidden md:block', isEven ? 'md:col-start-2' : 'md:col-start-1')}
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
