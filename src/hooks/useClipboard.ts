import { copyToClipboard, isClipboardSupported } from 'core-ts';
import { useCallback, useEffect, useRef, useState } from 'react';

export type ClipboardPasteError = 'unsupported' | 'permission-denied' | 'unknown';

export interface ClipboardPasteResult {
  success: boolean;
  text?: string;
  error?: ClipboardPasteError;
}

export interface UseClipboardOptions {
  /** Durée d'affichage de l'état « copié », en ms (défaut : 2000). */
  timeout?: number;
  /** @deprecated Alias historique de `timeout` (app de base). */
  feedbackDuration?: number;
  /** Déclenché après une copie réussie. */
  onSuccess?: (text: string) => void;
  /** Déclenché en cas d'échec de la copie. */
  onError?: (error?: string) => void;
}

export interface UseClipboardReturn {
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

const DEFAULT_TIMEOUT = 2000;
const DEFAULT_COPY_ERROR = 'Erreur lors de la copie';

/**
 * Lecture du presse-papier.
 * TODO(core-ts 1.1) : remplacer par `readFromClipboard` une fois ajouté à core-ts (§1.3.5 de l'audit).
 */
const readFromClipboard = async (): Promise<ClipboardPasteResult> => {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.readText) {
    return { success: false, error: 'unsupported' };
  }

  try {
    return { success: true, text: await navigator.clipboard.readText() };
  } catch (error) {
    const isDenied = error instanceof DOMException && error.name === 'NotAllowedError';
    return { success: false, error: isDenied ? 'permission-denied' : 'unknown' };
  }
};

/**
 * Copier / coller avec retour d'état « copié ».
 * Aucun accès à `navigator`/`document` pendant le rendu : utilisable dans une app SSR (Next).
 */
export const useClipboard = (options: UseClipboardOptions = {}): UseClipboardReturn => {
  const timeout = options.timeout ?? options.feedbackDuration ?? DEFAULT_TIMEOUT;

  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbacksRef = useRef({ onSuccess: options.onSuccess, onError: options.onError });

  useEffect(() => {
    callbacksRef.current = { onSuccess: options.onSuccess, onError: options.onError };
  }, [options.onSuccess, options.onError]);

  useEffect(() => {
    // Détection côté client uniquement : le rendu serveur et le premier rendu client valent `false`.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronisation avec une API navigateur
    setIsSupported(isClipboardSupported());

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text) return false;

      const result = await copyToClipboard(text);

      if (result.success) {
        setIsCopied(true);
        setError(null);
        callbacksRef.current.onSuccess?.(text);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setIsCopied(false), timeout);

        return true;
      }

      setError(result.error ?? DEFAULT_COPY_ERROR);
      callbacksRef.current.onError?.(result.error);
      return false;
    },
    [timeout],
  );

  const paste = useCallback(() => readFromClipboard(), []);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setIsCopied(false);
    setError(null);
  }, []);

  return { copy, paste, isCopied, hasCopied: isCopied, error, isSupported, reset };
};
