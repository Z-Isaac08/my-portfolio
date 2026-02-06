'use client';

import { MotionSection } from '@/components/motion';
import { SectionContainer, SectionHeader } from '@/components/section-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projects, type Project } from '@/lib/data';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ExternalLink, Github, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const categories = ['all', 'web', 'mobile', 'ai', 'security', 'network'] as const;

export function Projects() {
  const t = useTranslations('projects');
  const tc = useTranslations('common');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <SectionContainer id="projects">
      <MotionSection>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setActiveCategory(category);
                setExpandedProject(null);
              }}
              className="capitalize"
            >
              {t(`categories.${category}`)}
            </Button>
          ))}
        </div>

        {/* Featured Projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 mb-12"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FeaturedProjectCard
                  project={project}
                  isExpanded={expandedProject === project.id}
                  onToggle={() =>
                    setExpandedProject(expandedProject === project.id ? null : project.id)
                  }
                  t={t}
                  tc={tc}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`other-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <ProjectCard project={project} t={t} tc={tc} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </MotionSection>
    </SectionContainer>
  );
}

function FeaturedProjectCard({
  project,
  isExpanded,
  onToggle,
  t,
  tc,
}: {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
  t: ReturnType<typeof useTranslations>;
  tc: ReturnType<typeof useTranslations>;
}) {
  const highlights = [0, 1, 2, 3]; // We assume 4 highlights per project for simplicity or we can check translation keys if dynamic length is needed, but fixed 4 is safer for now based on JSON structure

  return (
    <motion.div
      layout
      className="glass rounded-2xl overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs">
              <Star className="h-3 w-3 mr-1" />
              {t('featured')}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {project.category}
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl md:text-2xl font-bold mb-2">{t(`items.${project.id}.title`)}</h3>
        <p className="text-muted-foreground mb-4">{t(`items.${project.id}.description`)}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map(tech => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Expand/Collapse button */}
        <Button variant="ghost" size="sm" onClick={onToggle} className="mb-4 text-muted-foreground">
          {tc('learnMore')}
          <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="h-4 w-4 ml-1" />
          </motion.span>
        </Button>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t(`items.${project.id}.longDescription`)}
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium mb-2">{t('details.role')}</h4>
                    <p className="text-sm text-muted-foreground">{t(`items.${project.id}.role`)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">{t('details.highlights')}</h4>
                    <ul className="space-y-1">
                      {highlights.map(i => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                          {t(`items.${project.id}.highlights.${i}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          {project.github && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                {tc('viewCode')}
              </a>
            </Button>
          )}
          {project.live && (
            <Button size="sm" asChild>
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                {tc('viewProject')}
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  t,
  tc,
}: {
  project: Project;
  t: ReturnType<typeof useTranslations>;
  tc: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      className="glass rounded-xl p-6 h-full flex flex-col"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="text-xs capitalize">
          {project.category}
        </Badge>
        <span className="text-xs text-muted-foreground">{project.year}</span>
      </div>

      <h3 className="text-lg font-semibold mb-2">{t(`items.${project.id}.title`)}</h3>
      <p className="text-sm text-muted-foreground mb-4 grow">
        {t(`items.${project.id}.description`)}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.slice(0, 4).map(tech => (
          <Badge key={tech} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        {project.github && (
          <Button variant="ghost" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
        )}
        {project.live && (
          <Button variant="ghost" size="sm" asChild>
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
}
