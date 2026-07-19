import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SettingsIcon from '@mui/icons-material/Settings';
import type { SvgIconComponent } from '@mui/icons-material';

export interface NavItem {
  label: string; // shown when sidebar is expanded
  path: string; // route it links to
  icon: SvgIconComponent; // shown always (collapsed or expanded)
}

// Add/remove pages here — the Sidebar reads this list automatically.
export const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: DashboardIcon },
  { label: 'Items', path: '/items', icon: Inventory2Icon }, // example CRUD page
  { label: 'Branches', path: '/branches', icon: AccountTreeIcon },
  { label: 'Settings', path: '/settings', icon: SettingsIcon },
];
