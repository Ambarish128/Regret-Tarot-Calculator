'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, Compass, BookOpen, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  const handleProtectedNavigation = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (!isAuthenticated) {
      router.push(`/auth?redirectTo=${encodeURIComponent(href)}`);
    } else {
      router.push(href);
    }
  };

  const navLinks = [
    { 
      name: 'Divination', 
      href: '/calculator', 
      icon: Compass,
      glowHover: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-[#F59E0B]/60 hover:bg-[#F59E0B]/15',
      activeState: 'bg-[#F59E0B]/20 border-[#F59E0B] text-white shadow-[0_0_20px_rgba(245,158,11,0.4)]',
      activeIcon: 'text-[#F59E0B]'
    },
    { 
      name: 'Grimoire', 
      href: '/history', 
      icon: BookOpen,
      glowHover: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:border-[#10B981]/60 hover:bg-[#10B981]/15',
      activeState: 'bg-[#10B981]/20 border-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]',
      activeIcon: 'text-[#10B981]'
    },
  ];

  const getLogoTheme = () => {
    switch (pathname) {
      case '/calculator':
      case '/divination':
        return {
          container: 'bg-[#F59E0B]/15 border-[#F59E0B]/60 shadow-[0_0_25px_rgba(245,158,11,0.45)]',
          starColor: 'text-[#A855F7] fill-[#A855F7] drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]'
        };
      case '/history':
      case '/grimoire':
        return {
          container: 'bg-[#10B981]/15 border-[#10B981]/60 shadow-[0_0_25px_rgba(16,185,129,0.45)]',
          starColor: 'text-[#F43F5E] fill-[#F43F5E] drop-shadow-[0_0_10px_rgba(244,63,94,0.9)]'
        };
      default:
        return {
          container: 'bg-[#7C3AED]/10 border-[#7C3AED]/40 shadow-glow-purple',
          starColor: 'text-[#00F0FF] fill-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.9)]'
        };
    }
  };

  const logoTheme = getLogoTheme();

  return (
    <header className="sticky top-0 z-50 bg-[#0A090D]/90 backdrop-blur-md border-b border-[#7C3AED]/20 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className={`group flex items-center gap-2.5 text-white px-3.5 py-1.5 rounded-xl border animate-pulse transition-all duration-500 ${logoTheme.container}`}
        >
          <Sparkles className={`w-5 h-5 transition-transform duration-300 group-hover:scale-125 ${logoTheme.starColor}`} />
          <span className="font-bold tracking-wider text-lg text-[#E2E8F0]">Regret Orakle</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleProtectedNavigation(e, link.href)}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? link.activeState 
                    : `border-transparent text-[#E2E8F0]/80 ${link.glowHover}`
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? link.activeIcon : 'text-[#E2E8F0]/60 group-hover:text-[#E2E8F0]'
                }`} />
                <span className={isActive ? 'text-white font-semibold' : 'group-hover:text-white'}>
                  {link.name}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Desktop Auth State Toggle */}
        <div className="hidden md:flex items-center">
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-[#1A1722] hover:bg-[#2A2634] text-white font-semibold text-sm px-4 py-2 rounded-xl border border-[#2A2634] transition-all duration-300 cursor-pointer hover:border-[#FF4D4D]/50"
                >
                  <LogOut className="w-4 h-4 text-[#FF4D4D]" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link 
                  href="/auth"
                  className="flex items-center gap-2 bg-[#8B0000] text-white font-semibold text-sm px-4 py-2 rounded-xl border border-[#8B0000] shadow-glow-red transition-all duration-300 hover:bg-[#8B0000]/80 hover:shadow-occult hover:scale-[1.02]"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Sign Up</span>
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden bg-[#0A090D] p-2 rounded-xl border border-[#7C3AED]/40 text-[#E2E8F0] shadow-glow-purple transition-all duration-300 active:scale-95"
        >
          {isOpen ? <X className="w-6 h-6 text-[#8B0000]" /> : <Menu className="w-6 h-6 text-[#7C3AED]" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#7C3AED]/20 bg-[#0A090D]/95 backdrop-blur-lg flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-300 ease-out">
          {navLinks.map((link, idx) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleProtectedNavigation(e, link.href)}
                style={{ animationDelay: `${idx * 75}ms` }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border font-medium transition-all duration-300 animate-in fade-in slide-in-from-left-3 fill-mode-backwards cursor-pointer ${
                  isActive 
                    ? link.activeState 
                    : `border-[#7C3AED]/10 bg-[#0A090D] text-[#E2E8F0] ${link.glowHover}`
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? link.activeIcon : 'text-[#7C3AED]'}`} />
                <span>{link.name}</span>
              </a>
            );
          })}

          {/* Mobile Auth Button */}
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-[#1A1722] text-white font-semibold px-4 py-2.5 rounded-xl border border-[#2A2634] mt-2 transition-all duration-300 active:scale-95"
                >
                  <LogOut className="w-4 h-4 text-[#FF4D4D]" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link 
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-[#8B0000] text-white font-semibold px-4 py-2.5 rounded-xl border border-[#8B0000] shadow-glow-red mt-2 transition-all duration-300 active:scale-95"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Sign Up</span>
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
}