'use client';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/ui/index.ts
var ui_exports = {};
__export(ui_exports, {
  Accordion: () => Accordion,
  AccordionContent: () => AccordionContent,
  AccordionContext: () => AccordionContext,
  AccordionItem: () => AccordionItem,
  AccordionItemContext: () => AccordionItemContext,
  AccordionProvider: () => AccordionProvider,
  AccordionTrigger: () => AccordionTrigger,
  Alert: () => Alert,
  Avatar: () => Avatar,
  BackButton: () => BackButton,
  Badge: () => Badge,
  Breadcrumb: () => Breadcrumb,
  BreadcrumbContainer: () => BreadcrumbContainer,
  BreadcrumbItem: () => BreadcrumbItem,
  Button: () => Button,
  ButtonBase: () => ButtonBase,
  Card: () => Card,
  CardBody: () => CardBody,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardTitle: () => CardTitle,
  Carousel: () => Carousel,
  CarouselIndicator: () => CarouselIndicator,
  CarouselItem: () => CarouselItem,
  CarouselSlide: () => CarouselSlide,
  CheckField: () => CheckField,
  Checkbox: () => Checkbox,
  ChoiceField: () => ChoiceField,
  Col: () => Col,
  Columns: () => Columns,
  ConfirmDialog: () => ConfirmDialog,
  Container: () => Container3,
  DS_ICONS: () => import_icons18.DS_ICONS,
  DS_ICON_ALIASES: () => import_icons18.DS_ICON_ALIASES,
  Dialog: () => Dialog,
  Display: () => Display,
  Divider: () => Divider,
  Drawer: () => Drawer,
  DrawerBody: () => DrawerBody,
  DrawerFooter: () => DrawerFooter,
  DrawerHeader: () => DrawerHeader,
  Dropdown: () => Dropdown,
  DropdownContext: () => DropdownContext,
  DropdownDivider: () => DropdownDivider,
  DropdownItem: () => DropdownItem,
  DropdownMenu: () => DropdownMenu,
  DropdownTrigger: () => DropdownTrigger,
  EmptyState: () => EmptyState,
  Figure: () => Figure,
  FigureCaption: () => FigureCaption,
  FileDropzone: () => FileDropzone,
  Flex: () => Flex,
  Gallery: () => Gallery,
  GalleryItem: () => GalleryItem,
  GenericDropdownContext: () => GenericDropdownContext,
  GlobalStyle: () => GlobalStyle,
  Grid: () => Grid,
  HelperText: () => HelperText,
  Icon: () => import_icons18.Icon,
  IconButton: () => IconButton,
  Image: () => Image,
  Input: () => Input,
  InputAddon: () => InputAddon,
  InputGroup: () => InputGroup,
  Label: () => Label,
  Lead: () => Lead,
  Link: () => Link,
  ListGroup: () => ListGroup,
  ListGroupItem: () => ListGroupItem,
  Loading: () => Loading,
  MarkdownContent: () => MarkdownContent,
  MarkdownEditor: () => MarkdownEditor,
  MarkdownViewer: () => MarkdownViewer,
  Modal: () => Modal,
  ModalBody: () => ModalBody,
  ModalFooter: () => ModalFooter,
  ModalHeader: () => ModalHeader,
  ModalRoot: () => ModalRoot,
  Navbar: () => Navbar,
  NavbarBrand: () => NavbarBrand,
  NavbarCollapse: () => NavbarCollapse,
  NavbarContext: () => NavbarContext,
  NavbarDropdown: () => NavbarDropdown,
  NavbarDropdownDivider: () => NavbarDropdownDivider,
  NavbarDropdownHeader: () => NavbarDropdownHeader,
  NavbarDropdownItem: () => NavbarDropdownItem,
  NavbarDropdownMenu: () => NavbarDropdownMenu,
  NavbarDropdownToggle: () => NavbarDropdownToggle,
  NavbarItem: () => NavbarItem,
  NavbarLink: () => NavbarLink,
  NavbarLinkBase: () => NavbarLinkBase,
  NavbarNav: () => NavbarNav,
  NavbarToggle: () => NavbarToggle,
  OUTLINE_COMPAT_ALIASES: () => import_icons18.OUTLINE_COMPAT_ALIASES,
  Pagination: () => Pagination,
  Progress: () => Progress,
  Prose: () => Prose,
  Radio: () => Radio,
  Row: () => Row,
  SegmentedControl: () => SegmentedControl,
  Select: () => Select,
  Sidebar: () => Sidebar,
  SidebarContext: () => SidebarContext,
  SidebarFooter: () => SidebarFooter,
  SidebarHeader: () => SidebarHeader,
  SidebarItem: () => SidebarItem,
  SidebarLink: () => SidebarLink,
  SidebarNav: () => SidebarNav,
  SidebarProvider: () => SidebarProvider,
  SidebarSection: () => SidebarSection,
  SidebarToggle: () => SidebarToggle,
  Skeleton: () => Skeleton,
  StatCard: () => StatCard,
  TRow: () => TRow,
  TabContent: () => TabContent,
  TabList: () => TabList,
  TabTrigger: () => TabTrigger,
  Table: () => Table,
  Tabs: () => Tabs,
  TabsContext: () => TabsContext,
  TagInput: () => TagInput,
  Tbody: () => Tbody,
  Td: () => Td,
  Text: () => Text,
  TextField: () => TextField,
  Textarea: () => Textarea,
  TextareaField: () => TextareaField,
  Tfoot: () => Tfoot,
  Th: () => Th,
  Thead: () => Thead,
  ThemeModeSwitcher: () => ThemeModeSwitcher,
  Title: () => Title3,
  Toast: () => Toast,
  ToastContainer: () => ToastContainer,
  Toggle: () => Toggle,
  ToggleField: () => ToggleField,
  Tooltip: () => Tooltip,
  UIProvider: () => import_core_react11.UIProvider,
  Video: () => Video,
  iconNames: () => import_icons18.iconNames,
  parseMarkdown: () => parseMarkdown,
  renderMarkdownTokens: () => renderMarkdownTokens,
  useAccordion: () => useAccordion,
  useAccordionItem: () => useAccordionItem,
  useDropdown: () => useDropdown,
  useGenericDropdown: () => useGenericDropdown,
  useLinkProps: () => import_core_react11.useLinkProps,
  useMarkdown: () => useMarkdown,
  useNavbar: () => useNavbar,
  useSidebar: () => useSidebar,
  useTabs: () => useTabs,
  useToast: () => useToast,
  useToastStore: () => useToastStore,
  useUI: () => import_core_react11.useUI
});
module.exports = __toCommonJS(ui_exports);

// src/ui/components/Base/Avatar.tsx
var import_react = require("react");
var import_styled_components = require("styled-components");
var import_core_react = require("core-react");
var import_jsx_runtime = require("react/jsx-runtime");
var avatarSizes = {
  xs: 18,
  sm: 28,
  base: 36,
  lg: 48
};
var getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    const first = parts[0]?.[0] ?? "";
    const second = parts[1]?.[0] ?? "";
    return `${first}${second}`.toUpperCase();
  }
  return (name[0] ?? "?").toUpperCase();
};
var AvatarContainer = import_styled_components.styled.div`
  width: ${({ $size }) => `${avatarSizes[$size]}px`};
  height: ${({ $size }) => `${avatarSizes[$size]}px`};
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.tertiary.subtle};
  color: ${({ theme }) => theme.colors.tertiary.dark};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  font-size: ${({ $size }) => $size === "xs" ? "0.5625rem" : $size === "sm" ? "0.75rem" : $size === "lg" ? "1.125rem" : "0.875rem"};
  overflow: hidden;
  user-select: none;
  flex-shrink: 0;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;
var AvatarImage = import_styled_components.styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var Avatar = ({ src, alt = "", name, size = "base", ...rest }) => {
  const [hasError, setHasError] = (0, import_react.useState)(false);
  const { imageComponent } = (0, import_core_react.useUI)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarContainer, { $size: size, ...rest, children: src && !hasError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    AvatarImage,
    {
      as: imageComponent,
      src,
      alt: alt || name || "Avatar",
      width: avatarSizes[size],
      height: avatarSizes[size],
      onError: () => setHasError(true)
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getInitials(name) }) });
};

// src/ui/components/Base/Badge.tsx
var import_styled_components2 = require("styled-components");
var Badge = import_styled_components2.styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => `2px ${theme.spacing[2]}`};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  line-height: 1.2;
  border-radius: ${({ $pill, theme }) => $pill === true ? theme.radii.pill : theme.radii.sm};
  white-space: nowrap;

  ${({ $color }) => $color && import_styled_components2.css`
      background-color: ${$color}20;
      color: ${$color};
      border: 1px solid ${$color}40;
    `}

  ${({ $color, $variant = "neutral", theme }) => {
  if ($color) return "";
  switch ($variant) {
    case "primary":
      return import_styled_components2.css`
          background-color: ${theme.colors.primary.subtle};
          color: ${theme.colors.primary.dark};
        `;
    case "secondary":
      return import_styled_components2.css`
          background-color: ${theme.colors.secondary.subtle};
          color: ${theme.colors.secondary.dark};
        `;
    case "danger":
      return import_styled_components2.css`
          background-color: ${theme.colors.danger.subtle};
          color: ${theme.colors.danger.dark};
        `;
    case "success":
      return import_styled_components2.css`
          background-color: ${theme.colors.success.subtle};
          color: ${theme.colors.success.dark};
        `;
    case "warning":
      return import_styled_components2.css`
          background-color: ${theme.colors.warning.subtle};
          color: ${theme.colors.warning.dark};
        `;
    case "info":
      return import_styled_components2.css`
          background-color: ${theme.colors.info.subtle};
          color: ${theme.colors.info.dark};
        `;
    case "neutral":
    default:
      return import_styled_components2.css`
          background-color: ${theme.colors.background.surfaceActive};
          color: ${theme.colors.text.muted};
        `;
  }
}}
`;

// src/ui/components/Base/Button.tsx
var import_styled_components3 = require("styled-components");
var import_core_react2 = require("core-react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var sizeStyles = {
  sm: import_styled_components3.css`
    padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  `,
  base: import_styled_components3.css`
    padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[3.5]}`};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  `,
  lg: import_styled_components3.css`
    padding: ${({ theme }) => `${theme.spacing[2.5]} ${theme.spacing[5]}`};
    font-size: ${({ theme }) => theme.typography.sizes.base};
  `
};
var ButtonBase = import_styled_components3.styled.button.attrs((props) => ({
  type: props.href || props.as && props.as !== "button" ? void 0 : props.type || "button"
}))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-family: inherit;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid transparent;
  cursor: pointer;
  line-height: 1.2;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease;
  white-space: nowrap;
  user-select: none;
  width: ${({ $fullWidth }) => $fullWidth ? "100%" : "auto"};

  ${({ $size = "base" }) => sizeStyles[$size]}

  ${({ $variant = "primary", theme }) => {
  switch ($variant) {
    case "secondary":
      return import_styled_components3.css`
          background-color: ${theme.colors.secondary.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary.hover};
          }
        `;
    case "tertiary":
      return import_styled_components3.css`
          background-color: ${theme.colors.tertiary.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.tertiary.hover};
          }
        `;
    case "danger":
      return import_styled_components3.css`
          background-color: ${theme.colors.danger.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.danger.hover};
          }
        `;
    case "outline":
      return import_styled_components3.css`
          background-color: transparent;
          border-color: ${theme.colors.border.default};
          color: ${theme.colors.text.body};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.surfaceHover};
            border-color: ${theme.colors.border.hover};
          }
        `;
    case "ghost":
      return import_styled_components3.css`
          background-color: transparent;
          color: ${theme.colors.text.body};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.surfaceHover};
          }
        `;
    case "primary":
    default:
      return import_styled_components3.css`
          background-color: ${theme.colors.primary.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary.hover};
          }
        `;
  }
}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $loading }) => $loading && import_styled_components3.css`
      pointer-events: none;
      opacity: 0.7;
    `}
`;
var Button = ({ href, as, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ButtonBase, { ...props, ...(0, import_core_react2.useLinkProps)(href, as) });

// src/ui/components/Base/Divider.tsx
var import_styled_components4 = require("styled-components");
var Divider = import_styled_components4.styled.hr`
  border: none;
  background-color: ${({ theme }) => theme.colors.border.default};
  margin: 0;
  flex-shrink: 0;

  ${({ $orientation = "horizontal", $margin, theme }) => $orientation === "horizontal" ? import_styled_components4.css`
          width: 100%;
          height: 1px;
          margin: ${$margin || `${theme.spacing[2]} 0`};
        ` : import_styled_components4.css`
          width: 1px;
          height: 100%;
          min-height: 1rem;
          margin: ${$margin || `0 ${theme.spacing[2]}`};
        `}
`;

// src/ui/components/Base/IconButton.tsx
var import_styled_components5 = require("styled-components");
var import_core_react3 = require("core-react");
var import_icons = require("core-react/icons");
var import_jsx_runtime3 = require("react/jsx-runtime");
var dimensions = {
  sm: "28px",
  base: "36px",
  lg: "44px"
};
var iconSizes = {
  sm: 14,
  base: 18,
  lg: 22
};
var StyledIconButton = (0, import_styled_components5.styled)(ButtonBase)`
  padding: 0;
  width: ${({ $size = "base" }) => dimensions[$size]};
  height: ${({ $size = "base" }) => dimensions[$size]};
  border-radius: ${({ $round, theme }) => $round ? theme.radii.full : theme.radii.base};
  flex-shrink: 0;
`;
var IconButton = ({
  name,
  size = "base",
  variant = "ghost",
  round = false,
  ...rest
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    StyledIconButton,
    {
      type: "button",
      $size: size,
      $variant: variant,
      $round: round,
      ...rest,
      ...(0, import_core_react3.useLinkProps)(rest.href, rest.as),
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons.Icon, { name, size: iconSizes[size] })
    }
  );
};

// src/ui/components/Base/Link.tsx
var import_react2 = require("react");
var import_styled_components6 = require("styled-components");
var import_core_react4 = require("core-react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var linkStyles = import_styled_components6.css`
  color: ${({ theme }) => theme.colors.primary.base};
  text-decoration: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  transition: color 0.15s ease;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  font-family: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.hover};
    text-decoration: underline;
  }
`;
var StyledAnchor = import_styled_components6.styled.a`
  ${linkStyles}
`;
var StyledNonAnchor = import_styled_components6.styled.span`
  ${linkStyles}
