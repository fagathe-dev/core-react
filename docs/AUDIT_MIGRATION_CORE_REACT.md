# Audit de migration : `core-ts` → `core-react`

> **Phase 1 : audit documentaire et technique uniquement.** Aucun fichier applicatif n'a été modifié.
> Date : 3 novembre 2026.

| Variable | Chemin | Nature constatée |
|---|---|---|
| `CORE_TS_PATH` | `/d/workspace/core-ts/{docs,src}` | Lib TS 1.0.0, build `tsup` ESM+CJS, deps `axios` ^1.15, `marked` 18.0.1 |
| `SOCIAL_APP_PATH` | `/d/workspace/sf-next-p01-social-network/apps/gather_front/src` | Next.js 16.4 (App Router), React 19.3, styled-components 6, zustand 5, **lucide-react** |
| `BASE_APP_PATH` | `/d/workspace/sf-react-p01-base-app/frontend/src` | **Vite** 8 + React 19.2 + react-router 7 (SPA, pas de SSR), styled-components 6, zustand 5, react-hook-form + zod |
| `DESIGN_SYSTEM_PATH` | `/d/workspace/sf-p05-design-system` | Symfony + Twig, SCSS (Dart Sass) + TS vanilla (esbuild), tokens `--ds-*` |
| `CORE_REACT_DEST_PATH` | `/d/workspace/core-react` | Vide (contient uniquement ce rapport) |

Documentation lue : `core-ts/docs/*.md` (10 fichiers), `sf-react-p01-base-app/specs/*.md` (notamment `front_core_module.md`, `extraction_guide.md`), `*/ui/docs/**` des deux apps, `sf-p05-design-system/{SKILL.md, docs/design-system-agent-guide.md, assets/scss/ui-component-docs.md}`.

---

## Sommaire

