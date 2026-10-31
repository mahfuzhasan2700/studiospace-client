'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle color theme"
      className="p-2 rounded-control border border-ss-divider hover:bg-ss-surface-raised text-ss-text transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ss-focus"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
    >
      {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-ss-muted" />}
    </button>
  );
}

