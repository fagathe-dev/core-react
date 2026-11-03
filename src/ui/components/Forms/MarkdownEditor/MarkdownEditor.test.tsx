import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../../../../testing/renderWithTheme';
import { MarkdownEditor } from './MarkdownEditor';

const Controlled = ({ initial = '' }: { initial?: string }) => {
  const [value, setValue] = useState(initial);
  return <MarkdownEditor label="Contenu" value={value} onChange={setValue} />;
};

const textarea = () => screen.getByLabelText('Contenu') as HTMLTextAreaElement;

describe('MarkdownEditor', () => {
  it('met la sélection en gras, puis retire le gras au second clic', () => {
    renderWithTheme(<Controlled initial="bonjour" />);
    textarea().setSelectionRange(0, 7);

    fireEvent.click(screen.getByRole('button', { name: 'Gras (Ctrl+B)' }));
    expect(textarea().value).toBe('**bonjour**');

    fireEvent.click(screen.getByRole('button', { name: 'Gras (Ctrl+B)' }));
    expect(textarea().value).toBe('bonjour');
  });

  it('insère un texte d’exemple sans sélection et préfixe les lignes (liste)', () => {
    renderWithTheme(<Controlled initial={'a\nb'} />);
    textarea().setSelectionRange(0, 3);

    fireEvent.click(screen.getByRole('button', { name: 'Liste à puces' }));
    expect(textarea().value).toBe('- a\n- b');
  });

  it('applique les raccourcis clavier (Ctrl+I)', () => {
    renderWithTheme(<Controlled initial="mot" />);
    textarea().setSelectionRange(0, 3);

    fireEvent.keyDown(textarea(), { key: 'i', ctrlKey: true });
    expect(textarea().value).toBe('_mot_');
  });

  it('continue une liste sur Entrée', () => {
    renderWithTheme(<Controlled initial="- un" />);
    textarea().setSelectionRange(4, 4);

    fireEvent.keyDown(textarea(), { key: 'Enter' });
    expect(textarea().value).toBe('- un\n- ');
  });

  it("affiche l'aperçu sûr et désactive la barre d'outils en mode aperçu", () => {
    renderWithTheme(<Controlled initial={'**fort** <script>alert(1)</script>'} />);

    fireEvent.click(screen.getByRole('radio', { name: /Aperçu/ }));

    expect(screen.getByText('fort').tagName).toBe('STRONG');
    expect(document.querySelector('script')).toBeNull();
    expect(screen.getByRole('button', { name: 'Gras (Ctrl+B)' })).toBeDisabled();
  });
});
