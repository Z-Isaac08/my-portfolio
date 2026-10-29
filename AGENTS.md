# Directives Agent & Standards UI/UX

Ce document régit toute génération de code UI (React/Next.js, Tailwind CSS, mise en page) dans ce projet.

**Principe central : l'identité visuelle appartient à l'auteur du projet, pas à l'agent.**
« Éviter le design générique » ne veut pas dire « rendre neutre ». Un projet avec une marque forte (couleurs, dégradés, glass, animations) doit rester fidèle à cette marque. Ce qu'on combat, c'est l'ajout de décisions visuelles que l'agent invente par réflexe, sans lien avec le système existant.

---

## 0. Contexte du projet (à tenir à jour)

> Cette section est la seule à modifier d'un projet à l'autre.

- **Stack :** Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, next-themes (classe `dark` sur `<html>`), next-intl, framer-motion, lucide-react.
- **Tokens de design :** définis dans `app/globals.css` (`:root`, `.dark`, puis exposés via `@theme inline`). C'est la source de vérité des couleurs, rayons et polices.
- **Marque :** bleu (hue ~255 en OKLCH). Couleur d'accent = `--primary`.
- **Utilitaires de style existants :** `.glass*`, `.gradient-bg`, `.gradient-radial`, `.glow*`, `.bg-grid`, `.animate-float*`. Ils font partie du langage visuel du projet.
- **Polices :** celles déclarées dans `@theme inline` (`--font-sans`, `--font-mono`). Ne pas en ajouter.
- **Texte d'interface :** passe par next-intl (clés `fr`/`en`), jamais en dur dans les composants.

---

## 1. Hiérarchie d'autorité

En cas de conflit, la règle de niveau supérieur l'emporte :

