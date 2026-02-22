'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Music, Guitar, Mic2, Piano, Headphones, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProtectedPage } from '@/components/auth/ProtectedPage';

export default function MusicPage() {
  const instruments = [
    {
      name: 'Guitar',
      icon: Guitar,
      color: 'from-purple-500 to-pink-500',
      description: 'String instrument',
    },
    {
      name: 'Oud (Arabic)',
      icon: Music,
      color: 'from-orange-500 to-red-500',
      description: 'Traditional Middle Eastern lute',
    },
    {
      name: 'Darbouka & Percussion',
      icon: Mic2,
      color: 'from-blue-500 to-cyan-500',
      description: 'Middle Eastern drums and rhythms',
    },
    {
      name: 'Piano',
      icon: Piano,
      color: 'from-indigo-500 to-purple-500',
      description: 'Keyboard instrument',
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
      <ProtectedPage
        minRole="EDITOR"
        fallback={
          <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50 flex items-center justify-center">
            <div className="max-w-lg w-full p-8 bg-white rounded-2xl shadow-lg border-2 border-sand-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-2xl font-display font-bold text-sand-950 mb-4">
                Protected Content
              </h1>
              <p className="text-sand-600 mb-6">
                This music content is protected. Please log in or request access to view.
              </p>
              <div className="flex gap-3 justify-center">
                <Link
                  href="/login"
                  className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 border-2 border-sand-300 text-sand-700 hover:bg-sand-50 rounded-lg font-semibold transition-colors"
                >
                  Request Access
                </Link>
              </div>
            </div>
          </main>
        }
      >
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
                    <p className="text-sm text-sand-600">
                      {instrument.description}
                    </p>
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
      </ProtectedPage>
      <Footer />
    </>
  );
}
