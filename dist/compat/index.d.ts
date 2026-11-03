import { ComponentType } from 'react';

/** Correspondance « ancienne prop » → « prop transitoire » (`variant` → `$variant`). */
type LegacyPropsMap<P> = Readonly<Record<string, Extract<keyof P, `$${string}`>>>;
/**
 * Props acceptées par le composant enveloppé : celles du composant d'origine, où chaque prop
 * transitoire ciblée devient optionnelle et peut aussi être passée sous son ancien nom.
 */
type WithLegacyProps<P, M extends LegacyPropsMap<P>> = Omit<P, M[keyof M]> & {
    [K in keyof M]?: P[M[K]];
} & {
    [K in M[keyof M]]?: P[K];
};
/**
 * Enveloppe un composant de core-react (props transitoires `$`, convention du social) pour qu'il
 * accepte les anciens noms de props de l'app de base. Destiné aux fichiers proxies des apps.
 * Si l'ancienne prop et la prop `$` sont passées toutes les deux, la prop `$` l'emporte.
 * React 19 : `ref` est une prop ordinaire, elle est transmise telle quelle.
 *
 * @example
 * export const Button = withLegacyProps(CoreButton, {
 *   variant: '$variant', size: '$size', fullWidth: '$fullWidth', loading: '$loading',
 * });
 */
declare const withLegacyProps: <P extends object, const M extends LegacyPropsMap<P>>(Component: ComponentType<P>, map: M) => ComponentType<WithLegacyProps<P, M>>;

export { withLegacyProps };
export type { LegacyPropsMap, WithLegacyProps };
