import { useEffect, useRef } from 'react';

export type ActionTimerType = 'timeout' | 'interval';

export interface UseActionTimerOptions {
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
export function useActionTimer({ type, delay, action, onCleanUp }: UseActionTimerOptions): void {
  const actionRef = useRef<() => void>(action);
  const onCleanUpRef = useRef<(() => void) | undefined>(onCleanUp);

  // Garde les refs à jour sans jamais recréer le timer.
  useEffect(() => {
    actionRef.current = action;
    onCleanUpRef.current = onCleanUp;
  }, [action, onCleanUp]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const tick = (): void => {
      actionRef.current();
    };

    const id = type === 'timeout' ? setTimeout(tick, delay) : setInterval(tick, delay);

    return () => {
      onCleanUpRef.current?.();

      if (type === 'timeout') {
        clearTimeout(id);
      } else {
        clearInterval(id);
      }
    };
  }, [type, delay]);
}
