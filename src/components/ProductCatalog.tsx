import React, { useState, useMemo } from 'react';
import { Product, DeviceCategory } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Store, Sparkles, Smartphone, Laptop, Zap } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  onOpenAdmin: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onOpenDetails,
  onOpenAdmin,
}) => {
  const [activeCategory, setActiveCategory] = useState<DeviceCategory>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'savings'>('featured');

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory === 'mobiles' && p.category !== 'mobiles') return false;
      if (activeCategory === 'laptops' && p.category !== 'laptops') return false;
      if (activeCategory === 'refurbished' && !p.condition.includes('Refurbished') && !p.condition.includes('Second-Hand')) return false;
      if (activeCategory === 'deals' && !p.isTodayDeal) return false;

      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesStorage = p.storage.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesStorage && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'savings') return (b.originalPrice - b.price) - (a.originalPrice - a.price);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, activeCategory, selectedBrand, searchQuery, sortBy]);

  return (
    <section id="devices" className="py-16 sm:py-20 bg-gradient-to-b from-[#060810] via-[#080d1a] to-[#05070e] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Tested & Certified Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Mobiles & Laptops in Shikohabad
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl">
              Inspected with 50-point diagnostic check. In-store hands-on testing before purchase at Narain Tiraha.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 hover:border-blue-400/40 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
              title="Shop owner portal to add, edit or remove products"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-300" />
              <span>Owner Stock Manager</span>
            </button>
          </div>
        </div>

        {/* Filter Bar with Sleek Cupertino Styling */}
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0b1122]/90 border border-white/10 backdrop-blur-xl mb-6 sm:mb-8 space-y-3 sm:space-y-4 shadow-xl">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Devices', icon: Zap },
              { id: 'mobiles', label: 'Smartphones', icon: Smartphone },
              { id: 'laptops', label: 'Laptops & MacBooks', icon: Laptop },
              { id: 'refurbished', label: 'Second-Hand / Refurbished', icon: Sparkles },
              { id: 'deals', label: "Daily Steals", icon: Zap },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as DeviceCategory)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30'
                      : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search + Brand + Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 pt-2 border-t border-white/[0.06]">
            
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search iPhone, MacBook, S23 Ultra, 256GB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg sm:rounded-xl bg-[#060a14] border border-white/10 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 rounded-lg sm:rounded-xl bg-[#060a14] border border-white/10 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="all">All Brands (Apple, Samsung...)</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Google">Google Pixel</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Lenovo">Lenovo</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg sm:rounded-xl bg-[#060a14] border border-white/10 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-400 transition-colors"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="savings">Biggest Savings</option>
              </select>
            </div>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs text-slate-400 px-1">
          <span>
            Available in Store: <strong className="text-white font-mono tabular-nums">{filteredProducts.length}</strong> devices
          </span>
          <span className="text-slate-500 hidden sm:inline">
            Physical inspection with Ayush Yadav at Narain Tiraha
          </span>
        </div>

        {/* 2 PRODUCTS SIDE BY SIDE ON MOBILE (grid-cols-2) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        ) : (
          <div className="p-10 rounded-2xl bg-[#090d1a] border border-white/10 text-center space-y-3 max-w-lg mx-auto">
            <Store className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No devices found matching your filters</h3>
            <p className="text-xs text-slate-400">
              We update stock daily. Contact Ayush directly on WhatsApp to ask about incoming phones or laptops!
            </p>
            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('all');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
