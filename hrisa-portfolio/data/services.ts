import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'software-architecture',
    title: 'Software Architecture',
    description: 'Designing scalable, maintainable systems with modern architectural patterns. From monoliths to microservices, ensuring your tech stack supports business goals.',
    icon: 'Building2',
    skills: [
      'System Design',
      'Microservices Architecture',
      'API Design',
      'Database Architecture',
      'Scalability Planning',
      'Tech Stack Selection',
      'Documentation'
    ],
    exampleProjects: ['arki', 'ki-bas', 'fincomp'],
    deliverables: [
      'Architecture documentation',
      'System design diagrams',
      'Technology recommendations',
      'Database schema design',
      'API specifications',
      'Scalability roadmap',
      'Technical decision records'
    ],
    category: 'technical'
  },
  {
    id: 'ml-ai-engineering',
    title: 'ML/AI Engineering',
    description: 'Building production-ready machine learning systems. From model training and fine-tuning to deployment and monitoring.',
    icon: 'Brain',
    skills: [
      'PyTorch & TensorFlow',
      'Hugging Face Transformers',
      'Model Fine-tuning',
      'LLM Integration',
      'Natural Language Processing',
      'Computer Vision',
      'Model Optimization',
      'Explainable AI'
    ],
    exampleProjects: ['arki', 'ki-bas'],
    deliverables: [
      'Trained ML models',
      'Model fine-tuning pipelines',
      'Inference APIs',
      'Model documentation',
      'Performance benchmarks',
      'Evaluation metrics',
      'Deployment guides'
    ],
    category: 'technical'
  },
  {
    id: 'agentic-systems',
    title: 'Agentic AI Systems',
    description: 'Developing intelligent agent systems using LangGraph, LangChain, and modern orchestration frameworks. Building autonomous AI that can reason, plan, and act.',
    icon: 'Network',
    skills: [
      'LangGraph',
      'LangChain',
      'Multi-Agent Systems',
      'Agent Orchestration',
      'Tool Integration',
      'RAG Systems',
      'Local LLM Deployment (Ollama)',
      'Prompt Engineering'
    ],
    exampleProjects: ['arki', 'ki-bas', 'agent-chat-ui'],
    deliverables: [
      'Agent system architecture',
      'Multi-agent workflows',
      'Tool integrations',
      'RAG pipelines',
      'Chat interfaces',
      'Conversation management',
      'Agent monitoring'
    ],
    category: 'technical'
  },
  {
    id: 'full-stack-development',
    title: 'Full-Stack Development',
    description: 'Building modern web applications from frontend to backend. React, Next.js, TypeScript for the frontend; Python, FastAPI, Node.js for the backend.',
    icon: 'Code2',
    skills: [
      'React & Next.js',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI & Python',
      'Node.js & Express',
      'PostgreSQL',
      'REST & GraphQL APIs',
      'Real-time Features (SSE, WebSockets)'
    ],
    exampleProjects: ['ki-bas', 'agent-chat-ui', 'fincomp'],
    deliverables: [
      'Full-stack web applications',
      'RESTful APIs',
      'Database design & implementation',
      'Authentication & authorization',
      'Responsive UI/UX',
      'Real-time features',
      'Progressive web apps'
    ],
    category: 'technical'
  },
  {
    id: 'devops-mlops',
    title: 'DevOps & MLOps',
    description: 'Streamlining development and ML workflows. Docker containerization, CI/CD pipelines, experiment tracking, model registry, and production monitoring.',
    icon: 'Container',
    skills: [
      'Docker & Docker Compose',
      'MLflow',
      'DVC (Data Version Control)',
      'Ray Serve',
      'CI/CD Pipelines',
      'Prometheus & Grafana',
      'Cloud Deployment (AWS, Azure, GCP)',
      'Infrastructure as Code'
    ],
    exampleProjects: ['arki', 'ki-bas'],
    deliverables: [
      'Containerized applications',
      'CI/CD pipeline setup',
      'MLOps infrastructure',
      'Experiment tracking systems',
      'Model registries',
      'Monitoring & alerting',
      'Deployment automation',
      'Infrastructure documentation'
    ],
    category: 'technical'
  },
  {
    id: 'applied-research',
    title: 'Applied Research',
    description: 'Translating research ideas into practical implementations. Prototyping novel approaches, evaluating state-of-the-art methods, and publishing results.',
    icon: 'FlaskConical',
    skills: [
      'Research Methodology',
      'Literature Review',
      'Experiment Design',
      'Statistical Analysis',
      'Benchmarking',
      'Technical Writing',
      'Academic Publishing',
      'Knowledge Transfer'
    ],
    exampleProjects: ['arki', 'fincomp'],
    deliverables: [
      'Research prototypes',
      'Experimental results',
      'Performance analyses',
      'Technical reports',
      'Research papers',
      'Benchmark comparisons',
      'Implementation guides',
      'Knowledge documentation'
    ],
    category: 'research'
  }
];

// Helper functions
export const getServiceById = (id: string) =>
  services.find(s => s.id === id);

export const getServicesByCategory = (category: Service['category']) =>
  services.filter(s => s.category === category);

export const getTechnicalServices = () =>
  services.filter(s => s.category === 'technical');

export const getResearchServices = () =>
  services.filter(s => s.category === 'research');
