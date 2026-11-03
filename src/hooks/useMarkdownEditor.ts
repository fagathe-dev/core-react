import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

// Adaptation React de l'éditeur du design system (sf-p05-design-system, md-editor.ts).
// La saisie reste un <textarea> contrôlé : chaque action modifie le champ par execCommand, ce qui conserve
// l'historique natif (Ctrl+Z) et déclenche l'événement input, donc le onChange habituel de React.

export type MarkdownMode = 'write' | 'preview';

export type MarkdownAction =
  | 'bold'
  | 'italic'
  | 'strike'
  | 'highlight'
  | 'code'
  | 'codeblock'
  | 'link'
  | 'heading'
  | 'quote'
  | 'ul'
  | 'ol'
  | 'task';

interface WrapAction {
  before: string;
  after: string;
  placeholder: string;
}

interface LineAction {
  prefix: (index: number) => string;
  // Préfixe déjà présent : un second clic retire la mise en forme
  pattern: RegExp;
  // Remplace un titre ou une liste existants au lieu de s'y ajouter
  exclusive: boolean;
}

const WRAP_ACTIONS: Partial<Record<MarkdownAction, WrapAction>> = {
  bold: { before: '**', after: '**', placeholder: 'texte en gras' },
  italic: { before: '_', after: '_', placeholder: 'texte en italique' },
  strike: { before: '~~', after: '~~', placeholder: 'texte barré' },
  highlight: { before: '==', after: '==', placeholder: 'texte surligné' },
  code: { before: '`', after: '`', placeholder: 'code' },
  codeblock: { before: '```\n', after: '\n```', placeholder: 'code' },
  link: { before: '[', after: '](https://)', placeholder: 'texte du lien' },
};

const LIST_PATTERN = /^([-*+]|\d+\.) (\[[ xX]\] )?/;

