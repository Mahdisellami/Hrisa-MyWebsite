import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Camera, Music, Theater, Palette, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Hobbies | Mahdi Sellami',
  description: 'Beyond code: Photography, music, theatre, art, and sports',
};

export default function HobbiesPage() {
  const hobbies = [
    {
      id: 'photography',
      name: 'Photography',
      icon: Camera,
      description: 'Capturing moments and perspectives from my travels across 16 cities',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400',
    },
    {
      id: 'music',
      name: 'Music',
      icon: Music,
      description: 'Playing instruments and exploring different musical genres',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-400',
    },
    {
      id: 'theatre',
      name: 'Theatre',
      icon: Theater,
      description: 'Performance, storytelling, and stage productions',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      hoverBorder: 'hover:border-red-400',
    },
    {
      id: 'art',
      name: 'Art & Drawing',
      icon: Palette,
      description: 'Sketching, painting, and visual expression',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-400',
    },
    {
      id: 'sports',
      name: 'Sports & Dance',
      icon: Trophy,
      description: 'Staying active and exploring movement',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      hoverBorder: 'hover:border-yellow-400',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-sand-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta-50 border border-terracotta-200 mb-4">
              <span className="text-sm font-medium text-terracotta-700">Beyond Code</span>
            </div>
            <h1 className="text-5xl font-display font-bold text-sand-950 mb-4">
              Hobbies & Interests
            </h1>
            <p className="text-lg text-sand-600 max-w-2xl mx-auto">
              When I'm not building AI systems, I explore creativity through photography, music, theatre, art, and sports.
              These pursuits shape how I think about problems and connect with people.
            </p>
          </div>

          {/* Hobby Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {hobbies.map((hobby) => {
              const Icon = hobby.icon;
              return (
                <Link
                  key={hobby.id}
                  href={`/hobbies/${hobby.id}`}
                  className={`group p-6 bg-white rounded-2xl border-2 ${hobby.borderColor} ${hobby.hoverBorder} transition-all hover:shadow-xl`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${hobby.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-sand-950 mb-2">
                    {hobby.name}
                  </h2>
                  <p className="text-sand-700 mb-4">{hobby.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                    <span>View Gallery</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Why These Matter */}
          <section className="p-8 bg-gradient-to-br from-terracotta-50 to-sand-100 rounded-2xl border border-terracotta-200">
            <h2 className="text-2xl font-display font-bold text-sand-950 mb-4">
              Why These Matter
            </h2>
            <p className="text-sand-700 mb-4">
              My hobbies aren't just pastimes—they're integral to how I approach work:
            </p>
            <ul className="space-y-3 text-sand-700">
              <li className="flex items-start gap-3">
                <span className="text-brand-500 font-bold mt-1">•</span>
                <span>
                  <strong>Photography</strong> trains my eye for composition and detail—essential for UI/UX design
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-500 font-bold mt-1">•</span>
                <span>
                  <strong>Music</strong> teaches pattern recognition and harmony, mirroring code architecture
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-500 font-bold mt-1">•</span>
                <span>
                  <strong>Theatre</strong> builds communication skills and empathy for user perspectives
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-500 font-bold mt-1">•</span>
                <span>
                  <strong>Art</strong> encourages creative problem-solving and visual thinking
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-500 font-bold mt-1">•</span>
                <span>
                  <strong>Sports</strong> reinforces discipline, teamwork, and resilience
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
