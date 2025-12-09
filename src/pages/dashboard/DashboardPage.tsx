import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Add as AddIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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

// Mock data for demonstration
const mockActiveCases = [
  {
    id: '1',
    caseNumber: 'SVL-2024-001234',
    vin: '1HGBH41JXMN109186',
    vehicle: '2023 Honda Accord',
    status: 'active_search',
    lastLocation: '123 Main St, Metro City',
    lastUpdate: '2 min ago',
  },
  {
    id: '2',
    caseNumber: 'SVL-2024-001235',
    vin: '5YJSA1DN5DFP14555',
    vehicle: '2022 Tesla Model S',
    status: 'svl_activated',
    lastLocation: '456 Oak Ave, Metro City',
    lastUpdate: '15 min ago',
  },
  {
    id: '3',
    caseNumber: 'SVL-2024-001236',
    vin: 'WVWZZZ3CZWE123456',
    vehicle: '2021 Volkswagen ID.4',
    status: 'monitoring',
    lastLocation: '789 Pine Rd, Metro City',
    lastUpdate: '1 hour ago',
  },
];

const getStatusChip = (status: string) => {
  const statusConfig: Record<string, { label: string; color: 'success' | 'warning' | 'error' | 'info' }> = {
    active_search: { label: 'Active Search', color: 'error' },
    svl_activated: { label: 'SVL Active', color: 'warning' },
    monitoring: { label: 'Monitoring', color: 'info' },
    recovered: { label: 'Recovered', color: 'success' },
  };

  const config = statusConfig[status] || { label: status, color: 'info' };
  return <Chip label={config.label} color={config.color} size="small" />;
};

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const profileName = user?.profile && 'firstName' in user.profile
    ? user.profile.firstName
    : 'Officer';

  return (
    <Box>
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

      {/* Active Cases List */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Your Active Cases
            </Typography>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/cases')}
            >
              View All
            </Button>
          </Box>

          <List>
            {mockActiveCases.map((caseItem, index) => (
              <React.Fragment key={caseItem.id}>
                {index > 0 && <Divider />}
                <ListItem
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'grey.50' },
                    borderRadius: 1,
                  }}
                  onClick={() => navigate(`/cases/${caseItem.id}`)}
                  secondaryAction={
                    <IconButton edge="end">
                      <ArrowForwardIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <CarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {caseItem.caseNumber}
                        </Typography>
                        {getStatusChip(caseItem.status)}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          {caseItem.vehicle} • VIN: {caseItem.vin.slice(-8)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          <LocationIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {caseItem.lastLocation}
                          </Typography>
                          <ScheduleIcon sx={{ fontSize: 14, color: 'text.secondary', ml: 1 }} />
                          <Typography variant="caption" color="text.secondary">
                            {caseItem.lastUpdate}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>

          {mockActiveCases.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CarIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No active cases
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/cases/new')}
              >
                Create New SVL Request
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
