'use client';

import { MotionSection } from '@/components/motion';
import { SectionContainer, SectionHeader } from '@/components/section-container';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, ExternalLink, Trophy, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* -------------------------------------------------------------------------- */
/* Données                                                                     */
/* x / y : position de l'étoile en % dans sa constellation (8 à 92 conseillé). */
/* Les lignes relient les étoiles dans l'ordre du tableau.                     */
/* Les textes viennent de next-intl : awards.items.<id>.*                      */
/* -------------------------------------------------------------------------- */

type Kind = 'distinction' | 'certification';

interface AwardItem {
  id: string;
  kind: Kind;
  x: number;
  y: number;
  /** Lien de vérification ou de preuve (optionnel) */
  href?: string;
  linkLabel?: 'verify' | 'viewCode';
  /** Logo de l'organisme dans /public (optionnel), ex: "/logos/aws.webp" */
  logo?: string;
  /** Aperçu de certificat dans le détail (optionnel) */
  image?: string;
}

const awards: AwardItem[] = [
  // Distinctions
  {
    id: 'jdn',
    kind: 'distinction',
    x: 16,
    y: 66,
    href: 'https://github.com/Z-Isaac08/MamaCI',
    linkLabel: 'viewCode',
  },
  { id: 'technovore', kind: 'distinction', x: 44, y: 28 },
  { id: 'musia', kind: 'distinction', x: 78, y: 58 },
  // Certifications
  {
    id: 'web-rta',
    kind: 'certification',
    x: 50,
    y: 48,
    href: 'https://labs.cyberwarfare.live/credential/achievement/6a1f31919b5a57bc0335459f',
    image: '/cyberwarfare_certification.png',
  },
];

/* -------------------------------------------------------------------------- */
/* Détail d'un élément (popover desktop + liste mobile)                        */
/* -------------------------------------------------------------------------- */

