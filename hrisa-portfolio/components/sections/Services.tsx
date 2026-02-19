import { services } from '@/data/services';
import {
  Building2,
  Brain,
  Network,
  Code2,
  Container,
  FlaskConical,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, any> = {
  Building2,
  Brain,
  Network,
  Code2,
  Container,
  FlaskConical,
};

export function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta-50 border border-terracotta-200 mb-4">
            <span className="text-sm font-medium text-terracotta-700">Expertise Areas</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-sand-950 mb-4">
            What I Do
          </h2>
          <p className="text-lg text-sand-600 max-w-2xl mx-auto">
            Full-stack capability from ML model training to production deployment.
            Specialized in building systems that actually work.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="group p-6 bg-sand-50 hover:bg-white rounded-xl border-2 border-sand-200 hover:border-terracotta-300 transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-terracotta-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-sand-950 mb-2 group-hover:text-brand-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sand-700 mb-4 text-sm">
                  {service.description}
                </p>

                {/* Key Skills */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-sand-600 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {service.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-white text-sand-600 rounded text-xs border border-sand-200"
                      >
                        {skill}
                      </span>
                    ))}
                    {service.skills.length > 4 && (
                      <span className="px-2 py-0.5 bg-white text-sand-500 rounded text-xs border border-sand-200">
                        +{service.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Learn More Link */}
                <Link
                  href={`/services#${service.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-terracotta-600 hover:text-terracotta-700 group/link"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-gradient-to-br from-terracotta-50 to-sand-100 rounded-2xl border border-terracotta-200">
          <h3 className="text-2xl font-display font-bold text-sand-950 mb-3">
            Need help with your project?
          </h3>
          <p className="text-sand-700 mb-6 max-w-xl mx-auto">
            Whether you need a complete system built or consulting on your existing project,
            I'm available for freelance work and collaborations.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Let's Discuss Your Project
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