const LINE_ACTIONS: Partial<Record<MarkdownAction, LineAction>> = {
  heading: { prefix: () => '## ', pattern: /^#{1,6} /, exclusive: true },
  quote: { prefix: () => '> ', pattern: /^> /, exclusive: false },
  ul: { prefix: () => '- ', pattern: /^[-*+] (?!\[[ xX]\] )/, exclusive: true },
  ol: { prefix: (index) => `${index + 1}. `, pattern: /^\d+\. /, exclusive: true },
  task: { prefix: () => '- [ ] ', pattern: /^[-*+] \[[ xX]\] /, exclusive: true },
};

const SHORTCUTS: Record<string, MarkdownAction> = { b: 'bold', i: 'italic', k: 'link', e: 'code' };

const replaceRange = (textarea: HTMLTextAreaElement, start: number, end: number, text: string): void => {
  textarea.focus();
  textarea.setSelectionRange(start, end);
  // execCommand (déprécié) garde l'historique Ctrl+Z ; absent (jsdom, futurs navigateurs) → repli setRangeText
  const inserted =
    typeof document.execCommand === 'function' && document.execCommand('insertText', false, text);
  if (!inserted) {
    textarea.setRangeText(text, start, end, 'end');
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }
};

const applyWrap = (
  textarea: HTMLTextAreaElement,
  name: MarkdownAction,
  { before, after, placeholder }: WrapAction,
): void => {
  const { selectionStart: start, selectionEnd: end, value } = textarea;
  const selected = value.slice(start, end);

  // Déjà entouré : on retire la mise en forme (sauf pour un lien)
  if (
    name !== 'link' &&
    value.slice(start - before.length, start) === before &&
    value.slice(end, end + after.length) === after
  ) {
    replaceRange(textarea, start - before.length, end + after.length, selected);
    textarea.setSelectionRange(start - before.length, end - before.length);

    return;
  }

  const text = selected || placeholder;
  replaceRange(textarea, start, end, `${before}${text}${after}`);

  const textStart = start + before.length;
  if (name === 'link' && selected) {
    // Le texte est déjà là : on sélectionne l'URL à saisir
    const urlStart = textStart + text.length + 2;
    textarea.setSelectionRange(urlStart, urlStart + 'https://'.length);
  } else {
    textarea.setSelectionRange(textStart, textStart + text.length);
  }
};

const applyLinePrefix = (textarea: HTMLTextAreaElement, { prefix, pattern, exclusive }: LineAction): void => {
  const { selectionStart, selectionEnd, value } = textarea;
  const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
  // Une sélection qui se termine en début de ligne n'inclut pas cette ligne
  const endIndex =
    selectionEnd > selectionStart && value[selectionEnd - 1] === '\n' ? selectionEnd - 1 : selectionEnd;
  const nextBreak = value.indexOf('\n', endIndex);
  const lineEnd = nextBreak === -1 ? value.length : nextBreak;

  const lines = value.slice(lineStart, lineEnd).split('\n');
  const filled = lines.filter((line) => line.trim() !== '');
  const remove = filled.length > 0 && filled.every((line) => pattern.test(line));

  let index = 0;
  const updated = lines
    .map((line) => {
      if (remove) return line.replace(pattern, '');
      if (line.trim() === '' && lines.length > 1) return line;
      const bare = exclusive ? line.replace(LIST_PATTERN, '').replace(/^#{1,6} /, '') : line;

      return `${prefix(index++)}${bare}`;
    })
    .join('\n');

  replaceRange(textarea, lineStart, lineEnd, updated);
  if (lines.length > 1) {
    textarea.setSelectionRange(lineStart, lineStart + updated.length);
  }
};

const runAction = (textarea: HTMLTextAreaElement, name: MarkdownAction): void => {
  const wrap = WRAP_ACTIONS[name];
  const line = LINE_ACTIONS[name];

  if (wrap) applyWrap(textarea, name, wrap);
  else if (line) applyLinePrefix(textarea, line);
};

// Entrée en fin d'élément de liste ou de citation : continue le bloc, ou le termine si l'élément est vide
const continueBlock = (textarea: HTMLTextAreaElement, event: KeyboardEvent<HTMLTextAreaElement>): void => {
  const { selectionStart: position, selectionEnd, value } = textarea;
  if (position !== selectionEnd) return;

  const lineStart = value.lastIndexOf('\n', position - 1) + 1;
  const line = value.slice(lineStart, position);
  const match = /^(\s*)(?:([-*+]) (\[[ xX]\] )?|(\d+)\. |> )/.exec(line);
  if (!match) return;

  event.preventDefault();

  if (line.trim() === match[0].trim()) {
    replaceRange(textarea, lineStart, position, '');

    return;
  }

  const [, indent, bullet, task, number] = match;
  let prefix = `${indent}> `;
  if (number) prefix = `${indent}${Number(number) + 1}. `;
  else if (bullet) prefix = `${indent}${bullet} ${task ? '[ ] ' : ''}`;

  replaceRange(textarea, position, position, `\n${prefix}`);
};

/**
 * Comportement de l'éditeur, sans aucun rendu : brancher `textareaRef` et `onKeyDown` sur un <textarea> contrôlé.
 * Le texte reste dans le state du composant appelant, comme pour n'importe quel champ React.
 */
export const useMarkdownEditor = ({ initialMode = 'write' }: { initialMode?: MarkdownMode } = {}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setModeState] = useState<MarkdownMode>(initialMode);
  const [previewMinHeight, setPreviewMinHeight] = useState<number | undefined>(undefined);
  const hasLeftPreview = useRef(false);

  // Retour de l'aperçu : le champ n'est focalisable qu'une fois de nouveau affiché
  useEffect(() => {
    if (mode === 'write' && hasLeftPreview.current) {
      hasLeftPreview.current = false;
      textareaRef.current?.focus();
    }
  }, [mode]);

  const setMode = useCallback((next: MarkdownMode) => {
    if (next === 'preview') {
      // Même hauteur que la saisie : le passage d'un mode à l'autre ne saute pas
      setPreviewMinHeight(textareaRef.current?.offsetHeight);
      hasLeftPreview.current = true;
    }
    setModeState(next);
  }, []);

  const applyAction = useCallback((name: MarkdownAction) => {
    if (textareaRef.current) runAction(textareaRef.current, name);
  }, []);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing) return;

    const action = SHORTCUTS[event.key.toLowerCase()];
    if ((event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && action) {
      event.preventDefault();
      runAction(event.currentTarget, action);

      return;
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      continueBlock(event.currentTarget, event);
    }
  }, []);

  return { textareaRef, mode, setMode, applyAction, onKeyDown, previewMinHeight };
};
