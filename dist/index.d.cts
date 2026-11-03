import * as react from 'react';
import { KeyboardEvent, ElementType, ReactNode, Ref, RefCallback } from 'react';
import { BreakPointType } from 'core-ts';

type ActionTimerType = 'timeout' | 'interval';
interface UseActionTimerOptions {
    /** Type de timer : `setTimeout` (une fois) ou `setInterval` (répété). */
    type: ActionTimerType;
    /** Délai en ms. `null` = timer en pause / désactivé. */
    delay: number | null;
    /** Callback exécuté à chaque déclenchement. */
    action: () => void;
    /** Callback exécuté juste avant le nettoyage effectif du timer. */
    onCleanUp?: () => void;
}
/**
 * Timer déclaratif (`setTimeout` ou `setInterval`).
 * Le timer n'est recréé que si `type` ou `delay` change : les callbacks sont lus dans des refs,
 * leur identité peut donc changer à chaque rendu sans redémarrer le timer.
 *
 * @example
 * useActionTimer({
 *   type: 'interval',
 *   delay: running ? 1000 : null,
 *   action: () => setCount((c) => c + 1),
 * });
 */
declare function useActionTimer({ type, delay, action, onCleanUp }: UseActionTimerOptions): void;

type ClipboardPasteError = 'unsupported' | 'permission-denied' | 'unknown';
interface ClipboardPasteResult {
    success: boolean;
    text?: string;
    error?: ClipboardPasteError;
}
interface UseClipboardOptions {
    /** Durée d'affichage de l'état « copié », en ms (défaut : 2000). */
    timeout?: number;
    /** @deprecated Alias historique de `timeout` (app de base). */
    feedbackDuration?: number;
    /** Déclenché après une copie réussie. */
    onSuccess?: (text: string) => void;
    /** Déclenché en cas d'échec de la copie. */
    onError?: (error?: string) => void;
}
interface UseClipboardReturn {
    /** Copie `text` ; résout `true` si la copie a réussi. */
    copy: (text: string) => Promise<boolean>;
    /** Lit le presse-papier (texte brut). */
    paste: () => Promise<ClipboardPasteResult>;
    /** `true` pendant `timeout` ms après une copie réussie. */
    isCopied: boolean;
    /** @deprecated Alias de `isCopied`. */
    hasCopied: boolean;
    /** Message de la dernière erreur de copie. */
    error: string | null;
    /** `false` au rendu serveur, puis mis à jour après le montage (pas d'écart d'hydratation). */
    isSupported: boolean;
    /** Remet `isCopied` et `error` à zéro. */
    reset: () => void;
}
/**
 * Copier / coller avec retour d'état « copié ».
 * Aucun accès à `navigator`/`document` pendant le rendu : utilisable dans une app SSR (Next).
 */
declare const useClipboard: (options?: UseClipboardOptions) => UseClipboardReturn;

/** Formate une durée en secondes au format `m:ss` (ex. `125` → `2:05`). */
declare const formatDuration: (seconds: number) => string;
interface UseCountdownOptions {
    /** Fréquence de rafraîchissement, en ms (défaut : 1000). */
    interval?: number;
    /** Déclenché une fois lorsque le compte à rebours atteint 0. */
    onComplete?: () => void;
}
interface UseCountdownReturn {
    /** Secondes restantes (0 si aucun compte à rebours ou s'il est terminé). */
    secondsLeft: number;
    /** Un compte à rebours a été démarré et n'a pas été arrêté (reste vrai une fois à 0). */
    isActive: boolean;
    /** Le compte à rebours est démarré et non terminé. */
    isRunning: boolean;
    /** Le compte à rebours a atteint 0. */
    isExpired: boolean;
    /** Démarre (ou redémarre) pour `seconds` secondes. */
    start: (seconds: number) => void;
    /** Démarre jusqu'à un horodatage absolu (ms). */
    startUntil: (timestamp: number) => void;
    /** Arrête et réinitialise. */
    stop: () => void;
}
/**
 * Compte à rebours fondé sur une échéance absolue : il ne dérive pas si l'onglet est gelé
 * ou si un tick est retardé. L'intervalle s'arrête de lui-même une fois l'échéance atteinte.
 */
declare const useCountdown: ({ interval, onComplete, }?: UseCountdownOptions) => UseCountdownReturn;

/**
 * Retourne `value` après `delay` ms sans changement.
 * Chaque nouvelle valeur relance l'attente (ex. aperçu de lien, recherche à la frappe).
 */
declare const useDebouncedValue: <T>(value: T, delay?: number) => T;

/**
 * `false` au rendu serveur et pendant l'hydratation, `true` ensuite.
 * Sert à différer un rendu qui dépend du navigateur sans provoquer d'écart d'hydratation.
 */
declare const useIsClient: () => boolean;

type MarkdownMode = 'write' | 'preview';
type MarkdownAction = 'bold' | 'italic' | 'strike' | 'highlight' | 'code' | 'codeblock' | 'link' | 'heading' | 'quote' | 'ul' | 'ol' | 'task';
/**
 * Comportement de l'éditeur, sans aucun rendu : brancher `textareaRef` et `onKeyDown` sur un <textarea> contrôlé.
 * Le texte reste dans le state du composant appelant, comme pour n'importe quel champ React.
 */
