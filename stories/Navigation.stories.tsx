import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Breadcrumb,
  Dropdown,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarDropdown,
  NavbarDropdownDivider,
  NavbarDropdownHeader,
  NavbarDropdownItem,
  NavbarDropdownMenu,
  NavbarDropdownToggle,
  NavbarItem,
  NavbarLink,
  NavbarNav,
  NavbarToggle,
  Pagination,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLink,
  SidebarNav,
  SidebarSection,
  SidebarToggle,
  TabContent,
  TabList,
  Tabs,
  TabTrigger,
  ThemeModeSwitcher,
} from 'core-react/ui';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="discover">
      <TabList>
        <TabTrigger value="discover">Découvrir</TabTrigger>
        <TabTrigger value="communities">Mes communautés</TabTrigger>
        <TabTrigger value="trends" disabled>
          Tendances
        </TabTrigger>
      </TabList>
      <TabContent value="discover">Les communautés à découvrir.</TabContent>
      <TabContent value="communities">Vos communautés.</TabContent>
      <TabContent value="trends">Les tendances de la semaine.</TabContent>
    </Tabs>
  ),
};

export const Breadcrumbs: Story = {
  render: () => (
    <Breadcrumb
      items={[{ label: 'Accueil', to: '/' }, { label: 'Communautés', to: '/g' }, { label: 'Photographie' }]}
    />
  ),
};

const PaginationExample = () => {
  const [page, setPage] = useState(3);
  return <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />;
};

export const Pages: Story = {
  render: () => <PaginationExample />,
};

export const Menu: Story = {
  render: () => (
    <div style={{ minHeight: 180 }}>
      <Dropdown>
        <Dropdown.Trigger>Options</Dropdown.Trigger>
        <Dropdown.Menu align="left">
          <Dropdown.Item icon="cog-outline">Paramètres</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon="trash-can-outline" variant="danger">
            Supprimer
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
};

export const TopBar: Story = {
  render: () => (
    <Navbar breakpoint="md">
      <NavbarBrand>Gather</NavbarBrand>
      <NavbarToggle aria-label="Ouvrir le menu" />
      <NavbarCollapse>
        <NavbarNav>
          <NavbarItem>
            <NavbarLink href="/" $active>
              Découvrir
            </NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink href="/communautes">Mes communautés</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarDropdown>
              <NavbarDropdownToggle>Compte</NavbarDropdownToggle>
              <NavbarDropdownMenu>
                <NavbarDropdownHeader>Clara</NavbarDropdownHeader>
                <NavbarDropdownItem href="/profil">Profil</NavbarDropdownItem>
                <NavbarDropdownDivider />
                <NavbarDropdownItem>Déconnexion</NavbarDropdownItem>
              </NavbarDropdownMenu>
            </NavbarDropdown>
          </NavbarItem>
        </NavbarNav>
      </NavbarCollapse>
    </Navbar>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: 'Mes communautés' });
    await expect(link).toHaveAttribute('href', '/communautes');
  },
};

export const SideMenu: Story = {
  render: () => (
    <div style={{ minHeight: 320 }}>
      <Sidebar breakpoint="md">
        <SidebarHeader>
          Gather
          <SidebarToggle aria-label="Fermer le menu" />
        </SidebarHeader>
        <SidebarNav>
          <SidebarSection>Navigation</SidebarSection>
          <SidebarItem>
            <SidebarLink href="/" active>
              Découvrir
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink href="/messages">Messages</SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink>Paramètres</SidebarLink>
          </SidebarItem>
        </SidebarNav>
        <SidebarFooter>Clara</SidebarFooter>
      </Sidebar>
    </div>
  ),
};

export const ThemeSwitcher: Story = {
  render: () => <ThemeModeSwitcher />,
};
