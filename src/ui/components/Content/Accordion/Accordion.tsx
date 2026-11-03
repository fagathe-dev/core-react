import type { BaseComponentProps } from '../../../types';
import { styled } from 'styled-components';
import { AccordionContent } from './AccordionContent';
import type { AccordionProviderProps } from './AccordionContext';
import { AccordionProvider } from './AccordionContext';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';

const Container = styled.div<BaseComponentProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export interface AccordionProps extends Omit<BaseComponentProps, 'children'>, AccordionProviderProps {}

const BaseAccordion = ({ children, multiple, defaultActiveKeys, ...rest }: AccordionProps) => {
  return (
    <AccordionProvider multiple={multiple} defaultActiveKeys={defaultActiveKeys}>
      <Container {...rest}>{children}</Container>
    </AccordionProvider>
  );
};

export const Accordion = Object.assign(BaseAccordion, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
