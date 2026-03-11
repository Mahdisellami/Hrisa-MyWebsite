# Janette Website - Architecture & Conception

## Project Overview
A personal portfolio website showcasing professional career, IT projects, and creative hobbies. **Strategic positioning**: Subtle emphasis on freelance availability and entrepreneurial mindset, showcasing production-ready work and startup ideas to attract potential clients and collaborators.

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Icons**: Lucide React / React Icons

### Deployment
- **Primary**: Vercel (automatic deployments from git)
- **Alternative**: Render (Docker container)
- **Local Dev**: Docker & Docker Compose

### Development Tools
- ESLint & Prettier for code quality
- Husky for git hooks (optional)

## Project Structure

```
Hrisa-MyWebsite/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   ├── professional/             # Professional section
│   │   │   ├── page.tsx              # Projects & publications
│   │   │   └── [slug]/page.tsx       # Individual project detail
│   │   ├── projects/                 # Personal IT projects
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── photography/              # Photography portfolio
│   │   │   └── page.tsx
│   │   ├── music/                    # Music section
│   │   │   └── page.tsx
│   │   ├── theatre/                  # Theatre section
│   │   │   └── page.tsx
│   │   ├── art/                      # Drawing/Painting
│   │   │   └── page.tsx
│   │   ├── sports/                   # Sports/Dance
│   │   │   └── page.tsx
│   │   ├── services/                 # Services & expertise (freelance)
│   │   │   └── page.tsx
│   │   ├── ventures/                 # Startup ideas & innovations
│   │   │   └── page.tsx
│   │   └── about/                    # Extended about page
│   │       └── page.tsx
│   ├── components/                   # React components
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Navigation
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx              # Landing hero section
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Services.tsx          # Services offered (subtle)
│   │   │   ├── FeaturedWork.tsx      # Highlighted projects
│   │   │   ├── Process.tsx           # Working approach/methodology
│   │   │   ├── Testimonials.tsx      # Client testimonials (if available)
│   │   │   └── Contact.tsx
│   │   ├── cards/
│   │   │   ├── ProjectCard.tsx       # Reusable project card
│   │   │   ├── PublicationCard.tsx
│   │   │   ├── ServiceCard.tsx       # Service offerings
│   │   │   ├── VentureCard.tsx       # Startup/innovation ideas
│   │   │   └── HobbyCard.tsx
│   │   └── ui/                       # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       └── Modal.tsx
│   ├── data/                         # Static content
│   │   ├── professional.ts           # Professional projects data
│   │   ├── publications.ts           # Publications data
│   │   ├── personal-projects.ts      # Personal IT projects
│   │   ├── services.ts               # Services & expertise
│   │   ├── ventures.ts               # Startup ideas & innovations
│   │   ├── testimonials.ts           # Client testimonials
│   │   ├── hobbies.ts                # Hobbies content
│   │   └── about.ts                  # Bio and general info
│   ├── lib/                          # Utilities
│   │   └── utils.ts                  # Helper functions
│   ├── types/                        # TypeScript types
│   │   └── index.ts
│   └── styles/
│       └── globals.css               # Global styles + Tailwind
├── public/                           # Static assets
│   ├── images/
│   │   ├── projects/
│   │   ├── photography/
│   │   ├── art/
│   │   └── profile.jpg
│   ├── docs/                         # PDFs (publications, CV)
│   └── favicon.ico
├── docker/
│   ├── Dockerfile                    # Production dockerfile
│   └── Dockerfile.dev                # Development dockerfile
├── docker-compose.yml                # Local development setup
├── .dockerignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Key Features & Sections

### 1. Landing Page
- Hero section with professional photo
- Brief introduction with subtle "Available for freelance/consulting" indicator
- Value proposition highlighting expertise areas
- Quick navigation to main sections
- Multiple CTAs: "View Work", "Let's Talk", "Explore Ideas"
- Social links (LinkedIn, GitHub, etc.)
- Availability badge (e.g., "🟢 Available for Projects")

### 2. Featured Work (Landing Page Section)
**Strategic positioning for freelance credibility**

Highlight 2-3 production-ready projects prominently:
- **ArKI**: Complete ML pipeline for document classification (production)
- **KI-BAS**: Local RAG system with chat interface (production)
- **agent-chat-ui**: Next.js UI for LangGraph servers (deployed on Vercel)

Each featured project shows:
- Visual preview/screenshot
- Brief description + impact
- Tech stack
- Status badge (🟢 Live in Production)
- Metrics if available
- Link to detailed case study

### 3. Professional Section
**Projects & Publications:**
- Grid layout of all professional projects
- Publication cards with download links (PDFs)
- Filterable by category/technology (ML, Web, Knowledge Engineering)
- Detail pages for major projects
- Timeline visualization of career
- Emphasis on production deployments and real-world impact

### 3. Personal IT Projects
- Showcase of GitHub projects (ArKI, KI-BAS, FinComp, agent-chat-ui)
- Production-ready indicators for mature projects
- Tech stack badges
- Links to live demos and repositories
- Brief descriptions and screenshots
- Metrics (stars, deployments, users if applicable)

### 4. Services & Expertise (Subtle Freelance Positioning)
**Approach**: Positioned as "What I Do" or "Expertise Areas" rather than overtly "Services"

- **ML/AI Engineering**: NLP, RAG systems, LLM integration, fine-tuning
- **Full-Stack Development**: Next.js, React, FastAPI, TypeScript
- **MLOps & Infrastructure**: Docker, MLflow, model deployment, CI/CD
- **Knowledge Engineering**: Semantic web, SPARQL, ontologies, knowledge graphs
- Each service showcased through completed projects
- Subtle CTA: "Interested in similar solutions? Let's connect"

### 5. Ventures & Innovation Lab
**Approach**: Frame as "Ideas I'm Exploring" or "Innovation Projects"

- Current startup ideas/concepts (high-level, not giving away IP)
- Areas of innovation interest
- Looking for collaborators/co-founders (subtle indicator)
- Problem spaces you're passionate about solving
- Tech trends you're experimenting with
- Optional: "Interested in collaborating?" CTA

### 6. Process & Approach (Trust Building)
- Your methodology for projects
- How you work with clients/teams
- Technologies and tools you prefer
- Quality standards (testing, documentation, deployment)
- From concept to production timeline examples

### 7. Hobbies & Creative Work

**Photography/Modeling:**
- Photo gallery with lightbox
- Categories (portraits, landscapes, events)
- Grid/masonry layout

**Music:**
- Embedded audio/video players
- Performance history
- Instruments and styles

**Theatre:**
- Performance portfolio
- Photos and videos
- Roles and productions

**Drawing/Painting:**
- Art gallery
- Medium and style descriptions

**Sports/Dance:**
- Activity descriptions
- Photos/videos of performances
- Achievements

### 8. Testimonials (Optional)
- Client/colleague feedback (if available)
- Project outcomes and impact
- Builds credibility for freelance positioning

### 9. About/Contact
- Detailed bio with entrepreneurial narrative
- Skills visualization (technical + soft skills)
- Current status: "Open to opportunities", "Available for consulting"
- Multiple contact methods (email, LinkedIn, calendly for consultations)
- Contact form with project inquiry fields
- Downloadable CV/Resume
- Clear CTAs: "Schedule a Call", "Start a Project", "Discuss an Idea"

## Design Principles

### Visual Design
- Clean, modern aesthetic
- Professional color palette (consider: navy blue, white, gray accents)
- Typography: Clean sans-serif (Inter, Poppins, or system fonts)
- Responsive design (mobile-first)
- Dark mode support (optional but recommended)

### Animations
- Smooth page transitions
- Fade-in on scroll for sections
- Hover effects on cards
- Loading states
- Micro-interactions (button clicks, etc.)

### Performance
- Image optimization (Next.js Image component)
- Lazy loading for images
- Code splitting
- Static generation where possible
- Lighthouse score target: 90+

## Data Structure Examples

### Professional Project
```typescript
interface ProfessionalProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  role: string;
  company?: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  imageUrl: string;
  links?: {
    live?: string;
    github?: string;
    paper?: string;
  };
  featured: boolean;
}
```

### Publication
```typescript
interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  pdfUrl?: string;
  externalUrl?: string;
  tags: string[];
}
```

### Personal Project
```typescript
interface PersonalProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  status?: 'production' | 'beta' | 'development';
  metrics?: {
    stars?: number;
    users?: number;
    deployments?: number;
  };
}
```

### Service
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  skills: string[];
  exampleProjects: string[]; // Project IDs
  deliverables: string[];
}
```

