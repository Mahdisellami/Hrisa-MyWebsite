import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Trophy, Heart, Zap, Target, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Sports & Dance | Mahdi Sellami',
  description: 'Staying active through sports and movement',
};

export default function SportsPage() {
  const activities = [
    'Running',
    'Swimming',
    'Cycling',
    'Dance',
    'Hiking',
    'Team Sports',
  ];

  const benefits = [
    {
      title: 'Discipline',
      icon: Target,
      description: 'Regular training builds consistent habits',
    },
    {
      title: 'Resilience',
      icon: Zap,
      description: 'Pushing limits and overcoming challenges',
    },
    {
      title: 'Teamwork',
      icon: Heart,
      description: 'Collaboration and collective goals',
    },
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
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-display font-bold text-sand-950">
                Sports & Dance
              </h1>
            </div>
            <p className="text-lg text-sand-600 max-w-3xl">
              Staying active keeps me energized, focused, and balanced.
              Whether through individual sports or team activities, movement is essential to my well-being and productivity.
            </p>
          </div>

          {/* Info Box */}
          <div className="mb-12 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-display font-bold text-sand-950">
                Content Coming Soon
              </h2>
            </div>
            <p className="text-sand-700">
              I'm gathering photos from various sports activities, competitions, and dance performances.
              Check back for updates!
            </p>
          </div>

          {/* Activities */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-6">
              Activities
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activities.map((activity) => (
                <div
                  key={activity}
                  className="p-4 bg-white rounded-xl border border-sand-200 text-center hover:border-yellow-300 transition-colors"
                >
                  <span className="font-semibold text-sand-900">{activity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-sand-950 mb-6">
              What Sports Teach
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="p-6 bg-white rounded-xl border-2 border-sand-200 hover:border-yellow-300 transition-colors"
                  >
                    <Icon className="w-10 h-10 text-yellow-600 mb-4" />
                    <h3 className="text-xl font-display font-bold text-sand-950 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sand-700 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Sports & Tech */}
          <section className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <h2 className="text-2xl font-display font-bold text-sand-950">
                Sports & Professional Life
              </h2>
            </div>
            <p className="text-sand-700 mb-4">
              My sports practice directly impacts my work effectiveness:
            </p>
            <ul className="space-y-3 text-sand-700">
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span>
                  <strong>Mental Clarity:</strong> Physical activity clears the mind, leading to better problem-solving
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span>
                  <strong>Discipline:</strong> Training routines build the consistency needed for long-term projects
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span>
                  <strong>Goal-Setting:</strong> Sports teach measurable progress, just like sprint planning in agile
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span>
                  <strong>Stress Management:</strong> Physical outlets prevent burnout during intense work periods
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span>
                  <strong>Team Dynamics:</strong> Playing team sports mirrors collaborative software development
                </span>
              </li>
            </ul>
          </section>

          {/* Philosophy */}
          <section className="p-8 bg-white rounded-2xl border-2 border-sand-200">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-terracotta-600 fill-terracotta-600" />
              <h2 className="text-2xl font-display font-bold text-sand-950">
                Balance is Key
              </h2>
            </div>
            <p className="text-sand-700">
              In a field as demanding as AI/ML engineering, physical activity isn't optional—it's essential.
              Sports keep me grounded, energized, and remind me that the best solutions often come when
              I step away from the screen and move my body.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
