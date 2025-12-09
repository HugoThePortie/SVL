import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Badge,
  Avatar,
  IconButton,
  Divider,
  Paper,
  Fab,
  InputAdornment,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  DirectionsCar as CarIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  ContentCopy as CopyIcon,
  FilterList as FilterIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { colors } from '../../theme/themes';
import type { ThemeMode } from '../../theme/themes';

interface StyleGuidePageProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const StyleGuidePage: React.FC<StyleGuidePageProps> = ({ currentTheme, onThemeChange }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectValue, setSelectValue] = useState('option1');
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  const isDark = currentTheme === 'dark';
  const modeColors = isDark ? colors.dark : colors.light;

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 3, pb: 1, borderBottom: `2px solid ${colors.primary.main}` }}>
        {title}
      </Typography>
      {children}
    </Box>
  );

  const ComponentRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', fontWeight: 600 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        {children}
      </Box>
    </Box>
  );

  const ColorSwatch: React.FC<{ color: string; name: string }> = ({ color, name }) => (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          width: 60,
          height: 60,
          backgroundColor: color,
          borderRadius: 2,
          border: `1px solid ${modeColors.border}`,
          mb: 1,
        }}
      />
      <Typography variant="caption" sx={{ display: 'block' }}>{name}</Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{color}</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        p: 4,
      }}
    >
      {/* Header with Theme Switcher */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          pb: 3,
          borderBottom: `1px solid ${modeColors.border}`,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            SVL Portal Style Guide
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Material UI 3 Component Library - {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Mode
          </Typography>
        </Box>

        {/* Theme Switcher */}
        <ToggleButtonGroup
          value={currentTheme}
          exclusive
          onChange={(_, value) => value && onThemeChange(value)}
          sx={{
            '& .MuiToggleButton-root': {
              border: `1px solid ${modeColors.border}`,
              '&.Mui-selected': {
                backgroundColor: colors.hover.primary15,
                borderColor: colors.primary.main,
                '&:hover': {
                  backgroundColor: colors.hover.primary15,
                },
              },
            },
          }}
        >
          <ToggleButton value="dark">
            <DarkModeIcon sx={{ mr: 1 }} />
            Dark
          </ToggleButton>
          <ToggleButton value="light">
            <LightModeIcon sx={{ mr: 1 }} />
            Light
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Color Palette */}
      <Section title="Color Palette">
        <ComponentRow label="Primary Colors">
          <ColorSwatch color={colors.primary.main} name="Primary" />
          <ColorSwatch color={colors.primary.light} name="Primary Light" />
          <ColorSwatch color={colors.primary.dark} name="Primary Dark" />
        </ComponentRow>

        <ComponentRow label="Secondary Colors">
          <ColorSwatch color={colors.secondary.main} name="Secondary" />
          <ColorSwatch color={colors.secondary.light} name="Secondary Light" />
          <ColorSwatch color={colors.secondary.dark} name="Secondary Dark" />
        </ComponentRow>

        <ComponentRow label="Status Colors">
          <ColorSwatch color={colors.status.active} name="Active" />
          <ColorSwatch color={colors.status.requested} name="Requested" />
          <ColorSwatch color={colors.status.inactive} name="Inactive" />
        </ComponentRow>

        <ComponentRow label="Background Colors">
          <ColorSwatch color={modeColors.background.default} name="Default" />
          <ColorSwatch color={modeColors.background.paper} name="Paper" />
          <ColorSwatch color={modeColors.background.card} name="Card" />
          <ColorSwatch color={modeColors.background.nav} name="Nav" />
        </ComponentRow>

        <ComponentRow label="Text & Border">
          <ColorSwatch color={modeColors.text.primary} name="Text Primary" />
          <ColorSwatch color={modeColors.text.secondary} name="Text Secondary" />
          <ColorSwatch color={modeColors.border} name="Border" />
        </ComponentRow>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <Box sx={{ '& > *': { mb: 2 } }}>
          <Typography variant="h4">Heading 4 - Page Titles (700)</Typography>
          <Typography variant="h5">Heading 5 - Section Headings (600)</Typography>
          <Typography variant="h6">Heading 6 - Component Headings (600)</Typography>
          <Typography variant="subtitle1">Subtitle 1 - Emphasized text</Typography>
          <Typography variant="subtitle2">Subtitle 2 - Secondary emphasis</Typography>
          <Typography variant="body1">Body 1 - Main body text for paragraphs and content</Typography>
          <Typography variant="body2">Body 2 - Secondary body text for descriptions</Typography>
          <Typography variant="caption">Caption - Small labels and helper text</Typography>
        </Box>
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <ComponentRow label="Contained Buttons">
          <Button variant="contained">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="success">Success</Button>
          <Button variant="contained" color="error">Error</Button>
          <Button variant="contained" disabled>Disabled</Button>
        </ComponentRow>

        <ComponentRow label="Outlined Buttons">
          <Button variant="outlined">Primary</Button>
          <Button variant="outlined" color="secondary">Secondary</Button>
          <Button variant="outlined" color="success">Success</Button>
          <Button variant="outlined" color="error">Error</Button>
          <Button variant="outlined" disabled>Disabled</Button>
        </ComponentRow>

        <ComponentRow label="Text Buttons">
          <Button variant="text">Primary</Button>
          <Button variant="text" color="secondary">Secondary</Button>
          <Button variant="text" disabled>Disabled</Button>
        </ComponentRow>

        <ComponentRow label="Buttons with Icons">
          <Button variant="contained" startIcon={<AddIcon />}>Add New</Button>
          <Button variant="outlined" startIcon={<SearchIcon />}>Search</Button>
          <Button variant="outlined" endIcon={<CopyIcon />}>Copy</Button>
        </ComponentRow>

        <ComponentRow label="Icon Buttons">
          <IconButton><DashboardIcon /></IconButton>
          <IconButton><SettingsIcon /></IconButton>
          <IconButton color="primary"><CarIcon /></IconButton>
          <IconButton color="error"><CloseIcon /></IconButton>
        </ComponentRow>

        <ComponentRow label="FAB (Floating Action Button)">
          <Fab color="primary" size="small"><AddIcon /></Fab>
          <Fab color="primary"><AddIcon /></Fab>
          <Fab color="secondary"><SettingsIcon /></Fab>
          <Fab variant="extended" color="primary">
            <AddIcon sx={{ mr: 1 }} />
            New Case
          </Fab>
        </ComponentRow>
      </Section>

      {/* Form Controls */}
      <Section title="Form Controls">
        <ComponentRow label="Text Fields">
          <TextField label="Default" placeholder="Enter text..." />
          <TextField label="With Value" value="Sample text" />
          <TextField label="Disabled" disabled value="Disabled field" />
          <TextField label="Error" error helperText="This field has an error" />
        </ComponentRow>

        <ComponentRow label="Text Field Variants">
          <TextField label="Outlined" variant="outlined" />
          <TextField label="Filled" variant="filled" />
          <TextField label="Standard" variant="standard" />
        </ComponentRow>

        <ComponentRow label="Text Field with Adornments">
          <TextField
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </ComponentRow>

        <ComponentRow label="Select">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Option</InputLabel>
            <Select value={selectValue} label="Select Option" onChange={(e) => setSelectValue(e.target.value)}>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
          </FormControl>
        </ComponentRow>

        <ComponentRow label="Switches & Checkboxes">
          <FormControlLabel
            control={<Switch checked={switchChecked} onChange={(e) => setSwitchChecked(e.target.checked)} />}
            label="Switch"
          />
          <FormControlLabel
            control={<Checkbox checked={checkboxChecked} onChange={(e) => setCheckboxChecked(e.target.checked)} />}
            label="Checkbox"
          />
          <FormControlLabel control={<Switch disabled />} label="Disabled" />
          <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
        </ComponentRow>
      </Section>

      {/* Chips */}
      <Section title="Chips">
        <ComponentRow label="Chip Variants">
          <Chip label="Default" />
          <Chip label="Outlined" variant="outlined" />
          <Chip label="Clickable" onClick={() => {}} />
          <Chip label="Deletable" onDelete={() => {}} />
        </ComponentRow>

        <ComponentRow label="Chip Colors">
          <Chip label="Primary" color="primary" />
          <Chip label="Secondary" color="secondary" />
          <Chip label="Success" color="success" />
          <Chip label="Error" color="error" />
          <Chip label="Warning" color="warning" />
        </ComponentRow>

        <ComponentRow label="Status Chips (Custom)">
          <Chip
            label="Active"
            sx={{ backgroundColor: colors.status.active, color: '#fff' }}
          />
          <Chip
            label="Requested"
            sx={{ backgroundColor: colors.status.requested, color: '#fff' }}
          />
          <Chip
            label="Inactive"
            sx={{ backgroundColor: colors.status.inactive, color: '#fff' }}
          />
        </ComponentRow>

        <ComponentRow label="Chips with Icons">
          <Chip icon={<CarIcon />} label="Vehicle" />
          <Chip icon={<FilterIcon />} label="Filter" variant="outlined" />
        </ComponentRow>
      </Section>

      {/* Alerts */}
      <Section title="Alerts">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="success">This is a success alert</Alert>
          <Alert severity="info">This is an info alert</Alert>
          <Alert severity="warning">This is a warning alert</Alert>
          <Alert severity="error">This is an error alert</Alert>
          <Alert severity="success" variant="outlined">Outlined success alert</Alert>
          <Alert severity="error" variant="filled">Filled error alert</Alert>
        </Box>
      </Section>

      {/* Cards */}
      <Section title="Cards">
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Card sx={{ width: 280 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Default Card</Typography>
              <Typography variant="body2" color="text.secondary">
                This is a standard card component with the theme applied.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ width: 280, backgroundColor: modeColors.background.card }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Case Card Style</Typography>
              <Typography variant="body2" color="text.secondary">
                Using the custom card background color.
              </Typography>
            </CardContent>
          </Card>

          <Paper sx={{ width: 280, p: 2, backgroundColor: modeColors.background.nav }}>
            <Typography variant="h6" gutterBottom>Nav Background</Typography>
            <Typography variant="body2" color="text.secondary">
              Paper with navigation background color.
            </Typography>
          </Paper>
        </Box>
      </Section>

      {/* Avatars & Badges */}
      <Section title="Avatars & Badges">
        <ComponentRow label="Avatars">
          <Avatar>JD</Avatar>
          <Avatar sx={{ bgcolor: colors.primary.main }}>AB</Avatar>
          <Avatar sx={{ bgcolor: colors.status.active }}>CD</Avatar>
          <Avatar sx={{ bgcolor: modeColors.buttonGray }}>EF</Avatar>
        </ComponentRow>

        <ComponentRow label="Badges">
          <Badge badgeContent={4} color="primary">
            <NotificationsIcon />
          </Badge>
          <Badge badgeContent={99} color="error">
            <NotificationsIcon />
          </Badge>
          <Badge badgeContent="New" color="secondary">
            <CarIcon />
          </Badge>
        </ComponentRow>
      </Section>

      {/* Status Icons */}
      <Section title="Status Icons">
        <ComponentRow label="Status Indicator Pattern">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, backgroundColor: modeColors.background.card, borderRadius: 2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                backgroundColor: colors.statusBg.active,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CarIcon sx={{ color: colors.status.active, fontSize: 20 }} />
            </Box>
            <Typography sx={{ color: colors.status.active }}>Active Status</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, backgroundColor: modeColors.background.card, borderRadius: 2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                backgroundColor: colors.statusBg.requested,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WarningIcon sx={{ color: colors.status.requested, fontSize: 20 }} />
            </Box>
            <Typography sx={{ color: colors.status.requested }}>Requested Status</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, backgroundColor: modeColors.background.card, borderRadius: 2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                backgroundColor: colors.statusBg.inactive,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ErrorIcon sx={{ color: colors.status.inactive, fontSize: 20 }} />
            </Box>
            <Typography sx={{ color: colors.status.inactive }}>Inactive Status</Typography>
          </Box>
        </ComponentRow>
      </Section>

      {/* Stepper */}
      <Section title="Stepper">
        <Stepper activeStep={1} sx={{ mb: 3 }}>
          <Step>
            <StepLabel>VIN Verification</StepLabel>
          </Step>
          <Step>
            <StepLabel>Request Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Documentation</StepLabel>
          </Step>
          <Step>
            <StepLabel>Review & Submit</StepLabel>
          </Step>
        </Stepper>
      </Section>

      {/* Dialog */}
      <Section title="Dialog">
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Open Dialog
        </Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Sample Dialog
              <IconButton onClick={() => setDialogOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              This is a sample dialog demonstrating the themed styling.
            </Typography>
            <TextField fullWidth label="Sample Input" sx={{ mb: 2 }} />
            <Alert severity="info">Dialogs use the paper background color with border styling.</Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setDialogOpen(false)}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </Section>

      {/* Menu */}
      <Section title="Menu">
        <Button variant="outlined" onClick={(e) => setMenuAnchor(e.currentTarget)}>
          Open Menu
        </Button>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem onClick={() => setMenuAnchor(null)}>
            <SettingsIcon sx={{ mr: 1 }} /> Settings
          </MenuItem>
          <MenuItem onClick={() => setMenuAnchor(null)}>
            <NotificationsIcon sx={{ mr: 1 }} /> Notifications
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setMenuAnchor(null)}>
            <CloseIcon sx={{ mr: 1 }} /> Close
          </MenuItem>
        </Menu>
      </Section>

      {/* Dividers */}
      <Section title="Dividers">
        <Box sx={{ backgroundColor: modeColors.background.card, p: 3, borderRadius: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>Content above divider</Typography>
          <Divider />
          <Typography variant="body1" sx={{ mt: 2 }}>Content below divider</Typography>
        </Box>
      </Section>

      {/* Spacing Reference */}
      <Section title="Spacing Reference">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[0.5, 1, 1.5, 2, 3, 4].map((spacing) => (
            <Box key={spacing} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: spacing * 8,
                  height: 40,
                  backgroundColor: colors.primary.main,
                  borderRadius: 1,
                  mb: 1,
                }}
              />
              <Typography variant="caption">
                {spacing} = {spacing * 8}px
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>

      {/* Border Radius Reference */}
      <Section title="Border Radius Reference">
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {[4, 6, 8, 12, 16].map((radius) => (
            <Box key={radius} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: colors.primary.main,
                  borderRadius: `${radius}px`,
                  mb: 1,
                }}
              />
              <Typography variant="caption">{radius}px</Typography>
            </Box>
          ))}
        </Box>
      </Section>
    </Box>
  );
};
