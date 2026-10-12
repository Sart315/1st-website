import React from 'react';
import { Store, MessageCircle, Instagram, MapPin } from 'lucide-react';
import { SHOP_WHATSAPP_NUMBER, SHOP_INSTAGRAM_URL, SHOP_MAPS_URL } from '../utils/whatsapp';

export const DeliveryNoticeBar: React.FC = () => {
  return (
    <div className="bg-[#050811] border-y border-[#d4af37]/20 relative overflow-hidden">
      {/* Subtle Golden Hairline Glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-[#d4af37]/30 flex items-center justify-center shrink-0">
              <Store className="w-4 h-4 text-[#e5c378]" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#e5c378]">
                  Store Pickup Only
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#d4af37]" />
                <span className="text-[11px] font-medium text-slate-400">Near Narain Tiraha, Shikohabad</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                <strong className="text-white font-semibold">We currently do not provide home delivery.</strong> For product availability, pricing, pickup details or any purchase-related discussion, please contact us directly on WhatsApp or Instagram.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Ayush! I want to check available devices for store pickup at Gadget Galaxy Shikohabad.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#d4af37]/40 text-xs font-semibold transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#e5c378]" />
              <span>WhatsApp</span>
            </a>

            <a
              href={SHOP_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#d4af37]/40 text-xs font-semibold transition-all active:scale-[0.98]"
            >
              <Instagram className="w-3.5 h-3.5 text-[#e5c378]" />
              <span>@gadgetgalaxy_skb</span>
            </a>

            <a
              href={SHOP_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#e5c378]" />
              <span>Directions</span>
            </a>
          </div>

        </div>
      </div>
      
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
    </div>
  );
};
