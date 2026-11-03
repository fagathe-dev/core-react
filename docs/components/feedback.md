# Documentation des Composants Feedback

Ce document détaille l'utilisation des composants de rétroaction visuelle (`Alert`, `Loading`, `Progress`, `Skeleton`, `Modal`, `Dialog`, `ConfirmDialog`, `Toast`, `Drawer`, `Tooltip`) dans l'application React.

Conformément à l'architecture du projet, chaque sous-dossier expose ses modules via un fichier `index.ts`. Tous les composants présentés s'importent directement depuis l'index central :

```tsx
import {
  Alert,
  ConfirmDialog,
  Dialog,
  Drawer,
  Loading,
  Modal,
  Progress,
  Skeleton,
  Toast,
  ToastContainer,
  Tooltip,
  useToast,
} from 'core-react/ui';
```

---

## 1. Alert

Affiche des messages contextuels statiques d'information, de succès, d'avertissement ou d'erreur.

### Props

| Prop | Type | Défaut | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` | Variante sémantique déterminant les couleurs et l'icône par défaut |
| `title` | `string` | `undefined` | Titre optionnel mis en avant en gras |
| `onClose` | `() => void` | `undefined` | Déclenche l'affichage d'un bouton de fermeture (`IconButton`) |
| `showIcon` | `boolean` | `true` | Affiche ou masque l'icône associée à la variante |
| `children` | `React.ReactNode` | — | Corps du message |

### Exemple d'utilisation

```tsx
import { Alert } from 'core-react/ui';

export const PostFeedback = () => (
  <Alert onClose="{()" title="Publication réussie" variant="success"> {}}>
    Le post a bien été mis en ligne et synchronisé avec le front-office.
  </Alert>
);
```

---

## 2. Loading

Indicateur d'attente animé sous forme de SVG vectoriel rotatif.

### Props

| Prop | Type | Défaut | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'sm' \| 'base' \| 'lg'` | `'base'` | Taille du spinner (`sm: 16px`, `base: 24px`, `lg: 36px`) |
| `color` | `string` | `theme.colors.primary.base` | Couleur CSS personnalisée |
| `label` | `string` | `'Chargement en cours…'` | Texte alternatif pour l'accessibilité (`aria-label`) |

---

## 3. Progress

Barre de progression linéaire horizontale avec animation fluide des changements d'état.

### Props

| Prop | Type | Défaut | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | — | Valeur courante exprimée en pourcentage (`0` à `100`) |
| `height` | `string` | `'6px'` | Épaisseur personnalisée de la piste |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Couleur sémantique de la barre active |

---

## 4. Skeleton

Bloc temporaire animé simulant la forme des contenus avant leur chargement effectif.

### Props

| Prop | Type | Défaut | Description |
| :--- | :--- | :--- | :--- |
| `$variant` | `'text' \| 'circular' \| 'rectangular'` | `'text'` | Forme géométrique et rayon de courbure |
| `$width` | `string \| number` | `'100%'` | Largeur du conteneur (nombre en pixels ou chaîne CSS) |
| `$height` | `string \| number` | Auto selon variante | Hauteur du conteneur (`1rem` par défaut pour `'text'`) |

---

## 5. Modal, Dialog & ConfirmDialog

Boîtes de dialogue modales isolées dans un portail React (`createPortal`) au niveau du `document.body`, bloquant le scroll parent et écoutant la touche `Escape`.

### 5.1. Modal (Composant composé)
* `Modal` : Conteneur racine (`isOpen`, `onClose`, `maxWidth = '520px'`, `closeOnBackdrop = true`).
* `Modal.Header` : En-tête avec `title?: string` et `onClose?: () => void`.
* `Modal.Body` : Corps avec défilement interne automatique.
* `Modal.Footer` : Pied de modale aligné à droite pour les boutons d'action.

### 5.2. Dialog
Variante centrée et compacte de `Modal` (`maxWidth = '420px'`).

### 5.3. ConfirmDialog
Modale de confirmation préconfigurée pour les actions sensibles (ex. suppression).

| Prop | Type | Défaut | Description |
| :--- | :--- | :--- | :--- |
| `isOpen` | `boolean` | — | Contrôle la visibilité |
| `onClose` | `() => void` | — | Action d'annulation/fermeture |
| `onConfirm` | `() => void` | — | Action de validation |
| `title` | `string` | — | Titre de l'en-tête |
| `message` | `string` | — | Message d'avertissement |
| `confirmLabel` | `string` | `'Confirmer'` | Libellé du bouton de confirmation |
| `cancelLabel` | `string` | `'Annuler'` | Libellé du bouton d'annulation |
| `variant` | `'danger' \| 'primary' \| 'warning'` | `'danger'` | Style sémantique de l'icône et du bouton |
| `loading` | `boolean` | `false` | État de chargement sur les boutons |

