import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Color palette definitions
export const colors = {
  // Primary brand colors
  primary: {
    main: '#00BFA5',
    light: '#5df2d6',
    dark: '#008e76',
  },
  // Secondary colors
  secondary: {
    main: '#F5A623',
    light: '#ffb74d',
    dark: '#c77800',
  },
  // Status colors
  status: {
    active: '#49B27E',
    requested: '#F5A623',
    inactive: '#FF5252',
  },
  // Status background colors (with opacity)
  statusBg: {
    active: 'rgba(73, 178, 126, 0.15)',
    requested: 'rgba(245, 166, 35, 0.15)',
    inactive: 'rgba(255, 82, 82, 0.15)',
  },
  // Dark mode specific
  dark: {
    background: {
      default: '#0d1421',
      paper: '#1a2332',
      card: '#1E293B',
      cardHover: '#253347',
      nav: '#0D1529',
    },
    text: {
      primary: '#ffffff',
      secondary: '#8892a0',
    },
    border: '#2d3748',
    buttonGray: '#4a5568',
  },
  // Light mode specific
  light: {
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
      card: '#ffffff',
      cardHover: '#f0f4f8',
      nav: '#ffffff',
    },
    text: {
      primary: '#1a202c',
      secondary: '#718096',
    },
    border: '#e2e8f0',
    buttonGray: '#a0aec0',
  },
  // Hover overlays
  hover: {
    primary15: 'rgba(0, 191, 165, 0.15)',
    primary10: 'rgba(0, 191, 165, 0.10)',
    primary08: 'rgba(0, 191, 165, 0.08)',
  },
  // Map marker colors
  markers: {
    historyPin: '#6B7DB3',
  },
};

// Shared component overrides
const getComponentOverrides = (mode: 'dark' | 'light'): ThemeOptions['components'] => {
  const isDark = mode === 'dark';
  const modeColors = isDark ? colors.dark : colors.light;

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: modeColors.border,
          '&:hover': {
            borderColor: colors.primary.main,
            backgroundColor: colors.hover.primary08,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: modeColors.background.paper,
          border: `1px solid ${modeColors.border}`,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        outlined: {
          borderColor: modeColors.border,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: colors.primary.main,
            '& + .MuiSwitch-track': {
              backgroundColor: colors.primary.main,
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: modeColors.border,
            },
            '&:hover fieldset': {
              borderColor: colors.primary.main,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: modeColors.background.paper,
          border: `1px solid ${modeColors.border}`,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: modeColors.background.paper,
          border: `1px solid ${modeColors.border}`,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: modeColors.background.paper,
          border: `1px solid ${modeColors.border}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: modeColors.background.nav,
          borderColor: modeColors.border,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: modeColors.background.default,
          boxShadow: 'none',
          borderBottom: `1px solid ${modeColors.border}`,
        },
      },
    },
  };
};

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: colors.primary,
    secondary: colors.secondary,
    error: {
      main: colors.status.inactive,
    },
    warning: {
      main: colors.status.requested,
    },
    success: {
      main: colors.status.active,
    },
    background: {
      default: colors.dark.background.default,
      paper: colors.dark.background.paper,
    },
    text: {
      primary: colors.dark.text.primary,
      secondary: colors.dark.text.secondary,
    },
    divider: colors.dark.border,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: getComponentOverrides('dark'),
});

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    error: {
      main: colors.status.inactive,
    },
    warning: {
      main: colors.status.requested,
    },
    success: {
      main: colors.status.active,
    },
    background: {
      default: colors.light.background.default,
      paper: colors.light.background.paper,
    },
    text: {
      primary: colors.light.text.primary,
      secondary: colors.light.text.secondary,
    },
    divider: colors.light.border,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: getComponentOverrides('light'),
});

// Theme map for easy switching
export const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export type ThemeMode = keyof typeof themes;
