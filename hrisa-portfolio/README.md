# Hrisa Portfolio

Personal portfolio website showcasing ML/AI engineering, full-stack development work, and entrepreneurial ventures.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Harissa theme - warm, Tunisian-inspired colors)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (primary), Render (alternative)
- **Local Dev**: Docker & Docker Compose

## Color Scheme: Harissa Warmth

Inspired by Tunisian harissa (chili paste) and South Tunisia:
- **Primary**: Warm red-orange (#f94f3d)
- **Secondary**: Terracotta (#d36647)
- **Backgrounds**: Sand/cream tones
- **Accents**: Olive green

## Quick Start

### Local Development (npm)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Development

```bash
# Start development server with hot reload
docker-compose up dev

# Stop
docker-compose down

# Test production build locally
docker-compose --profile production up prod
```

### Docker Production Build

```bash
# Build production image
docker build -t hrisa-portfolio .

# Run production container
docker run -p 3000:3000 hrisa-portfolio
```

## Project Structure

```
hrisa-portfolio/
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

### Strategic Positioning
- Freelance/consulting availability (subtle indicators)
- Production-ready project showcase
- Startup ideas/innovation lab
- Multi-audience approach (clients, employers, collaborators)

### Sections
1. **Landing**: Hero, availability badge, CTAs, quick stats
2. **Featured Work**: ArKI, KI-BAS, FinComp, agent-chat-ui
3. **Professional**: Projects, publications, career timeline
4. **Services/Expertise**: ML/AI, Full-Stack, MLOps, Architecture
5. **Ventures**: Hrisa Agents, Hrisa Code, Hrisa HR Platform
6. **Hobbies**: Photography, Music, Theatre, Art, Sports
7. **About/Contact**: Bio, skills, contact form

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Auto-deploy on push to main
4. Configure custom domain

### Render (Alternative)

1. Connect GitHub repository
2. Use Docker deployment
3. Configure environment variables
4. Set up custom domain

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add environment variables as needed
NEXT_PUBLIC_SITE_URL=http://localhost:3000
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

- [ ] Update all content in `/data` files
- [ ] Add professional photos
- [ ] Add project screenshots
- [ ] Update publication PDFs
- [ ] Configure contact form
- [ ] Set up analytics
- [ ] Test all pages and links
- [ ] Optimize images
- [ ] Run Lighthouse audit
- [ ] Configure custom domain
- [ ] Set up SSL certificate

## License

Private - All Rights Reserved

## Contact

Mahdi Sellami
- LinkedIn: [linkedin.com/in/mahdi-sellami-621710112](https://www.linkedin.com/in/mahdi-sellami-621710112/)
- GitHub: [@Mahdisellami](https://github.com/Mahdisellami)
