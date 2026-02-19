'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Camera, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function PhotographyPage() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Photo data - 17 photos from travels and personal moments
  const photos = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    filename: `photo-${String(i + 1).padStart(2, '0')}.jpg`,
    title: `Photo ${i + 1}`,
    location: 'Travel memories',
    date: '2024-2026',
  }));

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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-display font-bold text-sand-950">
                Photography
              </h1>
            </div>
            <p className="text-lg text-sand-600 max-w-3xl">
              Capturing moments from my travels across Europe, Africa, and the Middle East.
              Each photo tells a story of places I've lived, people I've met, and perspectives I've gained.
            </p>
          </div>

          {/* Info Box */}
          <div className="mb-12 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <h2 className="text-xl font-display font-bold text-sand-950 mb-3">
              📸 Photography Gallery
            </h2>
            <p className="text-sand-700">
              A collection of 17 photos capturing moments from my travels across Europe, Africa, and the Middle East.
              Each image represents a unique perspective from the cities I've called home.
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl overflow-hidden border-2 border-sand-200 hover:border-blue-400 transition-all hover:shadow-lg"
              >
                {!imageErrors[photo.id] ? (
                  <Image
                    src={`/images/photography/${photo.filename}`}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(photo.id)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Camera className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                      <div className="text-xs text-sand-500">
                        {photo.filename}
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay with info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{photo.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{photo.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How to Add Photos */}
          <div className="mt-16 p-8 bg-white rounded-2xl border-2 border-sand-200">
            <h2 className="text-2xl font-display font-bold text-sand-950 mb-4">
              📁 How to Add Your Photos
            </h2>
            <p className="text-sand-700 mb-4">
              To populate this gallery, add your photos to:
            </p>
            <div className="p-4 bg-sand-50 rounded-lg font-mono text-sm text-sand-700 mb-4">
              hrisa-portfolio/public/images/photography/
            </div>
            <p className="text-sand-700 mb-4">Name them as:</p>
            <ul className="list-disc list-inside space-y-1 text-sand-700 mb-4">
              <li><code className="bg-sand-100 px-2 py-0.5 rounded">photo-01.jpg</code></li>
              <li><code className="bg-sand-100 px-2 py-0.5 rounded">photo-02.jpg</code></li>
              <li><code className="bg-sand-100 px-2 py-0.5 rounded">photo-03.jpg</code> ... and so on</li>
            </ul>
            <p className="text-sm text-sand-600">
              The gallery will automatically display your photos once added. No code changes needed!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
