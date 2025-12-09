# SVL Portal - Product Requirements Document

**Version:** 1.0
**Last Updated:** December 2025
**Status:** In Development

---

## Executive Summary

The SVL (Stolen Vehicle Locator) Portal is a web application that enables law enforcement officers to submit, track, and manage stolen vehicle location requests through SiriusXM's Connected Vehicle services. The portal also provides SXM agents with tools to verify and process these requests efficiently.

---

## User Roles

### 1. Law Enforcement Officers
Primary users who submit SVL requests and receive vehicle location updates.

### 2. SXM CV Agents
Internal users who verify law enforcement profiles, process requests, and manage the SVL workflow.

### 3. Product Team / Admins
Internal stakeholders who monitor system performance and manage configurations.

---

## Feature Requirements

### Law Enforcement Portal Functions

#### Profile Management
| ID | User Story | Priority |
|----|------------|----------|
| LE-01 | Create profile with key information for portal access | High |
| LE-02 | Get verified by SXM to avoid re-validation on each request | High |
| LE-03 | Secure login to create requests and access case information | High |
| LE-04 | Update profile information as things change | Medium |
| LE-05 | Set notification preferences (email, SMS, frequency) | High |
| LE-06 | Remove profile when no longer needed | Low |

#### SVL Request Management
| ID | User Story | Priority |
|----|------------|----------|
| LE-07 | Begin SVL activation for exigent circumstances, court orders, warrants, customer requests | High |
| LE-08 | Submit all requests via portal for efficiency and error reduction | High |
| LE-09 | Provide feedback on portal and request process | Medium |
| LE-10 | Submit VIN to determine if vehicle is SVL capable | High |
| LE-11 | Receive customer service phone number for SVL-capable vehicles | High |

#### Case Monitoring
| ID | User Story | Priority |
|----|------------|----------|
| LE-12 | View information about previously submitted requests | High |
| LE-13 | View all location data since SVL activation | High |
| LE-14 | Get status of SVL requests | High |
| LE-15 | View vehicle status (bad locations, stationary mode, etc.) | High |

#### Active Search Mode
| ID | User Story | Priority |
|----|------------|----------|
| LE-16 | Select 'Active Search Mode' for real-time notifications | High |
| LE-17 | Leave 'Active Search Mode' when no longer searching | High |
| LE-18 | Receive notifications at appropriate frequency based on mode | High |

#### Case Resolution
| ID | User Story | Priority |
|----|------------|----------|
| LE-19 | Indicate vehicle has been recovered | High |
| LE-20 | Indicate vehicle is sending bad location information | High |
| LE-21 | Get notification if not in Active Search Mode when reporting bad locations | Medium |
| LE-22 | Request no location updates until vehicle is stationary | Medium |

#### Collaboration
| ID | User Story | Priority |
|----|------------|----------|
| LE-23 | Request access to active SVL cases by case number | Medium |
| LE-24 | Add/remove other verified officers from cases | Medium |
| LE-25 | Indicate when no longer assigned to a case | Medium |
| LE-26 | Long session duration to avoid frequent re-login | Medium |

### Notification Functions

| ID | User Story | Priority |
|----|------------|----------|
| NF-01 | Receive "SVL Mode Activated" notifications via preferred channel | High |
| NF-02 | Receive location updates via preferred channel | High |
| NF-03 | Direct notifications to originating case officer | High |
| NF-04 | Set suppression values for notification frequency | High |
| NF-05 | Set suppression rule for stationary-only notifications | Medium |
| NF-06 | Vehicle movement indicator in notifications | High |
| NF-07 | Easily put vehicle into Slowdown or Immobilization modes | Medium |
| NF-08 | Easy recovery indication linked from notifications | High |
| NF-09 | Readable notifications on desktop and mobile | High |
| NF-10 | Specific notification elements for quick evaluation | High |

### SXM Agent Functions

#### Account Management
| ID | User Story | Priority |
|----|------------|----------|
| AG-01 | Law enforcement self-service account creation | High |
| AG-02 | Easy account creation during validation calls | High |
| AG-03 | Notifications for new profiles needing verification | High |
| AG-04 | Use existing system for officer validation | High |
| AG-05 | Documented process for validating officers | High |
| AG-06 | View profiles regardless of status | High |
| AG-07 | Validate officers via Agent Navigator with masked data | High |
| AG-08 | Direct law enforcement to portal for self-service | Medium |
| AG-09 | Send portal enrollment links | Medium |

#### Case Management
| ID | User Story | Priority |
|----|------------|----------|
| AG-10 | View location history for vehicles in SVL mode | High |
| AG-11 | Change notification recipient officers | High |
| AG-12 | Add officers to cases | High |
| AG-13 | Send automatic first SVL report notification to customer | High |
| AG-14 | Call PSAP if no officer profile exists | High |
| AG-15 | Notification for SMS/email delivery failures | High |
| AG-16 | View all notifications sent to law enforcement | Medium |
| AG-17 | Auto-log recovery and disable SVL mode | High |
| AG-18 | Handle bad location reports automatically | High |
| AG-19 | Handle stationary-only requests automatically | Medium |
| AG-20 | Script for declined customer SVL requests | Medium |

#### Agent Navigator Integration
| ID | User Story | Priority |
|----|------------|----------|
| AN-01 | Consistent OEM functionality across all brands | High |
| AN-02 | Add Good Will service for any OEM | High |
| AN-03 | Notifications for new SVL requests | High |
| AN-04 | Documented SVL request validation process | High |
| AN-05 | Notification if rapid initiation has existing data | High |
| AN-06 | Display historical location data immediately | High |
| AN-07 | Single source for recording/tracking updates | High |

