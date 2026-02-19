export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-sand-50 via-sand-100 to-terracotta-50">
        <div className="max-w-4xl mx-auto text-center">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 mb-8 animate-fade-in">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
            </span>
            <span className="text-sm font-medium text-brand-700">
              Available for Projects
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-sand-950 mb-6 animate-slide-up">
            Mahdi Sellami
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-sand-700 mb-8 animate-slide-up font-medium">
            ML Engineer • Full-Stack Developer • Entrepreneur
          </p>

          {/* Description */}
          <p className="text-lg text-sand-600 max-w-2xl mx-auto mb-12 animate-slide-up leading-relaxed">
            Building production AI systems and exploring innovative solutions.
            Specializing in agentic systems, RAG, MLOps, and full-stack development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <a
              href="#featured-work"
              className="group px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
            >
              View My Work
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-sand-100 hover:bg-sand-200 text-sand-900 rounded-lg font-semibold transition-all duration-300 border-2 border-sand-300 hover:border-terracotta-400"
            >
              Let's Talk
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 animate-fade-in">
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-sand-200">
              <div className="text-3xl font-bold text-brand-600 mb-1">4+</div>
              <div className="text-sm text-sand-600">Production Projects</div>
            </div>
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-sand-200">
              <div className="text-3xl font-bold text-terracotta-600 mb-1">10+</div>
              <div className="text-sm text-sand-600">Technologies</div>
            </div>
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-sand-200">
              <div className="text-3xl font-bold text-olive-600 mb-1">3</div>
              <div className="text-sm text-sand-600">Startup Ideas</div>
            </div>
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-sand-200">
              <div className="text-3xl font-bold text-brand-600 mb-1">∞</div>
              <div className="text-sm text-sand-600">Passion</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-sand-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Placeholder for Featured Work Section */}
      <section id="featured-work" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-sand-950 text-center mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-sand-600 text-center mb-12">
            Production AI systems and applications
          </p>
          <div className="text-center text-sand-500">
            Coming soon...
          </div>
        </div>
      </section>

      {/* Placeholder for Contact Section */}
      <section id="contact" className="py-20 px-6 bg-sand-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold text-sand-950 mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-sand-600 mb-8">
            Open to freelance projects, collaborations, and new opportunities
          </p>
          <div className="text-center text-sand-500">
            Contact form coming soon...
          </div>
        </div>
      </section>
    </main>
  );
}
