import React from 'react';
import { MessageCircle, Instagram, Phone, Mail, MapPin, SlidersHorizontal } from 'lucide-react';
import { SHOP_PHONE, SHOP_WHATSAPP_NUMBER, SHOP_INSTAGRAM_URL, SHOP_INSTAGRAM_HANDLE, SHOP_EMAIL, SHOP_ADDRESS, SHOP_MAPS_URL } from '../utils/whatsapp';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const logoImg = '/src/assets/images/gadget_galaxy_emblem_1791810529535.jpg';

  return (
    <footer className="bg-[#020306] text-slate-400 border-t border-white/[0.06] pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Gadget Galaxy Logo"
                className="w-10 h-10 rounded-full object-cover border border-[#d4af37]/40 shadow-sm"
              />
              <span className="text-xl font-bold text-white font-display tracking-tight">
                Gadget Galaxy
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Shikohabad's premium tech showroom for new, second-hand, and certified refurbished smartphones, MacBooks, laptops, and precision repair services. Founded by Ayush Yadav.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#e5c378] shrink-0" />
                <span>{SHOP_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#e5c378] shrink-0" />
                <span>+91 8218974370</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#e5c378] shrink-0" />
                <span>{SHOP_EMAIL}</span>
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore Store
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#devices" className="hover:text-[#e5c378] transition-colors">Smartphones</a></li>
              <li><a href="#devices" className="hover:text-[#e5c378] transition-colors">Laptops & MacBooks</a></li>
              <li><a href="#deals" className="hover:text-[#e5c378] transition-colors">Daily Deals</a></li>
              <li><a href="#sell-exchange" className="hover:text-[#e5c378] transition-colors">Sell & Exchange</a></li>
              <li><a href="#repair" className="hover:text-[#e5c378] transition-colors">Hardware Repairs</a></li>
              <li><a href="#about" className="hover:text-[#e5c378] transition-colors">About Ayush Yadav</a></li>
            </ul>
          </div>

          {/* Local SEO Keywords Block (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Shikohabad Services
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400">
              <span className="p-1 rounded bg-white/[0.03] border border-white/5">Second-hand mobiles Shikohabad</span>
              <span className="p-1 rounded bg-white/[0.03] border border-white/5">Used phones Shikohabad</span>
              <span className="p-1 rounded bg-white/[0.03] border border-white/5">Refurbished laptops Shikohabad</span>
              <span className="p-1 rounded bg-white/[0.03] border border-white/5">Mobile repair Shikohabad</span>
              <span className="p-1 rounded bg-white/[0.03] border border-white/5">iPhone Narain Tiraha</span>
              <span className="p-1 rounded bg-white/[0.03] border border-white/5">MacBook Shikohabad</span>
            </div>
          </div>

          {/* Owner Portal / Social (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Connect With Us
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href={`https://wa.me/${SHOP_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#e5c378] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#e5c378]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={SHOP_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#e5c378] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#e5c378]" />
                <span>@{SHOP_INSTAGRAM_HANDLE}</span>
              </a>

              <a
                href={SHOP_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#e5c378] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#e5c378]" />
                <span>Directions</span>
              </a>

              <button
                onClick={onOpenAdmin}
                className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#e5c378] transition-colors cursor-pointer text-left"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Shop Owner Login</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Gadget Galaxy · All rights reserved.
          </div>
          <div>
            Near Narain Tiraha, Shikohabad, Uttar Pradesh, India
          </div>
        </div>

      </div>
    </footer>
  );
};
