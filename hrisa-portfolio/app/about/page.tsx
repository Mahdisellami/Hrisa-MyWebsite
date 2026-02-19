import { bio, socialLinks, careerHighlights, interests } from '@/data/about';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Mail, Linkedin, Github, Instagram, Download, Heart, Globe, Briefcase, GraduationCap } from 'lucide-react';

export const metadata = {
  title: 'About | Mahdi Sellami',
  description: bio.shortBio,
};

const iconMap: Record<string, any> = {
  Mail,
  Linkedin,
  Github,
  Instagram,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Profile Image Placeholder */}
              <div className="md:col-span-1">
                <div className="aspect-square bg-gradient-to-br from-brand-400 to-terracotta-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-6xl font-display font-bold mb-2">MS</div>
                    <div className="text-sm opacity-80">Photo coming soon</div>
                  </div>
                </div>

                {/* Availability Badge */}
                <div className="p-4 bg-white rounded-xl border border-sand-200 mb-4">
                  <h3 className="font-semibold text-sand-900 mb-3 text-sm">Availability</h3>
                  <div className="space-y-2 text-sm">
                    {bio.availability.freelance && (
                      <div className="flex items-center gap-2 text-green-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Freelance</span>
                      </div>
                    )}
                    {bio.availability.consulting && (
                      <div className="flex items-center gap-2 text-green-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Consulting</span>
                      </div>
                    )}
                    {bio.availability.fullTime && (
                      <div className="flex items-center gap-2 text-sand-600">
                        <span className="w-2 h-2 bg-sand-400 rounded-full"></span>
                        <span>Full-time</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Links */}
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white hover:bg-brand-50 rounded-lg border border-sand-200 hover:border-brand-300 transition-all"
                        aria-label={link.platform}
                      >
                        <Icon className="w-5 h-5 text-sand-700" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Bio Content */}
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 mb-4">
                  <span className="text-sm font-medium text-brand-700">About Me</span>
                </div>
                <h1 className="text-5xl font-display font-bold text-sand-950 mb-2">
                  {bio.name}
                </h1>
                <p className="text-2xl text-brand-600 font-medium mb-4">{bio.title}</p>
                <div className="flex items-center gap-2 text-sand-600 mb-6">
                  <MapPin className="w-5 h-5" />
                  <span>{bio.location}</span>
                </div>

                {/* Short Bio */}
                <p className="text-lg text-sand-700 leading-relaxed mb-6">
                  {bio.shortBio}
                </p>

                {/* Long Bio */}
                <div className="prose prose-sand max-w-none">
                  <div className="text-sand-700 leading-relaxed whitespace-pre-line">
                    {bio.longBio}
                  </div>
                </div>

                {/* Download CV */}
                <div className="mt-8">
                  <a
                    href="/docs/cv.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-all hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Cities Lived In */}
          {bio.citiesLivedIn && bio.citiesLivedIn.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-brand-500" />
                <h2 className="text-3xl font-display font-bold text-sand-950">
                  A Multicultural Journey
                </h2>
              </div>
              <p className="text-sand-600 mb-8">
                I've lived in {bio.citiesLivedIn.length} cities across Europe, Africa, and the Middle East,
                each shaping my perspective and approach to problem-solving.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bio.citiesLivedIn.map((city, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      city.hometown
                        ? 'bg-gradient-to-br from-brand-50 to-terracotta-50 border-brand-300'
                        : 'bg-white border-sand-200 hover:border-brand-200'
                    }`}
                  >
                    <div className="text-3xl mb-2">{city.flag}</div>
                    <div className="font-semibold text-sand-900 mb-1">{city.city}</div>
                    <div className="text-xs text-sand-600">{city.country}</div>
                    {city.years && (
                      <div className="text-xs text-brand-600 font-medium mt-1">{city.years}</div>
                    )}
                    {city.hometown && (
                      <div className="flex items-center gap-1 text-xs text-brand-700 font-medium mt-2">
                        <Heart className="w-3 h-3 fill-brand-500" />
                        <span>Hometown</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-terracotta-500" />
              <h2 className="text-3xl font-display font-bold text-sand-950">
                Skills & Expertise
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {bio.skills.map((skillCategory, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-xl border border-sand-200 hover:border-terracotta-300 transition-colors"
                >
                  <h3 className="text-lg font-display font-bold text-sand-950 mb-4">
                    {skillCategory.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-sand-50 text-sand-700 rounded-lg text-sm font-medium border border-sand-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-olive-500" />
              <h2 className="text-3xl font-display font-bold text-sand-950">
                Languages
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {bio.languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-sand-200 text-center hover:border-olive-300 transition-colors"
                >
                  <div className="font-bold text-sand-900 mb-1">{lang.language}</div>
                  <div className="text-sm text-sand-600">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Career Highlights Timeline */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-brand-500" />
              <h2 className="text-3xl font-display font-bold text-sand-950">
                Career Highlights
              </h2>
            </div>

            <div className="space-y-8">
              {careerHighlights.map((highlight, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-brand-300">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-brand-500 rounded-full border-4 border-sand-50"></div>
                  <div className="text-sm font-semibold text-brand-600 mb-1">{highlight.year}</div>
                  <h3 className="text-xl font-display font-bold text-sand-950 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sand-700 mb-3">{highlight.description}</p>
                  {highlight.achievements && highlight.achievements.length > 0 && (
                    <ul className="space-y-1">
                      {highlight.achievements.map((achievement, achievementIdx) => (
                        <li key={achievementIdx} className="flex items-start gap-2 text-sm text-sand-600">
                          <span className="text-brand-500 mt-0.5">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Interests */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-brand-500 fill-brand-500" />
              <h2 className="text-3xl font-display font-bold text-sand-950">
                Professional Interests
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 bg-gradient-to-br from-brand-50 to-terracotta-50 text-sand-800 rounded-lg font-medium border border-brand-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="p-8 bg-gradient-to-br from-brand-50 via-sand-50 to-terracotta-50 rounded-2xl border border-brand-200 text-center">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-sand-700 mb-6 max-w-2xl mx-auto">
              I'm always interested in hearing about new opportunities, collaborations,
              and innovative projects. Whether you need a technical partner for your startup
              or want to discuss an idea, feel free to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={bio.contact.email ? `mailto:${bio.contact.email}` : '#'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
              <a
                href={bio.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-sand-50 text-sand-900 rounded-lg font-semibold transition-all hover:scale-105 border-2 border-sand-300 hover:border-brand-400"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
