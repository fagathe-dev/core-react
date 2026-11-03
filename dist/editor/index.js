'use client';

// src/editor/blocks/blockItemId.ts
var createBlockItemId = () => typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2, 11);

// src/editor/blocks/blockDefaults.ts
var DEFAULT_CMS_BLOCKS = [
  { type: "text", label: "Texte", icon: "format-pilcrow", description: "Paragraphes en Markdown" },
  { type: "image", label: "Image", icon: "image-outline", description: "Image avec l\xE9gende" },
  { type: "code", label: "Code", icon: "code-tags", description: "Extrait de code source" },
  { type: "quote", label: "Citation", icon: "format-quote-close", description: "Citation et auteur" },
  { type: "video", label: "Vid\xE9o", icon: "video-outline", description: "Fichier ou URL vid\xE9o" },
  { type: "gallery", label: "Galerie", icon: "view-grid-outline", description: "Grille d'images" },
  { type: "carousel", label: "Carrousel", icon: "view-carousel-outline", description: "Diaporama d\u2019images" },
  { type: "table", label: "Tableau", icon: "table", description: "Donn\xE9es en lignes et colonnes" },
  { type: "faq", label: "FAQ", icon: "help-circle-outline", description: "Questions / r\xE9ponses" },
  { type: "cta", label: "Appel \xE0 l\u2019action", icon: "bullhorn-outline", description: "Encart avec bouton" }
];
var DEFAULT_TEXT_BLOCK_DATA = { content: "" };
var DEFAULT_IMAGE_BLOCK_DATA = {
  url: "",
  alt: "",
  caption: "",
  aspectRatio: "16/9"
};
var DEFAULT_VIDEO_BLOCK_DATA = { url: "", caption: "", aspectRatio: "16/9" };
var DEFAULT_CAROUSEL_BLOCK_DATA = {
  slides: [],
  aspectRatio: "16/9",
  autoplay: false,
  slideInterval: 4e3
};
var DEFAULT_GALLERY_BLOCK_DATA = { images: [], columns: 3 };
var DEFAULT_CODE_BLOCK_DATA = { language: "typescript", code: "", filename: "" };
var DEFAULT_QUOTE_BLOCK_DATA = { text: "", author: "", source: "" };
var DEFAULT_TABLE_BLOCK_DATA = {
  rows: [
    ["Colonne 1", "Colonne 2"],
    ["", ""]
  ],
  hasHeader: true,
  caption: ""
};
var createDefaultFaqBlockData = () => ({
  items: [{ id: createBlockItemId(), question: "", answer: "" }]
});
var DEFAULT_CTA_BLOCK_DATA = {
  title: "",
  description: "",
  buttonLabel: "",
  buttonUrl: "",
  variant: "primary"
};
var CODE_LANGUAGES = [
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "tsx", label: "TSX / JSX" },
  { value: "php", label: "PHP" },
  { value: "twig", label: "Twig" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS / SCSS" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash / Shell" },
  { value: "plaintext", label: "Texte brut" }
];

// src/editor/blocks/BlockPicker.tsx
import { Button } from "core-react/ui";
import { Icon } from "core-react/icons";
import { useState } from "react";
import { styled } from "styled-components";
import { jsx, jsxs } from "react/jsx-runtime";
var PickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${({ theme, $inline }) => $inline ? `-${theme.spacing[2]} 0` : `${theme.spacing[3]} 0`};
`;
var InlineTrigger = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ theme }) => theme.spacing[6]};
  /* Discret entre les blocs, visible au survol ou au focus clavier */
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  transition: opacity 0.15s ease;

  &:hover,
  &:focus-within {
    opacity: 1;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 50% 0 auto;
    border-top: 1px dashed ${({ theme }) => theme.colors.primary.base};
  }
`;
var InlineButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.primary.base};
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.primary.base};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.subtle};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.base};
    outline-offset: 2px;
  }
`;
var GridMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[2.5]};
  padding: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.base};
`;
var BlockOptionBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1.5]};
  padding: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.base};
  color: ${({ theme }) => theme.colors.text.body};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.base};
    background-color: ${({ theme }) => theme.colors.primary.subtle};
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;
var OptionDescription = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.text.muted};
  text-align: center;
`;
var BlockPicker = ({
  onSelectBlock,
  availableBlocks = DEFAULT_CMS_BLOCKS,
  variant = "button",
  inlineLabel = "Ins\xE9rer un bloc ici",
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isInline = variant === "inline";
  return /* @__PURE__ */ jsxs(PickerContainer, { $inline: isInline, ...rest, children: [
    isInline ? /* @__PURE__ */ jsx(InlineTrigger, { $isOpen: isOpen, children: /* @__PURE__ */ jsx(
      InlineButton,
      {
        type: "button",
        "aria-label": isOpen ? "Fermer" : inlineLabel,
        "aria-expanded": isOpen,
        title: isOpen ? "Fermer" : inlineLabel,
        onClick: () => setIsOpen((prev) => !prev),
        children: /* @__PURE__ */ jsx(Icon, { name: isOpen ? "close" : "plus", size: 16 })
      }
    ) }) : /* @__PURE__ */ jsxs(
      Button,
      {
        $variant: isOpen ? "secondary" : "outline",
        $size: "sm",
        onClick: () => setIsOpen((prev) => !prev),
        children: [
          /* @__PURE__ */ jsx(Icon, { name: isOpen ? "close" : "plus", size: 16 }),
          isOpen ? "Fermer" : "Ajouter un bloc de contenu"
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx(GridMenu, { children: availableBlocks.map((b) => /* @__PURE__ */ jsxs(
      BlockOptionBtn,
      {
        type: "button",
        onClick: () => {
          onSelectBlock(b.type);
          setIsOpen(false);
        },
        children: [
          /* @__PURE__ */ jsx(Icon, { name: b.icon, size: 22 }),
          /* @__PURE__ */ jsx("span", { children: b.label }),
          b.description && /* @__PURE__ */ jsx(OptionDescription, { children: b.description })
        ]
      },
      b.type
    )) })
  ] });
};

// src/editor/blocks/BlockWrapper.tsx
import { Badge } from "core-react/ui";
import { Icon as Icon2 } from "core-react/icons";
import { IconButton } from "core-react/ui";
import "react";
import { styled as styled2 } from "styled-components";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Shell = styled2.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.base};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover,
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.base};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  ${({ $isDragging, theme }) => $isDragging && `
    border-color: ${theme.colors.primary.base};
    box-shadow: ${theme.shadows.lg};
    opacity: 0.95;
  `}
`;
var Toolbar = styled2.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[3]}`};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`;
var LeftGroup = styled2.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;
var DragHandle = styled2.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.text.muted};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: grab;
  /* Laisse le geste tactile au glisser-déposer plutôt qu'au défilement de la page */
  touch-action: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text.body};
  }

  &:active {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.base};
    outline-offset: 2px;
  }
`;
var RightActions = styled2.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;
var Body = styled2.div`
  padding: ${({ theme }) => theme.spacing[4]};
