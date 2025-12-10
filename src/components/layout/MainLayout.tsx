import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  TextField,
  InputAdornment,
  Fab,
  Switch,
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Popover,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  DirectionsCar as CarIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Add as AddIcon,
  ContentCopy as CopyIcon,
  Group as GroupIcon,
  NotificationsOff as NotificationsOffIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Check as CheckIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import type { ThemeMode } from '../../theme/themes';
import { colors } from '../../theme/themes';
import { VehicleMap } from '../map/VehicleMap';
import { NewCaseModal } from '../cases/NewCaseModal';
import { NotificationSettingsModal } from '../settings/NotificationSettingsModal';

const drawerWidth = 438; // 50% wider than original 280 (another 25% from 350)

// Order options for sorting
const orderOptions = [
  { value: 'alpha-asc', label: 'Alphabetical A-Z' },
  { value: 'alpha-desc', label: 'Alphabetical Z-A' },
  { value: 'newest', label: 'Newest to Oldest' },
  { value: 'oldest', label: 'Oldest to Newest' },
  { value: 'nearest', label: 'Nearest to Farthest' },
  { value: 'farthest', label: 'Farthest to Nearest' },
];

// Mock cases data for the sidebar
type CaseStatus = 'active' | 'requested' | 'inactive';

interface CaseMember {
  email: string;
  isYou: boolean;
}

interface VehicleLocation {
  lat: number;
  lng: number;
  address?: string;
  timestamp?: string;
}

interface CaseData {
  id: string;
  caseNumber: string;
  vehicle: string;
  vin: string;
  status: CaseStatus;
  timeAtLocation: string;
  licensePlate?: string;
  location?: VehicleLocation;
  locationHistory?: VehicleLocation[];
  members?: CaseMember[];
  settings?: {
    activeSearchMode: boolean;
    vehicleStationaryAlert: boolean;
    pauseNotifications: boolean;
    badVehicleLocation: boolean;
  };
}

