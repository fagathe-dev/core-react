'use client';

// src/ui/components/Base/Avatar.tsx
import { useState } from "react";
import { styled } from "styled-components";
import { useUI } from "core-react";
import { jsx } from "react/jsx-runtime";
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
var AvatarContainer = styled.div`
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
var AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var Avatar = ({ src, alt = "", name, size = "base", ...rest }) => {
  const [hasError, setHasError] = useState(false);
  const { imageComponent } = useUI();
  return /* @__PURE__ */ jsx(AvatarContainer, { $size: size, ...rest, children: src && !hasError ? /* @__PURE__ */ jsx(
    AvatarImage,
    {
      as: imageComponent,
      src,
      alt: alt || name || "Avatar",
      width: avatarSizes[size],
      height: avatarSizes[size],
      onError: () => setHasError(true)
    }
  ) : /* @__PURE__ */ jsx("span", { children: getInitials(name) }) });
};

// src/ui/components/Base/Badge.tsx
import { styled as styled2, css } from "styled-components";
var Badge = styled2.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => `2px ${theme.spacing[2]}`};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  line-height: 1.2;
  border-radius: ${({ $pill, theme }) => $pill === true ? theme.radii.pill : theme.radii.sm};
  white-space: nowrap;

  ${({ $color }) => $color && css`
      background-color: ${$color}20;
      color: ${$color};
      border: 1px solid ${$color}40;
    `}

  ${({ $color, $variant = "neutral", theme }) => {
  if ($color) return "";
  switch ($variant) {
    case "primary":
      return css`
          background-color: ${theme.colors.primary.subtle};
          color: ${theme.colors.primary.dark};
        `;
    case "secondary":
      return css`
          background-color: ${theme.colors.secondary.subtle};
          color: ${theme.colors.secondary.dark};
        `;
    case "danger":
      return css`
          background-color: ${theme.colors.danger.subtle};
          color: ${theme.colors.danger.dark};
        `;
    case "success":
      return css`
          background-color: ${theme.colors.success.subtle};
          color: ${theme.colors.success.dark};
        `;
    case "warning":
      return css`
          background-color: ${theme.colors.warning.subtle};
          color: ${theme.colors.warning.dark};
        `;
    case "info":
      return css`
          background-color: ${theme.colors.info.subtle};
          color: ${theme.colors.info.dark};
        `;
    case "neutral":
    default:
      return css`
          background-color: ${theme.colors.background.surfaceActive};
          color: ${theme.colors.text.muted};
        `;
  }
}}
`;

