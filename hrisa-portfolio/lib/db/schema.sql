-- Hrisa Portfolio RBAC Database Schema
-- SQLite database for authentication and authorization

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'EDITOR',  -- PUBLIC, EDITOR, ADMIN
  status TEXT NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  approved_at INTEGER,
  approved_by TEXT,
  last_login_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- Magic links table
CREATE TABLE IF NOT EXISTS magic_links (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at INTEGER NOT NULL,  -- 15 minutes from creation
  created_at INTEGER NOT NULL,
  consumed_at INTEGER,           -- NULL until used
  ip_address TEXT
);

CREATE INDEX IF NOT EXISTS idx_magic_links_token ON magic_links(token);
CREATE INDEX IF NOT EXISTS idx_magic_links_email ON magic_links(email);
CREATE INDEX IF NOT EXISTS idx_magic_links_expires_at ON magic_links(expires_at);

-- Share links table (temporary access links)
CREATE TABLE IF NOT EXISTS share_links (
  id TEXT PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  created_by TEXT NOT NULL,
  resource_type TEXT NOT NULL,      -- 'PAGE', 'SECTION', 'PROJECT', 'ALL'
  resource_id TEXT,                 -- NULL for 'ALL' access
  expires_at INTEGER NOT NULL,      -- Customizable expiry
  max_uses INTEGER,                 -- NULL = unlimited uses
  use_count INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_share_links_token ON share_links(token);
CREATE INDEX IF NOT EXISTS idx_share_links_created_by ON share_links(created_by);
CREATE INDEX IF NOT EXISTS idx_share_links_expires_at ON share_links(expires_at);

-- Protected resources table
CREATE TABLE IF NOT EXISTS protected_resources (
  id TEXT PRIMARY KEY,
  resource_type TEXT NOT NULL,      -- 'PAGE', 'SECTION', 'PROJECT'
  resource_id TEXT NOT NULL,        -- e.g., 'mahdi-sellami', 'hrisa-code', '/hobbies/photography'
  min_role TEXT NOT NULL DEFAULT 'EDITOR', -- Minimum role required to access
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  UNIQUE(resource_type, resource_id)
);

CREATE INDEX IF NOT EXISTS idx_protected_resources_type_id ON protected_resources(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_protected_resources_role ON protected_resources(min_role);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,             -- LOGIN, LOGOUT, ACCESS_GRANTED, ACCESS_DENIED, REGISTRATION_REQUEST, etc.
  resource_type TEXT,
  resource_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  metadata TEXT,                    -- JSON string for additional data
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);
