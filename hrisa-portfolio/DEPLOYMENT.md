# Production Deployment Guide

## Overview
This guide covers deploying the Janette to Vercel with full RBAC functionality.

---

## Prerequisites

1. **Vercel Account**: https://vercel.com
2. **Turso Account** (for production database): https://turso.tech
3. **Resend Account** (for emails): https://resend.com
4. **Domain**: janette.technology configured in Vercel

---

## Step 1: Set Up Turso Database (Production SQLite)

Vercel is serverless, so local SQLite won't persist. Use Turso for cloud SQLite.

### 1a. Install Turso CLI

```bash
# macOS
brew install tursodatabase/tap/turso

# Or use npm
npm install -g @turso/cli
```

### 1b. Login to Turso

```bash
turso auth login
```

### 1c. Create Database

```bash
# Create database
turso db create janette-portfolio --location nrt  # Tokyo region

# Get database URL
turso db show janette-portfolio --url

# Create auth token
turso db tokens create janette-portfolio
```

**Save these values:**
- `TURSO_DATABASE_URL`: The database URL (starts with libsql://)
- `TURSO_AUTH_TOKEN`: The authentication token

### 1d. Initialize Database Schema

```bash
# Connect to Turso shell
turso db shell janette-portfolio

# Copy and paste the entire schema from lib/db/schema.sql
# Then exit
.exit
```

**Or use the initialization script:**

```bash
# Set environment variables temporarily
export TURSO_DATABASE_URL="libsql://your-database.turso.io"
export TURSO_AUTH_TOKEN="your-token"

# Run initialization
npm run db:init
```

### 1e. Create Admin User in Production

```bash
# With Turso env vars set
export TURSO_DATABASE_URL="libsql://your-database.turso.io"
export TURSO_AUTH_TOKEN="your-token"

# Create admin
npm run create:admin -- --email=noreply@janette.technology
```

---

## Step 2: Configure Vercel

### 2a. Import Project

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select: `Mahdisellami/Hrisa-MyWebsite`
4. Click **"Import"**

### 2b. Configure Build Settings

**Root Directory:**
- Click "Edit"
- Set to: `janette-portfolio`

**Framework:**
- Should auto-detect as "Next.js"

**Build & Development Settings:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 2c. Add Environment Variables

Click **"Environment Variables"** and add:

**For Production environment:**

```bash
# Email Service (Resend)
RESEND_API_KEY=re_acpfkyF9_NznUSqjVYyWQb4mfMZ8Kbe8P

# Admin Configuration
ADMIN_EMAIL=noreply@janette.technology

# Application URL (update after deployment)
BASE_URL=https://janette.technology

# Turso Database (Production)
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-token
```

**Important:**
- Make sure all variables are set to **"Production"**
- Do NOT add `DATABASE_PATH` (that's for local development only)
- The app will automatically use Turso if `TURSO_DATABASE_URL` is set

### 2d. Deploy

Click **"Deploy"** button

Wait for deployment to complete (2-5 minutes)

---

## Step 3: Configure Custom Domain

### 3a. Add Domain in Vercel

1. Go to Project Settings → Domains
2. Click **"Add Domain"**
3. Enter: `janette.technology`
4. Vercel will provide DNS records

### 3b. Update DNS (if needed)

Your janette.technology domain should already have:
- A record or CNAME pointing to Vercel
- MX records for email forwarding (ImprovMX)
- TXT records for Resend email

Vercel will auto-configure if domain is already in your Vercel account.

### 3c. Update BASE_URL

After domain is connected:

1. Go to Project Settings → Environment Variables
2. Edit `BASE_URL`
3. Change to: `https://janette.technology`
4. Redeploy (Deployments → Latest → Redeploy)

---

## Step 4: Verify Deployment

### 4a. Test Homepage

Visit: https://janette.technology

Should load without errors.

### 4b. Test Login

1. Visit: https://janette.technology/login
2. Enter: noreply@janette.technology
3. Check Gmail for magic link (forwarded via ImprovMX)
4. Click link to login

### 4c. Test Admin Panel

1. After logging in, visit: https://janette.technology/admin
2. Should see dashboard with stats
3. Verify all admin features work:
   - Users
   - Permissions
   - Share Links
   - Audit Logs

### 4d. Test Protected Resources

1. Log out or use incognito
2. Try accessing: https://janette.technology/hobbies/photography
3. Should be blocked (requires ADMIN)
4. Login and try again - should work

---

## Step 5: Post-Deployment Tasks

### 5a. Seed Protected Resources (if needed)

```bash
# Connect to production
export TURSO_DATABASE_URL="libsql://your-database.turso.io"
export TURSO_AUTH_TOKEN="your-token"

# Seed protections
npm run seed:protections
```

### 5b. Set Up Cleanup Cron Job

Create a Vercel Cron Job to clean expired sessions/links:

1. Create `vercel.json` in project root (already done)
2. Add cron configuration (see below)
3. Redeploy

### 5c. Monitor Logs

1. Go to Vercel Dashboard → Project → Logs
2. Monitor for any errors
3. Check Resend dashboard for email delivery

---

## Troubleshooting

### Database Connection Errors

**Error:** "Failed to connect to database"

**Solution:**
1. Verify `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set in Vercel
2. Check Turso dashboard: database is active
3. Regenerate token if needed: `turso db tokens create janette-portfolio`

### Email Not Sending

**Error:** "Failed to send email"

**Solution:**
1. Verify `RESEND_API_KEY` is set in Vercel
2. Check Resend dashboard: API key is valid
3. Verify domain (janette.technology) is verified in Resend
4. Check Resend email logs

### Admin Access Denied

**Error:** "Access Denied" when visiting /admin

**Solution:**
1. Verify user is created with ADMIN role in Turso
2. Check session cookie is set (browser DevTools)
3. Verify role hierarchy in code matches production

### Build Failures

**Error:** Build fails on Vercel

**Solution:**
1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Ensure TypeScript errors are fixed
4. Check that root directory is set to `janette-portfolio`

---

## Security Checklist

Before going live:

- [ ] All environment variables are set in Vercel (Production)
- [ ] `.env.local` is NOT committed to git (check `.gitignore`)
- [ ] Turso database has admin user created
- [ ] Resend domain (janette.technology) is verified
- [ ] Email forwarding (ImprovMX) is working
- [ ] Admin panel requires ADMIN role (level 1)
- [ ] Protected resources require appropriate roles
- [ ] Magic links expire in 15 minutes
- [ ] Sessions have expiration times
- [ ] Audit logging is enabled

---

## Maintenance

### Update Environment Variables

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Edit variable
3. Redeploy for changes to take effect

### Database Migrations

For schema changes:

1. Update `lib/db/schema.sql`
2. Connect to Turso shell: `turso db shell janette-portfolio`
3. Run migration SQL manually
4. Or create migration script in `scripts/migrations/`

### Backup Database

```bash
# Export database
turso db shell janette-portfolio ".backup hrisa-backup.db"
```

### Monitor Email Delivery

1. Resend Dashboard → Emails
2. Check delivery status
3. Monitor bounce/spam rates

---

## Cost Estimates

**Free Tier:**
- Vercel: Free for hobby projects
- Turso: Free tier includes 500MB storage, 1B row reads/month
- Resend: 100 emails/day, 3,000/month
- ImprovMX: Free for email forwarding

**Paid (if needed):**
- Vercel Pro: $20/month (more bandwidth, team features)
- Turso Starter: $29/month (more storage/requests)
- Resend Starter: $20/month (50,000 emails/month)

---

## Support

**Issues:**
- GitHub: https://github.com/Mahdisellami/Hrisa-MyWebsite/issues
- Vercel Support: https://vercel.com/support
- Turso Discord: https://discord.gg/turso

**Documentation:**
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Turso: https://docs.turso.tech
- Resend: https://resend.com/docs

---

**Last Updated:** February 26, 2026
