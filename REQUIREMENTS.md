# SVL Portal - Functional Requirements

## Overview
The SVL (Stolen Vehicle Locator) Portal is a web application designed for law enforcement officers to manage and track stolen vehicle location requests. The application provides real-time vehicle tracking, case management, and team collaboration features.

---

## 1. Authentication & Authorization

### 1.1 User Authentication
- [x] Email and password login
- [x] Session persistence (remember logged-in users)
- [x] Secure logout functionality
- [x] Protected routes (redirect unauthenticated users to login)
- [x] Public routes (redirect authenticated users to main app)

### 1.2 User Roles
- [ ] Law Enforcement Officer
- [ ] Agency Administrator
- [ ] System Administrator

### 1.3 Verification Status
- [x] Display pending verification badge for unverified users
- [ ] Email verification flow
- [ ] Agency verification process

---

## 2. Dashboard

### 2.1 Overview Statistics
- [x] Total active cases count
- [x] Pending requests count
- [x] Vehicles recovered count
- [x] Average response time display

### 2.2 Navigation
- [x] Quick access to cases list
- [x] Settings menu access
- [x] Profile menu access
- [x] Notification settings access

---

## 3. Cases Management

### 3.1 Cases List
- [x] Display all cases with status indicators
- [x] Case card showing:
  - Case number
  - Vehicle information (year, make, model)
  - Time at location
  - Status (Active, Requested, Inactive)
- [x] Search functionality (by case number, vehicle, VIN)
- [x] Filter by status (Active, Requested, Inactive)
- [x] Sort/Order options:
  - Alphabetical (A-Z, Z-A)
  - Date (Newest to Oldest, Oldest to Newest)
  - Distance (Nearest to Farthest, Farthest to Nearest)

### 3.2 Case Details
- [x] Vehicle information display:
  - Case number
  - Vehicle description
  - VIN (with copy to clipboard)
  - License plate
  - Time at current location
- [x] Case members management
- [x] Toggle settings:
  - Active Search Mode
  - Vehicle Stationary Alert
  - Pause Notifications
  - Bad Vehicle Location flag
- [x] Vehicle Recovered action button

### 3.3 Create New Case
- [x] Multi-step modal wizard:
  1. **VIN Verification** - Enter and validate VIN, check SVL capability
  2. **Request Details** - Select request type, enter case number, add notes
  3. **Documentation** - Upload supporting documents (PDF, DOC, JPG, PNG)
  4. **Review & Submit** - Confirm all details before submission
- [x] Request types:
  - Exigent Circumstances
  - Court Order
  - Warrant
  - Customer Request
- [x] Document upload with file type validation
- [x] VIN lookup with capability check

### 3.4 Case Members
- [x] View existing case members
- [x] Add new members by email
- [x] Remove members (except self)
- [x] Attestation checkbox for adding members
- [x] Visual indicator for current user ("You")

---

## 4. Map & Vehicle Tracking

### 4.1 Map Display
- [x] Full-screen interactive map
- [x] OpenStreetMap tile layers
- [x] Dark mode tiles (CartoDB Dark Matter)
- [x] Light mode tiles (CartoDB Positron)
- [x] Zoom controls
- [x] Attribution display

### 4.2 Vehicle Location
- [x] Current vehicle location marker
- [x] Custom vehicle icon markers
- [x] Location popup with:
  - Vehicle name
  - Case number
  - Address
  - Timestamp
  - Coordinates

### 4.3 Location History
- [x] Historical location markers
- [x] Numbered markers showing order
- [x] Path/route line connecting locations
- [x] History popup with timestamp
- [x] Auto-fit map to show all markers

---

## 5. Notification Settings

### 5.1 Notification Types
- [x] Text message notifications toggle
- [x] Email notifications toggle

### 5.2 Phone Verification Flow
- [x] Verification required dialog
- [x] Phone number entry with formatting (1-XXX-XXX-XXXX)
- [x] OTP verification (6-digit code)
- [x] Success confirmation

### 5.3 Display Modes
- [x] Full-page view (mobile)
- [x] Modal dialog (desktop)
- [x] Bottom sheet drawer (mobile)

---

## 6. User Interface

### 6.1 Theme Support
- [x] Dark mode (default)
- [x] Light mode
- [x] Theme toggle in settings menu
- [x] Theme-aware component styling
- [x] Theme-aware map tiles

### 6.2 Responsive Design
- [x] Desktop layout with side drawer
- [x] Mobile layout with bottom sheets
- [x] Swipeable drawers on mobile
- [x] Touch-friendly controls
- [x] Responsive navigation

### 6.3 Navigation
- [x] App bar with logo
- [x] Dashboard button
- [x] Settings menu dropdown
- [x] Profile menu dropdown
- [x] Mobile hamburger menu

### 6.4 Accessibility
- [x] Keyboard navigation support
- [x] ARIA labels on interactive elements
- [x] Focus indicators
- [x] Color contrast compliance

---

## 7. Technical Requirements

### 7.1 Frontend Stack
- [x] React 19 with TypeScript
- [x] Material UI (MUI) component library
- [x] React Router for navigation
- [x] TanStack Query for data fetching
- [x] Leaflet for maps
- [x] Vite build tool

### 7.2 Browser Support
- [x] Chrome (latest)
- [x] Firefox (latest)
- [x] Safari (latest)
- [x] Edge (latest)
- [x] Mobile browsers (iOS Safari, Chrome for Android)

### 7.3 Performance
- [x] Hot module replacement (HMR) in development
- [x] Production build optimization
- [x] Code splitting recommendations
- [ ] Lazy loading for routes

---

## 8. Future Enhancements

### 8.1 Planned Features
- [ ] Real-time WebSocket updates for vehicle locations
- [ ] Push notifications (browser/mobile)
- [ ] Multi-agency collaboration
- [ ] Advanced reporting and analytics
- [ ] Audit logging
- [ ] Two-factor authentication
- [ ] SSO integration (SAML/OAuth)
- [ ] Offline support (PWA)
- [ ] Export case data (PDF/CSV)
- [ ] Vehicle slowdown/immobilization controls

### 8.2 API Integration
- [ ] Backend API connection
- [ ] OEM vehicle telematics integration
- [ ] VIN decoder service integration
- [ ] Geocoding service integration
- [ ] SMS/Email notification service

---

## 9. Security Requirements

### 9.1 Data Protection
- [ ] HTTPS enforcement
- [ ] Secure session management
- [ ] Input validation and sanitization
- [ ] XSS prevention
- [ ] CSRF protection

### 9.2 Access Control
- [ ] Role-based permissions
- [ ] Agency-level data isolation
- [ ] Audit trail for all actions
- [ ] Session timeout

### 9.3 Compliance
- [ ] CJIS Security Policy compliance
- [ ] Data retention policies
- [ ] Privacy policy enforcement

---

## Appendix

### Status Legend
- [x] Implemented
- [ ] Not yet implemented

### Version History
| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 2024 | Initial release with core features |
