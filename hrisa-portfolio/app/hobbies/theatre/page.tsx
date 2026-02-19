import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Theater, Users, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Theatre | Mahdi Sellami',
  description: 'Performance and storytelling through theatre',
};

export default function TheatrePage() {
  const skills = [
    'Acting',
    'Stage Presence',
    'Improvisation',
    'Voice Projection',
    'Character Development',
    'Ensemble Work',
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50">
        <div className="max-w-5xl mx-auto">
          {/* Back Link */}
          <Link
            href="/hobbies"
            className="inline-flex items-center gap-2 text-sand-600 hover:text-brand-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hobbies</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Theater className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-display font-bold text-sand-950">
                Theatre
              </h1>
            </div>
            <p className="text-lg text-sand-600 max-w-3xl">
              Theatre has taught me the power of storytelling, empathy, and communication.
              Whether on stage or behind the scenes, theatre brings narratives to life.
            </p>
          </div>

          {/* Featured Performances */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-6">
              Featured Performances
            </h2>
            <p className="text-sand-600 mb-6">
              Highlights from various theatre productions showcasing different roles and styles.
            </p>

            {/* Featured Videos Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Video 1 */}
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-sand-200">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/J0FOep1civs"
                  title="Theatre Performance 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video 2 */}
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-sand-200">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/SkFiBK5d_J0"
                  title="Theatre Performance 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          {/* Full Playlist */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-6">
              Complete Performance Archive
            </h2>
            <p className="text-sand-600 mb-6">
              Browse through the full collection of theatre performances and productions.
            </p>

            {/* YouTube Playlist Embed */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-sand-200">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/videoseries?list=PLC8zhGjglfk2_KiMwGDfTekDDclGG6zDt"
                title="Theatre Performance Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-sand-700">
                <strong>Full Archive:</strong> Use the playlist controls to browse through all performances including classical and contemporary theatre.
              </p>
            </div>
          </section>

          {/* Skills Developed */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-6">
              Skills Developed
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="p-4 bg-white rounded-xl border border-sand-200 text-center hover:border-red-300 transition-colors"
                >
                  <span className="font-semibold text-sand-900">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Theatre & Tech */}
          <section className="p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Theater className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-display font-bold text-sand-950">
                Theatre & Technology
              </h2>
            </div>
            <p className="text-sand-700 mb-4">
              My theatre experience directly influences my work in tech:
            </p>
            <ul className="space-y-3 text-sand-700">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span>
                  <strong>Empathy & User-Centered Design:</strong> Understanding characters helps me understand users and their needs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span>
                  <strong>Storytelling:</strong> Presenting technical concepts requires clear narratives—just like stage performances
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span>
                  <strong>Collaboration:</strong> Theatre productions demand tight teamwork, mirroring agile development
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span>
                  <strong>Public Speaking:</strong> Stage presence translates to confident technical presentations and demos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span>
                  <strong>Improvisation:</strong> Handling unexpected situations on stage prepares me for production incidents
                </span>
              </li>
            </ul>
          </section>

          {/* Production Philosophy */}
          <section className="p-8 bg-white rounded-2xl border-2 border-sand-200">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-terracotta-600" />
              <h2 className="text-2xl font-display font-bold text-sand-950">
                The Ensemble Mindset
              </h2>
            </div>
            <p className="text-sand-700">
              In theatre, every role matters—from lead actors to stage crew. The same is true in software:
              the best products come from diverse teams where everyone contributes their expertise.
              Theatre taught me to value every perspective and trust in collective creativity.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