`;
var Link = ({ as = "a", href, onClick, children, ...rest }) => {
  const linkProps = (0, import_core_react4.useLinkProps)(href);
  const { navigation } = (0, import_core_react4.useUI)();
  if (as === "a") {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(StyledAnchor, { ...linkProps, onClick, ...rest, children });
  }
  const handleClick = (e) => {
    onClick?.(e);
    if (href && !e.defaultPrevented) navigation.push(href);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(StyledNonAnchor, { as, onClick: handleClick, ...rest, children });
};

// src/ui/components/Base/SegmentedControl.tsx
var import_icons2 = require("core-react/icons");
var import_react3 = require("react");
var import_styled_components7 = require("styled-components");
var import_jsx_runtime5 = require("react/jsx-runtime");
var SIZES = {
  sm: { block: 1.5, inline: 3, font: "xs", icon: 15 },
  md: { block: 2, inline: 3.5, font: "sm", icon: 17 }
};
var Group = import_styled_components7.styled.div`
  display: ${({ $fullWidth }) => $fullWidth ? "flex" : "inline-flex"};
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => theme.spacing[1]};
  max-width: 100%;
  border: ${({ theme }) => theme.borders.widths.thin} solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg ?? theme.radii.base};
  background-color: ${({ theme }) => theme.colors.background.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  ${({ $fullWidth }) => $fullWidth && import_styled_components7.css`
      width: 100%;

      & > button {
        flex: 1 1 0;
      }
    `}
`;
var Segment = import_styled_components7.styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1.5]};
  padding: ${({ theme, $size }) => `${theme.spacing[SIZES[$size].block]} ${theme.spacing[SIZES[$size].inline]}`};
  border: none;
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: ${({ $selected, theme }) => $selected ? theme.colors.primary.subtle : "transparent"};
  color: ${({ $selected, theme }) => $selected ? theme.colors.primary.dark : theme.colors.text.body};
  font-family: inherit;
  font-size: ${({ theme, $size }) => theme.typography.sizes[SIZES[$size].font]};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background-color: ${({ $selected, theme }) => $selected ? theme.colors.primary.subtle : theme.colors.background.surfaceHover};
  }

  &:active {
    background-color: ${({ $selected, theme }) => $selected ? theme.colors.primary.subtle : theme.colors.background.surfaceActive};
  }

  &:focus-visible {
    outline: ${({ theme }) => `${theme.borders.focusRing.width} solid${theme.borders.focusRing.color}`};
    outline-offset: -2px;
  }
`;
var SegmentedControl = ({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  fullWidth = false,
  size = "md",
  showCheck = false
}) => {
  const buttonsRef = (0, import_react3.useRef)([]);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const tabbableIndex = selectedIndex === -1 ? 0 : selectedIndex;
  const handleKeyDown = (event) => {
    const last = options.length - 1;
    let next;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = selectedIndex >= last ? 0 : selectedIndex + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = selectedIndex <= 0 ? last : selectedIndex - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    const target = options[next];
    if (!target) return;
    onChange(target.value);
    buttonsRef.current[next]?.focus();
  };
  const iconSize = SIZES[size].icon;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Group, { role: "radiogroup", "aria-label": ariaLabel, $fullWidth: fullWidth, onKeyDown: handleKeyDown, children: options.map((option, index) => {
    const selected = index === selectedIndex;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      Segment,
      {
        ref: (element) => {
          buttonsRef.current[index] = element;
        },
        type: "button",
        role: "radio",
        "aria-checked": selected,
        "aria-label": !option.label ? option.title ?? option.value : void 0,
        tabIndex: index === tabbableIndex ? 0 : -1,
        title: option.title,
        $selected: selected,
        $size: size,
        onClick: () => onChange(option.value),
        children: [
          option.icon ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_icons2.Icon, { name: option.icon, size: iconSize }) : selected && showCheck && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_icons2.Icon, { name: "check", size: iconSize }),
          option.label && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: option.label })
        ]
      },
      option.value
    );
  }) });
};

// src/ui/components/Content/Accordion/Accordion.tsx
var import_styled_components11 = require("styled-components");

// src/ui/components/Content/Accordion/AccordionContent.tsx
var import_styled_components8 = require("styled-components");

// src/ui/components/Content/Accordion/AccordionItemContext.tsx
var import_react4 = require("react");
var AccordionItemContext = (0, import_react4.createContext)(null);
var useAccordionItem = () => {
  const context = (0, import_react4.useContext)(AccordionItemContext);
  if (!context) {
    throw new Error("useAccordionItem must be used within an <AccordionItem>");
  }
  return context;
};

// src/ui/components/Content/Accordion/AccordionContent.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var ContentWrapper = import_styled_components8.styled.div`
  display: ${({ $isOpen }) => $isOpen ? "block" : "none"};
  padding-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.body};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
var AccordionContent = ({ children, ...rest }) => {
  const { isOpen } = useAccordionItem();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ContentWrapper, { $isOpen: isOpen, ...rest, children });
};

// src/ui/components/Content/Accordion/AccordionContext.tsx
var import_react5 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
var AccordionContext = (0, import_react5.createContext)(null);
var useAccordion = () => {
  const context = (0, import_react5.useContext)(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an <Accordion>");
  }
  return context;
};
var AccordionProvider = ({
  children,
  multiple = false,
  defaultActiveKeys = []
}) => {
  const [activeKeys, setActiveKeys] = (0, import_react5.useState)(defaultActiveKeys);
  const toggleKey = (key) => {
    setActiveKeys((prev) => {
      const isOpen = prev.includes(key);
      if (multiple) {
        return isOpen ? prev.filter((k) => k !== key) : [...prev, key];
      }
      return isOpen ? [] : [key];
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(AccordionContext.Provider, { value: { activeKeys, toggleKey }, children });
};

// src/ui/components/Content/Accordion/AccordionItem.tsx
var import_react6 = require("react");
var import_styled_components9 = require("styled-components");
var import_jsx_runtime8 = require("react/jsx-runtime");
var ItemWrapper = import_styled_components9.styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;
var AccordionItem = ({ itemKey, children, ...rest }) => {
  const autoKey = (0, import_react6.useId)();
  const key = itemKey || autoKey;
  const { activeKeys, toggleKey } = useAccordion();
  const isOpen = activeKeys.includes(key);
  const itemContextValue = {
    itemKey: key,
    isOpen,
    toggle: () => toggleKey(key)
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(AccordionItemContext.Provider, { value: itemContextValue, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ItemWrapper, { ...rest, children }) });
};

// src/ui/components/Content/Accordion/AccordionTrigger.tsx
var import_icons3 = require("core-react/icons");
var import_styled_components10 = require("styled-components");
var import_jsx_runtime9 = require("react/jsx-runtime");
var StyledTriggerButton = import_styled_components10.styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} 0`};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.heading};
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.base};
  }

  & > i {
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) => $isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;
var AccordionTrigger = ({ children, ...rest }) => {
  const { isOpen, toggle } = useAccordionItem();
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(StyledTriggerButton, { type: "button", $isOpen: isOpen, onClick: toggle, "aria-expanded": isOpen, ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_icons3.Icon, { name: "chevron-down", size: 18 })
  ] });
};

// src/ui/components/Content/Accordion/Accordion.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var Container = import_styled_components11.styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
`;
var BaseAccordion = ({ children, multiple, defaultActiveKeys, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AccordionProvider, { multiple, defaultActiveKeys, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Container, { ...rest, children }) });
};
var Accordion = Object.assign(BaseAccordion, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent
});

// src/ui/components/Content/Card/Card.tsx
var import_styled_components16 = require("styled-components");

// src/ui/components/Content/Card/CardHeader.tsx
var import_styled_components12 = require("styled-components");
var CardHeader = import_styled_components12.styled.header`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// src/ui/components/Content/Card/CardBody.tsx
var import_styled_components13 = require("styled-components");
var CardBody = import_styled_components13.styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  flex: 1 1 auto;
`;

// src/ui/components/Content/Card/CardFooter.tsx
var import_styled_components14 = require("styled-components");
var CardFooter = import_styled_components14.styled.footer`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`;

// src/ui/components/Content/Card/CardTitle.tsx
var import_styled_components15 = require("styled-components");
var CardTitle = import_styled_components15.styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
`;

// src/ui/components/Content/Card/Card.tsx
var StyledCard = import_styled_components16.styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-radius: ${({ theme }) => theme.radii.base};
  border: ${({ $bordered = true, theme }) => $bordered ? `1px solid ${theme.colors.border.default}` : "none"};
  box-shadow: ${({ $elevation = "sm", theme }) => theme.shadows[$elevation]};
  overflow: hidden;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
`;
var Card = Object.assign(StyledCard, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Title: CardTitle
});

// src/ui/components/Content/EmptyState/EmptyState.tsx
var import_icons4 = require("core-react/icons");
var import_react7 = require("react");
var import_styled_components17 = require("styled-components");
var import_jsx_runtime11 = require("react/jsx-runtime");
var Container2 = import_styled_components17.styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
`;
var IconCircle = import_styled_components17.styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  color: ${({ theme }) => theme.colors.primary.base};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
var Heading = import_styled_components17.styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing[1.5]} 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
`;
var Description = import_styled_components17.styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  max-width: 420px;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;
var EmptyState = ({
  icon = "folder-open-outline",
  title,
  description,
  action,
  children,
  ...rest
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(Container2, { ...rest, children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(IconCircle, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_icons4.Icon, { name: icon, size: 28 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Heading, { children: title }),
    description && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Description, { children: description }),
    action && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { children: action }),
    children
  ] });
};

// src/ui/components/Content/ListGroup/ListGroup.tsx
var import_styled_components19 = require("styled-components");

// src/ui/components/Content/ListGroup/ListGroupItem.tsx
var import_styled_components18 = require("styled-components");
var ListGroupItem = import_styled_components18.styled.li.attrs((props) => ({
  as: props.as || (props.onClick ? "button" : "li")
}))`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2.5]} ${theme.spacing[3.5]}`};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.body};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-top-width: 0;
  text-align: inherit;
  cursor: ${({ $action, onClick }) => $action || onClick ? "pointer" : "default"};
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:first-child {
    border-top-width: 1px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  &:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  ${({ $action, onClick, theme }) => ($action || onClick) && import_styled_components18.css`
      &:hover:not(:disabled) {
        background-color: ${theme.colors.background.surfaceHover};
      }
    `}

  ${({ $active, theme }) => $active && import_styled_components18.css`
      z-index: 2;
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary.base} !important;
      border-color: ${theme.colors.primary.base} !important;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  }
`;

// src/ui/components/Content/ListGroup/ListGroup.tsx
var StyledListGroup = import_styled_components19.styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin: 0;
  list-style: none;
  border-radius: ${({ $flush, theme }) => $flush ? "0" : theme.radii.base};

  ${({ $flush }) => $flush && import_styled_components19.css`
      & > ${ListGroupItem} {
        border-width: 0 0 1px 0;
        border-radius: 0 !important;

        &:last-child {
          border-bottom-width: 0;
        }
      }
    `}
`;
var ListGroup = Object.assign(StyledListGroup, {
  Item: ListGroupItem
});

// src/ui/components/Content/MarkdownViewer.tsx
var import_core_ts = require("core-ts");
var import_marked = require("marked");
var import_react8 = require("react");
var import_styled_components20 = require("styled-components");
var import_jsx_runtime12 = require("react/jsx-runtime");
var parsers = /* @__PURE__ */ new Map();
var getParser = (breaks) => {
  let parser = parsers.get(breaks);
  if (!parser) {
    parser = new import_marked.Marked({ gfm: true, breaks }, import_core_ts.highlightExtension);
    parsers.set(breaks, parser);
  }
  return parser;
};
var parseMarkdown = (source, { breaks = false } = {}) => getParser(breaks).lexer(source);
var EXTERNAL_URL = /^(https?:|mailto:)/i;
var isSafeUrl = (url) => EXTERNAL_URL.test(url) || /^(\/(?!\/)|#|\.{0,2}\/)/.test(url);
var Prose = import_styled_components20.styled.div`
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
    font-size: ${({ theme }) => theme.typography.sizes["2xl"]};
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
var renderMarkdownTokens = (tokens, options) => {
  const children = (inner, fallback) => inner ? renderMarkdownTokens(inner, options) : fallback;
  const renderListItem = (item, key) => {
    const hasCheckbox = item.tokens.some((token) => token.type === "checkbox");
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("li", { children: [
      item.task && !hasCheckbox && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("input", { type: "checkbox", checked: item.checked === true, disabled: true, readOnly: true }),
      renderMarkdownTokens(item.tokens, options)
    ] }, key);
  };
  return tokens.map((token, key) => {
    switch (token.type) {
      case "space":
      case "def":
        return null;
      case "paragraph":
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: children(token.tokens, token.text) }, key);
      case "heading": {
        const heading = token;
        const Heading2 = `h${Math.min(heading.depth + options.headingOffset, 6)}`;
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Heading2, { children: children(heading.tokens, heading.text) }, key);
      }
      case "text": {
        const text = token;
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react8.Fragment, { children: children(text.tokens, text.text) }, key);
      }
      case "strong":
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("strong", { children: children(token.tokens) }, key);
      case "em":
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("em", { children: children(token.tokens) }, key);
      case "del":
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("del", { children: children(token.tokens) }, key);
      case "highlight":
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("mark", { children: children(token.tokens) }, key);
      case "codespan":
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("code", { children: token.text }, key);
      case "code": {
        const code = token;
        const lang = code.lang && /^[a-z0-9+#-]+$/i.test(code.lang) ? code.lang : void 0;
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("pre", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("code", { className: lang ? `language-${lang}` : void 0, children: code.text }) }, key);
      }
      case "br":
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("br", {}, key);
      case "hr":
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("hr", {}, key);
      case "blockquote":
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("blockquote", { children: children(token.tokens) }, key);
      case "list": {
        const list = token;
        const List2 = list.ordered ? "ol" : "ul";
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(List2, { start: list.ordered && list.start !== 1 ? Number(list.start) : void 0, children: list.items.map(renderListItem) }, key);
      }
      case "checkbox":
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "input",
          {
            type: "checkbox",
            checked: token.checked === true,
            disabled: true,
            readOnly: true
          },
          key
        );
      case "link": {
        const link = token;
        if (!isSafeUrl(link.href)) return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react8.Fragment, { children: children(link.tokens, link.text) }, key);
        const external = EXTERNAL_URL.test(link.href);
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "a",
          {
            href: link.href,
            title: link.title ?? void 0,
            target: external ? options.linkTarget : void 0,
            rel: external ? "noopener noreferrer nofollow ugc" : void 0,
            children: children(link.tokens, link.text)
          },
          key
        );
      }
      case "image": {
        const image = token;
        if (!options.allowImages || !isSafeUrl(image.href))
          return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react8.Fragment, { children: image.text }, key);
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("img", { src: image.href, alt: image.text, title: image.title ?? void 0, loading: "lazy" }, key);
      }
      case "table": {
        const table = token;
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("table", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("tr", { children: table.header.map((cell, index) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { style: cell.align ? { textAlign: cell.align } : void 0, children: renderMarkdownTokens(cell.tokens, options) }, index)) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("tbody", { children: table.rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("tr", { children: row.map((cell, index) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { style: cell.align ? { textAlign: cell.align } : void 0, children: renderMarkdownTokens(cell.tokens, options) }, index)) }, rowIndex)) })
        ] }, key);
      }
      // HTML brut et jetons inconnus : affichés comme du texte, jamais interprétés
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_react8.Fragment, { children: "text" in token && typeof token.text === "string" ? token.text : token.raw }, key);
    }
  });
};
var useMarkdown = (source, { allowImages = false, headingOffset = 0, breaks = false, linkTarget = "_blank" } = {}) => (0, import_react8.useMemo)(
  () => renderMarkdownTokens(parseMarkdown(source, { breaks }), { allowImages, headingOffset, linkTarget }),
  [source, allowImages, headingOffset, breaks, linkTarget]
);
var MarkdownViewer = ({ children, className, ...options }) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Prose, { className, children: useMarkdown(children, options) });
var MarkdownContent = ({ headingOffset = 2, breaks = true, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(MarkdownViewer, { headingOffset, breaks, ...props });

// src/ui/components/Content/StatCard/StatCard.tsx
var import_icons5 = require("core-react/icons");
var import_styled_components21 = require("styled-components");
var import_jsx_runtime13 = require("react/jsx-runtime");
var TopRow = import_styled_components21.styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;
var LabelText = import_styled_components21.styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.muted};
`;
var IconBox = import_styled_components21.styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  color: ${({ theme }) => theme.colors.primary.base};
`;
var BottomRow = import_styled_components21.styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
`;
var ValueNumber = import_styled_components21.styled.strong`
  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.heading};
  line-height: 1.1;
