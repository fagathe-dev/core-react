'use client';
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/editor/index.ts
var editor_exports = {};
__export(editor_exports, {
  BlockCanvas: () => BlockCanvas,
  BlockList: () => BlockList,
  BlockPicker: () => BlockPicker,
  BlockWrapper: () => BlockWrapper,
  CMS_BLOCK_REGISTRY: () => CMS_BLOCK_REGISTRY,
  CODE_LANGUAGES: () => CODE_LANGUAGES,
  CarouselBlock: () => CarouselBlock,
  CarouselBlockView: () => CarouselBlockView,
  CodeBlock: () => CodeBlock,
  CodeBlockView: () => CodeBlockView,
  CtaBlock: () => CtaBlock,
  CtaBlockView: () => CtaBlockView,
  DEFAULT_BLOCK_CANVAS_LABELS: () => DEFAULT_BLOCK_CANVAS_LABELS,
  DEFAULT_CAROUSEL_BLOCK_DATA: () => DEFAULT_CAROUSEL_BLOCK_DATA,
  DEFAULT_CMS_BLOCKS: () => DEFAULT_CMS_BLOCKS,
  DEFAULT_CODE_BLOCK_DATA: () => DEFAULT_CODE_BLOCK_DATA,
  DEFAULT_CTA_BLOCK_DATA: () => DEFAULT_CTA_BLOCK_DATA,
  DEFAULT_GALLERY_BLOCK_DATA: () => DEFAULT_GALLERY_BLOCK_DATA,
  DEFAULT_IMAGE_BLOCK_DATA: () => DEFAULT_IMAGE_BLOCK_DATA,
  DEFAULT_QUOTE_BLOCK_DATA: () => DEFAULT_QUOTE_BLOCK_DATA,
  DEFAULT_TABLE_BLOCK_DATA: () => DEFAULT_TABLE_BLOCK_DATA,
  DEFAULT_TEXT_BLOCK_DATA: () => DEFAULT_TEXT_BLOCK_DATA,
  DEFAULT_VIDEO_BLOCK_DATA: () => DEFAULT_VIDEO_BLOCK_DATA,
  EmptyBlockView: () => EmptyBlockView,
  FaqBlock: () => FaqBlock,
  FaqBlockView: () => FaqBlockView,
  GalleryBlock: () => GalleryBlock,
  GalleryBlockView: () => GalleryBlockView,
  ImageBlock: () => ImageBlock,
  ImageBlockView: () => ImageBlockView,
  MediaSourceField: () => MediaSourceField,
  QuoteBlock: () => QuoteBlock,
  QuoteBlockView: () => QuoteBlockView,
  READING_TIME_IGNORED_KEYS: () => READING_TIME_IGNORED_KEYS,
  TableBlock: () => TableBlock,
  TableBlockView: () => TableBlockView,
  TextBlock: () => TextBlock,
  TextBlockView: () => TextBlockView,
  VideoBlock: () => VideoBlock,
  VideoBlockView: () => VideoBlockView,
  computeReadingTime: () => computeReadingTime,
  createBlockItemId: () => createBlockItemId,
  createBlockRegistry: () => createBlockRegistry,
  createDefaultFaqBlockData: () => createDefaultFaqBlockData,
  defineBlock: () => defineBlock,
  extendBlockRegistry: () => extendBlockRegistry,
  useBlocksState: () => useBlocksState
});
module.exports = __toCommonJS(editor_exports);

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
var import_ui = require("core-react/ui");
var import_icons = require("core-react/icons");
var import_react = require("react");
var import_styled_components = require("styled-components");
var import_jsx_runtime = require("react/jsx-runtime");
var PickerContainer = import_styled_components.styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${({ theme, $inline }) => $inline ? `-${theme.spacing[2]} 0` : `${theme.spacing[3]} 0`};
`;
var InlineTrigger = import_styled_components.styled.div`
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
var InlineButton = import_styled_components.styled.button`
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
var GridMenu = import_styled_components.styled.div`
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
var BlockOptionBtn = import_styled_components.styled.button`
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
var OptionDescription = import_styled_components.styled.span`
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
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const isInline = variant === "inline";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickerContainer, { $inline: isInline, ...rest, children: [
    isInline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTrigger, { $isOpen: isOpen, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      InlineButton,
      {
        type: "button",
        "aria-label": isOpen ? "Fermer" : inlineLabel,
        "aria-expanded": isOpen,
        title: isOpen ? "Fermer" : inlineLabel,
        onClick: () => setIsOpen((prev) => !prev),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icon, { name: isOpen ? "close" : "plus", size: 16 })
      }
    ) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_ui.Button,
      {
        $variant: isOpen ? "secondary" : "outline",
        $size: "sm",
        onClick: () => setIsOpen((prev) => !prev),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icon, { name: isOpen ? "close" : "plus", size: 16 }),
          isOpen ? "Fermer" : "Ajouter un bloc de contenu"
        ]
      }
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridMenu, { children: availableBlocks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      BlockOptionBtn,
      {
        type: "button",
        onClick: () => {
          onSelectBlock(b.type);
          setIsOpen(false);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icon, { name: b.icon, size: 22 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b.label }),
          b.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionDescription, { children: b.description })
        ]
      },
      b.type
    )) })
  ] });
};