### Venture/Startup Idea
```typescript
interface Venture {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problemSpace: string;
  status: 'concept' | 'prototyping' | 'mvp' | 'launched';
  technologies: string[];
  lookingFor?: string[]; // e.g., ["co-founder", "advisor", "early adopter"]
  imageUrl?: string;
}
```

### Testimonial
```typescript
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatarUrl?: string;
  projectRelated?: string; // Project ID
  date?: string;
}
```

## Deployment Strategy

### Vercel (Primary)
1. Connect GitHub repository
2. Automatic deployments on push to main
3. Preview deployments for PRs
4. Environment variables via dashboard
5. Custom domain setup

### Render (Alternative)
1. Docker container deployment
2. Manual or auto-deploy from GitHub
3. Health check endpoint
4. Environment variables configuration

### Docker Setup
- Multi-stage builds for optimization
- Development hot-reload support
- Production-ready image
- Docker Compose for local development

## Development Workflow

1. **Setup**: Initialize Next.js, configure Tailwind
2. **Structure**: Create folder structure and base components
3. **Content**: Add data files with placeholder content
4. **Landing**: Build hero and landing page
5. **Sections**: Implement each section iteratively
6. **Polish**: Add animations, optimize, test
7. **Deploy**: Configure Vercel and Docker

## Next Steps

