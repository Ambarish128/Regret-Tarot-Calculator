'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Compass, History, BookOpen, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { 
      name: 'Divination', 
      href: '/divination', 
      icon: Compass,
      glowHover: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:border-[#F59E0B]/60 hover:bg-[#F59E0B]/15',
      activeState: 'bg-[#F59E0B]/20 border-[#F59E0B] text-white shadow-[0_0_20px_rgba(245,158,11,0.4)]',
      activeIcon: 'text-[#F59E0B]'
    },
    { 
      name: 'Readings', 
      href: '/readings', 
      icon: History,
      glowHover: 'hover:shadow-glow-red hover:border-[#8B0000]/60 hover:bg-[#8B0000]/15',
      activeState: 'bg-[#8B0000]/25 border-[#8B0000] text-white shadow-glow-red',
      activeIcon: 'text-[#FF6B6B]'
    },
    { 
      name: 'Grimoire', 
      href: '/grimoire', 
      icon: BookOpen,
      glowHover: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:border-[#10B981]/60 hover:bg-[#10B981]/15',
      activeState: 'bg-[#10B981]/20 border-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]',
      activeIcon: 'text-[#10B981]'
    },
  ];

  // Dynamic Theme Palette Engine for Logo
  const getLogoTheme = () => {
    switch (pathname) {
      case '/divination':
        return {
          container: 'bg-[#F59E0B]/15 border-[#F59E0B]/60 shadow-[0_0_25px_rgba(245,158,11,0.45)]',
          starColor: 'text-[#FFD700] fill-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]'
        };
      case '/readings':
        return {
          container: 'bg-[#8B0000]/20 border-[#8B0000]/70 shadow-glow-red',
          starColor: 'text-[#FF2A2A] fill-[#FF2A2A] drop-shadow-[0_0_8px_rgba(255,42,42,0.8)]'
        };
      case '/grimoire':
        return {
          container: 'bg-[#10B981]/15 border-[#10B981]/60 shadow-[0_0_25px_rgba(16,185,129,0.45)]',
          starColor: 'text-[#34D399] fill-[#34D399] drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]'
        };
      default:
        return {
          container: 'bg-[#7C3AED]/10 border-[#7C3AED]/40 shadow-glow-purple',
          starColor: 'text-[#FF4D4D] fill-[#FF4D4D] drop-shadow-[0_0_8px_rgba(255,77,77,0.8)]'
        };
    }
  };

  const logoTheme = getLogoTheme();

  return (
    <header className="sticky top-0 z-50 bg-[#0A090D]/90 backdrop-blur-md border-b border-[#7C3AED]/20 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo - Fully Synced Pulsing Star & Container Aura */}
        <Link 
          href="/" 
          className={`group flex items-center gap-2.5 text-white px-3.5 py-1.5 rounded-xl border animate-pulse transition-all duration-500 ${logoTheme.container}`}
        >
          <Sparkles className={`w-5 h-5 transition-transform duration-300 group-hover:scale-125 ${logoTheme.starColor}`} />
          <span className="font-bold tracking-wider text-lg text-[#E2E8F0]">Orakle</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-all duration-300 ${
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
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth CTA */}
        <div className="hidden md:flex items-center">
          <Link 
            href="/auth"
            className="flex items-center gap-2 bg-[#8B0000] text-white font-semibold text-sm px-4 py-2 rounded-xl border border-[#8B0000] shadow-glow-red transition-all duration-300 hover:bg-[#8B0000]/80 hover:shadow-occult hover:scale-[1.02]"
          >
            <User className="w-4 h-4" />
            <span>Sign In / Sign Up</span>
          </Link>
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
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${idx * 75}ms` }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border font-medium transition-all duration-300 animate-in fade-in slide-in-from-left-3 fill-mode-backwards ${
                  isActive 
                    ? link.activeState 
                    : `border-[#7C3AED]/10 bg-[#0A090D] text-[#E2E8F0] ${link.glowHover}`
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? link.activeIcon : 'text-[#7C3AED]'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <Link 
            href="/auth"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-[#8B0000] text-white font-semibold px-4 py-2.5 rounded-xl border border-[#8B0000] shadow-glow-red mt-2 transition-all duration-300 active:scale-95"
          >
            <User className="w-4 h-4" />
            <span>Sign In / Sign Up</span>
          </Link>
        </div>
      )}
    </header>
  );
}