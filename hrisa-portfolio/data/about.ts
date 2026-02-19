import { Bio, SocialLink } from '@/types';

export const bio: Bio = {
  name: 'Mahdi Sellami',
  title: 'ML Engineer & Full-Stack Developer',
  tagline: 'Building production AI systems and exploring innovative solutions',

  shortBio: `ML/AI Engineer and Full-Stack Developer specializing in agentic systems, RAG, and MLOps.
  I build production-ready AI applications and explore startup ideas at the intersection of AI and software engineering.`,

  longBio: `I'm Mahdi Sellami, an ML/AI Engineer and Full-Stack Developer with a passion for building production-ready intelligent systems.
  My work spans from training and fine-tuning machine learning models to deploying complete full-stack applications with modern MLOps practices.

Currently available for freelance projects and consulting, I specialize in:
- Building agentic AI systems with LangGraph and LangChain
- Developing RAG (Retrieval Augmented Generation) systems
- Full-stack web development with React, Next.js, and Python
- MLOps infrastructure and deployment
- Software architecture and system design

Beyond technical work, I'm exploring three startup ideas (Hrisa Agents, Hrisa Code, Hrisa HR) that aim to make AI more accessible and practical for businesses.

When I'm not coding, you'll find me pursuing creative passions: photography and modeling, making music, performing in theatre, creating art through drawing and painting, and staying active with various sports and dance.

Originally from South Tunisia, I bring a unique perspective shaped by diverse cultural influences, reflected even in the warm "Harissa" color scheme of this portfolio.`,

  location: 'Munich, Germany',

  // Cities lived in - rich multicultural background
  citiesLivedIn: [
    { city: 'Munich', country: 'Germany', flag: '🇩🇪', years: 'Current' },
    { city: 'Berlin', country: 'Germany', flag: '🇩🇪' },
    { city: 'Sfax', country: 'Tunisia', flag: '🇹🇳', hometown: true },
    { city: 'Tunis', country: 'Tunisia', flag: '🇹🇳' },
    { city: 'Paris', country: 'France', flag: '🇫🇷' },
    { city: 'Marseille', country: 'France', flag: '🇫🇷' },
    { city: 'San Sebastián', country: 'Spain', flag: '🇪🇸' },
    { city: 'Madrid', country: 'Spain', flag: '🇪🇸' },
    { city: 'Barcelona', country: 'Spain', flag: '🇪🇸' },
    { city: 'Gran Canaria', country: 'Spain', flag: '🇪🇸' },
    { city: 'Sevilla', country: 'Spain', flag: '🇪🇸' },
    { city: 'Lisbon', country: 'Portugal', flag: '🇵🇹' },
    { city: 'Porto', country: 'Portugal', flag: '🇵🇹' },
    { city: 'Lausanne', country: 'Switzerland', flag: '🇨🇭' },
    { city: 'Cairo', country: 'Egypt', flag: '🇪🇬' },
    { city: 'Alexandria', country: 'Egypt', flag: '🇪🇬' },
  ],

  availability: {
    freelance: true,
    fullTime: false,
    consulting: true,
  },

  contact: {
    email: 'mahdi.sellami.95@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mahdi-sellami-621710112/',
    github: 'https://github.com/Mahdisellami',
    instagram: 'https://www.instagram.com/gamza_tounsia/',
    whatsapp: 'https://wa.me/1234567890', // Update with real number
  },

  skills: [
    {
      category: 'AI/ML Engineering',
      items: [
        'PyTorch & TensorFlow',
        'Hugging Face Transformers',
        'LangGraph & LangChain',
        'Model Fine-tuning',
        'RAG Systems',
        'Ollama & Local LLMs',
        'Natural Language Processing',
        'Computer Vision',
      ]
    },
    {
      category: 'Full-Stack Development',
      items: [
        'React & Next.js',
        'TypeScript',
        'Python',
        'FastAPI',
        'Node.js & Express',
        'Tailwind CSS',
        'PostgreSQL',
        'REST & GraphQL APIs',
      ]
    },
    {
      category: 'MLOps & DevOps',
      items: [
        'Docker & Docker Compose',
        'MLflow',
        'DVC',
        'Ray Serve',
        'CI/CD Pipelines',
        'Prometheus & Grafana',
        'Cloud Platforms (AWS, Azure, GCP)',
      ]
    },
    {
      category: 'Data & Knowledge',
      items: [
        'ChromaDB & Milvus',
        'Vector Embeddings',
        'GraphDB & SPARQL',
        'RDF & Ontologies',
        'PostgreSQL',
        'Data Pipelines',
      ]
    },
    {
      category: 'Soft Skills',
      items: [
        'Software Architecture',
        'Technical Writing',
        'Team Collaboration',
        'Problem Solving',
        'Project Management',
        'Research & Analysis',
      ]
    }
  ],

  languages: [
    { language: 'Arabic', proficiency: 'Native' },
    { language: 'French', proficiency: 'Native' },
    { language: 'English', proficiency: 'Fluent' },
    { language: 'German', proficiency: 'Intermediate' }, // Update as needed
  ]
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/Mahdisellami',
    icon: 'Github',
    username: '@Mahdisellami'
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mahdi-sellami-621710112/',
    icon: 'Linkedin',
    username: 'Mahdi Sellami'
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/yourhandle', // Update
    icon: 'Instagram',
    username: '@yourhandle' // Update
  },
  {
    platform: 'Email',
    url: 'mailto:mahdi.sellami@example.com', // Update
    icon: 'Mail',
  },
];

// Career highlights for timeline
export const careerHighlights = [
  {
    year: '2024',
    title: 'Freelance ML Engineer & Full-Stack Developer',
    description: 'Building production AI systems and exploring startup ideas',
    achievements: [
      'Launched agent-chat-ui on Vercel',
      'Completed ArKI ML pipeline with 5 fine-tuned models',
      'Built KI-BAS RAG system with local LLM deployment',
    ]
  },
  {
    year: '2023-2024',
    title: 'Knowledge Engineer & Full-Stack Developer',
    description: 'FinComp project - Regulatory compliance system',
    achievements: [
      'Designed knowledge graph architecture',
      'Implemented SPARQL query interface',
      'Built React frontend with Material-UI',
    ]
  },
  // Add more career highlights as needed
];

// Professional interests
export const interests = [
  'Agentic AI Systems',
  'Retrieval Augmented Generation',
  'MLOps & Production ML',
  'Knowledge Graphs',
  'Semantic Web',
  'Software Architecture',
  'Developer Tools',
  'Entrepreneurship',
];
