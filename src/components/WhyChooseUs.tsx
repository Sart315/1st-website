import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Zap, HeartHandshake, Eye, FileText, BadgePercent } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#d4af37]" />,
      title: '50-Point Rigorous Hardware Audit',
      description: 'Every phone and laptop passes camera sensor checks, thermal tests, battery cycle verification, screen pressure analysis, and motherboard current draw inspection.',
    },
    {
      icon: <Eye className="w-6 h-6 text-[#d4af37]" />,
      title: 'Hands-On Store Inspection Before Payment',
      description: 'No blind courier shipments. Sit in our showroom, check TrueTone, plug in chargers, test games, take sample photos, and verify IMEI status before paying a single rupee.',
    },
    {
      icon: <FileText className="w-6 h-6 text-[#d4af37]" />,
      title: 'Official Store Bill & In-House Warranty',
      description: 'Complete peace of mind. We provide valid printed invoices and up to 6 months of in-store warranty backing on certified refurbished models.',
    },
    {
      icon: <BadgePercent className="w-6 h-6 text-[#d4af37]" />,
      title: 'Unmatched Prices Across Shikohabad & Firozabad',
      description: 'By maintaining direct procurement networks and keeping overhead low, we pass maximum savings directly to our local patrons.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#d4af37]" />,
      title: 'Same-Day Fast Diagnostics & Repairs',
      description: 'Screen replacements, original batteries, and chip-level micro-soldering completed on the spot using high-grade ESD-safe lab tooling.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#d4af37]" />,
      title: 'Transparent Buyback & Instant Cash Exchange',
      description: 'Upgrading your old device? Get immediate fair market valuation with zero deduction gimmicks and instant payment.',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#03050a] via-[#060913] to-[#04060c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-[#d4af37]/30 text-[#e5c378] text-xs font-semibold tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>The Gadget Galaxy Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            Why Tech Lovers in Shikohabad Choose Us
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            A genuine physical showroom where certified quality, warranty, and human trust always come first.
          </p>
        </div>

        {/* 6 Grid Cards with subtle float hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-[#d4af37]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_16px_40px_rgba(212,175,55,0.06)]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Guaranteed Standard #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