const mockCases: CaseData[] = [
  {
    id: '1',
    caseNumber: '2021-03-13-002',
    vehicle: '2021 White Jeep Grand Cherokee',
    vin: '4Y1SL65848Z411439',
    status: 'requested' as CaseStatus,
    timeAtLocation: 'Requested',
    licensePlate: 'E3JSON',
    location: { lat: 37.7749, lng: -122.4194, address: '123 Market St, San Francisco', timestamp: 'Dec 9, 2025, 10:36 am' },
    members: [
      { email: 'jane.doe@lapd.org', isYou: true },
      { email: 'f.poncherello@lapd.org', isYou: false },
      { email: 'ty.boyd@lapd.org', isYou: false },
    ],
    settings: {
      activeSearchMode: false,
      vehicleStationaryAlert: true,
      pauseNotifications: false,
      badVehicleLocation: false,
    },
  },
  {
    id: '2',
    caseNumber: '2021-03-14-001',
    vehicle: '2020 Black BMW X5',
    vin: '5UXCR6C55KLL12345',
    status: 'inactive' as CaseStatus,
    timeAtLocation: 'Inactive',
    licensePlate: 'BMW2020',
    location: { lat: 37.7849, lng: -122.4094, address: '456 Mission St, San Francisco', timestamp: 'Dec 8, 2025, 3:22 pm' },
    members: [
      { email: 'jane.doe@lapd.org', isYou: true },
      { email: 'm.johnson@lapd.org', isYou: false },
    ],
    settings: {
      activeSearchMode: false,
      vehicleStationaryAlert: false,
      pauseNotifications: true,
      badVehicleLocation: false,
    },
  },
  {
    id: '3',
    caseNumber: '2021-03-15-003',
    vehicle: '2022 Red Tesla Model 3',
    vin: '5YJ3E1EA8NF123456',
    status: 'active' as CaseStatus,
    timeAtLocation: '20+ mins',
    licensePlate: 'TSLA22',
    location: { lat: 37.7649, lng: -122.4294, address: '789 Valencia St, San Francisco', timestamp: 'Dec 9, 2025, 11:15 am' },
    locationHistory: [
      { lat: 37.7629, lng: -122.4254, timestamp: 'Dec 9, 2025, 10:45 am' },
      { lat: 37.7609, lng: -122.4234, timestamp: 'Dec 9, 2025, 10:20 am' },
      { lat: 37.7589, lng: -122.4214, timestamp: 'Dec 9, 2025, 09:55 am' },
      { lat: 37.7569, lng: -122.4194, timestamp: 'Dec 9, 2025, 09:30 am' },
      { lat: 37.7549, lng: -122.4174, timestamp: 'Dec 9, 2025, 09:05 am' },
    ],
    members: [
      { email: 'jane.doe@lapd.org', isYou: true },
      { email: 'r.smith@lapd.org', isYou: false },
      { email: 'k.williams@lapd.org', isYou: false },
      { email: 'a.garcia@lapd.org', isYou: false },
    ],
    settings: {
      activeSearchMode: true,
      vehicleStationaryAlert: true,
      pauseNotifications: false,
      badVehicleLocation: false,
    },
  },
  {
    id: '4',
    caseNumber: '2021-03-16-004',
    vehicle: '2019 Silver Honda Accord',
    vin: '1HGCV1F34KA098765',
    status: 'active' as CaseStatus,
    timeAtLocation: '15 mins',
    licensePlate: 'HND2019',
    location: { lat: 37.7549, lng: -122.4394, address: '321 Castro St, San Francisco', timestamp: 'Dec 9, 2025, 11:20 am' },
    locationHistory: [
      { lat: 37.7539, lng: -122.4374, timestamp: 'Dec 9, 2025, 11:05 am' },
      { lat: 37.7529, lng: -122.4354, timestamp: 'Dec 9, 2025, 10:50 am' },
      { lat: 37.7519, lng: -122.4334, timestamp: 'Dec 9, 2025, 10:35 am' },
    ],
    members: [
      { email: 'jane.doe@lapd.org', isYou: true },
    ],
    settings: {
      activeSearchMode: true,
      vehicleStationaryAlert: true,
      pauseNotifications: false,
      badVehicleLocation: false,
    },
  },
  {
    id: '5',
    caseNumber: '2021-03-17-005',
    vehicle: '2023 Blue Ford F-150',
    vin: '1FTFW1E85NFA54321',
    status: 'active' as CaseStatus,
    timeAtLocation: '5 mins',
    licensePlate: 'FRD150',
    location: { lat: 37.7849, lng: -122.4494, address: '555 Haight St, San Francisco', timestamp: 'Dec 9, 2025, 11:30 am' },
    locationHistory: [
      { lat: 37.7839, lng: -122.4474, timestamp: 'Dec 9, 2025, 11:25 am' },
      { lat: 37.7829, lng: -122.4454, timestamp: 'Dec 9, 2025, 11:15 am' },
      { lat: 37.7819, lng: -122.4434, timestamp: 'Dec 9, 2025, 11:00 am' },
      { lat: 37.7809, lng: -122.4414, timestamp: 'Dec 9, 2025, 10:45 am' },
    ],
    members: [
      { email: 'jane.doe@lapd.org', isYou: true },
      { email: 'd.martinez@lapd.org', isYou: false },
    ],
    settings: {
      activeSearchMode: true,
      vehicleStationaryAlert: false,
      pauseNotifications: false,
      badVehicleLocation: false,
    },
  },
  {
    id: '6',
    caseNumber: '2021-03-18-006',
    vehicle: '2021 Gray Toyota Camry',
    vin: '4T1BF1FK5MU789012',
    status: 'requested' as CaseStatus,
    timeAtLocation: 'Requested',
    licensePlate: 'CAMRY21',
    location: { lat: 37.7949, lng: -122.3994, address: '888 Embarcadero, San Francisco', timestamp: 'Dec 9, 2025, 09:45 am' },
    members: [
      { email: 'jane.doe@lapd.org', isYou: true },
    ],
    settings: {
      activeSearchMode: false,
      vehicleStationaryAlert: true,
      pauseNotifications: false,
      badVehicleLocation: false,
    },
  },
  {
    id: '7',
    caseNumber: '2021-03-19-007',
    vehicle: '2020 White Mercedes GLE',
    vin: '4JGFB4KB2LA567890',
    status: 'active' as CaseStatus,
    timeAtLocation: '30+ mins',
    licensePlate: 'MRCDS20',
    location: { lat: 37.7699, lng: -122.4664, address: '1234 Golden Gate Ave, San Francisco', timestamp: 'Dec 9, 2025, 11:05 am' },
    locationHistory: [
      { lat: 37.7689, lng: -122.4644, timestamp: 'Dec 9, 2025, 10:35 am' },
      { lat: 37.7679, lng: -122.4624, timestamp: 'Dec 9, 2025, 10:05 am' },
      { lat: 37.7669, lng: -122.4604, timestamp: 'Dec 9, 2025, 09:35 am' },
      { lat: 37.7659, lng: -122.4584, timestamp: 'Dec 9, 2025, 09:05 am' },
      { lat: 37.7649, lng: -122.4564, timestamp: 'Dec 9, 2025, 08:35 am' },
      { lat: 37.7639, lng: -122.4544, timestamp: 'Dec 9, 2025, 08:05 am' },
    ],
    members: [
      { email: 'jane.doe@lapd.org', isYou: true },
      { email: 'b.wilson@lapd.org', isYou: false },
      { email: 'c.anderson@lapd.org', isYou: false },
    ],
    settings: {
      activeSearchMode: true,
      vehicleStationaryAlert: true,
      pauseNotifications: false,
      badVehicleLocation: true,
    },
  },
  {
    id: '8',
    caseNumber: '2021-03-20-008',
    vehicle: '2022 Black Audi Q7',
    vin: 'WA1LAAF79ND234567',
    status: 'inactive' as CaseStatus,
    timeAtLocation: 'Inactive',
    licensePlate: 'AUDIQ7',
    location: { lat: 37.7599, lng: -122.4094, address: '999 Potrero Ave, San Francisco' },
    members: [
      { email: 'jane.doe@lapd.org', isYou: true },
      { email: 'e.thompson@lapd.org', isYou: false },
    ],
    settings: {
      activeSearchMode: false,
      vehicleStationaryAlert: false,
      pauseNotifications: true,
      badVehicleLocation: false,
    },
  },
];

