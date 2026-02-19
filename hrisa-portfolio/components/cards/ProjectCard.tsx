import { ProfessionalProject } from '@/types';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  project: ProfessionalProject;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const statusColors = {
    production: 'bg-green-100 text-green-700 border-green-200',
    beta: 'bg-blue-100 text-blue-700 border-blue-200',
    development: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    completed: 'bg-sand-100 text-sand-700 border-sand-200',
  };

  const statusLabels = {
    production: '🟢 Production',
    beta: '🔵 Beta',
    development: '🟡 Development',
    completed: '✓ Completed',
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border-2 border-sand-200 hover:border-brand-400 transition-all duration-300 overflow-hidden ${
        featured ? 'shadow-lg hover:shadow-2xl' : 'shadow hover:shadow-xl'
      }`}
    >
      {/* Image/Visual */}
      <div className="relative h-48 bg-gradient-to-br from-brand-100 to-terracotta-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-display font-bold text-brand-200/30">
            {project.title}
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              statusColors[project.status]
            }`}
          >
            {statusLabels[project.status]}
          </span>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500 text-white border border-brand-600">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-display font-bold text-sand-950 mb-2 group-hover:text-brand-600 transition-colors">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-brand-600 font-medium mb-3">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-sand-700 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-sand-100 text-sand-700 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-1 bg-sand-100 text-sand-600 rounded text-xs font-medium">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1">
              {project.highlights.slice(0, 3).map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-sand-600">
                  <span className="text-brand-500 mt-0.5">•</span>
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metrics */}
        {project.metrics && (
          <div className="flex gap-4 mb-4 text-sm">
            {project.metrics.models && (
              <div className="flex items-center gap-1 text-sand-600">
                <span className="font-semibold text-brand-600">{project.metrics.models}</span>
                <span>models</span>
              </div>
            )}
            {project.metrics.users && (
              <div className="flex items-center gap-1 text-sand-600">
                <span className="font-semibold text-terracotta-600">{project.metrics.users}</span>
                <span>users</span>
              </div>
            )}
            {project.metrics.deployments && (
              <div className="flex items-center gap-1 text-sand-600">
                <span className="font-semibold text-olive-600">{project.metrics.deployments}</span>
                <span>deployment{project.metrics.deployments > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer - Links & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-sand-200">
          {/* External Links */}
          <div className="flex gap-3">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-sand-100 text-sand-600 hover:text-sand-900 transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-sand-100 text-sand-600 hover:text-sand-900 transition-colors"
                aria-label="View live demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Learn More Link */}
          <Link
            href={`/professional/${project.id}`}
            className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 group/link"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
