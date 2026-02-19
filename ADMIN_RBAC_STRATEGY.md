# Admin Panel & RBAC Strategy

## Overview
The portfolio website will include an admin panel with Role-Based Access Control (RBAC) to manage content, handle inquiries, and provide different access levels for various stakeholders.

## User Roles & Access Levels

### 1. **Public** (No Authentication)
**Access:**
- View all public content
- Submit contact forms
- Submit project idea forms
- Submit collaboration requests
- Submit freelance inquiry forms

**Restrictions:**
- Cannot view admin panel
- Cannot see form submissions
- Cannot edit content

### 2. **Visitor/Lead** (After Form Submission)
**Access:**
- Receive confirmation email
- Track submission status (optional feature)
- Access personalized thank you page

**Purpose:**
- Capture interest
- Build email list
- Enable follow-up

### 3. **Admin/Owner** (You - Full Access)
**Access:**
- Full admin panel access
- View all form submissions
- Edit all content (projects, services, ventures, bio)
- Manage media (upload images, PDFs)
- Analytics dashboard
- User management
- System settings

**Dashboard Sections:**
1. **Inquiries Management**
   - Freelance requests
   - Collaboration proposals
   - Project ideas
   - General contact forms
   - Filter by type, status, date
   - Mark as read/unread
   - Respond or archive

2. **Content Management**
   - Edit projects (professional, personal)
   - Edit services
   - Edit ventures
   - Edit about/bio
   - Upload/manage images
   - Upload/manage PDFs (publications, CV)

3. **Analytics**
   - Page views
   - Popular projects
   - Form conversion rates
   - Traffic sources
   - Visitor demographics

4. **Media Library**
   - Image uploads
   - PDF management
   - File organization

5. **Settings**
   - Availability status
   - Email notifications
   - SEO settings
   - Social links

### 4. **Collaborator** (Future - Partial Access)
**Access:**
- View specific venture details
- Access private collaboration space
- View shared documents
- Comment on ideas

**Use Case:**
- Potential co-founders
- Early design partners
- Advisors

**Restrictions:**
- Cannot edit main content
- Cannot view other inquiries
- Limited to assigned ventures

### 5. **Client** (Future - Project Access)
**Access:**
- View project progress dashboard
- Access project files
- View milestones
- Direct messaging

**Use Case:**
- Active freelance clients
- Project stakeholders

**Restrictions:**
- Only see their project
- Cannot access admin features
- Cannot view other clients' data

## Form Types & Data Capture

### 1. **Freelance Inquiry Form**
**Fields:**
- Name* (required)
- Email*
- Company name
- Project type (dropdown: Web Dev, ML/AI, MLOps, Full-Stack, Other)
- Budget range (dropdown)
- Timeline (dropdown)
- Project description*
- Additional requirements
- Preferred contact method
- How did you hear about me?

**Notifications:**
- Email to you immediately
- Auto-reply to submitter

**Admin View:**
- Prioritize by budget/timeline
- Tag by project type
- Status: New, Reviewed, In Discussion, Proposal Sent, Closed

### 2. **Collaboration Proposal Form**
**Fields:**
- Name*
- Email*
- Area of interest (dropdown: Hrisa Agents, Hrisa Code, Hrisa HR, Other)
- Your role/background*
- What you bring to the table*
- Collaboration idea*
- LinkedIn profile
- Availability

**Notifications:**
- Email to you
- Auto-reply with "Thanks, I'll review and reach out"

**Admin View:**
- Tag by venture
- Status: New, Interesting, Meeting Scheduled, Ongoing, Not a Fit

### 3. **Project Idea Submission Form**
**Fields:**
- Name*
- Email*
- Idea title*
- Problem you're solving*
- Brief description*
- Why this matters to you
- Looking for: Co-founder / Technical help / Funding / Feedback
- Optional: Attach document

**Notifications:**
- Email to you
- Auto-reply

**Admin View:**
- Rate ideas (1-5 stars)
- Tag by category
- Status: New, Reviewed, Interesting, Follow Up, Archived

### 4. **General Contact Form**
**Fields:**
- Name*
- Email*
- Subject*
- Message*
- Topic (dropdown: Question, Opportunity, Feedback, Other)

