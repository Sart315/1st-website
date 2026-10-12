import React, { useState } from 'react';
import { REPAIR_SERVICES } from '../data/initialProducts';
import { Wrench, ShieldCheck, Smartphone, Cpu, Droplet, BatteryCharging, MessageCircle } from 'lucide-react';
import { createWhatsAppRepairInquiryUrl } from '../utils/whatsapp';

export const RepairServices: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>('iPhone 13');
  const [selectedIssue, setSelectedIssue] = useState<string>('Broken Screen Glass / Touch Issue');

  const repairBenchImg = '/src/assets/images/repair_lab_bench_1791810558781.jpg';

  const getIcon = (name: string) => {
    switch (name) {
      case 'screen': return <Smartphone className="w-5 h-5 text-[#e5c378]" />;
      case 'battery': return <BatteryCharging className="w-5 h-5 text-[#e5c378]" />;
      case 'motherboard': return <Cpu className="w-5 h-5 text-[#e5c378]" />;
      case 'water': return <Droplet className="w-5 h-5 text-[#e5c378]" />;
      default: return <Wrench className="w-5 h-5 text-[#e5c378]" />;
    }
  };

  return (
    <section id="repair" className="py-20 bg-gradient-to-b from-[#04060c] via-[#070b16] to-[#03050a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-[#d4af37]/30 text-[#e5c378] text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Wrench className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Certified Hardware Diagnostics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Precision Mobile & Laptop Repair
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Micro-soldering, OLED display restoration, genuine batteries, and chip-level motherboard repair in Shikohabad.
          </p>
        </div>

        {/* 2-Column Split: Services Grid & Repair Lab Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Services Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REPAIR_SERVICES.map((serv) => (
              <div
                key={serv.id}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#d4af37]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3">
                    {getIcon(serv.iconName)}
                  </div>
                  <h3 className="text-base font-bold text-white font-display">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Cost:</span>
                    <span className="font-semibold text-[#f3e5ab]">{serv.priceEstimate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Turnaround:</span>
                    <span className="text-slate-300">{serv.timeEstimate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Warranty:</span>
                    <span className="text-[#e5c378] font-medium">{serv.warranty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Repair Lab Image & Fast Booking Form (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#080d19] border border-white/10 p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-5 border border-white/10">
                <img
                  src={repairBenchImg}
                  alt="Gadget Galaxy certified repair lab"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                    <span>In-House Precision Micro-Repair Lab</span>
                  </span>
                </div>
              </div>

              <h4 className="text-lg font-bold text-white font-display">
                Request an Instant Repair Estimate
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Tell Ayush what is wrong with your phone or laptop to check parts availability and repair turnaround.
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Your Device Model
                  </label>
                  <input
                    type="text"
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    placeholder="e.g. iPhone 14 Pro or HP Pavilion Laptop"
                    className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Issue Description
                  </label>
                  <select
                    value={selectedIssue}
                    onChange={(e) => setSelectedIssue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Broken Screen Glass / Touch Issue">Broken Screen / Touch Not Working</option>
                    <option value="Battery Draining Rapidly / Low Health">Battery Replacement Needed</option>
                    <option value="Not Powering On / Dead Phone">Device Dead / Not Turning On</option>
                    <option value="Water / Liquid Damage">Water or Liquid Spill</option>
                    <option value="Charging Port Loose / Not Charging">Charging Port Issue</option>
                    <option value="Laptop Slow / Needs SSD & RAM Upgrade">Laptop Slow / Needs SSD Upgrade</option>
                    <option value="Other Hardware / Software Problem">Other Hardware Problem</option>
                  </select>
                </div>
              </div>
            </div>

            <a
              href={createWhatsAppRepairInquiryUrl(selectedDevice, selectedIssue)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#e5c378] via-[#d4af37] to-[#b88e28] hover:brightness-110 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#d4af37]/15 active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>Get Repair Quote on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
