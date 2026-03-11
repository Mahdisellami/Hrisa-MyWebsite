# Quick Turso Setup Guide

## What is Turso?
Turso is a cloud-based SQLite database that works perfectly with serverless platforms like Vercel.

---

## Setup Steps

### 1. Install Turso CLI

**macOS:**
```bash
brew install tursodatabase/tap/turso
```

**Other platforms:**
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

### 2. Login to Turso

```bash
turso auth login
```

This opens your browser for authentication.

### 3. Create Database

```bash
# Create in Tokyo region (closest to your users)
turso db create janette-portfolio --location nrt
```

**Other regions:**
- `iad` - US East (Virginia)
- `lhr` - Europe (London)
- `syd` - Australia (Sydney)
- `nrt` - Asia (Tokyo)
- `gru` - South America (São Paulo)

### 4. Get Database Credentials

**Get Database URL:**
```bash
turso db show janette-portfolio --url
```

Output example: `libsql://janette-portfolio-your-org.turso.io`

**Create Auth Token:**
```bash
turso db tokens create janette-portfolio
```

Output example: `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...`

**Save these values** - you'll add them to Vercel.

### 5. Initialize Database Schema

**Option A: Using Turso Shell**

```bash
# Open database shell
turso db shell janette-portfolio

# Copy entire content from lib/db/schema.sql
# Paste into shell
# Press Enter

# Exit shell
.exit
```

**Option B: Using Script (Recommended)**

```bash
# Set environment variables
export TURSO_DATABASE_URL="libsql://janette-portfolio-your-org.turso.io"
export TURSO_AUTH_TOKEN="your-token-here"

# Run initialization
npm run init:turso
```

### 6. Create Admin User

```bash
# With env vars still set from above
npm run create:admin -- --email=noreply@hrisa.tech
```

### 7. Verify Database

```bash
# List all tables
turso db shell janette-portfolio ".tables"

# Should show:
# audit_log  magic_links  protected_resources  sessions  share_links  users

# Check users
turso db shell janette-portfolio "SELECT email, role, status FROM users;"

# Should show your admin user
```

### 8. Add to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these two variables:
   - `TURSO_DATABASE_URL`: Your database URL
   - `TURSO_AUTH_TOKEN`: Your auth token
3. Set environment to: **Production**
4. Click **Save**

### 9. Deploy

Push your code to GitHub:
```bash
git push
```

Vercel will auto-deploy and use Turso database.

---

## Common Commands

**List databases:**
```bash
turso db list
```

**View database info:**
```bash
turso db show janette-portfolio
```

**Open database shell:**
```bash
turso db shell janette-portfolio
```

**Run SQL query:**
```bash
turso db shell janette-portfolio "SELECT COUNT(*) FROM users;"
```

**Create new auth token:**
```bash
turso db tokens create janette-portfolio
```

**Delete database (careful!):**
```bash
turso db destroy janette-portfolio
```

---

## Troubleshooting

**Error: "command not found: turso"**
- Install Turso CLI first (see Step 1)

**Error: "Authentication required"**
- Run: `turso auth login`

**Error: "Database already exists"**
- Use existing database or choose different name
- List databases: `turso db list`

**Error: "Failed to connect"**
- Check TURSO_DATABASE_URL is correct
- Check TURSO_AUTH_TOKEN is valid
- Regenerate token if needed

---

## Free Tier Limits

Turso free tier includes:
- **3 databases**
- **500 MB total storage**
- **1 billion row reads per month**
- **25 million row writes per month**
- **Unlimited locations**

This is more than enough for most portfolios!

---

## Security Notes

- **Never commit** `TURSO_AUTH_TOKEN` to git
- Tokens are long-lived - rotate them periodically
- Each environment (production, preview) can use same database or separate ones
- Use read-only tokens for analytics/reporting if needed

---

## Next Steps

After Turso is set up:
1. ✅ Database credentials added to Vercel
2. ✅ Admin user created in Turso
3. Deploy to Vercel
4. Test login on production site
5. Verify admin panel works

---

**Documentation:** https://docs.turso.tech
**Dashboard:** https://turso.tech/app
**Support:** https://discord.gg/turso
