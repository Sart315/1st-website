import React, { useState } from 'react';
import { Product } from '../types';
import { MessageCircle, ShieldCheck, Check } from 'lucide-react';
import { createWhatsAppProductInquiryUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [imgError, setImgError] = useState(false);

  // Mouse tilt for desktop only
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 5;
    const rotY = ((x - centerX) / centerX) * 5;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const savings = Math.max(0, product.originalPrice - product.price);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease'
      }}
      className="group relative rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#0c1222] via-[#090d18] to-[#060810] border border-white/10 hover:border-blue-400/40 p-2.5 sm:p-4 flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 h-full"
    >
      {/* Top micro-bar: Brand & Stock Status */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 truncate">
          {product.brand}
        </span>

        {product.inStock ? (
          <span className="text-[9px] sm:text-[11px] text-emerald-400 font-medium flex items-center gap-0.5 shrink-0">
            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
            <span className="hidden sm:inline">In Stock</span>
            <span className="sm:hidden">Ready</span>
          </span>
        ) : (
          <span className="text-[9px] sm:text-[11px] text-slate-400 font-medium shrink-0">
            Reserved
          </span>
        )}
      </div>

      {/* Product Image Stage */}
      <div 
        onClick={() => onOpenDetails(product)}
        className="relative w-full h-32 sm:h-48 rounded-lg sm:rounded-xl bg-[#03060f] overflow-hidden cursor-pointer flex items-center justify-center border border-white/5 group-hover:border-blue-400/20 transition-all"
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-2 bg-gradient-to-br from-[#080d1a] to-[#04060d] text-center">
            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400/80 mb-1" />
            <span className="text-[10px] sm:text-xs font-semibold text-slate-200 line-clamp-1">{product.name}</span>
          </div>
        )}

        {/* Condition label on bottom-left */}
        <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded bg-black/85 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-semibold text-amber-300 truncate max-w-[85%]">
          {product.condition}
        </div>

        {product.dealDiscountNote && (
          <div className="hidden sm:block absolute top-2 right-2 px-1.5 py-0.5 rounded bg-blue-600/90 text-white text-[9px] font-bold uppercase tracking-wider">
            Deal
          </div>
        )}
      </div>

      {/* Details & Specs Area */}
      <div className="mt-2.5 sm:mt-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Storage & Spec line */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 truncate">
            <span className="font-medium text-slate-300">{product.storage}</span>
            {product.ram && (
              <>
                <span className="text-slate-600">·</span>
                <span className="hidden sm:inline">{product.ram}</span>
              </>
            )}
            {product.batteryHealth && (
              <>
                <span className="text-slate-600">·</span>
                <span className="truncate">{product.batteryHealth.split(' ')[0]}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetails(product)}
            className="mt-1 text-xs sm:text-base font-bold text-white group-hover:text-blue-200 transition-colors line-clamp-2 cursor-pointer font-display tracking-tight leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing Block */}
        <div className="mt-2.5 pt-2 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">Galaxy Price</div>
              <div className="text-sm sm:text-xl font-extrabold text-amber-300 font-mono tabular-nums leading-tight">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
            </div>

            {product.originalPrice > product.price && (
              <div className="sm:text-right">
                <div className="text-[9px] text-slate-500 line-through font-mono tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </div>
                {savings > 0 && (
                  <div className="text-[9px] text-emerald-400 font-semibold hidden sm:block">
                    Save ₹{savings.toLocaleString('en-IN')}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons for 2-column mobile */}
        <div className="mt-2.5 space-y-1.5">
          <a
            href={createWhatsAppProductInquiryUrl(product.name, product.price, product.condition)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 sm:py-2.5 px-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 text-slate-950 shrink-0" />
            <span className="truncate">Discuss on WhatsApp</span>
          </a>

          <button
            onClick={() => onOpenDetails(product)}
            className="w-full py-1 sm:py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-[10px] sm:text-xs font-medium border border-white/10 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            <span>50-Pt Report</span>
          </button>
        </div>

      </div>
    </div>
  );
};
