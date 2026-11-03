import * as react from 'react';
import { CSSProperties, ElementType, ReactNode } from 'react';

/** Noms disponibles sans configuration (icônes du DS + alias historiques). */
declare const iconNames: readonly string[];
interface IconProps {
    /** Nom MDI du Design System (`trash-can-outline`), avec ou sans préfixe `mdi-`, ou alias. */
    name: string;
    /** Taille en px (nombre) ou en unité CSS. Défaut : 20. */
    size?: number | string;
    color?: string;
    spin?: boolean;
    rotate?: 90 | 180 | 270;
    /** Variante pleine : `heart-outline` → `heart` si elle existe. */
    filled?: boolean;
    /** Libellé accessible : sans lui, l'icône est décorative (`aria-hidden`). */
    title?: string;
    /** @deprecated Ignoré : toutes les icônes viennent du Design System (MDI). */
    iconSet?: string;
    id?: string;
    className?: string;
    style?: CSSProperties;
    as?: ElementType;
    children?: ReactNode;
}
/**
 * Icône SVG native, tracée depuis la police d'icônes du Design System (aucune police ni bibliothèque chargée).
 * Couleur : `currentColor` par défaut.
 */
declare const Icon: ({ name, size, color, spin, rotate, filled, title, iconSet: _iconSet, style, children: _children, as: _as, ...rest }: IconProps) => react.JSX.Element;

/**
 * FICHIER GÉNÉRÉ par scripts/icons/generate.mjs (npm run icons) : ne pas modifier à la main.
 * Source : ds-icons.css du Design System (Material Design Icons, police materialdesignicons-webfont.0207b94c.ttf).
 * Tracés sur une grille 24 × 24. Licence des tracés : voir src/icons/LICENSE.
 */
/** Noms des icônes du Design System embarquées. */
type DsIconName = "account" | "account-edit-outline" | "account-group-outline" | "account-outline" | "account-plus-outline" | "account-search-outline" | "airplane" | "alert" | "alert-circle" | "alert-circle-outline" | "alert-octagon-outline" | "alert-outline" | "archive" | "archive-arrow-down-outline" | "archive-outline" | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "attachment" | "backup-restore" | "bell" | "bell-alert-outline" | "bell-outline" | "bike" | "book" | "book-lock-outline" | "book-open-outline" | "book-outline" | "bookmark" | "bookmark-outline" | "bullhorn-outline" | "calendar" | "calendar-arrow-right" | "calendar-clock" | "calendar-today" | "calendar-week" | "camera" | "camera-iris" | "camera-outline" | "cancel" | "cellphone" | "check" | "check-all" | "check-circle" | "check-circle-outline" | "check-decagram" | "check-decagram-outline" | "chevron-double-left" | "chevron-double-right" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clock-outline" | "close" | "close-circle-outline" | "cloud-upload-outline" | "code-tags" | "coffee" | "coffee-outline" | "cog-outline" | "comment" | "comment-alert-outline" | "comment-check-outline" | "comment-multiple-outline" | "comment-text-outline" | "compass" | "compass-outline" | "console" | "content-copy" | "content-save-outline" | "cube-outline" | "delete" | "delete-forever-outline" | "dots-horizontal" | "dots-vertical" | "download" | "drag-vertical" | "email" | "email-alert-outline" | "email-fast-outline" | "email-outline" | "email-search-outline" | "emoticon-happy-outline" | "eye" | "eye-outline" | "feather" | "file" | "file-check-outline" | "file-code" | "file-code-outline" | "file-document-edit-outline" | "file-document-multiple-outline" | "file-document-outline" | "file-document-plus-outline" | "file-eye-outline" | "file-music-outline" | "file-outline" | "file-search-outline" | "file-undo-outline" | "file-video-outline" | "film" | "filmstrip" | "filter" | "filter-off-outline" | "flag-outline" | "folder" | "folder-open-outline" | "folder-outline" | "format-bold" | "format-header-2" | "format-italic" | "format-list-bulleted" | "format-list-checks" | "format-list-numbered" | "format-pilcrow" | "format-quote-close" | "format-strikethrough" | "fullscreen" | "gamepad" | "gamepad-variant-outline" | "github" | "hammer" | "heart" | "heart-outline" | "heart-pulse" | "help-circle" | "help-circle-outline" | "history" | "home" | "image" | "image-edit-outline" | "image-filter-hdr" | "image-multiple-outline" | "image-off-outline" | "image-outline" | "image-plus" | "image-remove-outline" | "inbox" | "information" | "information-outline" | "key" | "key-outline" | "laptop" | "link" | "link-variant" | "loading" | "lock" | "lock-outline" | "logout" | "magnify" | "map-marker-outline" | "marker" | "menu" | "message" | "message-alert-outline" | "message-outline" | "microphone-outline" | "monitor" | "music" | "music-note-outline" | "note-text-outline" | "notebook-outline" | "open-in-new" | "palette" | "palette-outline" | "paperclip" | "pause" | "pencil" | "pencil-outline" | "pencil-plus-outline" | "phone" | "pin" | "pin-outline" | "play" | "plus" | "presentation" | "repeat" | "restore" | "run" | "script" | "search-web" | "security" | "send" | "server-network" | "shape-outline" | "shield" | "shield-check-outline" | "shield-lock-outline" | "silverware-fork-knife" | "sprout" | "sprout-outline" | "square" | "square-outline" | "star" | "star-outline" | "table" | "table-column-plus-after" | "table-row-plus-after" | "tablet" | "tag" | "tag-multiple-outline" | "tag-outline" | "target" | "text" | "text-box-outline" | "text-box-search-outline" | "text-short" | "ticket" | "tooltip" | "trash-can-outline" | "trophy-outline" | "tune-variant" | "video" | "video-outline" | "view-carousel-outline" | "view-dashboard-outline" | "view-dashboard-variant-outline" | "view-grid-outline" | "weather-night" | "web" | "white-balance-sunny";
/** Tracés SVG (attribut `d`) indexés par nom MDI. */
declare const DS_ICONS: Readonly<Record<DsIconName, string>>;
/** Noms historiques (hors MDI) toujours résolus vers une icône du DS. */
declare const DS_ICON_ALIASES: Readonly<Record<string, DsIconName>>;
/**
 * Opt-in pour le social : noms MDI qu'il affichait en contour.
 * `<UIProvider iconAliases={OUTLINE_COMPAT_ALIASES}>`
 */
declare const OUTLINE_COMPAT_ALIASES: Readonly<Record<string, DsIconName>>;

export { DS_ICONS, DS_ICON_ALIASES, Icon, OUTLINE_COMPAT_ALIASES, iconNames };
export type { DsIconName, IconProps };
