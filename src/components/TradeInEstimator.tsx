import React, { useState } from 'react';
import { ArrowLeftRight, Check, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { createWhatsAppTradeInUrl } from '../utils/whatsapp';

export const TradeInEstimator: React.FC = () => {
  const [deviceCategory, setDeviceCategory] = useState<'iphone' | 'android' | 'macbook' | 'laptop'>('iphone');
  const [model, setModel] = useState<string>('iPhone 13 (128GB)');
  const [condition, setCondition] = useState<'flawless' | 'good' | 'minor-scratches' | 'cracked'>('good');
  const [hasBoxAndBill, setHasBoxAndBill] = useState<boolean>(true);
  const [hasCharger, setHasCharger] = useState<boolean>(true);

  const calculateEstimate = () => {
    let base = 25000;
    if (deviceCategory === 'iphone') {
      if (model.includes('15 Pro')) base = 58000;
      else if (model.includes('14')) base = 36000;
      else if (model.includes('13')) base = 27000;
      else if (model.includes('12')) base = 19000;
      else if (model.includes('11')) base = 13500;
    } else if (deviceCategory === 'android') {
      if (model.includes('S23 Ultra') || model.includes('S24')) base = 48000;
      else if (model.includes('OnePlus 11') || model.includes('12')) base = 26000;
      else if (model.includes('Pixel')) base = 24000;
      else base = 12000;
    } else if (deviceCategory === 'macbook') {
      if (model.includes('M2') || model.includes('M3')) base = 54000;
      else if (model.includes('M1')) base = 38000;
      else base = 22000;
    } else {
      if (model.includes('Gaming i7')) base = 32000;
      else if (model.includes('ThinkPad')) base = 24000;
      else base = 16000;
    }

    let mult = 1.0;
    if (condition === 'flawless') mult = 1.08;
    else if (condition === 'good') mult = 0.95;
    else if (condition === 'minor-scratches') mult = 0.85;
    else if (condition === 'cracked') mult = 0.62;

    if (!hasBoxAndBill) mult -= 0.08;
    if (!hasCharger) mult -= 0.04;

    const lower = Math.round((base * mult * 0.92) / 500) * 500;
    const upper = Math.round((base * mult * 1.05) / 500) * 500;

    return { lower, upper };
  };

  const { lower, upper } = calculateEstimate();
  const summary = `${model} (${condition.replace('-', ' ')}, Box & Bill: ${hasBoxAndBill ? 'Yes' : 'No'})`;
  const estimatedStr = `₹${lower.toLocaleString('en-IN')} - ₹${upper.toLocaleString('en-IN')}`;

  return (
    <section id="sell-exchange" className="py-20 bg-gradient-to-b from-[#03050a] via-[#070b14] to-[#04060c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-[#d4af37]/30 text-[#e5c378] text-xs font-semibold uppercase tracking-wider mb-2.5">
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Direct Device Buyback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Sell or Exchange Your Old Device
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Get instant valuation and transparent evaluation at our Narain Tiraha counter. Direct cash or upgrade credit.
          </p>
        </div>

        {/* Interactive Estimator Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#080d1a] border border-white/10 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              
              {/* Category selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Select Device Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'iphone', label: 'iPhone' },
                    { id: 'android', label: 'Android' },
                    { id: 'macbook', label: 'MacBook' },
                    { id: 'laptop', label: 'Windows PC' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setDeviceCategory(cat.id as any);
                        if (cat.id === 'iphone') setModel('iPhone 13 (128GB)');
                        else if (cat.id === 'android') setModel('Samsung Galaxy S23 Ultra');
                        else if (cat.id === 'macbook') setModel('MacBook Air M2 (256GB)');
                        else setModel('Dell / HP Core i7');
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        deviceCategory === cat.id
                          ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-sm'
                          : 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Device Model & Storage
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. iPhone 14 Pro 128GB or Dell XPS 13"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#03050a] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Physical Condition */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Physical Condition
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'flawless', label: 'Flawless (No Marks)', note: 'Like brand new' },
                    { id: 'good', label: 'Good (Minor wear)', note: 'Normal daily usage' },
                    { id: 'minor-scratches', label: 'Scuffs / Edge Dents', note: 'Visible marks' },
                    { id: 'cracked', label: 'Cracked Glass', note: 'Display or back broken' },
                  ].map((cond) => (
                    <button
                      key={cond.id}
                      onClick={() => setCondition(cond.id as any)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        condition === cond.id
                          ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#f3e5ab]'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-xs">{cond.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{cond.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={hasBoxAndBill}
                    onChange={(e) => setHasBoxAndBill(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-[#d4af37] focus:ring-[#d4af37]"
                  />
                  <span>Original Bill & Box available</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={hasCharger}
                    onChange={(e) => setHasCharger(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-[#d4af37] focus:ring-[#d4af37]"
                  />
                  <span>Original Cable / Charger available</span>
                </label>
              </div>

            </div>

            {/* Live Valuation Card (5 cols) */}
            <div className="md:col-span-5 rounded-2xl bg-gradient-to-b from-[#0e1529] to-[#070b16] border border-[#d4af37]/30 p-6 flex flex-col justify-between space-y-6 shadow-xl">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#e5c378] font-bold">
                  Estimated Valuation Range
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#f3e5ab] font-mono mt-1 tabular-nums">
                  {estimatedStr}
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Estimated in-store trade-in payout or exchange credit at our Narain Tiraha counter.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#e5c378] shrink-0" />
                  <span>Instant UPI or Cash in hand</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#e5c378] shrink-0" />
                  <span>Complimentary data migration to new phone</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#e5c378] shrink-0" />
                  <span>Zero hidden inspection deduction fees</span>
                </div>
              </div>

              <a
                href={createWhatsAppTradeInUrl(summary, estimatedStr)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#e5c378] via-[#d4af37] to-[#b88e28] hover:brightness-110 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#d4af37]/15 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>Discuss Trade-In with Ayush</span>
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
