import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { Services } from '@/components/sections/Services';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
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

      {/* Featured Work Section */}
      <FeaturedWork />

      {/* Services Section */}
      <Services />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-brand-50 via-sand-50 to-terracotta-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 border border-brand-200 mb-6">
            <span className="text-sm font-medium text-brand-700">Get in Touch</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-sand-950 mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-sand-700 mb-8">
            Open to freelance projects, collaborations, and new opportunities.
            Whether you need help building something or want to discuss an idea,
            I'd love to hear from you.
          </p>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="mailto:mahdi.sellami@example.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/mahdi-sellami-621710112/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-sand-50 text-sand-900 rounded-lg font-semibold transition-all duration-300 border-2 border-sand-300 hover:border-brand-400"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>

          <p className="text-sm text-sand-600">
            Contact form coming soon. For now, reach out via email or LinkedIn.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </>
  );
}