const getStatusIcon = (status: CaseStatus) => {
  switch (status) {
    case 'active':
      return <CarIcon sx={{ color: '#49B27E', fontSize: 20 }} />;
    case 'requested':
      return <DownloadIcon sx={{ color: '#F5A623', fontSize: 20 }} />;
    case 'inactive':
      return <CloseIcon sx={{ color: '#FF5252', fontSize: 20 }} />;
    default:
      return <CarIcon sx={{ color: '#49B27E', fontSize: 20 }} />;
  }
};

const getStatusColor = (status: CaseStatus) => {
  switch (status) {
    case 'active':
      return '#49B27E';
    case 'requested':
      return '#F5A623';
    case 'inactive':
      return '#FF5252';
    default:
      return '#49B27E';
  }
};

const getStatusBgColor = (status: CaseStatus) => {
  switch (status) {
    case 'active':
      return 'rgba(73, 178, 126, 0.15)';
    case 'requested':
      return 'rgba(245, 166, 35, 0.15)';
    case 'inactive':
      return 'rgba(255, 82, 82, 0.15)';
    default:
      return 'rgba(73, 178, 126, 0.15)';
  }
};

interface MainLayoutProps {
  currentTheme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ currentTheme = 'dark', onThemeChange }) => {
  // Get theme-aware colors
  const isDark = currentTheme === 'dark';
  const modeColors = isDark ? colors.dark : colors.light;

  // Toggle Row Component for Case Details (inside MainLayout to access modeColors)
  const ToggleRow: React.FC<{
    icon: React.ReactNode;
    label: string;
    checked: boolean;
    onChange: () => void;
  }> = ({ icon, label, checked, onChange }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1.5,
        borderBottom: `1px solid ${modeColors.border}`,
        '&:last-of-type': {
          borderBottom: 'none',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ color: modeColors.text.secondary, display: 'flex', alignItems: 'center' }}>{icon}</Box>
        <Typography variant="body2" sx={{ color: modeColors.text.primary }}>{label}</Typography>
      </Box>
      <Switch
        checked={checked}
        onChange={onChange}
        size="small"
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#00BFA5',
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#00BFA5',
          },
          '& .MuiSwitch-track': {
            backgroundColor: modeColors.buttonGray,
          },
        }}
      />
    </Box>
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [caseSettings, setCaseSettings] = useState<CaseData['settings'] | null>(null);
  const [caseMembers, setCaseMembers] = useState<CaseMember[]>([]);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  const [closeCaseDialogOpen, setCloseCaseDialogOpen] = useState(false);
  const [closeCaseReason, setCloseCaseReason] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [attestChecked, setAttestChecked] = useState(false);
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
  const [newCaseModalOpen, setNewCaseModalOpen] = useState(false);
  const [notificationSettingsModalOpen, setNotificationSettingsModalOpen] = useState(false);
  const [statusFilters, setStatusFilters] = useState({
    active: true,
    requested: true,
    inactive: true,
  });
  const [selectedOrder, setSelectedOrder] = useState<string[]>(['newest']);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    navigate('/login');
  };

  const handleCaseSelect = (caseItem: CaseData) => {
    setSelectedCase(caseItem);
    setCaseSettings(caseItem.settings || null);
    setCaseMembers(caseItem.members || []);
    if (isMobile) {
      setMobileOpen(false); // Close the cases list drawer
      setMobileDetailOpen(true); // Open the case details bottom sheet
    }
  };

  const handleBackToList = () => {
    setSelectedCase(null);
    setCaseSettings(null);
    setCaseMembers([]);
    setMobileDetailOpen(false);
    if (isMobile) {
      setMobileOpen(true); // Reopen the cases list on mobile
    }
  };

  const handleAddMember = () => {
    if (newMemberEmail && attestChecked) {
      setCaseMembers((prev) => [...prev, { email: newMemberEmail, isYou: false }]);
      setNewMemberEmail('');
      setAttestChecked(false);
    }
  };

  const handleRemoveMember = (email: string) => {
    setCaseMembers((prev) => prev.filter((m) => m.email !== email));
  };

  const handleFilterChange = (status: keyof typeof statusFilters) => {
    setStatusFilters((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const handleOrderToggle = (value: string) => {
    setSelectedOrder((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleResetOrder = () => {
    setSelectedOrder([]);
  };

  // Filter cases based on status filters
  const filteredCases = mockCases.filter((c) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !c.caseNumber.toLowerCase().includes(query) &&
        !c.vehicle.toLowerCase().includes(query) &&
        !c.vin.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    // Status filter
    if (!statusFilters.active && !statusFilters.requested && !statusFilters.inactive) {
      return true; // Show all if no filter selected
    }
    return statusFilters[c.status];
  });

  const handleCopyVin = () => {
    if (selectedCase) {
      navigator.clipboard.writeText(selectedCase.vin);
    }
  };

  const handleToggle = (setting: keyof NonNullable<CaseData['settings']>) => {
    if (caseSettings) {
      setCaseSettings((prev) => prev ? ({
        ...prev,
        [setting]: !prev[setting],
      }) : null);
    }
  };

  // Cases List Content
  const casesListContent = (
    <Box sx={{ backgroundColor: modeColors.background.nav, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* FAB for adding new case */}
      <Fab
        color="primary"
        aria-label="add new case"
        onClick={() => setNewCaseModalOpen(true)}
        sx={{
          position: 'absolute',
          bottom: 24,
          right: 16,
          zIndex: 1,
          backgroundColor: '#00BFA5',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          '&:hover': {
            backgroundColor: '#00a893',
            transform: 'scale(1.1)',
          },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Active Cases Section */}
      <Box sx={{ pl: 2, pr: 1, pt: 2, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Typography variant="h6" fontWeight="600" sx={{ color: modeColors.text.primary, mb: 2 }}>
          Active Cases
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{
            mb: 1.5,
            '& .MuiOutlinedInput-root': {
              backgroundColor: modeColors.background.default,
              '& fieldset': { borderColor: modeColors.border },
              '&:hover fieldset': { borderColor: '#00BFA5' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: modeColors.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Filter and Sort buttons */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip
            icon={<FilterIcon sx={{ fontSize: 16 }} />}
            label="Filter"
            variant="outlined"
            size="small"
            onClick={(e) => setFilterAnchor(e.currentTarget)}
            sx={{
              borderColor: modeColors.border,
              color: modeColors.text.primary,
              backgroundColor: filterAnchor ? 'rgba(0, 191, 165, 0.15)' : 'transparent',
              px: 0.5,
              '&:hover': {
                borderColor: '#00BFA5',
                backgroundColor: 'rgba(0, 191, 165, 0.08)',
              },
            }}
          />
          <Chip
            icon={<SortIcon sx={{ fontSize: 16 }} />}
            label="Order"
            variant="outlined"
            size="small"
            onClick={(e) => setSortAnchor(e.currentTarget)}
            sx={{
              borderColor: modeColors.border,
              color: modeColors.text.primary,
              backgroundColor: sortAnchor ? 'rgba(0, 191, 165, 0.15)' : 'transparent',
              px: 0.5,
              '&:hover': {
                borderColor: '#00BFA5',
                backgroundColor: 'rgba(0, 191, 165, 0.08)',
              },
            }}
          />
        </Box>

        {/* Filter Popover */}
        <Popover
          open={Boolean(filterAnchor)}
          anchorEl={filterAnchor}
          onClose={() => setFilterAnchor(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              backgroundColor: modeColors.background.paper,
              border: `1px solid ${modeColors.border}`,
              borderRadius: 2,
              p: 2,
              minWidth: 160,
            },
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, color: modeColors.text.primary }}>
            Status
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={statusFilters.active}
                  onChange={() => handleFilterChange('active')}
                  size="small"
                  sx={{
                    color: '#00BFA5',
                    '&.Mui-checked': { color: '#00BFA5' },
                  }}
                />
              }
              label="Active"
              sx={{ '& .MuiFormControlLabel-label': { color: modeColors.text.primary, fontSize: '0.875rem' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={statusFilters.requested}
                  onChange={() => handleFilterChange('requested')}
                  size="small"
                  sx={{
                    color: '#00BFA5',
                    '&.Mui-checked': { color: '#00BFA5' },
                  }}
                />
              }
              label="Requested"
              sx={{ '& .MuiFormControlLabel-label': { color: modeColors.text.primary, fontSize: '0.875rem' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={statusFilters.inactive}
                  onChange={() => handleFilterChange('inactive')}
                  size="small"
                  sx={{
                    color: '#00BFA5',
                    '&.Mui-checked': { color: '#00BFA5' },
                  }}
                />
              }
              label="Inactive"
              sx={{ '& .MuiFormControlLabel-label': { color: modeColors.text.primary, fontSize: '0.875rem' } }}
            />
          </FormGroup>
        </Popover>

        {/* Order Popover */}
        <Popover
          open={Boolean(sortAnchor)}
          anchorEl={sortAnchor}
          onClose={() => setSortAnchor(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              backgroundColor: modeColors.background.paper,
              border: `1px solid ${modeColors.border}`,
              borderRadius: 2,
              p: 2,
              minWidth: 180,
            },
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, color: modeColors.text.primary }}>
            Order
          </Typography>
          {orderOptions.map((option) => (
            <Box
              key={option.value}
              onClick={() => handleOrderToggle(option.value)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 0.75,
                px: 0.5,
                cursor: 'pointer',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              {selectedOrder.includes(option.value) && (
                <CheckIcon sx={{ color: '#00BFA5', fontSize: 16, mr: 1 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: modeColors.text.primary,
                  fontSize: '0.875rem',
                  ml: selectedOrder.includes(option.value) ? 0 : 3,
                }}
              >
                {option.label}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ borderColor: modeColors.border, my: 1 }} />
          <Button
            onClick={handleResetOrder}
            size="small"
            sx={{
              color: '#00BFA5',
              textTransform: 'none',
              float: 'right',
              '&:hover': {
                backgroundColor: 'rgba(0, 191, 165, 0.08)',
              },
            }}
          >
            Reset
          </Button>
        </Popover>

        {/* Cases List - Scrollable */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: 6,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: modeColors.background.nav,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: modeColors.border,
              borderRadius: 3,
            },
          }}
        >
          {filteredCases.map((caseItem) => (
            <Box
              key={caseItem.id}
              onClick={() => handleCaseSelect(caseItem)}
              sx={{
                backgroundColor: modeColors.background.card,
                borderRadius: '10px',
                p: 2,
                mb: 1.5,
                mr: 1,
                cursor: 'pointer',
                border: `1px solid ${modeColors.border}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#00BFA5',
                  backgroundColor: modeColors.background.cardHover,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1.5,
                    backgroundColor: getStatusBgColor(caseItem.status),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {getStatusIcon(caseItem.status)}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: getStatusColor(caseItem.status),
                      fontWeight: 500,
                      fontSize: '1.12rem',
                      mb: 0.5,
                    }}
                  >
                    {caseItem.caseNumber}
                  </Typography>

                  <Typography variant="caption" sx={{ color: modeColors.text.primary, display: 'block', mb: 0.25 }}>
                    {caseItem.vehicle}
                  </Typography>

                  <Typography variant="caption" sx={{ color: modeColors.text.secondary }}>
                    Time:{' '}
                    <span style={{ color: getStatusColor(caseItem.status) }}>{caseItem.timeAtLocation}</span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}

          {filteredCases.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                color: modeColors.text.secondary,
              }}
            >
              <Typography variant="body2">No cases match your filters</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );

  // Case Details Content
  const caseDetailsContent = selectedCase && caseSettings && (
    <Box sx={{ backgroundColor: modeColors.background.nav, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      {/* Header with title and close button */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: modeColors.text.primary, fontWeight: 600 }}>
          Case Details
        </Typography>
        <IconButton
          onClick={handleBackToList}
          sx={{ color: modeColors.text.secondary, p: 0.5, '&:hover': { color: modeColors.text.primary } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Case Info */}
      <Box sx={{ px: 2, pt: 3, pb: 2, flex: 1 }}>
        {/* Case header with icon */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              backgroundColor: getStatusBgColor(selectedCase.status),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <CarIcon sx={{ color: getStatusColor(selectedCase.status), fontSize: 26 }} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: getStatusColor(selectedCase.status),
                fontWeight: 500,
                fontSize: '1.12rem',
                mb: 0.5,
              }}
            >
              {selectedCase.caseNumber}
            </Typography>

            <Typography variant="body2" sx={{ color: modeColors.text.primary, mb: 1 }}>
              {selectedCase.vehicle}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: modeColors.text.secondary }}>
                VIN:{' '}
              </Typography>
              <Typography variant="caption" sx={{ color: modeColors.text.primary, ml: 0.5, mr: 1 }}>
                {selectedCase.vin}
              </Typography>
              <IconButton
                size="small"
                onClick={handleCopyVin}
                sx={{ color: modeColors.text.secondary, p: 0.25 }}
              >
                <CopyIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>

            {selectedCase.licensePlate && (
              <Typography variant="caption" sx={{ color: modeColors.text.secondary, display: 'block', mb: 0.5 }}>
                License:{' '}
                <span style={{ color: modeColors.text.primary }}>{selectedCase.licensePlate}</span>
              </Typography>
            )}

            <Typography variant="caption" sx={{ color: modeColors.text.secondary }}>
              Time at location:{' '}
              <span style={{ color: getStatusColor(selectedCase.status) }}>{selectedCase.timeAtLocation}</span>
            </Typography>
          </Box>
        </Box>

        {/* Case Members Button */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GroupIcon />}
          onClick={() => setMembersDialogOpen(true)}
          sx={{
            borderColor: modeColors.border,
            color: modeColors.text.primary,
            py: 1,
            mb: 2,
            borderRadius: 2,
            fontSize: '0.875rem',
            '&:hover': {
              borderColor: '#00BFA5',
              backgroundColor: 'rgba(0, 191, 165, 0.08)',
            },
          }}
        >
          Case Members ({caseMembers.length})
        </Button>

        {/* Toggle Settings */}
        <Box sx={{ mb: 2 }}>
          <ToggleRow
            icon={<CarIcon sx={{ fontSize: 18 }} />}
            label="Active Search Mode"
            checked={caseSettings.activeSearchMode}
            onChange={() => handleToggle('activeSearchMode')}
          />
          <ToggleRow
            icon={<ScheduleIcon sx={{ fontSize: 18 }} />}
            label="Vehicle Stationary Alert"
            checked={caseSettings.vehicleStationaryAlert}
            onChange={() => handleToggle('vehicleStationaryAlert')}
          />
          <ToggleRow
            icon={<NotificationsOffIcon sx={{ fontSize: 18 }} />}
            label="Pause Notifications"
            checked={caseSettings.pauseNotifications}
            onChange={() => handleToggle('pauseNotifications')}
          />
        </Box>

        {/* Close Case Button */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<CheckCircleIcon />}
          onClick={() => setCloseCaseDialogOpen(true)}
          sx={{
            borderColor: modeColors.border,
            color: modeColors.text.primary,
            py: 1,
            borderRadius: 2,
            fontSize: '0.875rem',
            '&:hover': {
              borderColor: '#00BFA5',
              backgroundColor: 'rgba(0, 191, 165, 0.08)',
            },
          }}
        >
          Close Case
        </Button>
      </Box>
    </Box>
  );

  // Desktop drawer content - switches between list and details
  const desktopDrawerContent = selectedCase ? caseDetailsContent : casesListContent;

  const profileName = user?.profile
    ? 'firstName' in user.profile
      ? `${user.profile.firstName} ${user.profile.lastName}`
      : user.email
    : user?.email || 'User';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          backgroundColor: modeColors.background.default,
          boxShadow: 'none',
          borderBottom: `1px solid ${modeColors.border}`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Box
            component="img"
            src="/logo.png"
            alt="SVL Portal"
            sx={{
              height: 32,
              mr: 2,
              display: { xs: 'none', sm: 'block' },
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Dashboard Button */}
          <IconButton
            color="inherit"
            onClick={() => navigate('/dashboard')}
            sx={{
              mr: 1,
              backgroundColor: location.pathname === '/dashboard' ? 'rgba(0, 191, 165, 0.15)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0, 191, 165, 0.1)',
              },
            }}
          >
            <DashboardIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          {user && !user.isVerified && (
            <Chip
              label="Pending Verification"
              color="warning"
              size="small"
              sx={{ mr: 2 }}
            />
          )}

          <IconButton
            color="inherit"
            onClick={(e) => setSettingsAnchor(e.currentTarget)}
            sx={{ mr: 1 }}
          >
            <SettingsIcon />
          </IconButton>

          <Menu
            anchorEl={settingsAnchor}
            open={Boolean(settingsAnchor)}
            onClose={() => setSettingsAnchor(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => { setSettingsAnchor(null); navigate('/settings'); }}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => { setSettingsAnchor(null); setNotificationSettingsModalOpen(true); }}>
              <ListItemIcon>
                <NotificationsIcon fontSize="small" />
              </ListItemIcon>
              Notifications
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => { setSettingsAnchor(null); onThemeChange?.('dark'); }}
              selected={currentTheme === 'dark'}
            >
              <ListItemIcon>
                <DarkModeIcon fontSize="small" />
              </ListItemIcon>
              Dark Mode
              {currentTheme === 'dark' && <CheckIcon sx={{ ml: 'auto', fontSize: 18 }} />}
            </MenuItem>
            <MenuItem
              onClick={() => { setSettingsAnchor(null); onThemeChange?.('light'); }}
              selected={currentTheme === 'light'}
            >
              <ListItemIcon>
                <LightModeIcon fontSize="small" />
              </ListItemIcon>
              Light Mode
              {currentTheme === 'light' && <CheckIcon sx={{ ml: 'auto', fontSize: 18 }} />}
            </MenuItem>
          </Menu>

          <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0, ml: 1 }}>
            <Avatar sx={{ bgcolor: modeColors.buttonGray }}>
              {profileName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem disabled>
              <Typography variant="body2">{profileName}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main content - Map fills the space left of the drawer */}
      <Box
        component="main"
        sx={{
          position: 'fixed',
          top: 64,
          left: 0,
          right: { xs: 0, sm: drawerWidth },
          bottom: { xs: mobileDetailOpen ? '50vh' : 0, sm: 0 },
          backgroundColor: modeColors.background.default,
          overflow: 'hidden',
          touchAction: 'manipulation',
          transition: 'bottom 0.3s ease',
        }}
      >
        <VehicleMap
          location={selectedCase?.location}
          locationHistory={selectedCase?.locationHistory}
          vehicleName={selectedCase?.vehicle}
          caseNumber={selectedCase?.caseNumber}
          status={selectedCase?.status}
          isMobile={isMobile}
          themeMode={currentTheme}
        />
      </Box>

      {/* Navigation drawer - Desktop: right side */}
      <Box
        component="nav"
      >
        {/* Mobile: Temporary drawer for cases list */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: modeColors.background.nav,
              borderLeft: `1px solid ${modeColors.border}`,
            },
          }}
        >
          {casesListContent}
        </Drawer>

        {/* Mobile: Bottom sheet for case details */}
        <Drawer
          variant="persistent"
          anchor="bottom"
          open={mobileDetailOpen && isMobile}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              height: '50vh',
              maxHeight: '90vh',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              backgroundColor: modeColors.background.nav,
              overflow: 'hidden',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          {/* Handle indicator */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              pt: 1.5,
              pb: 1,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 4,
                backgroundColor: modeColors.buttonGray,
                borderRadius: 2,
              }}
            />
          </Box>
          <Box sx={{ height: 'calc(50vh - 24px)', overflowY: 'auto' }}>
            {caseDetailsContent}
          </Box>
        </Drawer>

        {/* Desktop: Permanent drawer */}
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: modeColors.background.nav,
              borderLeft: `1px solid ${modeColors.border}`,
              marginTop: '64px',
              height: 'calc(100% - 64px)',
            },
          }}
          open
        >
          {desktopDrawerContent}
        </Drawer>
      </Box>

      {/* Case Members Dialog */}
      <Dialog
        open={membersDialogOpen}
        onClose={() => setMembersDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: modeColors.background.paper,
            border: `1px solid ${modeColors.border}`,
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Case Members</Typography>
          <IconButton onClick={() => setMembersDialogOpen(false)} sx={{ color: modeColors.text.secondary }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ color: modeColors.text.secondary, mb: 2 }}>
            Existing Case Members
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {caseMembers.map((member) => (
              <Chip
                key={member.email}
                label={
                  <>
                    {member.email}
                    {member.isYou && <span style={{ color: '#00BFA5' }}> (You)</span>}
                  </>
                }
                onDelete={!member.isYou ? () => handleRemoveMember(member.email) : undefined}
                variant="outlined"
                sx={{
                  borderColor: modeColors.border,
                  color: modeColors.text.primary,
                  '& .MuiChip-deleteIcon': {
                    color: modeColors.text.secondary,
                    '&:hover': {
                      color: '#FF5252',
                    },
                  },
                }}
              />
            ))}
          </Box>

          <Divider sx={{ borderColor: modeColors.border, my: 3 }} />

          <Typography variant="body2" sx={{ color: modeColors.text.primary, mb: 2 }}>
            Add members to this case by entering authorized officer email addresses.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="Email"
              placeholder="Add an officer email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: modeColors.border },
                },
              }}
            />
            <Button
              variant="outlined"
              onClick={handleAddMember}
              disabled={!newMemberEmail || !attestChecked}
              sx={{
                borderColor: modeColors.border,
                color: modeColors.text.primary,
                minWidth: 80,
                '&:hover': {
                  borderColor: '#00BFA5',
                },
                '&.Mui-disabled': {
                  borderColor: modeColors.border,
                  color: '#4a5568',
                },
              }}
            >
              Add
            </Button>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={attestChecked}
                onChange={(e) => setAttestChecked(e.target.checked)}
                sx={{
                  color: '#00BFA5',
                  '&.Mui-checked': {
                    color: '#00BFA5',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: modeColors.text.secondary }}>
                I attest that I am inviting a law officer that will honour the terms of use of this application.
              </Typography>
            }
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setMembersDialogOpen(false)}
            sx={{ color: modeColors.text.secondary }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Close Case Dialog */}
      <Dialog
        open={closeCaseDialogOpen}
        onClose={() => {
          setCloseCaseDialogOpen(false);
          setCloseCaseReason('');
        }}
        PaperProps={{
          sx: {
            backgroundColor: modeColors.background.paper,
            border: `2px solid #00BFA5`,
            borderRadius: 3,
            maxWidth: 400,
          },
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ color: modeColors.text.primary, mb: 2 }}>
            Close Case
          </Typography>
          <Typography variant="body2" sx={{ color: modeColors.text.secondary, mb: 3 }}>
            Once you select confirm this case will be closed and unavailable within the system.
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel
              id="close-case-reason-label"
              sx={{
                color: modeColors.text.secondary,
                '&.Mui-focused': { color: '#00BFA5' },
              }}
            >
              Choose a reason
            </InputLabel>
            <Select
              labelId="close-case-reason-label"
              value={closeCaseReason}
              label="Choose a reason"
              onChange={(e) => setCloseCaseReason(e.target.value)}
              sx={{
                color: modeColors.text.primary,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: modeColors.border,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00BFA5',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00BFA5',
                },
                '& .MuiSvgIcon-root': {
                  color: modeColors.text.secondary,
                },
              }}
            >
              <MenuItem value="vehicle_recovered">Vehicle Recovered</MenuItem>
              <MenuItem value="bad_location">Vehicle Reporting Bad Location</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              onClick={() => {
                setCloseCaseDialogOpen(false);
                setCloseCaseReason('');
              }}
              sx={{ color: modeColors.text.secondary }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!closeCaseReason}
              onClick={() => {
                // TODO: Handle close case confirmation with reason
                setCloseCaseDialogOpen(false);
                setCloseCaseReason('');
                handleBackToList();
              }}
              sx={{
                backgroundColor: '#00BFA5',
                color: '#0d1421',
                borderRadius: 3,
                px: 3,
                '&:hover': {
                  backgroundColor: '#00a893',
                },
                '&.Mui-disabled': {
                  backgroundColor: modeColors.buttonGray,
                  color: modeColors.text.secondary,
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* New Case Modal */}
      <NewCaseModal
        open={newCaseModalOpen}
        onClose={() => setNewCaseModalOpen(false)}
      />

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        open={notificationSettingsModalOpen}
        onClose={() => setNotificationSettingsModalOpen(false)}
      />
    </Box>
  );
};
