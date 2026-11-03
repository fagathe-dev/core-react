import type { MarkdownAction } from 'core-react';
import { useMarkdownEditor } from 'core-react';
import type { ChangeEvent } from 'react';
import { Fragment, useId } from 'react';
import { styled } from 'styled-components';
import { Icon } from 'core-react/icons';
import { MarkdownViewer } from '../../Content/MarkdownViewer';
import { HelperText } from '../HelperText';
import { Label } from '../Label';

const Field = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const Root = styled.div<{ $invalid: boolean }>`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid
    ${({ $invalid, theme }) => ($invalid ? theme.colors.danger.base : theme.colors.border.strong)};
  border-radius: ${({ theme }) => theme.radii.lg};

  &:has(> textarea:focus) {
    border-color: ${({ theme }) => theme.colors.primary.base};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.subtle};
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[1.5]} ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

const Modes = styled.div`
  display: inline-flex;
  padding: 2px;
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const ModeButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: 2px ${({ theme }) => theme.spacing[2]};
  font: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ $active, theme }) => ($active ? theme.colors.text.heading : theme.colors.text.muted)};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.background.surface : 'transparent')};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;
`;

const FormatButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
`;

const FormatButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  color: ${({ theme }) => theme.colors.text.body};
  background: none;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.text.heading};
    background-color: ${({ theme }) => theme.colors.background.surfaceActive};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.base};
    outline-offset: 1px;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Separator = styled.span`
  width: 1px;
  height: 18px;
  margin: 0 ${({ theme }) => theme.spacing[1]};
  background-color: ${({ theme }) => theme.colors.border.hover};
`;

const Input = styled.textarea`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.body};
  resize: vertical;
  background: transparent;
  border: 0;
  outline: none;

  &[hidden] {
    display: none;
  }
`;

const Preview = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.body};
`;

const Empty = styled.em`
  color: ${({ theme }) => theme.colors.text.muted};
`;

const ACTIONS: Record<MarkdownAction, { icon: string; label: string }> = {
  heading: { icon: 'heading', label: 'Titre' },
  bold: { icon: 'bold', label: 'Gras (Ctrl+B)' },
  italic: { icon: 'italic', label: 'Italique (Ctrl+I)' },
  strike: { icon: 'strikethrough', label: 'Barré' },
  highlight: { icon: 'highlighter', label: 'Surligné' },
  ul: { icon: 'list', label: 'Liste à puces' },
  ol: { icon: 'list-ordered', label: 'Liste numérotée' },
  task: { icon: 'list-checks', label: 'Liste de tâches' },
  quote: { icon: 'quote', label: 'Citation' },
  code: { icon: 'code', label: 'Code (Ctrl+E)' },
  codeblock: { icon: 'file-code', label: 'Bloc de code' },
  link: { icon: 'link', label: 'Lien (Ctrl+K)' },
};

const ALL_ACTIONS: (MarkdownAction | 'separator')[] = [
  'heading',
  'bold',
  'italic',
  'strike',
  'highlight',
  'separator',
  'ul',
  'ol',
  'task',
  'quote',
  'separator',
  'code',
  'codeblock',
  'link',
];

export interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  autoFocus?: boolean;
  /** Boutons affichés, dans l'ordre ; 'separator' insère un trait vertical. Tout par défaut. */
  actions?: (MarkdownAction | 'separator')[];
  'aria-label'?: string;
}

/**
 * Éditeur Markdown contrôlé, comme un <textarea> : value et onChange. L'aperçu passe par MarkdownContent,
 * qui ne peut pas exécuter de contenu saisi. Pour un autre rendu, utiliser directement useMarkdownEditor.
 */
export const MarkdownEditor = ({
  value,
  onChange,
  label,
  hint,
  error,
  required,
  placeholder,
  rows = 6,
  maxLength,
  autoFocus,
  actions = ALL_ACTIONS,
  'aria-label': ariaLabel,
}: MarkdownEditorProps) => {
  const id = useId();
  const { textareaRef, mode, setMode, applyAction, onKeyDown, previewMinHeight } = useMarkdownEditor();
  const isPreview = mode === 'preview';

  return (
    <Field>
      {label && (
        <Label htmlFor={id} $required={required}>
          {label}
        </Label>
      )}
      <Root $invalid={Boolean(error)}>
        <Toolbar>
          <Modes role="radiogroup" aria-label="Mode de l'éditeur">
            <ModeButton
              type="button"
              role="radio"
              aria-checked={!isPreview}
              $active={!isPreview}
              onClick={() => setMode('write')}
            >
              <Icon name="pencil" size={12} /> Écrire
            </ModeButton>
            <ModeButton
              type="button"
              role="radio"
              aria-checked={isPreview}
              $active={isPreview}
              onClick={() => setMode('preview')}
            >
              <Icon name="eye" size={12} /> Aperçu
            </ModeButton>
          </Modes>
          <FormatButtons role="toolbar" aria-label="Mise en forme">
            {actions.map((action, index) =>
              action === 'separator' ? (
                <Separator key={`separator-${index}`} aria-hidden="true" />
              ) : (
                <Fragment key={action}>
                  <FormatButton
                    type="button"
                    title={ACTIONS[action].label}
                    aria-label={ACTIONS[action].label}
                    disabled={isPreview}
                    onClick={() => applyAction(action)}
                  >
                    <Icon name={ACTIONS[action].icon} size={15} />
                  </FormatButton>
                </Fragment>
              ),
            )}
          </FormatButtons>
        </Toolbar>
        <Input
          id={id}
          ref={textareaRef}
          hidden={isPreview}
          value={value}
          rows={rows}
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label={label ? undefined : ariaLabel}
          aria-invalid={Boolean(error)}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
        />
        {isPreview && (
          <Preview style={{ minHeight: previewMinHeight }}>
            {value.trim() ? (
              <MarkdownViewer breaks>{value}</MarkdownViewer>
            ) : (
              <Empty>Rien à prévisualiser.</Empty>
            )}
          </Preview>
        )}
      </Root>
      {(error || hint) && <HelperText $state={error ? 'invalid' : undefined}>{error ?? hint}</HelperText>}
    </Field>
  );
};