`;
var StatCard = ({ label, value, icon, trend, trendVariant = "success", ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Card, { $bordered: true, $elevation: "sm", ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(Card.Body, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(TopRow, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(LabelText, { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconBox, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_icons5.Icon, { name: icon, size: 20 }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(BottomRow, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ValueNumber, { children: value }),
      trend && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Badge, { $variant: trendVariant, $pill: true, children: trend })
    ] })
  ] }) });
};

// src/ui/components/Content/Table/Table.tsx
var import_styled_components22 = require("styled-components");
var Table = import_styled_components22.styled.table`
  width: 100%;
  caption-side: bottom;
  border-collapse: collapse;
  vertical-align: middle;
  font-size: ${({ $dense, theme }) => $dense ? theme.typography.sizes.sm : theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.body};
  background-color: ${({ theme }) => theme.colors.background.surface};

  ${({ $bordered, theme }) => $bordered && import_styled_components22.css`
      border: 1px solid ${theme.colors.border.default};
    `}

  ${({ $striped, theme }) => $striped && import_styled_components22.css`
      & > tbody > tr:nth-of-type(odd) {
        background-color: ${theme.colors.background.surfaceHover};
      }
    `}

  ${({ $hoverable, theme }) => $hoverable && import_styled_components22.css`
      & > tbody > tr:hover {
        background-color: ${theme.colors.background.surfaceActive};
      }
    `}
`;

// src/ui/components/Content/Table/TBody.tsx
var import_styled_components23 = require("styled-components");
var Tbody = import_styled_components23.styled.tbody`
  & > tr:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  }
`;

// src/ui/components/Content/Table/Td.tsx
var import_styled_components24 = require("styled-components");
var cellShared = import_styled_components24.css`
  padding: ${({ theme }) => `${theme.spacing[2.5]} ${theme.spacing[3]}`};
  text-align: ${({ $align = "left" }) => $align};
  ${({ $width }) => $width && `width: ${typeof $width === "number" ? `${$width}px` : $width};`}
`;
var Td = import_styled_components24.styled.td`
  ${cellShared}
`;

// src/ui/components/Content/Table/TFoot.tsx
var import_styled_components25 = require("styled-components");
var Tfoot = import_styled_components25.styled.tfoot`
  border-top: 2px solid ${({ theme }) => theme.colors.border.default};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

// src/ui/components/Content/Table/Th.tsx
var import_styled_components26 = require("styled-components");
var cellShared2 = import_styled_components26.css`
  padding: ${({ theme }) => `${theme.spacing[2.5]} ${theme.spacing[3]}`};
  text-align: ${({ $align = "left" }) => $align};
  ${({ $width }) => $width && `width: ${typeof $width === "number" ? `${$width}px` : $width};`}
`;
var Th = import_styled_components26.styled.th`
  ${cellShared2}
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// src/ui/components/Content/Table/Thead.tsx
var import_styled_components27 = require("styled-components");
var Thead = import_styled_components27.styled.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
`;

// src/ui/components/Content/Table/TRow.tsx
var import_styled_components28 = require("styled-components");
var TRow = import_styled_components28.styled.tr`
  transition: background-color 0.15s ease;

  ${({ $selected, theme }) => $selected && import_styled_components28.css`
      background-color: ${theme.colors.primary.subtle} !important;
    `}
`;

// src/ui/components/Embed/Image.tsx
var import_styled_components29 = require("styled-components");
var Image = import_styled_components29.styled.img.attrs((props) => ({
  loading: props.loading || "lazy"
}))`
  display: block;
  max-width: ${({ $fluid = true }) => $fluid ? "100%" : "none"};
  height: ${({ $fluid = true, height }) => $fluid && !height ? "auto" : void 0};

  ${({ $fit }) => $fit && import_styled_components29.css`
      object-fit: ${$fit};
    `}

  ${({ $aspectRatio }) => $aspectRatio && import_styled_components29.css`
      aspect-ratio: ${$aspectRatio};
    `}

  ${({ $radius, theme }) => $radius && import_styled_components29.css`
      border-radius: ${theme.radii[$radius]};
    `}

  ${({ $thumbnail, theme }) => $thumbnail && import_styled_components29.css`
      padding: ${theme.spacing[1]};
      background-color: ${theme.colors.background.surface};
      border: 1px solid ${theme.colors.border.default};
      border-radius: ${theme.radii.base};
      box-shadow: ${theme.shadows.sm};
    `}
`;

// src/ui/components/Embed/Figure.tsx
var import_react9 = require("react");
var import_styled_components30 = require("styled-components");
var import_jsx_runtime14 = require("react/jsx-runtime");
var FigureCaption = import_styled_components30.styled.figcaption`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  text-align: ${({ $align = "start" }) => $align};
  margin-top: ${({ $position = "bottom", theme }) => $position === "bottom" ? theme.spacing[2] : "0"};
  margin-bottom: ${({ $position = "bottom", theme }) => $position === "top" ? theme.spacing[2] : "0"};
`;
var StyledFigure = import_styled_components30.styled.figure`
  margin: 0;
  display: inline-flex;
  flex-direction: column;
  max-width: 100%;
`;
var Figure = ({
  caption,
  captionAlign = "start",
  captionPosition = "bottom",
  children,
  ...rest
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(StyledFigure, { ...rest, children: [
    caption && captionPosition === "top" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(FigureCaption, { $align: captionAlign, $position: "top", children: caption }),
    children,
    caption && captionPosition === "bottom" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(FigureCaption, { $align: captionAlign, $position: "bottom", children: caption })
  ] });
};
Figure.Caption = FigureCaption;

// src/ui/components/Embed/Video.tsx
var import_react10 = require("react");
var import_styled_components31 = require("styled-components");
var import_jsx_runtime15 = require("react/jsx-runtime");
var StyledVideo = import_styled_components31.styled.video`
  display: block;
  max-width: ${({ $fluid = true }) => $fluid ? "100%" : "none"};
  width: ${({ $fluid = true, width }) => $fluid && !width ? "100%" : void 0};
  height: ${({ $fluid = true, height }) => $fluid && !height ? "auto" : void 0};

  ${({ $fit }) => $fit && import_styled_components31.css`
      object-fit: ${$fit};
    `}

  ${({ $aspectRatio }) => $aspectRatio && import_styled_components31.css`
      aspect-ratio: ${$aspectRatio};
    `}

  ${({ $radius, theme }) => $radius && import_styled_components31.css`
      border-radius: ${theme.radii[$radius]};
    `}
`;
var Video = ({
  sources = [],
  src,
  fluid = true,
  fit,
  aspectRatio,
  radius,
  fallbackUrl,
  fallbackText,
  controls = true,
  children,
  ...props
}) => {
  const downloadLink = fallbackUrl || sources[0]?.src || (typeof src === "string" ? src : void 0);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    StyledVideo,
    {
      $fluid: fluid,
      $fit: fit,
      $aspectRatio: aspectRatio,
      $radius: radius,
      controls,
      src,
      ...props,
      children: [
        sources.map((source, index) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("source", { src: source.src, type: source.type }, `${source.src}-${index}`)),
        children,
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: fallbackText ?? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_jsx_runtime15.Fragment, { children: [
          "Votre navigateur ne prend pas en charge les vid\xE9os HTML5. Voici",
          " ",
          downloadLink && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("a", { href: downloadLink, download: true, children: "un lien pour t\xE9l\xE9charger la vid\xE9o" }),
          "."
        ] }) })
      ]
    }
  );
};

// src/ui/components/Embed/Carousel/Carousel.tsx
var import_react11 = require("react");
var import_styled_components35 = require("styled-components");

// src/ui/components/Embed/Carousel/CarouselIndicator.tsx
var import_styled_components32 = require("styled-components");
var import_jsx_runtime16 = require("react/jsx-runtime");
var IndicatorsContainer = import_styled_components32.styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${({ theme }) => theme.spacing[1.5]};
  z-index: 2;
`;
var Dot = import_styled_components32.styled.button`
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ $active, theme }) => $active ? theme.colors.primary.base : theme.colors.white};
  opacity: ${({ $active }) => $active ? 1 : 0.5};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;
var CarouselIndicator = ({ total, currentIndex, onSelect, ...rest }) => {
  if (total <= 1) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(IndicatorsContainer, { role: "tablist", ...rest, children: Array.from({ length: total }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    Dot,
    {
      type: "button",
      role: "tab",
      "aria-selected": currentIndex === idx,
      "aria-label": `Aller \xE0 la diapositive ${idx + 1}`,
      $active: currentIndex === idx,
      onClick: () => onSelect(idx)
    },
    idx
  )) });
};

// src/ui/components/Embed/Carousel/CarouselItem.tsx
var import_styled_components33 = require("styled-components");
var CarouselItem = import_styled_components33.styled.div`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

// src/ui/components/Embed/Carousel/CarouselSlide.tsx
var import_styled_components34 = require("styled-components");
var import_jsx_runtime17 = require("react/jsx-runtime");
var Track = import_styled_components34.styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  transform: translateX(-${({ $currentIndex }) => $currentIndex * 100}%);
`;
var CarouselSlide = ({ currentIndex, children, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Track, { $currentIndex: currentIndex, ...rest, children });
};

// src/ui/components/Embed/Carousel/Carousel.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var Viewport = import_styled_components35.styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};

  ${({ $aspectRatio }) => $aspectRatio && import_styled_components35.css`
      aspect-ratio: ${$aspectRatio};
    `}
`;
var NavButton = (0, import_styled_components35.styled)(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => $direction === "left" ? "left: 12px;" : "right: 12px;"}
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.background.surface};
  box-shadow: ${({ theme }) => theme.shadows.md};
  opacity: 0.85;

  &:hover:not(:disabled) {
    opacity: 1;
  }
`;
var BaseCarousel = ({
  aspectRatio = "16/9",
  showIndicators = true,
  showArrows = true,
  defaultIndex = 0,
  autoplay = false,
  slideInterval = 4e3,
  children,
  ...rest
}) => {
  const [currentIndex, setCurrentIndex] = (0, import_react11.useState)(defaultIndex);
  const [isPaused, setIsPaused] = (0, import_react11.useState)(false);
  const items = import_react11.Children.toArray(children);
  const total = items.length;
  const prev = (0, import_react11.useCallback)(() => {
    setCurrentIndex((c) => c > 0 ? c - 1 : total - 1);
  }, [total]);
  const next = (0, import_react11.useCallback)(() => {
    setCurrentIndex((c) => c < total - 1 ? c + 1 : 0);
  }, [total]);
  (0, import_react11.useEffect)(() => {
    if (!autoplay || isPaused || total <= 1 || slideInterval <= 0) return;
    const timer = setInterval(next, slideInterval);
    return () => clearInterval(timer);
  }, [autoplay, isPaused, total, slideInterval, next]);
  if (total === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    Viewport,
    {
      $aspectRatio: aspectRatio,
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(CarouselSlide, { currentIndex, children: items }),
        showArrows && total > 1 && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            NavButton,
            {
              $direction: "left",
              name: "chevron-left",
              size: "sm",
              round: true,
              "aria-label": "Diapositive pr\xE9c\xE9dente",
              onClick: prev
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            NavButton,
            {
              $direction: "right",
              name: "chevron-right",
              size: "sm",
              round: true,
              "aria-label": "Diapositive suivante",
              onClick: next
            }
          )
        ] }),
        showIndicators && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(CarouselIndicator, { total, currentIndex, onSelect: setCurrentIndex })
      ]
    }
  );
};
var Carousel = Object.assign(BaseCarousel, {
  Item: CarouselItem,
  Slide: CarouselSlide,
  Indicator: CarouselIndicator
});

// src/ui/components/Embed/Gallery/Gallery.tsx
var import_styled_components37 = require("styled-components");

// src/ui/components/Embed/Gallery/GalleryItem.tsx
var import_styled_components36 = require("styled-components");
var GalleryItem = import_styled_components36.styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ $radius = "base", theme }) => theme.radii[$radius]};

  ${({ $hoverZoom }) => $hoverZoom && import_styled_components36.css`
      & img,
      & video {
        transition: transform 0.3s ease;
      }

      &:hover img,
      &:hover video {
        transform: scale(1.03);
      }
    `}
`;

// src/ui/components/Embed/Gallery/Gallery.tsx
var StyledGallery = import_styled_components37.styled.div.attrs((props) => ({
  as: props.as || "div"
}))`
  width: 100%;
  columns: ${({ $columns = 3, $minColumnWidth = "260px" }) => `${$columns} ${$minColumnWidth}`};
  column-gap: ${({ $gap, theme }) => $gap || theme.spacing[4]};
  ${({ $rule }) => $rule && `column-rule: ${$rule};`}

  & > * {
    break-inside: avoid;
    margin-bottom: ${({ $gap, theme }) => $gap || theme.spacing[4]};
  }
`;
var Gallery = Object.assign(StyledGallery, {
  Item: GalleryItem
});

// src/ui/components/Feedback/Alert/Alert.tsx
var import_icons6 = require("core-react/icons");
var import_styled_components38 = require("styled-components");
var import_jsx_runtime19 = require("react/jsx-runtime");
var variantIcons = {
  primary: "information",
  success: "check-circle",
  warning: "alert",
  danger: "alert-circle",
  info: "information"
};
var AlertContainer = import_styled_components38.styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};

  ${({ $variant, theme }) => {
  const role = theme.colors[$variant];
  return import_styled_components38.css`
      background-color: ${role.subtle};
      border: 1px solid ${role.dark}30;
      color: ${role.emphasis};

      & > i {
        color: ${role.base};
      }
    `;
}}
`;
var ContentWrapper2 = import_styled_components38.styled.div`
  flex: 1 1 auto;
  min-width: 0;
`;
var AlertTitle = import_styled_components38.styled.strong`
  display: block;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;
var Alert = ({
  variant = "info",
  title,
  onClose,
  showIcon = true,
  children,
  ...rest
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(AlertContainer, { $variant: variant, role: "alert", ...rest, children: [
    showIcon && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_icons6.Icon, { name: variantIcons[variant], size: 20 }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(ContentWrapper2, { children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(AlertTitle, { children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { children })
    ] }),
    onClose && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(IconButton, { name: "close", size: "sm", variant: "ghost", "aria-label": "Fermer", onClick: onClose })
  ] });
};

// src/ui/components/Feedback/Drawer/Drawer.tsx
var import_react12 = require("react");
var import_react_dom = require("react-dom");
var import_styled_components40 = require("styled-components");

// src/ui/components/Feedback/Drawer/DrawerSubcomponents.tsx
var import_styled_components39 = require("styled-components");
var import_jsx_runtime20 = require("react/jsx-runtime");
var HeaderBox = import_styled_components39.styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing[3.5]} ${theme.spacing[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;
var Title = import_styled_components39.styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
`;
var DrawerHeader = ({ title, onClose, children, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(HeaderBox, { ...rest, children: [
  title ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Title, { children: title }) : children,
  onClose && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(IconButton, { name: "close", size: "sm", variant: "ghost", "aria-label": "Fermer le panneau", onClick: onClose })
] });
var DrawerBody = import_styled_components39.styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]};
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.text.body};
`;
var DrawerFooter = import_styled_components39.styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2.5]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
`;

// src/ui/components/Feedback/Drawer/Drawer.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var fadeIn = import_styled_components40.keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
var Backdrop = import_styled_components40.styled.div`
  position: fixed;
  inset: 0;
  z-index: 1050;
  background-color: rgba(18, 18, 26, 0.5);
  backdrop-filter: blur(2px);
  animation: ${fadeIn} 0.2s ease-out;
`;
var Panel = import_styled_components40.styled.aside`
  position: fixed;
  top: 0;
  bottom: 0;
  ${({ $placement }) => $placement === "right" ? "right: 0;" : "left: 0;"}
  z-index: 1051;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ $width }) => $width};
  background-color: ${({ theme }) => theme.colors.background.surface};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-left: ${({ $placement, theme }) => $placement === "right" ? `1px solid ${theme.colors.border.default}` : "none"};
  border-right: ${({ $placement, theme }) => $placement === "left" ? `1px solid ${theme.colors.border.default}` : "none"};

  ${({ $placement }) => import_styled_components40.css`
    animation: ${import_styled_components40.keyframes`
      from { transform: translateX(${$placement === "right" ? "100%" : "-100%"}); }
      to { transform: translateX(0); }
    `}
      0.25s cubic-bezier(0.16, 1, 0.3, 1);
  `}
`;
var DrawerRoot = ({
  isOpen,
  onClose,
  placement = "right",
  width = "420px",
  closeOnBackdrop = true,
  children,
  ...rest
}) => {
  (0, import_react12.useEffect)(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);
  if (!isOpen || typeof document === "undefined") return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      Backdrop,
      {
        onClick: (e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) onClose();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Panel, { $placement: placement, $width: width, role: "dialog", "aria-modal": "true", ...rest, children })
      }
    ),
    document.body
  );
};
var Drawer = Object.assign(DrawerRoot, {
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter
});

