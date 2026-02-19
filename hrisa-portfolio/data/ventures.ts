import { Venture } from '@/types';

export const ventures: Venture[] = [
  {
    id: 'hrisa-agents',
    title: 'Hrisa Agents',
    tagline: 'Building the future of autonomous AI systems',
    description: 'A platform for creating, deploying, and orchestrating intelligent AI agents that can reason, plan, and execute complex tasks autonomously.',
    problemSpace: `Current AI agent frameworks are either too complex for developers or too limiting for production use. There's a gap between research-grade multi-agent systems and production-ready solutions that businesses can actually deploy.

Organizations want to leverage agentic AI but struggle with:
- Complex orchestration logic
- Difficult debugging and monitoring
- Integration with existing systems
- Scaling multi-agent workflows
- Managing tool access and permissions`,
    solution: `Hrisa Agents provides a developer-friendly platform for building production-ready agentic systems. Drawing on experience from agent-chat-ui and ArKI, the platform offers:

- **Visual Agent Designer**: Build agent workflows with drag-and-drop
- **Pre-built Agent Templates**: Common patterns (research, analysis, automation)
- **Tool Marketplace**: Extensible tool ecosystem for agent capabilities
- **Observability Dashboard**: Real-time monitoring and debugging
- **Enterprise-Ready**: Authentication, permissions, audit logs
- **Local or Cloud**: Deploy on-premise with Ollama or use cloud LLMs

The platform bridges the gap between agentic AI research and practical business applications, making it easy to go from prototype to production.`,
    status: 'concept',
    technologies: [
      'LangGraph',
      'LangChain',
      'Ollama',
      'FastAPI',
      'Next.js',
      'PostgreSQL',
      'Redis',
      'Docker',
      'TypeScript',
      'Python'
    ],
    lookingFor: [
      'Technical co-founder with AI/ML background',
      'Early design partners from enterprises',
      'Feedback from agent developers',
      'Beta testers'
    ],
    relevantExperience: [
      'agent-chat-ui: Built production chat UI for LangGraph servers',
      'arki: Implemented LLM orchestration with LangGraph',
      'ki-bas: Experience with local LLM deployment and RAG systems'
    ]
  },
  {
    id: 'hrisa-code',
    title: 'Hrisa Code',
    tagline: 'AI-powered code understanding and generation for enterprise codebases',
    description: 'An intelligent coding assistant that understands your entire codebase, helps with code generation, refactoring, and serves as a knowledgeable pair programmer.',
    problemSpace: `Developers spend significant time understanding unfamiliar codebases, searching for code patterns, and ensuring consistency with existing architectures. Generic AI coding assistants lack context about:
- Codebase-specific patterns and conventions
- Internal libraries and frameworks
- Team coding standards
- Historical decisions and technical debt
- Cross-file dependencies and relationships

This is especially painful in large enterprises with legacy systems and complex architectures.`,
    solution: `Hrisa Code creates a deep understanding of your entire codebase using RAG and semantic code analysis. The system:

- **Codebase Indexing**: Indexes your entire codebase with AST parsing and semantic embeddings
- **Contextual Assistance**: Provides answers grounded in your actual code
- **Pattern Recognition**: Identifies and suggests consistent patterns from your codebase
- **Intelligent Search**: Find code by concept, not just keywords
- **Refactoring Support**: Suggests improvements based on codebase conventions
- **Documentation Generation**: Auto-generates docs that stay in sync
- **Privacy-First**: Runs locally with Ollama - code never leaves your infrastructure

Built for enterprise teams who need AI assistance without compromising on security or context relevance.`,
    status: 'prototyping',
    technologies: [
      'Ollama',
      'LangChain',
      'ChromaDB',
      'Tree-sitter (AST parsing)',
      'FastAPI',
      'React',
      'TypeScript',
      'Python',
      'Docker'
    ],
    lookingFor: [
      'Beta testers with large codebases',
      'Enterprise development teams',
      'Feedback on MVP features',
      'Technical advisor with compiler/AST experience'
    ],
    relevantExperience: [
      'ki-bas: Built production RAG system with local LLM',
      'Full-stack expertise across multiple languages',
      'Experience with semantic search and embeddings'
    ]
  },
  {
    id: 'hrisa-hr',
    title: 'Hrisa HR Platform',
    tagline: 'AI-powered talent management and recruitment intelligence',
    description: 'Modern HR platform combining intelligent candidate matching, automated screening, and people analytics to help companies build better teams.',
    problemSpace: `Hiring is broken. Companies struggle with:
- Overwhelming number of applications to review
- Unconscious bias in screening
- Poor candidate-role matching
- Time-consuming interview scheduling
- Inconsistent evaluation criteria
- Limited insights from hiring data

Meanwhile, qualified candidates get overlooked because their resumes don't match keyword filters, and HR teams spend hours on administrative tasks instead of building relationships.`,
    solution: `Hrisa HR uses AI to make hiring more effective and fair:

**For Recruiters:**
- **Semantic Candidate Matching**: AI understands skills beyond keywords
- **Automated Screening**: Consistent, bias-aware candidate evaluation
- **Interview Intelligence**: Generate tailored questions based on role and candidate
- **Scheduling Automation**: Coordinate interviews automatically
- **People Analytics**: Insights into hiring patterns and team composition

**For Candidates:**
- **Transparent Process**: Clear feedback on application status
- **Fair Evaluation**: Consistent criteria applied to all candidates
- **Better Matching**: Get matched to roles that fit your actual skills

**Privacy & Ethics:**
- Local deployment option for sensitive data
- Bias detection and mitigation
- GDPR compliant
- Transparent AI decisions

The platform aims to make hiring faster, fairer, and more data-driven while keeping humans in the decision-making loop.`,
    status: 'concept',
    technologies: [
      'Python',
      'FastAPI',
      'Ollama',
      'PostgreSQL',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'ChromaDB',
      'LangChain'
    ],
    lookingFor: [
      'Co-founder with HR/talent acquisition background',
      'Early adopter companies (startups/scale-ups)',
      'HR professionals for user research',
      'Advisor with hiring platform experience'
    ],
    relevantExperience: [
      'ki-bas: Built semantic search and document processing',
      'arki: Experience with NLP and classification systems',
      'Full-stack development for production applications'
    ]
  }
];

// Helper functions
export const getVentureById = (id: string) =>
  ventures.find(v => v.id === id);

export const getVenturesByStatus = (status: Venture['status']) =>
  ventures.filter(v => v.status === status);

export const getActiveVentures = () =>
  ventures.filter(v => v.status !== 'launched');
