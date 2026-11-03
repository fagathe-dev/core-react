import { highlightExtension } from 'core-ts';
import { Marked, type MarkedExtension, type Token, type Tokens } from 'marked';
import { Fragment, useMemo, type ElementType, type ReactNode } from 'react';
import { styled } from 'styled-components';

export interface MarkdownOptions {
  /** Affiche les images (désactivé par défaut : une image distante révèle l'IP du lecteur). */
  allowImages?: boolean;
  /** Décale les titres (`#` → h1 + offset). Le social utilise 2 : la page porte déjà ses titres. */
  headingOffset?: 0 | 1 | 2;
  /** Retour à la ligne simple = `<br>` (GFM `breaks`). */
  breaks?: boolean;
  /** Cible des liens externes (défaut : `_blank`). Les liens relatifs et ancres restent dans l'onglet. */
  linkTarget?: '_blank' | '_self';
}

const parsers = new Map<boolean, Marked>();
const getParser = (breaks: boolean): Marked => {
  let parser = parsers.get(breaks);
  if (!parser) {
    // Instance dédiée : l'instance globale de `marked` n'est jamais modifiée
    parser = new Marked({ gfm: true, breaks }, highlightExtension as MarkedExtension);
    parsers.set(breaks, parser);
  }
  return parser;
};

/** Jetons Markdown (rendu non HTML : React, export…). */
export const parseMarkdown = (
  source: string,
  { breaks = false }: Pick<MarkdownOptions, 'breaks'> = {},
): Token[] => getParser(breaks).lexer(source);

