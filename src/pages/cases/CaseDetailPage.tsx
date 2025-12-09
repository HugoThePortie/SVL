import React from 'react';
import { Box, Typography } from '@mui/material';

export const CaseDetailPage: React.FC = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 88px)',
        backgroundColor: '#1a2332',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Map placeholder - would integrate with Leaflet or Google Maps */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-122.4194,37.7749,12,0/800x600?access_token=pk.placeholder)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.8)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(13, 20, 33, 0.7)',
        }}
      >
        <Typography variant="h6" sx={{ color: '#8892a0' }}>
          Map View Coming Soon
        </Typography>
      </Box>
    </Box>
  );
};
