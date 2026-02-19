'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Palette, Brush, Pencil, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ArtPage() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Placeholder art data - will show real artwork when added to /public/images/art/
  const artworks = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    filename: `art-${String(i + 1).padStart(2, '0')}.jpg`,
    title: `Artwork ${i + 1}`,
    medium: 'Add medium',
    year: '2024',
  }));

  const mediums = [
    { name: 'Pencil Sketching', icon: Pencil },
    { name: 'Painting', icon: Brush },
    { name: 'Digital Art', icon: Palette },
  ];

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50">
        <div className="max-w-7xl mx-auto">
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
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-display font-bold text-sand-950">
                Art & Drawing
              </h1>
            </div>
            <p className="text-lg text-sand-600 max-w-3xl">
              Visual art helps me think spatially and express ideas beyond words.
              From quick sketches to detailed paintings, art is my outlet for creative exploration.
            </p>
          </div>

          {/* Info Box */}
          <div className="mb-12 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
            <h2 className="text-xl font-display font-bold text-sand-950 mb-3">
              🎨 Gallery Coming Soon
            </h2>
            <p className="text-sand-700">
              I'm digitizing and organizing my artwork collection. Check back soon for sketches, paintings, and digital art!
            </p>
          </div>

          {/* Mediums */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-6">
              Mediums I Work With
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mediums.map((medium) => {
                const Icon = medium.icon;
                return (
                  <div
                    key={medium.name}
                    className="p-6 bg-white rounded-xl border-2 border-sand-200 hover:border-green-300 transition-colors"
                  >
                    <Icon className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="text-lg font-display font-bold text-sand-950">
                      {medium.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Art Gallery Grid */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-6">
              Gallery
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {artworks.map((art) => (
                <div
                  key={art.id}
                  className="group relative aspect-[3/4] bg-gradient-to-br from-green-100 to-teal-100 rounded-xl overflow-hidden border-2 border-sand-200 hover:border-green-400 transition-all hover:shadow-lg"
                >
                  {!imageErrors[art.id] ? (
                    <Image
                      src={`/images/art/${art.filename}`}
                      alt={art.title}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(art.id)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <Palette className="w-10 h-10 text-green-300 mx-auto mb-2" />
                        <div className="text-xs text-sand-500">
                          {art.filename}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="font-semibold mb-1">{art.title}</div>
                      <div className="text-xs opacity-80">{art.medium} • {art.year}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Art & Design Connection */}
          <section className="p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border border-green-200 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-display font-bold text-sand-950">
                Art & Design Thinking
              </h2>
            </div>
            <p className="text-sand-700 mb-4">
              My art practice directly informs my approach to UI/UX design and visualization:
            </p>
            <ul className="space-y-3 text-sand-700">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>
                  <strong>Composition:</strong> Understanding visual balance helps create intuitive interfaces
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>
                  <strong>Color Theory:</strong> Choosing harmonious palettes for both art and brand design
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>
                  <strong>Iteration:</strong> Sketching multiple concepts mirrors the design thinking process
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-1">•</span>
                <span>
                  <strong>Visual Hierarchy:</strong> Guiding the eye through a drawing or a dashboard
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