---

## 6. Toast & useToast (Notifications flottantes)

Système de notifications éphémères non bloquantes piloté par un store Zustand (`useToastStore`) et rendu dans un portail en bas à droite de l'écran via `<ToastContainer />`.

### 6.1. Initialisation
Placez `<ToastContainer />` une seule fois à la racine de l'application (ex. dans `App.tsx`).

### 6.2. Déclenchement via le hook `useToast`
Le hook expose des méthodes rapides qui génèrent automatiquement un identifiant et suppriment la notification au bout de `4000ms` (par défaut) :
* `toast.success(message: string, title?: string)`
* `toast.error(message: string, title?: string)`
* `toast.warning(message: string, title?: string)`
* `toast.info(message: string, title?: string)`
* `toast.toast({ message, title, variant, duration })` : Permet de personnaliser la durée (`duration: 0` pour désactiver la fermeture automatique).
* `toast.dismiss(id: string)` : Ferme manuellement une notification.

### Exemple d'utilisation

```tsx
import { Button, useToast } from 'core-react/ui';

export const SavePostButton = () => {
  const { success, error } = useToast();

  const handleSave = async () => {
    try {
      // Appel API
      success('Les blocs ont été enregistrés.', 'Brouillon sauvegardé');
    } catch {
      error('Impossible de joindre le serveur API.', 'Erreur de sauvegarde');
    }
  };

  return <Button onClick="{handleSave}">Enregistrer (Ctrl+S)</Button>;
};
```

---

## 7. Drawer (Panneau latéral coulissant)

Tiroir latéral superposé rendu dans un portail (`createPortal`), idéal pour éditer les métadonnées SEO d'un article ou les paramètres avancés d'un bloc sans quitter l'éditeur des yeux.

### Sous-composants
* `Drawer` : Conteneur racine gérant le `Backdrop`, le blocage du scroll et la touche `Escape`.
* `Drawer.Header` : En-tête acceptant `title?: string` et `onClose?: () => void`.
* `Drawer.Body` : Zone centrale extensible (`flex: 1`) avec défilement vertical automatique.
* `Drawer.Footer` : Pied de panneau aligné à droite pour les boutons d'action.

### Props de `Drawer`

| Prop | Type | Défaut | Description |
| :--- | :--- | :--- | :--- |
| `isOpen` | `boolean` | — | Contrôle l'ouverture du tiroir |
| `onClose` | `() => void` | — | Callback déclenché à la fermeture |
| `placement` | `'right' \| 'left'` | `'right'` | Côté d'apparition de l'écran |
| `width` | `string` | `'420px'` | Largeur maximale du panneau |
| `closeOnBackdrop` | `boolean` | `true` | Autorise la fermeture au clic sur le fond |

### Exemple d'utilisation

```tsx
import { useState } from 'react';
import { Button, Drawer, TextField, TextareaField } from 'core-react/ui';

export const SeoSettingsDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick="{()" $variant="outline"> setOpen(true)}>
        Paramètres SEO
      </Button>

      <Drawer isOpen="{open}" onClose="{()"> setOpen(false)} placement="right" width="440px">
        <Drawer.Header onClose="{()" title="Optimisation SEO"> setOpen(false)} />
        <Drawer.Body>
          <TextField label="Meta Title" placeholder="Titre pour Google…"/>
          <TextareaField label="Meta Description" rows="{4}"/>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick="{()" $variant="ghost"> setOpen(false)}>Fermer</Button>
          <Button onClick="{()" $variant="primary"> setOpen(false)}>Appliquer</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};
```

---

## 8. Tooltip

Infobulle légère s'affichant au survol (`:hover`) ou au focus (`:focus-within`) autour d'un élément déclencheur (particulièrement utile sur les `IconButton`).

### Props

| Prop | Type | Défaut | Description |
| :--- | :--- | :--- | :--- |
| `content` | `React.ReactNode` | — | Texte ou élément affiché dans la bulle |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position de la bulle par rapport à l'enfant |

### Exemple d'utilisation

```tsx
import { IconButton, Tooltip } from 'core-react/ui';

export const BlockActionBtn = () => (
  <Tooltip content="Dupliquer ce bloc" placement="top">
    <IconButton aria-label="Dupliquer ce bloc" name="content-copy" size="sm"/>
  </Tooltip>
);
```