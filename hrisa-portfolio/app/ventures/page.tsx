import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Lightbulb, Rocket, Users, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Ventures | Mahdi Sellami',
  description: 'Innovation lab and startup ideas - coming soon',
};

export default function VenturesPage() {
  const ventureIdeas = [
    {
      name: 'Hrisa Agents',
      tagline: 'Building the future of autonomous AI systems',
      status: 'Ongoing Research',
      icon: Rocket,
    },
    {
      name: 'Hrisa Code',
      tagline: 'AI-powered code understanding for enterprise codebases',
      status: 'Conceptual Phase',
      icon: Lightbulb,
    },
    {
      name: 'Hrisa HR Platform',
      tagline: 'AI-powered talent management and recruitment intelligence',
      status: 'Early Exploration',
      icon: Users,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta-50 border border-terracotta-200 mb-4">
              <Lightbulb className="w-4 h-4 text-terracotta-600" />
              <span className="text-sm font-medium text-terracotta-700">Innovation Lab</span>
            </div>
            <h1 className="text-5xl font-display font-bold text-sand-950 mb-4">
              Future Work & Ventures
            </h1>
            <p className="text-lg text-sand-600 max-w-2xl mx-auto mb-8">
              Exploring ideas at the intersection of AI, software engineering, and practical business problems.
              These are concepts I'm developing and researching.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg text-yellow-800">
              <span className="text-2xl">🚧</span>
              <span className="font-semibold">Full details coming soon</span>
            </div>
          </div>

          {/* Venture Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {ventureIdeas.map((venture, idx) => {
              const Icon = venture.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-xl border-2 border-sand-200 hover:border-terracotta-300 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-terracotta-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-sand-950 mb-2">
                    {venture.name}
                  </h3>
                  <p className="text-sand-700 text-sm mb-4">{venture.tagline}</p>
                  <span className="inline-block px-3 py-1 bg-sand-100 text-sand-700 rounded-full text-xs font-medium">
                    {venture.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Why These Ideas */}
          <section className="mb-16 p-8 bg-gradient-to-br from-terracotta-50 to-sand-100 rounded-2xl border border-terracotta-200">
            <h2 className="text-2xl font-display font-bold text-sand-950 mb-4">
              Why These Ideas?
            </h2>
            <div className="space-y-4 text-sand-700">
              <p>
                Each of these ventures addresses real pain points I've encountered or observed in the tech industry:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-brand-500 font-bold mt-1">•</span>
                  <span>
                    <strong>Hrisa Agents</strong> - Making agentic AI systems accessible for production use,
                    based on hands-on experience building AI agents.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-500 font-bold mt-1">•</span>
                  <span>
                    <strong>Hrisa Code</strong> - Addressing the challenge of understanding large codebases
                    with AI-powered semantic search and analysis.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-500 font-bold mt-1">•</span>
                  <span>
                    <strong>Hrisa HR</strong> - Using AI to make hiring more fair, efficient, and data-driven
                    while keeping humans in the loop.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Current Focus */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-sand-950 mb-6">
              Current Focus
            </h2>
            <div className="p-6 bg-white rounded-xl border border-sand-200">
              <p className="text-sand-700 mb-4">
                Right now, I'm focused on building my professional portfolio and establishing
                myself as a freelance ML/AI engineer. These venture ideas are being developed
                in parallel through:
              </p>
              <ul className="space-y-2 text-sand-700">
                <li className="flex items-start gap-3">
                  <span className="text-terracotta-500">→</span>
                  <span>Research and market validation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terracotta-500">→</span>
                  <span>Building relevant skills through professional projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terracotta-500">→</span>
                  <span>Networking with potential collaborators and advisors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terracotta-500">→</span>
                  <span>Prototyping core concepts and technical feasibility</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Interested in Collaborating? */}
          <section className="p-8 bg-gradient-to-br from-brand-50 via-sand-50 to-terracotta-50 rounded-2xl border border-brand-200 text-center">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-4">
              Interested in Collaborating?
            </h2>
            <p className="text-lg text-sand-700 mb-6 max-w-2xl mx-auto">
              If any of these ideas resonate with you, or if you have experience in these domains
              and want to discuss potential collaboration, I'd love to hear from you.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </section>

          {/* Note about detailed plans */}
          <div className="mt-12 text-center">
            <p className="text-sm text-sand-600 italic">
              Detailed venture plans, market analysis, and technical architectures will be published here
              as these ideas mature. Check back soon for updates!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
