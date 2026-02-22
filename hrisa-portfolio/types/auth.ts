export type Role = 'PUBLIC' | 'EDITOR' | 'ADMIN';
export type UserStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type ResourceType = 'PAGE' | 'SECTION' | 'PROJECT';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  status: UserStatus;
  created_at: number;
  updated_at: number;
  approved_at: number | null;
  approved_by: string | null;
  last_login_at: number | null;
}

export interface PublicUser {
  id: string;
  email: string;
  name: string | null;
  role: Role;
}

export interface AuditLogEntry {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  metadata: string | null;
  created_at: number;
}
