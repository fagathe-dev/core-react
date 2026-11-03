import { styled } from 'styled-components';
import type { ModalProps } from './Modal';
import { Modal } from './Modal';

const DialogContent = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  text-align: center;
`;

export interface DialogProps extends ModalProps {}

export const Dialog = ({ children, maxWidth = '420px', ...rest }: DialogProps) => {
  return (
    <Modal maxWidth={maxWidth} {...rest}>
      <DialogContent>{children}</DialogContent>
    </Modal>
  );
};
