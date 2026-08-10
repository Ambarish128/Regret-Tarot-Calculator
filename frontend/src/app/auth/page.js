'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Eye, EyeOff, Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        await register(formData.name, formData.email, formData.password);
        // New users go directly to the onboarding questionnaire
        router.push('/onboarding');
      } else {
        await login(formData.email, formData.password);
        // Existing users go directly to the home landing page
        router.push('/');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A090D] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mystical Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8B0000]/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#7C3AED]/40 bg-[#7C3AED]/10 shadow-glow-purple mb-4">
            <Sparkles className="w-4 h-4 text-[#00F0FF] fill-[#00F0FF] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#E2E8F0] font-semibold">Sanctum Entry</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            {mode === 'login' ? 'Re-enter the Void' : 'Begin Your Initiate Journey'}
          </h1>
          <p className="text-sm text-[#E2E8F0]/60 mt-2">
            {mode === 'login' 
              ? 'Provide your credentials to access saved readings and grimoires.' 
              : 'Join the covenant to reveal your natal charts and personalized spread analysis.'}
          </p>
        </div>

        {/* Auth Card Container */}
        <div className="bg-[#0A090D]/80 backdrop-blur-xl border border-[#7C3AED]/30 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(124,58,237,0.15)] relative">
          
          {/* Mode Switcher Buttons */}
          <div className="grid grid-cols-2 p-1 bg-[#0A090D] rounded-xl border border-[#7C3AED]/20 mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                mode === 'login'
                  ? 'bg-[#7C3AED]/20 text-white border border-[#7C3AED]/60 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                  : 'text-[#E2E8F0]/60 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); }}
              className={`py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                mode === 'signup'
                  ? 'bg-[#8B0000]/30 text-white border border-[#8B0000]/80 shadow-glow-red'
                  : 'text-[#E2E8F0]/60 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-[#8B0000]/20 border border-[#8B0000] text-[#FF6B6B] text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Form Element */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Sign Up Name Field */}
            {mode === 'signup' && (
              <div className="space-y-1.5 animate-in fade-in duration-300">
                <label className="text-xs font-medium text-[#E2E8F0]/80 tracking-wider uppercase">Initiate Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7C3AED] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Morgana Raven"
                    className="w-full bg-[#0A090D] border border-[#7C3AED]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#E2E8F0]/30 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#E2E8F0]/80 tracking-wider uppercase">Astral Address (Email)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7C3AED] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seeker@orakle.realm"
                  className="w-full bg-[#0A090D] border border-[#7C3AED]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#E2E8F0]/30 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-[#E2E8F0]/80 tracking-wider uppercase">Cipher Word (Password)</label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7C3AED] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0A090D] border border-[#7C3AED]/30 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-[#E2E8F0]/30 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#E2E8F0]/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Form Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 mt-6 shadow-lg disabled:opacity-50 ${
                mode === 'signup'
                  ? 'bg-[#8B0000] hover:bg-[#8B0000]/80 border border-[#8B0000] shadow-glow-red hover:scale-[1.01]'
                  : 'bg-[#7C3AED] hover:bg-[#7C3AED]/80 border border-[#7C3AED] shadow-glow-purple hover:scale-[1.01]'
              }`}
            >
              <span>
                {isSubmitting
                  ? 'Invoking Realm...'
                  : mode === 'login'
                  ? 'Enter Sanctuary'
                  : 'Proceed to Onboarding Quiz'}
              </span>
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Bottom Switcher CTA */}
          <div className="mt-6 pt-4 border-t border-[#7C3AED]/20 text-center text-xs text-[#E2E8F0]/60">
            {mode === 'login' ? (
              <p>
                First time seeking answers?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(''); }}
                  className="text-[#8B0000] font-semibold hover:underline ml-1"
                >
                  Create a Covenant
                </button>
              </p>
            ) : (
              <p>
                Already initiated?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-[#7C3AED] font-semibold hover:underline ml-1"
                >
                  Sign In Here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}