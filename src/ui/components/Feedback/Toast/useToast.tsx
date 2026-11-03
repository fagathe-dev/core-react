import { useSyncExternalStore } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  /** Durée d'affichage en ms (défaut : 4000 ; 0 = jusqu'à fermeture manuelle). */
  duration?: number;
}

export interface ToastState {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => string;
  removeToast: (id: string) => void;
}

const listeners = new Set<() => void>();
let state: ToastState;

const setState = (patch: Partial<ToastState>) => {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
};

const removeToast = (id: string) => setState({ toasts: state.toasts.filter((toast) => toast.id !== id) });

const addToast = (toast: Omit<ToastMessage, 'id'>): string => {
  const id = Math.random().toString(36).substring(2, 9);
  const duration = toast.duration ?? 4000;
  setState({ toasts: [...state.toasts, { ...toast, id }] });
  if (duration > 0) setTimeout(() => removeToast(id), duration);
  return id;
};

state = { toasts: [], addToast, removeToast };
const serverState: ToastState = { toasts: [], addToast, removeToast };

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/**
 * Store global des toasts (même API de sélecteur que l'ancien store zustand des apps).
 * @example const toasts = useToastStore((s) => s.toasts);
 */
export const useToastStore = Object.assign(
  <T,>(selector: (state: ToastState) => T): T =>
    useSyncExternalStore(
      subscribe,
      () => selector(state),
      () => selector(serverState),
    ),
  { getState: (): ToastState => state, subscribe },
);

/** Déclenche des toasts depuis n'importe quel composant (nécessite un `<ToastContainer />` monté). */
export const useToast = () => ({
  toast: addToast,
  success: (message: string, title?: string) => addToast({ message, title, variant: 'success' }),
  error: (message: string, title?: string) => addToast({ message, title, variant: 'danger' }),
  warning: (message: string, title?: string) => addToast({ message, title, variant: 'warning' }),
  info: (message: string, title?: string) => addToast({ message, title, variant: 'info' }),
  dismiss: removeToast,
});
