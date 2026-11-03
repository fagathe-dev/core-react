import { TextareaField } from 'core-react/ui';
import { TextField } from 'core-react/ui';
import { Flex } from 'core-react/ui';
import type { BaseComponentProps } from 'core-react/ui';

export interface QuoteBlockData {
  text: string;
  author?: string;
  source?: string;
}

export interface QuoteBlockProps extends BaseComponentProps {
  data: QuoteBlockData;
  onChange: (updated: QuoteBlockData) => void;
}

export const QuoteBlock = ({ data, onChange, ...rest }: QuoteBlockProps) => (
  <Flex $direction="column" $gap="0" {...rest}>
    <TextareaField
      label="Citation"
      rows={3}
      placeholder="« La simplicité est la sophistication suprême. »"
      value={data.text || ''}
      onChange={(e) => onChange({ ...data, text: e.target.value })}
    />
    <Flex $gap="1rem" $wrap="wrap">
      <div style={{ flex: '1 1 220px' }}>
        <TextField
          label="Auteur"
          placeholder="Ex : Léonard de Vinci"
          value={data.author || ''}
          onChange={(e) => onChange({ ...data, author: e.target.value })}
        />
      </div>
      <div style={{ flex: '1 1 220px' }}>
        <TextField
          label="Source (URL ou ouvrage)"
          placeholder="Ex : https://…"
          value={data.source || ''}
          onChange={(e) => onChange({ ...data, source: e.target.value })}
        />
      </div>
    </Flex>
  </Flex>
);
