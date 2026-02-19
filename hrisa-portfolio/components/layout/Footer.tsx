import { socialLinks } from '@/data/about';
import { Github, Linkedin, Instagram, Mail, Heart, Sparkles } from 'lucide-react';

const iconMap: Record<string, any> = {
  Github,
  Linkedin,
  Instagram,
  Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sand-100 border-t border-sand-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-display font-bold text-sand-950 mb-4">
              Hrisa
            </h3>
            <p className="text-sand-600 text-sm mb-4">
              Building the future with AI and innovative solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-sand-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-brand-500 fill-brand-500" />
              <span>in Munich</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold text-sand-950 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/professional" className="text-sand-600 hover:text-brand-500 transition-colors">
                  Professional Work
                </a>
              </li>
              <li>
                <a href="/projects" className="text-sand-600 hover:text-brand-500 transition-colors">
                  Personal Projects
                </a>
              </li>
              <li>
                <a href="/services" className="text-sand-600 hover:text-brand-500 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/ventures" className="text-sand-600 hover:text-brand-500 transition-colors">
                  Ventures
                </a>
              </li>
              <li>
                <a href="/about" className="text-sand-600 hover:text-brand-500 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-lg font-display font-bold text-sand-950 mb-4">
              Connect
            </h3>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-sand-200 hover:bg-brand-500 text-sand-700 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={link.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-sand-600">
              Open to freelance projects and collaborations
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sand-300 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sand-600">
            {/* Copyright */}
            <div>
              © {currentYear} Mahdi Sellami. All rights reserved.
            </div>

            {/* Subtle Anthropic/Claude Code Homage */}
            <div className="flex items-center gap-2 text-sand-500 hover:text-brand-500 transition-colors group">
              <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
              <span className="text-xs">
                Built with{' '}
                <a
                  href="https://www.anthropic.com/claude"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sand-700 hover:text-brand-500 underline decoration-dotted underline-offset-4"
                >
                  Claude
                </a>
                {' '}and{' '}
                <a
                  href="https://claude.ai/claude-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sand-700 hover:text-brand-500 underline decoration-dotted underline-offset-4"
                >
                  Claude Code
                </a>
              </span>
            </div>

            {/* Tech Stack Hint */}
            <div className="text-xs text-sand-500">
              Next.js • TypeScript • Tailwind CSS
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
