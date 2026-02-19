import { getFeaturedProjects } from '@/data/professional';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FeaturedWork() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section id="featured-work" className="py-20 px-6 bg-sand-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 mb-4">
            <span className="text-sm font-medium text-brand-700">Featured Work</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-sand-950 mb-4">
            Production AI Systems
          </h2>
          <p className="text-lg text-sand-600 max-w-2xl mx-auto">
            Real-world applications deployed and running in production environments.
            From ML pipelines to full-stack RAG systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center">
          <Link
            href="/professional"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-sand-50 text-sand-900 rounded-lg font-semibold transition-all duration-300 border-2 border-sand-300 hover:border-brand-400 group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
