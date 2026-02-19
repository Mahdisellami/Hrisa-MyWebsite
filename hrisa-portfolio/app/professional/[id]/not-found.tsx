import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-sand-50">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-brand-500" />
        </div>
        <h1 className="text-4xl font-display font-bold text-sand-950 mb-4">
          Project Not Found
        </h1>
        <p className="text-lg text-sand-600 mb-8">
          The project you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          href="/professional"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
