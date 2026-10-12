import React from 'react';
import { MessageCircle, Instagram, Phone, Navigation } from 'lucide-react';
import { SHOP_PHONE, SHOP_WHATSAPP_NUMBER, SHOP_INSTAGRAM_URL, SHOP_MAPS_URL } from '../utils/whatsapp';

export const VerticalContactDock: React.FC = () => {
  return (
    <aside 
      aria-label="Quick contact channels"
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-center gap-2.5"
    >
      {/* WhatsApp - Monochrome Black & White Circle */}
      <a
        href={`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Ayush! I am contacting Gadget Galaxy Shikohabad regarding available devices.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (+91 8218974370)"
        className="group relative w-12 h-12 rounded-full bg-black/90 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90"
      >
        <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="absolute right-14 px-2.5 py-1 rounded-lg bg-black/90 text-white text-[11px] font-semibold whitespace-nowrap border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          WhatsApp Chat
        </span>
      </a>

      {/* Instagram - Monochrome Black & White Circle */}
      <a
        href={SHOP_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram DM (@gadgetgalaxy_skb)"
        className="group relative w-12 h-12 rounded-full bg-black/90 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90"
      >
        <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="absolute right-14 px-2.5 py-1 rounded-lg bg-black/90 text-white text-[11px] font-semibold whitespace-nowrap border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Instagram DM
        </span>
      </a>

      {/* Direct Call - Monochrome Black & White Circle */}
      <a
        href={`tel:${SHOP_PHONE}`}
        aria-label="Direct Phone Call (8218974370)"
        className="group relative w-12 h-12 rounded-full bg-black/90 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white shadow-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90"
      >
        <Phone className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="absolute right-14 px-2.5 py-1 rounded-lg bg-black/90 text-white text-[11px] font-semibold whitespace-nowrap border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Call 8218974370
        </span>
      </a>

      {/* Map Directions - Monochrome Black & White Circle */}
      <a
        href={SHOP_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Directions to Narain Tiraha, Shikohabad"
        className="group relative w-10 h-10 rounded-full bg-black/80 hover:bg-white text-slate-300 hover:text-black border border-white/20 hover:border-white shadow-xl backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90"
      >
        <Navigation className="w-4 h-4 transition-transform group-hover:scale-110" />
        <span className="absolute right-12 px-2.5 py-1 rounded-lg bg-black/90 text-white text-[11px] font-semibold whitespace-nowrap border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Directions
        </span>
      </a>
    </aside>
  );
};
