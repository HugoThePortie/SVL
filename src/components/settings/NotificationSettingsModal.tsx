import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  TextField,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { colors } from '../../theme/themes';

type Step = 'settings' | 'phone' | 'verify';

interface NotificationSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const modeColors = colors.dark; // Using dark mode colors

  // Notification toggles
  const [textEnabled, setTextEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);

  // Dialog and flow state
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('settings');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const handleTextToggle = () => {
    if (!textEnabled) {
      // Trying to enable - show verification dialog
      setVerificationDialogOpen(true);
    } else {
      // Disabling
      setTextEnabled(false);
    }
  };

  const handleVerifyClick = () => {
    setVerificationDialogOpen(false);
    setCurrentStep('phone');
  };

  const handlePhoneNext = () => {
    if (phoneNumber.length >= 14) {
      setCurrentStep('verify');
    }
  };

  const handleVerifyOtp = () => {
    if (otpCode.length >= 6) {
      // Success - enable text notifications
      setTextEnabled(true);
      setCurrentStep('settings');
      setPhoneNumber('');
      setOtpCode('');
    }
  };

  const handleBack = () => {
    if (currentStep === 'verify') {
      setCurrentStep('phone');
    } else if (currentStep === 'phone') {
      setCurrentStep('settings');
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentStep('settings');
    setPhoneNumber('');
    setOtpCode('');
    setVerificationDialogOpen(false);
    onClose();
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as 1-XXX-XXX-XXXX
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `1-${digits}`;
    if (digits.length <= 4) return `1-${digits.slice(1)}`;
    if (digits.length <= 7) return `1-${digits.slice(1, 4)}-${digits.slice(4)}`;
    return `1-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  // Main settings view
  const renderSettings = () => (
    <Box>
      <Typography variant="h5" sx={{ color: modeColors.text.primary, mb: 1 }}>
        Notification Types
      </Typography>
      <Typography variant="body2" sx={{ color: modeColors.text.secondary, mb: 3 }}>
        Set your preferred contact method to be notified whenever SVL mode is activated.
      </Typography>

      {/* Text Toggle */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1.5,
        }}
      >
        <Typography variant="body1" sx={{ color: modeColors.text.primary, fontWeight: 500 }}>
          Text
        </Typography>
        <Switch
          checked={textEnabled}
          onChange={handleTextToggle}
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

      {/* Email Toggle */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1.5,
        }}
      >
        <Typography variant="body1" sx={{ color: modeColors.text.primary, fontWeight: 500 }}>
          Email
        </Typography>
        <Switch
          checked={emailEnabled}
          onChange={() => setEmailEnabled(!emailEnabled)}
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

      <Divider sx={{ borderColor: modeColors.border, mt: 3 }} />
    </Box>
  );

  // Phone number entry view
  const renderPhoneEntry = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: isMobile ? 'auto' : 280 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" sx={{ color: modeColors.text.primary, mb: 1 }}>
          Enter your phone number
        </Typography>
        <Typography variant="body2" sx={{ color: modeColors.text.secondary, mb: 4 }}>
          Please enter your 10-digit U.S. mobile phone number.
        </Typography>

        <TextField
          fullWidth
          label="Phone Number"
          variant="standard"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="1-XXX-XXX-XXXX"
          inputProps={{
            type: 'tel',
            autoComplete: 'tel',
          }}
          sx={{
            '& .MuiInput-root': {
              color: modeColors.text.primary,
              '&:before': {
                borderBottomColor: modeColors.border,
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottomColor: '#00BFA5',
              },
              '&:after': {
                borderBottomColor: '#00BFA5',
              },
            },
            '& .MuiInputLabel-root': {
              color: modeColors.text.secondary,
            },
          }}
        />
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={handlePhoneNext}
        disabled={phoneNumber.length < 14}
        sx={{
          py: 1.5,
          mt: 3,
          borderRadius: 3,
          backgroundColor: phoneNumber.length >= 14 ? '#ffffff' : modeColors.buttonGray,
          color: phoneNumber.length >= 14 ? '#0d1421' : modeColors.text.secondary,
          '&:hover': {
            backgroundColor: phoneNumber.length >= 14 ? '#e0e0e0' : modeColors.buttonGray,
          },
          '&.Mui-disabled': {
            backgroundColor: modeColors.buttonGray,
            color: modeColors.text.secondary,
          },
        }}
      >
        Next
      </Button>
    </Box>
  );

  // OTP verification view
  const renderOtpVerification = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: isMobile ? 'auto' : 280 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" sx={{ color: modeColors.text.primary, mb: 1 }}>
          Verify your phone number
        </Typography>
        <Typography variant="body2" sx={{ color: modeColors.text.secondary, mb: 4 }}>
          Enter the code that was just texted to {phoneNumber}.
        </Typography>

        <TextField
          fullWidth
          label="OTP"
          variant="standard"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter 6-digit code"
          inputProps={{
            inputMode: 'numeric',
            autoComplete: 'one-time-code',
            maxLength: 6,
          }}
          sx={{
            '& .MuiInput-root': {
              color: modeColors.text.primary,
              fontSize: '1.25rem',
              '&:before': {
                borderBottomColor: modeColors.border,
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottomColor: '#00BFA5',
              },
              '&:after': {
                borderBottomColor: '#00BFA5',
              },
            },
            '& .MuiInputLabel-root': {
              color: modeColors.text.secondary,
            },
          }}
        />
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={handleVerifyOtp}
        disabled={otpCode.length < 6}
        sx={{
          py: 1.5,
          mt: 3,
          borderRadius: 3,
          backgroundColor: otpCode.length >= 6 ? '#ffffff' : modeColors.buttonGray,
          color: otpCode.length >= 6 ? '#0d1421' : modeColors.text.secondary,
          '&:hover': {
            backgroundColor: otpCode.length >= 6 ? '#e0e0e0' : modeColors.buttonGray,
          },
          '&.Mui-disabled': {
            backgroundColor: modeColors.buttonGray,
            color: modeColors.text.secondary,
          },
        }}
      >
        Verify
      </Button>
    </Box>
  );

  const content = (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        {currentStep !== 'settings' ? (
          <IconButton onClick={handleBack} aria-label="Go back" sx={{ color: modeColors.text.primary, ml: -1 }}>
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <Typography variant="h6" fontWeight="600" id="notification-settings-title">
            Notification Settings
          </Typography>
        )}
        <IconButton onClick={handleClose} aria-label="Close notification settings" sx={{ color: '#8892a0' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box>
        {currentStep === 'settings' && renderSettings()}
        {currentStep === 'phone' && renderPhoneEntry()}
        {currentStep === 'verify' && renderOtpVerification()}
      </Box>

      {/* Verification Required Dialog */}
      <Dialog
        open={verificationDialogOpen}
        onClose={() => setVerificationDialogOpen(false)}
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
            Verification Required
          </Typography>
          <Typography variant="body2" sx={{ color: modeColors.text.secondary, mb: 3 }}>
            By selecting to receive text messages you will be required to verify your phone number.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              onClick={() => setVerificationDialogOpen(false)}
              sx={{ color: modeColors.text.secondary }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={handleVerifyClick}
              sx={{
                borderColor: '#00BFA5',
                color: '#00BFA5',
                borderRadius: 3,
                px: 3,
                '&:hover': {
                  borderColor: '#00BFA5',
                  backgroundColor: 'rgba(0, 191, 165, 0.1)',
                },
              }}
            >
              Verify
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );

  // Mobile: Bottom sheet
  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={handleClose}
        onOpen={() => {}}
        swipeAreaWidth={20}
        disableSwipeToOpen={false}
        PaperProps={{
          sx: {
            height: '50vh',
            maxHeight: '90vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: '#1a2332',
            p: 3,
            overflow: 'visible',
          },
        }}
      >
        {/* Drag handle */}
        <Box
          sx={{
            width: 40,
            height: 4,
            backgroundColor: '#4a5568',
            borderRadius: 2,
            mx: 'auto',
            mb: 2,
            cursor: 'grab',
          }}
        />
        <Box sx={{ height: 'calc(50vh - 80px)', overflowY: 'auto' }}>
          {content}
        </Box>
      </SwipeableDrawer>
    );
  }

  // Desktop: Modal
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="notification-settings-title"
      PaperProps={{
        sx: {
          backgroundColor: '#1a2332',
          border: '1px solid #2d3748',
          borderRadius: 3,
        },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        {content}
      </DialogContent>
    </Dialog>
  );
};
