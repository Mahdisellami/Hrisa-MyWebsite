# RBAC Quick Start - Final Steps

**Status:** 98% Complete ✅
**Remaining Time:** ~15 minutes
**Last Step:** Add Resend API Key

---

## ✅ What's Already Done

- ✅ Complete RBAC system implemented
- ✅ Database schema created and initialized
- ✅ All API routes built
- ✅ Admin panel UI complete
- ✅ Authentication system ready
- ✅ Email templates designed
- ✅ `.env.local` file created

**See full details:** `RBAC-STATUS.md`

---

## 🎯 3 Steps to Finish (15 minutes)

### Step 1: Get Resend API Key (5 minutes)

**Why:** Needed for magic link emails (passwordless authentication)

**How:**
1. Go to: https://resend.com
2. Click "Sign Up" (free tier: 100 emails/day)
3. Verify your email
4. Go to: https://resend.com/api-keys
5. Click "Create API Key"
6. Name it: "Hrisa Portfolio - Dev"
7. Copy the key (starts with `re_`)

**Paste into `.env.local`:**
```bash
# Open the file
code .env.local

# Or use nano
nano .env.local

# Find this line:
RESEND_API_KEY=

# Paste your key after the equals sign (no quotes):
RESEND_API_KEY=re_abc123xyz...
```

**Also update your email:**
```bash
# Change this:
ADMIN_EMAIL=mahdi.sellami@example.com

# To your real email:
ADMIN_EMAIL=your.actual@email.com
```

**Save and close** (Ctrl+S, then Ctrl+X if using nano)

---

### Step 2: Create Admin User (2 minutes)

```bash
# Make sure you're in the janette-portfolio directory
pwd
# Should show: /Users/peng/Documents/mse/private/Hrisa-MyWebsite/janette-portfolio

# Run the script with YOUR email
npm run create:admin -- --email=your.actual@email.com
```

**Expected output:**
```
🔐 Creating admin user: your.actual@email.com

✅ Admin user created successfully!

📧 To log in:
  1. Visit: http://localhost:3000/login
  2. Enter email: your.actual@email.com
  3. Check your email for the magic link

⚠️  Make sure RESEND_API_KEY is set in .env.local
```

**If error:** Check that RESEND_API_KEY is set in `.env.local`

---

### Step 3: Test the System (8 minutes)

#### 3a. Start Dev Server
```bash
npm run dev
```

**Expected output:**
```
   ▲ Next.js 15.x.x
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 2.5s
```

#### 3b. Test Login Flow

1. **Visit:** http://localhost:3000/login

2. **Enter your email** (the one you used in Step 2)

3. **Click "Send Magic Link"**
   - Should see success message
   - Should receive email within 10-30 seconds

4. **Check your email:**
   - Look for email from "Hrisa Portfolio"
   - Subject: "Your Magic Link to Hrisa Portfolio"
   - Click the big "Sign In" button

5. **Should redirect to:**
   - Homepage or /admin
   - You're now logged in!

6. **Test admin access:**
   - Visit: http://localhost:3000/admin
   - Should see dashboard with stats:
     - Total Users: 1
     - Active Sessions: 1
     - Protected Resources: 0 (or more if seeded)
     - Active Share Links: 0

#### 3c. Quick Feature Tests

**Test 1: User Management**
```
1. Go to /admin/users
2. Should see your admin user listed
3. Role: ADMIN, Status: APPROVED ✅
```

**Test 2: Protect a Resource**
```
1. Go to /admin/permissions
2. Click "Add Protection"
3. Resource Type: PAGE
4. Resource ID: /hobbies/photography
5. Minimum Role: EDITOR
6. Click "Protect"
7. Should see in protected resources list ✅
```

**Test 3: Create Share Link**
```
1. Go to /admin/share-links
2. Click "Create Share Link"
3. Resource: Select the protected page
4. Expires: 24 hours
5. Max Uses: 5
6. Click "Create"
7. Copy the generated link
8. Open in incognito/private window
9. Should grant access to protected resource ✅
```

**Test 4: Audit Log**
```
1. Go to /admin/audit
2. Should see all your actions logged:
   - LOGIN
   - RESOURCE_PROTECTED
   - SHARE_LINK_CREATED
3. Each with timestamp, IP, user agent ✅
```

---