// src/ui/components/Feedback/Loading/Loading.tsx
var import_styled_components41 = require("styled-components");
var import_jsx_runtime22 = require("react/jsx-runtime");
var spin = import_styled_components41.keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
var sizeMap = {
  sm: 16,
  base: 24,
  lg: 36
};
var SpinnerSvg = import_styled_components41.styled.svg`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  animation: ${spin} 0.8s linear infinite;
  color: ${({ $color, theme }) => $color || theme.colors.primary.base};
`;
var Loading = ({ size = "base", color, label = "Chargement en cours\u2026", ...rest }) => {
  const dimension = sizeMap[size];
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    SpinnerSvg,
    {
      $size: dimension,
      $color: color,
      viewBox: "0 0 24 24",
      fill: "none",
      role: "status",
      "aria-label": label,
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "3", opacity: "0.2" }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "path",
          {
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          }
        )
      ]
    }
  );
};

// src/ui/components/Feedback/Modal/ConfirmDialog.tsx
var import_icons7 = require("core-react/icons");
var import_styled_components46 = require("styled-components");

// src/ui/components/Feedback/Modal/Modal.tsx
var import_react13 = require("react");
var import_react_dom2 = require("react-dom");
var import_styled_components45 = require("styled-components");

// src/ui/components/Feedback/Modal/ModalBody.tsx
var import_styled_components42 = require("styled-components");
var ModalBody = import_styled_components42.styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  overflow-y: auto;
  max-height: calc(85vh - 120px);
  color: ${({ theme }) => theme.colors.text.body};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

// src/ui/components/Feedback/Modal/ModalFooter.tsx
var import_styled_components43 = require("styled-components");
var ModalFooter = import_styled_components43.styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2.5]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`;

// src/ui/components/Feedback/Modal/ModalHeader.tsx
var import_styled_components44 = require("styled-components");
var import_jsx_runtime23 = require("react/jsx-runtime");
var HeaderWrapper = import_styled_components44.styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing[3.5]} ${theme.spacing[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;
var Title2 = import_styled_components44.styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
`;
var ModalHeader = ({ title, onClose, children, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(HeaderWrapper, { ...rest, children: [
    title ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Title2, { children: title }) : children,
    onClose && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      IconButton,
      {
        name: "close",
        size: "sm",
        variant: "ghost",
        "aria-label": "Fermer la bo\xEEte de dialogue",
        onClick: onClose
      }
    )
  ] });
};

// src/ui/components/Feedback/Modal/Modal.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
var fadeIn2 = import_styled_components45.keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
var popIn = import_styled_components45.keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;
var Backdrop2 = import_styled_components45.styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(18, 18, 26, 0.55);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing[4]};
  animation: ${fadeIn2} 0.15s ease-out;
`;
var ContentPanel = import_styled_components45.styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${popIn} 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;
var ModalRoot = ({
  isOpen,
  onClose,
  maxWidth = "520px",
  closeOnBackdrop = true,
  children,
  ...rest
}) => {
  (0, import_react13.useEffect)(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);
  if (!isOpen || typeof document === "undefined") return null;
  return (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      Backdrop2,
      {
        onClick: (e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
          }
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(ContentPanel, { $maxWidth: maxWidth, role: "dialog", "aria-modal": "true", ...rest, children })
      }
    ),
    document.body
  );
};
var Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter
});

// src/ui/components/Feedback/Modal/ConfirmDialog.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var MessageContainer = import_styled_components46.styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[3]} 0`};
`;
var MessageText = import_styled_components46.styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.body};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
var ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "danger",
  loading = false
}) => {
  const theme = (0, import_styled_components46.useTheme)();
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Modal, { isOpen, onClose, maxWidth: "420px", children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Modal.Header, { title, onClose }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(MessageContainer, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        import_icons7.Icon,
        {
          name: variant === "danger" ? "alert-circle" : "help-circle",
          size: 40,
          color: variant === "danger" ? theme.colors.danger.base : theme.colors.warning.base
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(MessageText, { children: message })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Modal.Footer, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Button, { $variant: "ghost", onClick: onClose, disabled: loading, children: cancelLabel }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Button, { $variant: variant === "danger" ? "danger" : "primary", onClick: onConfirm, $loading: loading, children: confirmLabel })
    ] })
  ] });
};

// src/ui/components/Feedback/Modal/Dialog.tsx
var import_styled_components47 = require("styled-components");
var import_jsx_runtime26 = require("react/jsx-runtime");
var DialogContent = import_styled_components47.styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  text-align: center;
`;
var Dialog = ({ children, maxWidth = "420px", ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Modal, { maxWidth, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(DialogContent, { children }) });
};

// src/ui/components/Feedback/Progress/Progress.tsx
var import_styled_components48 = require("styled-components");
var import_jsx_runtime27 = require("react/jsx-runtime");
var Track2 = import_styled_components48.styled.div`
  width: 100%;
  height: ${({ $height }) => $height};
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};
  border-radius: ${({ theme }) => theme.radii.pill};
  overflow: hidden;
`;
var Bar = import_styled_components48.styled.div`
  height: 100%;
  width: ${({ $value }) => `${Math.min(Math.max($value, 0), 100)}%`};
  background-color: ${({ $variant, theme }) => {
  const colorOption = theme.colors[$variant];
  if (colorOption && typeof colorOption === "object" && "base" in colorOption) {
    return colorOption.base;
  }
  return theme.colors.primary.base;
}};
  border-radius: inherit;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
var Progress = ({ value, height = "6px", variant = "primary", ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    Track2,
    {
      $height: height,
      role: "progressbar",
      "aria-valuenow": value,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Bar, { $value: value, $variant: variant })
    }
  );
};

// src/ui/components/Feedback/Skeleton/Skeleton.tsx
var import_styled_components49 = require("styled-components");
var shimmer = import_styled_components49.keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;
var Skeleton = import_styled_components49.styled.div`
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};
  animation: ${shimmer} 1.6s ease-in-out infinite;

  width: ${({ $width }) => $width ? typeof $width === "number" ? `${$width}px` : $width : "100%"};
  height: ${({ $height, $variant }) => {
  if ($height) return typeof $height === "number" ? `${$height}px` : $height;
  if ($variant === "text") return "1rem";
  return "100%";
}};

  border-radius: ${({ $variant = "text", theme }) => {
  if ($variant === "circular") return theme.radii.full;
  if ($variant === "text") return theme.radii.sm;
  return theme.radii.base;
}};
`;

// src/ui/components/Feedback/Toast/Toast.tsx
var import_icons8 = require("core-react/icons");
var import_styled_components50 = require("styled-components");
var import_jsx_runtime28 = require("react/jsx-runtime");
var slideIn = import_styled_components50.keyframes`
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
`;
var toastIcons = {
  info: "information",
  success: "check-circle",
  warning: "alert",
  danger: "alert-circle"
};
var ToastWrapper = import_styled_components50.styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 300px;
  max-width: 420px;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-radius: ${({ theme }) => theme.radii.base};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  animation: ${slideIn} 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: auto;

  ${({ $variant, theme }) => {
  const role = theme.colors[$variant];
  return import_styled_components50.css`
      border-left: 4px solid ${role.base};
      & > i {
        color: ${role.base};
      }
    `;
}}
`;
var Content = import_styled_components50.styled.div`
  flex: 1 1 auto;
  min-width: 0;
  color: ${({ theme }) => theme.colors.text.body};
`;
var ToastTitle = import_styled_components50.styled.strong`
  display: block;
  color: ${({ theme }) => theme.colors.text.heading};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[0.5]};
`;
var Toast = ({ variant = "info", title, onClose, children, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(ToastWrapper, { $variant: variant, role: "status", ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_icons8.Icon, { name: toastIcons[variant], size: 20 }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(Content, { children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ToastTitle, { children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { children })
    ] }),
    onClose && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      IconButton,
      {
        name: "close",
        size: "sm",
        variant: "ghost",
        "aria-label": "Fermer la notification",
        onClick: onClose
      }
    )
  ] });
};

// src/ui/components/Feedback/Toast/ToastContainer.tsx
var import_react_dom3 = require("react-dom");
var import_styled_components51 = require("styled-components");

// src/ui/components/Feedback/Toast/useToast.tsx
var import_react14 = require("react");
var listeners = /* @__PURE__ */ new Set();
var state;
var setState = (patch) => {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
};
var removeToast = (id) => setState({ toasts: state.toasts.filter((toast) => toast.id !== id) });
var addToast = (toast) => {
  const id = Math.random().toString(36).substring(2, 9);
  const duration = toast.duration ?? 4e3;
  setState({ toasts: [...state.toasts, { ...toast, id }] });
  if (duration > 0) setTimeout(() => removeToast(id), duration);
  return id;
};
state = { toasts: [], addToast, removeToast };
var serverState = { toasts: [], addToast, removeToast };
var subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
var useToastStore = Object.assign(
  (selector) => (0, import_react14.useSyncExternalStore)(
    subscribe,
    () => selector(state),
    () => selector(serverState)
  ),
  { getState: () => state, subscribe }
);
var useToast = () => ({
  toast: addToast,
  success: (message, title) => addToast({ message, title, variant: "success" }),
  error: (message, title) => addToast({ message, title, variant: "danger" }),
  warning: (message, title) => addToast({ message, title, variant: "warning" }),
  info: (message, title) => addToast({ message, title, variant: "info" }),
  dismiss: removeToast
});

// src/ui/components/Feedback/Toast/ToastContainer.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
var Viewport2 = import_styled_components51.styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2.5]};
  pointer-events: none;
`;
var ToastContainer = () => {
  const toasts = useToastStore((state2) => state2.toasts);
  const removeToast2 = useToastStore((state2) => state2.removeToast);
  if (toasts.length === 0 || typeof document === "undefined") return null;
  return (0, import_react_dom3.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Viewport2, { "aria-live": "polite", children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Toast, { variant: t.variant, title: t.title, onClose: () => removeToast2(t.id), children: t.message }, t.id)) }),
    document.body
  );
};

// src/ui/components/Feedback/Tooltip/Tooltip.tsx
var import_react15 = require("react");
var import_styled_components52 = require("styled-components");
var import_jsx_runtime30 = require("react/jsx-runtime");
var Bubble = import_styled_components52.styled.span`
  position: absolute;
  z-index: 1200;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.palettes.neutral[900]};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;

  ${({ $placement }) => {
  switch ($placement) {
    case "bottom":
      return import_styled_components52.css`
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%) translateY(-4px);
        `;
    case "left":
      return import_styled_components52.css`
          right: calc(100% + 6px);
          top: 50%;
          transform: translateY(-50%) translateX(4px);
        `;
    case "right":
      return import_styled_components52.css`
          left: calc(100% + 6px);
          top: 50%;
          transform: translateY(-50%) translateX(-4px);
        `;
    case "top":
    default:
      return import_styled_components52.css`
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
        `;
  }
}}
`;
var Wrapper = import_styled_components52.styled.span`
  position: relative;
  display: inline-flex;

  &:hover > ${Bubble}, &:focus-within > ${Bubble} {
    opacity: 1;
    transform: ${({ children }) => children ? "translateX(-50%) translateY(0)" : "none"};
  }
`;
var Tooltip = ({ content, placement = "top", children, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(Wrapper, { ...rest, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Bubble, { $placement: placement, role: "tooltip", children: content })
  ] });
};

// src/ui/components/Forms/Checkbox.tsx
var import_styled_components53 = require("styled-components");
var Checkbox = import_styled_components53.styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.background.surface};
  display: inline-grid;
  place-content: center;
  margin: 0;
  cursor: pointer;
  vertical-align: middle;

  &::before {
    content: '';
    width: 0.65rem;
    height: 0.65rem;
    transform: scale(0);
    transition: transform 120ms ease-in-out;
    background-color: ${({ theme }) => theme.colors.white};
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary.base};
    border-color: ${({ theme }) => theme.colors.primary.base};
    &::before {
      transform: scale(1);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.base};
    outline-offset: 2px;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    border-color: ${({ theme }) => theme.colors.border.default};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// src/ui/components/Forms/Fields/CheckField.tsx
var import_react16 = require("react");
var import_styled_components56 = require("styled-components");

// src/ui/components/Forms/HelperText.tsx
var import_styled_components54 = require("styled-components");
var HelperText = import_styled_components54.styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  margin-top: ${({ theme }) => theme.spacing[1]};
  color: ${({ $state, theme }) => {
  switch ($state) {
    case "invalid":
      return theme.colors.danger.base;
    case "valid":
      return theme.colors.success.base;
    default:
      return theme.colors.text.muted;
  }
}};
`;

// src/ui/components/Forms/Radio.tsx
var import_styled_components55 = require("styled-components");
var Radio = import_styled_components55.styled.input.attrs({ type: "radio" })`
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.background.surface};
  display: inline-grid;
  place-content: center;
  margin: 0;
  cursor: pointer;
  vertical-align: middle;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 120ms ease-in-out;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary.base};
    border-color: ${({ theme }) => theme.colors.primary.base};
    &::before {
      transform: scale(1);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.base};
    outline-offset: 2px;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// src/ui/components/Forms/Fields/CheckField.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
var LabelContainer = import_styled_components56.styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;
  user-select: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.body};
`;
var FieldWrapper = import_styled_components56.styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;
var CheckField = (0, import_react16.forwardRef)(
  ({ label, type = "checkbox", error, id: customId, ...inputProps }, ref) => {
    const generatedId = (0, import_react16.useId)();
    const id = customId || generatedId;
    const InputComponent = type === "radio" ? Radio : Checkbox;
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(FieldWrapper, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(LabelContainer, { htmlFor: id, children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(InputComponent, { ref, id, ...inputProps }),
        label && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children: label })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(HelperText, { $state: "invalid", children: error })
    ] });
  }
);
CheckField.displayName = "CheckField";

// src/ui/components/Forms/Fields/ChoiceField.tsx
var import_react17 = require("react");
var import_styled_components59 = require("styled-components");

// src/ui/components/Forms/Label.tsx
var import_styled_components57 = require("styled-components");
var Label = import_styled_components57.styled.label`
  display: inline-block;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.heading};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  cursor: pointer;

  ${({ $required, theme }) => $required && `
    &::after {
      content: ' *';
      color: ${theme.colors.danger.base};
    }
  `}
`;

