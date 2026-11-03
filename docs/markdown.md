# Markdown

Trois briques, une seule règle : **aucun HTML injecté**. Le Markdown est découpé en jetons par `marked` (instance dédiée, GFM, extension `==surlignage==` de core-ts), puis chaque jeton devient un élément React.

| Brique | Import | Rôle |
|---|---|---|
| `MarkdownViewer` (+ alias `MarkdownContent`) | `core-react/ui` | Affichage sûr |
| `MarkdownEditor` | `core-react/ui` | Champ d'édition complet (barre d'outils, aperçu) |
| `useMarkdownEditor` | `core-react` | Comportement seul, pour un rendu sur mesure |
| `useMarkdown`, `parseMarkdown`, `renderMarkdownTokens`, `Prose` | `core-react/ui` | Briques bas niveau |

## MarkdownViewer

```tsx
<MarkdownViewer>{article.body}</MarkdownViewer>
<MarkdownViewer headingOffset={1} allowImages linkTarget="_self">{doc}</MarkdownViewer>
```

| Prop | Défaut | Description |
|---|---|---|
| `children` | — | Source Markdown (`string`) |
| `headingOffset` | `0` | Décale les titres (`#` → `h1 + offset`, plafonné à `h6`) |
| `breaks` | `false` | Retour à la ligne simple → `<br>` |
| `allowImages` | `false` | Affiche les images (sinon leur texte alternatif) : une image distante révèle l'IP du lecteur |
| `linkTarget` | `'_blank'` | Cible des liens **externes** ; les liens relatifs et ancres restent dans l'onglet |
| `className` | — | Classe du conteneur `Prose` |

`MarkdownContent` (alias historique du social) applique `headingOffset={2}` et `breaks`.

Rendu pris en charge : titres, paragraphes, gras, italique, barré, `==surligné==` (`<mark>`), code en ligne, blocs de code (`class="language-xxx"` si le langage est sûr), citations, listes ordonnées et à puces, listes de tâches (cases désactivées), tableaux GFM (alignement), séparateurs, liens, images (opt-in).

### Garanties de sécurité

- HTML brut (`<script>`, `<img onerror>`, `<iframe>`…) : affiché **comme du texte**.
- Liens et images : seuls `http:`, `https:`, `mailto:`, chemins relatifs (`/`, `./`, `../`) et ancres (`#`) sont actifs. `javascript:`, `data:`… sont rendus en texte simple.
- Liens externes : `rel="noopener noreferrer nofollow ugc"`.
- Contenu des blocs de code : enfant texte, donc échappé par React (un `<script>` dans un bloc de code reste inerte).
- L'instance globale de `marked` n'est jamais modifiée.

Les vecteurs XSS de l'audit (§1.3.1) et de l'OWASP sont testés dans `MarkdownViewer.test.tsx`. Pour du contenu utilisateur, ne pas utiliser `convertMarkdownToHtml` de core-ts (version actuelle non nettoyée) avec `dangerouslySetInnerHTML`.

### Bas niveau

```ts
const tokens = parseMarkdown(source, { breaks: true });          // Token[] de marked
const nodes = renderMarkdownTokens(tokens, { allowImages: false, headingOffset: 0, linkTarget: '_blank' });
const content = useMarkdown(source, options);                     // mémoïsé
<Prose>{content}</Prose>                                          // styles de lecture du kit
```

## MarkdownEditor

Champ contrôlé, comme un `<textarea>`.

```tsx
const [bio, setBio] = useState('');
<MarkdownEditor
  label="Biographie"
  hint="Markdown accepté"
  value={bio}
  onChange={setBio}
  rows={6}
  maxLength={500}
  actions={['bold', 'italic', 'separator', 'ul', 'link']}
/>
```

| Prop | Description |
|---|---|
| `value`, `onChange(value)` | Contrôle (obligatoires) |
| `label`, `hint`, `error`, `required` | Habillage de champ (`Label`, `HelperText`) |
| `placeholder`, `rows` (6), `maxLength`, `autoFocus`, `aria-label` | Attributs du `<textarea>` |
| `actions` | Boutons et ordre (`'separator'` = trait). Défaut : `heading, bold, italic, strike, highlight │ ul, ol, task, quote │ code, codeblock, link` |

Comportement : modes **Écrire / Aperçu** (aperçu = `MarkdownViewer` avec `breaks`), boutons désactivés en aperçu, raccourcis Ctrl/⌘ + **B** (gras), **I** (italique), **K** (lien), **E** (code), continuation des listes et citations sur Entrée (un élément vide termine la liste), second clic = retrait de la mise en forme, préfixes de ligne exclusifs (un titre remplace une puce). Ctrl+Z fonctionne (`execCommand('insertText')`, avec repli `setRangeText` si l'API est absente).

## useMarkdownEditor

Le comportement de l'éditeur, sans style. Le texte reste dans le state du composant appelant.

```tsx
const { textareaRef, mode, setMode, applyAction, onKeyDown, previewMinHeight } = useMarkdownEditor({ initialMode: 'write' });

<textarea ref={textareaRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKeyDown} />
<button type="button" onClick={() => applyAction('bold')}>B</button>
{mode === 'preview' && <MarkdownViewer>{value}</MarkdownViewer>}
```

| Retour | Description |
|---|---|
| `textareaRef` | Ref à poser sur le `<textarea>` |
| `mode` / `setMode('write' \| 'preview')` | Le retour en écriture redonne le focus au champ |
| `applyAction(action)` | `MarkdownAction` : `bold`, `italic`, `strike`, `highlight`, `code`, `codeblock`, `link`, `heading`, `quote`, `ul`, `ol`, `task` |
| `onKeyDown` | Raccourcis et continuation de liste |
| `previewMinHeight` | Hauteur du champ au passage en aperçu (évite le saut de mise en page) |

Le `<textarea>` contrôlé reçoit l'événement `input` natif déclenché par l'action : le `onChange` React habituel met le state à jour.

> **Évolution prévue** (§1.3.2 de l'audit) : la logique pure (`computeMarkdownAction`) passera dans core-ts pour être partagée avec `md-editor.ts` du Design System.
