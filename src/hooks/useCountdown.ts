import { useCallback, useEffect, useRef, useState } from 'react';

/** Formate une durée en secondes au format `m:ss` (ex. `125` → `2:05`). */
export const formatDuration = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

const secondsUntil = (timestamp: number, now: number): number =>
  Math.max(0, Math.ceil((timestamp - now) / 1000));

export interface UseCountdownOptions {
  /** Fréquence de rafraîchissement, en ms (défaut : 1000). */
  interval?: number;
  /** Déclenché une fois lorsque le compte à rebours atteint 0. */
  onComplete?: () => void;
}

export interface UseCountdownReturn {
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
export const useCountdown = ({
  interval = 1000,
  onComplete,
}: UseCountdownOptions = {}): UseCountdownReturn => {
  const [deadline, setDeadline] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  const onCompleteRef = useRef(onComplete);
  const completedForRef = useRef<number | null>(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const isActive = deadline !== null;
  const isExpired = isActive && now >= deadline;

  useEffect(() => {
    if (deadline === null) return;

    if (isExpired) {
      if (completedForRef.current !== deadline) {
        completedForRef.current = deadline;
        onCompleteRef.current?.();
      }
      return;
    }

    const id = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(id);
  }, [deadline, isExpired, interval]);

  const startUntil = useCallback((timestamp: number) => {
    setNow(Date.now());
    setDeadline(timestamp);
  }, []);

  const start = useCallback((seconds: number) => startUntil(Date.now() + seconds * 1000), [startUntil]);

  const stop = useCallback(() => {
    completedForRef.current = null;
    setDeadline(null);
  }, []);

  return {
    secondsLeft: deadline !== null ? secondsUntil(deadline, now) : 0,
    isActive,
    isRunning: isActive && !isExpired,
    isExpired,
    start,
    startUntil,
    stop,
  };
};
