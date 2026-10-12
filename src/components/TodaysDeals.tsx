import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Clock, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { createWhatsAppProductInquiryUrl } from '../utils/whatsapp';

interface TodaysDealsProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

export const TodaysDeals: React.FC<TodaysDealsProps> = ({ products, onOpenDetails }) => {
  const deals = products.filter((p) => p.isTodayDeal && p.inStock);

  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 7,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const closing = new Date();
      closing.setHours(21, 0, 0, 0); // 9 PM closing
      const diff = Math.max(0, closing.getTime() - now.getTime());

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (deals.length === 0) return null;

  return (
    <section id="deals" className="py-20 bg-gradient-to-b from-[#060913] via-[#04060c] to-[#03050a] border-y border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-[#d4af37]/30 text-[#e5c378] text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Today's Handpicked Stock</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Curated Daily Deals
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Inspected flagship smartphones and laptops with verified battery and display health.
            </p>
          </div>

          {/* Daily Store Counter */}
          <div className="flex items-center gap-3 p-3 px-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <Clock className="w-4 h-4 text-[#e5c378] shrink-0" />
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Store Open Today Until 9 PM</span>
              <div className="font-mono font-bold text-[#f3e5ab] text-sm tabular-nums mt-0.5">
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </div>
            </div>
          </div>
        </div>

        {/* Featured Deal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.slice(0, 3).map((item) => {
            const savings = item.originalPrice - item.price;
            return (
              <div
                key={item.id}
                className="rounded-3xl bg-gradient-to-b from-[#090e1c] to-[#040710] border border-white/10 hover:border-[#d4af37]/50 p-5 flex flex-col justify-between hover:shadow-[0_20px_45px_rgba(212,175,55,0.1)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#e5c378]">
                      {item.dealDiscountNote || "Today's Offer"}
                    </span>
                    <span className="text-xs font-medium text-slate-300">
                      Save ₹{savings.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Image with zoom */}
                  <div 
                    onClick={() => onOpenDetails(item)}
                    className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#020408] mb-4 cursor-pointer border border-white/5 group-hover:border-[#d4af37]/20 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-semibold text-[#f3e5ab] border border-white/10">
                      {item.condition}
                    </div>
                  </div>

                  {/* Device Name */}
                  <h3 
                    onClick={() => onOpenDetails(item)}
                    className="text-lg font-bold text-white group-hover:text-[#f3e5ab] transition-colors cursor-pointer font-display"
                  >
                    {item.name}
                  </h3>

                  {/* Specs */}
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                    <span>{item.storage}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{item.warranty}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="mt-5 pt-3 border-t border-white/[0.06]">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Galaxy Price</div>
                      <div className="text-2xl font-extrabold text-[#f3e5ab] font-mono tabular-nums">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 line-through font-mono tabular-nums">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-[#e5c378] font-medium">
                        Store Pickup
                      </div>
                    </div>
                  </div>

                  <a
                    href={createWhatsAppProductInquiryUrl(item.name, item.price, item.condition)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#e5c378] via-[#d4af37] to-[#b88e28] hover:brightness-110 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#d4af37]/15 transition-all active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 text-slate-950" />
                    <span>Inquire Deal on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