0. [Synthèse et priorités](#0-synthèse-et-priorités)
1. [Partie 1 : Audit de `core-ts`](#partie-1--audit-général-et-ciblé-de-core-ts)
2. [Partie 2 : Géolocalisation & OpenStreetMap](#partie-2--extraction-du-service-de-géolocalisation--openstreetmap)
3. [Partie 3 : Audit croisé des hooks](#partie-3--audit-croisé-des-hooks)
4. [Partie 4 : Audit croisé de l'UI Kit](#partie-4--audit-croisé-de-lui-kit)
5. [Partie 4 bis : Design System, tokens partagés et direction artistique](#partie-4-bis--design-system-tokens-partagés-et-direction-artistique)
6. [Partie 5 : Plan de rétrocompatibilité « Zéro casse »](#partie-5--plan-de-rétrocompatibilité-zéro-casse--flemme-friendly)
7. [Annexes](#annexes)

---

## 0. Synthèse et priorités

### Les constats qui changent le plan

| # | Gravité | Constat | Preuve |
|---|---|---|---|
| 1 | 🔴 **Critique** | `convertMarkdownToHtml` (core-ts) **ne nettoie rien** : `<script>`, `<img onerror>`, `javascript:` et le HTML placé dans `==surlignage==` passent tels quels. Le résultat est injecté par `dangerouslySetInnerHTML` à **5 endroits** de l'app de base et par `innerHTML` dans l'éditeur du Design System. | Test exécuté sur `dist/` (§1.3.1) ; `JournalCard.tsx:96`, `JournalForm.tsx:140`, `JournalDetailsPage.tsx:168`, `NoteCard.tsx:73`, `NoteModal.tsx:111`, `md-editor.ts:216` |
| 2 | 🔴 Élevée | `CookieHelper` **n'est pas exporté** par le paquet : `storage/index.ts` fait `export * from './index'` (s'exporte lui-même) au lieu de `'./cookies'`. `docs/storage.md` documente pourtant `import { CookieHelper } from 'core-ts'`. | `src/utils/storage/index.ts`, `dist/index.d.ts` (0 occurrence) |
| 3 | 🔴 Élevée | `DragNDrop` **n'est pas exporté** : `utils/index.ts` n'inclut pas `./drag-n-drop`. | `src/utils/index.ts`, `dist/index.d.ts` |
| 4 | 🟠 Élevée | Règle « SVG natifs uniquement » **violée partout** : base = police d'icônes (`ds-icons.css`, classes `mdi`/`bx`) ; social = `lucide-react` ; Design System = polices Remix/MDI/Boxicons/Line Awesome ; core-ts = classes `ri-*` (`mapFileIcon`) et `<i class="ds ds-tick">` (`copyWithButtonFeedback`). | §4.3 |
| 5 | 🟠 Élevée | Les tokens ne sont **pas alignés** entre le DS et les apps : l'échelle d'espacement des apps n'est pas linéaire (`spacing[5]` = 1.5rem contre 1.25rem dans le DS, `spacing[8]` = 4rem contre 2rem), les rayons et la forme des rôles de couleur diffèrent, et le thème est piloté par trois attributs et deux clés de stockage différents. | §4 bis |
| 6 | 🟠 Moyenne | Les deux apps envoient le **JWT applicatif à n'importe quelle URL absolue** (`fetchAPI` ajoute `Authorization` sans filtrer l'origine). Une géolocalisation qui passerait par ce client enverrait le jeton à OpenStreetMap. | `services/fetchAPI.ts` (base), `lib/api/fetchAPI.ts` (social) ; déjà signalé dans `specs/front_core_module.md` §12 |
| 7 | 🟡 Moyenne | `StorageService` lit `window` dans son constructeur, et `useTheme` (base) touche `document`/`window` au chargement du module : **incompatibles SSR**. Le social contourne déjà le problème (instanciation paresseuse, `skipHydration`). | `storage.ts:1106`, `lib/api/storage.service.ts` |
| 8 | 🟡 Moyenne | `SelectableField` (core-ts) attend `.form-selectable-item` + classe `.active`, alors que le SCSS du DS stylise `.form-selectable-input:checked + .form-selectable-label` (CSS pur). Les deux implémentations ont divergé. | `forms/selectable.ts`, `forms/_selectable-card.scss` |
| 9 | 🟡 Moyenne | L'éditeur Markdown **n'existe pas dans core-ts** : il vit dans le DS (`md-editor.ts`, vanilla) et a été porté à la main dans le social (`useMarkdownEditor.ts`). La logique de transformation du texte est dupliquée. | §1.3.2 |
| 10 | 🟢 Bonne nouvelle | Le social contient déjà les meilleures briques à promouvoir : `MarkdownContent` (rendu jetons → React, **sans innerHTML**), `useMarkdownEditor`, thème par variables CSS compatible SSR (`appTheme`), `themeScript` anti-flash, props transitoires `$`. | §1.3, §3, §4 |

### Ordre de travail recommandé

1. **Correctifs core-ts (patch, sans rupture)** : exports manquants, durcissement Markdown, garde SSR de `StorageService`.
2. **Tokens partagés** (source unique TS → SCSS du DS + thème styled-components).
3. **core-ts : nouveaux modules purs** (géoloc, éditeur Markdown, modèle de sélection, validation de fichiers, auth/token, client HTTP unifié).
4. **core-react : hooks**, puis **UI Kit**.
5. **Proxies** dans l'app de base (SPA, moins risquée), puis dans le social (SSR).

---

## Partie 1 : Audit général et ciblé de `core-ts`

### 1.1 Constats transverses

| Sujet | Constat | Recommandation |
|---|---|---|
| Exports publics | `CookieHelper` et `DragNDrop` absents du paquet (cf. §0) ; `storage/index.ts` s'auto-exporte. | `storage/index.ts` → `export * from './cookies'; export * from './storage';`. Ajouter `export * from './drag-n-drop/drag-n-drop';` dans `utils/index.ts`. Ajouter un test « surface publique » qui importe chaque symbole documenté depuis `src/index.ts`. |
| Effets de bord à l'import | `marked.use(highlightExtension)` modifie **l'instance globale** de `marked` pour tout le process (y compris une app qui importerait `marked` pour autre chose). `BASE_URL` est figé à `http://localhost` lorsqu'il est évalué côté serveur. | Instance dédiée `new Marked(...)` dans core-ts. Pour `BASE_URL`, exposer `getBaseUrl()` (lecture paresseuse) et garder la constante pour compatibilité. |
| SSR | `StorageService` (constructeur), `CookieHelper.set` (`window.location`), `getCurrentUrl/getCurrentPath`, `copyToClipboard`/`isClipboardSupported` (`navigator`, `window`) supposent un navigateur. | Ajouter `isBrowser()` dans core-ts et des gardes : `StorageService` retombe sur un stockage mémoire hors navigateur au lieu de lever une erreur. |
| Types | `ClipboardOptions`/`ClipboardResult` déclarés **deux fois** dans `types/utils.d.ts` ; `RouteParams` redéclaré dans `router.ts`. Les types vivent dans des `.d.ts` réexportés comme modules. | Dédoublonner. À terme, passer les types en `.ts` (`export type`) pour que `tsup` les émette proprement. |
| Sécurité DOM | `FormManager.validateData` injecte les messages de violation via `innerHTML` (contenu venant de l'API) ; `insertElementToDOM(string)` passe par `insertAdjacentHTML`. | `textContent` pour les messages ; documenter que `insertElementToDOM(string)` attend du HTML de confiance. |
| Bugs | `FormManager.validateData` : précédence `A && B \|\| C` (le test `radio` s'applique même hors `INPUT`). `fillRadio`/`fillCheckboxes` cherchent dans **tout le `document`**, et pas dans le formulaire : deux formulaires avec le même `name` interfèrent. `encodeBase64` (`btoa`) échoue sur l'UTF-8 (« é »). | Parenthéser ; ajouter un paramètre `root: ParentNode = document` (rétrocompatible) ; ajouter `encodeSecret`/`encodeBase64Utf8` (copie de la version UTF-8 des apps). |
| Couplage présentation | `copyWithButtonFeedback` écrit `<i class="ds ds-tick me-1">` et des classes Bootstrap (`btn-success`) ; `mapFileIcon` retourne des classes Remix Icon (`ri-*`) et des noms de couleur. | Garder pour la compatibilité vanilla, mais exposer une version neutre (`getFileKind(filename)` → `'pdf' \| 'image' \| …`) que l'UI convertit en SVG. |
| Configuration morte | `UploaderOptions` et `DEFAULT_UPLOADER_OPTIONS` (`allowedTypes`, `maxFiles`, `previewContainer`) ne sont lus par aucun code. `ClipboardOptions.showFeedback` n'est lu nulle part. | Les brancher sur le nouveau moteur de validation (§1.3.4) ou les déprécier. |
| Dépendance | `axios` est embarqué par `fetchAPI` (core-ts), alors que les apps ont leur propre `fetchAPI` axios (contrat différent). | Voir §5 : un client HTTP unifié dans core-ts, au contrat des apps. |
| Divers | `'use strict'` inutile en ESM ; `constants/app.ts` contient des noms de cookie/stockage propres à un projet (`__ffr_v.*`). | Rendre ces clés configurables (`configureCoreTs({ apiTokenCookieName })`) en conservant les valeurs par défaut. |

### 1.2 Classification module par module

Légende : ✅ **Direct Ready** (consommable tel quel par React/Next) · 🔌 **Adapter Needed** (wrapper `core-react` requis) · 🧱 **Couplage DOM rigide** (sélecteurs/IDs en dur : à assouplir en `HTMLElement | string`).

| Module (`src/…`) | Exports | Classement | Détail / action |
|---|---|---|---|
| `config/*` | `DEFAULT_FETCH_API_CONFIG`, `FILE_TYPES_CONFIG`, `ANIMATION_DURATION`, `DEFAULT_DURATION`, `DEFAULT_UPLOADER_OPTIONS` | ✅ | Données pures. Commentaire de `DEFAULT_DURATION` faux (« 3 secondes » pour 10000). |
| `constants/breakpoints` | `BREAKPOINTS` | ✅ | **Identique au DS et aux apps** (576/768/992/1200/1400). Socle des tokens partagés (§4 bis). |
| `constants/app`, `constants/routes` | clés, `BASE_URL` | ✅ (réserve SSR) | `BASE_URL` évalué à l'import → `getBaseUrl()`. |
| `types/*` | types | ✅ | Dédoublonner. |
| `utils/date/*` | `DateFormatter`, `DateCalculator`, `ensureDate` | ✅ | Purs, testés, déjà utilisés par les deux apps. |
| `utils/string` | `slugify`, `escapeHtml`, `isEmail`… | ✅ | Ajouter `encodeSecret` (UTF-8) et `truncateWords` (aujourd'hui dans les apps). |
| `utils/request/router`, `url`, `http-status`, `api-error` | `router`, `addQueryParams`… | ✅ | `getCurrentUrl/Path` : garde SSR. |
| `utils/request/fetch` | `fetchAPI`, `createApiClient`… | ✅ (non utilisé) | Contrat différent de celui des apps (`FetchResponse` vs `JsonResponse/TextResponse/BlobResponse`), cookie `X-AUTH-TOKEN` vs `Authorization: Bearer`. Voir §5.2. |
| `utils/storage/storage` | `StorageService` | 🔌 | Accès `window` au constructeur → **crash SSR**. Fallback mémoire + instanciation paresseuse. |
| `utils/storage/cookies` | `CookieHelper` | ✅ (client) / ❌ non exporté | Corriger l'export. Client uniquement (`document.cookie`). |
| `utils/file/FileSizeFormatter` | `format`, `parse`, `isValid` | ✅ | Base du moteur de validation (§1.3.4). |
| `utils/file/mapFileIcon` | `mapFileIcon`, `FILE_ICON_MAP` | ✅ (données) | Couplé à Remix Icon : ajouter `getFileKind()`. |
| `utils/file/uploader` | `FileUploader` | 🔌 + 🧱 | `inputElement: HTMLInputElement` obligatoire, listener posé dans le constructeur, **pas de `destroy()`** (fuite). Voir §1.3.4. |
| `utils/features/marked` | `convertMarkdownToHtml`, `highlightExtension` | 🔌 + 🔴 sécurité | Voir §1.3.1. |
| `utils/features/clipboard` | `copyToClipboard`, `isClipboardSupported` | ✅ (client) | Purs côté logique. |
| ″ | `copyElementContent(elementId)`, `initClipboardHandlers()`, `copyWithButtonFeedback(button)` | 🧱 | `document.getElementById`, `querySelectorAll('[data-copy-target]')`, `innerHTML` du bouton. Voir §1.3.5. |
| `utils/dom/*` | `$`, `createElement`, `insertElementToDOM` | 🧱 (par nature) | Outils vanilla : **à ne pas utiliser dans React**. Ajouter `resolveElement()` (ci-dessous). |
| `utils/drag-n-drop` | `DragNDrop` | 🔌 / ❌ non exporté | Accepte déjà `string \| HTMLElement` ; pas de `destroy()` ; classes `dragging`/`drag-over` posées sur le DOM (conflit possible avec le VDOM si le `className` est piloté par React). Adaptateur `useDragNDrop(ref, options)`. |
| `utils/forms/FormManager` | `FormManager` | 🧱 | `form: HTMLFormElement` ; manipule valeurs, classes et nœuds de feedback. Réservé au vanilla/Twig : l'app de base utilise react-hook-form. Assouplir en `HTMLFormElement \| string`. |
| `utils/forms/selectable` | `SelectableField` | 🧱 | Sélecteurs en dur (`.form-selectable-item`, `.form-selectable-input`), `MutationObserver`, `dispatchEvent`. Voir §1.3.3. |
| `utils/forms/field-actions` | `fill*`, `get*`, `clear*` | 🧱 | `fillRadio`/`fillCheckboxes` cherchent dans `document` → paramètre `root`. |

#### Assouplissement rétrocompatible `HTMLElement | string`

Un seul utilitaire, ajouté à `utils/dom/` :

```ts
// core-ts/src/utils/dom/resolveElement.ts
export type ElementTarget<T extends Element = HTMLElement> = T | string;

/** Accepte un élément, un sélecteur CSS ou un id (sans #). Retourne null hors navigateur. */
export const resolveElement = <T extends Element = HTMLElement>(
  target: ElementTarget<T> | null | undefined,
  root: ParentNode = typeof document !== 'undefined' ? document : (null as never),
): T | null => {
  if (!target) return null;
  if (typeof target !== 'string') return target;
  if (typeof document === 'undefined') return null;
  return (root.querySelector<T>(target) ?? document.getElementById(target)) as T | null;
};
```

Signatures élargies (les anciens appels restent valides) :

| Avant | Après |
|---|---|
| `copyElementContent(elementId: string, options?)` | `copyElementContent(target: ElementTarget, options?)` (une chaîne sans `#` reste traitée comme un id) |
| `new SelectableField(container: HTMLElement, options?)` | `new SelectableField(container: ElementTarget, options?)` |
| `new FileUploader({ inputElement: HTMLInputElement, … })` | `inputElement: ElementTarget<HTMLInputElement>` |
| `new FormManager({ form: HTMLFormElement })` | `form: ElementTarget<HTMLFormElement>` |
| `fillRadio(name, value)` / `fillCheckboxes(name, values)` | `fillRadio(name, value, root = document)` / `fillCheckboxes(name, values, root = document)` (et `FormManager.fillData` passe `this.form`) |
| `initClipboardHandlers()` | `initClipboardHandlers(root: ParentNode = document)`, **idempotent** (marqueur `data-copy-ready`) |

Chaque classe DOM reçoit aussi une méthode `destroy()` qui retire ses listeners (`FileUploader`, `DragNDrop`, `SelectableField` complet).

---

### 1.3 Les 5 fonctionnalités ciblées

#### 1.3.1 Convertisseur Markdown → HTML (sécurité critique)

**Méthode actuelle** (`utils/features/marked.ts`) : `marked.parse(md, { async: false, gfm: true })` sur l'instance **globale**, avec l'extension `highlight` (`==texte==` → `<mark>`). **Aucune option de sécurité** ; la doc (`docs/markdown.md`) ne mentionne aucun risque. Le social l'a remarqué : sa doc UI indique *« ne pas utiliser `convertMarkdownToHtml` de core-ts : elle ne nettoie pas son résultat »*. Le DS le signale aussi (guide §13.9).

**Test exécuté** sur `core-ts/dist/index.js` (marked 18.0.1) :

| Entrée | Sortie actuelle | Verdict |
|---|---|---|
| `<script>alert(1)</script>` + `<img src=x onerror=alert(2)>` | recopiés tels quels | 🔴 XSS |
| `[x](javascript:alert(3))` | `<a href="javascript:alert(3)">` | 🔴 XSS au clic |
| `==<b onmouseover=alert(6)>x</b>==` | `<mark><b onmouseover=alert(6)>x</b></mark>` | 🔴 XSS |
| `` `<img src=x onerror=alert(4)>` `` (code inline) | `<code>&lt;img …&gt;</code>` | ✅ échappé par marked |
| bloc ```` ```html ```` contenant `<script>` | `<pre><code class="language-html">&lt;script&gt;…` | ✅ échappé par marked |
| `![x" onerror="alert(7)](x)` | attribut `alt` échappé | ✅ |

Les blocs de code sont donc aujourd'hui échappés **par effet de bord** du renderer par défaut de marked, sans garantie contractuelle ni test. Point important pour la suite : dans marked 18, `token.text` des jetons `codespan` et `code` est **brut** (non échappé) ; un rendu React qui passe ce texte en enfant (`<code>{token.text}</code>`) est donc correct et inerte.

**Stratégie cible : défense en profondeur, sans `innerHTML` côté React.**

*Dans core-ts (agnostique, compatible SSR et Node, sans DOMPurify obligatoire) :*

1. **Instance dédiée** `const parser = new Marked({ gfm: true }, highlightExtension, safeRendererExtension)` : plus de mutation du singleton global.
2. **Renderer de sécurité par liste blanche** :
   - `html` (bloc et inline) → `escapeHtml(token.text)` : **aucun HTML brut n'est jamais émis** ;
   - `code` → `<pre><code class="language-${safeLang}">${escapeHtml(text)}</code></pre>`, avec `safeLang` limité à `[a-z0-9+#-]` ; `codespan` → `<code>${escapeHtml(text)}</code>`. Échappement **explicite**, sans dépendre du comportement par défaut de marked ;
   - `link` → protocole autorisé (`http:`, `https:`, `mailto:`, chemin relatif ou ancre), sinon rendu du texte seul ; ajout de `rel="noopener noreferrer nofollow ugc"` et `target="_blank"` pour les liens externes ;
   - `image` → même liste blanche ; option `allowImages` (désactivée par défaut, comme le social, pour ne pas révéler l'IP du lecteur à un tiers).
3. **API rétrocompatible** :
   ```ts
   export interface MarkdownOptions {
     allowImages?: boolean;        // défaut false
     headingOffset?: 0 | 1 | 2;    // le social décale les titres de +2
     breaks?: boolean;             // le social utilise breaks: true
     /** Sortie NON sûre, réservée à du contenu de confiance (doc interne). */
     unsafeAllowHtml?: boolean;
   }
   convertMarkdownToHtml(md: string, options?: MarkdownOptions): string; // sûr par défaut
   parseMarkdown(md: string, options?): Token[];                         // jetons pour les rendus non-HTML (React)
   ```
   Le changement de comportement (HTML brut désormais affiché comme du texte) est **voulu** : c'est le correctif. Les 5 appels de l'app de base deviennent sûrs **sans modification**.
4. **Tests de non-régression** : une suite de vecteurs (OWASP XSS cheat sheet : `<svg onload>`, `javascript:` encodé `&#106;avascript:`, `data:text/html`, `<iframe>`, attributs dans les titres de lien, HTML dans `==…==`, dans un tableau GFM, dans une liste de tâches) avec l'assertion « la sortie ne contient ni `<script`, ni `on\w+=`, ni `javascript:` ».

*Deuxième couche optionnelle :* DOMPurify n'est utile que pour la sortie HTML injectée dans le DOM (DS vanilla, `dangerouslySetInnerHTML` hérité). Il dépend du DOM (jsdom côté serveur) : le garder **hors de core-ts**, en option dans le DS et dans `core-react` (`<MarkdownHtml sanitize>` côté client).

**Encapsulation dans core-react :**

```tsx
'use client'; // pas strictement nécessaire (rendu pur), mais l'aperçu de l'éditeur est client
export interface MarkdownViewerProps {
  children: string;
  allowImages?: boolean;
  headingOffset?: 0 | 1 | 2;
  linkTarget?: '_blank' | '_self';
  components?: Partial<Record<'a' | 'code' | 'pre' | 'img' | 'mark', React.ElementType>>; // surcharge (ex. NextLink)
  className?: string;
}
export const MarkdownViewer = ({ children, ...options }: MarkdownViewerProps) => {
  const nodes = useMemo(() => renderTokens(parseMarkdown(children, options), options), [children, options]);
  return <Prose className={options.className}>{nodes}</Prose>;
};
export const useMarkdown = (source: string, options?) => useMemo(() => renderTokens(parseMarkdown(source, options), options), [source, options]);
```

- Base de code : **`MarkdownContent` du social** (rendu jeton → élément React, **zéro `dangerouslySetInnerHTML`**). Les blocs `code`/`codespan` sont rendus comme enfants texte : React les échappe, **un `<script>` dans un bloc de code reste du texte inerte, garanti par construction**.
- Utilisable en **Server Component** (fonction pure), ce qui sert le SEO du social.
- `MarkdownContent` reste un alias exporté (compatibilité).

#### 1.3.2 Éditeur de Markdown

**Constat :** aucun éditeur dans core-ts. Deux implémentations :

| | DS `assets/ts/interactions/components/md-editor.ts` (277 l.) | Social `hooks/useMarkdownEditor.ts` + `ui/components/Forms/MarkdownEditor` |
|---|---|---|
| Activation | `[data-ds-md-editor]`, `root.querySelector(':scope > textarea')`, boutons `[data-md-action]`, SegmentedControl `[data-md-mode]` (`ds:change`) | `textareaRef` + `onKeyDown` branchés sur un `<textarea>` contrôlé |
| Sélection / curseur | `selectionStart/End`, `setSelectionRange`, `execCommand('insertText')` (garde l'historique Ctrl+Z) avec repli `setRangeText` + événement `input` | **Identique** (portage) |
| Actions | gras, italique, barré, surligné, code, bloc de code, lien, titre, citation, listes, tâches ; raccourcis Ctrl+B/I/K/E ; continuation de liste sur Entrée | Identique |
| Barre d'outils | HTML Twig | `ACTIONS` + `<Icon>` (lucide) |
| Aperçu | `preview.innerHTML = convertMarkdownToHtml(...)` 🔴 | `<MarkdownContent>` ✅ |
| Contrôle | DOM | contrôlé seulement (`value`/`onChange`) |

**Architecture cible :**

*core-ts : `utils/features/markdown-editor/` (logique pure, sans DOM)* :

```ts
export interface TextSelectionState { value: string; selectionStart: number; selectionEnd: number; }
export interface TextEdit { start: number; end: number; text: string; selection: [number, number]; }
export type MarkdownAction = 'bold' | 'italic' | 'strike' | 'highlight' | 'code' | 'codeblock' | 'link' | 'heading' | 'quote' | 'ul' | 'ol' | 'task';

export const computeMarkdownAction: (state: TextSelectionState, action: MarkdownAction) => TextEdit | null;
export const computeListContinuation: (state: TextSelectionState) => TextEdit | null; // Entrée
export const MARKDOWN_SHORTCUTS: Readonly<Record<string, MarkdownAction>>;

// Pont DOM unique (le seul endroit qui touche au textarea), partagé par le DS et core-react
export const applyTextEdit: (textarea: HTMLTextAreaElement, edit: TextEdit) => void; // execCommand('insertText') + repli
```

Les fonctions pures (`applyWrap`, `applyLinePrefix`, `continueBlock` du social) deviennent testables sans jsdom. Le DS (`md-editor.ts`) et core-react consomment le même code.

*core-react : `useMarkdownEditor` + `<MarkdownEditor />` (`'use client'`)* :

```ts
interface UseMarkdownEditorOptions {
  value?: string;                    // mode contrôlé
  defaultValue?: string;             // mode non contrôlé
  onChange?: (value: string) => void;
  initialMode?: 'write' | 'preview';
  shortcuts?: boolean | Partial<Record<string, MarkdownAction>>;
}
interface UseMarkdownEditorReturn {
  textareaRef: React.RefCallback<HTMLTextAreaElement>; // fusionnable avec une ref externe
  mode: 'write' | 'preview'; setMode(mode): void;
  applyAction(action: MarkdownAction): void;
  getTextareaProps(): { ref; value | defaultValue; onChange; onKeyDown }; // prop getter
  value: string;                     // valeur courante (contrôlée ou interne)
  previewMinHeight?: number;
}
```

- **Contrôlé** : `execCommand('insertText')` déclenche un événement `input` natif, que React traduit en `onChange` : le state du parent reste la source de vérité, sans écriture concurrente sur `.value`.
- **Non contrôlé** : `defaultValue` + `useRef` interne ; `onChange` optionnel notifie le parent ; `value` exposé via un state synchronisé sur l'événement `input`.
- **SSR** : aucun accès à `document` pendant le rendu (seulement dans les handlers et les effets). Le composant porte `'use client'`.
- **React 19** : `ref` est une prop ordinaire ; fusion via un `mergeRefs` interne.
- Le `<MarkdownEditor>` du social devient le composant de core-react (barre d'outils configurable `actions`, `label`, `hint`, `error`), avec icônes SVG maison (§4.3) et aperçu `MarkdownViewer`.

#### 1.3.3 Selectable (cartes et chips sélectionnables)

**Mécanique actuelle** (`forms/selectable.ts`, `SelectableField`) :

- Conteneur `.form-selectable` → items `.form-selectable-item` contenant un input caché `.form-selectable-input` (radio ou checkbox rendu par Twig).
- Modes : `radio` (sélection obligatoire, **pas de désélection**, décoche les frères) et `nullable` (bascule indépendante de chaque input : en pratique une **sélection multiple** si plusieurs checkboxes, malgré son nom).
- **Aucune limite** (`max`) ; **aucun clavier** (clic seulement, avec `preventDefault()` qui casse l'activation native d'un `<label>`).
- Classe `.active` posée sur l'item ; `is-valid`/`is-invalid` recopiées depuis l'input par un `MutationObserver` (couplage avec `FormManager`).
- Événements `input` et `change` émis à la main ; callback `onSelect(value | null)` qui ne donne que la dernière valeur (inadapté au multiple).
- `destroy()` ne déconnecte que l'observer : les listeners `click`/`input`/`change` restent.
- Divergence DS : le SCSS (`_selectable-card.scss`) stylise `.form-selectable-input:checked + .form-selectable-label` (CSS pur, sans JS), et le DS ne référence plus `.form-selectable-item` que dans la page de doc `_form-manager`. Les chips (`.chip.is-selected` + `aria-pressed`) n'ont aucune logique dans core-ts.

**Séparation cible :**

*core-ts : machine à états pure* (`utils/forms/selection-model.ts`) :

```ts
export type SelectionMode = 'single' | 'single-nullable' | 'multiple';
export interface SelectionConfig { mode: SelectionMode; max?: number; min?: number; }
export interface SelectionState { selected: readonly string[]; }
export type SelectionResult = { state: SelectionState; changed: boolean; rejected?: 'max' | 'min' };

export const toggleSelection: (state: SelectionState, value: string, config: SelectionConfig) => SelectionResult;
export const setSelection:    (values: string[], config: SelectionConfig) => SelectionState; // normalise (max, unicité)
export const isSelected:      (state: SelectionState, value: string) => boolean;
```

Correspondance : `radio` → `single`, `nullable` → `multiple` (ou `single-nullable` pour un radio désélectionnable). `SelectableField` est réécrit **par-dessus ce modèle** (mêmes options, même DOM), ce qui le rend compatible avec le markup actuel du DS (`:checked` + label) et l'ancien (`.form-selectable-item` + `.active`).

*core-react : adaptateur sans manipulation DOM* :

```ts
const { getGroupProps, getItemProps, getInputProps, selected, select, clear } = useSelectable({
  mode: 'multiple', max: 3,
  value, defaultValue, onChange,   // contrôlé / non contrôlé, onChange(selected: string[])
  name: 'interests',               // inputs natifs cachés => compatibles <form>, FormData, react-hook-form
});
```

- `getItemProps(value)` → `{ role: 'radio' | 'checkbox', 'aria-checked', tabIndex (tabulation itinérante), onClick, onKeyDown (espace, entrée, flèches), 'data-selected', $selected }` : l'état visuel vient du **state React**, jamais d'un `classList.toggle`.
- Composants : `<SelectableCardGroup>` / `<SelectableCard>` et `<ChipGroup>` / `<Chip>` (chip = `aria-pressed`, conforme au DS).
- Validation : `error` en prop (plus de `MutationObserver`).

#### 1.3.4 Uploader de fichiers

**Gestion actuelle :**

| Aspect | core-ts `FileUploader` | Apps `FileDropzone` (UI) |
|---|---|---|
| Entrée | `input.addEventListener('change')` dans le constructeur, **`files[0]` uniquement** | clic sur zone → `inputRef.click()` ; drop |
| Drag & Drop | ❌ (`DragNDrop` sert à réordonner des éléments, pas à déposer des fichiers) | ✅ `onDragOver/Leave/Drop` |
| Taille | `FileSizeFormatter.isValid(size, '10M')` | `maxSizeMb` (Mo) |
| Type MIME | égalité stricte `allowedMimes.includes(file.type)` (pas de `image/*`, pas d'extension) | ❌ aucun contrôle : `accept` ne s'applique qu'au sélecteur, **pas au drop** |
| Nombre max | ❌ | ❌ (`multiple=false` non respecté au drop) |
| Lecture | `FileReader.readAsDataURL` pour les images (base64 en mémoire) | — |
| Envoi | `fetchAPI` POST `FormData`, `fieldName` par défaut `'avatar'`, `onProgress` (axios) | délégué à l'appelant (`onFilesSelected`) |
| Annulation / nettoyage | ❌ ni `AbortSignal`, ni `destroy()` | — |
| Re-sélection du même fichier | — | corrigée dans le social (`e.target.value = ''`), pas dans la base |

**Découpage cible :**

*core-ts : moteur pur* (`utils/file/validation.ts`, `read.ts`, `upload.ts`) :

```ts
export interface FileRules {
  accept?: string | FileCategory[];   // 'image/*,.pdf' ou ['IMAGE','PDF'] (FILE_TYPES_CONFIG)
  maxSize?: string | number;          // '10M' | octets
  maxFiles?: number;
  minSize?: string | number;
}
export type FileRejectionCode = 'file-too-large' | 'file-too-small' | 'file-invalid-type' | 'too-many-files';
export interface FileRejection { file: File; code: FileRejectionCode; message: string; }
export const validateFiles: (files: Iterable<File>, rules: FileRules, alreadySelected?: number) =>
  { accepted: File[]; rejected: FileRejection[] };
export const matchesAccept: (file: File, accept: string | FileCategory[]) => boolean; // MIME, joker, extension

export const readFileAsDataURL: (file: File, signal?: AbortSignal) => Promise<string>;
export const createFilePreview: (file: File) => { url: string; revoke: () => void }; // URL.createObjectURL

export const uploadFile: <T>(url: string, file: File | File[], options?: {
  fieldName?: string; extraFields?: Record<string, string>;
  onProgress?: (percent: number) => void; signal?: AbortSignal; client?: HttpClient;
}) => Promise<T>;
```

`FileUploader` est conservé, réécrit sur ces fonctions, avec `inputElement: ElementTarget`, `destroy()`, et lecture enfin branchée de `DEFAULT_UPLOADER_OPTIONS`. Les messages d'erreur restent en français (existant), surchargeables via `messages`.

*core-react : `useFileUploader` + `<FileUploader />`* :

```ts
const {
  files, rejections, previews, progress, status,   // 'idle' | 'uploading' | 'success' | 'error'
  getRootProps, getInputProps, isDragActive,        // prop getters : événements synthétiques React
  open, remove, reset, upload,
} = useFileUploader({ accept: 'image/*', maxSize: '5M', maxFiles: 4, multiple: true, autoUpload: false, uploadUrl, onUploaded });
```

- `getInputProps()` gère la ref de l'input caché, `onChange`, `onClick` (avec `stopPropagation`, correctif du social) et la remise à zéro de `value` ; `getRootProps()` gère `onDragEnter/Over/Leave/Drop`, `onKeyDown` (entrée/espace → `open()`), `role="button"` et `tabIndex`.
- Aperçus par `URL.createObjectURL`, **révoqués** au démontage ou au retrait (plus de base64 en mémoire).
- `AbortController` à l'unmount ; `<FileUploader>` = fusion des deux `FileDropzone` (le social sert de base).

#### 1.3.5 Clipboard (copier / coller)

**Audit :**

| Fonction | Constat |
|---|---|
| `copyToClipboard(text)` | ✅ `navigator.clipboard.writeText` si `isSecureContext`, sinon repli `execCommand('copy')` via textarea hors écran. Retourne `{ success, error }`. Options `showFeedback`, `successMessage`, `errorMessage` **ignorées**. |
| `isClipboardSupported()` | Accède à `navigator`/`window`/`document` sans garde → **lève une erreur côté serveur**. Le `useClipboard` de la base l'appelle **pendant le rendu** : inutilisable tel quel dans Next. |
| `copyWithButtonFeedback(button)` | 🧱 réécrit `innerHTML` et `className` du bouton (`ds ds-tick`, `btn-success`) : interdit sous React (le VDOM ne connaît pas ces mutations). |
| `initClipboardHandlers()` | 🧱 `querySelectorAll('[data-copy-target]')` + `getElementById` ; **non idempotent** (double listener si appelée deux fois). |
| `copyElementContent(elementId)` | 🧱 id seulement. |
| Coller | ❌ **absent** : pas de `readFromClipboard`. |

**Cible core-ts** : ajouter `readFromClipboard(): Promise<{ success: boolean; text?: string; error?: 'unsupported' | 'permission-denied' | 'unknown' }>` (`navigator.clipboard.readText`), `copyRichText(html, plain)` (`ClipboardItem`) en option, et des gardes `typeof navigator !== 'undefined'`. Codes d'erreur typés plutôt que des messages libres.

**Cible core-react : `useClipboard`** (promotion du hook de la base, déjà bien conçu) :

```ts
const { copy, paste, isCopied, hasCopied /* alias */, error, isSupported, reset } = useClipboard({
  timeout: 2000,            // alias de feedbackDuration (conservé)
  onSuccess, onError,
});
```

- `isSupported` calculé dans un `useEffect` (`false` au rendu serveur puis mis à jour à l'hydratation : pas d'écart d'hydratation).
- Timer réinitialisé à chaque copie et nettoyé à l'unmount (déjà fait dans la base).
- `onSuccess`/`onError` stockés dans une ref (pas de recréation de `copy` à chaque rendu).
- Composant optionnel `<CopyButton value="…" />` (icône SVG copier/coché) qui remplace `copyWithButtonFeedback` côté React.

---

## Partie 2 : Extraction du service de géolocalisation & OpenStreetMap

### 2.1 Comparaison des implémentations

| Critère | Base `hooks/useGeoLocation.tsx` | Social `features/posts/useGeolocation.ts` | Retenu |
|---|---|---|---|
| Consommateur | `JournalLocationTrigger` (journal privé) | `PostComposer`, `PostEditModal` (publication publique) | — |
| Résultat | `EntryLocation` complet : `name`, `latitude`, `longitude`, `street`, `city`, `country` | `label` « Ville, Pays » uniquement (**confidentialité par conception** : jamais de coordonnées ni de rue dans une publication) | Les deux via `precision: 'street' \| 'city'` |
| Options GPS | `enableHighAccuracy: true`, `timeout: 10 000` | `timeout: 10 000` | Configurables |
| Requête Nominatim | `/reverse?lat&lon&format=json` | `+ zoom=10` (niveau ville : réponse plus légère, moins précise) | `zoom` selon la précision |
| En-têtes | `Accept-Language: fr`, **`User-Agent: PersonalLifeOS/1.0`** | `Accept-Language: fr` | Voir 2.3 : `User-Agent` n'est pas modifiable depuis un navigateur |
| Ville | `city ?? town ?? village` | `+ municipality` | Social, étendu (`hamlet`, `suburb`) |
| `res.ok` vérifié | ❌ | ❌ | ✅ |
| Échec Nominatim | **repli sur les coordonnées** (`"48.8566, 2.3522"`) | erreur « Lieu introuvable » | Repli configurable (`fallback: 'coordinates' \| 'error'`) |
| Timeout réseau / annulation | ❌ | ❌ | `AbortSignal` + timeout |
| Permission préalable | ❌ | ❌ | `navigator.permissions.query({ name: 'geolocation' })` |
| Cache / rate limit | ❌ | ❌ | ✅ (politique Nominatim) |
| Libellés d'erreur | 1/2/3 → FR | 1/2/3 → FR (« La recherche a expiré ») | Codes typés + messages FR par défaut |
| Fuite de jeton | `fetch` natif ✅ | `fetch` natif ✅ | **Garder `fetch` natif** : le `fetchAPI` des apps ajouterait le JWT (§0 n°6) |

### 2.2 Conception du service `core-ts` (100 % agnostique)

Nouveau module `src/utils/geo/` (zéro import UI, zéro React) :

```ts
// --- Types stricts
export interface GeoCoordinates { latitude: number; longitude: number; accuracy?: number; }
export type GeolocationErrorCode =
  | 'UNSUPPORTED' | 'INSECURE_CONTEXT' | 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT'
  | 'GEOCODING_FAILED' | 'GEOCODING_EMPTY' | 'RATE_LIMITED' | 'ABORTED';
export class GeolocationError extends Error {
  constructor(public readonly code: GeolocationErrorCode, message?: string, public readonly cause?: unknown) { super(message ?? GEO_ERROR_MESSAGES[code]); }
}
export const GEO_ERROR_MESSAGES: Record<GeolocationErrorCode, string>; // FR, surchargeable

export interface NominatimAddress {
  house_number?: string; road?: string; pedestrian?: string; suburb?: string; hamlet?: string;
  village?: string; town?: string; city?: string; municipality?: string; county?: string;
  state?: string; postcode?: string; country?: string; country_code?: string;
}
export interface NominatimReverseResponse {
  place_id: number; licence: string; osm_type?: 'node' | 'way' | 'relation'; osm_id?: number;
  lat: string; lon: string; display_name: string; address?: NominatimAddress;
  boundingbox?: [string, string, string, string]; error?: string; // { error: "Unable to geocode" }
}
export interface ResolvedLocation {
  name: string;                 // libellé affichable
  latitude: number | null;      // null en précision 'city' (confidentialité)
  longitude: number | null;
  street: string | null; city: string | null; postcode: string | null; country: string | null; countryCode: string | null;
  source: 'nominatim' | 'coordinates';
}

// --- API
export const getGeolocationPermission: () => Promise<PermissionState | 'unsupported'>;
export const getCurrentPosition: (options?: PositionOptions & { signal?: AbortSignal }) => Promise<GeoCoordinates>;
export const reverseGeocode: (coords: GeoCoordinates, options?: ReverseGeocodeOptions) => Promise<NominatimReverseResponse>;
export const formatLocation: (response: NominatimReverseResponse | null, coords: GeoCoordinates, precision: 'street' | 'city') => ResolvedLocation;
export const locate: (options?: LocateOptions) => Promise<ResolvedLocation>; // enchaîne les trois

export interface ReverseGeocodeOptions {
  endpoint?: string;            // défaut https://nominatim.openstreetmap.org (ou instance auto-hébergée / proxy backend)
  language?: string;            // 'fr' → Accept-Language
  zoom?: number;                // 18 (rue) | 10 (ville)
  email?: string;               // identification recommandée par la politique Nominatim (paramètre `email`)
  timeout?: number;             // 8 000 ms
  signal?: AbortSignal;
  cache?: boolean;              // défaut true
  fetcher?: typeof fetch;       // injectable (tests, SSR)
}
export interface LocateOptions extends ReverseGeocodeOptions {
  precision?: 'street' | 'city';             // 'city' par défaut (le plus sûr)
  fallback?: 'coordinates' | 'error';        // comportement base vs social
  position?: PositionOptions;                // enableHighAccuracy, timeout, maximumAge
}
```

**Règles d'implémentation :**

- **Permission et contexte** : refus immédiat `INSECURE_CONTEXT` hors HTTPS (le navigateur l'exigerait de toute façon) ; `getGeolocationPermission()` permet à l'UI d'afficher « autorisation refusée » sans redemander.
- **Timeout** : celui du GPS (`PositionOptions.timeout`) et celui du réseau (`AbortSignal.timeout` combiné au `signal` utilisateur).
- **Politique d'usage Nominatim** (usage policy OSMF) :
  - **1 requête par seconde maximum** : file d'attente interne sérialisée (`createRateLimiter(1000)`) ;
  - **cache** LRU en mémoire (50 entrées) indexé sur les coordonnées arrondies (5 décimales en `street`, 2 en `city`) + `zoom` + `language` ;
  - **identification** : depuis un navigateur, l'en-tête `User-Agent` **ne peut pas être fixé** (Chrome l'ignore, et c'est un en-tête non « CORS-safelisted » qui déclencherait un preflight) : la base l'envoie aujourd'hui pour rien. L'identification passe par le `Referer` (envoyé automatiquement) et le paramètre `email`. Côté serveur (Node/SSR), `User-Agent` est fixé (`appName/version (contact)`) ;
  - attribution « © OpenStreetMap contributors » à afficher par l'UI (`licence` exposée) ;
  - HTTP 429/403 → `RATE_LIMITED` ; `{ error: … }` dans un 200 → `GEOCODING_EMPTY`.
- **Confidentialité** : `precision: 'city'` met `latitude`/`longitude`/`street` à `null` **dans le résultat** et envoie `zoom=10` (Nominatim ne renvoie pas la rue).
- **Zéro dépendance UI** : pas de libellé React, pas d'état. Messages FR exportés et surchargeables.
- **Tests** : `fetcher` et `navigator.geolocation` injectables (vitest + jsdom).

### 2.3 Consommation depuis React et intérêt d'un micro-hook

Usage direct, sans core-react :

```ts
import { locate, GeolocationError } from 'core-ts';
try {
  const location = await locate({ precision: 'city', language: 'fr' });
  setLabel(location.name);
} catch (error) {
  if (error instanceof GeolocationError && error.code === 'PERMISSION_DENIED') { /* … */ }
}
```

**Micro-hook : recommandé mais minimal.** Les deux apps consomment déjà une API de hook identique (`status`, `errorMessage`, `requestLocation`, `clearLocation`), et l'appel async dans un composant demande de gérer l'unmount (requête en vol) et l'état `loading`. Un hook générique `useAsyncAction` fait l'essentiel ; `useGeolocation` n'en est qu'une spécialisation de ~25 lignes :

```ts
export const useGeolocation = (options?: LocateOptions & { initial?: ResolvedLocation | null }) => {
  // status: 'idle' | 'loading' | 'success' | 'error' ; location ; error: GeolocationError | null ; errorMessage
  // requestLocation() (abort de la précédente) ; clearLocation() ; abort à l'unmount
};
```

Les adaptations propres à chaque app (forme `EntryLocation` pour la base, `label` pour le social) restent dans leurs **fichiers proxies** (Partie 5).

---

## Partie 3 : Audit croisé des hooks

### 3.1 Inventaire

| Hook | Base | Social | Statut | Cible |
|---|---|---|---|---|
| `useAuth` | `hooks/useAuth.ts` (vue dérivée d'un store zustand) | `features/auth/AuthProvider.tsx` (Context) | **Divergent** | `core-react` `createAuth()` |
| `useRequireAuth` | — (garde via `router/protectedRoute.tsx`) | `AuthProvider.tsx` | Social seul | `core-react` |
| `useTheme` (+ `useThemeStore`, `resolveMode`) | `hooks/useTheme.ts` | `hooks/useTheme.ts` + `themeScript.ts` | **Quasi identiques** | `core-react` `createThemeStore()` |
| `useClipboard` | `hooks/useClipboard.tsx` | — | Base seule | `core-react` |
| `useActionTimer` | `hooks/useActionTimer.ts` (testé) | — | Base seule | `core-react` |
| `useToggle` | `hooks/useToggle.ts` | — | Base seule | `core-react` |
| `useGeolocation` | `hooks/useGeoLocation.tsx` | `features/posts/useGeolocation.ts` | **Divergent** | core-ts `geo` + `core-react` |
| `useMarkdownEditor` | — | `hooks/useMarkdownEditor.ts` | Social seul | core-ts + `core-react` |
| `useToast` | `ui/components/Feedback/Toast/useToast.tsx` (non exporté par l'index, **jamais monté**) | idem (exporté, monté dans `providers.tsx`) | Identiques | `core-react/ui` |
| `useJournalAutoLock` | `hooks/useJournalAutoLock.ts` | — | Métier | Reste dans l'app (s'appuie sur `useActionTimer` et un futur `usePageFocus` de core-react) |
| `useCodeTimers` | — | `features/auth/useCodeTimers.ts` | Générique (compte à rebours) | `core-react` `useCountdown` (optionnel) |
| `useLinkPreview` | — | `features/posts/useLinkPreview.ts` | Métier (API `/api/links/preview`) | Reste ; la temporisation devient `useDebouncedValue` (core-react) |

### 3.2 `useAuth` : divergences

| Aspect | Base | Social |
|---|---|---|
| Mécanisme | Store zustand global (`stores/auth.store.ts`) + hook dérivé | `AuthContext` + `<AuthProvider>` (modale « Soft Login Wall » intégrée) |
| Jeton | `localStorage['todo_auth_token']` (clé dupliquée dans 2 fichiers), via `StorageService` | `localStorage['gather_auth_token']` (lazy) + **refresh token cookie HttpOnly** (`/api/auth/refresh`, rotation unique en vol) |
| Session | Décodage du JWT (`isTokenValid` : `exp`) + `GET /account/profile` (`checkSession`) | `GET /api/me` (sans décodage) |
| Rôles | `user.roles: RoleEnum[]` → `isAdmin`, `roleLabel` (`utils/role.ts`) | `user.role` (chaîne unique) |
| Login | Dans les pages (`fetchLogin` + `setAuth`) | `login(username, password)`, `loginWithCode` dans le contexte (+ `router.refresh()`) |
| Logout | Local (`appStorage.remove`) | `POST /api/auth/logout` + `removeToken` + `router.refresh()` |
| Redirections | Composants `ProtectedRoute`/`PublicRoute`/`AdminRoute` (react-router) | `useRequireAuth()` → `/login?next=…` (next/navigation) |
| Extras | `useIsAuth` (alias) | `counters` (polling 20 s si onglet visible), `reloadCounters`, `guard(action, reason)` |
| 401 global | ❌ (signalé dans les specs) | ✅ refresh + rejeu une fois |

**Signature unifiée proposée (`core-react/auth`)** : une fabrique configurée **une fois par app**, qui retourne des hooks typés.

```ts
export const { AuthProvider, useAuth, useRequireAuth, authStore } = createAuth<TUser, TCredentials>({
  storage:   { tokenKey: 'todo_auth_token', type: 'local' },  // ou 'session' | 'cookie' (+ cookieName)
  endpoints: { me: '/account/profile', login: '/auth/login', loginCode: '/auth/login-code/verify',
               logout: undefined, refresh: undefined },        // social : '/api/me', …, logout, refresh
  http:      httpClient,                                       // client core-ts unifié (§5.2)
  session:   { validateToken: 'jwt-exp' | 'server' },          // base : décodage exp ; social : /api/me
  roles:     { getRoles: (u) => u.roles, admin: 'ROLE_ADMIN', labels: ROLE_LABELS },
  redirects: { login: '/login', afterLogin: '/', afterLogout: '/login', nextParam: 'next' },
  navigation: useNavigationAdapter,                            // react-router ou next/navigation (cf. ci-dessous)
  encodeSecret: true,                                          // mot de passe en base64 UTF-8 (SecretDecoder Symfony)
  onAuthenticated?: (user) => void | (() => void),             // social : démarre le polling des compteurs
});

interface AuthState<TUser> {
  user: TUser | null; token: string | null;
  isAuth: boolean; isLoading: boolean;
  roles: string[]; isAdmin: boolean; roleLabel: string; hasRole(role: string): boolean;
  login(credentials: TCredentials): Promise<void>;
  loginWithCode?(username: string, code: string): Promise<void>;
  logout(): Promise<void>;
  reload(): Promise<void>;
  setSession(token: string, user: TUser): void; // ex-`setAuth` de la base
  guard(action: () => void, reason?: string): void;
}
```

- **Moteur** : store externe (`zustand/vanilla` ou `useSyncExternalStore`) **et** `AuthProvider` optionnel. La base continue d'appeler `useAuth()` sans provider ; le social garde `<AuthProvider>` (qui ne fait que l'amorçage et la modale du login wall, injectable : `loginWall={<MonModal/>}`).
- **Navigation agnostique** : `core-react/router` expose deux adaptateurs, `useReactRouterNavigation` (`core-react/react-router`) et `useNextNavigation` (`core-react/next`), avec la même forme `{ push, replace, refresh, pathname }`.
- **Logique pure dans core-ts** (`utils/auth/`) : `decodeJwt`, `isJwtExpired(token, skewSeconds)`, `encodeSecret`, `createTokenStore({ key, type })` (lazy, SSR-safe), `createRefreshQueue()` (rotation single-flight du social).
- Les compteurs du social (`counters`, `reloadCounters`) restent **dans l'app** : ce sont des données métier. Un hook `useCounters()` local, branché sur `onAuthenticated`, les fournit.

**Paramètres de configuration à exposer**

| Paramètre | Base | Social |
|---|---|---|
| `storage.tokenKey` | `todo_auth_token` | `gather_auth_token` |
| `storage.type` | `local` | `local` (+ cookie HttpOnly `BEARER` côté serveur, lu par `lib/api/server.ts`) |
| `endpoints.me` | `/account/profile` (+ base URL `VITE_API_URL`) | `/api/me` |
| `endpoints.login` / `loginCode` | `/auth/login` / `/auth/login-code/verify` | `/api/auth/login` / `/api/auth/login-code/verify` |
| `endpoints.logout` / `refresh` | — / — | `/api/auth/logout` / `/api/auth/refresh` |
| `session.validateToken` | `jwt-exp` | `server` |
| `roles` | `roles[]`, `ROLE_ADMIN`, `ROLE_LABELS` | `role` (unique) |
| `redirects.login` / `nextParam` | `/login` / — | `/login` / `next` |
| `navigation` | react-router | next/navigation |
| `http.baseUrl` | `import.meta.env.VITE_API_URL` | `process.env.NEXT_PUBLIC_API_URL` (vide : proxy `next.config`) |

### 3.3 `useTheme` : divergences

| Aspect | Base | Social | Design System |
|---|---|---|---|
| Stockage | zustand `persist` `ds-app-theme` (v1, migration v0 `{mode}`) | `ds-app-theme` (v1, **sans migration**), `skipHydration` | `localStorage['ds-theme']` |
| Valeurs | `light \| dark \| system` | idem | `auto \| light \| dark` |
| Attributs `<html>` | `data-theme`, `data-ds-theme`, `color-scheme` | idem | **`data-ui-theme`** |
| Initialisation | **au chargement du module** (accède à `document`/`window`) | `initThemeStore()` après hydratation + `themeScript` dans `<head>` (anti-flash) | Script `<head>` + `themeService` |
| Retour | `{ theme (objet styled), mode, preference, isDark, setPreference, setMode, toggleTheme }` | idem **sans `theme`** (thème unique par variables CSS) | `getState()`, `subscribe()`, `ds:theme-change` |
| Multi-onglets | ❌ | ❌ | ✅ (événement `storage`) |

**Signature unifiée** : `core-ts/utils/theme` (pur : `resolveMode`, `readThemePreference(key, legacyKeys)`, `applyThemeToDocument(mode, attributes)`, `getThemeInitScript(config)` → chaîne, `watchSystemMode(cb)`), et `core-react/theme` :

```ts
export const { useTheme, useThemeStore, initThemeStore, ThemeScript } = createThemeStore({
  storageKey: 'ds-app-theme',
  legacyKeys: ['ds-theme'],                              // lit l'ancienne clé du DS si présente
  attributes: ['data-theme', 'data-ds-theme', 'data-ui-theme'], // les trois tant que la transition dure
  defaultPreference: 'system',                           // 'auto' accepté comme alias
  syncTabs: true,
  themes: { light: lightTheme, dark: darkTheme },        // optionnel : fournit `theme` (compatibilité base)
});
```

- `ThemeScript` (composant serveur) = `themeScript` du social, généré depuis la même config : plus de clé dupliquée.
- `initThemeStore()` reste **explicite** (appelé dans un `useEffect` du provider) : aucun accès DOM à l'import.

### 3.4 Hooks génériques à promouvoir tels quels

`useActionTimer` (avec son test), `useToggle`, `useClipboard` (§1.3.5), `useToast`, et de nouveaux utilitaires sans risque : `useDebouncedValue`, `useCountdown` (ex-`useCodeTimers`), `usePageFocus` (extrait de `useJournalAutoLock`), `useMediaQuery(breakpoint)` (sur `BREAKPOINTS` de core-ts), `useIsClient`.

---

## Partie 4 : Audit croisé de l'UI Kit

Les deux apps partagent **la même arborescence** `ui/components/{Base,Content,Editor,Embed,Feedback,Forms,Grid,Navigation,Typo}`, issue d'un ancêtre commun (styled-components). Diff réalisé fichier par fichier (`diff -w`).

### 4.1 Composants extractibles immédiatement

Différence limitée à la directive `'use client'` (2 lignes de diff) ou ≤ 4 lignes :

| Famille | Composants |
|---|---|
| Content | `Accordion` (+ `AccordionContent`, `AccordionContext`, `AccordionItem`, `AccordionItemContext`, `AccordionTrigger`), `CardBody`, `CardFooter`, `CardHeader`, `CardTitle`, `EmptyState`, `TBody`, `TFoot`, `Thead`, `StatCard` (6) |
| Embed | `Carousel` (+ `CarouselIndicator`, `CarouselItem`, `CarouselSlide`) |
| Feedback | `Alert`, `Drawer` (+ `DrawerSubcomponents`), `Loading`, `Modal` (+ `ModalBody`, `ModalFooter`, `ModalHeader`), `Dialog`, `ConfirmDialog` (14, mineur), `Progress`, `Toast`, `ToastContainer`, `useToast`, `Tooltip` |
| Forms | `Checkbox`, `Radio`, `Toggle`, `InputGroup`, `CheckField`, `ToggleField` |
| Navigation | `Breadcrumb` (+ `BreadcrumbContainer`), `Dropdown` (+ `DropdownContext`, `DropdownItem`, `DropdownMenu`), `Navbar` (+ `NavbarBrand`, `NavbarCollapse`, `NavbarContext`, `NavbarDropdownContext`, `NavbarItem`, `NavbarNav`, `NavbarToggle`), `Pagination` (+ 4 sous-composants), `Sidebar` (+ `SidebarContext`, `SidebarFooter`, `SidebarHeader`, `SidebarItem`, `SidebarNav`, `SidebarSection`, `SidebarToggle`), `Tabs` (+ `TabContent`, `TabList`, `TabsContext`, `TabTrigger`), `ThemeModeSwitcher` |
| Base | `SegmentedControl` |

### 4.2 Composants divergents et fusion proposée

**Divergence n°1, systémique : props transitoires.** Le social a migré vers les props transitoires styled-components (`$variant`), qui ne fuient pas dans le DOM (pas d'avertissement React `unknown prop`). La base utilise des props simples, avec quelques `shouldForwardProp`. Composants concernés et props renommées :

| Composant | Props (base → social) |
|---|---|
| `Badge` | `variant, pill, color` → `$variant, $pill, $color` |
| `Button` | `variant, size, fullWidth, loading` → `$…` |
| `Divider` | `orientation, margin` → `$…` |
| `Card` | `bordered, elevation` → `$…` |
| `ListGroup` / `ListGroupItem` | `flush` / `action, active` → `$…` |
| `Table` / `TRow` / `table.types` | `bordered, dense, hoverable, striped` / `selected` / `align, width` → `$…` |
| `Figure`, `Gallery`, `GalleryItem`, `Image` | `align, position` ; `columns, gap, minColumnWidth, rule` ; `hoverZoom, radius` ; `aspectRatio, fit, fluid, radius, thumbnail` → `$…` |
| `Skeleton` | `variant, width, height` → `$…` |
| `HelperText`, `Label`, `form.types` | `state`, `required`, `validationState` → `$…` |
| `Grid/*` | `Col` (`span, sm…xl, offset`), `Columns`, `Container` (`fluid`), `Flex`, `Grid`, `Row` (`gutter`) → `$…` |
| `NavbarLink` | `active` → `$active` |
| `Typo` | `Display` (`level`), `Text` (`size, weight`), `typo.types` (`align, color`) → `$…` |

**Fusion** : `core-react` adopte **les props `$` (convention du social)** comme API canonique. La compatibilité de la base passe par un HOC de `core-react/compat`, utilisé **dans ses fichiers proxies** :

```ts
// core-react/compat/legacyProps.tsx
export const withLegacyProps = <P extends object>(Component: React.ComponentType<P>, map: Record<string, `$${string}`>) =>
  (props: Record<string, unknown>) => {
    const next: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) next[map[key] ?? key] = value;
    return <Component {...(next as P)} />;
  };
```

**Divergence n°2 : liens et routeur.** `Button` (prop `href` → `NextLink`), `Link`, `NavbarLink`, `SidebarLink`, `NavbarDropdown`, `BackButton` importent `next/link` dans le social, et utilisent `<a>`/`navigate` dans la base. **Fusion** : `<UIProvider linkComponent={NextLink | RouterLink}>` dans core-react ; les composants lisent le composant de lien dans le contexte (défaut `'a'`). Plus aucun import de `next/*` dans `core-react/ui` : le kit reste utilisable avec Vite.

**Autres divergences**

| Composant | Écart | Fusion |
|---|---|---|
| `Button` | Base : hauteurs fixes 28/36/44 px, `radius.base` (0.5rem) ; social : padding seul, `radius.sm`, `href`. Variantes plates (`primary, secondary, tertiary, danger, ghost, outline`) dans les deux. | Hauteurs DS (32/40/48), matrice **rôle × style** (`$color` × `$variant: 'solid' \| 'soft' \| 'outline' \| 'ghost'`), alias de compatibilité : `$variant='danger'` → `solid` + `danger`, `'outline'` → `outline` + `primary`, `'ghost'` → `ghost` + `secondary`. `href` via `UIProvider`. |
| `Icon` | Base : police d'icônes (`<i class="mdi …">`, `iconSet: mdi \| bx…`) ; social : `lucide-react` + table de correspondance nom → composant, **qui reprend déjà les noms MDI de la base** (`cog-outline`, `trash-can-outline`, `white-balance-sunny`…). | `Icon` SVG natif de core-react (§4.3), **avec la même table de noms** : les appels `<Icon name="…">` des deux apps restent valides. |
| `FileDropzone` | Social corrige le double `click()` (`stopPropagation`) et la re-sélection du même fichier ; `HelperText $state`. | Version sociale → `<FileUploader>` (§1.3.4). |
| `Input` (25 l.), `Textarea` (20), `TextField`/`TextareaField`/`ChoiceField` (10), `Select`, `Label`, `HelperText`, `TagInput` (9) | Props `$`, petites retouches de style. | Version sociale + hauteurs/bordures DS (§4 bis). |
| `Avatar` (34), `Link` (38), `Image` (38), `Skeleton` (24), `Text` (24) | Props `$`, liens Next. | Idem. |
| `Editor/*` (blocs) | Social **beaucoup plus riche** : `Code`, `Cta`, `Faq`, `Gallery`, `Quote`, `Table`, `Text` blocks, `MediaSourceField`, `blockDefaults`, `blockItemId`. | Version sociale → `core-react/editor` (sous-paquet optionnel, lourd). |
| `Toast/index.ts` | Base n'exporte pas `useToast`. | Export complet. |
| Thème | Base : `lightTheme`/`darkTheme` choisis par `useTheme().theme`. Social : **`appTheme` unique dont les couleurs sont des `var(--gather-*)`** (HTML serveur identique dans les deux modes), `StyledComponentsRegistry`, `palettes.ts` (identité Gather : peach, mint, rose). | Approche du social généralisée, mais sur les **variables `--ds-*` du DS** (§4 bis). |

**Uniquement dans le social** : `Content/MarkdownContent` → `MarkdownViewer` ; `Forms/MarkdownEditor` → `MarkdownEditor` ; `Social/*` (`AvatarPill`, `CommunityCard`, `LinkPreviewCard`, `PostMediaGrid` : métier, restent dans l'app ; `Pill` → variante `Badge $pill`) ; `ui/components/index.ts` (barrel, à reproduire) ; `stories/` (Storybook à déplacer dans core-react).

### 4.3 Règles impératives

| Règle | Base | Social | Design System | core-ts | Verdict |
|---|---|---|---|---|---|
| **Pas de BEM** | ✅ aucun `__`/`--` (styled-components, pas de classes nommées) | ✅ (seuls les fichiers Storybook de démo, à supprimer) | ⚠️ une exception documentée : `.md-editor--compact` (`forms/_md-editor.scss:39`). **`SKILL.md` se contredit** : « Pièges à éviter » recommande « des classes BEM plates » (l. 471) alors que §1.4 interdit le BEM. | — | Renommer en `.md-editor-compact` (en gardant l'ancien sélecteur comme alias déprécié) et corriger la ligne 471 de `SKILL.md`. |
| **SVG natifs uniquement** | ❌ `public/assets/ds-icons.css` (police), `<i class="mdi …">` | ❌ `lucide-react` (`Base/Icon.tsx`) | ❌ Remix Icon, MDI, Boxicons, Line Awesome (`ds-icons.css`) | ❌ `mapFileIcon` (`ri-*`), `copyWithButtonFeedback` (`ds ds-tick`) | **Chantier transverse**, voir ci-dessous |

**Plan « SVG natifs »** :

1. `core-react/icons` : un fichier par icône, `export const IconTrash = createIcon('trash', <path d="…"/>)`, rendu `<svg viewBox="0 0 24 24" width height fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden focusable="false">`. Taille par défaut `1.25rem` (`--ds-icon-size-md`), couleur `currentColor`. Pas de dépendance npm d'icônes : les tracés sont **copiés** dans le dépôt (si on reprend des tracés Lucide, licence ISC : conserver la notice dans `icons/LICENSE`).
2. `<Icon name="…" />` conservé avec **la table de noms du social** (noms MDI + lucide) : aucune page à modifier. Registre extensible : `registerIcons({ 'mon-icone': IconX })`.
3. DS : sprite `public/icons/ds-icons.svg` généré depuis **les mêmes tracés** (`<svg><use href="#trash"/></svg>`) et macro Twig `{{ icon('trash') }}`. Parité visuelle entre les deux stacks.
4. core-ts : `getFileKind(filename)` (neutre) à côté de `mapFileIcon` (conservé, déprécié).

---

## Partie 4 bis : Design System, tokens partagés et direction artistique

### 4b.1 État des lieux

Le DS (`sf-p05-design-system`) est la référence : tokens à 3 niveaux (`_primitives.scss` → System Tokens `--ds-*` dans `_tokens.scss` → Component Tokens par composant), rôles M3 (`primary`, `on-primary`, `primary-container`, `on-primary-container`), surfaces en élévation tonale, *state layers* par `color-mix`, motion `effects`/`spatial`, focus ring `2px` décalé de `2px`, densité et rayons inspirés de Flowbite/Tailwind. Son en-tête l'indique : les primitives viennent **des tokens TS du back-office** (`colors.ts`, `spacing.ts`…), c'est-à-dire de l'ancêtre des thèmes des apps. Les trois implémentations ont depuis divergé :

| Token | Design System (`--ds-*`) | Base (`ui/theme/tokens`) | Social | Écart |
|---|---|---|---|---|
| **Espacement** | linéaire n × 0.25rem : `5`=1.25, `6`=1.5, `8`=2, `10`=2.5, `12`=3, `16`=4, `20`=5, `24`=6 rem | **non linéaire** : `5`=1.5, `6`=2, `7`=3, `8`=4, `9`=5, `10`=6 rem | idem base | 🔴 mêmes clés, valeurs différentes à partir de `5` |
| **Rayons** | `xs` .25 · `sm` .5 · `md` **.75** (base) · `lg` 1 · `xl` 1.75 · `full` | `sm` .375 · `base` **.5** · `lg` .75 · `xl` 1 · `2xl` 1.5 · `pill` | `sm` .5 · `md`/`base` **.75** · `lg` 1 · `xl` 1.25 · `2xl` 1.5 · `3xl` 1.75 · `pill` | 🟠 social ≈ DS ; base décalée d'un cran |
| **Rôles couleur (forme)** | `color`, `on-color`, `container`, `on-container` | `base`, `hover`, `subtle`, `dark`, `emphasis` | idem base | 🟠 forme différente |
| **Rôles couleur (palettes)** | primary indigo · secondary neutral · tertiary slate · success green · warning amber · info blue · error red | identique au DS | **identité Gather** : tertiary peach · success mint · danger rose · info = indigo | ✅ base/DS ; social = surcharge de marque légitime |
| **Tons clairs** | base 600 (success/warning **700** pour 4.5:1), container 100 (secondary/tertiary 200), on-container 900 | base 600 (success green-600 : **3.3:1 sous du blanc**, défaut d'accessibilité relevé par le DS) | base 600 | 🟠 |
| **Surfaces** | `surface` slate-50 → `container-highest` slate-200 ; texte slate-900 / variant slate-600 | page neutral-50, carte **blanche**, texte slate-800 / muted slate-500 | page neutral-50, carte **blanche**, texte neutral-700 / 500 | 🟠 le DS n'a pas de surface blanche (`container-lowest`) |
| **Bordures** | `outline` slate-500 (fonctionnelle, 3:1), `outline-variant` slate-300 (décorative) | `default` slate-200, `strong` slate-500 | `default` neutral-100, `hover` 200, `strong` 500 | 🟠 nommage |
| **Ombres** | `xs`, `sm`, `md`, `lg`, `inset` en `color-mix(--ds-color-shadow)` | `sm`, `base`, `md`, `lg`, `inset` en `rgba` | `+ soft`, `card`, `focusRing` | 🟡 |
| **Focus** | `outline: 2px solid primary; outline-offset: 2px` | `focusRing` 3px (olive-400 en sombre !) | 3px indigo-600 / indigo-300 + `shadows.focusRing` | 🟠 |
| **Hauteurs de contrôle** | 32 / 40 / 48 / 56 px | Button 28 / 36 / 44 px | non fixées (padding) | 🟠 |
| **Typographie** | Inter + Fira Code ; échelle M3 `display/headline/title/body/label` × `lg/md/sm` | Inter ; `xs…3xl` (Tailwind) | idem, `var(--font-inter)` (next/font) | 🟡 deux échelles à relier |
| **Motion** | `--ds-ease-{effects,spatial,spring}`, `--ds-duration-*` ; `transition: all` interdit | `transition: all 0.15s ease` ×8 | idem ×8 | 🟠 |
| **Thème** | `[data-ui-theme='dark']`, clé `ds-theme`, `auto` | `data-theme` + `data-ds-theme`, clé `ds-app-theme`, `system` | idem base (+ variables `--gather-*`) | 🔴 trois attributs, deux clés |
| **Breakpoints** | 576 / 768 / 992 / 1200 / 1400 | identiques (`BreakPointType` de core-ts) | identiques | ✅ |
| **z-index** | `dropdown` 1000 … `toast` 1060 | valeurs en dur | valeurs en dur | 🟡 |

### 4b.2 Architecture des tokens partagés (parité 100 %)

**Principe : une source unique en TypeScript, deux sorties générées, un seul jeu de variables CSS consommé par les deux stacks.**

```
core-ts/src/design-tokens/            ← SOURCE UNIQUE (données pures, agnostiques)
  palettes.ts      (indigo, neutral, slate, green, amber, blue, red, olive, taupe + peach, mint, rose)
  scales.ts        (spacing, radii, borderWidths, controlHeights, iconSizes, layoutSizes, containerWidths, zIndex)
  typography.ts    (fontFamilies, fontWeights, typeScale M3, lineHeights)
  motion.ts        (easings, durations, stateLayers)
  roles.ts         (colorRoles → palette, roleTones light/dark, overrides)
  build.ts         buildCssVariables(brand?): { light: Record<string,string>, dark: Record<string,string> }
                   buildScssPrimitives(): string   → génère sf-p05-design-system/assets/scss/abstracts/_primitives.scss
                   BREAKPOINTS (déjà présent)

core-react/theme/
  tokens.css        ← généré : :root{--ds-*} + [data-ui-theme='dark'], :root[data-theme='dark']{…}
  createAppTheme()  ← thème styled-components dont TOUTES les valeurs sont des var(--ds-*)
  GlobalStyle       ← injecte tokens.css (ou import CSS direct côté Next/Vite)
```

- **Parité garantie par construction** : le SCSS du DS et les composants styled-components lisent **les mêmes variables CSS** (`--ds-color-primary`, `--ds-space-4`, `--ds-radius-md`…), générées depuis les mêmes données. Une retouche de palette se propage aux deux stacks via un `npm run tokens` (script dans core-ts).
- **Thème styled-components = références de variables**, sur le modèle de l'`appTheme` du social :

```ts
export const appTheme = {
  colors: {
    primary: { base: 'var(--ds-color-primary)', on: 'var(--ds-color-on-primary)',
               container: 'var(--ds-color-primary-container)', onContainer: 'var(--ds-color-on-primary-container)',
               // alias de compatibilité avec l'ancienne forme des apps
               subtle: 'var(--ds-color-primary-container)', dark: 'var(--ds-color-on-primary-container)',
               emphasis: 'var(--ds-color-on-primary-container)',
               hover: 'color-mix(in srgb, var(--ds-color-primary), var(--ds-color-on-primary) 8%)' },
    /* secondary, tertiary, success, warning, info, danger (= error) … */
    text:       { heading: 'var(--ds-color-on-surface)', body: 'var(--ds-color-on-surface)', muted: 'var(--ds-color-on-surface-variant)' },
    background: { body: 'var(--ds-surface)', surface: 'var(--ds-surface-container-lowest)',
                  surfaceHover: 'var(--ds-surface-container-low)', surfaceActive: 'var(--ds-surface-container)' },
    border:     { default: 'var(--ds-color-outline-variant)', hover: 'var(--ds-color-outline)', strong: 'var(--ds-color-outline)' },
  },
  spacing:  { 0: 'var(--ds-space-0)', 0.5: 'var(--ds-space-0_5)', 1: 'var(--ds-space-1)', /* … linéaire, comme le DS */ },
  radii:    { none, xs, sm, md, lg, xl, full, base: 'var(--ds-radius-md)', pill: 'var(--ds-radius-full)' },
  shadows:  { xs, sm, md, lg, inset, soft: 'var(--ds-shadow-sm)', card: 'var(--ds-shadow-sm)', base: 'var(--ds-shadow-md)' },
  typography: { roles: { 'body-md': 'var(--ds-text-body-md)', … }, sizes: { xs: 'var(--ds-text-body-sm)', sm: 'var(--ds-text-body-md)', base: 'var(--ds-text-body-lg)', … } },
  motion: { effects: 'var(--ds-duration-effects) var(--ds-ease-effects)', spatial: '…' },
  controlHeights: { sm, md, lg, xl }, zIndex: { … }, breakpoints: BREAKPOINTS, media,
};
```

- **Marques** : `createAppTheme({ roles: { tertiary: 'peach', success: 'mint', error: 'rose', info: 'indigo' } })` génère un bloc de surcharge `--ds-color-*` (même mécanisme que `$color-roles` côté SCSS et que la §5.3 du guide du DS). L'identité Gather est conservée sans fork du kit.
- **Attribut de thème** : sélecteur commun `[data-ui-theme='dark'], [data-theme='dark']` pendant la transition ; à terme `data-ui-theme` seul (attribut du DS). La clé de stockage reste `ds-app-theme` dans les apps (rien à migrer) ; le DS lit `ds-theme` (aucune collision).

**Nouveaux tokens à ajouter au DS** (manquants pour le rendu Tailwind et pour les apps) :

| Token | Valeur claire / sombre | Raison |
|---|---|---|
| `--ds-surface-container-lowest` | `#fff` / slate-900 | Cartes blanches sur fond gris (signature Tailwind UI et des deux apps) |
| `--ds-color-ring` | `color-mix(in srgb, var(--ds-color-on-surface) 8%, transparent)` / `color-mix(in srgb, #fff 10%, transparent)` | Liseré 1px des cartes et menus (`ring-1 ring-gray-900/5`) |
| `--ds-shadow-xs` | déjà présent | — |
| `--ds-backdrop` | `color-mix(in srgb, var(--ds-color-scrim) 50%, transparent)` + `--ds-backdrop-blur: 4px` | Voile de modale |

**Migration de l'espacement (point le plus délicat)** : passer à l'échelle linéaire du DS change le rendu des apps. Plan sans casse :

1. Les proxies de thème des apps exportent temporairement `spacing: LEGACY_SPACING` (anciennes valeurs, mais **exprimées en `var(--ds-space-*)`** : `5 → var(--ds-space-6)`, `6 → var(--ds-space-8)`, `7 → var(--ds-space-12)`, `8 → var(--ds-space-16)`, `9 → var(--ds-space-20)`, `10 → var(--ds-space-24)`).
2. Les composants de **core-react** utilisent l'échelle linéaire du DS.
3. Plus tard (optionnel), un codemod `theme.spacing[5]` → `[6]`, etc., puis suppression de `LEGACY_SPACING`.

### 4b.3 Direction artistique : « Tailwind-like + identité perso »

**À conserver (identité)** : palettes indigo / neutral teinté indigo (et peach/mint/rose pour Gather), composants **flat** (profondeur portée par les surfaces, peu d'ombres), **badges et pills** colorés, rayon de base généreux (`0.75rem`), Inter.

**Apports Tailwind UI** : blancs plus francs (cartes `#fff` sur fond `neutral-50`), liserés 1px très légers plutôt que des bordures pleines, contrastes nets en sombre (liseré blanc translucide), focus `ring-2` net décalé, micro-transitions 150 ms sur des propriétés ciblées, densité régulière (multiples de 4/8px).

Ajustements précis par composant (applicables à l'identique en SCSS et en styled-components, en ne lisant que des `--ds-*`) :

| Composant | Ajustements |
|---|---|
| **Global** | Remplacer les 16 `transition: all 0.15s ease` par `transition: background-color, color, border-color, box-shadow var(--ds-duration-effects) var(--ds-ease-effects)` ; `transform` en `--ds-ease-spatial` 250 ms ; tout désactiver sous `prefers-reduced-motion`. `-webkit-font-smoothing: antialiased`. Texte courant `body-md` (14px) dans l'UI applicative, `body-lg` (16px) pour la lecture (`MarkdownViewer`, articles). |
| **Focus** | Uniformiser sur le DS : `outline: var(--ds-focus-ring-width) solid var(--ds-focus-ring-color); outline-offset: var(--ds-focus-ring-offset)` sur `:focus-visible` uniquement. Supprimer le `focusRing` 3px en `box-shadow` et le focus olive de la base en sombre. |
| **Button** | Hauteurs 32/40/48 (`--ds-control-height-*`), `padding-inline` 12/20/24px, rayon `md` (`sm` pour `-sm`), `label-lg` 600, `gap` 8px. Solid : fond rôle, `--ds-shadow-xs`, hover *state layer* 8 %, active 12 %. **Soft** (nouveau dans les apps) : `container`/`on-container`. Outline : fond `surface-container-lowest`, `box-shadow: inset 0 0 0 1px var(--ds-color-outline-variant)` (rendu Tailwind `ring-1 ring-inset`), hover `surface-container-low`. Ghost : transparent, hover 8 %. Disabled : `disabled-container`/`disabled-content`. `loading` : spinner SVG, largeur conservée. |
| **Input / Textarea / Select** | Hauteur 40px, rayon `md`, fond `surface-container-lowest`, `inset 0 0 0 1px var(--ds-color-outline)` (contraste 3:1 conservé), `--ds-shadow-xs`. Focus : `inset 0 0 0 2px var(--ds-color-primary)` (sans halo flou). Invalide : liseré `error` + `HelperText` `body-sm` en `error`. Placeholder `on-surface-variant`. |
| **Card** | Fond `surface-container-lowest`, `box-shadow: var(--ds-shadow-sm), 0 0 0 1px var(--ds-color-ring)`, **pas de bordure pleine**, rayon `md`, padding 24px (16px sous `sm`). Header/footer séparés par `1px outline-variant`, footer sur `surface-container-low`. Survol (carte cliquable) : `--ds-shadow-md` + `translateY(-1px)` (spatial). |
| **Badge** | Identité conservée. Défaut **soft** : `container` + `on-container`, `inset 0 0 0 1px color-mix(in srgb, var(--ds-color-{rôle}) 20%, transparent)` (signature Tailwind), `label-md` 600, hauteur 22px, `padding-inline` 8px, rayon `xs` ; `$pill` → `full`. Solid pour les compteurs. Majuscules réservées aux sur-titres (`letter-spacing-caps`). |
| **Chip / Selectable card** | Chip : 32px, rayon `sm`, soft au repos, solid sélectionné (`aria-pressed`), coche SVG animée (spring). Carte : `inset 0 0 0 2px outline-variant` au repos, sélectionnée `primary-container` + anneau `primary` + coche ; survol `surface-container-low`. |
| **Modal / Drawer** | Panneau `surface-container-lowest`, rayon `lg` (16px), `--ds-shadow-lg` + liseré `ring` ; voile `--ds-backdrop` + `backdrop-filter: blur(4px)` ; entrée `opacity` + `scale(.96 → 1)` en 250 ms spatial ; header 20px `title-lg`, footer aligné à droite sur `surface-container-low`. |
| **Dropdown / menus / Tooltip** | `surface-container-lowest`, rayon `md`, `--ds-shadow-md` + liseré `ring`, padding 4px, items 36px rayon `xs`, survol `surface-container`. Tooltip : `inverse-surface`, `label-md`, rayon `sm`. |
| **Navbar / Sidebar** | Fond `surface-container-lowest` + séparateur `1px outline-variant` (plus d'ombre) ; lien actif : `primary-container` + texte `on-primary-container` + rayon `sm` ; icônes 20px `on-surface-variant` → `primary` si actif. |
| **Table** | En-tête `surface-container-low`, `label-lg` 600 (pas de majuscules), lignes séparées par `1px outline-variant`, survol `state-stripe` (4 %), cellules 12/16px, conteneur rayon `md` + liseré `ring`. |
| **Alert / Toast** | Soft par défaut (`container` + `on-container`), anneau `inset 0 0 0 1px` du rôle à 20 %, icône SVG du rôle, titre `title-sm` + texte `body-md`, rayon `md`. Toast : `surface-container-lowest`, `shadow-lg` + liseré `ring`, rayon `md`. |
| **Avatar** | Rayon `full`, anneau `2px surface` dans les piles (`avatar-stack`), initiales `label-lg` sur `primary-container`. |
| **Mode sombre** | Surfaces slate-950/900/800, cartes `slate-900` + liseré `color-mix(white 10%)` (au lieu des ombres invisibles), texte `slate-100`/`slate-400`, rôles en ton 300 (déjà dans le DS) ; vérifier 4.5:1 sur `on-*-container`. |

---

## Partie 5 : Plan de rétrocompatibilité « Zéro casse / Flemme-friendly »

### 5.1 Principes

1. **Aucun import de page ne change** : chaque fichier actuel des apps devient un **proxy** (passe-plat) qui réexporte `core-react`/`core-ts` **avec la configuration de l'app** et les **mêmes noms et signatures**.
2. Les proxies conservent les noms historiques (`useIsAuth`, `setMode`, `hasCopied`, `appStorage`, `toApiError`…) et les types.
3. Les comportements sûrs par défaut (Markdown nettoyé) s'appliquent sans modification.
4. Contrôle à chaque étape : `tsc --noEmit`, `npm test`, `npm run build`, recette visuelle, et `grep` des imports non résolus.

### 5.2 Prérequis côté bibliothèques

- **core-ts (patch 1.0.x, sans rupture)** : exports `CookieHelper`/`DragNDrop` ; `convertMarkdownToHtml` sûr ; `StorageService` SSR-safe ; `resolveElement` et signatures élargies.
- **core-ts (minor 1.1)** : modules `geo`, `auth` (`decodeJwt`, `encodeSecret`, `createTokenStore`, `createRefreshQueue`), `markdown-editor`, `selection-model`, `file/validation`, `theme`, `design-tokens`, et **client HTTP unifié** au contrat déjà partagé par les deux apps :
  ```ts
  export const createHttpClient = (config: {
    baseUrl?: string;
    getToken?: () => string | null;          // Authorization: Bearer <token>
    tokenOrigins?: 'same-origin' | string[]; // n'envoie le jeton qu'à ces origines (corrige §0 n°6)
    onUnauthorized?: (retry) => Promise<boolean>; // refresh du social
  }) => { fetchAPI /* surcharges JsonResponse | TextResponse | BlobResponse */, api: { get, post, patch, put, delete, upload } };
  export class ApiRequestError extends Error { status; violations; code; } // + toApiError(res|data, fallback, status?)
  ```
  L'ancien `fetchAPI` de core-ts (`FetchResponse`, `X-AUTH-TOKEN`) **reste exporté tel quel** (utilisé par le DS/Twig).
- **core-react 0.1** (nouveau dépôt) : `tsup` ESM+CJS, `'use client'` conservé par fichier (`preserveModules`, ou bannière sur les seuls points d'entrée client), `sideEffects: false`, peer deps `react >= 19`, `react-dom`, `styled-components >= 6`, `core-ts`. Sous-chemins : `core-react` (hooks), `core-react/ui`, `core-react/theme`, `core-react/icons`, `core-react/editor`, `core-react/auth`, `core-react/next` (`StyledComponentsRegistry`, `useNextNavigation`, `ThemeScript`), `core-react/react-router`, `core-react/compat`. Installation identique à core-ts : `"core-react": "git+https://github.com/fagathe-dev/core-react.git#master"` (ou `npm link`/workspace pendant le développement).

### 5.3 Tableau de correspondance

#### `BASE_APP_PATH` (`sf-react-p01-base-app/frontend/src`)

| Ancien chemin | Nouvelle cible | Type de proxy |
|---|---|---|
| `hooks/useClipboard.tsx` | `core-react` → `useClipboard` | Réexport + alias `hasCopied`, option `feedbackDuration` |
| `hooks/useActionTimer.ts` (+ test) | `core-react` → `useActionTimer` | Réexport (le test migre dans core-react) |
| `hooks/useToggle.ts` | `core-react` → `useToggle` | Réexport |
| `hooks/useTheme.ts` | `core-react/theme` → `createThemeStore` | Configuré (`ds-app-theme`, migration v0, `themes` pour retourner `theme`) |
| `hooks/useAuth.ts` + `stores/auth.store.ts` | `core-react/auth` → `createAuth` | Configuré ; `useAuthStore` réexporté (`setAuth` = `setSession`, `checkSession` = `reload`) |
| `hooks/useGeoLocation.tsx` | core-ts `geo` + `core-react` → `useGeolocation` | Adaptateur → `EntryLocation`, `precision: 'street'`, `fallback: 'coordinates'` |
| `hooks/useJournalAutoLock.ts` | reste (métier) | Importe `useActionTimer`/`usePageFocus` depuis core-react |
| `services/fetchAPI.ts` | core-ts → `createHttpClient` | Configuré (`VITE_API_URL`, `getToken`) |
| `services/apiError.ts` | core-ts → `ApiRequestError`, `toApiError` | Sous-classe avec l'ordre d'arguments historique `(message, status, violations, code)` |
| `services/storage.service.ts` | core-ts → `StorageService` | Inchangé (déjà un passe-plat) |
| `services/*.api.ts` | restent (métier) | Aucun changement (consomment `fetchAPI` proxy) |
| `utils/jwt.ts` | core-ts → `decodeJwt`, `isJwtValid` | Réexport (`decodeToken`, `isTokenValid` en alias) |
| `utils/secret.ts` | core-ts → `encodeSecret` | Réexport |
| `utils/string.ts` (`truncateWords`) | core-ts → `truncateWords(text, max, empty)` | Partiel (texte par défaut « Note sans texte… » passé en paramètre) |
| `utils/role.ts`, `utils/dueDate.resolver.ts` | restent (métier) | — |
| `ui/components/**/index.ts` | `core-react/ui` | Réexport ; composants à props renommées enveloppés par `withLegacyProps` |
| `ui/components/Base/Icon.tsx` | `core-react/icons` → `Icon` | Réexport (mêmes noms) ; `iconSet` ignoré (déprécié) |
| `ui/components/Forms/FileDropzone/*` | `core-react/ui` → `FileUploader` | Adaptateur (`maxSizeMb` → `maxSize`, `onFilesSelected`) |
| `ui/components/Editor/*` | `core-react/editor` | Réexport (gagne les blocs du social) |
| `ui/theme/**` | `core-react/theme` → `createAppTheme` + `tokens.css` | Configuré (`LEGACY_SPACING` transitoire) |
| `ui/types/**` | `core-react/ui` (types) | Réexport |
| 5 usages `convertMarkdownToHtml` + `dangerouslySetInnerHTML` | core-ts durci | **Aucun changement requis** ; remplacement optionnel par `<MarkdownViewer>` |

#### `SOCIAL_APP_PATH` (`apps/gather_front/src`)

| Ancien chemin | Nouvelle cible | Type de proxy |
|---|---|---|
| `hooks/useTheme.ts`, `hooks/themeScript.ts` | `core-react/theme` | Configuré (même clé `ds-app-theme` ; `initThemeStore`, `themeScript`, `THEME_STORAGE_KEY` réexportés) |
| `hooks/useMarkdownEditor.ts` | `core-react` → `useMarkdownEditor` | Réexport (signature actuelle = sous-ensemble) |
| `features/posts/useGeolocation.ts` | core-ts `geo` + `core-react` | Adaptateur → `label`, `precision: 'city'`, `fallback: 'error'` |
| `features/auth/AuthProvider.tsx` | `core-react/auth` + `core-react/next` | Configuré ; `counters`/`reloadCounters` gardés dans un hook local branché sur `onAuthenticated` ; `loginWall` = la modale actuelle |
| `features/auth/useCodeTimers.ts` | `core-react` → `useCountdown` (optionnel) | Adaptateur (`formatDuration` réexporté) |
| `features/posts/useLinkPreview.ts` | reste (métier) | `useDebouncedValue` de core-react en option |
| `lib/api/fetchAPI.ts`, `apiError.ts`, `storage.service.ts` | core-ts → `createHttpClient`, `ApiRequestError`, `createTokenStore` | Configurés (`NEXT_PUBLIC_API_URL`, `gather_auth_token`) ; `ApiError` garde l'ordre `(message, violations, code, status)` |
| `lib/api/client.ts` | core-ts → `createHttpClient({ onUnauthorized })` + `createRefreshQueue` | Configuré (`api`, `onSessionRefreshed`, `encodeSecret` réexportés) |
| `lib/api/server.ts` | reste (`server-only`) | — |
| `ui/components/Content/MarkdownContent.tsx` | `core-react/ui` → `MarkdownViewer` | `MarkdownContent` = alias, `headingOffset: 2`, `breaks: true` |
| `ui/components/Forms/MarkdownEditor/*` | `core-react/ui` → `MarkdownEditor` | Réexport |
| `ui/components/**` (hors `Social/*`) | `core-react/ui` | Réexport direct (déjà en props `$`) ; liens via `<UIProvider linkComponent={NextLink}>` |
| `ui/components/Base/Icon.tsx` | `core-react/icons` | Réexport ; **retirer `lucide-react`** de `package.json` |
| `ui/components/Social/*` | restent (métier) ; `Pill` → `Badge $pill` | — |
| `ui/theme/**` (dont `palettes.ts`, `StyledComponentsRegistry.tsx`) | `core-react/theme` + `core-react/next` | Configuré (`roles: { tertiary: 'peach', success: 'mint', error: 'rose', info: 'indigo' }`, `LEGACY_SPACING`) |
| `app/providers.tsx`, `app/ThemeScript.tsx` | inchangés | Importent toujours `@/hooks`, `@/ui/theme` (proxies) |

### 5.4 Exemples de proxies

**Hook simple (base)**
```ts
// frontend/src/hooks/useToggle.ts
export { useToggle } from 'core-react';
```

**Hook avec alias de compatibilité (base)**
```ts
// frontend/src/hooks/useClipboard.tsx
import { useClipboard as useCoreClipboard, type UseClipboardOptions as CoreOptions } from 'core-react';

export interface UseClipboardOptions extends Omit<CoreOptions, 'timeout'> {
  /** Durée d'affichage de l'état "copié" en millisecondes (défaut : 2000ms) */
  feedbackDuration?: number;
}

export const useClipboard = ({ feedbackDuration, ...options }: UseClipboardOptions = {}) => {
  const { copy, isCopied, error, isSupported } = useCoreClipboard({ ...options, timeout: feedbackDuration });
  return { copy, hasCopied: isCopied, error, isSupported };
};
```

**Hook configuré (base, thème)**
```ts
// frontend/src/hooks/useTheme.ts
import { createThemeStore } from 'core-react/theme';
import { darkTheme, lightTheme } from '@/ui/theme';
export type { ThemeMode, ThemePreference, UseThemeReturn } from 'core-react/theme';

export const { useTheme, useThemeStore, resolveMode, initThemeStore } = createThemeStore({
  storageKey: 'ds-app-theme',
  migrations: { 0: (legacy: { mode?: 'light' | 'dark' }) => ({ preference: legacy?.mode === 'dark' ? 'dark' : 'light' }) },
  attributes: ['data-theme', 'data-ds-theme', 'data-ui-theme'],
  themes: { light: lightTheme, dark: darkTheme }, // conserve `theme` dans le retour
  autoInit: true, // SPA Vite : initialisation immédiate (équivalent du comportement actuel)
});
```

**Authentification (base)**
```ts
// frontend/src/stores/auth.store.ts
import { createAuth } from 'core-react/auth';
import { useReactRouterNavigation } from 'core-react/react-router';
import { fetchProfile } from '@/services/auth.api';
import { http } from '@/services/fetchAPI';
import type { User } from '@/types/auth.types';
import { ROLE_LABELS } from '@/utils/role';

export const TOKEN_KEY = 'todo_auth_token'; // désormais défini à un seul endroit

export const { useAuth, authStore } = createAuth<User>({
  storage: { tokenKey: TOKEN_KEY, type: 'local' },
  http,
  session: { validateToken: 'jwt-exp', fetchUser: (token) => fetchProfile(token) },
  roles: { getRoles: (user) => user.roles, admin: 'ROLE_ADMIN', labels: ROLE_LABELS },
  navigation: useReactRouterNavigation,
});

// API zustand historique, inchangée pour les pages
export const useAuthStore = authStore.useLegacyStore; // { token, user, isLoading, setAuth, setUser, logout, checkSession }
```
```ts
// frontend/src/hooks/useAuth.ts
export { useAuth } from '@/stores/auth.store';
export type { UseAuthReturn } from 'core-react/auth';
export { useAuth as useIsAuth } from '@/stores/auth.store';
```

**Composant à props renommées (base)**
```ts
// frontend/src/ui/components/Base/Button.tsx
import { Button as CoreButton } from 'core-react/ui';
import { withLegacyProps } from 'core-react/compat';
export type { ButtonVariant, ButtonSize } from 'core-react/ui';

export const Button = withLegacyProps(CoreButton, {
  variant: '$variant', size: '$size', fullWidth: '$fullWidth', loading: '$loading',
});
```

**Composant direct (social)**
```ts
// apps/gather_front/src/ui/components/Base/index.ts
export * from 'core-react/ui/base'; // Avatar, Badge, Button, Divider, Icon, IconButton, Link, SegmentedControl
```
```tsx
// apps/gather_front/src/app/providers.tsx : seule addition, une ligne
<UIProvider linkComponent={NextLink}>{children}</UIProvider>
```

**Géolocalisation (base, adaptation de la forme)**
```ts
// frontend/src/hooks/useGeoLocation.tsx
import { useGeolocation as useCoreGeolocation } from 'core-react';
import type { EntryLocation } from '@/types/journal.types';
export type { GeolocationStatus } from 'core-react';

export const useGeolocation = (initialLocation?: EntryLocation | null) => {
  const geo = useCoreGeolocation({ precision: 'street', fallback: 'coordinates', language: 'fr', initial: initialLocation ?? null });
  const location: EntryLocation | null = geo.location && {
    name: geo.location.name, latitude: geo.location.latitude!, longitude: geo.location.longitude!,
    street: geo.location.street, city: geo.location.city, country: geo.location.country,
  };
  return { status: geo.status, location, errorMessage: geo.errorMessage, requestLocation: geo.requestLocation, clearLocation: geo.clearLocation };
};
```

**Géolocalisation (social)**
```ts
// apps/gather_front/src/features/posts/useGeolocation.ts
'use client';
import { useGeolocation as useCoreGeolocation } from 'core-react';
export type { GeolocationStatus } from 'core-react';

export const useGeolocation = () => {
  const geo = useCoreGeolocation({ precision: 'city', fallback: 'error', language: 'fr' });
  return { status: geo.status, label: geo.location?.name ?? null, errorMessage: geo.errorMessage, requestLocation: geo.requestLocation, clearLocation: geo.clearLocation };
};
```

**Erreur API (ordre d'arguments historique conservé)**
```ts
// frontend/src/services/apiError.ts
import { ApiRequestError, toApiError as coreToApiError, type ApiViolations } from 'core-ts';
export type { ApiViolations };

export class ApiError extends ApiRequestError {
  constructor(message: string, status: number, violations: ApiViolations = {}, code: string | null = null) {
    super(message, { status, violations, code });
  }
}
export const toApiError = (res: { status: number; data: unknown }, fallback: string): ApiError =>
  ApiError.from(coreToApiError(res.data, fallback, res.status));
export { getErrorCode, getErrorMessage, getFieldErrors } from 'core-ts';
```

### 5.5 Séquencement

| Étape | Contenu | Risque | Vérification |
|---|---|---|---|
| 0 | Patch core-ts (exports, Markdown durci, SSR `StorageService`) | Faible ; le HTML brut des notes/journaux s'affiche désormais en texte (voulu) | Suite XSS, `npm test` des 3 projets |
| 1 | `design-tokens` dans core-ts + génération `_primitives.scss` (DS) | Faible (valeurs DS identiques) | Diff du CSS compilé du DS = 0 |
| 2 | Modules purs core-ts 1.1 (geo, auth, editor, selection, file, theme, http) | Nul (ajouts) | Tests unitaires |
| 3 | core-react : hooks + `compat` | Nul pour les apps | Tests React Testing Library |
| 4 | Proxies **base** (SPA) : hooks/services, puis UI et thème avec `LEGACY_SPACING` | Moyen (UI) | `tsc`, tests, recette visuelle page par page |
| 5 | Proxies **social** (SSR) : idem + `UIProvider`, `core-react/next` ; retrait de `lucide-react` | Moyen (hydratation) | `next build`, absence d'avertissement d'hydratation, Storybook |
| 6 | Alignement visuel DA (§4b.3) dans core-react et le DS | Moyen (visuel voulu) | Comparaison côte à côte DS/React par composant |
| 7 (optionnel) | Codemods : `spacing`, props `$` dans la base, suppression des proxies triviaux | Faible | — |

---

## Annexes

### A. Points d'attention complémentaires

- `specs/front_core_module.md` (base) liste déjà des écarts que la migration corrige : clé `todo_auth_token` dupliquée, absence d'interception 401, JWT envoyé aux URL absolues, `ToastContainer` jamais monté.
- `useToast` n'est pas exporté par `Feedback/Toast/index.ts` dans la base.
- `DEFAULT_DURATION` (core-ts) : commentaire « 3 secondes » pour une valeur de 10 000 ms.
- Le DS documente `.form-selectable-item` dans `templates/docs/features/_form-manager.html.twig` mais stylise un autre balisage : à réaligner avec le nouveau `SelectableField`.
- Le guide du DS (§1) liste les polices d'icônes comme solution officielle : à mettre à jour avec le sprite SVG.

### B. Fichiers lus

- core-ts : `src/**` (hors tests, tests parcourus pour les comportements), `docs/*.md`, `dist/index.d.ts`, `package.json`.
- Base : `src/hooks/*`, `src/services/{fetchAPI,apiError,storage.service,auth.api}.ts`, `src/stores/auth.store.ts`, `src/utils/*`, `src/ui/**` (diff complet), `src/ui/theme/**`, `specs/front_core_module.md`, `specs/extraction_guide.md`, `index.html`.
- Social : `src/hooks/*`, `src/features/auth/*`, `src/features/posts/{useGeolocation,useLinkPreview}.ts`, `src/lib/api/*`, `src/ui/**` (diff complet), `src/ui/theme/**`, `src/app/providers.tsx`, `ui/docs/components/content_component_usage.md`.
- Design System : `SKILL.md`, `docs/design-system-agent-guide.md`, `assets/scss/{abstracts/_primitives,foundation/_tokens,forms/_selectable-card,forms/_chip,forms/_md-editor,components/_button}.scss`, `assets/ts/interactions/components/md-editor.ts`.
