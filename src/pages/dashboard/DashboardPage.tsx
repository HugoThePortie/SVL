import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Add as AddIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/themes';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, subtitle }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: 2,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.cloneElement(icon as React.ReactElement<{ sx?: object }>, { sx: { color, fontSize: 28 } })}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Case status types and helpers (matching MainLayout)
type CaseStatus = 'active' | 'requested' | 'inactive';

const getStatusIcon = (status: CaseStatus) => {
  switch (status) {
    case 'active':
      return <CarIcon sx={{ color: colors.status.active, fontSize: 20 }} />;
    case 'requested':
      return <DownloadIcon sx={{ color: colors.status.requested, fontSize: 20 }} />;
    case 'inactive':
      return <CloseIcon sx={{ color: colors.status.inactive, fontSize: 20 }} />;
    default:
      return <CarIcon sx={{ color: colors.status.active, fontSize: 20 }} />;
  }
};

const getStatusColor = (status: CaseStatus) => {
  switch (status) {
    case 'active':
      return colors.status.active;
    case 'requested':
      return colors.status.requested;
    case 'inactive':
      return colors.status.inactive;
    default:
      return colors.status.active;
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

// Mock data for demonstration (matching MainLayout structure)
const mockRecentCases = [
  {
    id: '1',
    caseNumber: '2021-03-13-002',
    vehicle: '2021 White Jeep Grand Cherokee',
    vin: '4Y1SL65848Z411439',
    status: 'active' as CaseStatus,
    timeAtLocation: '20+ mins',
  },
  {
    id: '2',
    caseNumber: '2021-03-14-001',
    vehicle: '2020 Black BMW X5',
    vin: '5UXCR6C55KLL12345',
    status: 'requested' as CaseStatus,
    timeAtLocation: 'Requested',
  },
  {
    id: '3',
    caseNumber: '2021-03-15-003',
    vehicle: '2022 Red Tesla Model 3',
    vin: '5YJ3E1EA8NF123456',
    status: 'active' as CaseStatus,
    timeAtLocation: '15 mins',
  },
  {
    id: '4',
    caseNumber: '2021-03-16-004',
    vehicle: '2019 Silver Honda Accord',
    vin: '1HGCV1F34KA098765',
    status: 'inactive' as CaseStatus,
    timeAtLocation: 'Inactive',
  },
  {
    id: '5',
    caseNumber: '2021-03-17-005',
    vehicle: '2023 Blue Ford F-150',
    vin: '1FTFW1E85NFA54321',
    status: 'active' as CaseStatus,
    timeAtLocation: '5 mins',
  },
];

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const modeColors = colors.dark; // Using dark mode colors (dashboard has dark background)

  const profileName = user?.profile && 'firstName' in user.profile
    ? user.profile.firstName
    : 'Officer';

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: 3,
        py: 2,
      }}
    >
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome back, {profileName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your stolen vehicle cases
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          onClick={() => navigate('/cases/new')}
          sx={{ mr: 2 }}
        >
          New SVL Request
        </Button>
        <Button
          variant="outlined"
          startIcon={<CarIcon />}
          size="large"
          onClick={() => navigate('/vin-lookup')}
        >
          VIN Lookup
        </Button>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Cases"
            value={3}
            icon={<CarIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="In Active Search"
            value={1}
            icon={<WarningIcon />}
            color="#d32f2f"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Recovered This Month"
            value={12}
            icon={<CheckCircleIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Avg. Resolution Time"
            value="4.2h"
            icon={<TrendingUpIcon />}
            color="#ed6c02"
            subtitle="Down 15% from last month"
          />
        </Grid>
      </Grid>

      {/* Most Recent Cases - styled like MainLayout */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="600" sx={{ color: modeColors.text.primary }}>
            Most Recent Cases
          </Typography>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/cases')}
            sx={{ color: '#00BFA5' }}
          >
            View All
          </Button>
        </Box>

        {/* Cases Grid */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {mockRecentCases.map((caseItem) => (
            <Box
              key={caseItem.id}
              onClick={() => navigate(`/cases/${caseItem.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/cases/${caseItem.id}`);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Case ${caseItem.caseNumber}, ${caseItem.vehicle}, Status: ${caseItem.status}, Time: ${caseItem.timeAtLocation}`}
              sx={{
                backgroundColor: modeColors.background.card,
                borderRadius: '10px',
                p: 2,
                cursor: 'pointer',
                border: `1px solid ${modeColors.border}`,
                transition: 'all 0.2s ease',
                '&:hover, &:focus': {
                  borderColor: '#00BFA5',
                  backgroundColor: modeColors.background.cardHover,
                  outline: 'none',
                },
                '&:focus-visible': {
                  outline: '2px solid #00BFA5',
                  outlineOffset: '2px',
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
        </Box>

        {mockRecentCases.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CarIcon sx={{ fontSize: 48, color: modeColors.text.secondary, mb: 2 }} />
            <Typography variant="body1" sx={{ color: modeColors.text.secondary }}>
              No recent cases
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 2, backgroundColor: '#00BFA5', '&:hover': { backgroundColor: '#00a893' } }}
              onClick={() => navigate('/cases/new')}
            >
              Create New SVL Request
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
