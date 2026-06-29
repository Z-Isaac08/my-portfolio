'use client';

import { useState } from 'react';
import { MotionSection } from '@/components/motion';
import { SectionContainer, SectionHeader } from '@/components/section-container';
import { skillCategories } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Skills() {
  const t = useTranslations('skills');
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const selectedCategory = skillCategories.find(c => c.id === activeCategory)!;
  const ActiveIcon = selectedCategory.icon;

  return (
    <SectionContainer id="skills" className="bg-transparent">
      <MotionSection>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-1/3 space-y-3">
            {skillCategories.map(category => {
              const Icon = category.icon;
              const isActive = category.id === activeCategory;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 relative overflow-hidden",
                    isActive 
                      ? "glass border-primary/50 bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.15)]" 
                      : "border-transparent hover:bg-muted/50"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-primary/5 -z-10" 
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className={cn(
                    "p-2.5 rounded-lg transition-colors relative", 
                    isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="h-5 w-5 relative z-10" />
                    {isActive && (
                      <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg" />
                    )}
                  </div>
                  <div>
                    <h3 className={cn("font-semibold", isActive ? "text-primary" : "")}>
                      {t(`categories.${category.id}.title`)}
                    </h3>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Skill Tree Area */}
          <div className="lg:w-2/3 glass rounded-2xl p-6 md:p-10 relative overflow-hidden min-h-[500px]">
            {/* Background glowing effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full relative z-10"
              >
                <div className="text-center mb-12">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 text-primary mb-6 shadow-[0_0_30px_rgba(var(--primary),0.2)] ring-1 ring-primary/30 relative"
                  >
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl" />
                    <ActiveIcon className="h-10 w-10 relative z-10" />
                  </motion.div>
                  <h2 className="text-3xl font-bold tracking-tight mb-3">
                    {t(`categories.${selectedCategory.id}.title`)}
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {t(`categories.${selectedCategory.id}.description`)}
                  </p>
                </div>

                <div className="relative max-w-2xl mx-auto">
                  {/* Central Vertical Line for Desktop */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2 hidden md:block" />

                  <div className="space-y-6 md:space-y-10 relative">
                    {selectedCategory.skills.map((skill, index) => {
                      const isLeft = index % 2 === 0;
                      return (
                        <SkillNode 
                          key={skill.name} 
                          skill={skill} 
                          index={index} 
                          isLeft={isLeft} 
                        />
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </MotionSection>
    </SectionContainer>
  );
}

function SkillNode({ skill, index, isLeft }: { skill: {name: string, level: number}, index: number, isLeft: boolean }) {
  const percentage = (skill.level / 5) * 100;
  
  return (
    <div className="flex w-full items-center justify-center relative">
      {/* Desktop connecting horizontal line */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "2rem", opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
        className={cn(
          "hidden md:block absolute top-1/2 h-px bg-primary/40 -z-10",
          isLeft ? "right-1/2 origin-right" : "left-1/2 origin-left"
        )} 
      />

      {/* Central Node Dot */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary hidden md:block z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
      />

      {/* Card Content */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 + 0.4, type: 'spring', stiffness: 200, damping: 20 }}
        className={cn(
          "w-full md:w-[calc(50%-2rem)]", 
          isLeft ? "md:mr-auto" : "md:ml-auto"
        )}
      >
        <motion.div 
          whileHover={{ scale: 1.03, y: -2 }}
          className="glass p-5 rounded-xl border border-primary/20 shadow-lg hover:shadow-[0_0_20px_rgba(var(--primary),0.15)] transition-all relative group overflow-hidden"
        >
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex justify-between items-center mb-3 relative z-10">
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
            <span className="text-xs font-mono px-2 py-1 bg-primary/10 rounded-md text-primary font-bold border border-primary/20">
              Lvl {skill.level}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden relative z-10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.6, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full relative"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