// src/ui/components/Forms/Select.tsx
var import_styled_components58 = require("styled-components");
var Select = import_styled_components58.styled.select`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  padding-right: ${({ theme }) => theme.spacing[6]};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.body};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid
    ${({ $validationState, theme }) => {
  if ($validationState === "invalid") return theme.colors.danger.base;
  if ($validationState === "valid") return theme.colors.success.base;
  return theme.colors.border.default;
}};
  border-radius: ${({ theme }) => theme.radii.base};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.base};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.borders.focusRing.color};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

// src/ui/components/Forms/Fields/ChoiceField.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
var FieldWrapper2 = import_styled_components59.styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
var ChoiceField = (0, import_react17.forwardRef)(
  ({ label, error, hint, required, id: customId, children, ...selectProps }, ref) => {
    const generatedId = (0, import_react17.useId)();
    const id = customId || generatedId;
    const validationState = error ? "invalid" : selectProps.$validationState;
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(FieldWrapper2, { children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Label, { htmlFor: id, $required: required, children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Select, { ref, id, required, $validationState: validationState, ...selectProps, children }),
      error && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(HelperText, { $state: "invalid", children: error }),
      !error && hint && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(HelperText, { children: hint })
    ] });
  }
);
ChoiceField.displayName = "ChoiceField";

// src/ui/components/Forms/Fields/TextareaField.tsx
var import_react18 = require("react");
var import_styled_components61 = require("styled-components");

// src/ui/components/Forms/Textarea.tsx
var import_styled_components60 = require("styled-components");
var Textarea = import_styled_components60.styled.textarea`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.body};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid
    ${({ $validationState, theme }) => {
  if ($validationState === "invalid") return theme.colors.danger.base;
  if ($validationState === "valid") return theme.colors.success.base;
  return theme.colors.border.default;
}};
  border-radius: ${({ theme }) => theme.radii.base};
  resize: vertical;
  min-height: 80px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ $validationState, theme }) => {
  if ($validationState === "invalid") return theme.colors.danger.base;
  if ($validationState === "valid") return theme.colors.success.base;
  return theme.colors.primary.base;
}};
    box-shadow: 0 0 0 3px
      ${({ $validationState, theme }) => {
  if ($validationState === "invalid")
    return `color-mix(in srgb, ${theme.colors.danger.base} 20%, transparent)`;
  if ($validationState === "valid")
    return `color-mix(in srgb, ${theme.colors.success.base} 20%, transparent)`;
  return theme.borders.focusRing.color;
}};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

// src/ui/components/Forms/Fields/TextareaField.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
var FieldWrapper3 = import_styled_components61.styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
var TextareaField = (0, import_react18.forwardRef)(
  ({ label, error, hint, required, id: customId, rows = 3, ...textareaProps }, ref) => {
    const generatedId = (0, import_react18.useId)();
    const id = customId || generatedId;
    const validationState = error ? "invalid" : textareaProps.$validationState;
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(FieldWrapper3, { children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Label, { htmlFor: id, $required: required, children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
        Textarea,
        {
          ref,
          id,
          rows,
          required,
          $validationState: validationState,
          ...textareaProps
        }
      ),
      error && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(HelperText, { $state: "invalid", children: error }),
      !error && hint && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(HelperText, { children: hint })
    ] });
  }
);
TextareaField.displayName = "TextareaField";

// src/ui/components/Forms/Fields/TextField.tsx
var import_react19 = require("react");
var import_styled_components63 = require("styled-components");

// src/ui/components/Forms/Input.tsx
var import_styled_components62 = require("styled-components");
var Input = import_styled_components62.styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.body};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid
    ${({ $validationState, theme }) => {
  if ($validationState === "invalid") return theme.colors.danger.base;
  if ($validationState === "valid") return theme.colors.success.base;
  return theme.colors.border.default;
}};
  border-radius: ${({ theme }) => theme.radii.base};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ $validationState, theme }) => {
  if ($validationState === "invalid") return theme.colors.danger.base;
  if ($validationState === "valid") return theme.colors.success.base;
  return theme.colors.primary.base;
}};
    box-shadow: ${({ $validationState, theme }) => {
  if ($validationState === "invalid")
    return `0 0 0 3px color-mix(in srgb, ${theme.colors.danger.base} 20%, transparent)`;
  if ($validationState === "valid")
    return `0 0 0 3px color-mix(in srgb, ${theme.colors.success.base} 20%, transparent)`;
  return theme.shadows.focusRing;
}};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

// src/ui/components/Forms/Fields/TextField.tsx
var import_jsx_runtime34 = require("react/jsx-runtime");
var FieldWrapper4 = import_styled_components63.styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
var TextField = (0, import_react19.forwardRef)(
  ({ label, error, hint, required, id: customId, ...inputProps }, ref) => {
    const generatedId = (0, import_react19.useId)();
    const id = customId || generatedId;
    const validationState = error ? "invalid" : inputProps.$validationState;
    return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(FieldWrapper4, { children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Label, { htmlFor: id, $required: required, children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Input, { ref, id, required, $validationState: validationState, ...inputProps }),
      error && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(HelperText, { $state: "invalid", children: error }),
      !error && hint && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(HelperText, { children: hint })
    ] });
  }
);
TextField.displayName = "TextField";

// src/ui/components/Forms/Fields/ToggleField.tsx
var import_react20 = require("react");
var import_styled_components65 = require("styled-components");

// src/ui/components/Forms/Toggle.tsx
var import_styled_components64 = require("styled-components");
var Toggle = import_styled_components64.styled.input.attrs((props) => ({
  type: props.type || "checkbox"
}))`
  appearance: none;
  position: relative;
  width: 2.5rem;
  height: 1.35rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.border.default};
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  vertical-align: middle;
  margin: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(1.35rem - 4px);
    height: calc(1.35rem - 4px);
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transition: transform 0.2s ease;
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary.base};

    &::after {
      transform: translateX(1.15rem);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.base};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// src/ui/components/Forms/Fields/ToggleField.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
var LabelContainer2 = import_styled_components65.styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  user-select: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.body};
`;
var FieldWrapper5 = import_styled_components65.styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;
var ToggleField = (0, import_react20.forwardRef)(
  ({ label, error, id: customId, ...toggleProps }, ref) => {
    const generatedId = (0, import_react20.useId)();
    const id = customId || generatedId;
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(FieldWrapper5, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(LabelContainer2, { htmlFor: id, children: [
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(Toggle, { ref, id, ...toggleProps }),
        label && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("span", { children: label })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(HelperText, { $state: "invalid", children: error })
    ] });
  }
);
ToggleField.displayName = "ToggleField";

// src/ui/components/Forms/FileDropzone/FileDropzone.tsx
var import_icons9 = require("core-react/icons");
var import_react21 = require("react");
var import_styled_components66 = require("styled-components");
var import_jsx_runtime36 = require("react/jsx-runtime");
var DropArea = import_styled_components66.styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[6]};
  border: 2px dashed
    ${({ $isDragging, $hasError, theme }) => {
  if ($hasError) return theme.colors.danger.base;
  if ($isDragging) return theme.colors.primary.base;
  return theme.colors.border.default;
}};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ $isDragging, theme }) => $isDragging ? theme.colors.primary.subtle : theme.colors.background.surface};
  text-align: center;
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  transition: all 0.15s ease;

  ${({ $disabled, theme }) => !$disabled && import_styled_components66.css`
      &:hover {
        border-color: ${theme.colors.primary.base};
        background-color: ${theme.colors.background.surfaceHover};
      }
    `}

  ${({ $disabled }) => $disabled && import_styled_components66.css`
      opacity: 0.6;
    `}
`;
var HiddenInput = import_styled_components66.styled.input`
  display: none;
`;
var MainText = import_styled_components66.styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.heading};
`;
var SubText = import_styled_components66.styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
`;
var FileDropzone = ({
  label,
  accept = "image/*,video/*",
  multiple = false,
  maxSizeMb = 10,
  disabled = false,
  error,
  hint,
  onFilesSelected,
  ...rest
}) => {
  const [isDragging, setIsDragging] = (0, import_react21.useState)(false);
  const [localError, setLocalError] = (0, import_react21.useState)(null);
  const inputRef = (0, import_react21.useRef)(null);
  const handleFiles = (fileList) => {
    if (!fileList || disabled) return;
    setLocalError(null);
    const validFiles = [];
    const maxBytes = maxSizeMb * 1024 * 1024;
    Array.from(fileList).forEach((file) => {
      if (file.size > maxBytes) {
        setLocalError(`Le fichier "${file.name}" d\xE9passe la limite de ${maxSizeMb} Mo.`);
      } else {
        validFiles.push(file);
      }
    });
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };
  const displayedError = error || localError;
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { ...rest, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(Label, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
      DropArea,
      {
        $isDragging: isDragging,
        $hasError: Boolean(displayedError),
        $disabled: disabled,
        onClick: () => !disabled && inputRef.current?.click(),
        onDragOver: (e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onDrop: (e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            HiddenInput,
            {
              ref: inputRef,
              type: "file",
              accept,
              multiple,
              disabled,
              onClick: (e) => e.stopPropagation(),
              onChange: (e) => {
                handleFiles(e.target.files);
                e.target.value = "";
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_icons9.Icon, { name: "cloud-upload-outline", size: 32 }),
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(MainText, { children: "Glissez-d\xE9posez vos fichiers ici ou cliquez pour parcourir" }),
          /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(SubText, { children: [
            "Taille maximale : ",
            maxSizeMb,
            " Mo"
          ] })
        ]
      }
    ),
    displayedError && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(HelperText, { $state: "invalid", children: displayedError }),
    !displayedError && hint && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(HelperText, { children: hint })
  ] });
};

// src/ui/components/Forms/InputGroup/InputGroup.tsx
var import_react22 = require("react");
var import_styled_components67 = require("styled-components");
var import_jsx_runtime37 = require("react/jsx-runtime");
var GroupWrapper = import_styled_components67.styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: ${({ theme }) => theme.colors.background.surface};
  overflow: hidden;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.base};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.borders.focusRing.color};
  }

  & > ${Input} {
    border: none;
    border-radius: 0;
    &:focus {
      box-shadow: none;
    }
  }
`;
var InputAddon = import_styled_components67.styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  white-space: nowrap;
  user-select: none;
`;
var InputGroup = ({ leftAddon, rightAddon, children, ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(GroupWrapper, { ...rest, children: [
    leftAddon && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(InputAddon, { children: leftAddon }),
    children,
    rightAddon && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(InputAddon, { children: rightAddon })
  ] });
};

// src/ui/components/Forms/MarkdownEditor/MarkdownEditor.tsx
var import_core_react5 = require("core-react");
var import_react23 = require("react");
var import_styled_components68 = require("styled-components");
var import_icons10 = require("core-react/icons");
var import_jsx_runtime38 = require("react/jsx-runtime");
var Field = import_styled_components68.styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
var Root = import_styled_components68.styled.div`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid
    ${({ $invalid, theme }) => $invalid ? theme.colors.danger.base : theme.colors.border.strong};
  border-radius: ${({ theme }) => theme.radii.lg};

  &:has(> textarea:focus) {
    border-color: ${({ theme }) => theme.colors.primary.base};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.subtle};
  }
`;
var Toolbar = import_styled_components68.styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[1.5]} ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;
var Modes = import_styled_components68.styled.div`
  display: inline-flex;
  padding: 2px;
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};
  border-radius: ${({ theme }) => theme.radii.md};
`;
var ModeButton = import_styled_components68.styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: 2px ${({ theme }) => theme.spacing[2]};
  font: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ $active, theme }) => $active ? theme.colors.text.heading : theme.colors.text.muted};
  background-color: ${({ $active, theme }) => $active ? theme.colors.background.surface : "transparent"};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;
`;
var FormatButtons = import_styled_components68.styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
`;
var FormatButton = import_styled_components68.styled.button`
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
var Separator = import_styled_components68.styled.span`
  width: 1px;
  height: 18px;
  margin: 0 ${({ theme }) => theme.spacing[1]};
  background-color: ${({ theme }) => theme.colors.border.hover};
`;
var Input2 = import_styled_components68.styled.textarea`
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
var Preview = import_styled_components68.styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.body};
`;
var Empty = import_styled_components68.styled.em`
  color: ${({ theme }) => theme.colors.text.muted};
`;
var ACTIONS = {
  heading: { icon: "heading", label: "Titre" },
  bold: { icon: "bold", label: "Gras (Ctrl+B)" },
  italic: { icon: "italic", label: "Italique (Ctrl+I)" },
  strike: { icon: "strikethrough", label: "Barr\xE9" },
  highlight: { icon: "highlighter", label: "Surlign\xE9" },
  ul: { icon: "list", label: "Liste \xE0 puces" },
  ol: { icon: "list-ordered", label: "Liste num\xE9rot\xE9e" },
  task: { icon: "list-checks", label: "Liste de t\xE2ches" },
  quote: { icon: "quote", label: "Citation" },
  code: { icon: "code", label: "Code (Ctrl+E)" },
  codeblock: { icon: "file-code", label: "Bloc de code" },
  link: { icon: "link", label: "Lien (Ctrl+K)" }
};
var ALL_ACTIONS = [
  "heading",
  "bold",
  "italic",
  "strike",
  "highlight",
  "separator",
  "ul",
  "ol",
  "task",
  "quote",
  "separator",
  "code",
  "codeblock",
  "link"
];
var MarkdownEditor = ({
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
  "aria-label": ariaLabel
}) => {
  const id = (0, import_react23.useId)();
  const { textareaRef, mode, setMode, applyAction, onKeyDown, previewMinHeight } = (0, import_core_react5.useMarkdownEditor)();
  const isPreview = mode === "preview";
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Field, { children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Label, { htmlFor: id, $required: required, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Root, { $invalid: Boolean(error), children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Toolbar, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Modes, { role: "radiogroup", "aria-label": "Mode de l'\xE9diteur", children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
            ModeButton,
            {
              type: "button",
              role: "radio",
              "aria-checked": !isPreview,
              $active: !isPreview,
              onClick: () => setMode("write"),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_icons10.Icon, { name: "pencil", size: 12 }),
                " \xC9crire"
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
            ModeButton,
            {
              type: "button",
              role: "radio",
              "aria-checked": isPreview,
              $active: isPreview,
              onClick: () => setMode("preview"),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_icons10.Icon, { name: "eye", size: 12 }),
                " Aper\xE7u"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(FormatButtons, { role: "toolbar", "aria-label": "Mise en forme", children: actions.map(
          (action, index) => action === "separator" ? /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Separator, { "aria-hidden": "true" }, `separator-${index}`) : /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_react23.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            FormatButton,
            {
              type: "button",
              title: ACTIONS[action].label,
              "aria-label": ACTIONS[action].label,
              disabled: isPreview,
              onClick: () => applyAction(action),
              children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_icons10.Icon, { name: ACTIONS[action].icon, size: 15 })
            }
          ) }, action)
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        Input2,
        {
          id,
          ref: textareaRef,
          hidden: isPreview,
          value,
          rows,
          required,
          maxLength,
          placeholder,
          autoFocus,
          "aria-label": label ? void 0 : ariaLabel,
          "aria-invalid": Boolean(error),
          onChange: (event) => onChange(event.target.value),
          onKeyDown
        }
      ),
      isPreview && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Preview, { style: { minHeight: previewMinHeight }, children: value.trim() ? /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(MarkdownViewer, { breaks: true, children: value }) : /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Empty, { children: "Rien \xE0 pr\xE9visualiser." }) })
    ] }),
    (error || hint) && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(HelperText, { $state: error ? "invalid" : void 0, children: error ?? hint })
  ] });
};

// src/ui/components/Forms/TagInput/TagInput.tsx
var import_icons11 = require("core-react/icons");
var import_react24 = require("react");
var import_styled_components69 = require("styled-components");
var import_jsx_runtime39 = require("react/jsx-runtime");
var InputBox = import_styled_components69.styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1.5]};
  padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[2.5]}`};
  min-height: 40px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid
    ${({ $hasError, theme }) => $hasError ? theme.colors.danger.base : theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.base};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.base};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.borders.focusRing.color};
  }
`;
var BareInput = import_styled_components69.styled.input`
  flex: 1;
  min-width: 120px;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.body};
`;
var RemoveBtn = import_styled_components69.styled.button`
  display: inline-flex;
  border: none;
  background: transparent;
  color: inherit;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
var SuggestionsList = import_styled_components69.styled.ul`
  margin: ${({ theme }) => theme.spacing[1]} 0 0 0;
  padding: ${({ theme }) => theme.spacing[1]};
  list-style: none;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.base};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  max-height: 160px;
  overflow-y: auto;