// src/editor/blocks/BlockWrapper.tsx
var import_ui2 = require("core-react/ui");
var import_icons2 = require("core-react/icons");
var import_ui3 = require("core-react/ui");
var import_react2 = require("react");
var import_styled_components2 = require("styled-components");
var import_jsx_runtime2 = require("react/jsx-runtime");
var Shell = import_styled_components2.styled.div`
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
var Toolbar = import_styled_components2.styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[3]}`};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`;
var LeftGroup = import_styled_components2.styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;
var DragHandle = import_styled_components2.styled.span`
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
var RightActions = import_styled_components2.styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;
var Body = import_styled_components2.styled.div`
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Shell, { $isDragging: isDragging, ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Toolbar, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(LeftGroup, { children: [
        dragHandleProps && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DragHandle, { ref: dragHandleRef, title: "Glisser pour d\xE9placer", ...dragHandleProps, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.Icon, { name: "drag-vertical", size: 18 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_ui2.Badge, { $variant: "neutral", children: [
          "#",
          position
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Badge, { $variant: "primary", $pill: true, children: blockLabel ?? blockType.toUpperCase() })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(RightActions, { children: [
        onMoveUp && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_ui3.IconButton,
          {
            name: "arrow-up",
            size: "sm",
            "aria-label": "Monter le bloc",
            disabled: isFirst,
            onClick: onMoveUp
          }
        ),
        onMoveDown && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_ui3.IconButton,
          {
            name: "arrow-down",
            size: "sm",
            "aria-label": "Descendre le bloc",
            disabled: isLast,
            onClick: onMoveDown
          }
        ),
        onOpenSettings && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_ui3.IconButton,
          {
            name: "cog-outline",
            size: "sm",
            "aria-label": "Param\xE8tres du bloc",
            onClick: onOpenSettings
          }
        ),
        onDelete && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_ui3.IconButton,
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
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Body, { children })
  ] });
};

// src/editor/blocks/CarouselBlock.tsx
var import_ui9 = require("core-react/ui");
var import_ui10 = require("core-react/ui");
var import_ui11 = require("core-react/ui");
var import_ui12 = require("core-react/ui");
var import_ui13 = require("core-react/ui");
var import_ui14 = require("core-react/ui");
var import_ui15 = require("core-react/ui");
var import_styled_components3 = require("styled-components");

// src/editor/blocks/MediaSourceField.tsx
var import_ui4 = require("core-react/ui");
var import_ui5 = require("core-react/ui");
var import_ui6 = require("core-react/ui");
var import_ui7 = require("core-react/ui");
var import_ui8 = require("core-react/ui");
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  const [url, setUrl] = (0, import_react3.useState)("");
  const [isUploading, setIsUploading] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)(null);
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui8.Flex, { $direction: "column", $gap: "0.75rem", ...rest, children: [
    onUpload ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_ui7.FileDropzone,
      {
        accept,
        label,
        multiple,
        maxSizeMb,
        disabled: isUploading,
        hint: isUploading ? "T\xE9l\xE9versement en cours\u2026" : void 0,
        onFilesSelected: handleFiles
      }
    ) : uploadUnavailableHint && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui5.Alert, { variant: "info", children: uploadUnavailableHint }),
    error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui5.Alert, { variant: "danger", onClose: () => setError(null), children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_ui8.Flex, { $align: "flex-end", $gap: "0.5rem", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { flex: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_ui6.TextField,
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
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_ui4.Button,
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
var import_jsx_runtime4 = require("react/jsx-runtime");
var SlideRow = import_styled_components3.styled.div`
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui15.Flex, { $direction: "column", $gap: "1rem", ...rest, children: [
    slides.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui10.Carousel, { aspectRatio: data.aspectRatio || "16/9", autoplay, slideInterval, children: slides.map((slide) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui10.Carousel.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_ui11.Image,
      {
        src: slide.url,
        alt: slide.caption || "",
        $fit: "cover",
        style: { width: "100%", height: "100%" }
      }
    ) }, slide.id)) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_ui15.Flex, { $align: "flex-end", $gap: "1rem", $wrap: "wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        import_ui12.ChoiceField,
        {
          label: "Ratio",
          value: data.aspectRatio || "16/9",
          onChange: (e) => onChange({ ...data, aspectRatio: e.target.value }),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "16/9", children: "16:9" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "4/3", children: "4:3" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: "21/9", children: "21:9" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_ui14.ToggleField,
        {
          label: "D\xE9filement automatique",
          checked: autoplay,
          onChange: (e) => onChange({ ...data, autoplay: e.target.checked })
        }
      ),
      autoplay && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_ui13.TextField,
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
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    slides.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui15.Flex, { $direction: "column", $gap: "0.5rem", children: slides.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(SlideRow, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_ui11.Image, { src: s.url, width: 48, height: 36, $fit: "cover", $radius: "sm", alt: "" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_ui13.TextField,
        {
          "aria-label": `L\xE9gende de la diapositive ${idx + 1}`,
          placeholder: `L\xE9gende diapositive #${idx + 1}`,
          value: s.caption || "",
          onChange: (e) => updateSlideCaption(s.id, e.target.value)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_ui9.IconButton,
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
var import_ui16 = require("core-react/ui");
var import_ui17 = require("core-react/ui");
var import_ui18 = require("core-react/ui");
var import_ui19 = require("core-react/ui");
var import_jsx_runtime5 = require("react/jsx-runtime");
var CodeBlock = ({ data, onChange, ...rest }) => {
  const lineCount = (data.code || "").split("\n").length;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui19.Flex, { $direction: "column", $gap: "0", ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_ui19.Flex, { $gap: "1rem", $wrap: "wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: "1 1 200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_ui16.ChoiceField,
        {
          label: "Langage",
          value: data.language || "plaintext",
          onChange: (e) => onChange({ ...data, language: e.target.value }),
          children: CODE_LANGUAGES.map((language) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: language.value, children: language.label }, language.value))
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: "2 1 260px" }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_ui18.TextField,
        {
          label: "Nom du fichier (optionnel)",
          placeholder: "Ex : src/Controller/PostController.php",
          value: data.filename || "",
          onChange: (e) => onChange({ ...data, filename: e.target.value })
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_ui17.TextareaField,
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
var import_ui20 = require("core-react/ui");
var import_ui21 = require("core-react/ui");
var import_ui22 = require("core-react/ui");
var import_ui23 = require("core-react/ui");
var import_jsx_runtime6 = require("react/jsx-runtime");
var CtaBlock = ({ data, onChange, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui23.Flex, { $direction: "column", $gap: "0", ...rest, children: [
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_ui22.TextField,
    {
      label: "Titre",
      placeholder: "Ex : Envie d'aller plus loin ?",
      value: data.title || "",
      onChange: (e) => onChange({ ...data, title: e.target.value })
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_ui21.TextareaField,
    {
      label: "Description",
      rows: 2,
      value: data.description || "",
      onChange: (e) => onChange({ ...data, description: e.target.value })
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_ui23.Flex, { $gap: "1rem", $wrap: "wrap", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { flex: "1 1 200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_ui22.TextField,
      {
        label: "Libell\xE9 du bouton",
        placeholder: "Ex : T\xE9l\xE9charger le guide",
        value: data.buttonLabel || "",
        onChange: (e) => onChange({ ...data, buttonLabel: e.target.value })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { flex: "2 1 260px" }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_ui22.TextField,
      {
        label: "Lien du bouton",
        type: "url",
        placeholder: "https://\u2026 ou /contact",
        value: data.buttonUrl || "",
        onChange: (e) => onChange({ ...data, buttonUrl: e.target.value })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { flex: "1 1 160px" }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      import_ui20.ChoiceField,
      {
        label: "Style",
        value: data.variant || "primary",
        onChange: (e) => onChange({ ...data, variant: e.target.value }),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "primary", children: "Principal" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "secondary", children: "Secondaire" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "outline", children: "Contour" })
        ]
      }
    ) })
  ] })
] });

// src/editor/blocks/FaqBlock.tsx
var import_ui24 = require("core-react/ui");
var import_icons3 = require("core-react/icons");
var import_ui25 = require("core-react/ui");
var import_ui26 = require("core-react/ui");
var import_ui27 = require("core-react/ui");
var import_ui28 = require("core-react/ui");
var import_styled_components4 = require("styled-components");
var import_jsx_runtime7 = require("react/jsx-runtime");
var ItemCard = import_styled_components4.styled.div`
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui28.Flex, { $direction: "column", $gap: "0.75rem", ...rest, children: [
    items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ItemCard, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui28.Flex, { $align: "flex-start", $gap: "0.5rem", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          import_ui27.TextField,
          {
            label: `Question ${idx + 1}`,
            placeholder: "Ex : Comment installer le CMS ?",
            value: item.question,
            onChange: (e) => updateItem(item.id, { question: e.target.value })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          import_ui26.TextareaField,
          {
            label: "R\xE9ponse",
            rows: 3,
            value: item.answer,
            onChange: (e) => updateItem(item.id, { answer: e.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        import_ui25.IconButton,
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
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_ui24.Button, { $variant: "outline", $size: "sm", onClick: addItem, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_icons3.Icon, { name: "plus", size: 16 }),
      "Ajouter une question"
    ] }) })
  ] });
};

// src/editor/blocks/GalleryBlock.tsx
var import_ui29 = require("core-react/ui");
var import_ui30 = require("core-react/ui");
var import_ui31 = require("core-react/ui");
var import_ui32 = require("core-react/ui");
var import_ui33 = require("core-react/ui");
var import_styled_components5 = require("styled-components");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Thumbnails = import_styled_components5.styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};
`;
var Tile = import_styled_components5.styled.div`
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_ui33.Flex, { $direction: "column", $gap: "1rem", ...rest, children: [
    images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Thumbnails, { $columns: columns, children: images.map((image, idx) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Tile, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_ui30.Image, { src: image.url, alt: image.alt || "", $aspectRatio: "1/1", $fit: "cover", $radius: "base" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        import_ui29.IconButton,
        {
          name: "close",
          size: "sm",
          variant: "danger",
          round: true,
          "aria-label": `Retirer l'image ${idx + 1}`,
          onClick: () => removeImage(image.id)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        import_ui32.TextField,
        {
          "aria-label": `Texte alternatif de l'image ${idx + 1}`,
          placeholder: "Texte alternatif",
          value: image.alt || "",
          onChange: (e) => updateImage(image.id, { alt: e.target.value })
        }
      )
    ] }, image.id)) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      import_ui31.ChoiceField,
      {
        label: "Colonnes",
        value: columns,
        onChange: (e) => onChange({ ...data, columns: Number(e.target.value) }),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: 2, children: "2 colonnes" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: 3, children: "3 colonnes" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: 4, children: "4 colonnes" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
var import_ui34 = require("core-react/ui");
var import_icons4 = require("core-react/icons");
var import_ui35 = require("core-react/ui");
var import_ui36 = require("core-react/ui");
var import_ui37 = require("core-react/ui");
var import_ui38 = require("core-react/ui");
var import_ui39 = require("core-react/ui");
var import_react4 = require("react");
var import_styled_components6 = require("styled-components");
var import_jsx_runtime9 = require("react/jsx-runtime");
var ImagePreviewButton = import_styled_components6.styled.button`
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
  const [isReplacing, setIsReplacing] = (0, import_react4.useState)(false);
  const selectImage = (url) => {
    if (!url) return;
    onChange({ ...data, url });
    setIsReplacing(false);
  };
  if (!data.url) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui39.Flex, { $direction: "column", $gap: "1rem", ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui35.Figure, { caption: data.caption, captionAlign: "center", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ImagePreviewButton, { type: "button", title: "Changer l'image", onClick: () => setIsReplacing(true), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      import_ui36.Image,
      {
        src: data.url,
        alt: data.alt || "",
        $aspectRatio: data.aspectRatio || "16/9",
        $fit: "cover",
        $radius: "base"
      }
    ) }) }),
    isReplacing && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui39.Flex, { $direction: "column", $gap: "0.5rem", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        MediaSourceField,
        {
          accept: "image/*",
          label: "Nouvelle image",
          onUpload,
          onSelect: ([url]) => selectImage(url)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui39.Flex, { $justify: "flex-end", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ui34.Button, { $variant: "ghost", $size: "sm", onClick: () => setIsReplacing(false), children: "Annuler" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui39.Flex, { $gap: "1rem", $wrap: "wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { style: { flex: "1 1 240px" }, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        import_ui38.TextField,
        {
          label: "L\xE9gende",
          placeholder: "Texte affich\xE9 sous l'image\u2026",
          value: data.caption || "",
          onChange: (e) => onChange({ ...data, caption: e.target.value })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { style: { flex: "1 1 240px" }, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        import_ui38.TextField,
        {
          label: "Texte alternatif (Alt)",
          placeholder: "Description pour l'accessibilit\xE9\u2026",
          value: data.alt || "",
          onChange: (e) => onChange({ ...data, alt: e.target.value })
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui39.Flex, { $justify: "space-between", $align: "center", $gap: "1rem", $wrap: "wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
        import_ui37.ChoiceField,
        {
          label: "Format d'affichage",
          value: data.aspectRatio || "16/9",
          onChange: (e) => onChange({ ...data, aspectRatio: e.target.value }),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "16/9", children: "16:9 (Standard)" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "4/3", children: "4:3" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "1/1", children: "1:1 (Carr\xE9)" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("option", { value: "21/9", children: "21:9 (Banni\xE8re)" })
          ]
        }
      ),
      !isReplacing && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_ui34.Button, { $variant: "outline", $size: "sm", onClick: () => setIsReplacing(true), children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_icons4.Icon, { name: "image-edit-outline", size: 16 }),
        "Changer l'image"
      ] })
    ] })
  ] });
};

// src/editor/blocks/QuoteBlock.tsx
var import_ui40 = require("core-react/ui");
var import_ui41 = require("core-react/ui");
var import_ui42 = require("core-react/ui");
var import_jsx_runtime10 = require("react/jsx-runtime");
var QuoteBlock = ({ data, onChange, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui42.Flex, { $direction: "column", $gap: "0", ...rest, children: [
  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    import_ui40.TextareaField,
    {
      label: "Citation",
      rows: 3,
      placeholder: "\xAB La simplicit\xE9 est la sophistication supr\xEAme. \xBB",
      value: data.text || "",
      onChange: (e) => onChange({ ...data, text: e.target.value })
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_ui42.Flex, { $gap: "1rem", $wrap: "wrap", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: { flex: "1 1 220px" }, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      import_ui41.TextField,
      {
        label: "Auteur",
        placeholder: "Ex : L\xE9onard de Vinci",
        value: data.author || "",
        onChange: (e) => onChange({ ...data, author: e.target.value })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: { flex: "1 1 220px" }, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      import_ui41.TextField,
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
var import_ui43 = require("core-react/ui");
var import_icons5 = require("core-react/icons");
var import_ui44 = require("core-react/ui");
var import_ui45 = require("core-react/ui");
var import_ui46 = require("core-react/ui");
var import_ui47 = require("core-react/ui");
var import_ui48 = require("core-react/ui");
var import_styled_components7 = require("styled-components");
var import_jsx_runtime11 = require("react/jsx-runtime");
var Grid = import_styled_components7.styled.div`
  overflow-x: auto;
`;
var EditTable = import_styled_components7.styled.table`
  border-collapse: collapse;
  width: 100%;

  td {
    padding: ${({ theme }) => theme.spacing[1]};
    vertical-align: middle;
  }
`;
var HeaderCell = import_styled_components7.styled.td`
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui48.Flex, { $direction: "column", $gap: "0.75rem", ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Grid, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(EditTable, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("tbody", { children: [
      rows.map((row, rowIndex) => {
        const isHeader = data.hasHeader && rowIndex === 0;
        const Cell = isHeader ? HeaderCell : "td";
        return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("tr", { children: [
          Array.from({ length: columnCount }, (_, colIndex) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            import_ui47.Input,
            {
              "aria-label": `Ligne ${rowIndex + 1}, colonne ${colIndex + 1}`,
              placeholder: isHeader ? "En-t\xEAte" : "",
              value: row[colIndex] ?? "",
              onChange: (e) => setCell(rowIndex, colIndex, e.target.value)
            }
          ) }, colIndex)),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("td", { style: { width: 36 }, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            import_ui44.IconButton,
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
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("tr", { children: [
        Array.from({ length: columnCount }, (_, colIndex) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("td", { style: { textAlign: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          import_ui44.IconButton,
          {
            name: "close",
            size: "sm",
            variant: "ghost",
            "aria-label": `Supprimer la colonne ${colIndex + 1}`,
            disabled: columnCount <= 1,
            onClick: () => removeColumn(colIndex)
          }
        ) }, colIndex)),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("td", {})
      ] })
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui48.Flex, { $gap: "0.5rem", $wrap: "wrap", $align: "center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui43.Button, { $variant: "outline", $size: "sm", onClick: addRow, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_icons5.Icon, { name: "table-row-plus-after", size: 16 }),
        "Ligne"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_ui43.Button, { $variant: "outline", $size: "sm", onClick: addColumn, disabled: columnCount >= MAX_COLUMNS, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_icons5.Icon, { name: "table-column-plus-after", size: 16 }),
        "Colonne"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_ui45.ToggleField,
        {
          label: "Premi\xE8re ligne en en-t\xEAte",
          checked: data.hasHeader,
          onChange: (e) => onChange({ ...data, hasHeader: e.target.checked })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      import_ui46.TextField,
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
var import_ui49 = require("core-react/ui");
var import_jsx_runtime12 = require("react/jsx-runtime");
var TextBlock = ({ data, onChange, ...rest }) => {
  const lineCount = (data.content || "").split("\n").length;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    import_ui49.TextareaField,
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
var import_ui50 = require("core-react/ui");
var import_ui51 = require("core-react/ui");
var import_ui52 = require("core-react/ui");
var import_ui53 = require("core-react/ui");
var import_ui54 = require("core-react/ui");
var import_jsx_runtime13 = require("react/jsx-runtime");
var VideoBlock = ({ data, onChange, onUpload, ...rest }) => {
  if (!data.url) {
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui54.Flex, { $direction: "column", $gap: "1rem", ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui51.Video, { src: data.url, aspectRatio: data.aspectRatio || "16/9", radius: "base", controls: true }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      import_ui53.TextField,
      {
        label: "L\xE9gende de la vid\xE9o",
        placeholder: "Courte description\u2026",
        value: data.caption || "",
        onChange: (e) => onChange({ ...data, caption: e.target.value })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_ui54.Flex, { $justify: "space-between", $align: "center", $gap: "1rem", $wrap: "wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
        import_ui52.ChoiceField,
        {
          label: "Ratio vid\xE9o",
          value: data.aspectRatio || "16/9",
          onChange: (e) => onChange({ ...data, aspectRatio: e.target.value }),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("option", { value: "16/9", children: "16:9 (Paysage classique)" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("option", { value: "9/16", children: "9:16 (Format vertical / mobile)" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("option", { value: "4/3", children: "4:3" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_ui50.Button, { $variant: "ghost", $size: "sm", onClick: () => onChange({ ...data, url: "" }), children: "Changer de vid\xE9o" })
    ] })
  ] });
};

// src/editor/BlockCanvas.tsx
var import_core = require("@dnd-kit/core");
var import_sortable = require("@dnd-kit/sortable");
var import_utilities = require("@dnd-kit/utilities");
var import_react5 = require("react");
var import_styled_components8 = require("styled-components");
var import_ui55 = require("core-react/ui");
var import_ui56 = require("core-react/ui");
var import_jsx_runtime14 = require("react/jsx-runtime");
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
var Stack = import_styled_components8.styled.div`
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
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = (0, import_sortable.useSortable)({
    id: block.key
  });
  const nodeRef = (0, import_react5.useRef)(null);
  const setRefs = (0, import_react5.useCallback)(
    (node) => {
      nodeRef.current = node;
      setNodeRef(node);
    },
    [setNodeRef]
  );
  (0, import_react5.useEffect)(() => {
    const node = nodeRef.current;
    if (!isNew || !node) return;
    node.scrollIntoView?.({ behavior: "smooth", block: "center" });
    node.querySelector('textarea, input:not([type="file"]):not([type="hidden"]), select')?.focus({ preventScroll: true });
  }, [isNew]);
  const style = {
    transform: import_utilities.CSS.Translate.toString(transform),
    transition,
    position: "relative",
    zIndex: isDragging ? 10 : void 0
  };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { ref: setRefs, style, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Editor, { data: block.data, onChange: (data) => onChange(block.key, data), onUpload })
    }
  ) });
};
var BlockItem = (0, import_react5.memo)(BlockItemInner);
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
  const labels = (0, import_react5.useMemo)(() => ({ ...DEFAULT_BLOCK_CANVAS_LABELS, ...labelOverrides }), [labelOverrides]);
  const [toDelete, setToDelete] = (0, import_react5.useState)(null);
  const [lastAddedKey, setLastAddedKey] = (0, import_react5.useState)(null);
  const insertBlock = (0, import_react5.useCallback)(
    (type, index) => {
      if (registry.isBlockType(type)) setLastAddedKey(onAdd(type, index));
    },
    [onAdd, registry]
  );
  const sensors = (0, import_core.useSensors)(
    // Le glisser ne démarre qu'après 6 px : un simple clic sur la poignée ne déplace rien
    (0, import_core.useSensor)(import_core.PointerSensor, { activationConstraint: { distance: 6 } }),
    (0, import_core.useSensor)(import_core.KeyboardSensor, { coordinateGetter: import_sortable.sortableKeyboardCoordinates })
  );
  const itemIds = (0, import_react5.useMemo)(() => blocks.map((block) => block.key), [blocks]);
  const announcements = (0, import_react5.useMemo)(() => {
    const positionOf = (id) => itemIds.indexOf(String(id)) + 1;
    const total = itemIds.length;
    return {
      onDragStart: ({ active }) => labels.onDragStart(positionOf(active.id)),
      onDragOver: ({ active, over }) => over ? labels.onDragOver(positionOf(active.id), positionOf(over.id), total) : void 0,
      onDragEnd: ({ active, over }) => over ? labels.onDragEnd(positionOf(over.id), total) : labels.onDragDropped(positionOf(active.id)),
      onDragCancel: ({ active }) => labels.onDragCancel(positionOf(active.id))
    };
  }, [itemIds, labels]);
  const screenReaderInstructions = (0, import_react5.useMemo)(
    () => ({ draggable: labels.screenReaderInstructions }),
    [labels]
  );
  const handleDragEnd = (0, import_react5.useCallback)(
    ({ active, over }) => {
      if (over && active.id !== over.id) onReorder(String(active.id), String(over.id));
    },
    [onReorder]
  );
  const requestDelete = (0, import_react5.useCallback)(
    (block) => {
      if (isEmptyData(block.data)) onRemove(block.key);
      else setToDelete(block);
    },
    [onRemove]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(Stack, { children: [
    blocks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      import_ui55.EmptyState,
      {
        icon: "view-dashboard-variant-outline",
        title: labels.emptyTitle,
        description: labels.emptyDescription
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      import_core.DndContext,
      {
        sensors,
        collisionDetection: import_core.closestCenter,
        onDragEnd: handleDragEnd,
        accessibility: { announcements, screenReaderInstructions },
        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_sortable.SortableContext, { items: itemIds, strategy: import_sortable.verticalListSortingStrategy, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Stack, { children: blocks.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_react5.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            BlockPicker,
            {
              variant: "inline",
              inlineLabel: labels.insertAt(index + 1),
              availableBlocks: registry.definitions,
              onSelectBlock: (type) => insertBlock(type, index)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(BlockPicker, { availableBlocks: registry.definitions, onSelectBlock: (type) => insertBlock(type) }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      import_ui56.ConfirmDialog,
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
var import_styled_components10 = require("styled-components");

// src/editor/BlockViews.tsx
var import_styled_components9 = require("styled-components");
var import_ui57 = require("core-react/ui");
var import_ui58 = require("core-react/ui");
var import_ui59 = require("core-react/ui");
var import_ui60 = require("core-react/ui");
var import_ui61 = require("core-react/ui");
var import_ui62 = require("core-react/ui");
var import_ui63 = require("core-react/ui");
var import_ui64 = require("core-react/ui");
var import_ui65 = require("core-react/ui");
var import_ui66 = require("core-react/ui");
var import_ui67 = require("core-react/ui");
var import_jsx_runtime15 = require("react/jsx-runtime");
var CodeFrame = import_styled_components9.styled.figure`
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
var Blockquote = import_styled_components9.styled.blockquote`
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
var CtaBox = import_styled_components9.styled.aside`
  padding: ${({ theme }) => theme.spacing[5]};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
`;
var EmptyBlockView = () => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui66.Text, { $size: "sm", $color: "muted", children: "Bloc vide." });
var TEXT_MARKDOWN = { headingOffset: 1 };
var TextBlockView = ({ data }) => data.content ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui59.MarkdownViewer, { ...TEXT_MARKDOWN, children: data.content }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyBlockView, {});
var ImageBlockView = ({ data }) => data.url ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui62.Figure, { caption: data.caption, captionAlign: "center", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
  import_ui64.Image,
  {
    src: data.url,
    alt: data.alt || "",
    $aspectRatio: data.aspectRatio || "16/9",
    $fit: "cover",
    $radius: "base"
  }
) }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyBlockView, {});
var VideoBlockView = ({ data }) => data.url ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui62.Figure, { caption: data.caption, captionAlign: "center", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui65.Video, { src: data.url, aspectRatio: data.aspectRatio || "16/9", radius: "base", controls: true }) }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyBlockView, {});
var CodeBlockView = ({ data }) => data.code ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(CodeFrame, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("figcaption", { children: data.filename || data.language }),
  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("pre", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("code", { children: data.code }) })
] }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyBlockView, {});
var QuoteBlockView = ({ data }) => data.text ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(Blockquote, { cite: data.source?.startsWith("http") ? data.source : void 0, children: [
  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: data.text }),
  (data.author || data.source) && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("footer", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui66.Text, { $size: "sm", $color: "muted", children: [
    "\u2014 ",
    data.author,
    data.author && data.source ? ", " : "",
    data.source && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("cite", { children: data.source })
  ] }) })
] }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyBlockView, {});
var GalleryBlockView = ({ data }) => data.images?.length ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui63.Gallery, { $columns: data.columns || 3, $minColumnWidth: "160px", $gap: "0.75rem", children: data.images.map((image) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui63.Gallery.Item, { $hoverZoom: true, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui64.Image, { src: image.url, alt: image.alt || "", $radius: "base" }) }, image.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyBlockView, {});
var CarouselBlockView = ({ data }) => data.slides?.length ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
  import_ui61.Carousel,
  {
    aspectRatio: data.aspectRatio || "16/9",
    autoplay: data.autoplay,
    slideInterval: data.slideInterval,
    children: data.slides.map((slide) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui61.Carousel.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      import_ui64.Image,
      {
        src: slide.url,
        alt: slide.caption || "",
        $fit: "cover",
        style: { width: "100%", height: "100%" }
      }
    ) }, slide.id))
  }
) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyBlockView, {});
var TableBlockView = ({ data }) => {
  const rows = data.rows ?? [];
  if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyBlockView, {});
  const [header, ...body] = data.hasHeader ? rows : [void 0, ...rows];
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui62.Figure, { caption: data.caption, captionAlign: "center", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui60.Table, { $bordered: true, $striped: true, children: [
    header && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui60.Thead, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui60.TRow, { children: header.map((cell, idx) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui60.Th, { children: cell }, idx)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui60.Tbody, { children: body.map((row, rowIdx) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui60.TRow, { children: row?.map((cell, idx) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui60.Td, { children: cell }, idx)) }, rowIdx)) })
  ] }) });
};
var FaqBlockView = ({ data }) => data.items?.length ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui58.Accordion, { multiple: true, children: data.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_ui58.Accordion.Item, { itemKey: item.id, children: [
  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui58.Accordion.Trigger, { children: item.question || "Question sans titre" }),
  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui58.Accordion.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui66.Text, { as: "p", style: { margin: 0 }, children: item.answer }) })
] }, item.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyBlockView, {});
var CtaBlockView = ({ data }) => data.title || data.buttonLabel ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(CtaBox, { children: [
  data.title && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui67.Title, { as: "h3", children: data.title }),
  data.description && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_ui66.Text, { as: "p", style: { marginTop: 0 }, children: data.description }),
  data.buttonLabel && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_ui57.Button,
    {
      href: data.buttonUrl || "#",
      target: "_blank",
      rel: "noreferrer",
      $variant: data.variant || "primary",
      children: data.buttonLabel
    }
  )
] }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(EmptyBlockView, {});

// src/editor/BlockList.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
var Flow = import_styled_components10.styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;
var BlockList = ({ registry, blocks, className }) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Flow, { className, children: [...blocks].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)).map((block, index) => {
  if (!registry.isBlockType(block.type)) return null;
  const View = registry.get(block.type).View ?? EmptyBlockView;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(View, { data: block.data }, block.key ?? block.id ?? index);
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
var import_react6 = require("react");
var arrayMove = (items, from, to) => {
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};
var serialize = (blocks) => JSON.stringify(blocks.map(({ id, type, data, settings }) => ({ id, type, data, settings })));
var useBlocksState = (registry, initialBlocks = []) => {
  const toEditorBlocks = (0, import_react6.useCallback)(
    (blocks2) => [...blocks2].sort((a, b) => a.position - b.position).filter((block) => registry.isBlockType(block.type)).map((block) => ({
      key: block.id,
      id: block.id,
      type: block.type,
      data: { ...registry.createData(block.type), ...block.data },
      settings: block.settings ?? null
    })),
    [registry]
  );
  const [blocks, setBlocks] = (0, import_react6.useState)(() => toEditorBlocks(initialBlocks));
  const [snapshot, setSnapshot] = (0, import_react6.useState)(() => serialize(toEditorBlocks(initialBlocks)));
  const addBlock = (0, import_react6.useCallback)(
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
  const updateBlock = (0, import_react6.useCallback)((key, data) => {
    setBlocks((current) => current.map((block) => block.key === key ? { ...block, data } : block));
  }, []);
  const updateSettings = (0, import_react6.useCallback)((key, settings) => {
    setBlocks((current) => current.map((block) => block.key === key ? { ...block, settings } : block));
  }, []);
  const moveBlock = (0, import_react6.useCallback)((key, direction) => {
    setBlocks((current) => {
      const index = current.findIndex((block) => block.key === key);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      return arrayMove(current, index, target);
    });
  }, []);
  const reorderBlocks = (0, import_react6.useCallback)((activeKey, overKey) => {
    if (activeKey === overKey) return;
    setBlocks((current) => {
      const from = current.findIndex((block) => block.key === activeKey);
      const to = current.findIndex((block) => block.key === overKey);
      return from < 0 || to < 0 ? current : arrayMove(current, from, to);
    });
  }, []);
  const removeBlock = (0, import_react6.useCallback)((key) => {
    setBlocks((current) => current.filter((block) => block.key !== key));
  }, []);
  const resetBlocks = (0, import_react6.useCallback)(
    (saved) => {
      const next = toEditorBlocks(saved);
      setBlocks(next);
      setSnapshot(serialize(next));
    },
    [toEditorBlocks]
  );
  const isDirty = (0, import_react6.useMemo)(() => serialize(blocks) !== snapshot, [blocks, snapshot]);
  const toPayload = (0, import_react6.useCallback)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.cjs.map