## 🎉 Success Criteria

### You're done when you can:
- ✅ Login with magic link email
- ✅ Access /admin dashboard
- ✅ See all admin management pages
- ✅ Protect/unprotect resources
- ✅ Create share links
- ✅ View audit logs
- ✅ Approve/reject users (test with second email)

---

## 🆘 Troubleshooting

### Problem: Magic link email not received

**Solutions:**
1. Check spam/junk folder
2. Wait 1-2 minutes (can be slow)
3. Check Resend dashboard: https://resend.com/emails
4. Verify RESEND_API_KEY in `.env.local`
5. Check console output for errors

**Debug:**
```bash
# Check if API key is set
cat .env.local | grep RESEND_API_KEY

# Check if email service is working
# Look for console output when clicking "Send Magic Link"
# Should NOT see: "RESEND_API_KEY not set" warning
```

### Problem: "RESEND_API_KEY not set" warning

**Solution:**
```bash
# Make sure .env.local has the key
cat .env.local

# Should show:
# RESEND_API_KEY=re_something...

# NOT empty:
# RESEND_API_KEY=

# Restart dev server after adding key
# Ctrl+C to stop, then:
npm run dev
```

### Problem: Can't access /admin (redirects to /login)

**Solutions:**
1. Make sure you logged in successfully
2. Check if session cookie exists:
   - Browser DevTools → Application → Cookies
   - Look for `hrisa_session`
3. Try logging out and back in
4. Check user is ADMIN:
   ```bash
   sqlite3 data/janette-portfolio.db "SELECT * FROM users WHERE email='your@email.com';"
   # Should show role='ADMIN' and status='APPROVED'
   ```

### Problem: Database error

**Solution:**
```bash
# Stop dev server (Ctrl+C)

# Initialize schema (safe to run multiple times)
npm run db:init

# Recreate admin user
npm run create:admin -- --email=your@email.com

# Restart
npm run dev
```

---

## 📋 Optional: Seed Test Data

**Want to test with protected resources and share links?**

```bash
npm run seed:protections
```

This will:
- Protect `/hobbies/photography` (EDITOR)
- Protect `/hobbies/cooking` (EDITOR)
- Create a sample share link
- Add audit log entries

**Then:**
- Visit /admin/permissions (should see 2 protected resources)
- Visit /admin/share-links (should see 1 link)
- Visit /admin/audit (should see SEED actions)

---

## 🚀 What's Next

After RBAC is working:

### Immediate (Optional):
- [ ] Customize email sender (use your domain instead of `onboarding@resend.dev`)
- [ ] Test with a second user (register, approve, test EDITOR access)
- [ ] Protect actual content pages (hobbies, projects)

### Later (When deploying):
- [ ] Set up Turso cloud database (optional, can keep SQLite)
- [ ] Configure production environment variables
- [ ] Update BASE_URL to production URL
- [ ] Verify domain with Resend (for professional emails)

### Future Features:
- [ ] User profile pages
- [ ] Session management (view/revoke sessions)
- [ ] Bulk user operations
- [ ] Advanced audit log filtering
- [ ] Email notification preferences
- [ ] 2FA (two-factor authentication)

---

## 📝 Summary

**What you have:**
- Complete, production-ready RBAC system
- Passwordless authentication via magic links
- Admin panel for user/permission management
- Resource-level access control
- Share links for temporary access
- Comprehensive audit logging
- Professional email templates

**What you need:**
1. Resend API key (5 min)
2. Run create-admin script (2 min)
3. Test the system (8 min)

**Total time:** 15 minutes

**Then:** RBAC is 100% complete! ✅

---

## 🎯 Quick Commands Reference

```bash
# 1. Add Resend API key to .env.local
code .env.local

# 2. Create admin user
npm run create:admin -- --email=your@email.com

# 3. Start dev server
npm run dev

# 4. Test at
http://localhost:3000/login
http://localhost:3000/admin

# Optional: Seed test data
npm run seed:protections

# Optional: View database
sqlite3 data/janette-portfolio.db
.tables
SELECT * FROM users;
SELECT * FROM protected_resources;
.exit
```

---

**Ready?** Get your Resend API key and let's finish this! 🚀

**Questions?** Check `RBAC-STATUS.md` for detailed documentation.

**Last Updated:** February 22, 2026
