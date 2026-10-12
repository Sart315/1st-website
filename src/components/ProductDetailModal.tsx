import React from 'react';
import { Product } from '../types';
import { X, CheckCircle2, ShieldCheck, MessageCircle, Instagram, MapPin, Store } from 'lucide-react';
import { createWhatsAppProductInquiryUrl, SHOP_INSTAGRAM_URL, SHOP_MAPS_URL } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const inspectionChecklist = [
    { title: 'Display & Touch Digitizer', desc: 'Original panel, no dead pixels, TrueTone active', status: 'Passed' },
    { title: 'Battery Health & Charge Cycle', desc: product.batteryHealth || 'Original battery cell verified', status: 'Passed' },
    { title: 'Biometrics (Face ID / Fingerprint)', desc: 'Instant authentication response', status: 'Passed' },
    { title: 'Cameras & Image Stabilization', desc: 'Tested 0.5x, 1x, optical zoom and 4K recording', status: 'Passed' },
    { title: 'Microphone & Stereo Speakers', desc: 'Clear call audio and stereo balance', status: 'Passed' },
    { title: 'Network, 5G & Clean IMEI Check', desc: 'Indian carrier unlocked, non-blacklist verified', status: 'Passed' },
    { title: 'Physical Housing & Water Seals', desc: 'No structural bends, original frame verified', status: 'Passed' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl my-auto rounded-3xl bg-gradient-to-b from-[#0a0f1e] via-[#060913] to-[#03050a] border border-[#d4af37]/30 shadow-2xl p-5 sm:p-7 text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Image & Store Notice */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div className="relative rounded-2xl bg-[#03050a] overflow-hidden border border-white/10 aspect-square">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-xs font-semibold text-[#f3e5ab] border border-white/10">
                {product.condition}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-[#d4af37]/20 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#e5c378]">
                <Store className="w-4 h-4 shrink-0" />
                <span>Store Pickup Policy</span>
              </div>
              <p className="text-slate-400">
                <strong className="text-white">No Home Delivery:</strong> We kindly request all customers to visit our store near Narain Tiraha, Shikohabad to test the device in hand before purchase.
              </p>
            </div>
          </div>

          {/* Right Column: Specs & Inspection */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="text-xs text-[#e5c378] font-bold uppercase tracking-wider">
                {product.brand} · {product.category === 'mobiles' ? 'Smartphone' : 'Laptop'}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                {product.name}
              </h2>
              
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#f3e5ab] font-mono tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-500 line-through font-mono tabular-nums">
                    MRP: ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-semibold text-[#e5c378]">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Key Hardware Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-slate-400 block text-[11px]">Storage / RAM</span>
                <span className="text-slate-100 font-semibold">{product.storage} {product.ram ? `/ ${product.ram}` : ''}</span>
              </div>
              {product.processor && (
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-slate-400 block text-[11px]">Processor</span>
                  <span className="text-slate-100 font-semibold">{product.processor}</span>
                </div>
              )}
              {product.batteryHealth && (
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-slate-400 block text-[11px]">Battery Health</span>
                  <span className="text-slate-100 font-semibold">{product.batteryHealth}</span>
                </div>
              )}
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-slate-400 block text-[11px]">Warranty</span>
                <span className="text-slate-100 font-semibold">{product.warranty}</span>
              </div>
            </div>

            {/* Included in Box */}
            <div>
              <div className="text-xs font-bold text-slate-300 mb-1.5">What is Included in Box:</div>
              <div className="flex flex-wrap gap-1.5">
                {product.accessoriesIncluded.map((acc) => (
                  <span 
                    key={acc}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] text-slate-300 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#d4af37]" />
                    {acc}
                  </span>
                ))}
              </div>
            </div>

            {/* 50-Point Inspection Highlights */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#e5c378]">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>50-Point Inspection Report</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#f3e5ab] bg-white/[0.05] px-2 py-0.5 rounded border border-white/10">
                  Score: {product.inspectionScore || 50}/50
                </span>
              </div>

              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {inspectionChecklist.map((item) => (
                  <div key={item.title} className="flex items-start justify-between text-[11px] py-0.5 border-b border-white/[0.04]">
                    <div>
                      <span className="font-semibold text-slate-200">{item.title}</span>
                      <span className="text-slate-400 block text-[10px]">{item.desc}</span>
                    </div>
                    <span className="text-[#e5c378] font-semibold shrink-0 ml-2">✓ {item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={createWhatsAppProductInquiryUrl(product.name, product.price, product.condition)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#e5c378] via-[#d4af37] to-[#b88e28] hover:brightness-110 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#d4af37]/20 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>Discuss on WhatsApp</span>
              </a>

              <a
                href={SHOP_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-xs sm:text-sm border border-white/10 hover:border-[#d4af37]/40 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#e5c378]" />
                <span>DM on Instagram</span>
              </a>

              <a
                href={SHOP_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white font-medium text-xs sm:text-sm border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#e5c378]" />
                <span>Directions</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