1. Initialize Next.js project
2. Set up Tailwind CSS and basic styling
3. Create Docker configuration
4. Build layout components (Header, Footer)
5. Implement landing page
6. Add content sections one by one
7. Deploy and iterate

## Business Strategy & Content Approach

### Freelance Positioning Strategy
**Goal**: Attract clients while maintaining authenticity and avoiding "salesy" feel

**Tactics**:
1. **Proof over promises**: Let production projects (ArKI, KI-BAS) speak for capabilities
2. **Thought leadership**: Frame startup ideas as innovation/exploration, not just business opportunities
3. **Availability indicators**: Subtle badges ("Available for consulting", "Open to opportunities")
4. **Multi-CTA approach**: Different CTAs for different audiences (employers, clients, collaborators)
5. **Trust signals**: Testimonials, GitHub activity, deployed projects, publications
6. **Problem-solution framing**: Each service tied to real problems you've solved

### Content Hierarchy (Information Architecture)
**Primary Path** (Potential Client):
1. Land on hero → See availability + value prop
2. View featured work → Understand capabilities
3. Read services/expertise → Identify fit
4. Contact/Schedule call

**Secondary Path** (Employer/Recruiter):
1. Land on hero → See professional summary
2. Professional projects → Career history
3. Publications → Academic/research credentials
4. Download CV → Formal application

**Tertiary Path** (Collaborator/Co-founder):
1. Land on hero → Intrigued by person
2. Ventures/Innovation → Aligned interests
3. Personal projects → Technical capability
4. Contact for collaboration

**Quaternary Path** (General Interest):
1. Land on hero → Attracted by personality
2. Hobbies → Discover multifaceted person
3. About → Connect with story
4. Social media → Stay connected

### Subtle Business Elements

**Language choices**:
- ✅ "Let's collaborate" vs ❌ "Hire me"
- ✅ "Available for consulting" vs ❌ "Looking for clients"
- ✅ "Expertise areas" vs ❌ "Services offered"
- ✅ "Past work" vs ❌ "Client portfolio"

**Visual indicators**:
- Green dot badge for availability
- Project status badges (production, live, 100+ users)
- GitHub stats (stars, forks)
- Publication citations
- Live deployment links

**CTAs positioned strategically**:
- Hero: "View Work" (primary), "Let's Talk" (secondary)
- After featured projects: "See more projects"
- Services section: "Interested in similar solutions?"
- Ventures section: "Want to collaborate on ideas?"
- Footer: "Start a conversation"

## Questions to Address

1. Do you have a preferred color scheme/branding?
2. Do you have content ready (photos, project descriptions, publications)?
3. Any specific design inspirations or reference websites?
4. Custom domain name?
5. Analytics requirements (Google Analytics, Plausible, etc.)?
6. **Do you have any current startup ideas you want to highlight?**
7. **Any testimonials or references from past collaborations?**
8. **Preferred contact method for inquiries (email, calendly, contact form)?**
9. **Specific services you want to emphasize?**
