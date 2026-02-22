'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Camera, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ProtectedSection } from '@/components/auth/ProtectedSection';

interface Photographer {
  id: string;
  name: string;
  displayName: string;
  folder: string;
  description?: string;
  website?: string;
  instagram?: string;
}

export default function PhotographyPage() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const photographers: Photographer[] = [
    {
      id: 'mahdi-sellami',
      name: 'Mahdi Sellami',
      displayName: 'Mahdi Sellami',
      folder: 'mahdi-sellami',
      description: 'Travel photography and moments from across Europe, Africa, and the Middle East',
    },
    {
      id: 'sofiane-affes',
      name: 'Sofiane Affes',
      displayName: 'Sofiane Affes',
      folder: 'sofiane-affes',
      description: 'Portrait and lifestyle photography',
    },
    {
      id: 'tino-von-ohrdruf',
      name: 'Tino Von Ohrdruf',
      displayName: 'Tino Von Ohrdruf',
      folder: 'tino-von-ohrdruf',
      description: 'Professional portrait photography',
    },
    {
      id: 'linsengericht',
      name: 'linsengericht.foto.stuttgart',
      displayName: 'linsengericht.foto.stuttgart',
      folder: 'linsengericht-foto-stuttgart',
      description: 'Artistic portrait photography',
      instagram: 'https://www.instagram.com/linsengericht.foto.stuttgart/',
    },
    {
      id: 'up-photography',
      name: 'up.photography',
      displayName: 'up.photography',
      folder: 'up-photography',
      description: 'Fine art portrait photography',
    },
    {
      id: 'photoshoot-at',
      name: 'Photoshoot.at',
      displayName: 'Photoshoot.at',
      folder: 'photoshoot-at',
      description: 'Professional photography services',
      website: 'https://www.photoshoot.at/',
    },
    {
      id: 'fortiss-gmbh',
      name: 'fortiss GmbH',
      displayName: 'fortiss GmbH',
      folder: 'fortiss-gmbh',
      description: 'Corporate and professional photography',
    },
  ];

  const handleImageError = (key: string) => {
    setImageErrors(prev => ({ ...prev, [key]: true }));
  };

  // Get photo color scheme based on photographer
  const getPhotographerColors = (id: string) => {
    const colors = {
      'mahdi-sellami': {
        gradient: 'from-blue-500 to-cyan-500',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        hoverBorder: 'hover:border-blue-400',
      },
      'sofiane-affes': {
        gradient: 'from-purple-500 to-pink-500',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        hoverBorder: 'hover:border-purple-400',
      },
      'tino-von-ohrdruf': {
        gradient: 'from-red-500 to-orange-500',
        bg: 'bg-red-50',
        border: 'border-red-200',
        hoverBorder: 'hover:border-red-400',
      },
      'linsengericht': {
        gradient: 'from-green-500 to-teal-500',
        bg: 'bg-green-50',
        border: 'border-green-200',
        hoverBorder: 'hover:border-green-400',
      },
      'up-photography': {
        gradient: 'from-yellow-500 to-orange-500',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        hoverBorder: 'hover:border-yellow-400',
      },
      'photoshoot-at': {
        gradient: 'from-indigo-500 to-purple-500',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        hoverBorder: 'hover:border-indigo-400',
      },
      'fortiss-gmbh': {
        gradient: 'from-gray-600 to-gray-800',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        hoverBorder: 'hover:border-gray-400',
      },
    };
    return colors[id as keyof typeof colors] || colors['mahdi-sellami'];
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
              A curated collection of photography from my travels and experiences across Europe, Africa, and the Middle East.
              Featuring work by talented photographers I've collaborated with, plus my own captures.
            </p>
          </div>

          {/* Info Box */}
          <div className="mb-16 p-6 bg-gradient-to-br from-terracotta-50 to-sand-100 border-2 border-terracotta-200 rounded-xl">
            <h2 className="text-xl font-display font-bold text-sand-950 mb-3">
              📸 Photography Gallery
            </h2>
            <p className="text-sand-700">
              This gallery showcases 130+ professionally processed images organized by photographer.
              Each collection represents unique perspectives, styles, and moments captured throughout my journey.
            </p>
          </div>

          {/* Photographer Sections */}
          {photographers.map((photographer) => {
            const colors = getPhotographerColors(photographer.id);

            return (
              <ProtectedSection
                key={photographer.id}
                resourceType="SECTION"
                resourceId={photographer.folder}
                fallback={
                  <div className="mb-20 p-8 bg-sand-100 border-2 border-sand-200 rounded-xl text-center">
                    <div className="w-12 h-12 bg-sand-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-6 h-6 text-sand-600" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-sand-950 mb-2">
                      {photographer.displayName}'s Photos Are Protected
                    </h3>
                    <p className="text-sand-700 mb-4">
                      This photographer's work is protected.{' '}
                      <a href="/login" className="text-brand-600 hover:text-brand-700 underline">
                        Log in
                      </a>
                      {' '}or{' '}
                      <a href="/register" className="text-brand-600 hover:text-brand-700 underline">
                        request access
                      </a>
                      {' '}to view {photographer.displayName === 'Mahdi Sellami' ? '75' : photographer.displayName === 'Sofiane Affes' ? '23' : photographer.displayName === 'Tino Von Ohrdruf' ? '9' : photographer.displayName === 'fortiss GmbH' ? '17' : photographer.displayName === 'Photoshoot.at' ? '5' : photographer.displayName === 'linsengericht.foto.stuttgart' ? '4' : '1'} professional photos.
                    </p>
                  </div>
                }
              >
                <section className="mb-20">
                  {/* Photographer Header */}
                  <div className={`p-6 ${colors.bg} border-2 ${colors.border} rounded-2xl mb-6`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <User className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-display font-bold text-sand-950 mb-1">
                            {photographer.displayName}
                          </h2>
                          {photographer.description && (
                            <p className="text-sand-700 text-sm">
                              {photographer.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex gap-3">
                        {photographer.website && (
                          <a
                            href={photographer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white border-2 border-sand-300 rounded-lg text-sm font-medium text-sand-700 hover:border-brand-500 hover:text-brand-700 transition-all"
                          >
                            Website
                          </a>
                        )}
                        {photographer.instagram && (
                          <a
                            href={photographer.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white border-2 border-sand-300 rounded-lg text-sm font-medium text-sand-700 hover:border-brand-500 hover:text-brand-700 transition-all"
                          >
                            Instagram
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Photo Grid - Static implementation */}
                  <PhotographerGallery
                    photographer={photographer}
                    colors={colors}
                    imageErrors={imageErrors}
                    handleImageError={handleImageError}
                  />
                </section>
              </ProtectedSection>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}

// Component to display photographer's gallery
function PhotographerGallery({
  photographer,
  colors,
  imageErrors,
  handleImageError,
}: {
  photographer: any;
  colors: any;
  imageErrors: Record<string, boolean>;
  handleImageError: (key: string) => void;
}) {
  // Photo counts per photographer (from processing output)
  const photoCounts: Record<string, number> = {
    'mahdi-sellami': 75,
    'sofiane-affes': 23,
    'tino-von-ohrdruf': 9,
    'photoshoot-at': 5,
    'fortiss-gmbh': 17,
    'linsengericht-foto-stuttgart': 4,
    'up-photography': 1,
  };

  const count = photoCounts[photographer.folder] || 0;

  if (count === 0) return null;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }, (_, i) => {
        const photoKey = `${photographer.id}-${i}`;

        return (
          <div
            key={photoKey}
            className={`group relative aspect-square ${colors.bg} rounded-xl overflow-hidden border-2 ${colors.border} ${colors.hoverBorder} transition-all hover:shadow-lg`}
          >
            {!imageErrors[photoKey] ? (
              <div className="relative w-full h-full">
                <Image
                  src={`/images/photography/${photographer.folder}/photo-${String(i + 1).padStart(2, '0')}.jpg`}
                  alt={`${photographer.displayName} - Photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onError={() => handleImageError(photoKey)}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <Camera className={`w-8 h-8 text-sand-300 mx-auto mb-2`} />
                  <div className="text-xs text-sand-500">
                    Photo {i + 1}
                  </div>
                </div>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="text-xs font-medium">
                  {photographer.displayName}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
