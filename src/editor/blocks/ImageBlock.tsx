import { Button } from 'core-react/ui';
import { Icon } from 'core-react/icons';
import { Figure } from 'core-react/ui';
import { Image } from 'core-react/ui';
import { ChoiceField } from 'core-react/ui';
import { TextField } from 'core-react/ui';
import { Flex } from 'core-react/ui';
import type { BaseComponentProps } from 'core-react/ui';
import { useState } from 'react';
import { styled } from 'styled-components';
import type { MediaUploadHandler } from './MediaSourceField';
import { MediaSourceField } from './MediaSourceField';

export interface ImageBlockData {
  url: string;
  alt?: string;
  caption?: string;
  aspectRatio?: string;
}

export interface ImageBlockProps extends BaseComponentProps {
  data: ImageBlockData;
  onChange: (updated: ImageBlockData) => void;
  /** Téléversement réel du fichier ; sans lui, seule la saisie d'URL est proposée */
  onUpload?: MediaUploadHandler;
}

const ImagePreviewButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;

  &:hover img {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.base};
    outline-offset: 2px;
  }
`;

export const ImageBlock = ({ data, onChange, onUpload, ...rest }: ImageBlockProps) => {
  // L'image actuelle reste affichée (et enregistrée) tant qu'aucune nouvelle n'est choisie
  const [isReplacing, setIsReplacing] = useState(false);

  const selectImage = (url: string | undefined) => {
    if (!url) return;
    onChange({ ...data, url });
    setIsReplacing(false);
  };

  if (!data.url) {
    return (
      <MediaSourceField
        accept="image/*"
        label="Sélectionner une image"
        onUpload={onUpload}
        onSelect={([url]) => selectImage(url)}
        {...rest}
      />
    );
  }

  return (
    <Flex $direction="column" $gap="1rem" {...rest}>
      <Figure caption={data.caption} captionAlign="center">
        <ImagePreviewButton type="button" title="Changer l'image" onClick={() => setIsReplacing(true)}>
          <Image
            src={data.url}
            alt={data.alt || ''}
            $aspectRatio={data.aspectRatio || '16/9'}
            $fit="cover"
            $radius="base"
          />
        </ImagePreviewButton>
      </Figure>

      {isReplacing && (
        <Flex $direction="column" $gap="0.5rem">
          <MediaSourceField
            accept="image/*"
            label="Nouvelle image"
            onUpload={onUpload}
            onSelect={([url]) => selectImage(url)}
          />
          <Flex $justify="flex-end">
            <Button $variant="ghost" $size="sm" onClick={() => setIsReplacing(false)}>
              Annuler
            </Button>
          </Flex>
        </Flex>
      )}

      <Flex $gap="1rem" $wrap="wrap">
        <div style={{ flex: '1 1 240px' }}>
          <TextField
            label="Légende"
            placeholder="Texte affiché sous l'image…"
            value={data.caption || ''}
            onChange={(e) => onChange({ ...data, caption: e.target.value })}
          />
        </div>
        <div style={{ flex: '1 1 240px' }}>
          <TextField
            label="Texte alternatif (Alt)"
            placeholder="Description pour l'accessibilité…"
            value={data.alt || ''}
            onChange={(e) => onChange({ ...data, alt: e.target.value })}
          />
        </div>
      </Flex>

      <Flex $justify="space-between" $align="center" $gap="1rem" $wrap="wrap">
        <ChoiceField
          label="Format d'affichage"
          value={data.aspectRatio || '16/9'}
          onChange={(e) => onChange({ ...data, aspectRatio: e.target.value })}
        >
          <option value="16/9">16:9 (Standard)</option>
          <option value="4/3">4:3</option>
          <option value="1/1">1:1 (Carré)</option>
          <option value="21/9">21:9 (Bannière)</option>
        </ChoiceField>

        {!isReplacing && (
          <Button $variant="outline" $size="sm" onClick={() => setIsReplacing(true)}>
            <Icon name="image-edit-outline" size={16} />
            Changer l'image
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
