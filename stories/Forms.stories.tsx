import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, userEvent, within } from 'storybook/test';
import {
  Checkbox,
  CheckField,
  ChoiceField,
  FileDropzone,
  Flex,
  HelperText,
  Input,
  InputAddon,
  InputGroup,
  Label,
  MarkdownEditor,
  Radio,
  Select,
  TagInput,
  type TagOption,
  Textarea,
  TextareaField,
  TextField,
  Toggle,
  ToggleField,
} from 'core-react/ui';
import { useState } from 'react';

const meta = {
  title: 'Forms/TextField',
  component: TextField,
  args: { label: 'Pseudo', placeholder: 'clara' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <TextField label="Requis" required placeholder="Votre pseudo" />
      <TextField label="Avec aide" hint="3 caractères minimum" />
      <TextField label="Valide" $validationState="valid" defaultValue="clara" />
      <TextField label="En erreur" error="Ce pseudo est déjà pris" defaultValue="clara" />
      <TextField label="Désactivé" disabled defaultValue="clara" />
    </div>
  ),
};

export const OtherFields: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <TextareaField label="Publication" placeholder="Quoi de neuf ?" />
      <ChoiceField label="Visibilité" defaultValue="public">
        <option value="public">Publique</option>
        <option value="private">Privée</option>
      </ChoiceField>
      <CheckField label="Recevoir les notifications" />
      <ToggleField label="Profil privé" />
    </div>
  ),
};

const TagInputExample = () => {
  const [tags, setTags] = useState<TagOption[]>([{ id: 'photo', label: 'Photographie' }]);
  return (
    <div style={{ maxWidth: 360 }}>
      <TagInput
        label="Tags"
        value={tags}
        onChange={setTags}
        allowCreate
        suggestions={[
          { id: 'rando', label: 'Randonnée' },
          { id: 'musique', label: 'Musique' },
        ]}
      />
    </div>
  );
};

export const Tags: Story = {
  render: () => <TagInputExample />,
};

export const Primitives: Story = {
  render: () => (
    <Flex $direction="column" $gap="0.75rem" style={{ maxWidth: 360 }}>
      <div>
        <Label htmlFor="primitive-input" $required>
          Pseudo
        </Label>
        <Input id="primitive-input" $validationState="invalid" defaultValue="clara" />
        <HelperText $state="invalid">Ce pseudo est déjà pris</HelperText>
      </div>
      <Select aria-label="Visibilité" defaultValue="public">
        <option value="public">Publique</option>
        <option value="private">Privée</option>
      </Select>
      <Textarea aria-label="Publication" defaultValue="Quoi de neuf ?" />
      <Flex $gap="1rem" $align="center">
        <Checkbox aria-label="Case à cocher" defaultChecked />
        <Radio aria-label="Bouton radio" defaultChecked />
        <Toggle aria-label="Interrupteur" defaultChecked />
      </Flex>
    </Flex>
  ),
};

export const Groups: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <InputGroup leftAddon="@" rightAddon={<InputAddon>.gather</InputAddon>}>
        <Input aria-label="Identifiant" defaultValue="clara" />
      </InputGroup>
    </div>
  ),
};

export const Dropzone: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <FileDropzone
        label="Média"
        accept="image/*"
        maxSizeMb={5}
        hint="PNG ou JPG, 5 Mo maximum"
        onFilesSelected={() => {}}
      />
    </div>
  ),
};

const ControlledMarkdownEditor = ({ initial = '' }: { initial?: string }) => {
  const [value, setValue] = useState(initial);

  return (
    <div style={{ maxWidth: 640 }}>
      <MarkdownEditor
        label="Description"
        value={value}
        onChange={setValue}
        rows={6}
        placeholder="Écrivez en Markdown…"
        hint="Ctrl+B, Ctrl+I, Ctrl+K, Ctrl+E."
      />
      <output data-testid="value" style={{ whiteSpace: 'pre-wrap' }}>
        {value}
      </output>
    </div>
  );
};

export const MarkdownEditorDefault: Story = {
  render: () => (
    <ControlledMarkdownEditor
      initial={
        '# Notes de version\n\nCette version apporte le **thème sombre** et un ==nouvel éditeur==.\n\n- Raccourcis clavier\n- Aperçu'
      }
    />
  ),
};

export const MarkdownEditorActions: Story = {
  render: () => <ControlledMarkdownEditor />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Description');
    const value = canvas.getByTestId('value');

    // Le texte passe par le state : le onChange reçoit chaque action
    await userEvent.click(canvas.getByRole('button', { name: /Gras/ }));
    await expect(value).toHaveTextContent('**texte en gras**');

    // Un second clic retire la mise en forme
    await userEvent.click(canvas.getByRole('button', { name: /Gras/ }));
    await expect(value.textContent).toBe('texte en gras');

    // Entrée continue une liste, puis la termine sur un élément vide. execCommand imite la frappe réelle :
    // userEvent.type garde sa propre copie de la valeur et écraserait le préfixe ajouté par l'éditeur
    const textarea = input as HTMLTextAreaElement;
    textarea.focus();
    textarea.select();
    document.execCommand('delete');
    await userEvent.click(canvas.getByRole('button', { name: 'Liste à puces' }));
    document.execCommand('insertText', false, 'un');
    fireEvent.keyDown(textarea, { key: 'Enter' });
    await expect(value.textContent).toBe('- un\n- ');
    fireEvent.keyDown(textarea, { key: 'Enter' });
    await expect(value.textContent).toBe('- un\n');

    // L'aperçu remplace la saisie, puis lui rend la main
    await userEvent.click(canvas.getByRole('radio', { name: /Aperçu/ }));
    await expect(canvas.getByRole('listitem')).toHaveTextContent('un');
    await userEvent.click(canvas.getByRole('radio', { name: /Écrire/ }));
    await expect(input).toHaveFocus();
  },
};
