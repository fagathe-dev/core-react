import { useId, useState } from 'react';
import { styled } from 'styled-components';
import { useClipboard } from 'core-react';
import { Icon } from 'core-react/icons';
import type { BaseComponentProps } from '../../types';
import { Collapse } from './Collapse';

export interface CodeSnippetProps extends Omit<BaseComponentProps, 'children'> {
  /** Code affiché tel quel (texte échappé par React, jamais interprété). */
  code: string;
  /** Langage affiché dans l'en-tête et posé en `language-{lang}` sur `<code>` (défaut : `text`). */
  language?: string;
  /** Titre (nom de fichier…). */
  title?: string;
  /** Bouton « Copier » (défaut : `true`). */
  copyable?: boolean;
  /** Bouton « Réduire / Afficher » (défaut : `false`). */
  collapsible?: boolean;
  /** Replié au départ (avec `collapsible`). */
  defaultCollapsed?: boolean;
}

/**
 * Bloc de code avec en-tête (langage, titre) et actions (copier, réduire). Pour le Markdown, voir
 * `MarkdownViewer` ; pour l'éditeur de blocs, `CodeBlock` (core-react/editor).
 * Équivalent Design System : `.code-block`, `.code-header`, `.code-language`, `.code-title`, `.code-actions`, `.code-content`.
 */
export const CodeSnippet = ({
  code,
  language = 'text',
  title,
  copyable = true,
  collapsible = false,
  defaultCollapsed = false,
  ...rest
}: CodeSnippetProps) => {
  const { copy, isCopied } = useClipboard();
  const [open, setOpen] = useState(!defaultCollapsed);
  const contentId = useId();
  const safeLanguage = /^[a-z0-9+#-]+$/i.test(language) ? language : 'text';

  return (
    <Root {...rest}>
      <Header>
        <Language>{safeLanguage}</Language>
        {title && <Title>{title}</Title>}
        <Actions>
          {collapsible && (
            <ActionButton
              type="button"
              aria-expanded={open}
              aria-controls={contentId}
              onClick={() => setOpen((value) => !value)}
            >
              <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} />
              {open ? 'Réduire' : 'Afficher'}
            </ActionButton>
          )}
          {copyable && (
            <ActionButton type="button" $success={isCopied} onClick={() => void copy(code)}>
              <Icon name={isCopied ? 'check' : 'content-copy'} size={16} />
              <span aria-live="polite">{isCopied ? 'Copié' : 'Copier'}</span>
            </ActionButton>
          )}
        </Actions>
      </Header>
      <Collapse id={contentId} isOpen={!collapsible || open}>
        <Pre>
          <code className={`language-${safeLanguage}`}>{code.trim()}</code>
        </Pre>
      </Collapse>
    </Root>
  );
};

const Root = styled.div`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background.surface};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
`;

const Language = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-left: auto;
`;

const ActionButton = styled.button<{ $success?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  min-height: 2rem;
  padding: 0 ${({ theme }) => theme.spacing[2]};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: transparent;
  color: ${({ theme, $success }) => ($success ? theme.colors.success.base : theme.colors.text.muted)};
  font: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.surfaceActive};
    color: ${({ theme, $success }) => ($success ? theme.colors.success.base : theme.colors.text.heading)};
  }
`;

const Pre = styled.pre`
  margin: 0;
  padding: ${({ theme }) => theme.spacing[4]};
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};
  color: ${({ theme }) => theme.colors.text.heading};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  tab-size: 2;
`;
