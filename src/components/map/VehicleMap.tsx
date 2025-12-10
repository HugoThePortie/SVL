import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Pane } from 'react-leaflet';
import type { Marker as LeafletMarker } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, IconButton } from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import { colors } from '../../theme/themes';
import type { ThemeMode } from '../../theme/themes';

// Fix for default marker icons in webpack/vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom car marker icon
const createCarIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-car-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

interface VehicleLocation {
  lat: number;
  lng: number;
  address?: string;
  timestamp?: string;
}

interface VehicleMapProps {
  location?: VehicleLocation;
  locationHistory?: VehicleLocation[];
  vehicleName?: string;
  caseNumber?: string;
  status?: 'active' | 'requested' | 'inactive';
  isMobile?: boolean;
  themeMode?: ThemeMode;
}

// Create numbered history marker icon
const createHistoryMarkerIcon = (number: number) => {
  return L.divIcon({
    className: 'history-marker',
    html: `
      <div style="
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      ">
        <div style="
          background-color: #6B7DB3;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          color: white;
          font-size: 12px;
          font-weight: 600;
        ">
          ${number}
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

// Component to handle map center updates
const MapUpdater: React.FC<{ center: [number, number]; isMobile?: boolean }> = ({ center, isMobile }) => {
  const map = useMap();
  useEffect(() => {
    if (isMobile) {
      // On mobile, offset the center upward so the pin appears in the visible area above the 50% bottom sheet
      // The bottom sheet covers 50% of the screen, so we want the pin at 25% from the top (center of visible area)
      // This means offsetting by 25% of the viewport height in latitude
      const mapSize = map.getSize();
      const offsetPixels = mapSize.y * 0.25; // 25% of viewport height
      const targetPoint = map.project(center, 15);
      const offsetPoint = L.point(targetPoint.x, targetPoint.y + offsetPixels);
      const offsetLatLng = map.unproject(offsetPoint, 15);
      map.flyTo(offsetLatLng, 15, { duration: 0.5 });
    } else {
      map.flyTo(center, 15, { duration: 0.5 });
    }
  }, [center[0], center[1], map, isMobile]);
  return null;
};

// Component to auto-open popup on the current location marker
const AutoOpenPopup: React.FC<{ markerRef: React.RefObject<LeafletMarker | null>; location: { lat: number; lng: number } | undefined }> = ({ markerRef, location }) => {
  const map = useMap();
  useEffect(() => {
    // Small delay to ensure marker is rendered after flyTo animation
    const timer = setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [markerRef, map, location?.lat, location?.lng]);
  return null;
};

// Helper to copy coordinates to clipboard
const copyToClipboard = (lat: number, lng: number) => {
  const coords = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  navigator.clipboard.writeText(coords);
};

export const VehicleMap: React.FC<VehicleMapProps> = ({
  location,
  locationHistory = [],
  status = 'active',
  isMobile = false,
  themeMode = 'dark',
}) => {
  const currentMarkerRef = useRef<LeafletMarker | null>(null);

  // Theme-aware colors
  const isDark = themeMode === 'dark';
  const modeColors = isDark ? colors.dark : colors.light;

  // Default center (San Francisco) if no location provided
  const defaultCenter: [number, number] = [37.7749, -122.4194];
  const center: [number, number] = location
    ? [location.lat, location.lng]
    : defaultCenter;

  // Get marker color based on status
  const getMarkerColor = () => {
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

  const carIcon = createCarIcon(getMarkerColor());

  // Tile layers - CartoDB (split into base and labels for styling)
  // Dark mode: CartoDB Dark Matter
  // Light mode: CartoDB Positron
  const baseUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png';
  const labelsUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png';

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        '& .leaflet-container': {
          height: '100%',
          width: '100%',
          background: modeColors.background.default,
          touchAction: 'manipulation',
        },
        '& .leaflet-labels-pane .leaflet-tile-pane': {
          filter: isDark ? 'brightness(1.5)' : 'none',
        },
        '& .leaflet-pane.labels-pane': {
          filter: isDark ? 'brightness(1.5)' : 'none',
        },
        '& .leaflet-control-zoom': {
          border: 'none',
          '& a': {
            backgroundColor: modeColors.background.paper,
            color: modeColors.text.primary,
            border: `1px solid ${modeColors.border}`,
            '&:hover': {
              backgroundColor: isDark ? '#2d3748' : '#e2e8f0',
            },
          },
        },
        '& .leaflet-control-attribution': {
          backgroundColor: isDark ? 'rgba(26, 35, 50, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          color: modeColors.text.secondary,
          fontSize: '10px',
          '& a': {
            color: '#49B27E',
          },
        },
        '& .leaflet-popup-content-wrapper': {
          backgroundColor: modeColors.background.paper,
          color: modeColors.text.primary,
          borderRadius: '8px',
          border: `1px solid ${modeColors.border}`,
        },
        '& .leaflet-popup-tip': {
          backgroundColor: modeColors.background.paper,
          borderColor: modeColors.border,
        },
        '& .leaflet-popup-close-button': {
          color: modeColors.text.secondary,
          '&:hover': {
            color: modeColors.text.primary,
          },
        },
      }}
    >
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        dragging={true}
        touchZoom={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
      >
        {/* Base map without labels */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={baseUrl}
        />
        {/* Labels layer - brightened via CSS in dark mode */}
        <Pane name="labels-pane" style={{ zIndex: 450 }}>
          <TileLayer url={labelsUrl} />
        </Pane>
        <MapUpdater center={center} isMobile={isMobile} />

        {/* History markers - numbered pins for past locations (only for active cases) */}
        {status === 'active' && locationHistory.map((historyLocation, index) => (
          <Marker
            key={`history-${index}`}
            position={[historyLocation.lat, historyLocation.lng]}
            icon={createHistoryMarkerIcon(index + 1)}
          >
            <Popup>
              <Box sx={{ minWidth: 140 }}>
                {historyLocation.timestamp && (
                  <Typography variant="body2" sx={{ color: modeColors.text.primary, mb: 0.5 }}>
                    {historyLocation.timestamp}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="caption" sx={{ color: modeColors.text.secondary, fontFamily: 'monospace' }}>
                    {historyLocation.lat.toFixed(6)}, {historyLocation.lng.toFixed(6)}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => copyToClipboard(historyLocation.lat, historyLocation.lng)}
                    aria-label="Copy coordinates to clipboard"
                    sx={{
                      p: 0.25,
                      color: modeColors.text.secondary,
                      '&:hover': { color: '#49B27E' },
                    }}
                  >
                    <CopyIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              </Box>
            </Popup>
          </Marker>
        ))}

        {/* Current location marker - car icon with auto-open popup */}
        {location && (
          <>
            <Marker
              position={[location.lat, location.lng]}
              icon={carIcon}
              ref={currentMarkerRef}
            >
              <Popup>
                <Box sx={{ minWidth: 140 }}>
                  {location.timestamp && (
                    <Typography variant="body2" sx={{ color: modeColors.text.primary, mb: 0.5 }}>
                      {location.timestamp}
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="caption" sx={{ color: modeColors.text.secondary, fontFamily: 'monospace' }}>
                      {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(location.lat, location.lng)}
                      aria-label="Copy coordinates to clipboard"
                      sx={{
                        p: 0.25,
                        color: modeColors.text.secondary,
                        '&:hover': { color: '#49B27E' },
                      }}
                    >
                      <CopyIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </Box>
              </Popup>
            </Marker>
            <AutoOpenPopup markerRef={currentMarkerRef} location={location} />
          </>
        )}
      </MapContainer>
    </Box>
  );
};
