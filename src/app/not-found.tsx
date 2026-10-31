import Link from 'next/link';
import { Aperture, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-ss-accent/10 border border-ss-accent/30 text-ss-accent flex items-center justify-center mb-6 animate-pulse">
        <Aperture className="w-10 h-10" />
      </div>

      <p className="text-xs font-mono uppercase tracking-widest text-ss-accent font-semibold mb-2">
        Error 404
      </p>

      <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-ss-text mb-4">
        Production Stage Not Found
      </h1>

      <p className="text-sm sm:text-base text-ss-muted max-w-md mx-auto mb-8 leading-relaxed">
        The studio space, shoot set, or production dispatch you are looking for has been struck from the schedule or relocated.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-control text-sm font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-colors shadow-sm flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
        <Link
          href="/studios"
          className="px-6 py-2.5 rounded-control text-sm font-semibold border border-ss-control-border text-ss-text hover:bg-ss-surface-raised transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Studios</span>
        </Link>
      </div>
    </div>
  );
}