1. **Les tokens et composants existants du projet** (choix de l'auteur).
2. **Les skills `ui-skills` (MCP)** : `get_skill` pour `better-ui`, `better-typography`, `better-colors`, `better-accessibility`, `interface-review`.
3. **Ce document** : règles de repli et de qualité.

Règles associées :

- Ne jamais improviser une règle déjà couverte par un skill.
- Si aucun skill ne couvre le cas, appliquer ce document et **signaler le manque** dans la réponse.
- Si le projet n'a **aucune** identité définie (pas de tokens, pas de composants), seulement alors utiliser le repli sobre du §4.

---

## 2. Étape 0 : découvrir avant de produire

Avant d'écrire un composant :

1. Lire `globals.css` (ou le fichier de tokens) : couleurs, rayons, polices, utilitaires.
2. Lire 1 ou 2 composants existants proches de la demande, pour reprendre leurs conventions (structure, espacements, animations, gestion i18n).
3. Vérifier `components/ui/` : **réutiliser** un composant shadcn existant avant d'en créer un.
4. Décider ensuite, pas avant.

---

## 3. Couleurs : règles

- **Uniquement des classes sémantiques** liées aux tokens : `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary`, `ring-ring`, etc.
- **Interdit :** valeurs arbitraires (`text-[#3170dd]`), couleurs brutes de la palette Tailwind pour porter la marque (`bg-blue-500`, `text-indigo-600`), `oklch()` ou `hsl()` écrits dans un composant.
- **Besoin d'une nouvelle couleur** (statut, catégorie récurrente) : l'ajouter **une seule fois** comme token (variable CSS dans `:root` **et** `.dark`, puis `--color-*` dans `@theme inline`), puis l'utiliser par son nom. Un changement de teinte ne doit jamais demander un rechercher-remplacer dans le code.
- **Couleurs sémantiques/catégorielles** (ex. type de parcours, statut) : un token par catégorie, avec une variante valide dans les deux thèmes. Elles portent une information récurrente : c'est leur justification.
- **Rôle de l'accent :** `primary` marque l'action principale, l'élément actif, les liens et les repères de hiérarchie. Il ne sert pas de décor sur chaque élément d'une liste.
- **Les deux thèmes sont obligatoires :** chaque couleur, chaque état (hover, focus, actif, désactivé) doit être lisible en clair **et** en sombre. Vérifier le contraste en s'appuyant sur les tokens existants, qui sont censés le garantir.

---

## 4. Anti-slop : le test d'intention

Pour chaque choix visuel qui n'est pas déjà dans le projet (effet, couleur, ombre, animation, icône, dégradé), poser trois questions :

1. **Existe-t-il déjà dans le design system ?** Si oui, utiliser l'existant, ne pas réinventer une variante.
2. **A-t-il une fonction ?** (hiérarchiser, signaler un état, guider l'œil, donner un retour d'interaction). Si c'est « pour que ça fasse joli », le retirer.
3. **Est-ce que je l'ajoute par habitude de modèle ?** (violet-indigo, glow, cartes avec icône dans un cercle, hover qui scale partout). Si oui, le retirer.

### Ce qui est du slop

- Dégradés, glows ou glass **ajoutés hors du système existant**, ou répétés sur chaque élément (`bg-gradient-to-r from-purple-500 to-indigo-600` sur les titres et boutons, par exemple).
- Ombres exagérées et colorées (`shadow-2xl shadow-purple-500/50`).
- Cartes sur-décorées : icône colorée dans un cercle sur chaque carte d'une liste homogène. Légitime seulement si l'icône porte une information (statut, catégorie récurrente).
- Micro-animations gadget qui ralentissent ou distraient. Les animations **du langage visuel du projet** (apparition au scroll, hover de carte, fond animé) sont légitimes si elles restent discrètes.
- Emoji utilisés comme éléments d'interface : utiliser `lucide-react`.
- Copie promotionnelle dans l'UI (« Débloquez tout le potentiel… ») : le texte d'interface décrit une action ou un état. Ce principe vise les micro-textes d'UI, pas le contenu éditorial d'un portfolio, qui peut avoir une voix.

### Ce qui n'est pas du slop

- Une couleur de marque forte, utilisée avec cohérence.
- Du glass, des dégradés ou des glows **quand ils font partie des tokens/utilitaires du projet** et qu'ils servent la hiérarchie (ex. surface flottante, héro).
- Un style expressif voulu par l'auteur, même s'il n'est pas « sobre ».

### Repli sobre (seulement si le projet n'a aucune identité)

Fonds neutres mats, bordures fines à la place des ombres, un seul accent pour l'action principale, typographie rigoureuse. Style Vercel/Linear/GitHub. **Ce repli ne s'applique jamais à un projet qui a déjà ses tokens.**

---

## 5. Layout & composants

### Typographie

- Une seule famille pour le corps, une seconde éventuelle pour les titres. Maximum deux polices chargées, celles du projet.
- `truncate` ou `line-clamp-*` pour tout contenu dynamique.
- Hiérarchie stricte `h1` > `h2` > `h3` > `p`, sans saut de niveau.
- Texte lu en continu : `text-sm` minimum. `text-xs` réservé aux métadonnées (labels, dates, légendes).
- `tracking-tight` sur les grands titres, interlignage aéré sur le corps.

### Grille & espacements

- Multiples de 4px/8px. Pas de valeurs arbitraires type `mt-[13px]`.
- Flexbox et CSS Grid réactifs (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- Breakpoints : `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Pas de breakpoint personnalisé sans justification en commentaire.
- Mobile d'abord : tout composant doit être testé à ~375px de large.

### Rayons concentriques

Pour des conteneurs arrondis imbriqués : `rayon externe = rayon interne + padding`. S'appuyer sur l'échelle de rayons du projet (`rounded-sm` à `rounded-4xl`, dérivés de `--radius`), pas sur des valeurs choisies au hasard.

### Interaction & accessibilité

- Tout élément interactif a des états `:hover`, `:active` et un `focus-visible` net (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`), valides dans **les deux thèmes**.
- `aria-label` sur tout bouton icône seule. `aria-hidden` sur les éléments décoratifs (canvas, formes de fond).
- Contraste WCAG AA : 4.5:1 (texte standard), 3:1 (texte large ≥18px ou ≥14px gras, bordures de champs, icônes porteuses de sens).
- Cible tactile ≥ 44×44px sur mobile (padding invisible si besoin).
- Navigation clavier complète, ordre de tabulation logique.

### Animation

- Réutiliser les motifs framer-motion déjà présents (durées, easing, `viewport={{ once: true }}`) pour garder un rythme cohérent.
- Respecter `prefers-reduced-motion` : pas d'animation obligatoire pour comprendre l'interface.
- Animer `transform` et `opacity`, pas les propriétés qui déclenchent un reflow. Pas de boucle infinie coûteuse hors écran.

### États de contenu (données asynchrones)

- **Chargement :** squelette reprenant la forme du contenu final, pas un spinner centré pour une liste.
- **Vide :** message contextuel + action possible.
- **Erreur :** message clair + action de reprise (`Réessayer`), jamais de texte technique brut.

### Profondeur (z-index)

Échelle fixe : `z-10` (éléments élevés), `z-20` (sticky/fixe), `z-40` (overlays), `z-50` (modales, toasts). Pas de `z-[9999]`. Les fonds décoratifs restent sous le contenu (`-z-10` ou `z-0` avec contenu en `relative z-10`).

### Internationalisation

- Aucun texte visible en dur : tout passe par les clés next-intl, avec `fr` et `en` ajoutés ensemble.
- Prévoir des textes plus longs (le français dépasse souvent l'anglais de 20 à 30 %) : pas de largeur fixe sur les labels.

---

## 6. Protocole d'exécution

1. **Découvrir** (§2) : tokens, composants proches, `components/ui/`.
2. **Consulter** `ui-skills` pour les règles pertinentes.
3. **Concevoir** : valider la structure contre le §4 (test d'intention) et le §3 (couleurs).
4. **Générer** : code propre, modulaire, TypeScript strict, prêt pour la production, en reprenant les conventions du projet.
5. **Auto-auditer** (§7) avant livraison. Un point non respecté se corrige avant de livrer, pas en « amélioration possible », sauf si la correction sort du périmètre de la demande.
6. **Signaler** brièvement : tokens ajoutés, composants réutilisés, lacunes de skills.

---

## 7. Checklist d'auto-audit

- [ ] Toutes les couleurs passent par des tokens sémantiques ; aucune valeur codée en dur.
- [ ] Toute nouvelle couleur est un token défini dans les deux thèmes.
- [ ] Le rendu est fidèle à l'identité du projet (pas de style importé par habitude de modèle).
- [ ] Les effets (glass, dégradé, glow) réutilisent les utilitaires existants et ont une fonction.
- [ ] Contraste vérifié en clair **et** en sombre.
- [ ] États hover / focus-visible / active présents sur chaque élément interactif, dans les deux thèmes.
- [ ] `aria-label` sur les boutons icône seule ; décor en `aria-hidden`.
- [ ] États chargement / vide / erreur définis si données asynchrones.
- [ ] Hiérarchie de titres respectée.
- [ ] Espacements sur la grille 4/8px ; rayons concentriques.
- [ ] Aucun emoji utilisé comme icône fonctionnelle.
- [ ] Texte d'interface factuel, passé par next-intl, `fr` et `en` renseignés.
- [ ] `prefers-reduced-motion` respecté pour toute animation non essentielle.
- [ ] Composants existants réutilisés plutôt que dupliqués.

---

_Ce document ne prévaut jamais sur l'identité visuelle définie par l'auteur du projet. En cas de conflit entre une règle générique ci-dessus et un token ou un composant existant, le projet l'emporte._