`;
var SuggestionItem = import_styled_components69.styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[2]}`};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  }
`;
var ColorDot = import_styled_components69.styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;
var TagInput = ({
  label,
  value,
  onChange,
  suggestions = [],
  placeholder = "Ajouter un tag\u2026",
  allowCreate = true,
  error,
  hint,
  ...rest
}) => {
  const theme = (0, import_styled_components69.useTheme)();
  const [query, setQuery] = (0, import_react24.useState)("");
  const availableSuggestions = suggestions.filter(
    (s) => !value.some((v) => v.id === s.id) && s.label.toLowerCase().includes(query.toLowerCase())
  );
  const addTag = (tag) => {
    onChange([...value, tag]);
    setQuery("");
  };
  const removeTag = (id) => {
    onChange(value.filter((t) => t.id !== id));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      const existing = availableSuggestions[0];
      if (existing) {
        addTag(existing);
      } else if (allowCreate) {
        addTag({
          id: query.trim().toLowerCase(),
          label: query.trim(),
          color: theme.colors.primary.scale[500]
        });
      }
    } else if (e.key === "Backspace" && !query && value.length > 0) {
      const lastTag = value[value.length - 1];
      if (lastTag) {
        removeTag(lastTag.id);
      }
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { ...rest, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(Label, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(InputBox, { $hasError: Boolean(error), children: [
      value.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(Badge, { $pill: true, $color: tag.color, $variant: "primary", children: [
        tag.label,
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(RemoveBtn, { type: "button", onClick: () => removeTag(tag.id), "aria-label": `Retirer ${tag.label}`, children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_icons11.Icon, { name: "close", size: 12 }) })
      ] }, tag.id)),
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
        BareInput,
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          onKeyDown: handleKeyDown,
          placeholder: value.length === 0 ? placeholder : ""
        }
      )
    ] }),
    query && availableSuggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(SuggestionsList, { children: availableSuggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(SuggestionItem, { onClick: () => addTag(s), children: [
      s.color && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(ColorDot, { $color: s.color }),
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { children: s.label })
    ] }, s.id)) }),
    error && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(HelperText, { $state: "invalid", children: error }),
    !error && hint && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(HelperText, { children: hint })
  ] });
};

// src/ui/components/Grid/Col.tsx
var import_styled_components70 = require("styled-components");
var computeWidth = (span) => {
  if (!span) return "";
  if (span === "auto") {
    return import_styled_components70.css`
      flex: 1 0 0%;
      width: auto;
      max-width: 100%;
    `;
  }
  const pct = `${span / 12 * 100}%`;
  return import_styled_components70.css`
    flex: 0 0 auto;
    width: ${pct};
  `;
};
var Col = import_styled_components70.styled.div.attrs((props) => ({
  as: props.as || "div"
}))`
  box-sizing: border-box;
  flex: 0 0 auto;
  width: 100%;

  ${({ $span }) => computeWidth($span)}
  ${({ $offset }) => $offset && import_styled_components70.css`
      margin-left: ${$offset / 12 * 100}%;
    `}

  ${({ $sm, theme }) => $sm && import_styled_components70.css`
      ${theme.media.up("sm")} {
        ${computeWidth($sm)}
      }
    `}

  ${({ $md, theme }) => $md && import_styled_components70.css`
      ${theme.media.up("md")} {
        ${computeWidth($md)}
      }
    `}

  ${({ $lg, theme }) => $lg && import_styled_components70.css`
      ${theme.media.up("lg")} {
        ${computeWidth($lg)}
      }
    `}

  ${({ $xl, theme }) => $xl && import_styled_components70.css`
      ${theme.media.up("xl")} {
        ${computeWidth($xl)}
      }
    `}
`;

// src/ui/components/Grid/Columns.tsx
var import_styled_components71 = require("styled-components");
var Columns = import_styled_components71.styled.div.attrs((props) => ({
  as: props.as || "div"
}))`
  columns: ${({ $count, $width }) => {
  if ($count && $width) return `${$count} ${$width}`;
  if ($count) return `${$count}`;
  if ($width) return $width;
  return "auto";
}};
  column-gap: ${({ $gap, theme }) => $gap || theme.spacing[4]};
  ${({ $rule }) => $rule && `column-rule: ${$rule};`}

  /* Empêche les cartes enfants de se couper en deux entre deux colonnes */
  & > * {
    break-inside: avoid;
    margin-bottom: ${({ $gap, theme }) => $gap || theme.spacing[4]};
  }
`;

// src/ui/components/Grid/Container.tsx
var import_styled_components72 = require("styled-components");
var Container3 = import_styled_components72.styled.div.attrs((props) => ({
  as: props.as || "div"
}))`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[4]};

  ${({ $fluid, theme }) => !$fluid && import_styled_components72.css`
      ${theme.media.up("sm")} {
        max-width: 540px;
      }
      ${theme.media.up("md")} {
        max-width: 720px;
      }
      ${theme.media.up("lg")} {
        max-width: 960px;
      }
      ${theme.media.up("xl")} {
        max-width: 1140px;
      }
      ${theme.media.up("xxl")} {
        max-width: 1320px;
      }
    `}
`;

// src/ui/components/Grid/Flex.tsx
var import_styled_components73 = require("styled-components");
var Flex = import_styled_components73.styled.div.attrs((props) => ({
  as: props.as || "div"
}))`
  display: ${({ $inline }) => $inline ? "inline-flex" : "flex"};
  flex-direction: ${({ $direction = "row" }) => $direction};
  justify-content: ${({ $justify = "flex-start" }) => $justify};
  align-items: ${({ $align = "stretch" }) => $align};
  flex-wrap: ${({ $wrap = "nowrap" }) => $wrap};
  gap: ${({ $gap, theme }) => $gap || theme.spacing[0]};
`;

// src/ui/components/Grid/Grid.tsx
var import_styled_components74 = require("styled-components");
var Grid = import_styled_components74.styled.div.attrs((props) => ({
  as: props.as || "div"
}))`
  display: grid;
  grid-template-columns: ${({ $columns = 1 }) => typeof $columns === "number" ? `repeat(${$columns}, 1fr)` : $columns};
  grid-template-rows: ${({ $rows }) => $rows ? typeof $rows === "number" ? `repeat(${$rows}, 1fr)` : $rows : "auto"};
  gap: ${({ $gap, theme }) => $gap || theme.spacing[0]};
  ${({ $columnGap }) => $columnGap && `column-gap: ${$columnGap};`}
  ${({ $rowGap }) => $rowGap && `row-gap: ${$rowGap};`}
  align-items: ${({ $alignItems = "stretch" }) => $alignItems};
  justify-items: ${({ $justifyItems = "stretch" }) => $justifyItems};
`;

// src/ui/components/Grid/Row.tsx
var import_styled_components75 = require("styled-components");
var Row = import_styled_components75.styled.div.attrs((props) => ({
  as: props.as || "div"
}))`
  display: flex;
  flex-wrap: wrap;
  margin-right: -${({ $gutter, theme }) => $gutter || theme.spacing[2]};
  margin-left: -${({ $gutter, theme }) => $gutter || theme.spacing[2]};

  & > * {
    padding-right: ${({ $gutter, theme }) => $gutter || theme.spacing[2]};
    padding-left: ${({ $gutter, theme }) => $gutter || theme.spacing[2]};
  }
`;

// src/ui/components/Navigation/BackButton/BackButton.tsx
var import_icons12 = require("core-react/icons");
var import_react25 = require("react");
var import_core_react6 = require("core-react");
var import_styled_components76 = require("styled-components");
var import_jsx_runtime40 = require("react/jsx-runtime");
var StyledBackButton = import_styled_components76.styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1.5]};
  padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[2.5]}`};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.muted};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;
  transition:
    color 0.15s ease,
    background-color 0.15s ease;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.text.heading};
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var BackButton = ({ label = "Retour", fallbackUrl, onClick, ...rest }) => {
  const { navigation: router } = (0, import_core_react6.useUI)();
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackUrl) {
      router.push(fallbackUrl);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(StyledBackButton, { type: "button", onClick: handleClick, ...rest, children: [
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_icons12.Icon, { name: "arrow-left", size: 18 }),
    label && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { children: label })
  ] });
};

// src/ui/components/Navigation/Breadcrumb/Breadcrumb.tsx
var import_icons14 = require("core-react/icons");
var import_react28 = __toESM(require("react"), 1);
var import_styled_components79 = require("styled-components");

// src/ui/components/Navigation/Breadcrumb/BreadcrumbContainer.tsx
var import_react26 = require("react");
var import_styled_components77 = require("styled-components");
var import_jsx_runtime41 = require("react/jsx-runtime");
var Nav = import_styled_components77.styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing?.[2] || "8px"};
`;
var OrderedList = import_styled_components77.styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
`;
var BreadcrumbContainer = ({ children, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(Nav, { "aria-label": "Fil d'Ariane", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(OrderedList, { children }) });

// src/ui/components/Navigation/Breadcrumb/BreadcrumbItem.tsx
var import_icons13 = require("core-react/icons");
var import_react27 = require("react");
var import_styled_components78 = require("styled-components");
var import_core_react7 = require("core-react");
var import_jsx_runtime42 = require("react/jsx-runtime");
var ItemLi = import_styled_components78.styled.li`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  line-height: 1.4;
`;
var interactiveStyles = import_styled_components78.css`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.text.muted};
  text-decoration: none;
  font-weight: 500;
  border-radius: 6px;
  padding: 2px 6px;
  margin: -2px -6px;
  transition:
    color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.heading};
    background-color: ${({ theme }) => theme.colors.background.surfaceHover || "rgba(0, 0, 0, 0.04)"};
  }
`;
var StyledLink = import_styled_components78.styled.a`
  ${interactiveStyles}
`;
var StyledButton = import_styled_components78.styled.button`
  ${interactiveStyles}
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
`;
var ActiveSpan = import_styled_components78.styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.text.heading};
  font-weight: 600;
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
var BreadcrumbItem = ({
  children,
  to,
  onClick,
  icon,
  active = false
}) => {
  const linkProps = (0, import_core_react7.useLinkProps)(to);
  const content = /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(import_jsx_runtime42.Fragment, { children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_icons13.Icon, { name: icon, size: 15 }),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { children })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ItemLi, { children: active ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ActiveSpan, { "aria-current": "page", children: content }) : to ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(StyledLink, { ...linkProps, children: content }) : onClick ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(StyledButton, { type: "button", onClick, children: content }) : /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ActiveSpan, { children: content }) });
};

// src/ui/components/Navigation/Breadcrumb/Breadcrumb.tsx
var import_jsx_runtime43 = require("react/jsx-runtime");
var Separator2 = import_styled_components79.styled.li`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.muted};
  opacity: 0.6;
  user-select: none;
`;
var Breadcrumb = ({
  items,
  separatorIcon = "chevron-right",
  children,
  className
}) => {
  const elements = items ? items.map((item, idx) => {
    const isLast = idx === items.length - 1;
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      BreadcrumbItem,
      {
        to: item.to,
        onClick: item.onClick,
        icon: item.icon,
        active: item.active ?? isLast,
        children: item.label
      },
      idx
    );
  }) : import_react28.default.Children.toArray(children);
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(BreadcrumbContainer, { className, children: elements.map((el, index) => /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_react28.default.Fragment, { children: [
    index > 0 && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(Separator2, { "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_icons14.Icon, { name: separatorIcon, size: 15 }) }),
    el
  ] }, index)) });
};

// src/ui/components/Navigation/Dropdown/Dropdown.tsx
var import_react31 = require("react");
var import_styled_components82 = require("styled-components");

// src/ui/components/Navigation/Dropdown/DropdownContext.tsx
var import_react29 = require("react");
var GenericDropdownContext = (0, import_react29.createContext)(null);
var useGenericDropdown = () => {
  const ctx = (0, import_react29.useContext)(GenericDropdownContext);
  if (!ctx) {
    throw new Error("Doit \xEAtre utilis\xE9 \xE0 l\u2019int\xE9rieur d\u2019un <Dropdown>");
  }
  return ctx;
};

// src/ui/components/Navigation/Dropdown/DropdownItem.tsx
var import_react30 = require("react");
var import_styled_components80 = require("styled-components");
var import_jsx_runtime44 = require("react/jsx-runtime");
var StyledItem = import_styled_components80.styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[2.5]}`};
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  ${({ $variant, theme }) => $variant === "danger" ? import_styled_components80.css`
          color: ${theme.colors.danger.base};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.danger.subtle};
            color: ${theme.colors.danger.dark};
          }
        ` : import_styled_components80.css`
          color: ${theme.colors.text.body};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.surfaceHover};
            color: ${theme.colors.text.heading};
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var DropdownDivider = import_styled_components80.styled.li`
  height: 1px;
  margin: ${({ theme }) => `${theme.spacing[1]} 0`};
  background-color: ${({ theme }) => theme.colors.border.default};
`;
var DropdownItem = ({
  icon,
  variant = "default",
  onClick,
  children,
  ...rest
}) => {
  const { close } = useGenericDropdown();
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("li", { role: "none", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
    StyledItem,
    {
      type: "button",
      role: "menuitem",
      $variant: variant,
      onClick: (e) => {
        onClick?.(e);
        close();
      },
      ...rest,
      children: [
        icon,
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { children })
      ]
    }
  ) });
};

// src/ui/components/Navigation/Dropdown/DropdownMenu.tsx
var import_styled_components81 = require("styled-components");
var import_jsx_runtime45 = require("react/jsx-runtime");
var MenuList = import_styled_components81.styled.ul`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing[1]});
  ${({ $align }) => $align === "right" ? "right: 0;" : "left: 0;"}
  z-index: 950;
  display: ${({ $isOpen }) => $isOpen ? "flex" : "none"};
  flex-direction: column;
  min-width: ${({ $minWidth }) => $minWidth};
  margin: 0;
  padding: ${({ theme }) => theme.spacing[1.5]};
  list-style: none;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.base};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
var DropdownMenu = ({
  align = "right",
  minWidth = "180px",
  children,
  ...rest
}) => {
  const { isOpen } = useGenericDropdown();
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(MenuList, { $isOpen: isOpen, $align: align, $minWidth: minWidth, role: "menu", ...rest, children });
};

// src/ui/components/Navigation/Dropdown/Dropdown.tsx
var import_jsx_runtime46 = require("react/jsx-runtime");
var Wrapper2 = import_styled_components82.styled.div`
  position: relative;
  display: inline-flex;
`;
var TriggerButton = import_styled_components82.styled.div`
  display: inline-flex;
  cursor: pointer;
`;
var DropdownTrigger = ({ children, onClick, ...rest }) => {
  const { isOpen, toggle } = useGenericDropdown();
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
    TriggerButton,
    {
      onClick: (e) => {
        onClick?.(e);
        toggle();
      },
      "aria-haspopup": "menu",
      "aria-expanded": isOpen,
      ...rest,
      children
    }
  );
};
var DropdownRoot = ({ children, ...rest }) => {
  const [isOpen, setIsOpen] = (0, import_react31.useState)(false);
  const ref = (0, import_react31.useRef)(null);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  (0, import_react31.useEffect)(() => {
    if (!isOpen) return;
    const onOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close();
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(GenericDropdownContext.Provider, { value: { isOpen, toggle, close }, children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Wrapper2, { ref, ...rest, children }) });
};
var Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
  Divider: DropdownDivider
});

// src/ui/components/Navigation/Navbar/Navbar.tsx
var import_react33 = require("react");
var import_styled_components83 = require("styled-components");

// src/ui/components/Navigation/Navbar/NavbarContext.tsx
var import_react32 = require("react");
var NavbarContext = (0, import_react32.createContext)(null);
var useNavbar = () => {
  const context = (0, import_react32.useContext)(NavbarContext);
  if (!context) {
    throw new Error("Les sous-composants Navbar doivent \xEAtre utilis\xE9s dans <Navbar>");
  }
  return context;
};

// src/ui/components/Navigation/Navbar/Navbar.tsx
var import_jsx_runtime47 = require("react/jsx-runtime");
var StyledNav = import_styled_components83.styled.nav`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 56px;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  box-sizing: border-box;

  ${({ $sticky }) => $sticky && import_styled_components83.css`
      position: sticky;
      top: 0;
      z-index: 100;
    `}