**Notifications:**
- Email to you
- Auto-reply

**Admin View:**
- Simple inbox-style view
- Status: Unread, Read, Replied, Archived

## Technical Implementation

### Authentication
```typescript
// Auth strategy
- NextAuth.js for authentication
- JWT-based sessions
- Secure password hashing (bcrypt)
- Email/password for admin
- Magic links for collaborators (optional)
- OAuth for future (GitHub, Google)
```

### Authorization Middleware
```typescript
// Protect admin routes
middleware.ts:
- Check authentication
- Verify role permissions
- Redirect unauthorized users
- Log access attempts

// API route protection
api/admin/*
- Verify JWT
- Check user role
- Return 401/403 for unauthorized
```

### Database Schema
```sql
-- Users table
users (
  id, email, password_hash, role,
  name, created_at, last_login
)

-- Form submissions
inquiries (
  id, type, status, priority,
  name, email, data (JSON),
  created_at, read_at, responded_at
)

-- Content versions (audit trail)
content_history (
  id, content_type, content_id,
  user_id, changes (JSON),
  created_at
)
```

### RBAC Implementation
```typescript
// roles.ts
export enum Role {
  PUBLIC = 'public',
  ADMIN = 'admin',
  COLLABORATOR = 'collaborator',
  CLIENT = 'client',
}

// permissions.ts
export const permissions = {
  [Role.ADMIN]: ['*'], // All permissions
  [Role.COLLABORATOR]: [
    'ventures:view:assigned',
    'comments:create',
    'documents:view:shared',
  ],
  [Role.CLIENT]: [
    'projects:view:own',
    'messages:create',
    'files:view:own',
  ],
};

// Middleware
export function requirePermission(permission: string) {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = permissions[userRole];

    if (userPermissions.includes('*') ||
        userPermissions.includes(permission)) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  };
}
```

## Admin Panel UI Structure

### Dashboard Routes
```
/admin
├── /dashboard              # Overview & analytics
├── /inquiries
│   ├── /freelance         # Freelance requests
│   ├── /collaborations    # Collaboration proposals
│   ├── /ideas             # Project ideas
│   └── /contact           # General contact
├── /content
│   ├── /projects          # Edit projects
│   ├── /services          # Edit services
│   ├── /ventures          # Edit ventures
│   └── /about             # Edit bio
├── /media                 # Media library
├── /analytics             # Detailed analytics
└── /settings              # System settings
```

### Admin Panel Features

**Dashboard Overview:**
- Quick stats cards (new inquiries, pending responses)
- Recent activity feed
- Top performing projects (views)
- Availability status toggle
- Quick actions

**Inquiry Management:**
- Table view with filters
- Status badges
- Quick actions (mark read, respond, archive)
- Bulk operations
- Search functionality
- Export to CSV

**Content Editor:**
- Rich text editor (TipTap or similar)
- Image upload with preview
- Live preview
- Auto-save drafts
- Version history
- Publish/unpublish

**Media Library:**
- Grid view with thumbnails
- Upload (drag & drop)
- Image optimization
- Organize by folders
- Search and filter
- Copy URL to clipboard

## Security Considerations

### 1. **Authentication Security**
- Strong password requirements
- Rate limiting on login attempts
- 2FA for admin account (future)
- Session timeout
- Secure password reset flow

### 2. **Authorization Security**
- Verify permissions on every request
- Don't trust client-side role checks
- Use server-side middleware
- Log access to sensitive data

### 3. **Data Protection**
- Encrypt sensitive data at rest
- Use HTTPS everywhere
- Sanitize user inputs
- Prevent SQL injection
- XSS protection
- CSRF tokens

### 4. **Privacy Compliance**
- GDPR compliance
- Clear privacy policy
- Data retention policies
- User data export
- Right to deletion
- Cookie consent

### 5. **API Security**
- API key authentication (for external integrations)
- Rate limiting
- Input validation
- Output encoding
- CORS configuration

## Email Notifications

### For You (Admin)
**New Freelance Inquiry:**
```
Subject: 🎯 New Freelance Inquiry - [Name] - [Project Type]

Name: [Name]
Email: [Email]
Company: [Company]
Project Type: [Type]
Budget: [Budget]
Timeline: [Timeline]

Description:
[Description]

View in admin panel: [Link]
```

