// User & Authentication Types
export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: OfficerProfile | AgentProfile | null;
  isVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
}

export type UserRole = 'law_enforcement' | 'agent' | 'admin';

export interface OfficerProfile {
  id: string;
  firstName: string;
  lastName: string;
  badgeNumber: string;
  department: string;
  jurisdiction: string;
  phoneNumber: string;
  email: string;
  preferredNotificationMethod: NotificationMethod;
  notificationPreferences: NotificationPreferences;
  isVerified: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentProfile {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  createdAt: Date;
}

// Notification Types
export type NotificationMethod = 'email' | 'sms' | 'both';

export interface NotificationPreferences {
  method: NotificationMethod;
  email?: string;
  phone?: string;
  suppressionMinutes: number; // 0 = no suppression (active search mode)
  onlyWhenStationary: boolean;
  stationaryMinutes?: number;
}

// SVL Case Types
export interface SVLCase {
  id: string;
  caseNumber: string;
  status: CaseStatus;
  vin: string;
  vehicleInfo: VehicleInfo;
  requestType: RequestType;
  requestingOfficer: OfficerProfile;
  assignedOfficers: OfficerProfile[];
  customer?: CustomerInfo;
  locations: VehicleLocation[];
  notifications: NotificationRecord[];
  isActiveSearchMode: boolean;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  resolutionType?: ResolutionType;
}

export type CaseStatus =
  | 'pending_verification'
  | 'verified'
  | 'svl_activated'
  | 'active_search'
  | 'monitoring'
  | 'recovered'
  | 'closed'
  | 'bad_location';

export type RequestType =
  | 'exigent_circumstances'
  | 'court_order'
  | 'warrant'
  | 'customer_request';

export type ResolutionType =
  | 'recovered'
  | 'bad_location'
  | 'customer_cancelled'
  | 'other';

// Vehicle Types
export interface VehicleInfo {
  vin: string;
  make: string;
  model: string;
  year: number;
  color?: string;
  licensePlate?: string;
  isSVLCapable: boolean;
  hasSlowdown: boolean;
  hasImmobilization: boolean;
  oem: string;
  customerServiceNumber?: string;
}

export interface VehicleLocation {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  isValid: boolean;
  isMoving: boolean;
  speed?: number;
  heading?: number;
  address?: string;
}

// Customer Types
export interface CustomerInfo {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferredNotificationMethod: NotificationMethod;
}

// Notification Records
export interface NotificationRecord {
  id: string;
  caseId: string;
  recipientId: string;
  recipientType: 'officer' | 'customer' | 'agent';
  method: NotificationMethod;
  type: NotificationType;
  content: string;
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
  status: NotificationStatus;
  failureReason?: string;
}

export type NotificationType =
  | 'svl_activated'
  | 'location_update'
  | 'vehicle_recovered'
  | 'bad_location'
  | 'case_assigned'
  | 'case_updated'
  | 'verification_required';

export type NotificationStatus =
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed'
  | 'bounced';

// VIN Lookup
export interface VINLookupResult {
  vin: string;
  isSVLCapable: boolean;
  vehicleInfo?: VehicleInfo;
  customerServiceNumber?: string;
  message?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  badgeNumber: string;
  department: string;
  jurisdiction: string;
  phoneNumber: string;
}

export interface SVLRequestForm {
  vin: string;
  requestType: RequestType;
  caseNumber: string;
  documentationFile?: File;
  notes?: string;
}

// Dashboard Stats
export interface DashboardStats {
  activeCases: number;
  pendingVerification: number;
  recoveredThisMonth: number;
  averageResolutionTime: number; // in hours
}
