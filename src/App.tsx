import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Box, AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider, Typography } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { NewCasePage } from './pages/cases/NewCasePage';
import { StyleGuidePage } from './pages/styleguide/StyleGuidePage';
import { NotificationSettingsPage } from './pages/settings/NotificationSettingsPage';
import { themes } from './theme/themes';
import type { ThemeMode } from './theme/themes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route (redirects to cases if already logged in)
const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/cases" replace />;
  }

  return <>{children}</>;
};

// Dashboard with its own layout (no drawer)
const DashboardWithLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

  const profileName = user?.profile
    ? 'firstName' in user.profile
      ? `${user.profile.firstName} ${user.profile.lastName}`
      : user.email
    : user?.email || 'User';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0d1421' }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#0d1421',
          boxShadow: 'none',
          borderBottom: '1px solid #2d3748',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            sx={{
              mr: 1,
              backgroundColor: 'rgba(0, 191, 165, 0.15)',
            }}
          >
            <DashboardIcon />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => navigate('/cases')}
            sx={{
              mr: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 191, 165, 0.1)',
              },
            }}
          >
            <Typography variant="body2" sx={{ color: '#00BFA5' }}>
              Cases
            </Typography>
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit" sx={{ mr: 1 }} onClick={() => navigate('/settings/notifications')}>
            <NotificationsIcon />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => navigate('/settings')}
            sx={{ mr: 1 }}
          >
            <SettingsIcon />
          </IconButton>

          <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0, ml: 1 }}>
            <Avatar sx={{ bgcolor: '#4a5568' }}>
              {profileName.charAt(0).toUpperCase()}
            </Avatar>
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: '#0d1421',
        }}
      >
        <DashboardPage />
      </Box>
    </Box>
  );
};

interface AppRoutesProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

function AppRoutes({ currentTheme, onThemeChange }: AppRoutesProps) {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Hidden Style Guide Route - accessible only via URL */}
      <Route
        path="/style-guide"
        element={
          <StyleGuidePage
            currentTheme={currentTheme}
            onThemeChange={onThemeChange}
          />
        }
      />

      {/* Protected Routes - MainLayout handles the map and cases drawer */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases"
        element={
          <ProtectedRoute>
            <MainLayout currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/:id"
        element={
          <ProtectedRoute>
            <MainLayout currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardWithLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/new"
        element={
          <ProtectedRoute>
            <NewCasePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/notifications"
        element={
          <ProtectedRoute>
            <NotificationSettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to dashboard or login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('dark');

  const handleThemeChange = (theme: ThemeMode) => {
    setCurrentTheme(theme);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themes[currentTheme]}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
            />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
