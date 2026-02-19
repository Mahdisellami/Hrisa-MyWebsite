import { notFound } from 'next/navigation';
import { professionalProjects, getProjectById } from '@/data/professional';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeft, Github, ExternalLink, Calendar, Award } from 'lucide-react';
import Link from 'next/link';

// Generate static params for all projects
export function generateStaticParams() {
  return professionalProjects.map((project) => ({
    id: project.id,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Mahdi Sellami`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

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
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/professional"
            className="inline-flex items-center gap-2 text-sand-600 hover:text-brand-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>

          {/* Project Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
                  statusColors[project.status]
                }`}
              >
                {statusLabels[project.status]}
              </span>
              {project.featured && (
                <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-100 text-brand-700 border border-brand-200">
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1 className="text-5xl font-display font-bold text-sand-950 mb-4">
              {project.title}
            </h1>

            <p className="text-xl text-brand-600 font-medium mb-6">
              {project.tagline}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-6 text-sm text-sand-600 mb-8">
              {project.role && (
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{project.role}</span>
                </div>
              )}
              {project.company && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{project.company}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {project.startDate}
                  {project.endDate ? ` - ${project.endDate}` : ' - Present'}
                </span>
              </div>
            </div>

            {/* Links */}
            {(project.links?.github || project.links?.live || project.links?.paper) && (
              <div className="flex gap-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-sand-900 hover:bg-sand-800 text-white rounded-lg font-semibold transition-all hover:scale-105"
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-all hover:scale-105"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-display font-bold text-sand-950 mb-4">Overview</h2>
              <div className="prose prose-sand max-w-none">
                <p className="text-lg text-sand-700 leading-relaxed whitespace-pre-line">
                  {project.longDescription}
                </p>
              </div>
            </section>

            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold text-sand-950 mb-4">Key Highlights</h2>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sand-700">
                      <span className="text-brand-500 font-bold mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Technologies */}
            <section>
              <h2 className="text-2xl font-display font-bold text-sand-950 mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-white text-sand-700 rounded-lg font-medium border-2 border-sand-200 hover:border-brand-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold text-sand-950 mb-4">Technical Challenges</h2>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sand-700">
                      <span className="text-terracotta-500 font-bold mt-1">→</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Impact */}
            {project.impact && (
              <section className="p-6 bg-gradient-to-br from-brand-50 to-terracotta-50 rounded-xl border border-brand-200">
                <h2 className="text-2xl font-display font-bold text-sand-950 mb-4">Impact</h2>
                <p className="text-sand-700 leading-relaxed">{project.impact}</p>
              </section>
            )}

            {/* Metrics */}
            {project.metrics && (
              <section>
                <h2 className="text-2xl font-display font-bold text-sand-950 mb-4">Project Metrics</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {project.metrics.models && (
                    <div className="p-6 bg-white rounded-xl border border-sand-200 text-center">
                      <div className="text-3xl font-bold text-brand-600 mb-1">
                        {project.metrics.models}
                      </div>
                      <div className="text-sm text-sand-600">ML Models</div>
                    </div>
                  )}
                  {project.metrics.users && (
                    <div className="p-6 bg-white rounded-xl border border-sand-200 text-center">
                      <div className="text-3xl font-bold text-terracotta-600 mb-1">
                        {project.metrics.users}
                      </div>
                      <div className="text-sm text-sand-600">Users</div>
                    </div>
                  )}
                  {project.metrics.deployments && (
                    <div className="p-6 bg-white rounded-xl border border-sand-200 text-center">
                      <div className="text-3xl font-bold text-olive-600 mb-1">
                        {project.metrics.deployments}
                      </div>
                      <div className="text-sm text-sand-600">Deployments</div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Navigation to Other Projects */}
          <div className="mt-16 pt-12 border-t border-sand-300">
            <h3 className="text-xl font-display font-bold text-sand-950 mb-6">
              Explore More Projects
            </h3>
            <Link
              href="/professional"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sand-100 hover:bg-sand-200 text-sand-900 rounded-lg font-semibold transition-colors"
            >
              <span>View All Projects</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
