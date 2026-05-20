'use client';

import { MotionSection } from '@/components/motion';
import { SectionContainer, SectionHeader } from '@/components/section-container';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Flag, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Knowledge() {
  const t = useTranslations('knowledge');

  const categories = [
    { id: 'ctf', Icon: Flag, label: t('categories.ctf') },
    { id: 'pentest', Icon: Lock, label: t('categories.pentest') },
    { id: 'tutorials', Icon: BookOpen, label: t('categories.tutorials') },
  ];

  return (
    <SectionContainer id="knowledge" className="gradient-bg">
      <MotionSection>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-xl p-8 mb-8 border border-primary/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-2">ZNote</h3>
                <p className="text-white/80 mb-4">{t('description')}</p>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              {categories.map(category => {
                const Icon = category.Icon;
                return (
                  <motion.div
                    key={category.id}
                    className="flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="bg-background/50 rounded-lg p-6 text-center cursor-pointer h-full"
                      whileHover={{
                        scale: 1.05,
                        skewY: 2,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, y: -5 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                      </motion.div>
                      <p className="text-sm text-white/70">{category.label}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <Link
              href="https://znote-delta.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
            >
              {t('cta')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </MotionSection>
    </SectionContainer>
  );
}