### Customer/Driver Functions

| ID | User Story | Priority |
|----|------------|----------|
| DR-01 | Tampering notifications with call-to-action | High |
| DR-02 | Receive appropriate law enforcement phone number | High |
| DR-03 | Simple vehicle ownership acknowledgment | High |
| DR-04 | Officer communicates directly with SXM | High |
| DR-05 | Rapid initiation process for quick SVL activation | High |
| DR-06 | Notification when police first notified of location | High |

### Product Team Requirements

#### Performance
| ID | Requirement | Target |
|----|-------------|--------|
| PT-01 | API uptime | 99.999% (5 nines) |
| PT-02 | API response time | < 500ms |
| PT-03 | Scalability | All on-platform OEMs |

#### Operational Metrics
| ID | Metric | Priority |
|----|--------|----------|
| PT-04 | Total notifications sent | High |
| PT-05 | Average notifications per case until resolved | High |
| PT-06 | Soft and hard failure rates | High |
| PT-07 | Bouncing addresses | High |
| PT-08 | Email open rate | Medium |
| PT-09 | Portal viewing rate | Medium |
| PT-10 | Spam complaints | High |
| PT-11 | API calls and success rates | High |
| PT-12 | Most visited pages | Medium |
| PT-13 | Law enforcement login count | Medium |

#### Security & Compliance
| ID | Requirement | Priority |
|----|-------------|----------|
| PT-14 | Unique email domain for notifications | High |
| PT-15 | Unique phone number for SMS | High |
| PT-16 | Pre-rollout functionality and UX testing | High |
| PT-17 | Automatic logging of all officer actions | High |
| PT-18 | Enterprise security/privacy compliance | High |
| PT-19 | Verification metadata (agent, timestamp, contact) | High |
| PT-20 | Training environment for agents | High |
| PT-21 | Agent Navigator reporting updates | Medium |

---

## Technical Architecture

### Tech Stack
- **Frontend:** React + TypeScript
- **UI Framework:** Material UI
- **State Management:** React Query + Context API
- **Routing:** React Router v6
- **Build Tool:** Vite

### Project Structure
```
SVLPortal/
├── src/
│   ├── components/
│   │   ├── common/       # Shared UI components
│   │   ├── layout/       # Layout components (MainLayout, etc.)
│   │   ├── forms/        # Form components
│   │   └── maps/         # Map-related components
│   ├── pages/
│   │   ├── auth/         # Login, Register, Forgot Password
│   │   ├── dashboard/    # Main dashboard
│   │   ├── cases/        # Case management pages
│   │   ├── profile/      # User profile pages
│   │   └── admin/        # Admin panel pages
│   ├── services/         # API services
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── contexts/         # React contexts
│   └── assets/           # Static assets
├── public/
└── package.json
```

### Data Models

#### User/Profile
- User (id, email, role, profile, isVerified, timestamps)
- OfficerProfile (badge, department, jurisdiction, contact, preferences)
- AgentProfile (employeeId, name, email)

#### SVL Cases
- SVLCase (caseNumber, status, VIN, vehicleInfo, officers, locations, notifications)
- VehicleInfo (VIN, make/model, capabilities)
- VehicleLocation (lat/lng, timestamp, validity, movement)

#### Notifications
- NotificationRecord (recipient, method, type, content, status, timestamps)
- NotificationPreferences (method, suppression, stationaryOnly)

---

## Implementation Phases

### Phase 1: Core Portal (MVP)
- [ ] User authentication (login/register)
- [ ] Officer profile management
- [ ] VIN lookup functionality
- [ ] Basic SVL request submission
- [ ] Dashboard with active cases

### Phase 2: Case Management
- [ ] Full case detail views
- [ ] Location history with map
- [ ] Active Search Mode toggle
- [ ] Recovery/bad location reporting
- [ ] Case collaboration (add/remove officers)

### Phase 3: Notifications
- [ ] Email notification delivery
- [ ] SMS notification delivery
- [ ] Notification preferences
- [ ] Suppression rules

### Phase 4: Agent Tools
- [ ] Agent dashboard
- [ ] Profile verification workflow
- [ ] Case management for agents
- [ ] Notification monitoring

### Phase 5: Advanced Features
- [ ] Slowdown/Immobilization commands
- [ ] Reporting and analytics
- [ ] Training environment
- [ ] API integrations

---

## Security Requirements

- All data encrypted in transit (TLS 1.3)
- All data encrypted at rest
- Multi-factor authentication for all users
- Role-based access control (RBAC)
- Audit logging for all actions
- Session timeout with configurable duration
- API rate limiting
- Input validation and sanitization

---

## Success Metrics

| Metric | Target |
|--------|--------|
| System Uptime | 99.999% |
| API Response Time | < 500ms |
| Officer Onboarding Time | < 5 minutes |
| Request Submission Time | < 2 minutes |
| Average Case Resolution Time | Decrease by 20% |
| User Satisfaction Score | > 4.5/5 |

---

## Glossary

| Term | Definition |
|------|------------|
| SVL | Stolen Vehicle Locator |
| VIN | Vehicle Identification Number |
| OEM | Original Equipment Manufacturer |
| PSAP | Public Safety Answering Point |
| CV | Connected Vehicle |
| ENS | Email Notification Service |
