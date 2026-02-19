import { Sparkles, Code2, Palette, Zap, Heart } from 'lucide-react';

export const metadata = {
  title: 'Colophon | How This Site Was Built',
  description: 'Behind the scenes of building this portfolio with Claude Code and modern web technologies.',
};

export default function ColophonPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 mb-6">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">
              Colophon
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-sand-950 mb-4">
            How This Site Was Built
          </h1>
          <p className="text-lg text-sand-600 max-w-2xl mx-auto">
            A transparent look at the tools, technologies, and AI collaboration that brought this portfolio to life.
          </p>
        </div>

        {/* AI Collaboration Section */}
        <section className="mb-16 p-8 bg-gradient-to-br from-brand-50 to-terracotta-50 rounded-2xl border border-brand-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-sand-950 mb-2">
                Built with Claude Code
              </h2>
              <p className="text-sand-700">
                This entire portfolio was developed through an AI-human collaboration using{' '}
                <a
                  href="https://claude.ai/claude-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:text-brand-700 underline font-medium"
                >
                  Claude Code
                </a>
                , Anthropic's AI coding assistant powered by Claude.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sand-700">
            <p>
              <strong className="text-sand-900">What is Claude Code?</strong> An intelligent coding assistant that understands context, writes production-ready code, and collaborates iteratively on complex projects. It's not just code completion—it's a coding partner that can architect, implement, test, and refactor.
            </p>

            <div className="bg-white/60 p-6 rounded-xl">
              <p className="text-sm text-sand-600 mb-4 font-medium">Here's what Claude Code did:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">✓</span>
                  <span>Designed complete system architecture and information hierarchy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">✓</span>
                  <span>Created strategic content positioning for freelance/startup goals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">✓</span>
                  <span>Developed custom Harissa warmth color theme inspired by Tunisian heritage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">✓</span>
                  <span>Wrote comprehensive TypeScript types and data structures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">✓</span>
                  <span>Implemented Docker deployment and development workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">✓</span>
                  <span>Documented testing strategies, admin systems, and i18n architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">✓</span>
                  <span>Created all React components with responsive design</span>
                </li>
              </ul>
            </div>

            <p className="text-sm italic text-sand-600">
              "Working with Claude Code felt like pair programming with a senior developer who never gets tired, always has ideas, and can switch between strategic thinking and implementation details seamlessly." — Mahdi
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-brand-500" />
            <h2 className="text-2xl font-display font-bold text-sand-950">
              Tech Stack
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl border border-sand-200 hover:border-brand-300 transition-colors">
              <h3 className="font-semibold text-sand-900 mb-3">Frontend</h3>
              <ul className="space-y-2 text-sm text-sand-600">
                <li>• Next.js 15 (App Router)</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Framer Motion</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-xl border border-sand-200 hover:border-brand-300 transition-colors">
              <h3 className="font-semibold text-sand-900 mb-3">Infrastructure</h3>
              <ul className="space-y-2 text-sm text-sand-600">
                <li>• Docker & Docker Compose</li>
                <li>• Vercel (deployment)</li>
                <li>• GitHub (version control)</li>
                <li>• Make (automation)</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-xl border border-sand-200 hover:border-brand-300 transition-colors">
              <h3 className="font-semibold text-sand-900 mb-3">Planned Backend</h3>
              <ul className="space-y-2 text-sm text-sand-600">
                <li>• FastAPI or Next.js API routes</li>
                <li>• PostgreSQL</li>
                <li>• NextAuth.js</li>
                <li>• Email notifications</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-xl border border-sand-200 hover:border-brand-300 transition-colors">
              <h3 className="font-semibold text-sand-900 mb-3">Future Features</h3>
              <ul className="space-y-2 text-sm text-sand-600">
                <li>• i18n (5 languages)</li>
                <li>• Admin panel with RBAC</li>
                <li>• Claude-powered Q&A bot</li>
                <li>• Testing (Jest, Playwright)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-terracotta-500" />
            <h2 className="text-2xl font-display font-bold text-sand-950">
              Design Philosophy
            </h2>
          </div>

          <div className="p-8 bg-gradient-to-br from-terracotta-50 to-sand-100 rounded-2xl border border-terracotta-200">
            <h3 className="font-display font-semibold text-sand-900 mb-4">
              The Harissa Theme
            </h3>
            <p className="text-sand-700 mb-4">
              The color scheme draws inspiration from <strong>harissa</strong>—the bold, warm Tunisian chili paste—and the landscapes of South Tunisia. This represents cultural roots while maintaining professional polish.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-brand-500 rounded-lg" />
                  <div>
                    <div className="font-semibold text-sm text-sand-900">Brand</div>
                    <div className="text-xs text-sand-600">#f94f3d</div>
                  </div>
                </div>
                <p className="text-xs text-sand-600">Warm red-orange, passionate and bold</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-terracotta-500 rounded-lg" />
                  <div>
                    <div className="font-semibold text-sm text-sand-900">Terracotta</div>
                    <div className="text-xs text-sand-600">#d36647</div>
                  </div>
                </div>
                <p className="text-xs text-sand-600">Earthy clay tones, grounded</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-sand-200 rounded-lg" />
                  <div>
                    <div className="font-semibold text-sm text-sand-900">Sand</div>
                    <div className="text-xs text-sand-600">#f3ede3</div>
                  </div>
                </div>
                <p className="text-xs text-sand-600">Desert warmth, calm backgrounds</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-olive-500 rounded-lg" />
                  <div>
                    <div className="font-semibold text-sm text-sand-900">Olive</div>
                    <div className="text-xs text-sand-600">#8d955a</div>
                  </div>
                </div>
                <p className="text-xs text-sand-600">Mediterranean accents</p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-brand-500" />
            <h2 className="text-2xl font-display font-bold text-sand-950">
              Performance & Best Practices
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-6 bg-white rounded-xl border border-sand-200 text-center">
              <div className="text-3xl font-bold text-brand-600 mb-2">90+</div>
              <div className="text-sm text-sand-600">Lighthouse Score Target</div>
            </div>
            <div className="p-6 bg-white rounded-xl border border-sand-200 text-center">
              <div className="text-3xl font-bold text-terracotta-600 mb-2">100%</div>
              <div className="text-sm text-sand-600">Accessibility Goal</div>
            </div>
            <div className="p-6 bg-white rounded-xl border border-sand-200 text-center">
              <div className="text-3xl font-bold text-olive-600 mb-2">&lt;2s</div>
              <div className="text-sm text-sand-600">Time to Interactive</div>
            </div>
          </div>

          <div className="mt-6 p-6 bg-sand-50 rounded-xl border border-sand-200">
            <h3 className="font-semibold text-sand-900 mb-3 text-sm">Built-in Optimizations:</h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-sand-600">
              <li>• Server Components by default</li>
              <li>• Image optimization with Next.js Image</li>
              <li>• Static generation where possible</li>
              <li>• Code splitting and lazy loading</li>
              <li>• Minimal JavaScript bundle</li>
              <li>• SEO-optimized metadata</li>
            </ul>
          </div>
        </section>

        {/* Credits */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-brand-500 fill-brand-500" />
            <h2 className="text-2xl font-display font-bold text-sand-950">
              Credits & Acknowledgments
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-white rounded-xl border border-sand-200">
              <h3 className="font-semibold text-sand-900 mb-2">
                Anthropic & Claude
              </h3>
              <p className="text-sm text-sand-600">
                Profound gratitude to{' '}
                <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 underline">
                  Anthropic
                </a>{' '}
                for creating Claude and{' '}
                <a href="https://claude.ai/claude-code" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 underline">
                  Claude Code
                </a>
                . This project wouldn't exist in its current form without this incredible AI collaboration tool. Claude Code demonstrated what's possible when AI truly augments human creativity and technical capability.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-sand-200">
              <h3 className="font-semibold text-sand-900 mb-2">
                Open Source Community
              </h3>
              <p className="text-sm text-sand-600">
                This site stands on the shoulders of giants: Next.js (Vercel), React (Meta), Tailwind CSS, TypeScript, and countless open-source contributors who make modern web development possible.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-sand-200">
              <h3 className="font-semibold text-sand-900 mb-2">
                Cultural Inspiration
              </h3>
              <p className="text-sm text-sand-600">
                The design honors Tunisian heritage—from the harissa-inspired colors to the multicultural narrative woven throughout. A tribute to South Tunisia, where warm tones meet Mediterranean light.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="p-8 bg-gradient-to-br from-sand-50 to-terracotta-50 rounded-2xl border border-sand-200">
          <h2 className="text-2xl font-display font-bold text-sand-950 mb-4">
            Development Process
          </h2>
          <p className="text-sand-700 mb-6">
            This portfolio was built iteratively over multiple sessions, with constant back-and-forth between human vision and AI execution. The process demonstrated true AI-human collaboration:
          </p>

          <ol className="space-y-4 text-sm text-sand-700">
            <li className="flex gap-3">
              <span className="font-bold text-brand-600 shrink-0">01.</span>
              <span><strong>Strategic Planning:</strong> Defined goals (freelance positioning), target audiences, and unique differentiators</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-600 shrink-0">02.</span>
              <span><strong>Architecture Design:</strong> Designed information hierarchy, tech stack, and content strategy</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-600 shrink-0">03.</span>
              <span><strong>Design System:</strong> Created custom Harissa theme with cultural significance</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-600 shrink-0">04.</span>
              <span><strong>Data Modeling:</strong> Structured all content (projects, services, ventures) with TypeScript types</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-600 shrink-0">05.</span>
              <span><strong>Component Development:</strong> Built reusable React components with accessibility in mind</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-600 shrink-0">06.</span>
              <span><strong>Documentation:</strong> Comprehensive docs for testing, i18n, admin systems, and future features</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-600 shrink-0">07.</span>
              <span><strong>Iterative Refinement:</strong> Continuous improvements based on feedback and new ideas</span>
            </li>
          </ol>
        </section>

        {/* CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-br from-brand-50 to-terracotta-50 rounded-2xl border border-brand-200">
          <p className="text-sand-700 mb-6">
            Interested in building something similar? Or curious about AI-assisted development?
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Let's Talk
            <Sparkles className="w-5 h-5" />
          </a>
        </div>
      </div>
    </main>
  );
}
