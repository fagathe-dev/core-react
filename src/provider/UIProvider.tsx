import { createContext, useContext, useMemo, type ElementType, type ReactNode } from 'react';

/** Navigation agnostique : react-router (`useNavigate`) ou Next (`useRouter`). */
export interface UINavigation {
  back: () => void;
  push: (url: string) => void;
}

export interface UIContextValue {
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

const browserNavigation: UINavigation = {
  back: () => {
    if (typeof window !== 'undefined') window.history.back();
  },
  push: (url) => {
    if (typeof window !== 'undefined') window.location.assign(url);
  },
};

const DEFAULT_UI: UIContextValue = {
  linkComponent: 'a',
  linkHrefProp: 'href',
  imageComponent: 'img',
  navigation: browserNavigation,
  iconAliases: {},
  icons: {},
};

const UIContext = createContext<UIContextValue>(DEFAULT_UI);

export interface UIProviderProps extends Partial<UIContextValue> {
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
export const UIProvider = ({
  children,
  linkComponent,
  linkHrefProp,
  imageComponent,
  navigation,
  iconAliases,
  icons,
}: UIProviderProps) => {
  const parent = useContext(UIContext);
  const value = useMemo<UIContextValue>(
    () => ({
      linkComponent: linkComponent ?? parent.linkComponent,
      linkHrefProp: linkHrefProp ?? parent.linkHrefProp,
      imageComponent: imageComponent ?? parent.imageComponent,
      navigation: navigation ?? parent.navigation,
      iconAliases: iconAliases ? { ...parent.iconAliases, ...iconAliases } : parent.iconAliases,
      icons: icons ? { ...parent.icons, ...icons } : parent.icons,
    }),
    [parent, linkComponent, linkHrefProp, imageComponent, navigation, iconAliases, icons],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = (): UIContextValue => useContext(UIContext);

/**
 * Props de lien prêtes à étaler : `{ as, href | to }` si `href` est fourni, sinon `{ as }` inchangé.
 * Permet aux composants du kit d'accepter `href` quel que soit le routeur.
 */
export const useLinkProps = (href: string | undefined, as?: ElementType): Record<string, unknown> => {
  const { linkComponent, linkHrefProp } = useUI();
  if (as || !href) return { as, href };
  return linkComponent === 'a' ? { as: 'a', href } : { as: linkComponent, [linkHrefProp]: href };
};
