import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Instagram, Mail, Clock, Store, Navigation, Send, Check } from 'lucide-react';
import { SHOP_PHONE, SHOP_PHONE_INTL, SHOP_WHATSAPP_NUMBER, SHOP_INSTAGRAM_URL, SHOP_INSTAGRAM_HANDLE, SHOP_EMAIL, SHOP_ADDRESS, SHOP_MAPS_URL } from '../utils/whatsapp';

export const StoreLocationContact: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryText, setInquiryText] = useState('');
  const [inquiryCategory, setInquiryCategory] = useState('Buy Smartphone');

  const showroomImg = '/src/assets/images/showroom_storefront_1791810543017.jpg';

  const handleSendCustomInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Ayush! My name is ${inquiryName || 'a customer'}.
Purpose: ${inquiryCategory}
Message: ${inquiryText || 'I would like to know available phones/laptops for store pickup at Narain Tiraha, Shikohabad.'}`;
    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#04060c] via-[#03050a] to-[#020306] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-[#d4af37]/30 text-[#e5c378] text-xs font-semibold tracking-wider mb-3">
            <Store className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Physical Showroom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            Find Us Near Narain Tiraha, Shikohabad
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Conveniently situated in Shikohabad. Reach out for stock checks, valuation, or walk in directly for a hands-on tech inspection.
          </p>
        </div>

        {/* 2-Column Split: Store Details & Fast WhatsApp Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Location Info & Quick Action Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Storefront Photo Card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 h-64 sm:h-72 shadow-2xl">
              <img
                src={showroomImg}
                alt="Gadget Galaxy modern showroom interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03050a] via-black/40 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-[#e5c378] uppercase tracking-wider">
                  Official Showroom
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                  Gadget Galaxy Shikohabad
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{SHOP_ADDRESS}</span>
                </p>
              </div>
            </div>

            {/* Crucial Store Pickup Notice Box */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[#d4af37]/30 text-xs sm:text-sm text-slate-200">
              <strong className="text-[#f3e5ab]">No Home Delivery Policy:</strong> We currently do not provide home delivery. For product availability, pricing, pickup details or any purchase-related discussion, please contact us directly on WhatsApp or Instagram.
            </div>

            {/* Contact Channels Grid - Smoked Titanium Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Ayush! I would like to visit Gadget Galaxy near Narain Tiraha, Shikohabad.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#d4af37]/40 text-slate-200 transition-all flex items-center gap-3 group active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5 text-[#e5c378]" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">WhatsApp Chat</div>
                  <div className="text-sm font-bold text-white">+91 8218974370</div>
                </div>
              </a>

              <a
                href={`tel:${SHOP_PHONE}`}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#d4af37]/40 text-slate-200 transition-all flex items-center gap-3 group active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-[#e5c378]" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Direct Phone Call</div>
                  <div className="text-sm font-bold text-white">8218974370</div>
                </div>
              </a>

              <a
                href={SHOP_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#d4af37]/40 text-slate-200 transition-all flex items-center gap-3 group active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5 text-[#e5c378]" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Instagram DM</div>
                  <div className="text-sm font-bold text-white">@{SHOP_INSTAGRAM_HANDLE}</div>
                </div>
              </a>

              <a
                href={`mailto:${SHOP_EMAIL}`}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#d4af37]/40 text-slate-200 transition-all flex items-center gap-3 group active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-[#e5c378]" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Email Address</div>
                  <div className="text-sm font-bold text-white truncate max-w-[170px]">{SHOP_EMAIL}</div>
                </div>
              </a>
            </div>

            {/* Operating Hours Card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#d4af37] shrink-0" />
                <div>
                  <span className="font-bold text-white block">Opening Hours</span>
                  <span className="text-slate-400 text-xs">Monday to Sunday · 10:00 AM – 9:00 PM</span>
                </div>
              </div>
              <a
                href={SHOP_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#e5c378] via-[#d4af37] to-[#b88e28] hover:brightness-110 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* Right Column: Direct Messaging & Inquiry Box (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#080d19] border border-white/10 p-6 sm:p-7 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-bold text-[#e5c378] uppercase tracking-wider">
                Direct Line to Ayush
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                Have a Question or Looking for a Specific Device?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Send your inquiry directly to our official WhatsApp. We answer promptly regarding in-store stock and timings.
              </p>

              <form onSubmit={handleSendCustomInquiry} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#03050a] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    What are you looking for?
                  </label>
                  <select
                    value={inquiryCategory}
                    onChange={(e) => setInquiryCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#03050a] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Buy Smartphone">Buy Smartphone (New / Refurbished / 2nd Hand)</option>
                    <option value="Buy Laptop">Buy Laptop / MacBook</option>
                    <option value="Sell or Exchange">Sell or Exchange My Old Device</option>
                    <option value="Device Repair">Device Repair & Diagnostics</option>
                    <option value="Store Timing">Store Directions & Timings</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Message / Specific Model Inquiry
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    placeholder="e.g. Is iPhone 13 128GB in Starlight available today? I want to visit the shop around 5 PM."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#03050a] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#e5c378] via-[#d4af37] to-[#b88e28] hover:brightness-110 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Send Directly on WhatsApp</span>
                </button>
              </form>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-slate-400">
              <Check className="w-3.5 h-3.5 text-[#e5c378] shrink-0" />
              <span>Direct personal response from Ayush Yadav</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