`;
var BlockWrapper = ({
  blockType,
  blockLabel,
  position,
  isFirst = false,
  isLast = false,
  onMoveUp,
  onMoveDown,
  onDelete,
  onOpenSettings,
  dragHandleProps,
  dragHandleRef,
  isDragging = false,
  children,
  ...rest
}) => {
  return /* @__PURE__ */ jsxs2(Shell, { $isDragging: isDragging, ...rest, children: [
    /* @__PURE__ */ jsxs2(Toolbar, { children: [
      /* @__PURE__ */ jsxs2(LeftGroup, { children: [
        dragHandleProps && /* @__PURE__ */ jsx2(DragHandle, { ref: dragHandleRef, title: "Glisser pour d\xE9placer", ...dragHandleProps, children: /* @__PURE__ */ jsx2(Icon2, { name: "drag-vertical", size: 18 }) }),
        /* @__PURE__ */ jsxs2(Badge, { $variant: "neutral", children: [
          "#",
          position
        ] }),
        /* @__PURE__ */ jsx2(Badge, { $variant: "primary", $pill: true, children: blockLabel ?? blockType.toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxs2(RightActions, { children: [
        onMoveUp && /* @__PURE__ */ jsx2(
          IconButton,
          {
            name: "arrow-up",
            size: "sm",
            "aria-label": "Monter le bloc",
            disabled: isFirst,
            onClick: onMoveUp
          }
        ),
        onMoveDown && /* @__PURE__ */ jsx2(
          IconButton,
          {
            name: "arrow-down",
            size: "sm",
            "aria-label": "Descendre le bloc",
            disabled: isLast,
            onClick: onMoveDown
          }
        ),
        onOpenSettings && /* @__PURE__ */ jsx2(
          IconButton,
          {
            name: "cog-outline",
            size: "sm",
            "aria-label": "Param\xE8tres du bloc",
            onClick: onOpenSettings
          }
        ),
        onDelete && /* @__PURE__ */ jsx2(
          IconButton,
          {
            name: "trash-can-outline",
            size: "sm",
            variant: "danger",
            "aria-label": "Supprimer le bloc",
            onClick: onDelete
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx2(Body, { children })
  ] });
};

// src/editor/blocks/CarouselBlock.tsx
import { IconButton as IconButton2 } from "core-react/ui";
import { Carousel } from "core-react/ui";
import { Image } from "core-react/ui";
import { ChoiceField } from "core-react/ui";
import { TextField as TextField2 } from "core-react/ui";
import { ToggleField } from "core-react/ui";
import { Flex as Flex2 } from "core-react/ui";
import { styled as styled3 } from "styled-components";

// src/editor/blocks/MediaSourceField.tsx
import { Button as Button2 } from "core-react/ui";
import { Alert } from "core-react/ui";
import { TextField } from "core-react/ui";
import { FileDropzone } from "core-react/ui";
import { Flex } from "core-react/ui";
import { useState as useState2 } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var MediaSourceField = ({
  onSelect,
  onUpload,
  accept = "image/*",
  label = "S\xE9lectionner un fichier",
  maxSizeMb = 10,
  multiple = false,
  urlLabel = "Ou renseigner l'URL directe",
  urlPlaceholder = "https://\u2026",
  uploadUnavailableHint,
  ...rest
}) => {
  const [url, setUrl] = useState2("");
  const [isUploading, setIsUploading] = useState2(false);
  const [error, setError] = useState2(null);
  const handleFiles = async (files) => {
    if (!onUpload || files.length === 0) return;
    setError(null);
    setIsUploading(true);
    try {
      const urls = [];
      for (const file of files) {
        urls.push(await onUpload(file));
      }
      onSelect(urls);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du t\xE9l\xE9versement");
    } finally {
      setIsUploading(false);
    }
  };
  const submitUrl = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    onSelect([trimmed]);
    setUrl("");
  };
  return /* @__PURE__ */ jsxs3(Flex, { $direction: "column", $gap: "0.75rem", ...rest, children: [
    onUpload ? /* @__PURE__ */ jsx3(
      FileDropzone,
      {
        accept,
        label,
        multiple,
        maxSizeMb,
        disabled: isUploading,
        hint: isUploading ? "T\xE9l\xE9versement en cours\u2026" : void 0,
        onFilesSelected: handleFiles
      }
    ) : uploadUnavailableHint && /* @__PURE__ */ jsx3(Alert, { variant: "info", children: uploadUnavailableHint }),
    error && /* @__PURE__ */ jsx3(Alert, { variant: "danger", onClose: () => setError(null), children: error }),
    /* @__PURE__ */ jsxs3(Flex, { $align: "flex-end", $gap: "0.5rem", children: [
      /* @__PURE__ */ jsx3("div", { style: { flex: 1 }, children: /* @__PURE__ */ jsx3(
        TextField,
        {
          label: urlLabel,
          type: "url",
          placeholder: urlPlaceholder,
          value: url,
          onChange: (e) => setUrl(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitUrl();
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsx3(
        Button2,
        {
          $variant: "outline",
          onClick: submitUrl,
          disabled: !url.trim(),
          style: { marginBottom: "1rem" },
          children: "Utiliser"
        }
      )
    ] })
  ] });
};

// src/editor/blocks/CarouselBlock.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var SlideRow = styled3.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-radius: ${({ theme }) => theme.radii.base};

  & > div {
    flex: 1;
    margin-bottom: 0;
  }
`;
var CarouselBlock = ({ data, onChange, onUpload, ...rest }) => {
  const slides = data.slides || [];
  const autoplay = data.autoplay ?? false;
  const slideInterval = data.slideInterval ?? 4e3;
  const addSlides = (urls) => {
    const newItems = urls.map((url) => ({ id: createBlockItemId(), url, caption: "" }));
    onChange({ ...data, slides: [...slides, ...newItems] });
  };
  const removeSlide = (id) => {
    onChange({ ...data, slides: slides.filter((s) => s.id !== id) });
  };
  const updateSlideCaption = (id, caption) => {
    onChange({
      ...data,
      slides: slides.map((s) => s.id === id ? { ...s, caption } : s)
    });
  };
  return /* @__PURE__ */ jsxs4(Flex2, { $direction: "column", $gap: "1rem", ...rest, children: [
    slides.length > 0 && /* @__PURE__ */ jsx4(Carousel, { aspectRatio: data.aspectRatio || "16/9", autoplay, slideInterval, children: slides.map((slide) => /* @__PURE__ */ jsx4(Carousel.Item, { children: /* @__PURE__ */ jsx4(
      Image,
      {
        src: slide.url,
        alt: slide.caption || "",
        $fit: "cover",
        style: { width: "100%", height: "100%" }
      }
    ) }, slide.id)) }),
    /* @__PURE__ */ jsxs4(Flex2, { $align: "flex-end", $gap: "1rem", $wrap: "wrap", children: [
      /* @__PURE__ */ jsxs4(
        ChoiceField,
        {
          label: "Ratio",
          value: data.aspectRatio || "16/9",
          onChange: (e) => onChange({ ...data, aspectRatio: e.target.value }),
          children: [
            /* @__PURE__ */ jsx4("option", { value: "16/9", children: "16:9" }),
            /* @__PURE__ */ jsx4("option", { value: "4/3", children: "4:3" }),
            /* @__PURE__ */ jsx4("option", { value: "21/9", children: "21:9" })
          ]
        }
      ),
      /* @__PURE__ */ jsx4(
        ToggleField,
        {
          label: "D\xE9filement automatique",
          checked: autoplay,
          onChange: (e) => onChange({ ...data, autoplay: e.target.checked })
        }
      ),
      autoplay && /* @__PURE__ */ jsx4(
        TextField2,
        {
          type: "number",
          label: "Intervalle (ms)",
          min: 1e3,
          step: 500,
          value: slideInterval,
          onChange: (e) => onChange({ ...data, slideInterval: Number(e.target.value) || 4e3 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx4(
      MediaSourceField,
      {
        multiple: true,
        accept: "image/*",
        label: "Ajouter des diapositives au carrousel",
        urlLabel: "Ou ajouter une image par URL",
        onUpload,
        onSelect: addSlides
      }
    ),
    slides.length > 0 && /* @__PURE__ */ jsx4(Flex2, { $direction: "column", $gap: "0.5rem", children: slides.map((s, idx) => /* @__PURE__ */ jsxs4(SlideRow, { children: [
      /* @__PURE__ */ jsx4(Image, { src: s.url, width: 48, height: 36, $fit: "cover", $radius: "sm", alt: "" }),
      /* @__PURE__ */ jsx4(
        TextField2,
        {
          "aria-label": `L\xE9gende de la diapositive ${idx + 1}`,
          placeholder: `L\xE9gende diapositive #${idx + 1}`,
          value: s.caption || "",
          onChange: (e) => updateSlideCaption(s.id, e.target.value)
        }
      ),
      /* @__PURE__ */ jsx4(
        IconButton2,
        {
          name: "trash-can-outline",
          size: "sm",
          variant: "danger",
          "aria-label": `Supprimer la diapositive ${idx + 1}`,
          onClick: () => removeSlide(s.id)
        }
      )
    ] }, s.id)) })
  ] });
};

// src/editor/blocks/CodeBlock.tsx
import { ChoiceField as ChoiceField2 } from "core-react/ui";
import { TextareaField } from "core-react/ui";
import { TextField as TextField3 } from "core-react/ui";
import { Flex as Flex3 } from "core-react/ui";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var CodeBlock = ({ data, onChange, ...rest }) => {
  const lineCount = (data.code || "").split("\n").length;
  return /* @__PURE__ */ jsxs5(Flex3, { $direction: "column", $gap: "0", ...rest, children: [
    /* @__PURE__ */ jsxs5(Flex3, { $gap: "1rem", $wrap: "wrap", children: [
      /* @__PURE__ */ jsx5("div", { style: { flex: "1 1 200px" }, children: /* @__PURE__ */ jsx5(
        ChoiceField2,
        {
          label: "Langage",
          value: data.language || "plaintext",
          onChange: (e) => onChange({ ...data, language: e.target.value }),
          children: CODE_LANGUAGES.map((language) => /* @__PURE__ */ jsx5("option", { value: language.value, children: language.label }, language.value))
        }
      ) }),
      /* @__PURE__ */ jsx5("div", { style: { flex: "2 1 260px" }, children: /* @__PURE__ */ jsx5(
        TextField3,
        {
          label: "Nom du fichier (optionnel)",
          placeholder: "Ex : src/Controller/PostController.php",
          value: data.filename || "",
          onChange: (e) => onChange({ ...data, filename: e.target.value })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx5(
      TextareaField,
      {
        label: "Extrait de code",
        rows: Math.min(Math.max(lineCount + 1, 6), 30),
        placeholder: "Collez votre code ici\u2026",
        spellCheck: false,
        style: { fontFamily: "'Fira Code', 'Consolas', monospace", fontSize: "0.8125rem", tabSize: 2 },
        value: data.code || "",
        onChange: (e) => onChange({ ...data, code: e.target.value }),
        onKeyDown: (e) => {
          if (e.key !== "Tab" || e.shiftKey) return;
          e.preventDefault();
          const target = e.currentTarget;
          const { selectionStart, selectionEnd, value } = target;
          const next = `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`;
          onChange({ ...data, code: next });
          requestAnimationFrame(() => target.setSelectionRange(selectionStart + 2, selectionStart + 2));
        }
      }
    )
  ] });
};

// src/editor/blocks/CtaBlock.tsx
import { ChoiceField as ChoiceField3 } from "core-react/ui";
import { TextareaField as TextareaField2 } from "core-react/ui";
import { TextField as TextField4 } from "core-react/ui";
import { Flex as Flex4 } from "core-react/ui";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var CtaBlock = ({ data, onChange, ...rest }) => /* @__PURE__ */ jsxs6(Flex4, { $direction: "column", $gap: "0", ...rest, children: [
  /* @__PURE__ */ jsx6(
    TextField4,
    {
      label: "Titre",
      placeholder: "Ex : Envie d'aller plus loin ?",
      value: data.title || "",
      onChange: (e) => onChange({ ...data, title: e.target.value })
    }
  ),
  /* @__PURE__ */ jsx6(
    TextareaField2,
    {
      label: "Description",
      rows: 2,
      value: data.description || "",
      onChange: (e) => onChange({ ...data, description: e.target.value })
    }
  ),
  /* @__PURE__ */ jsxs6(Flex4, { $gap: "1rem", $wrap: "wrap", children: [
    /* @__PURE__ */ jsx6("div", { style: { flex: "1 1 200px" }, children: /* @__PURE__ */ jsx6(
      TextField4,
      {
        label: "Libell\xE9 du bouton",
        placeholder: "Ex : T\xE9l\xE9charger le guide",
        value: data.buttonLabel || "",
        onChange: (e) => onChange({ ...data, buttonLabel: e.target.value })
      }
    ) }),
    /* @__PURE__ */ jsx6("div", { style: { flex: "2 1 260px" }, children: /* @__PURE__ */ jsx6(
      TextField4,
      {
        label: "Lien du bouton",
        type: "url",
        placeholder: "https://\u2026 ou /contact",
        value: data.buttonUrl || "",
        onChange: (e) => onChange({ ...data, buttonUrl: e.target.value })
      }
    ) }),
    /* @__PURE__ */ jsx6("div", { style: { flex: "1 1 160px" }, children: /* @__PURE__ */ jsxs6(
      ChoiceField3,
      {
        label: "Style",
        value: data.variant || "primary",
        onChange: (e) => onChange({ ...data, variant: e.target.value }),
        children: [
          /* @__PURE__ */ jsx6("option", { value: "primary", children: "Principal" }),
          /* @__PURE__ */ jsx6("option", { value: "secondary", children: "Secondaire" }),
          /* @__PURE__ */ jsx6("option", { value: "outline", children: "Contour" })
        ]
      }
    ) })
  ] })
] });

// src/editor/blocks/FaqBlock.tsx
import { Button as Button3 } from "core-react/ui";
import { Icon as Icon3 } from "core-react/icons";
import { IconButton as IconButton3 } from "core-react/ui";
import { TextareaField as TextareaField3 } from "core-react/ui";
import { TextField as TextField5 } from "core-react/ui";
import { Flex as Flex5 } from "core-react/ui";
import { styled as styled4 } from "styled-components";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var ItemCard = styled4.div`
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
`;
var FaqBlock = ({ data, onChange, ...rest }) => {
  const items = data.items || [];
  const updateItem = (id, patch) => onChange({ ...data, items: items.map((item) => item.id === id ? { ...item, ...patch } : item) });
  const addItem = () => onChange({ ...data, items: [...items, { id: createBlockItemId(), question: "", answer: "" }] });
  const removeItem = (id) => onChange({ ...data, items: items.filter((item) => item.id !== id) });
  return /* @__PURE__ */ jsxs7(Flex5, { $direction: "column", $gap: "0.75rem", ...rest, children: [
    items.map((item, idx) => /* @__PURE__ */ jsx7(ItemCard, { children: /* @__PURE__ */ jsxs7(Flex5, { $align: "flex-start", $gap: "0.5rem", children: [
      /* @__PURE__ */ jsxs7("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsx7(
          TextField5,
          {
            label: `Question ${idx + 1}`,
            placeholder: "Ex : Comment installer le CMS ?",
            value: item.question,
            onChange: (e) => updateItem(item.id, { question: e.target.value })
          }
        ),
        /* @__PURE__ */ jsx7(
          TextareaField3,
          {
            label: "R\xE9ponse",
            rows: 3,
            value: item.answer,
            onChange: (e) => updateItem(item.id, { answer: e.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ jsx7(
        IconButton3,
        {
          name: "trash-can-outline",
          size: "sm",
          variant: "danger",
          "aria-label": `Supprimer la question ${idx + 1}`,
          disabled: items.length <= 1,
          onClick: () => removeItem(item.id)
        }
      )
    ] }) }, item.id)),
    /* @__PURE__ */ jsx7("div", { children: /* @__PURE__ */ jsxs7(Button3, { $variant: "outline", $size: "sm", onClick: addItem, children: [
      /* @__PURE__ */ jsx7(Icon3, { name: "plus", size: 16 }),
      "Ajouter une question"
    ] }) })
  ] });
};

// src/editor/blocks/GalleryBlock.tsx
import { IconButton as IconButton4 } from "core-react/ui";
import { Image as Image2 } from "core-react/ui";
import { ChoiceField as ChoiceField4 } from "core-react/ui";
import { TextField as TextField6 } from "core-react/ui";
import { Flex as Flex6 } from "core-react/ui";
import { styled as styled5 } from "styled-components";
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
var Thumbnails = styled5.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};
`;
var Tile = styled5.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};

  & > button {
    position: absolute;
    top: ${({ theme }) => theme.spacing[1]};
    right: ${({ theme }) => theme.spacing[1]};
  }

  input {
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }
`;
var GalleryBlock = ({ data, onChange, onUpload, ...rest }) => {
  const images = data.images || [];
  const columns = data.columns || 3;
  const addImages = (urls) => onChange({
    ...data,
    images: [...images, ...urls.map((url) => ({ id: createBlockItemId(), url, alt: "" }))]
  });
  const updateImage = (id, patch) => onChange({ ...data, images: images.map((image) => image.id === id ? { ...image, ...patch } : image) });
  const removeImage = (id) => onChange({ ...data, images: images.filter((image) => image.id !== id) });
  return /* @__PURE__ */ jsxs8(Flex6, { $direction: "column", $gap: "1rem", ...rest, children: [
    images.length > 0 && /* @__PURE__ */ jsx8(Thumbnails, { $columns: columns, children: images.map((image, idx) => /* @__PURE__ */ jsxs8(Tile, { children: [
      /* @__PURE__ */ jsx8(Image2, { src: image.url, alt: image.alt || "", $aspectRatio: "1/1", $fit: "cover", $radius: "base" }),
      /* @__PURE__ */ jsx8(
        IconButton4,
        {
          name: "close",
          size: "sm",
          variant: "danger",
          round: true,
          "aria-label": `Retirer l'image ${idx + 1}`,
          onClick: () => removeImage(image.id)
        }
      ),
      /* @__PURE__ */ jsx8(
        TextField6,
        {
          "aria-label": `Texte alternatif de l'image ${idx + 1}`,
          placeholder: "Texte alternatif",
          value: image.alt || "",
          onChange: (e) => updateImage(image.id, { alt: e.target.value })
        }
      )
    ] }, image.id)) }),
    /* @__PURE__ */ jsxs8(
      ChoiceField4,
      {
        label: "Colonnes",
        value: columns,
        onChange: (e) => onChange({ ...data, columns: Number(e.target.value) }),
        children: [
          /* @__PURE__ */ jsx8("option", { value: 2, children: "2 colonnes" }),
          /* @__PURE__ */ jsx8("option", { value: 3, children: "3 colonnes" }),
          /* @__PURE__ */ jsx8("option", { value: 4, children: "4 colonnes" })
        ]
      }
    ),
    /* @__PURE__ */ jsx8(
      MediaSourceField,
      {
        multiple: true,
        accept: "image/*",
        label: "Ajouter des images \xE0 la galerie",
        urlLabel: "Ou ajouter une image par URL",
        onUpload,
        onSelect: addImages
      }
    )
  ] });
};

// src/editor/blocks/ImageBlock.tsx
import { Button as Button4 } from "core-react/ui";
import { Icon as Icon4 } from "core-react/icons";
import { Figure } from "core-react/ui";
import { Image as Image3 } from "core-react/ui";
import { ChoiceField as ChoiceField5 } from "core-react/ui";
import { TextField as TextField7 } from "core-react/ui";
import { Flex as Flex7 } from "core-react/ui";
import { useState as useState3 } from "react";
import { styled as styled6 } from "styled-components";
import { jsx as jsx9, jsxs as jsxs9 } from "react/jsx-runtime";
var ImagePreviewButton = styled6.button`
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
var ImageBlock = ({ data, onChange, onUpload, ...rest }) => {
  const [isReplacing, setIsReplacing] = useState3(false);
  const selectImage = (url) => {
    if (!url) return;
    onChange({ ...data, url });
    setIsReplacing(false);
  };
  if (!data.url) {
    return /* @__PURE__ */ jsx9(
      MediaSourceField,
      {
        accept: "image/*",
        label: "S\xE9lectionner une image",
        onUpload,
        onSelect: ([url]) => selectImage(url),
        ...rest
      }
    );
  }
  return /* @__PURE__ */ jsxs9(Flex7, { $direction: "column", $gap: "1rem", ...rest, children: [
    /* @__PURE__ */ jsx9(Figure, { caption: data.caption, captionAlign: "center", children: /* @__PURE__ */ jsx9(ImagePreviewButton, { type: "button", title: "Changer l'image", onClick: () => setIsReplacing(true), children: /* @__PURE__ */ jsx9(
      Image3,
      {
        src: data.url,
        alt: data.alt || "",
        $aspectRatio: data.aspectRatio || "16/9",
        $fit: "cover",
        $radius: "base"
      }
    ) }) }),
    isReplacing && /* @__PURE__ */ jsxs9(Flex7, { $direction: "column", $gap: "0.5rem", children: [
      /* @__PURE__ */ jsx9(
        MediaSourceField,
        {
          accept: "image/*",
          label: "Nouvelle image",
          onUpload,
          onSelect: ([url]) => selectImage(url)
        }
      ),
      /* @__PURE__ */ jsx9(Flex7, { $justify: "flex-end", children: /* @__PURE__ */ jsx9(Button4, { $variant: "ghost", $size: "sm", onClick: () => setIsReplacing(false), children: "Annuler" }) })
    ] }),
    /* @__PURE__ */ jsxs9(Flex7, { $gap: "1rem", $wrap: "wrap", children: [
      /* @__PURE__ */ jsx9("div", { style: { flex: "1 1 240px" }, children: /* @__PURE__ */ jsx9(
        TextField7,
        {
          label: "L\xE9gende",
          placeholder: "Texte affich\xE9 sous l'image\u2026",
          value: data.caption || "",
          onChange: (e) => onChange({ ...data, caption: e.target.value })
        }
      ) }),
      /* @__PURE__ */ jsx9("div", { style: { flex: "1 1 240px" }, children: /* @__PURE__ */ jsx9(
        TextField7,
        {
          label: "Texte alternatif (Alt)",
          placeholder: "Description pour l'accessibilit\xE9\u2026",
          value: data.alt || "",
          onChange: (e) => onChange({ ...data, alt: e.target.value })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs9(Flex7, { $justify: "space-between", $align: "center", $gap: "1rem", $wrap: "wrap", children: [
      /* @__PURE__ */ jsxs9(
        ChoiceField5,
        {
          label: "Format d'affichage",
          value: data.aspectRatio || "16/9",
          onChange: (e) => onChange({ ...data, aspectRatio: e.target.value }),
          children: [
            /* @__PURE__ */ jsx9("option", { value: "16/9", children: "16:9 (Standard)" }),
            /* @__PURE__ */ jsx9("option", { value: "4/3", children: "4:3" }),
            /* @__PURE__ */ jsx9("option", { value: "1/1", children: "1:1 (Carr\xE9)" }),
            /* @__PURE__ */ jsx9("option", { value: "21/9", children: "21:9 (Banni\xE8re)" })
          ]
        }
      ),
      !isReplacing && /* @__PURE__ */ jsxs9(Button4, { $variant: "outline", $size: "sm", onClick: () => setIsReplacing(true), children: [
        /* @__PURE__ */ jsx9(Icon4, { name: "image-edit-outline", size: 16 }),
        "Changer l'image"
      ] })
    ] })
  ] });
};

// src/editor/blocks/QuoteBlock.tsx
import { TextareaField as TextareaField4 } from "core-react/ui";
import { TextField as TextField8 } from "core-react/ui";
import { Flex as Flex8 } from "core-react/ui";
import { jsx as jsx10, jsxs as jsxs10 } from "react/jsx-runtime";
var QuoteBlock = ({ data, onChange, ...rest }) => /* @__PURE__ */ jsxs10(Flex8, { $direction: "column", $gap: "0", ...rest, children: [
  /* @__PURE__ */ jsx10(
    TextareaField4,
    {
      label: "Citation",
      rows: 3,
      placeholder: "\xAB La simplicit\xE9 est la sophistication supr\xEAme. \xBB",
      value: data.text || "",
      onChange: (e) => onChange({ ...data, text: e.target.value })
    }
  ),
  /* @__PURE__ */ jsxs10(Flex8, { $gap: "1rem", $wrap: "wrap", children: [
    /* @__PURE__ */ jsx10("div", { style: { flex: "1 1 220px" }, children: /* @__PURE__ */ jsx10(
      TextField8,
      {
        label: "Auteur",
        placeholder: "Ex : L\xE9onard de Vinci",
        value: data.author || "",
        onChange: (e) => onChange({ ...data, author: e.target.value })
      }
    ) }),
    /* @__PURE__ */ jsx10("div", { style: { flex: "1 1 220px" }, children: /* @__PURE__ */ jsx10(
      TextField8,
      {
        label: "Source (URL ou ouvrage)",
        placeholder: "Ex : https://\u2026",
        value: data.source || "",
        onChange: (e) => onChange({ ...data, source: e.target.value })
      }
    ) })
  ] })
] });

// src/editor/blocks/TableBlock.tsx
import { Button as Button5 } from "core-react/ui";
import { Icon as Icon5 } from "core-react/icons";
import { IconButton as IconButton5 } from "core-react/ui";
import { ToggleField as ToggleField2 } from "core-react/ui";
import { TextField as TextField9 } from "core-react/ui";
import { Input } from "core-react/ui";
import { Flex as Flex9 } from "core-react/ui";
import { styled as styled7 } from "styled-components";
import { jsx as jsx11, jsxs as jsxs11 } from "react/jsx-runtime";
var Grid = styled7.div`
  overflow-x: auto;
`;
var EditTable = styled7.table`
  border-collapse: collapse;
  width: 100%;

  td {
    padding: ${({ theme }) => theme.spacing[1]};
    vertical-align: middle;
  }
`;
var HeaderCell = styled7.td`
  input {
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
  }
`;
var MAX_COLUMNS = 8;
var TableBlock = ({ data, onChange, ...rest }) => {
  const rows = data.rows?.length ? data.rows : DEFAULT_TABLE_BLOCK_DATA.rows;
  const columnCount = Math.max(...rows.map((row) => row.length), 1);
  const update = (nextRows) => onChange({ ...data, rows: nextRows });
  const setCell = (rowIndex, colIndex, value) => update(
    rows.map((row, r) => r === rowIndex ? row.map((cell, c) => c === colIndex ? value : cell) : row)
  );
  const addRow = () => update([...rows, Array.from({ length: columnCount }, () => "")]);
  const removeRow = (rowIndex) => update(rows.filter((_, r) => r !== rowIndex));
  const addColumn = () => update(rows.map((row, r) => [...row, r === 0 && data.hasHeader ? `Colonne ${columnCount + 1}` : ""]));
  const removeColumn = (colIndex) => update(rows.map((row) => row.filter((_, c) => c !== colIndex)));
  return /* @__PURE__ */ jsxs11(Flex9, { $direction: "column", $gap: "0.75rem", ...rest, children: [
    /* @__PURE__ */ jsx11(Grid, { children: /* @__PURE__ */ jsx11(EditTable, { children: /* @__PURE__ */ jsxs11("tbody", { children: [
      rows.map((row, rowIndex) => {
        const isHeader = data.hasHeader && rowIndex === 0;
        const Cell = isHeader ? HeaderCell : "td";
        return /* @__PURE__ */ jsxs11("tr", { children: [
          Array.from({ length: columnCount }, (_, colIndex) => /* @__PURE__ */ jsx11(Cell, { children: /* @__PURE__ */ jsx11(
            Input,
            {
              "aria-label": `Ligne ${rowIndex + 1}, colonne ${colIndex + 1}`,
              placeholder: isHeader ? "En-t\xEAte" : "",
              value: row[colIndex] ?? "",
              onChange: (e) => setCell(rowIndex, colIndex, e.target.value)
            }
          ) }, colIndex)),
          /* @__PURE__ */ jsx11("td", { style: { width: 36 }, children: /* @__PURE__ */ jsx11(
            IconButton5,
            {
              name: "close",
              size: "sm",
              variant: "ghost",
              "aria-label": `Supprimer la ligne ${rowIndex + 1}`,
              disabled: rows.length <= 1,
              onClick: () => removeRow(rowIndex)
            }
          ) })
        ] }, rowIndex);
      }),
      /* @__PURE__ */ jsxs11("tr", { children: [
        Array.from({ length: columnCount }, (_, colIndex) => /* @__PURE__ */ jsx11("td", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx11(
          IconButton5,
          {
            name: "close",
            size: "sm",
            variant: "ghost",
            "aria-label": `Supprimer la colonne ${colIndex + 1}`,
            disabled: columnCount <= 1,
            onClick: () => removeColumn(colIndex)
          }
        ) }, colIndex)),
        /* @__PURE__ */ jsx11("td", {})
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs11(Flex9, { $gap: "0.5rem", $wrap: "wrap", $align: "center", children: [
      /* @__PURE__ */ jsxs11(Button5, { $variant: "outline", $size: "sm", onClick: addRow, children: [
        /* @__PURE__ */ jsx11(Icon5, { name: "table-row-plus-after", size: 16 }),
        "Ligne"
      ] }),
      /* @__PURE__ */ jsxs11(Button5, { $variant: "outline", $size: "sm", onClick: addColumn, disabled: columnCount >= MAX_COLUMNS, children: [
        /* @__PURE__ */ jsx11(Icon5, { name: "table-column-plus-after", size: 16 }),
        "Colonne"
      ] }),
      /* @__PURE__ */ jsx11(
        ToggleField2,
        {
          label: "Premi\xE8re ligne en en-t\xEAte",
          checked: data.hasHeader,
          onChange: (e) => onChange({ ...data, hasHeader: e.target.checked })
        }
      )
    ] }),
    /* @__PURE__ */ jsx11(
      TextField9,
      {
        label: "L\xE9gende (optionnelle)",
        placeholder: "Ex : Comparatif des frameworks",
        value: data.caption || "",
        onChange: (e) => onChange({ ...data, caption: e.target.value })
      }
    )
  ] });
};

// src/editor/blocks/TextBlock.tsx
import { TextareaField as TextareaField5 } from "core-react/ui";
import { jsx as jsx12 } from "react/jsx-runtime";
var TextBlock = ({ data, onChange, ...rest }) => {
  const lineCount = (data.content || "").split("\n").length;
  return /* @__PURE__ */ jsx12("div", { ...rest, children: /* @__PURE__ */ jsx12(
    TextareaField5,
    {
      label: "Contenu",
      rows: Math.min(Math.max(lineCount + 1, 4), 24),
      placeholder: "R\xE9digez votre paragraphe\u2026",
      hint: "Markdown : ## Titre, **gras**, *italique*, [lien](https://\u2026), - liste",
      value: data.content || "",
      onChange: (e) => onChange({ ...data, content: e.target.value })
    }
  ) });
};

// src/editor/blocks/VideoBlock.tsx
import { Button as Button6 } from "core-react/ui";
import { Video } from "core-react/ui";
import { ChoiceField as ChoiceField6 } from "core-react/ui";
import { TextField as TextField10 } from "core-react/ui";
import { Flex as Flex10 } from "core-react/ui";
import { jsx as jsx13, jsxs as jsxs12 } from "react/jsx-runtime";
var VideoBlock = ({ data, onChange, onUpload, ...rest }) => {
  if (!data.url) {
    return /* @__PURE__ */ jsx13(
      MediaSourceField,
      {
        accept: "video/mp4,video/webm",
        label: "T\xE9l\xE9verser un fichier vid\xE9o",
        maxSizeMb: 50,
        urlLabel: "Ou URL de la vid\xE9o",
        urlPlaceholder: "https://domaine.com/video.mp4",
        onUpload,
        onSelect: ([url]) => url && onChange({ ...data, url }),
        ...rest
      }
    );
  }
  return /* @__PURE__ */ jsxs12(Flex10, { $direction: "column", $gap: "1rem", ...rest, children: [
    /* @__PURE__ */ jsx13(Video, { src: data.url, aspectRatio: data.aspectRatio || "16/9", radius: "base", controls: true }),
    /* @__PURE__ */ jsx13(
      TextField10,
      {
        label: "L\xE9gende de la vid\xE9o",
        placeholder: "Courte description\u2026",
        value: data.caption || "",
        onChange: (e) => onChange({ ...data, caption: e.target.value })
      }
    ),
    /* @__PURE__ */ jsxs12(Flex10, { $justify: "space-between", $align: "center", $gap: "1rem", $wrap: "wrap", children: [
      /* @__PURE__ */ jsxs12(
        ChoiceField6,
        {
          label: "Ratio vid\xE9o",
          value: data.aspectRatio || "16/9",
          onChange: (e) => onChange({ ...data, aspectRatio: e.target.value }),
          children: [
            /* @__PURE__ */ jsx13("option", { value: "16/9", children: "16:9 (Paysage classique)" }),
            /* @__PURE__ */ jsx13("option", { value: "9/16", children: "9:16 (Format vertical / mobile)" }),
            /* @__PURE__ */ jsx13("option", { value: "4/3", children: "4:3" })
          ]
        }
      ),
      /* @__PURE__ */ jsx13(Button6, { $variant: "ghost", $size: "sm", onClick: () => onChange({ ...data, url: "" }), children: "Changer de vid\xE9o" })
    ] })
  ] });
};

// src/editor/BlockCanvas.tsx
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState as useState4 } from "react";
import { styled as styled8 } from "styled-components";
import { EmptyState } from "core-react/ui";
import { ConfirmDialog } from "core-react/ui";
import { jsx as jsx14, jsxs as jsxs13 } from "react/jsx-runtime";
var DEFAULT_BLOCK_CANVAS_LABELS = {
  emptyTitle: "Ce contenu ne contient encore aucun bloc",
  emptyDescription: "Ajoutez un premier bloc de texte, d'image ou de code avec le s\xE9lecteur ci-dessous.",
  insertAt: (position) => `Ins\xE9rer un bloc en position ${position}`,
  dragHandle: (position, label) => `D\xE9placer le bloc ${position} (${label})`,
  deleteTitle: "Supprimer le bloc",
  deleteMessage: "Le contenu de ce bloc sera retir\xE9 au prochain enregistrement.",
  deleteConfirm: "Supprimer",
  screenReaderInstructions: "Pour d\xE9placer un bloc, appuyez sur Espace ou Entr\xE9e, utilisez les fl\xE8ches haut et bas, puis appuyez de nouveau sur Espace ou Entr\xE9e pour le d\xE9poser. \xC9chap annule.",
  onDragStart: (position) => `Bloc ${position} saisi.`,
  onDragOver: (position, over, total) => `Bloc ${position} au-dessus de la position ${over} sur ${total}.`,
  onDragEnd: (over, total) => `Bloc d\xE9pos\xE9 en position ${over} sur ${total}.`,
  onDragDropped: (position) => `Bloc ${position} rel\xE2ch\xE9.`,
  onDragCancel: (position) => `D\xE9placement annul\xE9, le bloc ${position} reste \xE0 sa place.`
};
var Stack = styled8.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;
var BlockItemInner = ({
  registry,
  block,
  index,
  count,
  isNew,
  labels,
  onUpload,
  onChange,
  onMove,
  onDelete
}) => {
  const { Editor, definition } = registry.get(block.type);
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: block.key
  });
  const nodeRef = useRef(null);
  const setRefs = useCallback(
    (node) => {
      nodeRef.current = node;
      setNodeRef(node);
    },
    [setNodeRef]
  );
  useEffect(() => {
    const node = nodeRef.current;
    if (!isNew || !node) return;
    node.scrollIntoView?.({ behavior: "smooth", block: "center" });
    node.querySelector('textarea, input:not([type="file"]):not([type="hidden"]), select')?.focus({ preventScroll: true });
  }, [isNew]);
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    position: "relative",
    zIndex: isDragging ? 10 : void 0
  };
  return /* @__PURE__ */ jsx14("div", { ref: setRefs, style, children: /* @__PURE__ */ jsx14(
    BlockWrapper,
    {
      blockType: block.type,
      blockLabel: definition.label,
      position: index + 1,
      isFirst: index === 0,
      isLast: index === count - 1,
      isDragging,
      dragHandleRef: setActivatorNodeRef,
      dragHandleProps: {
        ...attributes,
        ...listeners,
        "aria-label": labels.dragHandle(index + 1, definition.label)
      },
      onMoveUp: () => onMove(block.key, -1),
      onMoveDown: () => onMove(block.key, 1),
      onDelete: () => onDelete(block),
      children: /* @__PURE__ */ jsx14(Editor, { data: block.data, onChange: (data) => onChange(block.key, data), onUpload })
    }
  ) });
};
var BlockItem = memo(BlockItemInner);
var isEmptyData = (data) => Object.values(data).every(
  (value) => value === "" || value === null || Array.isArray(value) && value.length === 0
);
var BlockCanvas = ({
  registry,
  blocks,
  onAdd,
  onChange,
  onMove,
  onReorder,
  onRemove,
  onUpload,
  labels: labelOverrides
}) => {
  const labels = useMemo(() => ({ ...DEFAULT_BLOCK_CANVAS_LABELS, ...labelOverrides }), [labelOverrides]);
  const [toDelete, setToDelete] = useState4(null);
  const [lastAddedKey, setLastAddedKey] = useState4(null);
  const insertBlock = useCallback(
    (type, index) => {
      if (registry.isBlockType(type)) setLastAddedKey(onAdd(type, index));
    },
    [onAdd, registry]
  );
  const sensors = useSensors(
    // Le glisser ne démarre qu'après 6 px : un simple clic sur la poignée ne déplace rien
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const itemIds = useMemo(() => blocks.map((block) => block.key), [blocks]);
  const announcements = useMemo(() => {
    const positionOf = (id) => itemIds.indexOf(String(id)) + 1;
    const total = itemIds.length;
    return {
      onDragStart: ({ active }) => labels.onDragStart(positionOf(active.id)),
      onDragOver: ({ active, over }) => over ? labels.onDragOver(positionOf(active.id), positionOf(over.id), total) : void 0,
      onDragEnd: ({ active, over }) => over ? labels.onDragEnd(positionOf(over.id), total) : labels.onDragDropped(positionOf(active.id)),
      onDragCancel: ({ active }) => labels.onDragCancel(positionOf(active.id))
    };
  }, [itemIds, labels]);
  const screenReaderInstructions = useMemo(
    () => ({ draggable: labels.screenReaderInstructions }),
    [labels]
  );
  const handleDragEnd = useCallback(
    ({ active, over }) => {
      if (over && active.id !== over.id) onReorder(String(active.id), String(over.id));
    },
    [onReorder]
  );
  const requestDelete = useCallback(
    (block) => {
      if (isEmptyData(block.data)) onRemove(block.key);
      else setToDelete(block);
    },
    [onRemove]
  );
  return /* @__PURE__ */ jsxs13(Stack, { children: [
    blocks.length === 0 ? /* @__PURE__ */ jsx14(
      EmptyState,
      {
        icon: "view-dashboard-variant-outline",
        title: labels.emptyTitle,
        description: labels.emptyDescription
      }
    ) : /* @__PURE__ */ jsx14(
      DndContext,
      {
        sensors,
        collisionDetection: closestCenter,
        onDragEnd: handleDragEnd,
        accessibility: { announcements, screenReaderInstructions },
        children: /* @__PURE__ */ jsx14(SortableContext, { items: itemIds, strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsx14(Stack, { children: blocks.map((block, index) => /* @__PURE__ */ jsxs13(Fragment, { children: [
          /* @__PURE__ */ jsx14(
            BlockPicker,
            {
              variant: "inline",
              inlineLabel: labels.insertAt(index + 1),
              availableBlocks: registry.definitions,
              onSelectBlock: (type) => insertBlock(type, index)
            }
          ),
          /* @__PURE__ */ jsx14(
            BlockItem,
            {
              registry,
              block,
              index,
              count: blocks.length,
              isNew: block.key === lastAddedKey,
              labels,
              onUpload,
              onChange,
              onMove,
              onDelete: requestDelete
            }
          )
        ] }, block.key)) }) })
      }
    ),
    /* @__PURE__ */ jsx14(BlockPicker, { availableBlocks: registry.definitions, onSelectBlock: (type) => insertBlock(type) }),
    /* @__PURE__ */ jsx14(
      ConfirmDialog,
      {
        isOpen: toDelete !== null,
        onClose: () => setToDelete(null),
        onConfirm: () => {
          if (toDelete) onRemove(toDelete.key);
          setToDelete(null);
        },
        title: labels.deleteTitle,
        message: labels.deleteMessage,
        confirmLabel: labels.deleteConfirm
      }
    )
  ] });
};

// src/editor/BlockList.tsx
import { styled as styled10 } from "styled-components";

// src/editor/BlockViews.tsx
import { styled as styled9 } from "styled-components";
import { Button as Button7 } from "core-react/ui";
import { Accordion } from "core-react/ui";
import { MarkdownViewer } from "core-react/ui";
import { Table, Tbody, Td, Th, Thead, TRow } from "core-react/ui";
import { Carousel as Carousel2 } from "core-react/ui";
import { Figure as Figure2 } from "core-react/ui";
import { Gallery } from "core-react/ui";
import { Image as Image4 } from "core-react/ui";
import { Video as Video2 } from "core-react/ui";
import { Text } from "core-react/ui";
import { Title } from "core-react/ui";
import { jsx as jsx15, jsxs as jsxs14 } from "react/jsx-runtime";
var CodeFrame = styled9.figure`
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.base};
  overflow: hidden;

  figcaption {
    padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[3]}`};
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
    color: ${({ theme }) => theme.colors.text.muted};
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  }

  pre {
    margin: 0;
    padding: ${({ theme }) => theme.spacing[4]};
    overflow-x: auto;
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    background-color: ${({ theme }) => theme.colors.background.surface};
  }
`;
var Blockquote = styled9.blockquote`
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[5]}`};
  border-left: 4px solid ${({ theme }) => theme.colors.primary.base};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-radius: ${({ theme }) => theme.radii.sm};

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    font-style: italic;
  }

  footer {
    margin-top: ${({ theme }) => theme.spacing[2]};
  }
`;
var CtaBox = styled9.aside`
  padding: ${({ theme }) => theme.spacing[5]};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
`;
var EmptyBlockView = () => /* @__PURE__ */ jsx15(Text, { $size: "sm", $color: "muted", children: "Bloc vide." });
var TEXT_MARKDOWN = { headingOffset: 1 };
var TextBlockView = ({ data }) => data.content ? /* @__PURE__ */ jsx15(MarkdownViewer, { ...TEXT_MARKDOWN, children: data.content }) : /* @__PURE__ */ jsx15(EmptyBlockView, {});
var ImageBlockView = ({ data }) => data.url ? /* @__PURE__ */ jsx15(Figure2, { caption: data.caption, captionAlign: "center", children: /* @__PURE__ */ jsx15(
  Image4,
  {
    src: data.url,
    alt: data.alt || "",
    $aspectRatio: data.aspectRatio || "16/9",
    $fit: "cover",
    $radius: "base"
  }
) }) : /* @__PURE__ */ jsx15(EmptyBlockView, {});
var VideoBlockView = ({ data }) => data.url ? /* @__PURE__ */ jsx15(Figure2, { caption: data.caption, captionAlign: "center", children: /* @__PURE__ */ jsx15(Video2, { src: data.url, aspectRatio: data.aspectRatio || "16/9", radius: "base", controls: true }) }) : /* @__PURE__ */ jsx15(EmptyBlockView, {});
var CodeBlockView = ({ data }) => data.code ? /* @__PURE__ */ jsxs14(CodeFrame, { children: [
  /* @__PURE__ */ jsx15("figcaption", { children: data.filename || data.language }),
  /* @__PURE__ */ jsx15("pre", { children: /* @__PURE__ */ jsx15("code", { children: data.code }) })
] }) : /* @__PURE__ */ jsx15(EmptyBlockView, {});
var QuoteBlockView = ({ data }) => data.text ? /* @__PURE__ */ jsxs14(Blockquote, { cite: data.source?.startsWith("http") ? data.source : void 0, children: [
  /* @__PURE__ */ jsx15("p", { children: data.text }),
  (data.author || data.source) && /* @__PURE__ */ jsx15("footer", { children: /* @__PURE__ */ jsxs14(Text, { $size: "sm", $color: "muted", children: [
    "\u2014 ",
    data.author,
    data.author && data.source ? ", " : "",
    data.source && /* @__PURE__ */ jsx15("cite", { children: data.source })
  ] }) })
] }) : /* @__PURE__ */ jsx15(EmptyBlockView, {});
var GalleryBlockView = ({ data }) => data.images?.length ? /* @__PURE__ */ jsx15(Gallery, { $columns: data.columns || 3, $minColumnWidth: "160px", $gap: "0.75rem", children: data.images.map((image) => /* @__PURE__ */ jsx15(Gallery.Item, { $hoverZoom: true, children: /* @__PURE__ */ jsx15(Image4, { src: image.url, alt: image.alt || "", $radius: "base" }) }, image.id)) }) : /* @__PURE__ */ jsx15(EmptyBlockView, {});
var CarouselBlockView = ({ data }) => data.slides?.length ? /* @__PURE__ */ jsx15(
  Carousel2,
  {
    aspectRatio: data.aspectRatio || "16/9",
    autoplay: data.autoplay,
    slideInterval: data.slideInterval,
    children: data.slides.map((slide) => /* @__PURE__ */ jsx15(Carousel2.Item, { children: /* @__PURE__ */ jsx15(
      Image4,
      {
        src: slide.url,
        alt: slide.caption || "",
        $fit: "cover",
        style: { width: "100%", height: "100%" }
      }
    ) }, slide.id))
  }
) : /* @__PURE__ */ jsx15(EmptyBlockView, {});
var TableBlockView = ({ data }) => {
  const rows = data.rows ?? [];
  if (rows.length === 0) return /* @__PURE__ */ jsx15(EmptyBlockView, {});
  const [header, ...body] = data.hasHeader ? rows : [void 0, ...rows];
  return /* @__PURE__ */ jsx15(Figure2, { caption: data.caption, captionAlign: "center", children: /* @__PURE__ */ jsxs14(Table, { $bordered: true, $striped: true, children: [
    header && /* @__PURE__ */ jsx15(Thead, { children: /* @__PURE__ */ jsx15(TRow, { children: header.map((cell, idx) => /* @__PURE__ */ jsx15(Th, { children: cell }, idx)) }) }),
    /* @__PURE__ */ jsx15(Tbody, { children: body.map((row, rowIdx) => /* @__PURE__ */ jsx15(TRow, { children: row?.map((cell, idx) => /* @__PURE__ */ jsx15(Td, { children: cell }, idx)) }, rowIdx)) })
  ] }) });
};
var FaqBlockView = ({ data }) => data.items?.length ? /* @__PURE__ */ jsx15(Accordion, { multiple: true, children: data.items.map((item) => /* @__PURE__ */ jsxs14(Accordion.Item, { itemKey: item.id, children: [
  /* @__PURE__ */ jsx15(Accordion.Trigger, { children: item.question || "Question sans titre" }),
  /* @__PURE__ */ jsx15(Accordion.Content, { children: /* @__PURE__ */ jsx15(Text, { as: "p", style: { margin: 0 }, children: item.answer }) })
] }, item.id)) }) : /* @__PURE__ */ jsx15(EmptyBlockView, {});
var CtaBlockView = ({ data }) => data.title || data.buttonLabel ? /* @__PURE__ */ jsxs14(CtaBox, { children: [
  data.title && /* @__PURE__ */ jsx15(Title, { as: "h3", children: data.title }),
  data.description && /* @__PURE__ */ jsx15(Text, { as: "p", style: { marginTop: 0 }, children: data.description }),
  data.buttonLabel && /* @__PURE__ */ jsx15(
    Button7,
    {
      href: data.buttonUrl || "#",
      target: "_blank",
      rel: "noreferrer",
      $variant: data.variant || "primary",
      children: data.buttonLabel
    }
  )
] }) : /* @__PURE__ */ jsx15(EmptyBlockView, {});

// src/editor/BlockList.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
var Flow = styled10.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;
var BlockList = ({ registry, blocks, className }) => /* @__PURE__ */ jsx16(Flow, { className, children: [...blocks].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)).map((block, index) => {
  if (!registry.isBlockType(block.type)) return null;
  const View = registry.get(block.type).View ?? EmptyBlockView;
  return /* @__PURE__ */ jsx16(View, { data: block.data }, block.key ?? block.id ?? index);
}) });

// src/editor/registry.ts
var clone = (value) => typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value));
var defineBlock = ({
  type,
  label = type,
  icon = "cube-outline",
  description,
  Editor,
  View,
  createData
}) => ({
  definition: { type, label, icon, description },
  Editor,
  View,
  createData: () => clone(createData())
});
var createBlockRegistry = (entries) => {
  const types = Object.keys(entries);
  return {
    entries,
    types,
    definitions: types.map((type) => entries[type].definition),
    isBlockType: (type) => Object.prototype.hasOwnProperty.call(entries, type),
    get: (type) => entries[type],
    createData: (type) => entries[type].createData()
  };
};
var extendBlockRegistry = (base, extra) => createBlockRegistry({ ...base.entries, ...extra });

// src/editor/defaultRegistry.ts
var cms = (type, Editor, View, createData) => {
  const definition = DEFAULT_CMS_BLOCKS.find((item) => item.type === type);
  return defineBlock({
    type,
    label: definition?.label,
    icon: definition?.icon,
    description: definition?.description,
    Editor,
    View,
    createData
  });
};
var CMS_BLOCK_REGISTRY = createBlockRegistry({
  text: cms("text", TextBlock, TextBlockView, () => DEFAULT_TEXT_BLOCK_DATA),
  image: cms("image", ImageBlock, ImageBlockView, () => DEFAULT_IMAGE_BLOCK_DATA),
  code: cms("code", CodeBlock, CodeBlockView, () => DEFAULT_CODE_BLOCK_DATA),
  quote: cms("quote", QuoteBlock, QuoteBlockView, () => DEFAULT_QUOTE_BLOCK_DATA),
  video: cms("video", VideoBlock, VideoBlockView, () => DEFAULT_VIDEO_BLOCK_DATA),
  gallery: cms("gallery", GalleryBlock, GalleryBlockView, () => ({
    ...DEFAULT_GALLERY_BLOCK_DATA,
    images: []
  })),
  carousel: cms("carousel", CarouselBlock, CarouselBlockView, () => ({
    ...DEFAULT_CAROUSEL_BLOCK_DATA,
    slides: []
  })),
  table: cms("table", TableBlock, TableBlockView, () => DEFAULT_TABLE_BLOCK_DATA),
  faq: cms("faq", FaqBlock, FaqBlockView, createDefaultFaqBlockData),
  cta: cms("cta", CtaBlock, CtaBlockView, () => DEFAULT_CTA_BLOCK_DATA)
});

// src/editor/readingTime.ts
var READING_TIME_IGNORED_KEYS = ["id", "url", "src", "icon", "language", "variant", "aspectRatio"];
var collectStrings = (value, ignored, acc) => {
  if (typeof value === "string") {
    acc.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectStrings(item, ignored, acc));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      if (!ignored.includes(key)) collectStrings(item, ignored, acc);
    });
  }
};
var computeReadingTime = (blocks, { wordsPerMinute = 200, ignoredKeys = READING_TIME_IGNORED_KEYS } = {}) => {
  const strings = [];
  blocks.forEach((block) => collectStrings(block.data, ignoredKeys, strings));
  const words = strings.join(" ").split(/\s+/).filter(Boolean).length;
  return words === 0 ? null : Math.max(1, Math.round(words / wordsPerMinute));
};

// src/editor/useBlocksState.ts
import { useCallback as useCallback2, useMemo as useMemo2, useState as useState5 } from "react";
var arrayMove = (items, from, to) => {
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};
var serialize = (blocks) => JSON.stringify(blocks.map(({ id, type, data, settings }) => ({ id, type, data, settings })));
var useBlocksState = (registry, initialBlocks = []) => {
  const toEditorBlocks = useCallback2(
    (blocks2) => [...blocks2].sort((a, b) => a.position - b.position).filter((block) => registry.isBlockType(block.type)).map((block) => ({
      key: block.id,
      id: block.id,
      type: block.type,
      data: { ...registry.createData(block.type), ...block.data },
      settings: block.settings ?? null
    })),
    [registry]
  );
  const [blocks, setBlocks] = useState5(() => toEditorBlocks(initialBlocks));
  const [snapshot, setSnapshot] = useState5(() => serialize(toEditorBlocks(initialBlocks)));
  const addBlock = useCallback2(
    (type, index) => {
      const block = {
        key: createBlockItemId(),
        id: null,
        type,
        data: registry.createData(type),
        settings: null
      };
      setBlocks((current) => {
        const at = index === void 0 ? current.length : Math.max(0, Math.min(index, current.length));
        return [...current.slice(0, at), block, ...current.slice(at)];
      });
      return block.key;
    },
    [registry]
  );
  const updateBlock = useCallback2((key, data) => {
    setBlocks((current) => current.map((block) => block.key === key ? { ...block, data } : block));
  }, []);
  const updateSettings = useCallback2((key, settings) => {
    setBlocks((current) => current.map((block) => block.key === key ? { ...block, settings } : block));
  }, []);
  const moveBlock = useCallback2((key, direction) => {
    setBlocks((current) => {
      const index = current.findIndex((block) => block.key === key);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      return arrayMove(current, index, target);
    });
  }, []);
  const reorderBlocks = useCallback2((activeKey, overKey) => {
    if (activeKey === overKey) return;
    setBlocks((current) => {
      const from = current.findIndex((block) => block.key === activeKey);
      const to = current.findIndex((block) => block.key === overKey);
      return from < 0 || to < 0 ? current : arrayMove(current, from, to);
    });
  }, []);
  const removeBlock = useCallback2((key) => {
    setBlocks((current) => current.filter((block) => block.key !== key));
  }, []);
  const resetBlocks = useCallback2(
    (saved) => {
      const next = toEditorBlocks(saved);
      setBlocks(next);
      setSnapshot(serialize(next));
    },
    [toEditorBlocks]
  );
  const isDirty = useMemo2(() => serialize(blocks) !== snapshot, [blocks, snapshot]);
  const toPayload = useCallback2(
    () => blocks.map((block, index) => ({
      id: block.id,
      type: block.type,
      position: index + 1,
      data: block.data,
      settings: block.settings
    })),
    [blocks]
  );
  return {
    blocks,
    addBlock,
    updateBlock,
    updateSettings,
    moveBlock,
    reorderBlocks,
    removeBlock,
    resetBlocks,
    isDirty,
    toPayload
  };
};
export {
  BlockCanvas,
  BlockList,
  BlockPicker,
  BlockWrapper,
  CMS_BLOCK_REGISTRY,
  CODE_LANGUAGES,
  CarouselBlock,
  CarouselBlockView,
  CodeBlock,
  CodeBlockView,
  CtaBlock,
  CtaBlockView,
  DEFAULT_BLOCK_CANVAS_LABELS,
  DEFAULT_CAROUSEL_BLOCK_DATA,
  DEFAULT_CMS_BLOCKS,
  DEFAULT_CODE_BLOCK_DATA,
  DEFAULT_CTA_BLOCK_DATA,
  DEFAULT_GALLERY_BLOCK_DATA,
  DEFAULT_IMAGE_BLOCK_DATA,
  DEFAULT_QUOTE_BLOCK_DATA,
  DEFAULT_TABLE_BLOCK_DATA,
  DEFAULT_TEXT_BLOCK_DATA,
  DEFAULT_VIDEO_BLOCK_DATA,
  EmptyBlockView,
  FaqBlock,
  FaqBlockView,
  GalleryBlock,
  GalleryBlockView,
  ImageBlock,
  ImageBlockView,
  MediaSourceField,
  QuoteBlock,
  QuoteBlockView,
  READING_TIME_IGNORED_KEYS,
  TableBlock,
  TableBlockView,
  TextBlock,
  TextBlockView,
  VideoBlock,
  VideoBlockView,
  computeReadingTime,
  createBlockItemId,
  createBlockRegistry,
  createDefaultFaqBlockData,
  defineBlock,
  extendBlockRegistry,
  useBlocksState
};
//# sourceMappingURL=index.js.map