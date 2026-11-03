'use client';

// src/hooks/useActionTimer.ts
import { useEffect, useRef } from "react";
function useActionTimer({ type, delay, action, onCleanUp }) {
  const actionRef = useRef(action);
  const onCleanUpRef = useRef(onCleanUp);
  useEffect(() => {
    actionRef.current = action;
    onCleanUpRef.current = onCleanUp;
  }, [action, onCleanUp]);
  useEffect(() => {
    if (delay === null) {
      return;
    }
    const tick = () => {
      actionRef.current();
    };
    const id = type === "timeout" ? setTimeout(tick, delay) : setInterval(tick, delay);
    return () => {
      onCleanUpRef.current?.();
      if (type === "timeout") {
        clearTimeout(id);
      } else {
        clearInterval(id);
      }
    };
  }, [type, delay]);
}

// src/hooks/useClipboard.ts
import { copyToClipboard, isClipboardSupported } from "core-ts";
import { useCallback, useEffect as useEffect2, useRef as useRef2, useState } from "react";
var DEFAULT_TIMEOUT = 2e3;
var DEFAULT_COPY_ERROR = "Erreur lors de la copie";
var readFromClipboard = async () => {
  if (typeof navigator === "undefined" || !navigator.clipboard?.readText) {
    return { success: false, error: "unsupported" };
  }
  try {
    return { success: true, text: await navigator.clipboard.readText() };
  } catch (error) {
    const isDenied = error instanceof DOMException && error.name === "NotAllowedError";
    return { success: false, error: isDenied ? "permission-denied" : "unknown" };
  }
};
var useClipboard = (options = {}) => {
  const timeout = options.timeout ?? options.feedbackDuration ?? DEFAULT_TIMEOUT;
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const timerRef = useRef2(null);
  const callbacksRef = useRef2({ onSuccess: options.onSuccess, onError: options.onError });
  useEffect2(() => {
    callbacksRef.current = { onSuccess: options.onSuccess, onError: options.onError };
  }, [options.onSuccess, options.onError]);
  useEffect2(() => {
    setIsSupported(isClipboardSupported());
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  const copy = useCallback(
    async (text) => {
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
    [timeout]
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

// src/hooks/useCountdown.ts
import { useCallback as useCallback2, useEffect as useEffect3, useRef as useRef3, useState as useState2 } from "react";
var formatDuration = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
var secondsUntil = (timestamp, now) => Math.max(0, Math.ceil((timestamp - now) / 1e3));
var useCountdown = ({
  interval = 1e3,
  onComplete
} = {}) => {
  const [deadline, setDeadline] = useState2(null);
  const [now, setNow] = useState2(0);
  const onCompleteRef = useRef3(onComplete);
  const completedForRef = useRef3(null);
  useEffect3(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  const isActive = deadline !== null;
  const isExpired = isActive && now >= deadline;
  useEffect3(() => {
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
  const startUntil = useCallback2((timestamp) => {
    setNow(Date.now());
    setDeadline(timestamp);
  }, []);
  const start = useCallback2((seconds) => startUntil(Date.now() + seconds * 1e3), [startUntil]);
  const stop = useCallback2(() => {
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
    stop
  };
};

// src/hooks/useDebouncedValue.ts
import { useEffect as useEffect4, useState as useState3 } from "react";
var useDebouncedValue = (value, delay = 300) => {
  const [debounced, setDebounced] = useState3(value);
  useEffect4(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

// src/hooks/useIsClient.ts
import { useSyncExternalStore } from "react";
var subscribe = () => () => void 0;
var useIsClient = () => useSyncExternalStore(
  subscribe,
  () => true,
  () => false
);

// src/hooks/useMarkdownEditor.ts
import { useCallback as useCallback3, useEffect as useEffect5, useRef as useRef4, useState as useState4 } from "react";
var WRAP_ACTIONS = {
  bold: { before: "**", after: "**", placeholder: "texte en gras" },
  italic: { before: "_", after: "_", placeholder: "texte en italique" },
  strike: { before: "~~", after: "~~", placeholder: "texte barr\xE9" },
  highlight: { before: "==", after: "==", placeholder: "texte surlign\xE9" },
  code: { before: "`", after: "`", placeholder: "code" },
  codeblock: { before: "```\n", after: "\n```", placeholder: "code" },
  link: { before: "[", after: "](https://)", placeholder: "texte du lien" }
};
var LIST_PATTERN = /^([-*+]|\d+\.) (\[[ xX]\] )?/;
var LINE_ACTIONS = {
  heading: { prefix: () => "## ", pattern: /^#{1,6} /, exclusive: true },
  quote: { prefix: () => "> ", pattern: /^> /, exclusive: false },
  ul: { prefix: () => "- ", pattern: /^[-*+] (?!\[[ xX]\] )/, exclusive: true },
  ol: { prefix: (index) => `${index + 1}. `, pattern: /^\d+\. /, exclusive: true },
  task: { prefix: () => "- [ ] ", pattern: /^[-*+] \[[ xX]\] /, exclusive: true }
};
var SHORTCUTS = { b: "bold", i: "italic", k: "link", e: "code" };
var replaceRange = (textarea, start, end, text) => {
  textarea.focus();
  textarea.setSelectionRange(start, end);
  const inserted = typeof document.execCommand === "function" && document.execCommand("insertText", false, text);
  if (!inserted) {
    textarea.setRangeText(text, start, end, "end");
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  }
};
var applyWrap = (textarea, name, { before, after, placeholder }) => {
  const { selectionStart: start, selectionEnd: end, value } = textarea;
  const selected = value.slice(start, end);
  if (name !== "link" && value.slice(start - before.length, start) === before && value.slice(end, end + after.length) === after) {
    replaceRange(textarea, start - before.length, end + after.length, selected);
    textarea.setSelectionRange(start - before.length, end - before.length);
    return;
  }
  const text = selected || placeholder;
  replaceRange(textarea, start, end, `${before}${text}${after}`);
  const textStart = start + before.length;
  if (name === "link" && selected) {
    const urlStart = textStart + text.length + 2;
    textarea.setSelectionRange(urlStart, urlStart + "https://".length);
  } else {
    textarea.setSelectionRange(textStart, textStart + text.length);
  }
};
var applyLinePrefix = (textarea, { prefix, pattern, exclusive }) => {
  const { selectionStart, selectionEnd, value } = textarea;
  const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
  const endIndex = selectionEnd > selectionStart && value[selectionEnd - 1] === "\n" ? selectionEnd - 1 : selectionEnd;
  const nextBreak = value.indexOf("\n", endIndex);
  const lineEnd = nextBreak === -1 ? value.length : nextBreak;
  const lines = value.slice(lineStart, lineEnd).split("\n");
  const filled = lines.filter((line) => line.trim() !== "");
  const remove = filled.length > 0 && filled.every((line) => pattern.test(line));
  let index = 0;
  const updated = lines.map((line) => {
    if (remove) return line.replace(pattern, "");
    if (line.trim() === "" && lines.length > 1) return line;
    const bare = exclusive ? line.replace(LIST_PATTERN, "").replace(/^#{1,6} /, "") : line;
    return `${prefix(index++)}${bare}`;
  }).join("\n");
  replaceRange(textarea, lineStart, lineEnd, updated);
  if (lines.length > 1) {
    textarea.setSelectionRange(lineStart, lineStart + updated.length);
  }
};
var runAction = (textarea, name) => {
  const wrap = WRAP_ACTIONS[name];
  const line = LINE_ACTIONS[name];
  if (wrap) applyWrap(textarea, name, wrap);
  else if (line) applyLinePrefix(textarea, line);
};
var continueBlock = (textarea, event) => {
  const { selectionStart: position, selectionEnd, value } = textarea;
  if (position !== selectionEnd) return;
  const lineStart = value.lastIndexOf("\n", position - 1) + 1;
  const line = value.slice(lineStart, position);
  const match = /^(\s*)(?:([-*+]) (\[[ xX]\] )?|(\d+)\. |> )/.exec(line);
  if (!match) return;
  event.preventDefault();
  if (line.trim() === match[0].trim()) {
    replaceRange(textarea, lineStart, position, "");
    return;
  }
  const [, indent, bullet, task, number] = match;
  let prefix = `${indent}> `;
  if (number) prefix = `${indent}${Number(number) + 1}. `;
  else if (bullet) prefix = `${indent}${bullet} ${task ? "[ ] " : ""}`;
  replaceRange(textarea, position, position, `
${prefix}`);
};
var useMarkdownEditor = ({ initialMode = "write" } = {}) => {
  const textareaRef = useRef4(null);
  const [mode, setModeState] = useState4(initialMode);
  const [previewMinHeight, setPreviewMinHeight] = useState4(void 0);
  const hasLeftPreview = useRef4(false);
  useEffect5(() => {
    if (mode === "write" && hasLeftPreview.current) {
      hasLeftPreview.current = false;
      textareaRef.current?.focus();
    }
  }, [mode]);
  const setMode = useCallback3((next) => {
    if (next === "preview") {
      setPreviewMinHeight(textareaRef.current?.offsetHeight);
      hasLeftPreview.current = true;
    }
    setModeState(next);
  }, []);
  const applyAction = useCallback3((name) => {
    if (textareaRef.current) runAction(textareaRef.current, name);
  }, []);
  const onKeyDown = useCallback3((event) => {
    if (event.nativeEvent.isComposing) return;
    const action = SHORTCUTS[event.key.toLowerCase()];
    if ((event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && action) {
      event.preventDefault();
      runAction(event.currentTarget, action);
      return;
    }
    if (event.key === "Enter" && !event.shiftKey) {
      continueBlock(event.currentTarget, event);
    }
  }, []);
  return { textareaRef, mode, setMode, applyAction, onKeyDown, previewMinHeight };
};

// src/hooks/useMediaQuery.ts
import { BREAKPOINTS } from "core-ts";
import { useCallback as useCallback4, useSyncExternalStore as useSyncExternalStore2 } from "react";
var isBreakpoint = (value) => value in BREAKPOINTS;
var getBreakpointQuery = (breakpoint, direction = "up") => {
  const width = BREAKPOINTS[breakpoint];
  return direction === "up" ? `(min-width: ${width}px)` : `(max-width: ${width - 0.02}px)`;
};
var useMediaQuery = (queryOrBreakpoint, { direction = "up", defaultValue = false } = {}) => {
  const query = isBreakpoint(queryOrBreakpoint) ? getBreakpointQuery(queryOrBreakpoint, direction) : queryOrBreakpoint;
  const subscribe3 = useCallback4(
    (onChange) => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => void 0;
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  const getSnapshot = () => typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(query).matches : defaultValue;
  return useSyncExternalStore2(subscribe3, getSnapshot, () => defaultValue);
};

// src/hooks/usePageFocus.ts
import { useSyncExternalStore as useSyncExternalStore3 } from "react";
var isPageFocused = () => typeof document !== "undefined" && document.visibilityState === "visible" && document.hasFocus();
var subscribe2 = (onChange) => {
  window.addEventListener("focus", onChange);
  window.addEventListener("blur", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.removeEventListener("focus", onChange);
    window.removeEventListener("blur", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
};
var getServerSnapshot = () => true;
var usePageFocus = () => useSyncExternalStore3(subscribe2, isPageFocused, getServerSnapshot);

// src/hooks/useToggle.ts
import { useCallback as useCallback5, useState as useState5 } from "react";
var useToggle = (initialState = false) => {
  const [value, setValue] = useState5(initialState);
  const toggle = useCallback5((nextValue) => {
    if (typeof nextValue === "boolean") {
      setValue(nextValue);
    } else {
      setValue((prev) => !prev);
    }
  }, []);
  return [value, toggle];
};

// src/provider/UIProvider.tsx
import { createContext, useContext, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var browserNavigation = {
  back: () => {
    if (typeof window !== "undefined") window.history.back();
  },
  push: (url) => {
    if (typeof window !== "undefined") window.location.assign(url);
  }
};
var DEFAULT_UI = {
  linkComponent: "a",
  linkHrefProp: "href",
  imageComponent: "img",
  navigation: browserNavigation,
  iconAliases: {},
  icons: {}
};
var UIContext = createContext(DEFAULT_UI);
var UIProvider = ({
  children,
  linkComponent,
  linkHrefProp,
  imageComponent,
  navigation,
  iconAliases,
  icons
}) => {
  const parent = useContext(UIContext);
  const value = useMemo(
    () => ({
      linkComponent: linkComponent ?? parent.linkComponent,
      linkHrefProp: linkHrefProp ?? parent.linkHrefProp,
      imageComponent: imageComponent ?? parent.imageComponent,
      navigation: navigation ?? parent.navigation,
      iconAliases: iconAliases ? { ...parent.iconAliases, ...iconAliases } : parent.iconAliases,
      icons: icons ? { ...parent.icons, ...icons } : parent.icons
    }),
    [parent, linkComponent, linkHrefProp, imageComponent, navigation, iconAliases, icons]
  );
  return /* @__PURE__ */ jsx(UIContext.Provider, { value, children });
};
var useUI = () => useContext(UIContext);
var useLinkProps = (href, as) => {
  const { linkComponent, linkHrefProp } = useUI();
  if (as || !href) return { as, href };
  return linkComponent === "a" ? { as: "a", href } : { as: linkComponent, [linkHrefProp]: href };
};

// src/utils/mergeRefs.ts
var mergeRefs = (...refs) => {
  return (node) => {
    const cleanups = [];
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        const cleanup = ref(node);
        cleanups.push(typeof cleanup === "function" ? cleanup : () => ref(null));
      } else {
        ref.current = node;
        cleanups.push(() => {
          ref.current = null;
        });
      }
    }
    return () => cleanups.forEach((cleanup) => cleanup());
  };
};
export {
  UIProvider,
  formatDuration,
  getBreakpointQuery,
  isPageFocused,
  mergeRefs,
  useActionTimer,
  useClipboard,
  useCountdown,
  useDebouncedValue,
  useIsClient,
  useLinkProps,
  useMarkdownEditor,
  useMediaQuery,
  usePageFocus,
  useToggle,
  useUI
};
//# sourceMappingURL=index.js.map