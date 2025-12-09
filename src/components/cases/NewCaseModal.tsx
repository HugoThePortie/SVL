import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip,
  Paper,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Upload as UploadIcon,
  Send as SendIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import type { RequestType, VINLookupResult } from '../../types';

const steps = ['VIN Verification', 'Request Details', 'Documentation', 'Review & Submit'];

interface NewCaseModalProps {
  open: boolean;
  onClose: () => void;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [activeStep, setActiveStep] = useState(0);
  const [vin, setVin] = useState('');
  const [vinResult, setVinResult] = useState<VINLookupResult | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [requestType, setRequestType] = useState<RequestType>('customer_request');
  const [caseNumber, setCaseNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const handleVinLookup = async () => {
    if (vin.length !== 17) {
      return;
    }

    setIsLookingUp(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock response
    const mockResult: VINLookupResult = {
      vin,
      isSVLCapable: true,
      vehicleInfo: {
        vin,
        make: 'Honda',
        model: 'Accord',
        year: 2023,
        color: 'Silver',
        isSVLCapable: true,
        hasSlowdown: true,
        hasImmobilization: false,
        oem: 'Honda',
        customerServiceNumber: '1-800-999-1009',
      },
      customerServiceNumber: '1-800-999-1009',
    };

    setVinResult(mockResult);
    setIsLookingUp(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    // TODO: Submit to API
    console.log('Submitting SVL request:', {
      vin,
      requestType,
      caseNumber,
      notes,
      documentFile,
    });
    handleClose();
  };

  const handleClose = () => {
    // Reset state
    setActiveStep(0);
    setVin('');
    setVinResult(null);
    setRequestType('customer_request');
    setCaseNumber('');
    setNotes('');
    setDocumentFile(null);
    onClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setDocumentFile(event.target.files[0]);
    }
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return vinResult?.isSVLCapable;
      case 1:
        return requestType && caseNumber;
      case 2:
        return requestType === 'customer_request' || requestType === 'exigent_circumstances' || documentFile;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter the Vehicle Identification Number (VIN) to check if the vehicle is capable of
              receiving Stolen Vehicle Locator service.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: isMobile ? 'column' : 'row' }}>
              <TextField
                fullWidth
                label="Vehicle Identification Number (VIN)"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                placeholder="Enter 17-character VIN"
                inputProps={{ maxLength: 17 }}
                helperText={`${vin.length}/17 characters`}
                size="small"
              />
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleVinLookup}
                disabled={vin.length !== 17 || isLookingUp}
                sx={{ minWidth: 120, height: 40 }}
              >
                {isLookingUp ? 'Checking...' : 'Lookup'}
              </Button>
            </Box>

