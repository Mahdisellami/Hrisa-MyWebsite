'use client';

import { useState, useMemo } from 'react';
import { professionalProjects } from '@/data/professional';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Filter } from 'lucide-react';

export default function ProfessionalPage() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    professionalProjects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return professionalProjects.filter(project => {
      const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
      const matchesStatus = !selectedStatus || project.status === selectedStatus;
      return matchesTech && matchesStatus;
    });
  }, [selectedTech, selectedStatus]);

  const clearFilters = () => {
    setSelectedTech(null);
    setSelectedStatus(null);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 mb-4">
              <span className="text-sm font-medium text-brand-700">Professional Work</span>
            </div>
            <h1 className="text-5xl font-display font-bold text-sand-950 mb-4">
              Professional Projects
            </h1>
            <p className="text-lg text-sand-600 max-w-3xl">
              A comprehensive look at production systems, research projects, and professional work.
              From ML pipelines to knowledge graphs, each project demonstrates real-world impact.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 p-6 bg-white rounded-xl border border-sand-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-sand-600" />
              <h2 className="text-lg font-semibold text-sand-900">Filter Projects</h2>
              {(selectedTech || selectedStatus) && (
                <button
                  onClick={clearFilters}
                  className="ml-auto text-sm text-brand-600 hover:text-brand-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="mb-4">
              <label className="text-sm font-medium text-sand-700 mb-2 block">Status:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedStatus(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === null
                      ? 'bg-brand-500 text-white'
                      : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedStatus('production')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === 'production'
                      ? 'bg-brand-500 text-white'
                      : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                  }`}
                >
                  🟢 Production
                </button>
                <button
                  onClick={() => setSelectedStatus('beta')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === 'beta'
                      ? 'bg-brand-500 text-white'
                      : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                  }`}
                >
                  🔵 Beta
                </button>
                <button
                  onClick={() => setSelectedStatus('completed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === 'completed'
                      ? 'bg-brand-500 text-white'
                      : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                  }`}
                >
                  ✓ Completed
                </button>
              </div>
            </div>

            {/* Technology Filter */}
            <div>
              <label className="text-sm font-medium text-sand-700 mb-2 block">Technology:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTech(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTech === null
                      ? 'bg-brand-500 text-white'
                      : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                  }`}
                >
                  All Technologies
                </button>
                {allTechnologies.slice(0, 15).map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTech === tech
                        ? 'bg-brand-500 text-white'
                        : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-sm text-sand-600">
            Showing <span className="font-semibold text-sand-900">{filteredProjects.length}</span> of{' '}
            <span className="font-semibold text-sand-900">{professionalProjects.length}</span> projects
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured={project.featured} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sand-600 mb-4">No projects match your filters.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