**New Collaboration Proposal:**
```
Subject: 🤝 New Collaboration Proposal - [Name] - [Venture]

Name: [Name]
Email: [Email]
Area: [Venture]
Role: [Role]

What they bring:
[Skills]

Idea:
[Idea]

View in admin panel: [Link]
```

### For Submitter (Auto-Reply)
**Freelance Inquiry:**
```
Subject: Thanks for reaching out!

Hi [Name],

Thanks for your interest in working together! I've received your project inquiry and will review it shortly.

I typically respond within 24-48 hours. In the meantime, feel free to check out my recent work at [website link].

Best,
Mahdi Sellami

---
This is an automated message. Please don't reply to this email.
```

## Implementation Phases

### Phase 1: MVP (Current Priority)
- [x] Public website with static content
- [ ] Basic contact form
- [ ] Email notifications
- [ ] Simple admin authentication

### Phase 2: Full Admin Panel
- [ ] Admin dashboard
- [ ] Inquiry management
- [ ] All form types
- [ ] Content editing
- [ ] Media library

### Phase 3: Advanced Features
- [ ] Analytics dashboard
- [ ] Collaborator access
- [ ] Client portal
- [ ] Version history
- [ ] 2FA

### Phase 4: Automation
- [ ] AI-powered inquiry categorization
- [ ] Auto-response suggestions
- [ ] Project matching algorithms
- [ ] CRM integration

## Tech Stack for Admin Panel

**Backend:**
- Next.js API routes (or separate FastAPI backend)
- Prisma ORM or SQLAlchemy
- PostgreSQL database
- Redis for sessions/cache

**Authentication:**
- NextAuth.js (for Next.js)
- JWT tokens
- Bcrypt for password hashing

**Frontend (Admin UI):**
- Next.js pages in /admin
- Tailwind CSS (consistent with main site)
- Shadcn/ui or Radix UI components
- React Hook Form for forms
- TipTap for rich text editing

**File Upload:**
- Next.js API route handler
- Upload to S3/Cloudinary/local storage
- Image optimization with Sharp

**Email:**
- Nodemailer (self-hosted SMTP)
- SendGrid/Mailgun (transactional emails)
- Email templates with React Email

**Analytics:**
- Google Analytics
- Plausible (privacy-friendly)
- Custom event tracking

## Mockup Ideas

### Admin Login
```
┌─────────────────────────────┐
│                             │
│    🌶️ Hrisa Admin Panel    │
│                             │
│  ┌───────────────────────┐ │
│  │ Email                 │ │
│  └───────────────────────┘ │
│                             │
│  ┌───────────────────────┐ │
│  │ Password              │ │
│  └───────────────────────┘ │
│                             │
│  [ Login ]                  │
│                             │
└─────────────────────────────┘
```

### Dashboard
```
┌────────────────────────────────────────────┐
│ Hrisa Admin  [Mahdi] [Logout]              │
├────────────────────────────────────────────┤
│ Sidebar:     │ Dashboard Overview          │
│              │                             │
│ Dashboard    │ ┌──────┐ ┌──────┐ ┌──────┐│
│ Inquiries    │ │  12  │ │   3  │ │   5  │ │
│ Content      │ │ New  │ │Collab│ │Ideas │ │
│ Media        │ └──────┘ └──────┘ └──────┘ │
│ Analytics    │                             │
│ Settings     │ Recent Activity:            │
│              │ • New inquiry from...       │
│              │ • Collaboration from...     │
│              │                             │
└────────────────────────────────────────────┘
```

## Next Steps

1. Decide on admin panel priority
2. Choose between:
   - All-in-one Next.js (simpler, recommended for MVP)
   - Separate FastAPI backend (more scalable, familiar to you)
3. Set up database (PostgreSQL)
4. Implement basic authentication
5. Build first form (general contact)
6. Create admin inbox
7. Iterate from there

## Questions to Answer

1. Do you want admin panel in Phase 1 or later?
2. All-in-one Next.js or separate backend?
3. Which form types are most important first?
4. Self-hosted email or service (SendGrid)?
5. Analytics preference (Google Analytics vs Plausible)?
