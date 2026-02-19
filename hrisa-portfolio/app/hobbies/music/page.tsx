import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Music, Guitar, Mic2, Piano, Headphones, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Music | Mahdi Sellami',
  description: 'Musical journey and instruments',
};

export default function MusicPage() {
  const instruments = [
    {
      name: 'Guitar',
      icon: Guitar,
      proficiency: 'Intermediate',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Piano',
      icon: Piano,
      proficiency: 'Beginner',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const genres = [
    'Rock',
    'Jazz',
    'Classical',
    'Electronic',
    'World Music',
    'Alternative',
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
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-display font-bold text-sand-950">
                Music
              </h1>
            </div>
            <p className="text-lg text-sand-600 max-w-3xl">
              Music has been a constant companion through my travels and work.
              Whether playing instruments or discovering new genres, music helps me think creatively and find patterns.
            </p>
          </div>

          {/* Info Box */}
          <div className="mb-12 p-6 bg-purple-50 border-2 border-purple-200 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Headphones className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-display font-bold text-sand-950">
                Content Coming Soon
              </h2>
            </div>
            <p className="text-sand-700">
              I'm gathering photos and recordings from performances, jam sessions, and music projects.
              Check back for updates on my musical journey!
            </p>
          </div>

          {/* Instruments */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-6">
              Instruments
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {instruments.map((instrument) => {
                const Icon = instrument.icon;
                return (
                  <div
                    key={instrument.name}
                    className="p-6 bg-white rounded-xl border-2 border-sand-200 hover:border-purple-300 transition-colors"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${instrument.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-sand-950 mb-2">
                      {instrument.name}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                      {instrument.proficiency}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Favorite Genres */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-6">
              Favorite Genres
            </h2>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-2 bg-gradient-to-br from-purple-50 to-pink-50 text-sand-800 rounded-lg font-medium border border-purple-200"
                >
                  {genre}
                </span>
              ))}
            </div>
          </section>

          {/* Music & Code Connection */}
          <section className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-display font-bold text-sand-950">
                Music & Code
              </h2>
            </div>
            <p className="text-sand-700 mb-4">
              The parallels between music and programming are fascinating:
            </p>
            <ul className="space-y-3 text-sand-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold mt-1">•</span>
                <span>
                  <strong>Patterns & Structure:</strong> Musical compositions and code architectures both rely on patterns, repetition, and hierarchy
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold mt-1">•</span>
                <span>
                  <strong>Iteration & Refinement:</strong> Like debugging code, practicing music is about iterative improvement
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold mt-1">•</span>
                <span>
                  <strong>Collaboration:</strong> Playing in a band teaches ensemble thinking, similar to working in development teams
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold mt-1">•</span>
                <span>
                  <strong>Creative Problem-Solving:</strong> Improvisation in music mirrors the creative thinking needed for elegant solutions
                </span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
