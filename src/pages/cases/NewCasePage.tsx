import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
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
} from '@mui/material';
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Upload as UploadIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import type { RequestType, VINLookupResult } from '../../types';

const steps = ['VIN Verification', 'Request Details', 'Documentation', 'Review & Submit'];

export const NewCasePage: React.FC = () => {
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
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setDocumentFile(event.target.files[0]);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Verify Vehicle SVL Capability
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter the Vehicle Identification Number (VIN) to check if the vehicle is capable of
              receiving Stolen Vehicle Locator service.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="Vehicle Identification Number (VIN)"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                placeholder="Enter 17-character VIN"
                inputProps={{ maxLength: 17 }}
                helperText={`${vin.length}/17 characters`}
              />
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleVinLookup}
                disabled={vin.length !== 17 || isLookingUp}
                sx={{ minWidth: 120 }}
              >
                {isLookingUp ? 'Checking...' : 'Lookup'}
              </Button>
            </Box>

            {vinResult && (
              <Paper sx={{ p: 3, backgroundColor: vinResult.isSVLCapable ? 'success.50' : 'error.50' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {vinResult.isSVLCapable ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <WarningIcon color="error" />
                  )}
                  <Typography variant="h6">
                    {vinResult.isSVLCapable
                      ? 'Vehicle is SVL Capable'
                      : 'Vehicle is NOT SVL Capable'}
                  </Typography>
                </Box>

                {vinResult.vehicleInfo && (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Vehicle
                      </Typography>
                      <Typography variant="body1">
                        {vinResult.vehicleInfo.year} {vinResult.vehicleInfo.make}{' '}
                        {vinResult.vehicleInfo.model}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Color
                      </Typography>
                      <Typography variant="body1">
                        {vinResult.vehicleInfo.color || 'Unknown'}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        OEM
                      </Typography>
                      <Typography variant="body1">{vinResult.vehicleInfo.oem}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Capabilities
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label="SVL" color="success" size="small" />
                        {vinResult.vehicleInfo.hasSlowdown && (
                          <Chip label="Slowdown" color="info" size="small" />
                        )}
                        {vinResult.vehicleInfo.hasImmobilization && (
                          <Chip label="Immobilization" color="warning" size="small" />
                        )}
                      </Box>
                    </Grid>
                    {vinResult.customerServiceNumber && (
                      <Grid size={12}>
                        <Typography variant="body2" color="text.secondary">
                          Customer Service Number
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {vinResult.customerServiceNumber}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Provide this number to the customer to call for assistance
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Paper>
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Request Details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Provide information about the SVL request.
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
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
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Case/Report Number"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  placeholder="Enter your department case number"
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
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
            <Typography variant="h6" gutterBottom>
              Documentation
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Upload supporting documentation for your SVL request.
            </Typography>

            {requestType !== 'customer_request' && (
              <Alert severity="info" sx={{ mb: 3 }}>
                {requestType === 'court_order' && 'Please upload a copy of the court order.'}
                {requestType === 'warrant' && 'Please upload a copy of the warrant.'}
                {requestType === 'exigent_circumstances' &&
                  'Exigent circumstances requests may proceed without documentation, but please provide any available supporting materials.'}
              </Alert>
            )}

            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                border: '2px dashed',
                borderColor: 'grey.300',
                backgroundColor: 'grey.50',
                cursor: 'pointer',
              }}
              component="label"
            >
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <UploadIcon sx={{ fontSize: 48, color: 'grey.500', mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                {documentFile ? documentFile.name : 'Click to upload or drag and drop'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                PDF, DOC, DOCX, JPG, or PNG (max 10MB)
              </Typography>
            </Paper>

            {documentFile && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon color="success" />
                <Typography variant="body2">
                  {documentFile.name} ({(documentFile.size / 1024 / 1024).toFixed(2)} MB)
                </Typography>
                <Button size="small" onClick={() => setDocumentFile(null)}>
                  Remove
                </Button>
              </Box>
            )}
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review & Submit
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Please review the information before submitting your SVL request.
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Vehicle Information
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    VIN
                  </Typography>
                  <Typography variant="body1">{vin}</Typography>
                </Grid>
                {vinResult?.vehicleInfo && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        Vehicle
                      </Typography>
                      <Typography variant="body1">
                        {vinResult.vehicleInfo.year} {vinResult.vehicleInfo.make}{' '}
                        {vinResult.vehicleInfo.model}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Request Details
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Request Type
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {requestType.replace(/_/g, ' ')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Case Number
                  </Typography>
                  <Typography variant="body1">{caseNumber || 'Not provided'}</Typography>
                </Grid>
                {notes && (
                  <Grid size={12}>
                    <Typography variant="body2" color="text.secondary">
                      Notes
                    </Typography>
                    <Typography variant="body1">{notes}</Typography>
                  </Grid>
                )}
                <Grid size={12}>
                  <Typography variant="body2" color="text.secondary">
                    Documentation
                  </Typography>
                  <Typography variant="body1">
                    {documentFile ? documentFile.name : 'No file uploaded'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Alert severity="warning">
              By submitting this request, you confirm that you are authorized to request Stolen
              Vehicle Locator service for this vehicle and that all information provided is accurate.
            </Alert>
          </Box>
        );

      default:
        return null;
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

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        New SVL Request
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Submit a new Stolen Vehicle Locator activation request
      </Typography>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: 300 }}>{renderStepContent(activeStep)}</Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SendIcon />}
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                >
                  Submit Request
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
        </CardContent>
      </Card>
    </Box>
  );
};