`;
var Navbar = ({
  sticky,
  breakpoint,
  isOpen: controlledIsOpen,
  onToggle,
  children,
  ...props
}) => {
  const [internalIsOpen, setInternalIsOpen] = (0, import_react33.useState)(false);
  const isControlled = controlledIsOpen !== void 0;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalIsOpen(next);
    onToggle?.(next);
  };
  const close = () => {
    if (!isControlled) setInternalIsOpen(false);
    onToggle?.(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(NavbarContext.Provider, { value: { isOpen, toggle, close, breakpoint }, children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(StyledNav, { $sticky: sticky, ...props, children }) });
};

// src/ui/components/Navigation/Navbar/NavbarBrand.tsx
var import_styled_components84 = require("styled-components");
var NavbarBrand = import_styled_components84.styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
  text-decoration: none;
  user-select: none;
`;

// src/ui/components/Navigation/Navbar/NavbarCollapse.tsx
var import_react34 = require("react");
var import_styled_components85 = require("styled-components");
var import_jsx_runtime48 = require("react/jsx-runtime");
var CollapseWrapper = import_styled_components85.styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  ${({ $breakpoint, $isOpen, theme }) => $breakpoint && import_styled_components85.css`
      @media (max-width: ${theme.breakpoints[$breakpoint]}) {
        display: ${$isOpen ? "flex" : "none"};
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        margin-top: ${theme.spacing[2]};
        padding-top: ${theme.spacing[2]};
        border-top: 1px solid ${theme.colors.border.default};
        gap: ${theme.spacing[2]};
      }
    `}
`;
var NavbarCollapse = ({
  children,
  ...props
}) => {
  const { isOpen, breakpoint } = useNavbar();
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(CollapseWrapper, { $isOpen: isOpen, $breakpoint: breakpoint, ...props, children });
};

// src/ui/components/Navigation/Navbar/NavbarDropdown.tsx
var import_core_react8 = require("core-react");
var import_react36 = require("react");
var import_styled_components86 = require("styled-components");

// src/ui/components/Navigation/Navbar/NavbarDropdownContext.tsx
var import_react35 = require("react");
var DropdownContext = (0, import_react35.createContext)(null);
var useDropdown = () => {
  const ctx = (0, import_react35.useContext)(DropdownContext);
  if (!ctx) throw new Error("Utiliser les \xE9l\xE9ments Dropdown dans <NavbarDropdown>");
  return ctx;
};

// src/ui/components/Navigation/Navbar/NavbarDropdown.tsx
var import_jsx_runtime49 = require("react/jsx-runtime");
var DropdownContainer = import_styled_components86.styled.div`
  position: relative;
  display: inline-flex;
`;
var DropdownToggleBtn = import_styled_components86.styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1.5]};
  padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[3]}`};
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radii.base};
  color: ${({ theme }) => theme.colors.text.body};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    color: ${({ theme }) => theme.colors.text.heading};
  }
`;
var MenuWrapper = import_styled_components86.styled.ul`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing[1.5]});
  ${({ $align }) => $align === "right" ? "right: 0;" : "left: 0;"};
  z-index: 1000;
  display: ${({ $isOpen }) => $isOpen ? "flex" : "none"};
  flex-direction: column;
  min-width: 260px;
  max-width: 340px;
  margin: 0;
  padding: ${({ theme }) => theme.spacing[2]};
  list-style: none;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border: none;
  border-radius: 0.45rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  box-sizing: border-box;
`;
var HeaderLi = import_styled_components86.styled.li`
  padding: ${({ theme }) => `${theme.spacing[2]}${theme.spacing[3]}`};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;
var ItemLi2 = import_styled_components86.styled.li`
  width: 100%;
`;
var ItemBtn = import_styled_components86.styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[2.5]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.body};
  background: transparent;
  border: none;
  border-radius: 0.45rem;
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    color: ${({ theme }) => theme.colors.text.heading};
  }

  ${({ $active, theme }) => $active && import_styled_components86.css`
      background-color: ${theme.colors.primary.subtle};
      color: ${theme.colors.primary.base};
    `}
`;
var DividerLi = import_styled_components86.styled.li`
  margin: ${({ theme }) => `${theme.spacing[1.5]} 0`};
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.default};
`;
var NavbarDropdown = ({ children }) => {
  const [isOpen, setIsOpen] = (0, import_react36.useState)(false);
  const containerRef = (0, import_react36.useRef)(null);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  (0, import_react36.useEffect)(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        close();
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DropdownContext.Provider, { value: { isOpen, toggle, close }, children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DropdownContainer, { ref: containerRef, children }) });
};
var NavbarDropdownToggle = ({
  children,
  ...props
}) => {
  const { isOpen, toggle } = useDropdown();
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DropdownToggleBtn, { type: "button", onClick: toggle, "aria-haspopup": "true", "aria-expanded": isOpen, ...props, children });
};
var NavbarDropdownMenu = ({ children, align = "right" }) => {
  const { isOpen } = useDropdown();
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(MenuWrapper, { $isOpen: isOpen, $align: align, role: "menu", children });
};
var NavbarDropdownItem = ({
  as,
  children,
  onClick,
  active,
  href,
  ...props
}) => {
  const { close } = useDropdown();
  const linkProps = (0, import_core_react8.useLinkProps)(href, as);
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ItemLi2, { role: "none", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
    ItemBtn,
    {
      ...linkProps,
      role: "menuitem",
      $active: active,
      onClick: (e) => {
        onClick?.(e);
        close();
      },
      ...props,
      children
    }
  ) });
};
var NavbarDropdownHeader = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(HeaderLi, { role: "presentation", children });
var NavbarDropdownDivider = () => /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DividerLi, { role: "separator" });

// src/ui/components/Navigation/Navbar/NavbarItem.tsx
var import_styled_components87 = require("styled-components");
var NavbarItem = import_styled_components87.styled.div`
  display: flex;
  align-items: center;
`;

// src/ui/components/Navigation/Navbar/NavbarLink.tsx
var import_core_react9 = require("core-react");
var import_styled_components88 = require("styled-components");
var import_jsx_runtime50 = require("react/jsx-runtime");
var NavbarLinkBase = import_styled_components88.styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1.5]};
  padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[3]}`};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;
  text-decoration: none;
  transition:
    color 0.15s ease,
    background-color 0.15s ease;

  color: ${({ $active, theme }) => $active ? theme.colors.primary.base : theme.colors.text.body};

  ${({ $active, theme }) => $active ? import_styled_components88.css`
          background-color: ${theme.colors.primary.subtle};
        ` : import_styled_components88.css`
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.surfaceHover};
            color: ${theme.colors.text.heading};
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var NavbarLink = ({ href, as, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(NavbarLinkBase, { ...props, ...(0, import_core_react9.useLinkProps)(href, as) });

// src/ui/components/Navigation/Navbar/NavbarNav.tsx
var import_styled_components89 = require("styled-components");
var NavbarNav = import_styled_components89.styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
`;

// src/ui/components/Navigation/Navbar/NavbarToggle.tsx
var import_icons15 = require("core-react/icons");
var import_react37 = require("react");
var import_styled_components90 = require("styled-components");
var import_jsx_runtime51 = require("react/jsx-runtime");
var ToggleButton = import_styled_components90.styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[2]};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.base};
  color: ${({ theme }) => theme.colors.text.body};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    color: ${({ theme }) => theme.colors.text.heading};
  }

  ${({ $breakpoint, theme }) => $breakpoint && import_styled_components90.css`
      @media (max-width: ${theme.breakpoints[$breakpoint]}) {
        display: inline-flex;
      }
    `}
`;
var NavbarToggle = ({ children, ...props }) => {
  const { isOpen, toggle, breakpoint } = useNavbar();
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
    ToggleButton,
    {
      type: "button",
      $breakpoint: breakpoint,
      onClick: toggle,
      "aria-expanded": isOpen,
      "aria-label": "Basculer la navigation",
      ...props,
      children: children ?? /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(import_icons15.Icon, { name: isOpen ? "close" : "menu", size: 20 })
    }
  );
};

// src/ui/components/Navigation/Pagination/Pagination.tsx
var import_icons16 = require("core-react/icons");
var import_react41 = require("react");

// src/ui/components/Navigation/Pagination/PaginationButton.tsx
var import_react38 = require("react");
var import_styled_components91 = require("styled-components");
var import_jsx_runtime52 = require("react/jsx-runtime");
var StyledButton2 = import_styled_components91.styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 ${({ theme }) => theme.spacing[1.5]};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  border-radius: ${({ theme }) => theme.radii.base};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.body};
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary.base};
    color: ${({ theme }) => theme.colors.primary.base};
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  }

  ${({ $isActive, theme }) => $isActive && import_styled_components91.css`
      background-color: ${theme.colors.primary.base};
      border-color: ${theme.colors.primary.base};
      color: ${theme.colors.white};
      font-weight: ${theme.typography.weights.semibold};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.primary.hover};
        border-color: ${theme.colors.primary.hover};
        color: ${theme.colors.white};
      }
    `}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
var PaginationButton = ({
  isActive = false,
  type = "button",
  children,
  ...rest
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(StyledButton2, { type, $isActive: isActive, "aria-current": isActive ? "page" : void 0, ...rest, children });
};

// src/ui/components/Navigation/Pagination/PaginationContainer.tsx
var import_react39 = require("react");
var import_styled_components92 = require("styled-components");
var import_jsx_runtime53 = require("react/jsx-runtime");
var Nav2 = import_styled_components92.styled.nav`
  display: flex;
  justify-content: center;
`;
var List = import_styled_components92.styled.ul`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  list-style: none;
  margin: 0;
  padding: 0;
`;
var PaginationContainer = ({
  children,
  "aria-label": ariaLabel = "Navigation pagination",
  ...rest
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(Nav2, { "aria-label": ariaLabel, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(List, { children }) });
};

// src/ui/components/Navigation/Pagination/PaginationEllipsis.tsx
var import_react40 = require("react");
var import_styled_components93 = require("styled-components");
var import_jsx_runtime54 = require("react/jsx-runtime");
var StyledEllipsis = import_styled_components93.styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
var PaginationEllipsis = ({ children = "\u2026", ...rest }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(StyledEllipsis, { "aria-hidden": "true", ...rest, children });
};

// src/ui/components/Navigation/Pagination/PaginationItem.tsx
var import_styled_components94 = require("styled-components");
var PaginationItem = import_styled_components94.styled.li`
  display: inline-flex;
`;

// src/ui/components/Navigation/Pagination/Pagination.tsx
var import_jsx_runtime55 = require("react/jsx-runtime");
var range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
var BasePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  disabled = false,
  ...rest
}) => {
  const paginationRange = (0, import_react41.useMemo)(() => {
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [...range(1, leftItemCount), "DOTS", totalPages];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      return [1, "DOTS", ...range(totalPages - rightItemCount + 1, totalPages)];
    }
    return [1, "DOTS", ...range(leftSiblingIndex, rightSiblingIndex), "DOTS", totalPages];
  }, [totalPages, siblingCount, currentPage]);
  if (totalPages <= 1) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(PaginationContainer, { ...rest, children: [
    showFirstLast && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
      PaginationButton,
      {
        disabled: disabled || currentPage === 1,
        onClick: () => onPageChange(1),
        "aria-label": "Premi\xE8re page",
        children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_icons16.Icon, { name: "chevron-double-left", size: 16 })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
      PaginationButton,
      {
        disabled: disabled || currentPage === 1,
        onClick: () => onPageChange(currentPage - 1),
        "aria-label": "Page pr\xE9c\xE9dente",
        children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_icons16.Icon, { name: "chevron-left", size: 16 })
      }
    ) }),
    paginationRange.map((pageNumber, idx) => {
      if (pageNumber === "DOTS") {
        return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(PaginationEllipsis, {}) }, `dots-${idx}`);
      }
      const page = pageNumber;
      return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
        PaginationButton,
        {
          isActive: page === currentPage,
          disabled,
          onClick: () => onPageChange(page),
          "aria-label": `Page ${page}`,
          children: page
        }
      ) }, page);
    }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
      PaginationButton,
      {
        disabled: disabled || currentPage === totalPages,
        onClick: () => onPageChange(currentPage + 1),
        "aria-label": "Page suivante",
        children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_icons16.Icon, { name: "chevron-right", size: 16 })
      }
    ) }),
    showFirstLast && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
      PaginationButton,
      {
        disabled: disabled || currentPage === totalPages,
        onClick: () => onPageChange(totalPages),
        "aria-label": "Derni\xE8re page",
        children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_icons16.Icon, { name: "chevron-double-right", size: 16 })
      }
    ) })
  ] });
};
var Pagination = Object.assign(BasePagination, {
  Container: PaginationContainer,
  Item: PaginationItem,
  Button: PaginationButton,
  Ellipsis: PaginationEllipsis
});

// src/ui/components/Navigation/Sidebar/Sidebar.tsx
var import_react43 = require("react");
var import_styled_components95 = require("styled-components");

// src/ui/components/Navigation/Sidebar/SidebarContext.tsx
var import_react42 = require("react");
var import_jsx_runtime56 = require("react/jsx-runtime");
var SidebarContext = (0, import_react42.createContext)(null);
var useSidebar = () => {
  const context = (0, import_react42.useContext)(SidebarContext);
  if (!context) {
    throw new Error("Les sous-composants Sidebar doivent \xEAtre utilis\xE9s dans <SidebarProvider> ou <Sidebar>");
  }
  return context;
};
var SidebarProvider = ({
  children,
  breakpoint = "md",
  isOpen: controlledIsOpen,
  onToggle
}) => {
  const [internalIsOpen, setInternalIsOpen] = (0, import_react42.useState)(false);
  const isControlled = controlledIsOpen !== void 0;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalIsOpen(next);
    onToggle?.(next);
  };
  const close = () => {
    if (!isControlled) setInternalIsOpen(false);
    onToggle?.(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(SidebarContext.Provider, { value: { isOpen, toggle, close, breakpoint }, children });
};

// src/ui/components/Navigation/Sidebar/Sidebar.tsx
var import_jsx_runtime57 = require("react/jsx-runtime");
var Backdrop3 = import_styled_components95.styled.div`
  display: none;

  ${({ $breakpoint, $isOpen, theme }) => $breakpoint && import_styled_components95.css`
      @media (max-width: ${theme.breakpoints[$breakpoint]}) {
        display: ${$isOpen ? "block" : "none"};
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 998;
        backdrop-filter: blur(2px);
        transition: opacity 0.2s ease;
      }
    `}
`;
var StyledSidebar = import_styled_components95.styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ $width }) => $width};
  min-width: ${({ $width }) => $width};
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border.default};
  box-sizing: border-box;
  overflow: hidden;
  transition: transform 0.25s ease-in-out;

  ${({ $breakpoint, $isOpen, theme }) => $breakpoint && import_styled_components95.css`
      @media (max-width: ${theme.breakpoints[$breakpoint]}) {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 999;
        box-shadow: ${theme.shadows.lg};
        transform: ${$isOpen ? "translateX(0)" : "translateX(-100%)"};
      }
    `}
`;
var SidebarInternal = ({
  width = "260px",
  breakpoint: overrideBreakpoint,
  isOpen: _isOpen,
  onToggle: _onToggle,
  children,
  ...props
}) => {
  const { isOpen, close, breakpoint } = useSidebar();
  const activeBreakpoint = overrideBreakpoint ?? breakpoint;
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(import_jsx_runtime57.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(Backdrop3, { $isOpen: isOpen, $breakpoint: activeBreakpoint, onClick: close }),
    /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(StyledSidebar, { $isOpen: isOpen, $width: width, $breakpoint: activeBreakpoint, ...props, children })
  ] });
};
var Sidebar = ({ breakpoint = "md", isOpen, onToggle, ...props }) => {
  const existingContext = (0, import_react43.useContext)(SidebarContext);
  if (existingContext) {
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(SidebarInternal, { breakpoint, ...props });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(SidebarProvider, { breakpoint, isOpen, onToggle, children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(SidebarInternal, { breakpoint, ...props }) });
};

// src/ui/components/Navigation/Sidebar/SidebarHeader.tsx
var import_styled_components96 = require("styled-components");
var SidebarHeader = import_styled_components96.styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  box-sizing: border-box;
  gap: ${({ theme }) => theme.spacing[2]};
`;

// src/ui/components/Navigation/Sidebar/SidebarNav.tsx
var import_styled_components97 = require("styled-components");
var SidebarNav = import_styled_components97.styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[2]}`};
  gap: ${({ theme }) => theme.spacing[1]};
  overflow-y: auto;
  box-sizing: border-box;

  /* Scrollbar discrète */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border.default};
    border-radius: ${({ theme }) => theme.radii.base};
  }