function AwardDetails({ item }: { item: AwardItem }) {
  const t = useTranslations('awards');
  const Icon = item.kind === 'distinction' ? Trophy : BadgeCheck;

  return (
    <div className="flex items-start gap-3 text-left">
      {item.logo ? (
        <Image
          src={item.logo}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 object-contain"
        />
      ) : (
        <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      )}

      <div className="min-w-0 space-y-1">
        <Badge variant="secondary">{t(`items.${item.id}.rank`)}</Badge>
        <h3 id="award-dialog-title" className="text-lg font-semibold leading-snug">
          {t(`items.${item.id}.title`)}
        </h3>
        <p className="text-sm font-medium text-primary">{t(`items.${item.id}.organization`)}</p>
        <p className="text-xs text-muted-foreground">{t(`items.${item.id}.date`)}</p>
        <p id="award-dialog-description" className="text-sm text-muted-foreground">
          {t(`items.${item.id}.description`)}
        </p>
        {item.kind === 'certification' && (
          <>
            <dl className="grid gap-3 pt-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">{t('issueDateLabel')}</dt>
                <dd>{t(`items.${item.id}.date`)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">{t('credentialIdLabel')}</dt>
                <dd className="break-all font-mono text-xs">
                  {t(`items.${item.id}.credentialId`)}
                </dd>
              </div>
            </dl>
            <div className="pt-2">
              <h4 className="mb-2 text-sm font-semibold">{t('skillsLabel')}</h4>
              <ul className="flex flex-wrap gap-2">
                {(t.raw(`items.${item.id}.skills`) as string[]).map(skill => (
                  <li key={skill}>
                    <Badge variant="outline">{skill}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {item.image && (
          <div className="holo-foil relative mx-auto mt-6 w-full max-w-2xl">
            <Image
              src={item.image}
              alt={t(`items.${item.id}.imageAlt`)}
              width={4678}
              height={3309}
              sizes="(max-width: 768px) 100vw, 672px"
              className="h-auto max-h-[55dvh] w-full object-contain"
            />
          </div>
        )}
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t(`links.${item.linkLabel ?? 'verify'}`)}
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}

function AwardPreview({ item }: { item: AwardItem }) {
  const t = useTranslations('awards');
  const Icon = item.kind === 'distinction' ? Trophy : BadgeCheck;

  return (
    <div className="flex items-start gap-3 text-left">
      {item.logo ? (
        <Image
          src={item.logo}
          alt=""
          width={24}
          height={24}
          className="size-6 shrink-0 object-contain"
        />
      ) : (
        <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      )}
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold leading-snug">{t(`items.${item.id}.title`)}</p>
        <p className="text-sm font-medium text-primary">{t(`items.${item.id}.organization`)}</p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {t(`items.${item.id}.shortDescription`)}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Constellation (desktop)                                                     */
/* -------------------------------------------------------------------------- */

function Constellation({
  kind,
  items,
  onSelect,
}: {
  kind: Kind;
  items: AwardItem[];
  onSelect: (item: AwardItem) => void;
}) {
  const t = useTranslations('awards');
  const reduceMotion = useReducedMotion();

  // Hover and keyboard focus show only a compact preview.
  const [hoverId, setHoverId] = useState<string | null>(null);
  const shownId = hoverId;
  const isDistinction = kind === 'distinction';

  const edges = items.slice(1).map((item, i) => [items[i], item] as const);

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold tracking-tight">{t(`groups.${kind}`)}</h3>

      <div className="relative h-80 lg:h-96">
        {/* Lignes */}
        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {edges.map(([a, b], i) => {
            const active = shownId === a.id || shownId === b.id;
            return (
              <motion.line
                key={`${a.id}-${b.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={active ? 1.5 : 1}
                className={cn(
                  'transition-colors duration-200',
                  active ? 'stroke-primary' : 'stroke-primary/30'
                )}
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              />
            );
          })}
        </svg>

        {/* Étoiles */}
        {items.map((item, i) => {
          const open = shownId === item.id;
          const popoverId = `award-${item.id}`;
          const above = item.y > 55;
          const align =
            item.x < 35 ? 'left-0' : item.x > 65 ? 'right-0' : 'left-1/2 -translate-x-1/2';

          return (
            <div
              key={item.id}
              className={cn('absolute -translate-x-1/2 -translate-y-1/2', open && 'z-10')}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onPointerEnter={e => {
                if (e.pointerType === 'mouse') setHoverId(item.id);
              }}
              onPointerLeave={e => {
                if (e.pointerType === 'mouse') setHoverId(null);
              }}
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                <button
                  type="button"
                  aria-describedby={open ? popoverId : undefined}
                  aria-haspopup="dialog"
                  aria-label={`${t(`items.${item.id}.title`)}, ${t(
                    `items.${item.id}.organization`
                  )}`}
                  onClick={() => onSelect(item)}
                  onFocus={() => setHoverId(item.id)}
                  onBlur={() => setHoverId(null)}
                  className="group flex size-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span
                    className={cn(
                      'block rounded-full transition-transform duration-200 group-hover:scale-125 group-active:scale-110',
                      isDistinction
                        ? 'size-4 bg-primary ring-4 ring-primary/20'
                        : 'size-2.5 bg-muted-foreground group-hover:bg-primary',
                      open && 'scale-125',
                      open && !isDistinction && 'bg-primary'
                    )}
                    style={
                      isDistinction ? { boxShadow: '0 0 18px var(--glow-primary)' } : undefined
                    }
                  />
                </button>
              </motion.div>

              {/* Compact preview on hover or focus */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    id={popoverId}
                    className={cn(
                      'absolute w-64',
                      above ? 'bottom-full pb-2' : 'top-full pt-2',
                      align
                    )}
                    initial={{ opacity: 0, y: above ? 4 : -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.15 }}
                  >
                    <div id={popoverId} role="tooltip" className="glass-strong w-64 rounded-xl p-3">
                      <AwardPreview item={item} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Liste reliée (mobile)                                                       */
/* -------------------------------------------------------------------------- */

function ConstellationList({
  kind,
  items,
  onSelect,
}: {
  kind: Kind;
  items: AwardItem[];
  onSelect: (item: AwardItem) => void;
}) {
  const t = useTranslations('awards');
  const isDistinction = kind === 'distinction';

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold tracking-tight">{t(`groups.${kind}`)}</h3>

      <ul className="relative space-y-6">
        <div className="absolute bottom-1.5 left-1.5 top-1.5 w-px bg-border" aria-hidden="true" />
        {items.map(item => (
          <li key={item.id} className="relative pl-8">
            <span
              className={cn(
                'absolute rounded-full',
                isDistinction
                  ? 'left-0 top-1.5 size-3 bg-primary'
                  : 'left-0.5 top-2 size-2 bg-muted-foreground'
              )}
              style={isDistinction ? { boxShadow: '0 0 12px var(--glow-primary)' } : undefined}
              aria-hidden="true"
            />
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`${t(`items.${item.id}.title`)}, ${t(`items.${item.id}.organization`)}`}
              onClick={() => onSelect(item)}
              className="w-full cursor-pointer rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <AwardPreview item={item} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                     */
/* -------------------------------------------------------------------------- */

export function Awards() {
  const t = useTranslations('awards');
  const distinctions = awards.filter(a => a.kind === 'distinction');
  const certifications = awards.filter(a => a.kind === 'certification');
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selectedAward && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [selectedAward]);

  const openDetails = (item: AwardItem) => setSelectedAward(item);

  return (
    <SectionContainer id="awards">
      <MotionSection>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        {/* Desktop : deux constellations */}
        <div className="hidden gap-12 md:grid md:grid-cols-5">
          <div className="md:col-span-3">
            <Constellation kind="distinction" items={distinctions} onSelect={openDetails} />
          </div>
          <div className="md:col-span-2">
            <Constellation kind="certification" items={certifications} onSelect={openDetails} />
          </div>
        </div>

        {/* Mobile : listes reliées */}
        <div className="space-y-12 text-left md:hidden">
          <ConstellationList kind="distinction" items={distinctions} onSelect={openDetails} />
          <ConstellationList kind="certification" items={certifications} onSelect={openDetails} />
        </div>

        <dialog
          ref={dialogRef}
          aria-labelledby="award-dialog-title"
          aria-describedby="award-dialog-description"
          onClose={() => setSelectedAward(null)}
          onClick={event => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
          className="relative m-auto max-h-[90dvh] w-11/12 max-w-3xl overflow-y-auto rounded-xl border border-border bg-background p-6 text-foreground shadow-xl backdrop:bg-foreground/50"
        >
          <button
            type="button"
            aria-label={t('closeDetails')}
            onClick={() => dialogRef.current?.close()}
            className="absolute right-3 top-3 z-10 flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
          {selectedAward && <AwardDetails item={selectedAward} />}
        </dialog>
      </MotionSection>
    </SectionContainer>
  );
}
