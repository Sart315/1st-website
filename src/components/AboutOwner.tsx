import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, Instagram, Phone, Mail, MapPin, CheckCircle2, Award, Upload, Camera } from 'lucide-react';
import { SHOP_PHONE, SHOP_WHATSAPP_NUMBER, SHOP_INSTAGRAM_URL, SHOP_EMAIL, SHOP_ADDRESS } from '../utils/whatsapp';

const DEFAULT_AYUSH_PHOTO = '/src/assets/images/ayush_yadav_authentic_1791812284337.jpg';
const OWNER_STORAGE_KEY = 'gg_owner_photo_custom';

export const AboutOwner: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(OWNER_STORAGE_KEY) || DEFAULT_AYUSH_PHOTO;
    } catch {
      return DEFAULT_AYUSH_PHOTO;
    }
  });
  const [showUploader, setShowUploader] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        localStorage.setItem(OWNER_STORAGE_KEY, result);
        setShowUploader(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setPhotoUrl(DEFAULT_AYUSH_PHOTO);
    localStorage.removeItem(OWNER_STORAGE_KEY);
    setShowUploader(false);
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#03050a] via-[#080c16] to-[#04060c] relative overflow-hidden border-t border-white/[0.06]">
      {/* Luxury Ambient Golden Aura */}
      <div className="absolute top-1/2 right-12 w-[500px] h-[500px] bg-[#d4af37]/[0.05] rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-[#d4af37]/30 text-[#e5c378] text-xs font-semibold tracking-wider mb-3 backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Official Store Founder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            Meet the Person Behind Gadget Galaxy
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Honest testing, direct accountability, and genuine prices for every gadget lover in Shikohabad.
          </p>
        </div>

        {/* 2-Column Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          
          {/* Owner Authentic Portrait Column (5 cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#090e1c] aspect-[4/5] transition-all duration-500 hover:border-[#d4af37] hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]">
              <img
                src={photoUrl}
                alt="Ayush Yadav - Founder, Gadget Galaxy Shikohabad"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03050a] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                <span className="text-xs font-bold text-[#e5c378] uppercase tracking-wider">
                  Founder & Tech Specialist
                </span>
                <h3 className="text-2xl font-bold text-white font-display mt-0.5">
                  Ayush Yadav
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Gadget Galaxy · Near Narain Tiraha, Shikohabad
                </p>
              </div>

              {/* Upload / Switch Photo Trigger Button */}
              <button
                onClick={() => setShowUploader(!showUploader)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/90 text-slate-300 hover:text-[#e5c378] border border-white/10 backdrop-blur-md transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
                title="Change or upload original photo file"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="text-[11px]">Update Photo</span>
              </button>
            </div>

            {/* Photo Uploader Popover */}
            {showUploader && (
              <div className="mt-3 p-3.5 rounded-2xl bg-[#0a0f1d] border border-[#d4af37]/30 shadow-xl text-xs space-y-2 animate-fadeIn">
                <div className="font-semibold text-white">Select Owner Photo File:</div>
                <label className="block p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-center cursor-pointer transition-colors text-slate-300">
                  <Upload className="w-4 h-4 mx-auto mb-1 text-[#d4af37]" />
                  <span>Choose Photo File from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={handleResetPhoto}
                  className="w-full py-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Reset to Authentic Preset Photo
                </button>
              </div>
            )}

            {/* Floating Trust Stamp Badge */}
            <div className="absolute -bottom-4 -right-4 p-3.5 rounded-2xl bg-[#060a14]/95 border border-[#d4af37]/40 backdrop-blur-md shadow-2xl hidden sm:flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
              <div>
                <div className="text-xs font-bold text-white">100% In-Hand Inspection</div>
                <div className="text-[10px] text-slate-400">Personally tested by Ayush</div>
              </div>
            </div>
          </div>

          {/* Owner Story Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">
                “Premium tech without the premium markup — tested with complete transparency.”
              </h3>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                Welcome to <strong>Gadget Galaxy</strong>! I founded our showroom near Narain Tiraha, Shikohabad with a clear mission: to bring absolute honesty to the smartphone and laptop market.
              </p>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Too many customers get misled with replaced fake displays, degraded batteries, or unverified histories. At Gadget Galaxy, every single iPhone, Samsung, and MacBook is personally tested by me across our <strong>50-point diagnostic check</strong>. We sit down with you, open the device settings together, verify original battery health, check TrueTone, and hand you an authentic invoice and warranty.
              </p>
            </div>

            {/* 3 Core Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#d4af37]/30 transition-colors">
                <div className="text-[#e5c378] font-bold text-sm mb-1">01. Zero Secrets</div>
                <div className="text-xs text-slate-400">Accurate grading. If a phone has a microscopic mark, we disclose it upfront.</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#d4af37]/30 transition-colors">
                <div className="text-[#e5c378] font-bold text-sm mb-1">02. Fair Valuation</div>
                <div className="text-xs text-slate-400">Best rates across Shikohabad, Firozabad & Mainpuri.</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#d4af37]/30 transition-colors">
                <div className="text-[#e5c378] font-bold text-sm mb-1">03. Physical Lounge</div>
                <div className="text-xs text-slate-400">Sit in our showroom, test games & cameras in peace before deciding.</div>
              </div>
            </div>

            {/* Direct Connect Buttons with Ayush - Luxury Metallic Palette */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Ayush! I checked your Gadget Galaxy showroom website and would like to speak with you.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e5c378] via-[#d4af37] to-[#b88e28] text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[#d4af37]/20 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>Message Ayush on WhatsApp</span>
              </a>

              <a
                href={SHOP_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/10 hover:border-[#d4af37]/40 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
              >
                <Instagram className="w-4 h-4 text-[#e5c378]" />
                <span>@gadgetgalaxy_skb</span>
              </a>

              <a
                href={`tel:${SHOP_PHONE}`}
                className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/10 hover:border-[#d4af37]/40 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
              >
                <Phone className="w-4 h-4 text-[#e5c378]" />
                <span>+91 8218974370</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
