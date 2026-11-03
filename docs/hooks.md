# Hooks génériques (`core-react`)

```ts
import {
  useActionTimer, useClipboard, useCountdown, formatDuration, useDebouncedValue,
  useIsClient, useMarkdownEditor, useMediaQuery, getBreakpointQuery, usePageFocus, isPageFocused,
  useToggle, mergeRefs,
} from 'core-react';
```

Tous sont **SSR-safe** : aucun accès à `window`/`document` pendant le rendu. `useMarkdownEditor` est documenté dans [markdown.md](markdown.md), `useTheme` dans [theme.md](theme.md), `useToast` dans [components/feedback.md](components/feedback.md), `useBlocksState` dans [editor.md](editor.md).

---

## useToggle

```ts
const [isOpen, toggle] = useToggle(false);
toggle();       // inverse
toggle(true);   // force
<button onClick={toggle} />  // l'événement (non booléen) est ignoré : inverse
```

`toggle` a une identité stable.

## useActionTimer

Timer déclaratif. Le timer n'est recréé que si `type` ou `delay` change ; les callbacks sont lus dans des refs.

| Option | Type | Description |
|---|---|---|
| `type` | `'timeout' \| 'interval'` | `setTimeout` ou `setInterval` |
| `delay` | `number \| null` | Délai en ms ; `null` met le timer en pause |
| `action` | `() => void` | Exécuté à chaque déclenchement |
| `onCleanUp` | `() => void` | Exécuté juste avant le nettoyage du timer |

```ts
useActionTimer({ type: 'interval', delay: running ? 1000 : null, action: () => setCount((c) => c + 1) });
```

## useClipboard

```ts
const { copy, paste, isCopied, hasCopied, error, isSupported, reset } = useClipboard({
  timeout: 2000,          // durée de l'état « copié » (alias historique : feedbackDuration)
  onSuccess: (text) => {},
  onError: (message) => {},
});

await copy('texte');      // → true | false
const { success, text, error } = await paste(); // error : 'unsupported' | 'permission-denied' | 'unknown'
```

- `isSupported` vaut `false` au rendu serveur, puis est calculé après le montage (pas d'écart d'hydratation).
- `copy` s'appuie sur `copyToClipboard` de core-ts (API Clipboard, repli `execCommand`).
- `hasCopied` est un alias déprécié de `isCopied`.

## useCountdown + formatDuration

Compte à rebours fondé sur une échéance absolue (ne dérive pas si l'onglet est gelé). Remplace `useCodeTimers` du social.

```ts
const expiry = useCountdown({ onComplete: () => setExpired(true) });
expiry.start(600);              // 10 minutes
expiry.startUntil(timestamp);   // échéance absolue (ms)
expiry.secondsLeft;             // 600, 599…
expiry.isActive;                // démarré et non arrêté (reste vrai à 0)
expiry.isRunning;               // démarré et non terminé
expiry.isExpired;
expiry.stop();
formatDuration(125);            // '2:05'
```

L'intervalle s'arrête de lui-même à l'échéance ; `onComplete` est appelé une fois par démarrage.

## useDebouncedValue

```ts
const debouncedQuery = useDebouncedValue(query, 300);
useEffect(() => { void search(debouncedQuery); }, [debouncedQuery]);
```

## useMediaQuery + getBreakpointQuery

Media query brute ou breakpoint du Design System (`BREAKPOINTS` de core-ts : 576/768/992/1200/1400).

```ts
const isDesktop = useMediaQuery('lg');                       // (min-width: 992px)
const isMobile = useMediaQuery('md', { direction: 'down' }); // (max-width: 767.98px)
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
getBreakpointQuery('lg', 'down');                            // '(max-width: 991.98px)'
```

`defaultValue` (défaut `false`) est retourné côté serveur et sans `matchMedia`.

## usePageFocus + isPageFocused

`true` si l'onglet est visible **et** que la fenêtre a le focus. Extrait de `useJournalAutoLock` (app de base). Côté serveur : `true`.

```ts
const isFocused = usePageFocus();
useActionTimer({ type: 'timeout', delay: isUnlocked && !isFocused ? 90_000 : null, action: lock });
```

## useIsClient

`false` au rendu serveur et pendant l'hydratation, `true` ensuite. Pour différer un rendu dépendant du navigateur.

```tsx
const isClient = useIsClient();
return isClient ? <LocalTime date={date} /> : <time dateTime={date}>{date}</time>;
```

## mergeRefs

Fusionne des refs objets et callbacks en une ref callback (compatible avec les cleanups des refs React 19).

```tsx
const Field = ({ ref, ...props }: { ref?: React.Ref<HTMLTextAreaElement> }) => {
  const localRef = useRef<HTMLTextAreaElement>(null);
  return <textarea ref={mergeRefs(localRef, ref)} {...props} />;
};
```

---

## À venir (dépendent des modules core-ts 1.1)

`useGeolocation` (core-ts `geo`), `createAuth`/`useAuth` (core-ts `auth`), `useSelectable`, `useFileUploader`. Voir le §5.5 de [l'audit](../AUDIT_MIGRATION_CORE_REACT.md).
