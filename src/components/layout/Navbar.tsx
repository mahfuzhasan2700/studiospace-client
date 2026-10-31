'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Aperture, Menu, X as CloseIcon, PlusCircle, LayoutDashboard, Film, CalendarCheck, LogOut, User, Heart } from 'lucide-react';

import { ThemeToggle } from './ThemeToggle';
import { useSession, signOut } from '@/lib/auth-client';
import { toast } from 'sonner';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Studios', href: '/studios' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About Us', href: '/about' },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/session/logout', { method: 'POST' });
      await signOut();
      toast.success('Successfully logged out');
      router.push('/');
      router.refresh();
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ss-divider bg-ss-bg/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: StudioSpace Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="w-10 h-10 rounded-control bg-ss-accent text-ss-on-accent flex items-center justify-center shadow-sm group-hover:bg-ss-accent-hover transition-colors">
            <Aperture className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-tight text-ss-text">
              Studio<span className="text-ss-accent">Space</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-ss-muted -mt-1 hidden sm:block">
              Creator Studios
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-control text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-ss-accent font-semibold bg-ss-surface-raised/70'
                    : 'text-ss-text/80 hover:text-ss-text hover:bg-ss-surface-raised/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions, Theme Toggle & Account Menu */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Authentication State */}
          {!isPending && (
            <>
              {user ? (
                /* Authenticated State Dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="relative flex items-center gap-2.5 p-1 rounded-full hover:ring-2 hover:ring-ss-accent/40 focus:outline-none transition-all group"
                    aria-expanded={dropdownOpen}
                    aria-label="User account menu"
                  >
                    <div className="relative">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || 'User avatar'}
                          className="w-9 h-9 rounded-full object-cover border border-ss-control-border"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-ss-accent/15 text-ss-accent font-semibold flex items-center justify-center border border-ss-accent/30 text-sm">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-ss-surface animate-pulse" />
                    </div>
                    <span className="text-sm font-medium text-ss-text hidden lg:inline-block max-w-[120px] truncate group-hover:text-ss-accent transition-colors">
                      {user.name?.split(' ')[0]}
                    </span>
                  </button>


                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-dialog bg-ss-surface border border-ss-divider shadow-xl py-2 z-50 text-ss-text animate-in fade-in-80 duration-150">
                      <div className="px-4 py-2.5 border-b border-ss-divider">
                        <p className="text-xs uppercase font-mono tracking-wider text-ss-muted">Signed in as</p>
                        <p className="font-semibold text-sm truncate text-ss-text">{user.name}</p>
                        <p className="text-xs text-ss-muted truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-ss-surface-raised transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4 text-ss-muted" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/add-studio"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-ss-surface-raised transition-colors text-ss-accent font-medium"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <PlusCircle className="w-4 h-4 text-ss-accent" />
                          <span>Add New Studio</span>
                        </Link>
                        <Link
                          href="/my-listings"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-ss-surface-raised transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Film className="w-4 h-4 text-ss-muted" />
                          <span>My Studio Listings</span>
                        </Link>
                        <Link
                          href="/my-bookings"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-ss-surface-raised transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <CalendarCheck className="w-4 h-4 text-ss-muted" />
                          <span>My Bookings</span>
                        </Link>
                        <Link
                          href="/saved"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-ss-surface-raised transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Heart className="w-4 h-4 text-red-500" />
                          <span>Saved Wishlist</span>
                        </Link>
                      </div>


                      <div className="border-t border-ss-divider pt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-left transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Unauthenticated State: Login & Register */
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-ss-text hover:bg-ss-surface-raised rounded-control transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover rounded-control transition-colors shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-control text-ss-text hover:bg-ss-surface-raised transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-ss-divider bg-ss-surface px-4 py-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-control text-base font-medium ${
                    isActive
                      ? 'bg-ss-accent/10 text-ss-accent font-semibold'
                      : 'text-ss-text hover:bg-ss-surface-raised'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {user ? (
            <div className="pt-3 border-t border-ss-divider flex flex-col gap-1">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-control text-sm font-medium hover:bg-ss-surface-raised flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-ss-muted" /> Dashboard
              </Link>
              <Link
                href="/add-studio"
                className="px-3 py-2 rounded-control text-sm font-medium text-ss-accent hover:bg-ss-surface-raised flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> Add Studio
              </Link>
              <Link
                href="/my-listings"
                className="px-3 py-2 rounded-control text-sm font-medium hover:bg-ss-surface-raised flex items-center gap-2"
              >
                <Film className="w-4 h-4 text-ss-muted" /> My Listings
              </Link>
              <Link
                href="/my-bookings"
                className="px-3 py-2 rounded-control text-sm font-medium hover:bg-ss-surface-raised flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-ss-muted" /> My Bookings
              </Link>
              <Link
                href="/saved"
                className="px-3 py-2 rounded-control text-sm font-medium hover:bg-ss-surface-raised flex items-center gap-2 text-red-500"
              >
                <Heart className="w-4 h-4" /> Saved Wishlist
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 text-left px-3 py-2 rounded-control text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-ss-divider flex flex-col gap-2">
              <Link
                href="/login"
                className="w-full text-center py-2.5 rounded-control text-sm font-medium border border-ss-control-border text-ss-text hover:bg-ss-surface-raised transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="w-full text-center py-2.5 rounded-control text-sm font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-colors shadow-sm"
              >
                Register
              </Link>
            </div>
          )}

        </div>
      )}
    </header>
  );
}

