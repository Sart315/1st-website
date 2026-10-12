import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { SHOP_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoImg = '/src/assets/images/gadget_galaxy_emblem_1791810529535.jpg';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050812]/92 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark with Official Illuminated Circular Emblem */}
          <a href="#" className="flex items-center gap-3 whitespace-nowrap shrink-0 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-blue-400/40 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform bg-[#050811]">
              <img
                src={logoImg}
                alt="Gadget Galaxy Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display">
                Gadget Galaxy
              </span>
            </div>
          </a>

          {/* Zone 2: 4–5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <a href="#devices" className="hover:text-blue-300 transition-colors whitespace-nowrap shrink-0">
              Mobiles
            </a>
            <a href="#devices" className="hover:text-blue-300 transition-colors whitespace-nowrap shrink-0">
              Laptops
            </a>
            <a href="#deals" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 text-amber-300">
              Daily Deals
            </a>
            <a href="#sell-exchange" className="hover:text-blue-300 transition-colors whitespace-nowrap shrink-0">
              Sell & Exchange
            </a>
            <a href="#repair" className="hover:text-blue-300 transition-colors whitespace-nowrap shrink-0">
              Repair Lab
            </a>
            <a href="#about" className="hover:text-blue-300 transition-colors whitespace-nowrap shrink-0">
              Meet Ayush
            </a>
            <a href="#contact" className="hover:text-blue-300 transition-colors whitespace-nowrap shrink-0">
              Store & Map
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
              title="Shop Inventory Portal"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-300" />
              <span>Stock Portal</span>
            </button>

            <a
              href={`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Ayush! I want to check current mobile & laptop availability at Gadget Galaxy Shikohabad.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 rounded-xl transition-all shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>Discuss on WhatsApp</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050811]/98 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-2xl">
          <nav className="flex flex-col space-y-3 text-base font-semibold text-slate-200">
            <a
              href="#devices"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e5c378] transition-colors"
            >
              Mobiles & Laptops
            </a>
            <a
              href="#deals"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#e5c378] hover:text-[#f3e5ab] transition-colors"
            >
              Today's Steals & Offers
            </a>
            <a
              href="#sell-exchange"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e5c378] transition-colors"
            >
              Sell or Exchange Device
            </a>
            <a
              href="#repair"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e5c378] transition-colors"
            >
              Certified Hardware Repair
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e5c378] transition-colors"
            >
              Meet Ayush Yadav
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#e5c378] transition-colors"
            >
              Visit Store & Directions
            </a>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#e5c378]" />
              <span>Owner Inventory Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
