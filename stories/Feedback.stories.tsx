import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Alert,
  Button,
  ConfirmDialog,
  Dialog,
  Drawer,
  Flex,
  Loading,
  Modal,
  Progress,
  Skeleton,
  SkeletonCircle,
  SkeletonGroup,
  SkeletonLine,
  SkeletonText,
  Toast,
  ToastContainer,
  Tooltip,
  useToast,
} from 'core-react/ui';
import { useState } from 'react';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  args: { title: 'Publication envoyée', children: 'Elle sera visible après modération.' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { variant: 'info' },
};

export const Variants: Story = {
  render: () => (
    <Flex $direction="column" $gap="0.75rem">
      <Alert variant="primary" title="Primary">
        Message
      </Alert>
      <Alert variant="success" title="Succès">
        Message
      </Alert>
      <Alert variant="warning" title="Avertissement">
        Message
      </Alert>
      <Alert variant="danger" title="Erreur">
        Message
      </Alert>
      <Alert variant="info" title="Information">
        Message
      </Alert>
    </Flex>
  ),
};

export const Loaders: Story = {
  render: () => (
    <Flex $direction="column" $gap="1rem" style={{ maxWidth: 320 }}>
      <Flex $gap="1rem" $align="center">
        <Loading size="sm" />
        <Loading />
        <Loading size="lg" />
      </Flex>
      <Progress value={60} />
      <Progress value={100} variant="success" />
    </Flex>
  ),
};

export const Skeletons: Story = {
  render: () => (
    <Flex $direction="column" $gap="1.5rem" style={{ maxWidth: 360 }}>
      <Flex $gap="0.75rem" $align="center">
        <Skeleton $variant="rectangular" $width={48} $height={48} />
        <Skeleton $variant="rounded" $width={96} $height={48} />
        <Skeleton $width={48} $height={48} $radius="50% 0" />
        <SkeletonCircle $size={48} />
      </Flex>
      <Flex $direction="column" $gap="0.5rem">
        <SkeletonLine $width="40%" $height="1.25rem" />
        <SkeletonLine $width="25%" />
      </Flex>
      <Flex $gap="1rem">
        <Skeleton $animation="pulse" $width="50%" $height={24} />
        <Skeleton $animation="none" $width="50%" $height={24} />
      </Flex>
      {/* Carte composée : avatar + titre, paragraphe, pied */}
      <SkeletonGroup label="Chargement de la publication…">
        <Flex $direction="column" $gap="0.75rem">
          <Flex $gap="0.75rem" $align="center">
            <SkeletonCircle />
            <Flex $direction="column" $gap="0.375rem" style={{ flex: 1 }}>
              <SkeletonLine $width="50%" $height="0.875rem" />
              <SkeletonLine $width="30%" $height="0.625rem" />
            </Flex>
          </Flex>
          <Skeleton $variant="rounded" $height={140} />
          <SkeletonText lines={3} />
        </Flex>
      </SkeletonGroup>
    </Flex>
  ),
};

export const Tooltips: Story = {
  render: () => (
    <div style={{ padding: '3rem' }}>
      <Tooltip content="Enregistrer la publication" placement="top">
        <Button $variant="outline">Survolez-moi</Button>
      </Tooltip>
    </div>
  ),
};

const ConfirmExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button $variant="danger" onClick={() => setIsOpen(true)}>
        Supprimer
      </Button>
      <ConfirmDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title="Supprimer la publication ?"
        message="Cette action est définitive."
      />
    </>
  );
};

export const Confirm: Story = {
  render: () => <ConfirmExample />,
};

const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Ouvrir</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header title="Nouvelle publication" onClose={() => setIsOpen(false)} />
        <Modal.Body>Partagez quelque chose avec votre communauté.</Modal.Body>
        <Modal.Footer>
          <Button $variant="ghost" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button>Publier</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const ModalWindow: Story = {
  render: () => <ModalExample />,
};

const DialogExample = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Ouvrir</Button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Contenu de la boîte de dialogue.
      </Dialog>
    </>
  );
};

export const SimpleDialog: Story = {
  render: () => <DialogExample />,
};

const DrawerExample = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Ouvrir</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Drawer.Header title="Réglages du bloc" onClose={() => setIsOpen(false)} />
        <Drawer.Body>Options du bloc sélectionné.</Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setIsOpen(false)}>Fermer</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export const SidePanel: Story = {
  render: () => <DrawerExample />,
};

const ToastExample = () => {
  const { success, error } = useToast();
  return (
    <Flex $gap="0.5rem">
      <Button onClick={() => success('Publication envoyée', 'Succès')}>Succès</Button>
      <Button $variant="danger" onClick={() => error("Échec de l'envoi", 'Erreur')}>
        Erreur
      </Button>
      <ToastContainer />
    </Flex>
  );
};

export const Toasts: Story = {
  render: () => <ToastExample />,
};

export const ToastVariants: Story = {
  render: () => (
    <Flex $direction="column" $gap="0.5rem" style={{ maxWidth: 360 }}>
      <Toast variant="info" title="Information">
        Message
      </Toast>
      <Toast variant="success" title="Succès">
        Message
      </Toast>
      <Toast variant="warning" title="Avertissement">
        Message
      </Toast>
      <Toast variant="danger" title="Erreur">
        Message
      </Toast>
    </Flex>
  ),
};