// src/ui/components/Base/Button.tsx
import { styled as styled3, css as css2 } from "styled-components";
import { useLinkProps } from "core-react";
import { jsx as jsx2 } from "react/jsx-runtime";
var sizeStyles = {
  sm: css2`
    padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  `,
  base: css2`
    padding: ${({ theme }) => `${theme.spacing[1.5]} ${theme.spacing[3.5]}`};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  `,
  lg: css2`
    padding: ${({ theme }) => `${theme.spacing[2.5]} ${theme.spacing[5]}`};
    font-size: ${({ theme }) => theme.typography.sizes.base};
  `
};
var ButtonBase = styled3.button.attrs((props) => ({
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
      return css2`
          background-color: ${theme.colors.secondary.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary.hover};
          }
        `;
    case "tertiary":
      return css2`
          background-color: ${theme.colors.tertiary.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.tertiary.hover};
          }
        `;
    case "danger":
      return css2`
          background-color: ${theme.colors.danger.base};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.danger.hover};
          }
        `;
    case "outline":
      return css2`
          background-color: transparent;
          border-color: ${theme.colors.border.default};
          color: ${theme.colors.text.body};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.surfaceHover};
            border-color: ${theme.colors.border.hover};
          }
        `;
    case "ghost":
      return css2`
          background-color: transparent;
          color: ${theme.colors.text.body};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.surfaceHover};
          }
        `;
    case "primary":
    default:
      return css2`
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

  ${({ $loading }) => $loading && css2`
      pointer-events: none;
      opacity: 0.7;
    `}
`;
var Button = ({ href, as, ...props }) => /* @__PURE__ */ jsx2(ButtonBase, { ...props, ...useLinkProps(href, as) });

// src/ui/components/Base/Divider.tsx
import { styled as styled4, css as css3 } from "styled-components";
var Divider = styled4.hr`
  border: none;
  background-color: ${({ theme }) => theme.colors.border.default};
  margin: 0;
  flex-shrink: 0;

  ${({ $orientation = "horizontal", $margin, theme }) => $orientation === "horizontal" ? css3`
          width: 100%;
          height: 1px;
          margin: ${$margin || `${theme.spacing[2]} 0`};
        ` : css3`
          width: 1px;
          height: 100%;
          min-height: 1rem;
          margin: ${$margin || `0 ${theme.spacing[2]}`};
        `}
`;

// src/ui/components/Base/IconButton.tsx
import { styled as styled5 } from "styled-components";
import { useLinkProps as useLinkProps2 } from "core-react";
import { Icon } from "core-react/icons";
import { jsx as jsx3 } from "react/jsx-runtime";
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
var StyledIconButton = styled5(ButtonBase)`
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
  return /* @__PURE__ */ jsx3(
    StyledIconButton,
    {
      type: "button",
      $size: size,
      $variant: variant,
      $round: round,
      ...rest,
      ...useLinkProps2(rest.href, rest.as),
      children: /* @__PURE__ */ jsx3(Icon, { name, size: iconSizes[size] })
    }
  );
};

// src/ui/components/Base/Link.tsx
import "react";
import { styled as styled6, css as css4 } from "styled-components";
import { useLinkProps as useLinkProps3, useUI as useUI2 } from "core-react";
import { jsx as jsx4 } from "react/jsx-runtime";
var linkStyles = css4`
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
var StyledAnchor = styled6.a`
  ${linkStyles}
`;
var StyledNonAnchor = styled6.span`
  ${linkStyles}
`;
var Link = ({ as = "a", href, onClick, children, ...rest }) => {
  const linkProps = useLinkProps3(href);
  const { navigation } = useUI2();
  if (as === "a") {
    return /* @__PURE__ */ jsx4(StyledAnchor, { ...linkProps, onClick, ...rest, children });
  }
  const handleClick = (e) => {
    onClick?.(e);
    if (href && !e.defaultPrevented) navigation.push(href);
  };
  return /* @__PURE__ */ jsx4(StyledNonAnchor, { as, onClick: handleClick, ...rest, children });
};

// src/ui/components/Base/SegmentedControl.tsx
import { Icon as Icon2 } from "core-react/icons";
import { useRef } from "react";
import { styled as styled7, css as css5 } from "styled-components";
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
var SIZES = {
  sm: { block: 1.5, inline: 3, font: "xs", icon: 15 },
  md: { block: 2, inline: 3.5, font: "sm", icon: 17 }
};
var Group = styled7.div`
  display: ${({ $fullWidth }) => $fullWidth ? "flex" : "inline-flex"};
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => theme.spacing[1]};
  max-width: 100%;
  border: ${({ theme }) => theme.borders.widths.thin} solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg ?? theme.radii.base};
  background-color: ${({ theme }) => theme.colors.background.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  ${({ $fullWidth }) => $fullWidth && css5`
      width: 100%;

      & > button {
        flex: 1 1 0;
      }
    `}
`;
var Segment = styled7.button`
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
  const buttonsRef = useRef([]);
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
  return /* @__PURE__ */ jsx5(Group, { role: "radiogroup", "aria-label": ariaLabel, $fullWidth: fullWidth, onKeyDown: handleKeyDown, children: options.map((option, index) => {
    const selected = index === selectedIndex;
    return /* @__PURE__ */ jsxs(
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
          option.icon ? /* @__PURE__ */ jsx5(Icon2, { name: option.icon, size: iconSize }) : selected && showCheck && /* @__PURE__ */ jsx5(Icon2, { name: "check", size: iconSize }),
          option.label && /* @__PURE__ */ jsx5("span", { children: option.label })
        ]
      },
      option.value
    );
  }) });
};

// src/ui/components/Content/Accordion/Accordion.tsx
import { styled as styled11 } from "styled-components";

// src/ui/components/Content/Accordion/AccordionContent.tsx
import { styled as styled8 } from "styled-components";

// src/ui/components/Content/Accordion/AccordionItemContext.tsx
import { createContext, useContext } from "react";
var AccordionItemContext = createContext(null);
var useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("useAccordionItem must be used within an <AccordionItem>");
  }
  return context;
};

// src/ui/components/Content/Accordion/AccordionContent.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var ContentWrapper = styled8.div`
  display: ${({ $isOpen }) => $isOpen ? "block" : "none"};
  padding-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.body};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
var AccordionContent = ({ children, ...rest }) => {
  const { isOpen } = useAccordionItem();
  return /* @__PURE__ */ jsx6(ContentWrapper, { $isOpen: isOpen, ...rest, children });
};

// src/ui/components/Content/Accordion/AccordionContext.tsx
import { createContext as createContext2, useContext as useContext2, useState as useState2 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var AccordionContext = createContext2(null);
var useAccordion = () => {
  const context = useContext2(AccordionContext);
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
  const [activeKeys, setActiveKeys] = useState2(defaultActiveKeys);
  const toggleKey = (key) => {
    setActiveKeys((prev) => {
      const isOpen = prev.includes(key);
      if (multiple) {
        return isOpen ? prev.filter((k) => k !== key) : [...prev, key];
      }
      return isOpen ? [] : [key];
    });
  };
  return /* @__PURE__ */ jsx7(AccordionContext.Provider, { value: { activeKeys, toggleKey }, children });
};

// src/ui/components/Content/Accordion/AccordionItem.tsx
import { useId } from "react";
import { styled as styled9 } from "styled-components";
import { jsx as jsx8 } from "react/jsx-runtime";
var ItemWrapper = styled9.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;
var AccordionItem = ({ itemKey, children, ...rest }) => {
  const autoKey = useId();
  const key = itemKey || autoKey;
  const { activeKeys, toggleKey } = useAccordion();
  const isOpen = activeKeys.includes(key);
  const itemContextValue = {
    itemKey: key,
    isOpen,
    toggle: () => toggleKey(key)
  };
  return /* @__PURE__ */ jsx8(AccordionItemContext.Provider, { value: itemContextValue, children: /* @__PURE__ */ jsx8(ItemWrapper, { ...rest, children }) });
};

// src/ui/components/Content/Accordion/AccordionTrigger.tsx
import { Icon as Icon3 } from "core-react/icons";
import { styled as styled10 } from "styled-components";
import { jsx as jsx9, jsxs as jsxs2 } from "react/jsx-runtime";
var StyledTriggerButton = styled10.button`
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
  return /* @__PURE__ */ jsxs2(StyledTriggerButton, { type: "button", $isOpen: isOpen, onClick: toggle, "aria-expanded": isOpen, ...rest, children: [
    /* @__PURE__ */ jsx9("span", { children }),
    /* @__PURE__ */ jsx9(Icon3, { name: "chevron-down", size: 18 })
  ] });
};

// src/ui/components/Content/Accordion/Accordion.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var Container = styled11.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
`;
var BaseAccordion = ({ children, multiple, defaultActiveKeys, ...rest }) => {
  return /* @__PURE__ */ jsx10(AccordionProvider, { multiple, defaultActiveKeys, children: /* @__PURE__ */ jsx10(Container, { ...rest, children }) });
};
var Accordion = Object.assign(BaseAccordion, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent
});

// src/ui/components/Content/Card/Card.tsx
import { styled as styled16 } from "styled-components";

// src/ui/components/Content/Card/CardHeader.tsx
import { styled as styled12 } from "styled-components";
var CardHeader = styled12.header`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// src/ui/components/Content/Card/CardBody.tsx
import { styled as styled13 } from "styled-components";
var CardBody = styled13.div`
  padding: ${({ theme }) => theme.spacing[4]};
  flex: 1 1 auto;
`;

// src/ui/components/Content/Card/CardFooter.tsx
import { styled as styled14 } from "styled-components";
var CardFooter = styled14.footer`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`;

// src/ui/components/Content/Card/CardTitle.tsx
import { styled as styled15 } from "styled-components";
var CardTitle = styled15.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
`;

// src/ui/components/Content/Card/Card.tsx
var StyledCard = styled16.div`
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
import { Icon as Icon4 } from "core-react/icons";
import "react";
import { styled as styled17 } from "styled-components";
import { jsx as jsx11, jsxs as jsxs3 } from "react/jsx-runtime";
var Container2 = styled17.div`
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
var IconCircle = styled17.div`
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
var Heading = styled17.h4`
  margin: 0 0 ${({ theme }) => theme.spacing[1.5]} 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
`;
var Description = styled17.p`
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
  return /* @__PURE__ */ jsxs3(Container2, { ...rest, children: [
    icon && /* @__PURE__ */ jsx11(IconCircle, { children: /* @__PURE__ */ jsx11(Icon4, { name: icon, size: 28 }) }),
    /* @__PURE__ */ jsx11(Heading, { children: title }),
    description && /* @__PURE__ */ jsx11(Description, { children: description }),
    action && /* @__PURE__ */ jsx11("div", { children: action }),
    children
  ] });
};

// src/ui/components/Content/ListGroup/ListGroup.tsx
import { styled as styled19, css as css7 } from "styled-components";

// src/ui/components/Content/ListGroup/ListGroupItem.tsx
import { styled as styled18, css as css6 } from "styled-components";
var ListGroupItem = styled18.li.attrs((props) => ({
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

  ${({ $action, onClick, theme }) => ($action || onClick) && css6`
      &:hover:not(:disabled) {
        background-color: ${theme.colors.background.surfaceHover};
      }
    `}

  ${({ $active, theme }) => $active && css6`
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
var StyledListGroup = styled19.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin: 0;
  list-style: none;
  border-radius: ${({ $flush, theme }) => $flush ? "0" : theme.radii.base};

  ${({ $flush }) => $flush && css7`
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
import { highlightExtension } from "core-ts";
import { Marked } from "marked";
import { Fragment, useMemo } from "react";
import { styled as styled20 } from "styled-components";
import { jsx as jsx12, jsxs as jsxs4 } from "react/jsx-runtime";
var parsers = /* @__PURE__ */ new Map();
var getParser = (breaks) => {
  let parser = parsers.get(breaks);
  if (!parser) {
    parser = new Marked({ gfm: true, breaks }, highlightExtension);
    parsers.set(breaks, parser);
  }
  return parser;
};
var parseMarkdown = (source, { breaks = false } = {}) => getParser(breaks).lexer(source);
var EXTERNAL_URL = /^(https?:|mailto:)/i;
var isSafeUrl = (url) => EXTERNAL_URL.test(url) || /^(\/(?!\/)|#|\.{0,2}\/)/.test(url);
var Prose = styled20.div`
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
    return /* @__PURE__ */ jsxs4("li", { children: [
      item.task && !hasCheckbox && /* @__PURE__ */ jsx12("input", { type: "checkbox", checked: item.checked === true, disabled: true, readOnly: true }),
      renderMarkdownTokens(item.tokens, options)
    ] }, key);
  };
  return tokens.map((token, key) => {
    switch (token.type) {
      case "space":
      case "def":
        return null;
      case "paragraph":
        return /* @__PURE__ */ jsx12("p", { children: children(token.tokens, token.text) }, key);
      case "heading": {
        const heading = token;
        const Heading2 = `h${Math.min(heading.depth + options.headingOffset, 6)}`;
        return /* @__PURE__ */ jsx12(Heading2, { children: children(heading.tokens, heading.text) }, key);
      }
      case "text": {
        const text = token;
        return /* @__PURE__ */ jsx12(Fragment, { children: children(text.tokens, text.text) }, key);
      }
      case "strong":
        return /* @__PURE__ */ jsx12("strong", { children: children(token.tokens) }, key);
      case "em":
        return /* @__PURE__ */ jsx12("em", { children: children(token.tokens) }, key);
      case "del":
        return /* @__PURE__ */ jsx12("del", { children: children(token.tokens) }, key);
      case "highlight":
        return /* @__PURE__ */ jsx12("mark", { children: children(token.tokens) }, key);
      case "codespan":
        return /* @__PURE__ */ jsx12("code", { children: token.text }, key);
      case "code": {
        const code = token;
        const lang = code.lang && /^[a-z0-9+#-]+$/i.test(code.lang) ? code.lang : void 0;
        return /* @__PURE__ */ jsx12("pre", { children: /* @__PURE__ */ jsx12("code", { className: lang ? `language-${lang}` : void 0, children: code.text }) }, key);
      }
      case "br":
        return /* @__PURE__ */ jsx12("br", {}, key);
      case "hr":
        return /* @__PURE__ */ jsx12("hr", {}, key);
      case "blockquote":
        return /* @__PURE__ */ jsx12("blockquote", { children: children(token.tokens) }, key);
      case "list": {
        const list = token;
        const List2 = list.ordered ? "ol" : "ul";
        return /* @__PURE__ */ jsx12(List2, { start: list.ordered && list.start !== 1 ? Number(list.start) : void 0, children: list.items.map(renderListItem) }, key);
      }
      case "checkbox":
        return /* @__PURE__ */ jsx12(
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
        if (!isSafeUrl(link.href)) return /* @__PURE__ */ jsx12(Fragment, { children: children(link.tokens, link.text) }, key);
        const external = EXTERNAL_URL.test(link.href);
        return /* @__PURE__ */ jsx12(
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
          return /* @__PURE__ */ jsx12(Fragment, { children: image.text }, key);
        return /* @__PURE__ */ jsx12("img", { src: image.href, alt: image.text, title: image.title ?? void 0, loading: "lazy" }, key);
      }
      case "table": {
        const table = token;
        return /* @__PURE__ */ jsxs4("table", { children: [
          /* @__PURE__ */ jsx12("thead", { children: /* @__PURE__ */ jsx12("tr", { children: table.header.map((cell, index) => /* @__PURE__ */ jsx12("th", { style: cell.align ? { textAlign: cell.align } : void 0, children: renderMarkdownTokens(cell.tokens, options) }, index)) }) }),
          /* @__PURE__ */ jsx12("tbody", { children: table.rows.map((row, rowIndex) => /* @__PURE__ */ jsx12("tr", { children: row.map((cell, index) => /* @__PURE__ */ jsx12("td", { style: cell.align ? { textAlign: cell.align } : void 0, children: renderMarkdownTokens(cell.tokens, options) }, index)) }, rowIndex)) })
        ] }, key);
      }
      // HTML brut et jetons inconnus : affichés comme du texte, jamais interprétés
      default:
        return /* @__PURE__ */ jsx12(Fragment, { children: "text" in token && typeof token.text === "string" ? token.text : token.raw }, key);
    }
  });
};
var useMarkdown = (source, { allowImages = false, headingOffset = 0, breaks = false, linkTarget = "_blank" } = {}) => useMemo(
  () => renderMarkdownTokens(parseMarkdown(source, { breaks }), { allowImages, headingOffset, linkTarget }),
  [source, allowImages, headingOffset, breaks, linkTarget]
);
var MarkdownViewer = ({ children, className, ...options }) => /* @__PURE__ */ jsx12(Prose, { className, children: useMarkdown(children, options) });
var MarkdownContent = ({ headingOffset = 2, breaks = true, ...props }) => /* @__PURE__ */ jsx12(MarkdownViewer, { headingOffset, breaks, ...props });

// src/ui/components/Content/StatCard/StatCard.tsx
import { Icon as Icon5 } from "core-react/icons";
import { styled as styled21 } from "styled-components";
import { jsx as jsx13, jsxs as jsxs5 } from "react/jsx-runtime";
var TopRow = styled21.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;
var LabelText = styled21.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.muted};
`;
var IconBox = styled21.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  color: ${({ theme }) => theme.colors.primary.base};
`;
var BottomRow = styled21.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
`;
var ValueNumber = styled21.strong`
  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.heading};
  line-height: 1.1;
`;
var StatCard = ({ label, value, icon, trend, trendVariant = "success", ...rest }) => {
  return /* @__PURE__ */ jsx13(Card, { $bordered: true, $elevation: "sm", ...rest, children: /* @__PURE__ */ jsxs5(Card.Body, { children: [
    /* @__PURE__ */ jsxs5(TopRow, { children: [
      /* @__PURE__ */ jsx13(LabelText, { children: label }),
      /* @__PURE__ */ jsx13(IconBox, { children: /* @__PURE__ */ jsx13(Icon5, { name: icon, size: 20 }) })
    ] }),
    /* @__PURE__ */ jsxs5(BottomRow, { children: [
      /* @__PURE__ */ jsx13(ValueNumber, { children: value }),
      trend && /* @__PURE__ */ jsx13(Badge, { $variant: trendVariant, $pill: true, children: trend })
    ] })
  ] }) });
};

// src/ui/components/Content/Table/Table.tsx
import { styled as styled22, css as css8 } from "styled-components";
var Table = styled22.table`
  width: 100%;
  caption-side: bottom;
  border-collapse: collapse;
  vertical-align: middle;
  font-size: ${({ $dense, theme }) => $dense ? theme.typography.sizes.sm : theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.body};
  background-color: ${({ theme }) => theme.colors.background.surface};

  ${({ $bordered, theme }) => $bordered && css8`
      border: 1px solid ${theme.colors.border.default};
    `}

  ${({ $striped, theme }) => $striped && css8`
      & > tbody > tr:nth-of-type(odd) {
        background-color: ${theme.colors.background.surfaceHover};
      }
    `}

  ${({ $hoverable, theme }) => $hoverable && css8`
      & > tbody > tr:hover {
        background-color: ${theme.colors.background.surfaceActive};
      }
    `}
`;

// src/ui/components/Content/Table/TBody.tsx
import { styled as styled23 } from "styled-components";
var Tbody = styled23.tbody`
  & > tr:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  }
`;

// src/ui/components/Content/Table/Td.tsx
import { styled as styled24, css as css9 } from "styled-components";
var cellShared = css9`
  padding: ${({ theme }) => `${theme.spacing[2.5]} ${theme.spacing[3]}`};
  text-align: ${({ $align = "left" }) => $align};
  ${({ $width }) => $width && `width: ${typeof $width === "number" ? `${$width}px` : $width};`}
`;
var Td = styled24.td`
  ${cellShared}
`;

// src/ui/components/Content/Table/TFoot.tsx
import { styled as styled25 } from "styled-components";
var Tfoot = styled25.tfoot`
  border-top: 2px solid ${({ theme }) => theme.colors.border.default};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

// src/ui/components/Content/Table/Th.tsx
import { styled as styled26, css as css10 } from "styled-components";
var cellShared2 = css10`
  padding: ${({ theme }) => `${theme.spacing[2.5]} ${theme.spacing[3]}`};
  text-align: ${({ $align = "left" }) => $align};
  ${({ $width }) => $width && `width: ${typeof $width === "number" ? `${$width}px` : $width};`}
`;
var Th = styled26.th`
  ${cellShared2}
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// src/ui/components/Content/Table/Thead.tsx
import { styled as styled27 } from "styled-components";
var Thead = styled27.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
`;

// src/ui/components/Content/Table/TRow.tsx
import { styled as styled28, css as css11 } from "styled-components";
var TRow = styled28.tr`
  transition: background-color 0.15s ease;

  ${({ $selected, theme }) => $selected && css11`
      background-color: ${theme.colors.primary.subtle} !important;
    `}
`;

// src/ui/components/Embed/Image.tsx
import { styled as styled29, css as css12 } from "styled-components";
var Image = styled29.img.attrs((props) => ({
  loading: props.loading || "lazy"
}))`
  display: block;
  max-width: ${({ $fluid = true }) => $fluid ? "100%" : "none"};
  height: ${({ $fluid = true, height }) => $fluid && !height ? "auto" : void 0};

  ${({ $fit }) => $fit && css12`
      object-fit: ${$fit};
    `}

  ${({ $aspectRatio }) => $aspectRatio && css12`
      aspect-ratio: ${$aspectRatio};
    `}

  ${({ $radius, theme }) => $radius && css12`
      border-radius: ${theme.radii[$radius]};
    `}

  ${({ $thumbnail, theme }) => $thumbnail && css12`
      padding: ${theme.spacing[1]};
      background-color: ${theme.colors.background.surface};
      border: 1px solid ${theme.colors.border.default};
      border-radius: ${theme.radii.base};
      box-shadow: ${theme.shadows.sm};
    `}
`;

// src/ui/components/Embed/Figure.tsx
import "react";
import { styled as styled30 } from "styled-components";
import { jsx as jsx14, jsxs as jsxs6 } from "react/jsx-runtime";
var FigureCaption = styled30.figcaption`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  text-align: ${({ $align = "start" }) => $align};
  margin-top: ${({ $position = "bottom", theme }) => $position === "bottom" ? theme.spacing[2] : "0"};
  margin-bottom: ${({ $position = "bottom", theme }) => $position === "top" ? theme.spacing[2] : "0"};
`;
var StyledFigure = styled30.figure`
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
  return /* @__PURE__ */ jsxs6(StyledFigure, { ...rest, children: [
    caption && captionPosition === "top" && /* @__PURE__ */ jsx14(FigureCaption, { $align: captionAlign, $position: "top", children: caption }),
    children,
    caption && captionPosition === "bottom" && /* @__PURE__ */ jsx14(FigureCaption, { $align: captionAlign, $position: "bottom", children: caption })
  ] });
};
Figure.Caption = FigureCaption;

// src/ui/components/Embed/Video.tsx
import "react";
import { styled as styled31, css as css13 } from "styled-components";
import { Fragment as Fragment2, jsx as jsx15, jsxs as jsxs7 } from "react/jsx-runtime";
var StyledVideo = styled31.video`
  display: block;
  max-width: ${({ $fluid = true }) => $fluid ? "100%" : "none"};
  width: ${({ $fluid = true, width }) => $fluid && !width ? "100%" : void 0};
  height: ${({ $fluid = true, height }) => $fluid && !height ? "auto" : void 0};

  ${({ $fit }) => $fit && css13`
      object-fit: ${$fit};
    `}

  ${({ $aspectRatio }) => $aspectRatio && css13`
      aspect-ratio: ${$aspectRatio};
    `}

  ${({ $radius, theme }) => $radius && css13`
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
  return /* @__PURE__ */ jsxs7(
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
        sources.map((source, index) => /* @__PURE__ */ jsx15("source", { src: source.src, type: source.type }, `${source.src}-${index}`)),
        children,
        /* @__PURE__ */ jsx15("p", { children: fallbackText ?? /* @__PURE__ */ jsxs7(Fragment2, { children: [
          "Votre navigateur ne prend pas en charge les vid\xE9os HTML5. Voici",
          " ",
          downloadLink && /* @__PURE__ */ jsx15("a", { href: downloadLink, download: true, children: "un lien pour t\xE9l\xE9charger la vid\xE9o" }),
          "."
        ] }) })
      ]
    }
  );
};

// src/ui/components/Embed/Carousel/Carousel.tsx
import { Children, useCallback, useEffect, useState as useState3 } from "react";
import { styled as styled35, css as css14 } from "styled-components";

// src/ui/components/Embed/Carousel/CarouselIndicator.tsx
import { styled as styled32 } from "styled-components";
import { jsx as jsx16 } from "react/jsx-runtime";
var IndicatorsContainer = styled32.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${({ theme }) => theme.spacing[1.5]};
  z-index: 2;
`;
var Dot = styled32.button`
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
  return /* @__PURE__ */ jsx16(IndicatorsContainer, { role: "tablist", ...rest, children: Array.from({ length: total }).map((_, idx) => /* @__PURE__ */ jsx16(
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
import { styled as styled33 } from "styled-components";
var CarouselItem = styled33.div`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

// src/ui/components/Embed/Carousel/CarouselSlide.tsx
import { styled as styled34 } from "styled-components";
import { jsx as jsx17 } from "react/jsx-runtime";
var Track = styled34.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  transform: translateX(-${({ $currentIndex }) => $currentIndex * 100}%);
`;
var CarouselSlide = ({ currentIndex, children, ...rest }) => {
  return /* @__PURE__ */ jsx17(Track, { $currentIndex: currentIndex, ...rest, children });
};

// src/ui/components/Embed/Carousel/Carousel.tsx
import { Fragment as Fragment3, jsx as jsx18, jsxs as jsxs8 } from "react/jsx-runtime";
var Viewport = styled35.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};

  ${({ $aspectRatio }) => $aspectRatio && css14`
      aspect-ratio: ${$aspectRatio};
    `}
`;
var NavButton = styled35(IconButton)`
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
  const [currentIndex, setCurrentIndex] = useState3(defaultIndex);
  const [isPaused, setIsPaused] = useState3(false);
  const items = Children.toArray(children);
  const total = items.length;
  const prev = useCallback(() => {
    setCurrentIndex((c) => c > 0 ? c - 1 : total - 1);
  }, [total]);
  const next = useCallback(() => {
    setCurrentIndex((c) => c < total - 1 ? c + 1 : 0);
  }, [total]);
  useEffect(() => {
    if (!autoplay || isPaused || total <= 1 || slideInterval <= 0) return;
    const timer = setInterval(next, slideInterval);
    return () => clearInterval(timer);
  }, [autoplay, isPaused, total, slideInterval, next]);
  if (total === 0) return null;
  return /* @__PURE__ */ jsxs8(
    Viewport,
    {
      $aspectRatio: aspectRatio,
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      ...rest,
      children: [
        /* @__PURE__ */ jsx18(CarouselSlide, { currentIndex, children: items }),
        showArrows && total > 1 && /* @__PURE__ */ jsxs8(Fragment3, { children: [
          /* @__PURE__ */ jsx18(
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
          /* @__PURE__ */ jsx18(
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
        showIndicators && /* @__PURE__ */ jsx18(CarouselIndicator, { total, currentIndex, onSelect: setCurrentIndex })
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
import { styled as styled37 } from "styled-components";

// src/ui/components/Embed/Gallery/GalleryItem.tsx
import { styled as styled36, css as css15 } from "styled-components";
var GalleryItem = styled36.div`
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ $radius = "base", theme }) => theme.radii[$radius]};

  ${({ $hoverZoom }) => $hoverZoom && css15`
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
var StyledGallery = styled37.div.attrs((props) => ({
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
import { Icon as Icon6 } from "core-react/icons";
import { styled as styled38, css as css16 } from "styled-components";
import { jsx as jsx19, jsxs as jsxs9 } from "react/jsx-runtime";
var variantIcons = {
  primary: "information",
  success: "check-circle",
  warning: "alert",
  danger: "alert-circle",
  info: "information"
};
var AlertContainer = styled38.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.base};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};

  ${({ $variant, theme }) => {
  const role = theme.colors[$variant];
  return css16`
      background-color: ${role.subtle};
      border: 1px solid ${role.dark}30;
      color: ${role.emphasis};

      & > i {
        color: ${role.base};
      }
    `;
}}
`;
var ContentWrapper2 = styled38.div`
  flex: 1 1 auto;
  min-width: 0;
`;
var AlertTitle = styled38.strong`
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
  return /* @__PURE__ */ jsxs9(AlertContainer, { $variant: variant, role: "alert", ...rest, children: [
    showIcon && /* @__PURE__ */ jsx19(Icon6, { name: variantIcons[variant], size: 20 }),
    /* @__PURE__ */ jsxs9(ContentWrapper2, { children: [
      title && /* @__PURE__ */ jsx19(AlertTitle, { children: title }),
      /* @__PURE__ */ jsx19("div", { children })
    ] }),
    onClose && /* @__PURE__ */ jsx19(IconButton, { name: "close", size: "sm", variant: "ghost", "aria-label": "Fermer", onClick: onClose })
  ] });
};

// src/ui/components/Feedback/Drawer/Drawer.tsx
import { useEffect as useEffect2 } from "react";
import { createPortal } from "react-dom";
import { styled as styled40, css as css17, keyframes } from "styled-components";

// src/ui/components/Feedback/Drawer/DrawerSubcomponents.tsx
import { styled as styled39 } from "styled-components";
import { jsx as jsx20, jsxs as jsxs10 } from "react/jsx-runtime";
var HeaderBox = styled39.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing[3.5]} ${theme.spacing[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;
var Title = styled39.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
`;
var DrawerHeader = ({ title, onClose, children, ...rest }) => /* @__PURE__ */ jsxs10(HeaderBox, { ...rest, children: [
  title ? /* @__PURE__ */ jsx20(Title, { children: title }) : children,
  onClose && /* @__PURE__ */ jsx20(IconButton, { name: "close", size: "sm", variant: "ghost", "aria-label": "Fermer le panneau", onClick: onClose })
] });
var DrawerBody = styled39.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]};
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.text.body};
`;
var DrawerFooter = styled39.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2.5]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
`;

// src/ui/components/Feedback/Drawer/Drawer.tsx
import { jsx as jsx21 } from "react/jsx-runtime";
var fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
var Backdrop = styled40.div`
  position: fixed;
  inset: 0;
  z-index: 1050;
  background-color: rgba(18, 18, 26, 0.5);
  backdrop-filter: blur(2px);
  animation: ${fadeIn} 0.2s ease-out;
`;
var Panel = styled40.aside`
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

  ${({ $placement }) => css17`
    animation: ${keyframes`
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
  useEffect2(() => {
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
  return createPortal(
    /* @__PURE__ */ jsx21(
      Backdrop,
      {
        onClick: (e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) onClose();
        },
        children: /* @__PURE__ */ jsx21(Panel, { $placement: placement, $width: width, role: "dialog", "aria-modal": "true", ...rest, children })
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
import { styled as styled41, keyframes as keyframes2 } from "styled-components";
import { jsx as jsx22, jsxs as jsxs11 } from "react/jsx-runtime";
var spin = keyframes2`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
var sizeMap = {
  sm: 16,
  base: 24,
  lg: 36
};
var SpinnerSvg = styled41.svg`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  animation: ${spin} 0.8s linear infinite;
  color: ${({ $color, theme }) => $color || theme.colors.primary.base};
`;
var Loading = ({ size = "base", color, label = "Chargement en cours\u2026", ...rest }) => {
  const dimension = sizeMap[size];
  return /* @__PURE__ */ jsxs11(
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
        /* @__PURE__ */ jsx22("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "3", opacity: "0.2" }),
        /* @__PURE__ */ jsx22(
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
import { Icon as Icon7 } from "core-react/icons";
import { styled as styled46, useTheme } from "styled-components";

// src/ui/components/Feedback/Modal/Modal.tsx
import { useEffect as useEffect3 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { styled as styled45, keyframes as keyframes3 } from "styled-components";

// src/ui/components/Feedback/Modal/ModalBody.tsx
import { styled as styled42 } from "styled-components";
var ModalBody = styled42.div`
  padding: ${({ theme }) => theme.spacing[4]};
  overflow-y: auto;
  max-height: calc(85vh - 120px);
  color: ${({ theme }) => theme.colors.text.body};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

// src/ui/components/Feedback/Modal/ModalFooter.tsx
import { styled as styled43 } from "styled-components";
var ModalFooter = styled43.footer`
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
import { styled as styled44 } from "styled-components";
import { jsx as jsx23, jsxs as jsxs12 } from "react/jsx-runtime";
var HeaderWrapper = styled44.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing[3.5]} ${theme.spacing[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;
var Title2 = styled44.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.heading};
`;
var ModalHeader = ({ title, onClose, children, ...rest }) => {
  return /* @__PURE__ */ jsxs12(HeaderWrapper, { ...rest, children: [
    title ? /* @__PURE__ */ jsx23(Title2, { children: title }) : children,
    onClose && /* @__PURE__ */ jsx23(
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
import { jsx as jsx24 } from "react/jsx-runtime";
var fadeIn2 = keyframes3`
  from { opacity: 0; }
  to { opacity: 1; }
`;
var popIn = keyframes3`
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;
var Backdrop2 = styled45.div`
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
var ContentPanel = styled45.div`
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
  useEffect3(() => {
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
  return createPortal2(
    /* @__PURE__ */ jsx24(
      Backdrop2,
      {
        onClick: (e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
          }
        },
        children: /* @__PURE__ */ jsx24(ContentPanel, { $maxWidth: maxWidth, role: "dialog", "aria-modal": "true", ...rest, children })
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
import { jsx as jsx25, jsxs as jsxs13 } from "react/jsx-runtime";
var MessageContainer = styled46.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[3]} 0`};
`;
var MessageText = styled46.p`
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
  const theme = useTheme();
  return /* @__PURE__ */ jsxs13(Modal, { isOpen, onClose, maxWidth: "420px", children: [
    /* @__PURE__ */ jsx25(Modal.Header, { title, onClose }),
    /* @__PURE__ */ jsx25(Modal.Body, { children: /* @__PURE__ */ jsxs13(MessageContainer, { children: [
      /* @__PURE__ */ jsx25(
        Icon7,
        {
          name: variant === "danger" ? "alert-circle" : "help-circle",
          size: 40,
          color: variant === "danger" ? theme.colors.danger.base : theme.colors.warning.base
        }
      ),
      /* @__PURE__ */ jsx25(MessageText, { children: message })
    ] }) }),
    /* @__PURE__ */ jsxs13(Modal.Footer, { children: [
      /* @__PURE__ */ jsx25(Button, { $variant: "ghost", onClick: onClose, disabled: loading, children: cancelLabel }),
      /* @__PURE__ */ jsx25(Button, { $variant: variant === "danger" ? "danger" : "primary", onClick: onConfirm, $loading: loading, children: confirmLabel })
    ] })
  ] });
};

// src/ui/components/Feedback/Modal/Dialog.tsx
import { styled as styled47 } from "styled-components";
import { jsx as jsx26 } from "react/jsx-runtime";
var DialogContent = styled47.div`
  padding: ${({ theme }) => theme.spacing[5]};
  text-align: center;
`;
var Dialog = ({ children, maxWidth = "420px", ...rest }) => {
  return /* @__PURE__ */ jsx26(Modal, { maxWidth, ...rest, children: /* @__PURE__ */ jsx26(DialogContent, { children }) });
};

// src/ui/components/Feedback/Progress/Progress.tsx
import { styled as styled48 } from "styled-components";
import { jsx as jsx27 } from "react/jsx-runtime";
var Track2 = styled48.div`
  width: 100%;
  height: ${({ $height }) => $height};
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};
  border-radius: ${({ theme }) => theme.radii.pill};
  overflow: hidden;
`;
var Bar = styled48.div`
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
  return /* @__PURE__ */ jsx27(
    Track2,
    {
      $height: height,
      role: "progressbar",
      "aria-valuenow": value,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      ...rest,
      children: /* @__PURE__ */ jsx27(Bar, { $value: value, $variant: variant })
    }
  );
};

// src/ui/components/Feedback/Skeleton/Skeleton.tsx
import { styled as styled49 } from "styled-components";

// src/ui/components/Feedback/Skeleton/skeletonStyles.ts
import { css as css18, keyframes as keyframes4 } from "styled-components";
var toCssSize = (value) => typeof value === "number" ? `${value}px` : value;
var shimmerMove = keyframes4`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;
var pulse = keyframes4`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`;
var skeletonSurface = css18`
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};

  ${({ $animation = "shimmer" }) => $animation === "pulse" && css18`
      animation: ${pulse} 1.6s ease-in-out infinite;
    `}

  ${({ $animation = "shimmer", theme }) => $animation === "shimmer" && css18`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent 0%,
          color-mix(in srgb, ${theme.colors.primary.base} 10%, transparent) 40%,
          color-mix(in srgb, ${theme.colors.background.surface} 60%, transparent) 50%,
          color-mix(in srgb, ${theme.colors.primary.base} 10%, transparent) 60%,
          transparent 100%
        );
        animation: ${shimmerMove} 1.8s ease-in-out infinite;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::after {
      display: none;
    }
  }
`;

// src/ui/components/Feedback/Skeleton/Skeleton.tsx
import { jsx as jsx28, jsxs as jsxs14 } from "react/jsx-runtime";
var Skeleton = styled49.div.attrs({ "aria-hidden": true })`
  ${skeletonSurface}
  display: block;
  width: ${({ $width = "100%" }) => toCssSize($width)};
  height: ${({ $height, $variant = "text" }) => {
  if ($height !== void 0) return toCssSize($height);
  return $variant === "text" ? "1rem" : "100%";
}};
  border-radius: ${({ $radius, $variant = "text", theme }) => {
  if ($radius !== void 0) return toCssSize($radius);
  if ($variant === "circular") return theme.radii.full;
  if ($variant === "rounded") return theme.radii.xl;
  if ($variant === "text") return theme.radii.sm;
  return theme.radii.base;
}};
`;
var SkeletonLine = styled49.div.attrs({ "aria-hidden": true })`
  ${skeletonSurface}
  display: block;
  width: ${({ $width = "100%" }) => toCssSize($width)};
  height: ${({ $height = "0.75rem" }) => toCssSize($height)};
  border-radius: ${({ theme }) => theme.radii.full};
`;
var SkeletonCircle = styled49.div.attrs({ "aria-hidden": true })`
  ${skeletonSurface}
  display: block;
  width: ${({ $size = 40 }) => toCssSize($size)};
  height: ${({ $size = 40 }) => toCssSize($size)};
  border-radius: ${({ theme }) => theme.radii.full};
`;
var TextStack = styled49.div.attrs({ "aria-hidden": true })`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => toCssSize($gap)};
  width: 100%;
`;
var SkeletonText = ({
  lines = 3,
  widths,
  $lastLineWidth = "60%",
  $lineHeight = "0.75rem",
  $gap = "0.625rem",
  $animation,
  ...rest
}) => {
  const lineWidths = widths ?? Array.from(
    { length: Math.max(1, lines) },
    (_, index) => index === lines - 1 && lines > 1 ? $lastLineWidth : "100%"
  );
  return /* @__PURE__ */ jsx28(TextStack, { $gap, ...rest, children: lineWidths.map((width, index) => /* @__PURE__ */ jsx28(SkeletonLine, { $width: width, $height: $lineHeight, $animation }, index)) });
};
var VisuallyHidden = styled49.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;
var SkeletonGroup = ({
  label = "Chargement\u2026",
  children,
  as: Component = "div",
  ...rest
}) => /* @__PURE__ */ jsxs14(Component, { role: "status", "aria-live": "polite", "aria-busy": "true", ...rest, children: [
  /* @__PURE__ */ jsx28(VisuallyHidden, { children: label }),
  children
] });

// src/ui/components/Feedback/Toast/Toast.tsx
import { Icon as Icon8 } from "core-react/icons";
import { styled as styled50, css as css19, keyframes as keyframes5 } from "styled-components";
import { jsx as jsx29, jsxs as jsxs15 } from "react/jsx-runtime";
var slideIn = keyframes5`
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
`;
var toastIcons = {
  info: "information",
  success: "check-circle",
  warning: "alert",
  danger: "alert-circle"
};
var ToastWrapper = styled50.div`
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
  return css19`
      border-left: 4px solid ${role.base};
      & > i {
        color: ${role.base};
      }
    `;
}}
`;
var Content = styled50.div`
  flex: 1 1 auto;
  min-width: 0;
  color: ${({ theme }) => theme.colors.text.body};
`;
var ToastTitle = styled50.strong`
  display: block;
  color: ${({ theme }) => theme.colors.text.heading};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[0.5]};
`;
var Toast = ({ variant = "info", title, onClose, children, ...rest }) => {
  return /* @__PURE__ */ jsxs15(ToastWrapper, { $variant: variant, role: "status", ...rest, children: [
    /* @__PURE__ */ jsx29(Icon8, { name: toastIcons[variant], size: 20 }),
    /* @__PURE__ */ jsxs15(Content, { children: [
      title && /* @__PURE__ */ jsx29(ToastTitle, { children: title }),
      /* @__PURE__ */ jsx29("div", { children })
    ] }),
    onClose && /* @__PURE__ */ jsx29(
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
import { createPortal as createPortal3 } from "react-dom";
import { styled as styled51 } from "styled-components";

// src/ui/components/Feedback/Toast/useToast.tsx
import { useSyncExternalStore } from "react";
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
  (selector) => useSyncExternalStore(
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
import { jsx as jsx30 } from "react/jsx-runtime";
var Viewport2 = styled51.div`
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
  return createPortal3(
    /* @__PURE__ */ jsx30(Viewport2, { "aria-live": "polite", children: toasts.map((t) => /* @__PURE__ */ jsx30(Toast, { variant: t.variant, title: t.title, onClose: () => removeToast2(t.id), children: t.message }, t.id)) }),
    document.body
  );
};

// src/ui/components/Feedback/Tooltip/Tooltip.tsx
import "react";
import { styled as styled52, css as css20 } from "styled-components";
import { jsx as jsx31, jsxs as jsxs16 } from "react/jsx-runtime";
var Bubble = styled52.span`
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
      return css20`
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%) translateY(-4px);
        `;
    case "left":
      return css20`
          right: calc(100% + 6px);
          top: 50%;
          transform: translateY(-50%) translateX(4px);
        `;
    case "right":
      return css20`
          left: calc(100% + 6px);
          top: 50%;
          transform: translateY(-50%) translateX(-4px);
        `;
    case "top":
    default:
      return css20`
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
        `;
  }
}}
`;
var Wrapper = styled52.span`
  position: relative;
  display: inline-flex;

  &:hover > ${Bubble}, &:focus-within > ${Bubble} {
    opacity: 1;
    transform: ${({ children }) => children ? "translateX(-50%) translateY(0)" : "none"};
  }
`;
var Tooltip = ({ content, placement = "top", children, ...rest }) => {
  return /* @__PURE__ */ jsxs16(Wrapper, { ...rest, children: [
    children,
    /* @__PURE__ */ jsx31(Bubble, { $placement: placement, role: "tooltip", children: content })
  ] });
};

// src/ui/components/Forms/Checkbox.tsx
import { styled as styled53 } from "styled-components";
var Checkbox = styled53.input.attrs({ type: "checkbox" })`
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
import { forwardRef, useId as useId2 } from "react";
import { styled as styled56 } from "styled-components";

// src/ui/components/Forms/HelperText.tsx
import { styled as styled54 } from "styled-components";
var HelperText = styled54.span`
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
import { styled as styled55 } from "styled-components";
var Radio = styled55.input.attrs({ type: "radio" })`
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
import { jsx as jsx32, jsxs as jsxs17 } from "react/jsx-runtime";
var LabelContainer = styled56.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;
  user-select: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.body};
`;
var FieldWrapper = styled56.div`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;
var CheckField = forwardRef(
  ({ label, type = "checkbox", error, id: customId, ...inputProps }, ref) => {
    const generatedId = useId2();
    const id = customId || generatedId;
    const InputComponent = type === "radio" ? Radio : Checkbox;
    return /* @__PURE__ */ jsxs17(FieldWrapper, { children: [
      /* @__PURE__ */ jsxs17(LabelContainer, { htmlFor: id, children: [
        /* @__PURE__ */ jsx32(InputComponent, { ref, id, ...inputProps }),
        label && /* @__PURE__ */ jsx32("span", { children: label })
      ] }),
      error && /* @__PURE__ */ jsx32(HelperText, { $state: "invalid", children: error })
    ] });
  }
);
CheckField.displayName = "CheckField";

// src/ui/components/Forms/Fields/ChoiceField.tsx
import { forwardRef as forwardRef2, useId as useId3 } from "react";
import { styled as styled59 } from "styled-components";

// src/ui/components/Forms/Label.tsx
import { styled as styled57 } from "styled-components";
var Label = styled57.label`
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
import { styled as styled58 } from "styled-components";
var Select = styled58.select`
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
import { jsx as jsx33, jsxs as jsxs18 } from "react/jsx-runtime";
var FieldWrapper2 = styled59.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
var ChoiceField = forwardRef2(
  ({ label, error, hint, required, id: customId, children, ...selectProps }, ref) => {
    const generatedId = useId3();
    const id = customId || generatedId;
    const validationState = error ? "invalid" : selectProps.$validationState;
    return /* @__PURE__ */ jsxs18(FieldWrapper2, { children: [
      label && /* @__PURE__ */ jsx33(Label, { htmlFor: id, $required: required, children: label }),
      /* @__PURE__ */ jsx33(Select, { ref, id, required, $validationState: validationState, ...selectProps, children }),
      error && /* @__PURE__ */ jsx33(HelperText, { $state: "invalid", children: error }),
      !error && hint && /* @__PURE__ */ jsx33(HelperText, { children: hint })
    ] });
  }
);
ChoiceField.displayName = "ChoiceField";

// src/ui/components/Forms/Fields/TextareaField.tsx
import { forwardRef as forwardRef3, useId as useId4 } from "react";
import { styled as styled61 } from "styled-components";

// src/ui/components/Forms/Textarea.tsx
import { styled as styled60 } from "styled-components";
var Textarea = styled60.textarea`
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
import { jsx as jsx34, jsxs as jsxs19 } from "react/jsx-runtime";
var FieldWrapper3 = styled61.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
var TextareaField = forwardRef3(
  ({ label, error, hint, required, id: customId, rows = 3, ...textareaProps }, ref) => {
    const generatedId = useId4();
    const id = customId || generatedId;
    const validationState = error ? "invalid" : textareaProps.$validationState;
    return /* @__PURE__ */ jsxs19(FieldWrapper3, { children: [
      label && /* @__PURE__ */ jsx34(Label, { htmlFor: id, $required: required, children: label }),
      /* @__PURE__ */ jsx34(
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
      error && /* @__PURE__ */ jsx34(HelperText, { $state: "invalid", children: error }),
      !error && hint && /* @__PURE__ */ jsx34(HelperText, { children: hint })
    ] });
  }
);
TextareaField.displayName = "TextareaField";

// src/ui/components/Forms/Fields/TextField.tsx
import { forwardRef as forwardRef4, useId as useId5 } from "react";
import { styled as styled63 } from "styled-components";

// src/ui/components/Forms/Input.tsx
import { styled as styled62 } from "styled-components";
var Input = styled62.input`
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
import { jsx as jsx35, jsxs as jsxs20 } from "react/jsx-runtime";
var FieldWrapper4 = styled63.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
var TextField = forwardRef4(
  ({ label, error, hint, required, id: customId, ...inputProps }, ref) => {
    const generatedId = useId5();
    const id = customId || generatedId;
    const validationState = error ? "invalid" : inputProps.$validationState;
    return /* @__PURE__ */ jsxs20(FieldWrapper4, { children: [
      label && /* @__PURE__ */ jsx35(Label, { htmlFor: id, $required: required, children: label }),
      /* @__PURE__ */ jsx35(Input, { ref, id, required, $validationState: validationState, ...inputProps }),
      error && /* @__PURE__ */ jsx35(HelperText, { $state: "invalid", children: error }),
      !error && hint && /* @__PURE__ */ jsx35(HelperText, { children: hint })
    ] });
  }
);
TextField.displayName = "TextField";

// src/ui/components/Forms/Fields/ToggleField.tsx
import { forwardRef as forwardRef5, useId as useId6 } from "react";
import { styled as styled65 } from "styled-components";

// src/ui/components/Forms/Toggle.tsx
import { styled as styled64 } from "styled-components";
var Toggle = styled64.input.attrs((props) => ({
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
import { jsx as jsx36, jsxs as jsxs21 } from "react/jsx-runtime";
var LabelContainer2 = styled65.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  user-select: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.body};
`;
var FieldWrapper5 = styled65.div`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;
var ToggleField = forwardRef5(
  ({ label, error, id: customId, ...toggleProps }, ref) => {
    const generatedId = useId6();
    const id = customId || generatedId;
    return /* @__PURE__ */ jsxs21(FieldWrapper5, { children: [
      /* @__PURE__ */ jsxs21(LabelContainer2, { htmlFor: id, children: [
        /* @__PURE__ */ jsx36(Toggle, { ref, id, ...toggleProps }),
        label && /* @__PURE__ */ jsx36("span", { children: label })
      ] }),
      error && /* @__PURE__ */ jsx36(HelperText, { $state: "invalid", children: error })
    ] });
  }
);
ToggleField.displayName = "ToggleField";

// src/ui/components/Forms/FileDropzone/FileDropzone.tsx
import { Icon as Icon9 } from "core-react/icons";
import { useRef as useRef2, useState as useState4 } from "react";
import { styled as styled66, css as css21 } from "styled-components";
import { jsx as jsx37, jsxs as jsxs22 } from "react/jsx-runtime";
var DropArea = styled66.div`
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

  ${({ $disabled, theme }) => !$disabled && css21`
      &:hover {
        border-color: ${theme.colors.primary.base};
        background-color: ${theme.colors.background.surfaceHover};
      }
    `}

  ${({ $disabled }) => $disabled && css21`
      opacity: 0.6;
    `}
`;
var HiddenInput = styled66.input`
  display: none;
`;
var MainText = styled66.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.heading};
`;
var SubText = styled66.span`
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
  const [isDragging, setIsDragging] = useState4(false);
  const [localError, setLocalError] = useState4(null);
  const inputRef = useRef2(null);
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
  return /* @__PURE__ */ jsxs22("div", { ...rest, children: [
    label && /* @__PURE__ */ jsx37(Label, { children: label }),
    /* @__PURE__ */ jsxs22(
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
          /* @__PURE__ */ jsx37(
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
          /* @__PURE__ */ jsx37(Icon9, { name: "cloud-upload-outline", size: 32 }),
          /* @__PURE__ */ jsx37(MainText, { children: "Glissez-d\xE9posez vos fichiers ici ou cliquez pour parcourir" }),
          /* @__PURE__ */ jsxs22(SubText, { children: [
            "Taille maximale : ",
            maxSizeMb,
            " Mo"
          ] })
        ]
      }
    ),
    displayedError && /* @__PURE__ */ jsx37(HelperText, { $state: "invalid", children: displayedError }),
    !displayedError && hint && /* @__PURE__ */ jsx37(HelperText, { children: hint })
  ] });
};

// src/ui/components/Forms/InputGroup/InputGroup.tsx
import "react";
import { styled as styled67 } from "styled-components";
import { jsx as jsx38, jsxs as jsxs23 } from "react/jsx-runtime";
var GroupWrapper = styled67.div`
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
var InputAddon = styled67.span`
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
  return /* @__PURE__ */ jsxs23(GroupWrapper, { ...rest, children: [
    leftAddon && /* @__PURE__ */ jsx38(InputAddon, { children: leftAddon }),
    children,
    rightAddon && /* @__PURE__ */ jsx38(InputAddon, { children: rightAddon })
  ] });
};

// src/ui/components/Forms/MarkdownEditor/MarkdownEditor.tsx
import { useMarkdownEditor } from "core-react";
import { Fragment as Fragment4, useId as useId7 } from "react";
import { styled as styled68 } from "styled-components";
import { Icon as Icon10 } from "core-react/icons";
import { jsx as jsx39, jsxs as jsxs24 } from "react/jsx-runtime";
var Field = styled68.div`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
var Root = styled68.div`
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
var Toolbar = styled68.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[1.5]} ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.background.surfaceHover};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;
var Modes = styled68.div`
  display: inline-flex;
  padding: 2px;
  background-color: ${({ theme }) => theme.colors.background.surfaceActive};
  border-radius: ${({ theme }) => theme.radii.md};
`;
var ModeButton = styled68.button`
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
var FormatButtons = styled68.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
`;
var FormatButton = styled68.button`
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
var Separator = styled68.span`
  width: 1px;
  height: 18px;
  margin: 0 ${({ theme }) => theme.spacing[1]};
  background-color: ${({ theme }) => theme.colors.border.hover};
`;
var Input2 = styled68.textarea`
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
var Preview = styled68.div`
  padding: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.body};
`;
var Empty = styled68.em`
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
  const id = useId7();
  const { textareaRef, mode, setMode, applyAction, onKeyDown, previewMinHeight } = useMarkdownEditor();
  const isPreview = mode === "preview";
  return /* @__PURE__ */ jsxs24(Field, { children: [
    label && /* @__PURE__ */ jsx39(Label, { htmlFor: id, $required: required, children: label }),
    /* @__PURE__ */ jsxs24(Root, { $invalid: Boolean(error), children: [
      /* @__PURE__ */ jsxs24(Toolbar, { children: [
        /* @__PURE__ */ jsxs24(Modes, { role: "radiogroup", "aria-label": "Mode de l'\xE9diteur", children: [
          /* @__PURE__ */ jsxs24(
            ModeButton,
            {
              type: "button",
              role: "radio",
              "aria-checked": !isPreview,
              $active: !isPreview,
              onClick: () => setMode("write"),
              children: [
                /* @__PURE__ */ jsx39(Icon10, { name: "pencil", size: 12 }),
                " \xC9crire"
              ]
            }
          ),
          /* @__PURE__ */ jsxs24(
            ModeButton,
            {
              type: "button",
              role: "radio",
              "aria-checked": isPreview,
              $active: isPreview,
              onClick: () => setMode("preview"),
              children: [
                /* @__PURE__ */ jsx39(Icon10, { name: "eye", size: 12 }),
                " Aper\xE7u"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx39(FormatButtons, { role: "toolbar", "aria-label": "Mise en forme", children: actions.map(
          (action, index) => action === "separator" ? /* @__PURE__ */ jsx39(Separator, { "aria-hidden": "true" }, `separator-${index}`) : /* @__PURE__ */ jsx39(Fragment4, { children: /* @__PURE__ */ jsx39(
            FormatButton,
            {
              type: "button",
              title: ACTIONS[action].label,
              "aria-label": ACTIONS[action].label,
              disabled: isPreview,
              onClick: () => applyAction(action),
              children: /* @__PURE__ */ jsx39(Icon10, { name: ACTIONS[action].icon, size: 15 })
            }
          ) }, action)
        ) })
      ] }),
      /* @__PURE__ */ jsx39(
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
      isPreview && /* @__PURE__ */ jsx39(Preview, { style: { minHeight: previewMinHeight }, children: value.trim() ? /* @__PURE__ */ jsx39(MarkdownViewer, { breaks: true, children: value }) : /* @__PURE__ */ jsx39(Empty, { children: "Rien \xE0 pr\xE9visualiser." }) })
    ] }),
    (error || hint) && /* @__PURE__ */ jsx39(HelperText, { $state: error ? "invalid" : void 0, children: error ?? hint })
  ] });
};

// src/ui/components/Forms/TagInput/TagInput.tsx
import { Icon as Icon11 } from "core-react/icons";
import { useState as useState5 } from "react";
import { styled as styled69, useTheme as useTheme2 } from "styled-components";
import { jsx as jsx40, jsxs as jsxs25 } from "react/jsx-runtime";
var InputBox = styled69.div`
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
var BareInput = styled69.input`
  flex: 1;
  min-width: 120px;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.body};
`;
var RemoveBtn = styled69.button`
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
var SuggestionsList = styled69.ul`
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
var SuggestionItem = styled69.li`
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
var ColorDot = styled69.span`
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
  const theme = useTheme2();
  const [query, setQuery] = useState5("");
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
  return /* @__PURE__ */ jsxs25("div", { ...rest, children: [
    label && /* @__PURE__ */ jsx40(Label, { children: label }),
    /* @__PURE__ */ jsxs25(InputBox, { $hasError: Boolean(error), children: [
      value.map((tag) => /* @__PURE__ */ jsxs25(Badge, { $pill: true, $color: tag.color, $variant: "primary", children: [
        tag.label,
        /* @__PURE__ */ jsx40(RemoveBtn, { type: "button", onClick: () => removeTag(tag.id), "aria-label": `Retirer ${tag.label}`, children: /* @__PURE__ */ jsx40(Icon11, { name: "close", size: 12 }) })
      ] }, tag.id)),
      /* @__PURE__ */ jsx40(
        BareInput,
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          onKeyDown: handleKeyDown,
          placeholder: value.length === 0 ? placeholder : ""
        }
      )
    ] }),
    query && availableSuggestions.length > 0 && /* @__PURE__ */ jsx40(SuggestionsList, { children: availableSuggestions.map((s) => /* @__PURE__ */ jsxs25(SuggestionItem, { onClick: () => addTag(s), children: [
      s.color && /* @__PURE__ */ jsx40(ColorDot, { $color: s.color }),
      /* @__PURE__ */ jsx40("span", { children: s.label })
    ] }, s.id)) }),
    error && /* @__PURE__ */ jsx40(HelperText, { $state: "invalid", children: error }),
    !error && hint && /* @__PURE__ */ jsx40(HelperText, { children: hint })
  ] });
};

// src/ui/components/Grid/Col.tsx
import { styled as styled70, css as css22 } from "styled-components";
var computeWidth = (span) => {
  if (!span) return "";
  if (span === "auto") {
    return css22`
      flex: 1 0 0%;
      width: auto;
      max-width: 100%;
    `;
  }
  const pct = `${span / 12 * 100}%`;
  return css22`
    flex: 0 0 auto;
    width: ${pct};
  `;
};
var Col = styled70.div.attrs((props) => ({
  as: props.as || "div"
}))`
  box-sizing: border-box;
  flex: 0 0 auto;
  width: 100%;

  ${({ $span }) => computeWidth($span)}
  ${({ $offset }) => $offset && css22`
      margin-left: ${$offset / 12 * 100}%;
    `}

  ${({ $sm, theme }) => $sm && css22`
      ${theme.media.up("sm")} {
        ${computeWidth($sm)}
      }
    `}

  ${({ $md, theme }) => $md && css22`
      ${theme.media.up("md")} {
        ${computeWidth($md)}
      }
    `}

  ${({ $lg, theme }) => $lg && css22`
      ${theme.media.up("lg")} {
        ${computeWidth($lg)}
      }
    `}

  ${({ $xl, theme }) => $xl && css22`
      ${theme.media.up("xl")} {
        ${computeWidth($xl)}
      }
    `}
`;

// src/ui/components/Grid/Columns.tsx
import { styled as styled71 } from "styled-components";
var Columns = styled71.div.attrs((props) => ({
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
import { styled as styled72, css as css23 } from "styled-components";
var Container3 = styled72.div.attrs((props) => ({
  as: props.as || "div"
}))`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[4]};

  ${({ $fluid, theme }) => !$fluid && css23`
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
import { styled as styled73 } from "styled-components";
var Flex = styled73.div.attrs((props) => ({
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
import { styled as styled74 } from "styled-components";
var Grid = styled74.div.attrs((props) => ({
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
import { styled as styled75 } from "styled-components";
var Row = styled75.div.attrs((props) => ({
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
import { Icon as Icon12 } from "core-react/icons";
import "react";
import { useUI as useUI3 } from "core-react";
import { styled as styled76 } from "styled-components";
import { jsx as jsx41, jsxs as jsxs26 } from "react/jsx-runtime";
var StyledBackButton = styled76.button`
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
  const { navigation: router } = useUI3();
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
  return /* @__PURE__ */ jsxs26(StyledBackButton, { type: "button", onClick: handleClick, ...rest, children: [
    /* @__PURE__ */ jsx41(Icon12, { name: "arrow-left", size: 18 }),
    label && /* @__PURE__ */ jsx41("span", { children: label })
  ] });
};

// src/ui/components/Navigation/Breadcrumb/Breadcrumb.tsx
import { Icon as Icon14 } from "core-react/icons";
import React15 from "react";
import { styled as styled79 } from "styled-components";

// src/ui/components/Navigation/Breadcrumb/BreadcrumbContainer.tsx
import "react";
import { styled as styled77 } from "styled-components";
import { jsx as jsx42 } from "react/jsx-runtime";
var Nav = styled77.nav`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing?.[2] || "8px"};
`;
var OrderedList = styled77.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
`;
var BreadcrumbContainer = ({ children, ...props }) => /* @__PURE__ */ jsx42(Nav, { "aria-label": "Fil d'Ariane", ...props, children: /* @__PURE__ */ jsx42(OrderedList, { children }) });

// src/ui/components/Navigation/Breadcrumb/BreadcrumbItem.tsx
import { Icon as Icon13 } from "core-react/icons";
import "react";
import { styled as styled78, css as css24 } from "styled-components";
import { useLinkProps as useLinkProps4 } from "core-react";
import { Fragment as Fragment5, jsx as jsx43, jsxs as jsxs27 } from "react/jsx-runtime";
var ItemLi = styled78.li`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  line-height: 1.4;
`;
var interactiveStyles = css24`
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
var StyledLink = styled78.a`
  ${interactiveStyles}
`;
var StyledButton = styled78.button`
  ${interactiveStyles}
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
`;
var ActiveSpan = styled78.span`
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
  const linkProps = useLinkProps4(to);
  const content = /* @__PURE__ */ jsxs27(Fragment5, { children: [
    icon && /* @__PURE__ */ jsx43(Icon13, { name: icon, size: 15 }),
    /* @__PURE__ */ jsx43("span", { children })
  ] });
  return /* @__PURE__ */ jsx43(ItemLi, { children: active ? /* @__PURE__ */ jsx43(ActiveSpan, { "aria-current": "page", children: content }) : to ? /* @__PURE__ */ jsx43(StyledLink, { ...linkProps, children: content }) : onClick ? /* @__PURE__ */ jsx43(StyledButton, { type: "button", onClick, children: content }) : /* @__PURE__ */ jsx43(ActiveSpan, { children: content }) });
};

// src/ui/components/Navigation/Breadcrumb/Breadcrumb.tsx
import { jsx as jsx44, jsxs as jsxs28 } from "react/jsx-runtime";
var Separator2 = styled79.li`
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
    return /* @__PURE__ */ jsx44(
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
  }) : React15.Children.toArray(children);
  return /* @__PURE__ */ jsx44(BreadcrumbContainer, { className, children: elements.map((el, index) => /* @__PURE__ */ jsxs28(React15.Fragment, { children: [
    index > 0 && /* @__PURE__ */ jsx44(Separator2, { "aria-hidden": "true", children: /* @__PURE__ */ jsx44(Icon14, { name: separatorIcon, size: 15 }) }),
    el
  ] }, index)) });
};

// src/ui/components/Navigation/Dropdown/Dropdown.tsx
import { useEffect as useEffect4, useRef as useRef3, useState as useState6 } from "react";
import { styled as styled82 } from "styled-components";

// src/ui/components/Navigation/Dropdown/DropdownContext.tsx
import { createContext as createContext3, useContext as useContext3 } from "react";
var GenericDropdownContext = createContext3(null);
var useGenericDropdown = () => {
  const ctx = useContext3(GenericDropdownContext);
  if (!ctx) {
    throw new Error("Doit \xEAtre utilis\xE9 \xE0 l\u2019int\xE9rieur d\u2019un <Dropdown>");
  }
  return ctx;
};

// src/ui/components/Navigation/Dropdown/DropdownItem.tsx
import "react";
import { styled as styled80, css as css25 } from "styled-components";
import { jsx as jsx45, jsxs as jsxs29 } from "react/jsx-runtime";
var StyledItem = styled80.button`
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

  ${({ $variant, theme }) => $variant === "danger" ? css25`
          color: ${theme.colors.danger.base};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.danger.subtle};
            color: ${theme.colors.danger.dark};
          }
        ` : css25`
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
var DropdownDivider = styled80.li`
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
  return /* @__PURE__ */ jsx45("li", { role: "none", children: /* @__PURE__ */ jsxs29(
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
        /* @__PURE__ */ jsx45("span", { children })
      ]
    }
  ) });
};

// src/ui/components/Navigation/Dropdown/DropdownMenu.tsx
import { styled as styled81 } from "styled-components";
import { jsx as jsx46 } from "react/jsx-runtime";
var MenuList = styled81.ul`
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
  return /* @__PURE__ */ jsx46(MenuList, { $isOpen: isOpen, $align: align, $minWidth: minWidth, role: "menu", ...rest, children });
};

// src/ui/components/Navigation/Dropdown/Dropdown.tsx
import { jsx as jsx47 } from "react/jsx-runtime";
var Wrapper2 = styled82.div`
  position: relative;
  display: inline-flex;
`;
var TriggerButton = styled82.div`
  display: inline-flex;
  cursor: pointer;
`;
var DropdownTrigger = ({ children, onClick, ...rest }) => {
  const { isOpen, toggle } = useGenericDropdown();
  return /* @__PURE__ */ jsx47(
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
  const [isOpen, setIsOpen] = useState6(false);
  const ref = useRef3(null);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  useEffect4(() => {
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
  return /* @__PURE__ */ jsx47(GenericDropdownContext.Provider, { value: { isOpen, toggle, close }, children: /* @__PURE__ */ jsx47(Wrapper2, { ref, ...rest, children }) });
};
var Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
  Divider: DropdownDivider
});

// src/ui/components/Navigation/Navbar/Navbar.tsx
import { useState as useState7 } from "react";
import { styled as styled83, css as css26 } from "styled-components";

// src/ui/components/Navigation/Navbar/NavbarContext.tsx
import { createContext as createContext4, useContext as useContext4 } from "react";
var NavbarContext = createContext4(null);
var useNavbar = () => {
  const context = useContext4(NavbarContext);
  if (!context) {
    throw new Error("Les sous-composants Navbar doivent \xEAtre utilis\xE9s dans <Navbar>");
  }
  return context;
};

// src/ui/components/Navigation/Navbar/Navbar.tsx
import { jsx as jsx48 } from "react/jsx-runtime";
var StyledNav = styled83.nav`
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

  ${({ $sticky }) => $sticky && css26`
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
  const [internalIsOpen, setInternalIsOpen] = useState7(false);
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
  return /* @__PURE__ */ jsx48(NavbarContext.Provider, { value: { isOpen, toggle, close, breakpoint }, children: /* @__PURE__ */ jsx48(StyledNav, { $sticky: sticky, ...props, children }) });
};

// src/ui/components/Navigation/Navbar/NavbarBrand.tsx
import { styled as styled84 } from "styled-components";
var NavbarBrand = styled84.div`
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
import "react";
import { styled as styled85, css as css27 } from "styled-components";
import { jsx as jsx49 } from "react/jsx-runtime";
var CollapseWrapper = styled85.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  ${({ $breakpoint, $isOpen, theme }) => $breakpoint && css27`
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
  return /* @__PURE__ */ jsx49(CollapseWrapper, { $isOpen: isOpen, $breakpoint: breakpoint, ...props, children });
};

// src/ui/components/Navigation/Navbar/NavbarDropdown.tsx
import { useLinkProps as useLinkProps5 } from "core-react";
import { useEffect as useEffect5, useRef as useRef4, useState as useState8 } from "react";
import { styled as styled86, css as css28 } from "styled-components";

// src/ui/components/Navigation/Navbar/NavbarDropdownContext.tsx
import { createContext as createContext5, useContext as useContext5 } from "react";
var DropdownContext = createContext5(null);
var useDropdown = () => {
  const ctx = useContext5(DropdownContext);
  if (!ctx) throw new Error("Utiliser les \xE9l\xE9ments Dropdown dans <NavbarDropdown>");
  return ctx;
};

// src/ui/components/Navigation/Navbar/NavbarDropdown.tsx
import { jsx as jsx50 } from "react/jsx-runtime";
var DropdownContainer = styled86.div`
  position: relative;
  display: inline-flex;
`;
var DropdownToggleBtn = styled86.button`
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
var MenuWrapper = styled86.ul`
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
var HeaderLi = styled86.li`
  padding: ${({ theme }) => `${theme.spacing[2]}${theme.spacing[3]}`};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;
var ItemLi2 = styled86.li`
  width: 100%;
`;
var ItemBtn = styled86.button`
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

  ${({ $active, theme }) => $active && css28`
      background-color: ${theme.colors.primary.subtle};
      color: ${theme.colors.primary.base};
    `}
`;
var DividerLi = styled86.li`
  margin: ${({ theme }) => `${theme.spacing[1.5]} 0`};
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.default};
`;
var NavbarDropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState8(false);
  const containerRef = useRef4(null);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  useEffect5(() => {
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
  return /* @__PURE__ */ jsx50(DropdownContext.Provider, { value: { isOpen, toggle, close }, children: /* @__PURE__ */ jsx50(DropdownContainer, { ref: containerRef, children }) });
};
var NavbarDropdownToggle = ({
  children,
  ...props
}) => {
  const { isOpen, toggle } = useDropdown();
  return /* @__PURE__ */ jsx50(DropdownToggleBtn, { type: "button", onClick: toggle, "aria-haspopup": "true", "aria-expanded": isOpen, ...props, children });
};
var NavbarDropdownMenu = ({ children, align = "right" }) => {
  const { isOpen } = useDropdown();
  return /* @__PURE__ */ jsx50(MenuWrapper, { $isOpen: isOpen, $align: align, role: "menu", children });
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
  const linkProps = useLinkProps5(href, as);
  return /* @__PURE__ */ jsx50(ItemLi2, { role: "none", children: /* @__PURE__ */ jsx50(
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
var NavbarDropdownHeader = ({ children }) => /* @__PURE__ */ jsx50(HeaderLi, { role: "presentation", children });
var NavbarDropdownDivider = () => /* @__PURE__ */ jsx50(DividerLi, { role: "separator" });

// src/ui/components/Navigation/Navbar/NavbarItem.tsx
import { styled as styled87 } from "styled-components";
var NavbarItem = styled87.div`
  display: flex;
  align-items: center;
`;

// src/ui/components/Navigation/Navbar/NavbarLink.tsx
import { useLinkProps as useLinkProps6 } from "core-react";
import { styled as styled88, css as css29 } from "styled-components";
import { jsx as jsx51 } from "react/jsx-runtime";
var NavbarLinkBase = styled88.button`
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

  ${({ $active, theme }) => $active ? css29`
          background-color: ${theme.colors.primary.subtle};
        ` : css29`
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
var NavbarLink = ({ href, as, ...props }) => /* @__PURE__ */ jsx51(NavbarLinkBase, { ...props, ...useLinkProps6(href, as) });

// src/ui/components/Navigation/Navbar/NavbarNav.tsx
import { styled as styled89 } from "styled-components";
var NavbarNav = styled89.ul`
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
import { Icon as Icon15 } from "core-react/icons";
import "react";
import { styled as styled90, css as css30 } from "styled-components";
import { jsx as jsx52 } from "react/jsx-runtime";
var ToggleButton = styled90.button`
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

  ${({ $breakpoint, theme }) => $breakpoint && css30`
      @media (max-width: ${theme.breakpoints[$breakpoint]}) {
        display: inline-flex;
      }
    `}
`;
var NavbarToggle = ({ children, ...props }) => {
  const { isOpen, toggle, breakpoint } = useNavbar();
  return /* @__PURE__ */ jsx52(
    ToggleButton,
    {
      type: "button",
      $breakpoint: breakpoint,
      onClick: toggle,
      "aria-expanded": isOpen,
      "aria-label": "Basculer la navigation",
      ...props,
      children: children ?? /* @__PURE__ */ jsx52(Icon15, { name: isOpen ? "close" : "menu", size: 20 })
    }
  );
};

// src/ui/components/Navigation/Pagination/Pagination.tsx
import { Icon as Icon16 } from "core-react/icons";
import { useMemo as useMemo2 } from "react";

// src/ui/components/Navigation/Pagination/PaginationButton.tsx
import "react";
import { styled as styled91, css as css31 } from "styled-components";
import { jsx as jsx53 } from "react/jsx-runtime";
var StyledButton2 = styled91.button`
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

  ${({ $isActive, theme }) => $isActive && css31`
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
  return /* @__PURE__ */ jsx53(StyledButton2, { type, $isActive: isActive, "aria-current": isActive ? "page" : void 0, ...rest, children });
};

// src/ui/components/Navigation/Pagination/PaginationContainer.tsx
import "react";
import { styled as styled92 } from "styled-components";
import { jsx as jsx54 } from "react/jsx-runtime";
var Nav2 = styled92.nav`
  display: flex;
  justify-content: center;
`;
var List = styled92.ul`
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
  return /* @__PURE__ */ jsx54(Nav2, { "aria-label": ariaLabel, ...rest, children: /* @__PURE__ */ jsx54(List, { children }) });
};

// src/ui/components/Navigation/Pagination/PaginationEllipsis.tsx
import "react";
import { styled as styled93 } from "styled-components";
import { jsx as jsx55 } from "react/jsx-runtime";
var StyledEllipsis = styled93.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
var PaginationEllipsis = ({ children = "\u2026", ...rest }) => {
  return /* @__PURE__ */ jsx55(StyledEllipsis, { "aria-hidden": "true", ...rest, children });
};

// src/ui/components/Navigation/Pagination/PaginationItem.tsx
import { styled as styled94 } from "styled-components";
var PaginationItem = styled94.li`
  display: inline-flex;
`;

// src/ui/components/Navigation/Pagination/Pagination.tsx
import { jsx as jsx56, jsxs as jsxs30 } from "react/jsx-runtime";
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
  const paginationRange = useMemo2(() => {
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
  return /* @__PURE__ */ jsxs30(PaginationContainer, { ...rest, children: [
    showFirstLast && /* @__PURE__ */ jsx56(PaginationItem, { children: /* @__PURE__ */ jsx56(
      PaginationButton,
      {
        disabled: disabled || currentPage === 1,
        onClick: () => onPageChange(1),
        "aria-label": "Premi\xE8re page",
        children: /* @__PURE__ */ jsx56(Icon16, { name: "chevron-double-left", size: 16 })
      }
    ) }),
    /* @__PURE__ */ jsx56(PaginationItem, { children: /* @__PURE__ */ jsx56(
      PaginationButton,
      {
        disabled: disabled || currentPage === 1,
        onClick: () => onPageChange(currentPage - 1),
        "aria-label": "Page pr\xE9c\xE9dente",
        children: /* @__PURE__ */ jsx56(Icon16, { name: "chevron-left", size: 16 })
      }
    ) }),
    paginationRange.map((pageNumber, idx) => {
      if (pageNumber === "DOTS") {
        return /* @__PURE__ */ jsx56(PaginationItem, { children: /* @__PURE__ */ jsx56(PaginationEllipsis, {}) }, `dots-${idx}`);
      }
      const page = pageNumber;
      return /* @__PURE__ */ jsx56(PaginationItem, { children: /* @__PURE__ */ jsx56(
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
    /* @__PURE__ */ jsx56(PaginationItem, { children: /* @__PURE__ */ jsx56(
      PaginationButton,
      {
        disabled: disabled || currentPage === totalPages,
        onClick: () => onPageChange(currentPage + 1),
        "aria-label": "Page suivante",
        children: /* @__PURE__ */ jsx56(Icon16, { name: "chevron-right", size: 16 })
      }
    ) }),
    showFirstLast && /* @__PURE__ */ jsx56(PaginationItem, { children: /* @__PURE__ */ jsx56(
      PaginationButton,
      {
        disabled: disabled || currentPage === totalPages,
        onClick: () => onPageChange(totalPages),
        "aria-label": "Derni\xE8re page",
        children: /* @__PURE__ */ jsx56(Icon16, { name: "chevron-double-right", size: 16 })
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
import { useContext as useContext7 } from "react";
import { styled as styled95, css as css32 } from "styled-components";

// src/ui/components/Navigation/Sidebar/SidebarContext.tsx
import { createContext as createContext6, useContext as useContext6, useState as useState9 } from "react";
import { jsx as jsx57 } from "react/jsx-runtime";
var SidebarContext = createContext6(null);
var useSidebar = () => {
  const context = useContext6(SidebarContext);
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
  const [internalIsOpen, setInternalIsOpen] = useState9(false);
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
  return /* @__PURE__ */ jsx57(SidebarContext.Provider, { value: { isOpen, toggle, close, breakpoint }, children });
};

// src/ui/components/Navigation/Sidebar/Sidebar.tsx
import { Fragment as Fragment6, jsx as jsx58, jsxs as jsxs31 } from "react/jsx-runtime";
var Backdrop3 = styled95.div`
  display: none;

  ${({ $breakpoint, $isOpen, theme }) => $breakpoint && css32`
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
var StyledSidebar = styled95.aside`
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

  ${({ $breakpoint, $isOpen, theme }) => $breakpoint && css32`
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
  return /* @__PURE__ */ jsxs31(Fragment6, { children: [
    /* @__PURE__ */ jsx58(Backdrop3, { $isOpen: isOpen, $breakpoint: activeBreakpoint, onClick: close }),
    /* @__PURE__ */ jsx58(StyledSidebar, { $isOpen: isOpen, $width: width, $breakpoint: activeBreakpoint, ...props, children })
  ] });
};
var Sidebar = ({ breakpoint = "md", isOpen, onToggle, ...props }) => {
  const existingContext = useContext7(SidebarContext);
  if (existingContext) {
    return /* @__PURE__ */ jsx58(SidebarInternal, { breakpoint, ...props });
  }
  return /* @__PURE__ */ jsx58(SidebarProvider, { breakpoint, isOpen, onToggle, children: /* @__PURE__ */ jsx58(SidebarInternal, { breakpoint, ...props }) });
};

// src/ui/components/Navigation/Sidebar/SidebarHeader.tsx
import { styled as styled96 } from "styled-components";
var SidebarHeader = styled96.div`
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
import { styled as styled97 } from "styled-components";
var SidebarNav = styled97.nav`
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
import { styled as styled98 } from "styled-components";
var SidebarSection = styled98.span`
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
import { styled as styled99 } from "styled-components";
var SidebarItem = styled99.div`
  display: flex;
  width: 100%;
`;

// src/ui/components/Navigation/Sidebar/SidebarLink.tsx
import { useLinkProps as useLinkProps7 } from "core-react";
import "react";
import { styled as styled100, css as css33 } from "styled-components";
import { jsx as jsx59, jsxs as jsxs32 } from "react/jsx-runtime";
var StyledLink2 = styled100.button`
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

  ${({ $active, theme }) => $active ? css33`
          background-color: ${theme.colors.primary.subtle};
          font-weight: ${theme.typography.weights.semibold};
        ` : css33`
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
var ContentSlot = styled100.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;
var BadgeSlot = styled100.span`
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
  const linkProps = useLinkProps7(href, as);
  const handleClick = (e) => {
    onClick?.(e);
    if (breakpoint) close();
  };
  return /* @__PURE__ */ jsxs32(StyledLink2, { ...linkProps, $active: active, onClick: handleClick, ...props, children: [
    /* @__PURE__ */ jsxs32(ContentSlot, { children: [
      icon,
      children
    ] }),
    badge && /* @__PURE__ */ jsx59(BadgeSlot, { children: badge })
  ] });
};

// src/ui/components/Navigation/Sidebar/SidebarFooter.tsx
import { styled as styled101 } from "styled-components";
var SidebarFooter = styled101.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[3]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.surface};
  box-sizing: border-box;
  gap: ${({ theme }) => theme.spacing[2]};
`;

// src/ui/components/Navigation/Sidebar/SidebarToggle.tsx
import { Icon as Icon17 } from "core-react/icons";
import "react";
import { styled as styled102, css as css34 } from "styled-components";
import { jsx as jsx60 } from "react/jsx-runtime";
var ToggleButton2 = styled102.button`
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

  ${({ $breakpoint, theme }) => $breakpoint && css34`
      @media (max-width: ${theme.breakpoints[$breakpoint]}) {
        display: inline-flex;
      }
    `}
`;
var SidebarToggle = ({ children, ...props }) => {
  const { isOpen, toggle, breakpoint } = useSidebar();
  return /* @__PURE__ */ jsx60(
    ToggleButton2,
    {
      type: "button",
      $breakpoint: breakpoint,
      onClick: toggle,
      "aria-expanded": isOpen,
      "aria-label": "Basculer la barre lat\xE9rale",
      ...props,
      children: children ?? /* @__PURE__ */ jsx60(Icon17, { name: isOpen ? "close" : "menu", size: 25 })
    }
  );
};

// src/ui/components/Navigation/Tabs/TabContent.tsx
import { styled as styled103 } from "styled-components";

// src/ui/components/Navigation/Tabs/TabsContext.tsx
import { createContext as createContext7, useContext as useContext8 } from "react";
var TabsContext = createContext7(null);
var useTabs = () => {
  const context = useContext8(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a <Tabs>");
  }
  return context;
};

// src/ui/components/Navigation/Tabs/TabContent.tsx
import { jsx as jsx61 } from "react/jsx-runtime";
var ContentWrapper3 = styled103.div`
  padding-top: ${({ theme }) => theme.spacing[4]};
`;
var TabContent = ({ value, children, ...rest }) => {
  const { activeTab } = useTabs();
  if (activeTab !== value) return null;
  return /* @__PURE__ */ jsx61(ContentWrapper3, { role: "tabpanel", ...rest, children });
};

// src/ui/components/Navigation/Tabs/TabList.tsx
import { styled as styled104 } from "styled-components";
var TabList = styled104.div.attrs({
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
import { useState as useState10 } from "react";
import { styled as styled105 } from "styled-components";
import { jsx as jsx62 } from "react/jsx-runtime";
var TabsRoot = styled105.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  min-width: 0;
`;
var Tabs = ({ defaultValue = "", value, onValueChange, children, ...rest }) => {
  const [internalValue, setInternalValue] = useState10(defaultValue);
  const activeTab = value !== void 0 ? value : internalValue;
  const setActiveTab = (nextValue) => {
    if (value === void 0) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };
  return /* @__PURE__ */ jsx62(TabsContext.Provider, { value: { activeTab, setActiveTab }, children: /* @__PURE__ */ jsx62(TabsRoot, { ...rest, children }) });
};

// src/ui/components/Navigation/Tabs/TabTrigger.tsx
import { styled as styled106, css as css35 } from "styled-components";
import { jsx as jsx63 } from "react/jsx-runtime";
var TriggerButton2 = styled106.button`
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

  ${({ $active, theme }) => $active && css35`
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
  return /* @__PURE__ */ jsx63(
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
import { useTheme as useTheme3 } from "core-react/theme";
import "react";
import { jsx as jsx64 } from "react/jsx-runtime";
var ICON_ONLY_OPTIONS = [
  { value: "system", icon: "laptop", title: "Syst\xE8me (suit le r\xE9glage de votre appareil)" },
  { value: "light", icon: "white-balance-sunny", title: "Th\xE8me clair" },
  { value: "dark", icon: "weather-night", title: "Th\xE8me sombre" }
];
var ThemeModeSwitcher = ({ ...props }) => {
  const { preference, setPreference } = useTheme3();
  return /* @__PURE__ */ jsx64(
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
import { styled as styled107 } from "styled-components";
var displaySizes = {
  1: "5rem",
  2: "4.5rem",
  3: "4rem",
  4: "3.5rem",
  5: "3rem",
  6: "2.5rem"
};
var Display = styled107.h1.attrs((props) => ({
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
import { styled as styled108 } from "styled-components";
var Lead = styled108.p.attrs((props) => ({
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
import { styled as styled109, css as css36 } from "styled-components";
var weightMap = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};
var Text = styled109.span.attrs((props) => ({
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

  ${({ as, theme }) => as === "pre" && css36`
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
import { styled as styled110 } from "styled-components";
var titleSizes = {
  h1: "2.25rem",
  h2: "1.875rem",
  h3: "1.5rem",
  h4: "1.25rem",
  h5: "1.125rem",
  h6: "1rem"
};
var Title3 = styled110.h1.attrs((props) => ({
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
import { createGlobalStyle } from "styled-components";
var GlobalStyle = createGlobalStyle`
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
import {
  UIProvider,
  useLinkProps as useLinkProps8,
  useUI as useUI4
} from "core-react";
import {
  DS_ICON_ALIASES,
  DS_ICONS,
  Icon as Icon18,
  iconNames,
  OUTLINE_COMPAT_ALIASES
} from "core-react/icons";
export {
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
  Container3 as Container,
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
  Icon18 as Icon,
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
  SkeletonCircle,
  SkeletonGroup,
  SkeletonLine,
  SkeletonText,
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
  Title3 as Title,
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
  useLinkProps8 as useLinkProps,
  useMarkdown,
  useNavbar,
  useSidebar,
  useTabs,
  useToast,
  useToastStore,
  useUI4 as useUI
};
//# sourceMappingURL=index.js.map