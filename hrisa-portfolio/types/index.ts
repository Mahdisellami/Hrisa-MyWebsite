// Core type definitions for portfolio content

export interface ProfessionalProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
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
    demo?: string;
  };
  featured: boolean;
  status: 'production' | 'beta' | 'development' | 'completed';
  metrics?: {
    users?: number;
    deployments?: number;
    models?: number;
  };
  highlights: string[];
  challenges?: string[];
  impact?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  pdfUrl?: string;
  externalUrl?: string;
  doi?: string;
  tags: string[];
  featured?: boolean;
}

export interface PersonalProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  status: 'production' | 'beta' | 'development' | 'archived';
  metrics?: {
    stars?: number;
    forks?: number;
    users?: number;
  };
  highlights?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  skills: string[];
  exampleProjects: string[]; // Project IDs
  deliverables: string[];
  category: 'technical' | 'consulting' | 'research';
}

export interface Venture {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problemSpace: string;
  solution: string;
  status: 'concept' | 'prototyping' | 'mvp' | 'launched';
  technologies: string[];
  lookingFor: string[]; // e.g., ["co-founder", "advisor", "early adopter"]
  imageUrl?: string;
  relevantExperience: string[]; // Links to professional projects
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatarUrl?: string;
  projectRelated?: string; // Project ID
  date?: string;
}

export interface Hobby {
  id: string;
  title: string;
  description: string;
  category: 'photography' | 'music' | 'theatre' | 'art' | 'sports';
  images?: string[];
  highlights?: string[];
}

export interface Bio {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  location: string;
  citiesLivedIn?: {
    city: string;
    country: string;
    flag: string;
    years?: string;
    hometown?: boolean;
  }[];
  availability: {
    freelance: boolean;
    fullTime: boolean;
    consulting: boolean;
  };
  contact: {
    email?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    whatsapp?: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType?: 'freelance' | 'consulting' | 'collaboration' | 'employment' | 'other';
}
