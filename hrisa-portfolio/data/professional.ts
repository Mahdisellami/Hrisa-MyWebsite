import { ProfessionalProject } from '@/types';

export const professionalProjects: ProfessionalProject[] = [
  {
    id: 'hrisa-code',
    title: 'Hrisa Code',
    tagline: 'Local AI Coding Assistant with autonomous multi-step task execution',
    description: 'Advanced CLI coding assistant leveraging local LLMs through Ollama. Features autonomous agent mode with plan generation, complexity detection, and 40-50% efficiency gains through intelligent context passing.',
    longDescription: `Hrisa Code is a sophisticated AI-powered CLI coding assistant that brings autonomous development capabilities to your terminal. Built on Ollama for local LLM execution, it offers three powerful modes: Normal (conversational), Agent (autonomous multi-step), and Plan (complex task decomposition with adaptive execution).

The project's Plan Mode represents a significant innovation in AI coding assistants, featuring automatic task complexity detection, dynamic execution plan generation, and step context passing that reduces redundant tool calls by 40-50% and parameter errors by 70%.

With multi-model orchestration, the system can route different tasks to specialized models (qwen2.5:72b for reasoning, deepseek-coder-v2 for code understanding), ensuring optimal performance for each operation. Safety features include comprehensive approval systems, loop detection, and goal tracking to prevent runaway execution.

The assistant excels at progressive context building, intelligently exploring repositories, generating comprehensive documentation (README, API docs, HRISA.md), and executing complex development workflows with minimal human intervention.`,
    role: 'Creator & Lead Developer',
    technologies: [
      'Python',
      'Ollama',
      'Typer',
      'Rich',
      'Prompt Toolkit',
      'Pydantic',
      'Docker',
      'pytest',
      'Ruff',
      'MyPy',
      'LLM Agents',
      'CLI Tools'
    ],
    startDate: '2025-01',
    status: 'production',
    imageUrl: '/images/projects/hrisa-code.jpg',
    links: {
      github: 'https://github.com/Mahdisellami/Hrisa-Code',
    },
    featured: true,
    metrics: {
      models: 3,
    },
    highlights: [
      'Plan Mode with automatic task complexity detection (SIMPLE/MODERATE/COMPLEX)',
      '40-50% reduction in redundant tool calls through intelligent step context passing',
      '70% reduction in parameter errors via built-in validation checklists',
      'Multi-model orchestration routing tasks to specialized LLMs',
      'Comprehensive approval system for write operations and destructive commands',
      'Loop detection preventing infinite repetition (max 3 identical calls)',
      'Goal tracking with automatic task completion detection',
      'Autonomous documentation generation (README, API, HRISA.md)',
      'Background task management with async command execution',
      'Rich visual feedback with animated spinners and persistent mode indicators',
      '48 automated tests with >80% coverage',
      'Docker deployment ready with docker-compose support'
    ],
    challenges: [
      'Balancing autonomy with safety - preventing runaway executions',
      'Optimizing context passing to reduce redundant operations',
      'Handling diverse task complexities with appropriate strategies',
      'Multi-model coordination and selection logic',
      'Comprehensive testing of autonomous agent behavior'
    ],
    impact: 'Demonstrated 40-50% efficiency gains in development workflows through software improvements alone, enabling developers to leverage local LLMs for autonomous coding assistance without cloud dependencies or privacy concerns.'
  },
  {
    id: 'gamza-tounsia',
    title: 'Gamza Tounsia',
    tagline: 'E-commerce platform empowering Tunisian women artisans through global reach',
    description: 'Full-stack multilingual e-commerce platform for authentic handcrafted Tunisian products. Features 4-language support, multi-currency system, and comprehensive shopping experience supporting independent women artisans.',
    longDescription: `Gamza Tounsia is a modern full-stack e-commerce platform dedicated to bringing authentic Tunisian handicrafts to the global market while empowering independent women artisans. The platform showcases traditional craftsmanship including Nabeul ceramics, woven textiles, handcrafted jewelry, baskets, and home decor items.

Built with Next.js 14 and FastAPI, the platform features comprehensive internationalization with 4 languages (English, French, German, Arabic) and multi-currency support with automatic location-based detection. The architecture separates frontend and backend concerns with a RESTful API design, PostgreSQL database, and modern authentication using NextAuth with OAuth integration.

The platform includes complete e-commerce functionality: product catalog with category filtering, shopping cart management, user authentication and registration, order processing with checkout flow, and admin product management capabilities. Performance is optimized with Vercel Speed Insights and Next.js 14 features.

Beyond commerce, the platform serves a social mission: preserving centuries-old Tunisian craft traditions, supporting women artisans economically, and connecting global customers with authentic cultural heritage. Each product represents skilled craftsmanship and the continuation of traditional techniques passed through generations.`,
    role: 'Full-Stack Developer & Project Lead',
    company: 'Personal Project',
    technologies: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'SQLAlchemy',
      'Alembic',
      'NextAuth',
      'Zustand',
      'React Query',
      'Docker',
      'Vercel',
      'Render'
    ],
    startDate: '2025-11',
    status: 'production',
    imageUrl: '/images/projects/gamza-tounsia.jpg',
    links: {
      github: 'https://github.com/Mahdisellami/Ghamza-App',
      live: 'https://www.instagram.com/gamza_tounsia/',
    },
    featured: true,
    highlights: [
      'Multilingual support for 4 languages (EN, FR, DE, AR) with 200+ translation keys',
      'Multi-currency system with automatic location-based detection',
      'Full authentication system with NextAuth and OAuth integration',
      'Product catalog with 5 categories (Pottery, Textiles, Jewelry, Baskets, Home Decor)',
      'Complete shopping cart functionality integrated with backend',
      'Order management system with checkout flow',
      'Admin product management capabilities',
      'Responsive mobile-friendly design',
      'PostgreSQL database with Alembic migrations',
      'RESTful API with FastAPI and Pydantic validation',
      'Docker containerization for consistent development',
      'Deployed on Vercel (frontend) and Render (backend)',
      'Vercel Speed Insights for performance monitoring',
      'Social impact: Supporting independent women artisans'
    ],
    challenges: [
      'Implementing comprehensive i18n across 4 languages with RTL support for Arabic',
      'Multi-currency conversion and location detection',
      'Coordinating frontend and backend deployment across platforms',
      'Database schema design for complex e-commerce relationships',
      'Balancing feature richness with performance optimization',
      'Ensuring secure payment processing integration (in progress)'
    ],
    impact: 'Enabling Tunisian women artisans to reach global markets, preserving traditional craftsmanship techniques, and creating sustainable economic opportunities while maintaining cultural heritage authenticity.'
  },
];

// Helper functions
export function getFeaturedProjects(): ProfessionalProject[] {
  return professionalProjects.filter(project => project.featured);
}

export function getProjectById(id: string): ProfessionalProject | undefined {
  return professionalProjects.find(project => project.id === id);
}

export function getAllTechnologies(): string[] {
  const techSet = new Set<string>();
  professionalProjects.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
}

export function getAllStatuses(): Array<ProfessionalProject['status']> {
  const statusSet = new Set<ProfessionalProject['status']>();
  professionalProjects.forEach(project => {
    statusSet.add(project.status);
  });
  return Array.from(statusSet);
}