const EXTERNAL_URL = /^(https?:|mailto:)/i;
const isSafeUrl = (url: string): boolean => EXTERNAL_URL.test(url) || /^(\/(?!\/)|#|\.{0,2}\/)/.test(url);

export const Prose = styled.div`
  overflow-wrap: anywhere;
  line-height: ${({ theme }) => theme.typography.lineHeights?.relaxed ?? 1.6};

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }

  p,
  ul,
  ol,
  pre,
  blockquote,
  table {
    margin: 0 0 ${({ theme }) => theme.spacing[2]};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: ${({ theme }) => theme.spacing[3]} 0 ${({ theme }) => theme.spacing[1.5]};
    font-size: ${({ theme }) => theme.typography.sizes.base};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }

  ul,
  ol {
    padding-left: ${({ theme }) => theme.spacing[5]};
  }

  li:has(> input[type='checkbox']) {
    margin-left: -${({ theme }) => theme.spacing[5]};
    list-style: none;
  }

  li > input[type='checkbox'] {
    margin-right: ${({ theme }) => theme.spacing[1.5]};
  }

  a {
    color: ${({ theme }) => theme.colors.primary.base};
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.radii.md};
  }

  blockquote {
    padding-left: ${({ theme }) => theme.spacing[3]};
    color: ${({ theme }) => theme.colors.text.muted};
    border-left: 3px solid ${({ theme }) => theme.colors.border.hover};
  }

  code {
    padding: 1px 4px;
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: 0.9em;
    background-color: ${({ theme }) => theme.colors.background.surfaceActive};
    border-radius: ${({ theme }) => theme.radii.sm};
  }

  pre {
    padding: ${({ theme }) => theme.spacing[3]};
    overflow-x: auto;
    background-color: ${({ theme }) => theme.colors.background.surfaceActive};
    border-radius: ${({ theme }) => theme.radii.md};
  }

  pre code {
    padding: 0;
    background: none;
  }

  mark {
    padding: 0 2px;
    color: ${({ theme }) => theme.colors.warning.dark};
    background-color: ${({ theme }) => theme.colors.warning.subtle};
    border-radius: ${({ theme }) => theme.radii.sm};
  }

  table {
    display: block;
    overflow-x: auto;
    border-collapse: collapse;
  }

  th,
  td {
    padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
    border: 1px solid ${({ theme }) => theme.colors.border.default};
  }

  hr {
    margin: ${({ theme }) => theme.spacing[3]} 0;
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  }
`;

type RenderOptions = Required<Omit<MarkdownOptions, 'breaks'>>;

/**
 * Jetons → éléments React. Aucun `innerHTML` : le texte (y compris `code`, `codespan` et le HTML brut)
 * est passé en enfant, donc échappé par React. Seuls http(s), mailto, chemins relatifs et ancres sont actifs.
 */
export const renderMarkdownTokens = (tokens: Token[], options: RenderOptions): ReactNode => {
  const children = (inner: Token[] | undefined, fallback?: string): ReactNode =>
    inner ? renderMarkdownTokens(inner, options) : fallback;

  const renderListItem = (item: Tokens.ListItem, key: number): ReactNode => {
    const hasCheckbox = item.tokens.some((token) => token.type === 'checkbox');
    return (
      <li key={key}>
        {item.task && !hasCheckbox && (
          <input type="checkbox" checked={item.checked === true} disabled readOnly />
        )}
        {renderMarkdownTokens(item.tokens, options)}
      </li>
    );
  };

  return tokens.map((token, key): ReactNode => {
    switch (token.type) {
      case 'space':
      case 'def':
        return null;
      case 'paragraph':
        return (
          <p key={key}>{children((token as Tokens.Paragraph).tokens, (token as Tokens.Paragraph).text)}</p>
        );
      case 'heading': {
        const heading = token as Tokens.Heading;
        const Heading = `h${Math.min(heading.depth + options.headingOffset, 6)}` as ElementType;
        return <Heading key={key}>{children(heading.tokens, heading.text)}</Heading>;
      }
      case 'text': {
        const text = token as Tokens.Text;
        return <Fragment key={key}>{children(text.tokens, text.text)}</Fragment>;
      }
      case 'strong':
        return <strong key={key}>{children((token as Tokens.Strong).tokens)}</strong>;
      case 'em':
        return <em key={key}>{children((token as Tokens.Em).tokens)}</em>;
      case 'del':
        return <del key={key}>{children((token as Tokens.Del).tokens)}</del>;
      case 'highlight':
        return <mark key={key}>{children((token as Tokens.Generic).tokens)}</mark>;
      case 'codespan':
        return <code key={key}>{(token as Tokens.Codespan).text}</code>;
      case 'code': {
        const code = token as Tokens.Code;
        const lang = code.lang && /^[a-z0-9+#-]+$/i.test(code.lang) ? code.lang : undefined;
        return (
          <pre key={key}>
            <code className={lang ? `language-${lang}` : undefined}>{code.text}</code>
          </pre>
        );
      }
      case 'br':
        return <br key={key} />;
      case 'hr':
        return <hr key={key} />;
      case 'blockquote':
        return <blockquote key={key}>{children((token as Tokens.Blockquote).tokens)}</blockquote>;
      case 'list': {
        const list = token as Tokens.List;
        const List = list.ordered ? 'ol' : 'ul';
        return (
          <List key={key} start={list.ordered && list.start !== 1 ? Number(list.start) : undefined}>
            {list.items.map(renderListItem)}
          </List>
        );
      }
      case 'checkbox':
        return (
          <input
            key={key}
            type="checkbox"
            checked={(token as Tokens.Generic).checked === true}
            disabled
            readOnly
          />
        );
      case 'link': {
        const link = token as Tokens.Link;
        if (!isSafeUrl(link.href)) return <Fragment key={key}>{children(link.tokens, link.text)}</Fragment>;
        const external = EXTERNAL_URL.test(link.href);
        return (
          <a
            key={key}
            href={link.href}
            title={link.title ?? undefined}
            target={external ? options.linkTarget : undefined}
            rel={external ? 'noopener noreferrer nofollow ugc' : undefined}
          >
            {children(link.tokens, link.text)}
          </a>
        );
      }
      case 'image': {
        const image = token as Tokens.Image;
        if (!options.allowImages || !isSafeUrl(image.href))
          return <Fragment key={key}>{image.text}</Fragment>;
        return (
          <img key={key} src={image.href} alt={image.text} title={image.title ?? undefined} loading="lazy" />
        );
      }
      case 'table': {
        const table = token as Tokens.Table;
        return (
          <table key={key}>
            <thead>
              <tr>
                {table.header.map((cell, index) => (
                  <th key={index} style={cell.align ? { textAlign: cell.align } : undefined}>
                    {renderMarkdownTokens(cell.tokens, options)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, index) => (
                    <td key={index} style={cell.align ? { textAlign: cell.align } : undefined}>
                      {renderMarkdownTokens(cell.tokens, options)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      // HTML brut et jetons inconnus : affichés comme du texte, jamais interprétés
      default:
        return (
          <Fragment key={key}>
            {'text' in token && typeof token.text === 'string' ? token.text : token.raw}
          </Fragment>
        );
    }
  });
};

/** Rendu React mémoïsé d'une source Markdown. */
export const useMarkdown = (
  source: string,
  { allowImages = false, headingOffset = 0, breaks = false, linkTarget = '_blank' }: MarkdownOptions = {},
): ReactNode =>
  useMemo(
    () => renderMarkdownTokens(parseMarkdown(source, { breaks }), { allowImages, headingOffset, linkTarget }),
    [source, allowImages, headingOffset, breaks, linkTarget],
  );

export interface MarkdownViewerProps extends MarkdownOptions {
  children: string;
  className?: string;
}

/**
 * Affiche du Markdown de façon sûre (aucun HTML injecté). Utilisable en Server Component si le module
 * qui l'importe n'est pas marqué client (rendu pur).
 */
export const MarkdownViewer = ({ children, className, ...options }: MarkdownViewerProps) => (
  <Prose className={className}>{useMarkdown(children, options)}</Prose>
);

export type MarkdownContentProps = MarkdownViewerProps;

/** Alias historique du social : titres décalés de 2 niveaux, retours à la ligne conservés. */
export const MarkdownContent = ({ headingOffset = 2, breaks = true, ...props }: MarkdownContentProps) => (
  <MarkdownViewer headingOffset={headingOffset} breaks={breaks} {...props} />
);