declare const useMarkdownEditor: ({ initialMode }?: {
    initialMode?: MarkdownMode;
}) => {
    textareaRef: react.RefObject<HTMLTextAreaElement | null>;
    mode: MarkdownMode;
    setMode: (next: MarkdownMode) => void;
    applyAction: (name: MarkdownAction) => void;
    onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
    previewMinHeight: number | undefined;
};

type BreakpointDirection = 'up' | 'down';
interface UseMediaQueryOptions {
    /** `up` : largeur ≥ breakpoint (défaut) ; `down` : largeur < breakpoint. Ignoré pour une requête brute. */
    direction?: BreakpointDirection;
    /** Valeur retournée côté serveur et au premier rendu d'hydratation (défaut : false). */
    defaultValue?: boolean;
}
/**
 * Construit la media query d'un breakpoint du Design System (valeurs de `BREAKPOINTS`, core-ts).
 * `down` retire 0,02px, comme Bootstrap/DS, pour éviter le chevauchement à la valeur exacte.
 */
declare const getBreakpointQuery: (breakpoint: BreakPointType, direction?: BreakpointDirection) => string;
/**
 * Évalue une media query (`'(prefers-reduced-motion: reduce)'`) ou un breakpoint (`'md'`).
 * Compatible SSR : retourne `defaultValue` côté serveur, puis la vraie valeur après hydratation.
 */
declare const useMediaQuery: (queryOrBreakpoint: string | BreakPointType, { direction, defaultValue }?: UseMediaQueryOptions) => boolean;

/** La page est « active » si l'onglet est visible ET que la fenêtre a le focus. */
declare const isPageFocused: () => boolean;
/**
 * Suit le focus de la page : onglet masqué, fenêtre réduite ou autre fenêtre au premier plan.
 * Extrait de `useJournalAutoLock` (app de base).
 */
declare const usePageFocus: () => boolean;

type ToggleFn = (nextValue?: unknown) => void;
/**
 * Booléen basculable.
 * `toggle()` inverse la valeur ; `toggle(true | false)` la force.
 * Tout argument non booléen (ex. un événement passé par `onClick={toggle}`) est ignoré et inverse la valeur.
 */
declare const useToggle: (initialState?: boolean) => [boolean, ToggleFn];

/** Navigation agnostique : react-router (`useNavigate`) ou Next (`useRouter`). */
interface UINavigation {
    back: () => void;
    push: (url: string) => void;
}
interface UIContextValue {
    /** Composant de lien utilisé par Button, Link, NavbarLink, SidebarLink… (`NextLink`, `RouterLink`). Défaut : `'a'`. */
    linkComponent: ElementType;
    /**
     * Prop qui porte l'URL du composant de lien : `href` (Next, `<a>`) ou `to` (react-router). Défaut : `href`.
     */
    linkHrefProp: 'href' | 'to';
    /** Composant d'image utilisé par Avatar (`NextImage`). Défaut : `'img'`. */
    imageComponent: ElementType;
    /** Utilisé par BackButton. Défaut : `history.back()` / `location.assign()`. */
    navigation: UINavigation;
    /** Alias de noms d'icônes (ex. `OUTLINE_COMPAT_ALIASES` pour le social). */
    iconAliases: Readonly<Record<string, string>>;
    /** Icônes supplémentaires propres à l'app : nom → tracé SVG (`d`, grille 24 × 24). */
    icons: Readonly<Record<string, string>>;
}
interface UIProviderProps extends Partial<UIContextValue> {
    children?: ReactNode;
}
/**
 * Branche le kit sur le routeur et les primitives de l'app, sans qu'il importe `next/*` ni `react-router`.
 *
 * @example
 * // Next
 * <UIProvider linkComponent={NextLink} imageComponent={NextImage} navigation={useNextNavigation()}>
 * // react-router
 * <UIProvider linkComponent={RouterLink} linkHrefProp="to" navigation={{ back: () => navigate(-1), push: navigate }}>
 */
declare const UIProvider: ({ children, linkComponent, linkHrefProp, imageComponent, navigation, iconAliases, icons, }: UIProviderProps) => react.JSX.Element;
declare const useUI: () => UIContextValue;
/**
 * Props de lien prêtes à étaler : `{ as, href | to }` si `href` est fourni, sinon `{ as }` inchangé.
 * Permet aux composants du kit d'accepter `href` quel que soit le routeur.
 */
declare const useLinkProps: (href: string | undefined, as?: ElementType) => Record<string, unknown>;

/**
 * Fusionne plusieurs refs (objets ou callbacks) en une ref callback.
 * Compatible React 19 : les cleanups retournés par les refs callbacks sont appelés au détachement ;
 * à défaut, la ref reçoit `null` comme en React 18.
 */
declare const mergeRefs: <T>(...refs: Array<Ref<T> | undefined>) => RefCallback<T>;

export { UIProvider, formatDuration, getBreakpointQuery, isPageFocused, mergeRefs, useActionTimer, useClipboard, useCountdown, useDebouncedValue, useIsClient, useLinkProps, useMarkdownEditor, useMediaQuery, usePageFocus, useToggle, useUI };
export type { ActionTimerType, BreakpointDirection, ClipboardPasteError, ClipboardPasteResult, MarkdownAction, MarkdownMode, ToggleFn, UIContextValue, UINavigation, UIProviderProps, UseActionTimerOptions, UseClipboardOptions, UseClipboardReturn, UseCountdownOptions, UseCountdownReturn, UseMediaQueryOptions };