            {vinResult && (
              <Paper sx={{ p: 2, backgroundColor: vinResult.isSVLCapable ? 'rgba(0, 191, 165, 0.1)' : 'rgba(255, 82, 82, 0.1)', border: '1px solid', borderColor: vinResult.isSVLCapable ? '#00BFA5' : '#FF5252' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {vinResult.isSVLCapable ? (
                    <CheckCircleIcon sx={{ color: '#00BFA5' }} />
                  ) : (
                    <WarningIcon sx={{ color: '#FF5252' }} />
                  )}
                  <Typography variant="subtitle1" fontWeight="600">
                    {vinResult.isSVLCapable
                      ? 'Vehicle is SVL Capable'
                      : 'Vehicle is NOT SVL Capable'}
                  </Typography>
                </Box>

                {vinResult.vehicleInfo && (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Vehicle
                      </Typography>
                      <Typography variant="body2">
                        {vinResult.vehicleInfo.year} {vinResult.vehicleInfo.make}{' '}
                        {vinResult.vehicleInfo.model}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Capabilities
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        <Chip label="SVL" size="small" sx={{ backgroundColor: '#00BFA5', color: '#fff', height: 20, fontSize: '0.7rem' }} />
                        {vinResult.vehicleInfo.hasSlowdown && (
                          <Chip label="Slowdown" size="small" sx={{ backgroundColor: '#1976d2', color: '#fff', height: 20, fontSize: '0.7rem' }} />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Paper>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Provide information about the SVL request.
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Request Type</InputLabel>
                  <Select
                    value={requestType}
                    label="Request Type"
                    onChange={(e) => setRequestType(e.target.value as RequestType)}
                  >
                    <MenuItem value="exigent_circumstances">Exigent Circumstances</MenuItem>
                    <MenuItem value="court_order">Court Order</MenuItem>
                    <MenuItem value="warrant">Warrant</MenuItem>
                    <MenuItem value="customer_request">Customer Request</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Case/Report Number"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  placeholder="Enter your department case number"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  label="Additional Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter any relevant details about the case..."
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Upload supporting documentation for your SVL request.
            </Typography>

            {requestType !== 'customer_request' && (
              <Alert severity="info" sx={{ mb: 2, '& .MuiAlert-message': { fontSize: '0.8rem' } }}>
                {requestType === 'court_order' && 'Please upload a copy of the court order.'}
                {requestType === 'warrant' && 'Please upload a copy of the warrant.'}
                {requestType === 'exigent_circumstances' &&
                  'Exigent circumstances requests may proceed without documentation.'}
              </Alert>
            )}

            <Paper
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #2d3748',
                backgroundColor: '#0d1421',
                cursor: 'pointer',
                borderRadius: 2,
                minHeight: 150,
                '&:hover': {
                  borderColor: '#00BFA5',
                  backgroundColor: 'rgba(0, 191, 165, 0.05)',
                },
              }}
              component="label"
            >
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <UploadIcon sx={{ fontSize: 48, color: '#8892a0', mb: 2 }} />
              <Typography variant="body1" sx={{ color: '#ffffff', mb: 1 }}>
                {documentFile ? documentFile.name : 'Click to upload'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                PDF, DOC, JPG, or PNG (max 10MB)
              </Typography>
            </Paper>

            {documentFile && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ color: '#00BFA5', fontSize: 18 }} />
                <Typography variant="body2">
                  {documentFile.name}
                </Typography>
                <Button size="small" onClick={() => setDocumentFile(null)} sx={{ ml: 'auto' }}>
                  Remove
                </Button>
              </Box>
            )}
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please review the information before submitting.
            </Typography>

            <Paper sx={{ p: 2, mb: 2, backgroundColor: '#0d1421', border: '1px solid #2d3748' }}>
              <Typography variant="caption" color="text.secondary">VIN</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>{vin}</Typography>

              {vinResult?.vehicleInfo && (
                <>
                  <Typography variant="caption" color="text.secondary">Vehicle</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {vinResult.vehicleInfo.year} {vinResult.vehicleInfo.make} {vinResult.vehicleInfo.model}
                  </Typography>
                </>
              )}

              <Typography variant="caption" color="text.secondary">Request Type</Typography>
              <Typography variant="body2" sx={{ mb: 1, textTransform: 'capitalize' }}>
                {requestType.replace(/_/g, ' ')}
              </Typography>

              <Typography variant="caption" color="text.secondary">Case Number</Typography>
              <Typography variant="body2">{caseNumber}</Typography>
            </Paper>

            <Alert severity="warning" sx={{ '& .MuiAlert-message': { fontSize: '0.75rem' } }}>
              By submitting, you confirm you are authorized to request SVL service for this vehicle.
            </Alert>
          </Box>
        );

      default:
        return null;
    }
  };

  const content = (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight="600">
          Create New Case
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: '#8892a0' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 3 }} alternativeLabel={isMobile}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: isMobile ? '0.65rem' : '0.75rem' } }}>
              {isMobile ? label.split(' ')[0] : label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Content */}
      <Box sx={{ minHeight: isMobile ? 'auto' : 280, mb: 3 }}>
        {renderStepContent(activeStep)}
      </Box>

      <Divider sx={{ borderColor: '#2d3748', mb: 2 }} />

      {/* Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ color: '#8892a0' }}
        >
          Back
        </Button>
        <Box>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleSubmit}
              disabled={!canProceed()}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
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