`;

// src/ui/components/Navigation/Sidebar/SidebarSection.tsx
var import_styled_components98 = require("styled-components");
var SidebarSection = import_styled_components98.styled.span`
  display: block;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.text.muted ?? theme.colors.text.body};
  opacity: 0.7;
  user-select: none;
`;

// src/ui/components/Navigation/Sidebar/SidebarItem.tsx
var import_styled_components99 = require("styled-components");
var SidebarItem = import_styled_components99.styled.div`
  display: flex;
  width: 100%;
`;

// src/ui/components/Navigation/Sidebar/SidebarLink.tsx
var import_core_react10 = require("core-react");
var import_react44 = require("react");
var import_styled_components100 = require("styled-components");
var import_jsx_runtime58 = require("react/jsx-runtime");
var StyledLink2 = import_styled_components100.styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[2.5]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  transition: all 0.15s ease;

  color: ${({ $active, theme }) => $active ? theme.colors.primary.base : theme.colors.text.body};

  ${({ $active, theme }) => $active ? import_styled_components100.css`
          background-color: ${theme.colors.primary.subtle};
          font-weight: ${theme.typography.weights.semibold};
        ` : import_styled_components100.css`
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.surfaceHover};
            color: ${theme.colors.text.heading};
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var ContentSlot = import_styled_components100.styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;
var BadgeSlot = import_styled_components100.styled.span`
  display: inline-flex;
  align-items: center;
`;
var SidebarLink = ({
  as,
  active,
  icon,
  badge,
  children,
  onClick,
  href,
  ...props
}) => {
  const { close, breakpoint } = useSidebar();
  const linkProps = (0, import_core_react10.useLinkProps)(href, as);
  const handleClick = (e) => {
    onClick?.(e);
    if (breakpoint) close();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(StyledLink2, { ...linkProps, $active: active, onClick: handleClick, ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(ContentSlot, { children: [
      icon,
      children
    ] }),
    badge && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(BadgeSlot, { children: badge })
  ] });
};

// src/ui/components/Navigation/Sidebar/SidebarFooter.tsx
var import_styled_components101 = require("styled-components");
var SidebarFooter = import_styled_components101.styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[3]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surface};
  box-sizing: border-box;
  gap: ${({ theme }) => theme.spacing[2]};
`;

// src/ui/components/Navigation/Sidebar/SidebarToggle.tsx
var import_icons17 = require("core-react/icons");
var import_react45 = require("react");
var import_styled_components102 = require("styled-components");
var import_jsx_runtime59 = require("react/jsx-runtime");
var ToggleButton2 = import_styled_components102.styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[2]};
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.base};
  color: ${({ theme }) => theme.colors.text.body};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.surfaceHover};
    color: ${({ theme }) => theme.colors.text.heading};
  }

  ${({ $breakpoint, theme }) => $breakpoint && import_styled_components102.css`
      @media (max-width: ${theme.breakpoints[$breakpoint]}) {
        display: inline-flex;
      }
    `}
`;
var SidebarToggle = ({ children, ...props }) => {
  const { isOpen, toggle, breakpoint } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
    ToggleButton2,
    {
      type: "button",
      $breakpoint: breakpoint,
      onClick: toggle,
      "aria-expanded": isOpen,
      "aria-label": "Basculer la barre lat\xE9rale",
      ...props,
      children: children ?? /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_icons17.Icon, { name: isOpen ? "close" : "menu", size: 25 })
    }
  );
};

// src/ui/components/Navigation/Tabs/TabContent.tsx
var import_styled_components103 = require("styled-components");

// src/ui/components/Navigation/Tabs/TabsContext.tsx
var import_react46 = require("react");
var TabsContext = (0, import_react46.createContext)(null);
var useTabs = () => {
  const context = (0, import_react46.useContext)(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a <Tabs>");
  }
  return context;
};

// src/ui/components/Navigation/Tabs/TabContent.tsx
var import_jsx_runtime60 = require("react/jsx-runtime");
var ContentWrapper3 = import_styled_components103.styled.div`
  padding-top: ${({ theme }) => theme.spacing[4]};
`;
var TabContent = ({ value, children, ...rest }) => {
  const { activeTab } = useTabs();
  if (activeTab !== value) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ContentWrapper3, { role: "tabpanel", ...rest, children });
};

// src/ui/components/Navigation/Tabs/TabList.tsx
var import_styled_components104 = require("styled-components");
var TabList = import_styled_components104.styled.div.attrs({
  role: "tablist"
})`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// src/ui/components/Navigation/Tabs/Tabs.tsx
var import_react47 = require("react");
var import_styled_components105 = require("styled-components");
var import_jsx_runtime61 = require("react/jsx-runtime");
var TabsRoot = import_styled_components105.styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  min-width: 0;
`;
var Tabs = ({ defaultValue = "", value, onValueChange, children, ...rest }) => {
  const [internalValue, setInternalValue] = (0, import_react47.useState)(defaultValue);
  const activeTab = value !== void 0 ? value : internalValue;
  const setActiveTab = (nextValue) => {
    if (value === void 0) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(TabsContext.Provider, { value: { activeTab, setActiveTab }, children: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(TabsRoot, { ...rest, children }) });
};

// src/ui/components/Navigation/Tabs/TabTrigger.tsx
var import_styled_components106 = require("styled-components");
var import_jsx_runtime62 = require("react/jsx-runtime");
var TriggerButton2 = import_styled_components106.styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1.5]};
  padding: ${({ theme }) => `${theme.spacing[2.5]} ${theme.spacing[3.5]}`};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ $active, theme }) => $active ? theme.typography.weights.semibold : theme.typography.weights.medium};
  color: ${({ $active, theme }) => $active ? theme.colors.primary.base : theme.colors.text.muted};
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.heading};
  }

  ${({ $active, theme }) => $active && import_styled_components106.css`
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${theme.colors.primary.base};
        border-radius: ${theme.radii.pill};
      }
    `}
`;
var TabTrigger = ({ value, disabled = false, children, ...rest }) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
    TriggerButton2,
    {
      type: "button",
      role: "tab",
      "aria-selected": isActive,
      $active: isActive,
      disabled,
      onClick: () => setActiveTab(value),
      ...rest,
      children
    }
  );
};

// src/ui/components/Navigation/ThemeModeSwitcher.tsx
var import_theme = require("core-react/theme");
var import_react48 = require("react");
var import_jsx_runtime63 = require("react/jsx-runtime");
var ICON_ONLY_OPTIONS = [
  { value: "system", icon: "laptop", title: "Syst\xE8me (suit le r\xE9glage de votre appareil)" },
  { value: "light", icon: "white-balance-sunny", title: "Th\xE8me clair" },
  { value: "dark", icon: "weather-night", title: "Th\xE8me sombre" }
];
var ThemeModeSwitcher = ({ ...props }) => {
  const { preference, setPreference } = (0, import_theme.useTheme)();
  return /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
    SegmentedControl,
    {
      "aria-label": "Mode d'affichage",
      options: ICON_ONLY_OPTIONS,
      value: preference,
      onChange: setPreference,
      ...props
    }
  );
};

// src/ui/components/Typo/Display.tsx
var import_styled_components107 = require("styled-components");
var displaySizes = {
  1: "5rem",
  2: "4.5rem",
  3: "4rem",
  4: "3.5rem",
  5: "3rem",
  6: "2.5rem"
};
var Display = import_styled_components107.styled.h1.attrs((props) => ({
  as: props.as || "h1"
}))`
  font-family: ${({ theme }) => theme.typography.fonts.sans};
  font-weight: 300;
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  text-align: ${({ $align }) => $align || "inherit"};
  font-size: ${({ $level = 1 }) => displaySizes[$level]};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  letter-spacing: -0.02em;

  color: ${({ $color, theme }) => {
  switch ($color) {
    case "primary":
      return theme.colors.primary.base;
    case "secondary":
      return theme.colors.secondary.base;
    case "tertiary":
      return theme.colors.tertiary.base;
    case "success":
      return theme.colors.success.base;
    case "warning":
      return theme.colors.warning.base;
    case "info":
      return theme.colors.info.base;
    case "danger":
      return theme.colors.danger.base;
    case "muted":
      return theme.colors.text.muted;
    default:
      return theme.colors.text.heading;
  }
}};
`;

// src/ui/components/Typo/Lead.tsx
var import_styled_components108 = require("styled-components");
var Lead = import_styled_components108.styled.p.attrs((props) => ({
  as: props.as || "p"
}))`
  font-size: 1.25rem;
  font-weight: 300;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  text-align: ${({ $align }) => $align || "inherit"};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  color: ${({ $color, theme }) => {
  switch ($color) {
    case "primary":
      return theme.colors.primary.base;
    case "secondary":
      return theme.colors.secondary.base;
    case "tertiary":
      return theme.colors.tertiary.base;
    case "success":
      return theme.colors.success.base;
    case "warning":
      return theme.colors.warning.base;
    case "info":
      return theme.colors.info.base;
    case "danger":
      return theme.colors.danger.base;
    case "muted":
      return theme.colors.text.muted;
    default:
      return theme.colors.text.muted;
  }
}};
`;

// src/ui/components/Typo/Text.tsx
var import_styled_components109 = require("styled-components");
var weightMap = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};
var Text = import_styled_components109.styled.span.attrs((props) => ({
  as: props.as || "span"
}))`
  text-align: ${({ $align }) => $align || "inherit"};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  font-weight: ${({ $weight = "normal" }) => weightMap[$weight]};

  font-size: ${({ $size = "base", theme }) => {
  if ($size in theme.typography.sizes) {
    return theme.typography.sizes[$size];
  }
  return $size;
}};

  ${({ as, theme }) => as === "pre" && import_styled_components109.css`
      font-family: ${theme.typography.fonts.mono};
      margin: 0;
    `}

  color: ${({ $color, as, theme }) => {
  if ($color) {
    switch ($color) {
      case "primary":
        return theme.colors.primary.base;
      case "secondary":
        return theme.colors.secondary.base;
      case "tertiary":
        return theme.colors.tertiary.base;
      case "success":
        return theme.colors.success.base;
      case "warning":
        return theme.colors.warning.base;
      case "info":
        return theme.colors.info.base;
      case "danger":
        return theme.colors.danger.base;
      case "muted":
        return theme.colors.text.muted;
    }
  }
  return as === "p" ? theme.colors.text.muted : theme.colors.text.body;
}};
`;

// src/ui/components/Typo/Title.tsx
var import_styled_components110 = require("styled-components");
var titleSizes = {
  h1: "2.25rem",
  h2: "1.875rem",
  h3: "1.5rem",
  h4: "1.25rem",
  h5: "1.125rem",
  h6: "1rem"
};
var Title3 = import_styled_components110.styled.h1.attrs((props) => ({
  as: props.as || "h3"
}))`
  font-family: ${({ theme }) => theme.typography.fonts.sans};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  text-align: ${({ $align }) => $align || "inherit"};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  font-size: ${({ as = "h3" }) => titleSizes[as]};

  color: ${({ $color, theme }) => {
  switch ($color) {
    case "primary":
      return theme.colors.primary.base;
    case "secondary":
      return theme.colors.secondary.base;
    case "tertiary":
      return theme.colors.tertiary.base;
    case "success":
      return theme.colors.success.base;
    case "warning":
      return theme.colors.warning.base;
    case "info":
      return theme.colors.info.base;
    case "danger":
      return theme.colors.danger.base;
    case "muted":
      return theme.colors.text.muted;
    default:
      return theme.colors.text.heading;
  }
}};
`;

// src/ui/GlobalStyle.tsx
var import_styled_components111 = require("styled-components");
var GlobalStyle = import_styled_components111.createGlobalStyle`
  ${({ $cssVariables = "" }) => $cssVariables}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.fonts.sans};
    font-size: ${({ theme }) => theme.typography.sizes.base};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    color: ${({ theme }) => theme.colors.text.body};
    background-color: ${({ theme }) => theme.colors.background.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.heading};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  }

  p {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }

  button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    margin: 0;
  }

  :focus-visible {
    outline: ${({ theme }) => `${theme.borders.focusRing.width} solid ${theme.borders.focusRing.color}`};
    outline-offset: ${({ theme }) => theme.borders.focusRing.offset};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// src/ui/index.ts
var import_core_react11 = require("core-react");
var import_icons18 = require("core-react/icons");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionContent,
  AccordionContext,
  AccordionItem,
  AccordionItemContext,
  AccordionProvider,
  AccordionTrigger,
  Alert,
  Avatar,
  BackButton,
  Badge,
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbItem,
  Button,
  ButtonBase,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselIndicator,
  CarouselItem,
  CarouselSlide,
  CheckField,
  Checkbox,
  ChoiceField,
  Col,
  Columns,
  ConfirmDialog,
  Container,
  DS_ICONS,
  DS_ICON_ALIASES,
  Dialog,
  Display,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Dropdown,
  DropdownContext,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  EmptyState,
  Figure,
  FigureCaption,
  FileDropzone,
  Flex,
  Gallery,
  GalleryItem,
  GenericDropdownContext,
  GlobalStyle,
  Grid,
  HelperText,
  Icon,
  IconButton,
  Image,
  Input,
  InputAddon,
  InputGroup,
  Label,
  Lead,
  Link,
  ListGroup,
  ListGroupItem,
  Loading,
  MarkdownContent,
  MarkdownEditor,
  MarkdownViewer,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRoot,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarContext,
  NavbarDropdown,
  NavbarDropdownDivider,
  NavbarDropdownHeader,
  NavbarDropdownItem,
  NavbarDropdownMenu,
  NavbarDropdownToggle,
  NavbarItem,
  NavbarLink,
  NavbarLinkBase,
  NavbarNav,
  NavbarToggle,
  OUTLINE_COMPAT_ALIASES,
  Pagination,
  Progress,
  Prose,
  Radio,
  Row,
  SegmentedControl,
  Select,
  Sidebar,
  SidebarContext,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLink,
  SidebarNav,
  SidebarProvider,
  SidebarSection,
  SidebarToggle,
  Skeleton,
  StatCard,
  TRow,
  TabContent,
  TabList,
  TabTrigger,
  Table,
  Tabs,
  TabsContext,
  TagInput,
  Tbody,
  Td,
  Text,
  TextField,
  Textarea,
  TextareaField,
  Tfoot,
  Th,
  Thead,
  ThemeModeSwitcher,
  Title,
  Toast,
  ToastContainer,
  Toggle,
  ToggleField,
  Tooltip,
  UIProvider,
  Video,
  iconNames,
  parseMarkdown,
  renderMarkdownTokens,
  useAccordion,
  useAccordionItem,
  useDropdown,
  useGenericDropdown,
  useLinkProps,
  useMarkdown,
  useNavbar,
  useSidebar,
  useTabs,
  useToast,
  useToastStore,
  useUI
});
//# sourceMappingURL=index.cjs.map