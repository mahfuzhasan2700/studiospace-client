'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Aperture, User, Mail, Image as ImageIcon, Lock, Eye, EyeOff, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { signUp, signIn } from '@/lib/auth-client';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [photoUrl, setPhotoUrl] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  // Password validation rules check
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const isPasswordValid = hasUpperCase && hasLowerCase && hasMinLength;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name and email address.');
      toast.error('Name and email are required.');
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage('Password does not meet the security requirements.');
      toast.error('Please ensure your password has at least 6 characters, one uppercase letter, and one lowercase letter.');
      return;
    }

    setLoading(true);
    try {
      const defaultAvatar = photoUrl.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=B6422D&color=fff`;

      const res = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password: password,
        image: defaultAvatar
      });

      if (res?.error) {
        const msg = res.error.message || 'Registration failed. This email may already be in use.';
        setErrorMessage(msg);
        toast.error(msg);
        setLoading(false);
        return;
      }

      toast.success('Registration successful! Please log in with your credentials.');
      // Requirement: Redirect user to the Login page after successful registration
      router.push('/login');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please check network connection.';
      setErrorMessage(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/'
      });
    } catch (err) {
      toast.error('Google Sign-In failed to initialize');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-ss-bg">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-dialog overflow-hidden border border-ss-divider bg-ss-surface shadow-xl">
        {/* Left Form Column (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-control bg-ss-accent text-ss-on-accent flex items-center justify-center">
                <Aperture className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl text-ss-text">
                Studio<span className="text-ss-accent">Space</span>
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ss-text tracking-tight">
              Create Your Creator Account
            </h1>
            <p className="text-xs sm:text-sm text-ss-muted mt-1">
              Join thousands of filmmakers, photographers, and audio engineers booking studio hours.
            </p>
          </div>

          {/* Inline Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-control bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Social Sign-In Button (Google) */}
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 px-4 rounded-control border border-ss-control-border text-xs sm:text-sm font-semibold text-ss-text hover:bg-ss-surface-raised transition-colors flex items-center justify-center gap-2.5 shadow-sm focus:outline-none"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign up with Google</span>
            </button>

            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-ss-divider" />
              </div>
              <span className="relative px-3 bg-ss-surface text-[11px] uppercase tracking-wider text-ss-muted font-mono">
                Or register with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-3.5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ss-text block">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-ss-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mahfuz Hasan"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-control bg-ss-bg border border-ss-control-border text-xs sm:text-sm text-ss-text placeholder:text-ss-muted/50 focus:outline-none focus:ring-1 focus:ring-ss-accent"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ss-text block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ss-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@studiospace.io"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-control bg-ss-bg border border-ss-control-border text-xs sm:text-sm text-ss-text placeholder:text-ss-muted/50 focus:outline-none focus:ring-1 focus:ring-ss-accent"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ss-text block">
                Profile Photo URL <span className="text-ss-muted font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-ss-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-control bg-ss-bg border border-ss-control-border text-xs sm:text-sm text-ss-text placeholder:text-ss-muted/50 focus:outline-none focus:ring-1 focus:ring-ss-accent"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ss-text block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ss-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 rounded-control bg-ss-bg border border-ss-control-border text-xs sm:text-sm text-ss-text placeholder:text-ss-muted/50 focus:outline-none focus:ring-1 focus:ring-ss-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ss-muted hover:text-ss-text"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Live Password Validation Checklist */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px] font-medium">
                <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-600 dark:text-emerald-400' : 'text-ss-muted'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${hasMinLength ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-ss-divider'}`}>
                    {hasMinLength && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>Min 6 characters</span>
                </div>

                <div className={`flex items-center gap-1.5 ${hasUpperCase ? 'text-emerald-600 dark:text-emerald-400' : 'text-ss-muted'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${hasUpperCase ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-ss-divider'}`}>
                    {hasUpperCase && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>1 Uppercase (A-Z)</span>
                </div>

                <div className={`flex items-center gap-1.5 ${hasLowerCase ? 'text-emerald-600 dark:text-emerald-400' : 'text-ss-muted'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${hasLowerCase ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-ss-divider'}`}>
                    {hasLowerCase && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>1 Lowercase (a-z)</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isPasswordValid}
              className="w-full py-2.5 px-4 rounded-control text-xs sm:text-sm font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-colors shadow-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Link to Login */}
          <div className="text-center pt-1">
            <p className="text-xs text-ss-muted">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-ss-accent hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Photo Column (5 cols) */}
        <div className="hidden lg:block lg:col-span-5 relative bg-ss-surface-raised overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80"
            alt="Podcast lounge recording space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-300 font-semibold">
              Host Guarantee Included
            </p>
            <p className="font-heading font-bold text-xl leading-snug">
              &ldquo;Listing my photo cyclorama on StudioSpace paid off my studio lighting investment in under 4 months.&rdquo;
            </p>
            <p className="text-xs text-white/70">
              — Alex Rivera, Studio Owner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

