import { ProfessionalProject } from '@/types';

export const professionalProjects: ProfessionalProject[] = [
  {
    id: 'arki',
    title: 'ArKI',
    tagline: 'Complete ML pipeline for automated classification of German legislative documents',
    description: 'Production ML system with 5 fine-tuned BERT models, MLOps infrastructure, and automated document classification for German Bundesrat documents.',
    longDescription: `ArKI is a comprehensive machine learning pipeline that automates the classification of German legislative documents (Bundesrat "Drucksachen"). The system features 5 fine-tuned BERT models (RoBERTa, GBERT, DeBERTa) for multi-category classification, with full MLOps infrastructure including experiment tracking, model registry, and production monitoring.

The project demonstrates end-to-end ML engineering capabilities: from model training and fine-tuning, through experiment tracking with MLflow, to production deployment with Ray Serve and comprehensive monitoring with Prometheus and Grafana.

Key innovation includes LLM-powered justification generation for predictions using LangGraph orchestration and local LLM inference via Ollama, providing explainable AI capabilities for regulatory document processing.`,
    role: 'ML Engineer & MLOps Lead',
    technologies: [
      'Python',
      'PyTorch',
      'Hugging Face Transformers',
      'FastAPI',
      'MLflow',
      'Ray Serve',
      'LangGraph',
      'Ollama',
      'Milvus',
      'PostgreSQL',
      'Docker',
      'Prometheus',
      'Grafana',
      'MinIO',
      'DVC'
    ],
    startDate: '2024-01',
    status: 'production',
    imageUrl: '/images/projects/arki.jpg',
    links: {
      github: 'https://github.com/Mahdisellami/ArKI',
    },
    featured: true,
    metrics: {
      models: 5,
      deployments: 1,
    },
    highlights: [
      'Trained and fine-tuned 5 BERT models for document classification',
      'Built complete MLOps pipeline with MLflow for experiment tracking and model registry',
      'Implemented production API with Ray Serve for scalable inference',
      'Integrated LLM-powered explanation generation using LangGraph',
      'Set up comprehensive monitoring with Prometheus and Grafana',
      'Automated deployment with one-command bootstrap script',
      'Utilized Milvus vector database for semantic classification',
      'Implemented DVC for model versioning and MinIO for artifact storage'
    ],
    challenges: [
      'Managing multiple model versions and experiments',
      'Scaling inference for real-time processing',
      'Ensuring explainability of predictions',
      'Integrating diverse ML stack components'
    ],
    impact: 'Automated classification of legislative documents, reducing manual processing time and improving consistency in regulatory workflows.'
  },
  {
    id: 'ki-bas',
    title: 'KI-BAS',
    tagline: 'Local RAG system for document Q&A with 100% privacy',
    description: 'Complete RAG application with local LLM inference, semantic search, and ChatGPT-like interface. Zero external API dependencies for maximum privacy.',
    longDescription: `KI-BAS is a production-ready Retrieval Augmented Generation (RAG) system designed for secure, local document question-answering. The system processes documents entirely locally using Ollama for LLM inference and ChromaDB for vector embeddings, ensuring complete data privacy.

Built with a modern tech stack featuring FastAPI backend and React frontend, the system supports multiple document formats (PDF, TXT, Markdown, DOCX, ODT, code files) and provides a ChatGPT-like conversational interface with source citations.

The architecture includes PostgreSQL for session persistence, JWT-based authentication with per-user data isolation, real-time streaming responses via Server-Sent Events, and comprehensive event logging. Deployment is streamlined with Docker Compose and Makefile automation for both development and production environments.`,
    role: 'Full-Stack Developer & AI Engineer',
    technologies: [
      'Python',
      'FastAPI',
      'LangChain',
      'Ollama',
      'ChromaDB',
      'PostgreSQL',
      'SQLAlchemy',
      'Alembic',
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Zustand',
      'Docker',
      'Nginx'
    ],
    startDate: '2024-03',
    status: 'production',
    imageUrl: '/images/projects/ki-bas.jpg',
    links: {
      github: 'https://github.com/Mahdisellami/KI-BAS',
    },
    featured: true,
    highlights: [
      '100% local processing - no external API calls for maximum privacy',
      'Multi-format document support (PDF, TXT, Markdown, DOCX, ODT, code)',
      'Semantic search with ChromaDB vector embeddings',
      'ChatGPT-like conversational interface',
      'Real-time streaming responses with Server-Sent Events',
      'Session management with PostgreSQL persistence',
      'JWT-based authentication with per-user isolation',
      'Source citations showing document chunks used in answers',
      'Comprehensive event logging',
      'Makefile-based deployment automation'
    ],
    challenges: [
      'Optimizing local LLM inference performance',
      'Managing vector embeddings efficiently',
      'Implementing real-time streaming UX',
      'Ensuring data isolation between users'
    ],
    impact: 'Enables organizations to implement RAG systems without sending sensitive documents to external APIs, maintaining complete data sovereignty.'
  },
  {
    id: 'fincomp',
    title: 'FinComp',
    tagline: 'Knowledge graph system for regulatory compliance engineering',
    description: 'Semantic web application bridging regulatory requirements and IT landscapes using ontologies, SPARQL, and GraphDB.',
    longDescription: `FinComp is a knowledge management system designed for compliance engineering, bringing together regulatory requirements and IT infrastructure through semantic web technologies. The system uses domain ontologies and knowledge graphs stored in GraphDB to model complex compliance relationships.

The application features a React-based frontend with Material-UI, providing an intuitive interface for exploring compliance knowledge. It integrates YASGUI for SPARQL query execution, allowing users to perform complex graph queries. The system includes Jupyter notebooks for data preprocessing and RDF mapping, with Ontotext Refine for data transformation.

The architecture supports multiple ontology versions with structured version management, enabling tracking of regulatory changes over time. Middleware services provide authentication and graph database abstraction, making complex semantic web operations accessible through a modern web interface.`,
    role: 'Full-Stack Developer & Knowledge Engineer',
    technologies: [
      'React 18',
      'TypeScript',
      'Material-UI',
      'GraphDB',
      'RDF',
      'SPARQL',
      'Ontologies',
      'Express.js',
      'Jupyter',
      'Python',
      'Ontotext Refine',
      'Docker'
    ],
    startDate: '2023-06',
    endDate: '2024-01',
    status: 'completed',
    imageUrl: '/images/projects/fincomp.jpg',
    links: {
      github: 'https://github.com/Mahdisellami/FinComp',
    },
    featured: true,
    highlights: [
      'Knowledge graph based on domain ontologies',
      'SPARQL query interface with YASGUI integration',
      'Jupyter notebooks for data preprocessing and RDF mapping',
      'Ontotext Refine integration for data transformation',
      'Multiple ontology versions with structured management',
      'GraphDB repositories for compliance demonstrations',
      'React frontend with Material-UI',
      'Middleware API for graph database operations',
      'JWT authentication'
    ],
    impact: 'Provides a systematic approach to compliance engineering by making complex regulatory relationships queryable and explorable through semantic web technologies.'
  },
  {
    id: 'agent-chat-ui',
    title: 'agent-chat-ui',
    tagline: 'Modern Next.js UI for LangGraph servers',
    description: 'Production-ready chat interface for LangGraph agentic systems, deployed on Vercel with artifact rendering and streaming support.',
    longDescription: `agent-chat-ui is a sophisticated Next.js application providing a modern chat interface for LangGraph servers. The application features a clean, responsive design with support for both local development and production deployments.

Built with Next.js 15 and React 19, the UI leverages Radix UI components and Tailwind CSS v4 for a polished user experience. The application includes advanced features like artifact rendering in side panels, message hiding controls, and markdown support with mathematical notation (KaTeX) and syntax highlighting.

The architecture supports API passthrough for secure authentication, custom authentication methods, and seamless integration with LangGraph backends. Deployed on Vercel for automatic scaling and global distribution.`,
    role: 'Frontend Developer',
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Radix UI',
      'Framer Motion',
      'React Markdown',
      'KaTeX',
      'Recharts',
      'LangChain',
      'LangGraph SDK',
      'Axios',
      'Vercel'
    ],
    startDate: '2024-05',
    status: 'production',
    imageUrl: '/images/projects/agent-chat-ui.jpg',
    links: {
      live: 'https://agentchat.vercel.app',
      github: 'https://github.com/Mahdisellami/agent-chat-ui',
    },
    featured: true,
    highlights: [
      'Modern chat interface for LangGraph servers',
      'Artifact rendering in side panel',
      'Message hiding controls',
      'Markdown support with KaTeX for math notation',
      'Syntax highlighting for code blocks',
      'Dark mode support',
      'Responsive design',
      'API passthrough for secure authentication',
      'Deployed on Vercel for global distribution',
      'Real-time streaming responses'
    ],
    impact: 'Provides an accessible, production-ready interface for agentic AI systems, lowering the barrier to deploying conversational AI applications.'
  }
];

// Helper functions for filtering and sorting
export const getFeaturedProjects = () =>
  professionalProjects.filter(p => p.featured);

export const getProjectById = (id: string) =>
  professionalProjects.find(p => p.id === id);

export const getProductionProjects = () =>
  professionalProjects.filter(p => p.status === 'production');
