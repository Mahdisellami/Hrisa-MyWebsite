# Janette

Personal portfolio website showcasing ML/AI engineering, full-stack development work, and entrepreneurial ventures.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Harissa theme - warm, Tunisian-inspired colors)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Turso (LibSQL) - Edge database
- **Authentication**: Magic Link (passwordless email authentication)
- **Email**: Resend API
- **Deployment**: Vercel
- **Local Dev**: SQLite database

## Color Scheme: Harissa Warmth

Inspired by Tunisian harissa (chili paste) and South Tunisia:
- **Primary**: Warm red-orange (#f94f3d)
- **Secondary**: Terracotta (#d36647)
- **Backgrounds**: Sand/cream tones
- **Accents**: Olive green

## Quick Start

### Local Development Setup

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
   - Copy `.env.local` and add your API keys
   - Get Resend API key from [resend.com](https://resend.com)

3. **Initialize database**
```bash
# Initialize SQLite database and create tables
npm run db:init

# Seed protected resources
npm run seed:protections

# Create admin user
npm run create:admin
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Lint code

# Database
npm run db:init          # Initialize database schema
npm run seed:protections # Seed protected resources
npm run create:admin     # Create admin user
npm run create:magic-link # Generate magic link for user

# Security
npm run migrate:security # Run security migrations
npm run migrate:existing-users # Migrate existing users
```


## Project Structure

```
janette-portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── globals.css        # Global styles
│   ├── professional/      # Professional projects
│   ├── projects/          # Personal IT projects
│   ├── services/          # Services & expertise
│   ├── ventures/          # Startup ideas
│   ├── photography/       # Photography portfolio
│   ├── music/            # Music section
│   ├── theatre/          # Theatre section
│   ├── art/              # Drawing/Painting
│   ├── sports/           # Sports/Dance
│   └── about/            # About page
├── components/            # React components
│   ├── layout/           # Header, Footer, Nav
│   ├── sections/         # Page sections
│   ├── cards/            # Reusable cards
│   └── ui/               # UI components
├── data/                 # Static content
├── types/                # TypeScript types
├── lib/                  # Utilities
├── public/               # Static assets
└── docker/               # Docker configs
```

## Key Features

### Security & Authentication
- **Passwordless Authentication**: Magic link via email (no passwords to manage)
- **Role-Based Access Control**: ADMIN, USER, GUEST, VISITOR roles
- **Section-Based Permissions**: Granular access control per content section
- **Rate Limiting**: Protection against brute force and abuse
- **Audit Logging**: Complete activity tracking
- **Secure Sessions**: HTTP-only cookies with expiration
- **Share Links**: Temporary access tokens for sharing protected content

### Strategic Positioning
- Freelance/consulting availability (subtle indicators)
- Production-ready project showcase
- Startup ideas/innovation lab
- Multi-audience approach (clients, employers, collaborators)

### Content Sections
1. **Landing**: Hero, availability badge, CTAs, quick stats
2. **Featured Work**: ArKI, KI-BAS, FinComp, agent-chat-ui
3. **Professional**: Projects, publications, career timeline
4. **Services/Expertise**: ML/AI, Full-Stack, MLOps, Architecture
5. **Ventures**: Janette Agents, Janette Code, Janette HR Platform
6. **Hobbies**: Photography, Music, Theatre, Art, Sports
7. **About/Contact**: Bio, skills, contact form

## Deployment

### Production Site

**Live URL**: [https://janette-portfolio.vercel.app](https://janette-portfolio.vercel.app)

### Vercel Deployment

The application is deployed on Vercel with automatic deployments from the `main` branch.

**Environment Variables (Production)**:
```env
TURSO_DATABASE_URL=libsql://janette-portfolio-mahdisellami.aws-eu-west-1.turso.io
TURSO_AUTH_TOKEN=<your-turso-token>
RESEND_API_KEY=<your-resend-api-key>
ADMIN_EMAIL=mahdi.sellami.95@gmail.com
BASE_URL=https://janette-portfolio.vercel.app
```

### Deploy Updates

```bash
# Deploy to production
vercel --prod

# Preview deployment
vercel
```

## Environment Variables

### Local Development (`.env.local`)

```env
# Email Service (Resend)
RESEND_API_KEY=re_your_api_key_here

# Admin Configuration
ADMIN_EMAIL=mahdi.sellami.95@gmail.com

# Database (Local Development)
DATABASE_PATH=./data/janette-portfolio.db

# Application URL
BASE_URL=http://localhost:3000
```

### Production (Vercel)

Set these in the Vercel dashboard or via CLI:

```env
# Turso Cloud Database
TURSO_DATABASE_URL=libsql://janette-portfolio-mahdisellami.aws-eu-west-1.turso.io
TURSO_AUTH_TOKEN=<your-token>

# Email Service
RESEND_API_KEY=<your-key>

# Admin Configuration
ADMIN_EMAIL=mahdi.sellami.95@gmail.com

# Application URL
BASE_URL=https://janette-portfolio.vercel.app
```

## Development Guidelines

### Content Updates
- Edit `/data` files for static content
- Add images to `/public/images`
- Update metadata in `app/layout.tsx`

### Adding New Pages
1. Create folder in `/app`
2. Add `page.tsx`
3. Update navigation in Header component

### Styling
- Use Tailwind utility classes
- Follow Harissa theme colors
- Use `brand-`, `terracotta-`, `sand-`, `olive-` prefixes
- Animations: `animate-fade-in`, `animate-slide-up`, etc.

## Production Checklist

### Initial Setup
- [x] Deploy to Vercel
- [x] Configure Turso database
- [x] Set up environment variables
- [x] Initialize database schema
- [x] Create admin user
- [ ] Configure custom domain (janette.technology)
- [ ] Set up analytics

### Content
- [ ] Update all content in `/data` files
- [ ] Add professional photos
- [ ] Add project screenshots
- [ ] Update publication PDFs
- [ ] Verify protected sections configuration

### Testing
- [ ] Test authentication flow
- [ ] Test all pages and links
- [ ] Test admin dashboard
- [ ] Test share links functionality
- [ ] Optimize images
- [ ] Run Lighthouse audit

### Security
- [x] Enable rate limiting
- [x] Configure audit logging
- [x] Set up secure sessions
- [ ] Review user permissions
- [ ] Test magic link emails

## License

Private - All Rights Reserved

## Contact

Mahdi Sellami
- LinkedIn: [linkedin.com/in/mahdi-sellami-621710112](https://www.linkedin.com/in/mahdi-sellami-621710112/)
- GitHub: [@Mahdisellami](https://github.com/Mahdisellami)
