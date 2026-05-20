'use client';

import { MotionSection } from '@/components/motion';
import { SectionContainer, SectionHeader } from '@/components/section-container';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Flag, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DecryptTextProps {
  text: string;
  isHovered: boolean;
}

function DecryptText({ text, isHovered }: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    const chars = '010101XX__*&%#@?';
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((ch, idx) => {
            if (idx < iterations) {
              return text[idx];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 0.3; // 5 chars / 0.3 = ~16.6 steps. 16.6 * 30ms = 500ms total duration.
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span>{displayText}</span>;
}

export function Knowledge() {
  const t = useTranslations('knowledge');
  const [isHovered, setIsHovered] = useState(false);

  const categories = [
    { id: 'ctf', Icon: Flag, label: t('categories.ctf') },
    { id: 'pentest', Icon: Lock, label: t('categories.pentest') },
    { id: 'tutorials', Icon: BookOpen, label: t('categories.tutorials') },
  ];

  return (
    <SectionContainer id="knowledge" className="bg-transparent">
      <MotionSection>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className={`glass rounded-xl p-8 mb-8 border border-border/40 transition-all duration-500 relative overflow-hidden group/znote ${
              isHovered
                ? 'border-indigo-500/30 dark:border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.15)] dark:shadow-[0_0_40px_rgba(99,102,241,0.25)]'
                : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Subtle inner radial glow on hover */}
            <div
              className={`absolute inset-0 bg-radial-[circle_at_center,rgba(99,102,241,0.06)_0%,transparent_70%] opacity-0 transition-opacity duration-700 pointer-events-none ${
                isHovered ? 'opacity-100' : ''
              }`}
            />

            <div className="flex items-start gap-4 mb-6 relative z-10">
              <div className={`p-3 rounded-lg bg-primary/10 transition-all duration-300 ${
                isHovered ? 'bg-indigo-500/20' : ''
              }`}>
                <BookOpen className={`h-6 w-6 text-primary transition-all duration-300 ${
                  isHovered ? 'text-indigo-500 dark:text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]' : ''
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  <DecryptText text="ZNote" isHovered={isHovered} />
                </h3>
                <p className="text-muted-foreground mb-4">{t('description')}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10">
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
                      className="bg-muted/40 dark:bg-background/50 rounded-lg p-6 text-center cursor-pointer h-full border border-border/20"
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
                        <Icon className="h-8 w-8 mx-auto mb-3 text-primary transition-colors duration-300 group-hover/znote:text-indigo-500/80 group-hover/znote:dark:text-indigo-400/80" />
                      </motion.div>
                      <p className="text-sm text-muted-foreground">{category.label}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <Link
              href="https://znote-delta.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-300 relative z-10 ${
                isHovered ? 'shadow-[0_0_20px_rgba(99,102,241,0.3)] bg-indigo-600 hover:bg-indigo-700' : ''
              }`}
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
