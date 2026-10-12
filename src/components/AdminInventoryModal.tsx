import React, { useState } from 'react';
import { Product, DeviceCondition } from '../types';
import { X, Plus, Trash2, Edit3, Upload, RefreshCw, Save, Sparkles } from 'lucide-react';

interface AdminInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  onResetToDefault: () => void;
}

const CONDITIONS: DeviceCondition[] = [
  'Brand New (Sealed)',
  'Refurbished (Mint A+)',
  'Second-Hand (Pristine A)',
  'Second-Hand (Very Good B+)',
  'Open Box (Like New)',
];

export const AdminInventoryModal: React.FC<AdminInventoryModalProps> = ({
  isOpen,
  onClose,
  products,
  onSaveProducts,
  onResetToDefault,
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
  const [imagePreview, setImagePreview] = useState<string>('');

  if (!isOpen) return null;

  const handleStartCreate = () => {
    const newProduct: Product = {
      id: 'gg-' + Date.now(),
      name: '',
      brand: 'Apple',
      category: 'mobiles',
      condition: 'Refurbished (Mint A+)',
      price: 25000,
      originalPrice: 45000,
      storage: '128 GB',
      ram: '6 GB RAM',
      processor: 'A15 Bionic',
      batteryHealth: '95% Healthy',
      warranty: '3 Months Gadget Galaxy Warranty',
      accessoriesIncluded: ['Charging Cable', 'Store Bill'],
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      inStock: true,
      isTodayDeal: false,
      dealDiscountNote: '',
      featured: false,
      description: 'Tested 100% genuine hardware. Available for in-store pickup near Narain Tiraha, Shikohabad.',
      inspectionScore: 50,
      colorFinish: 'Default'
    };
    setEditingProduct(newProduct);
    setImagePreview(newProduct.image);
    setIsCreatingNew(true);
    setActiveTab('form');
  };

  const handleStartEdit = (p: Product) => {
    setEditingProduct({ ...p });
    setImagePreview(p.image);
    setIsCreatingNew(false);
    setActiveTab('form');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this product from the inventory?')) {
      const updated = products.filter((p) => p.id !== id);
      onSaveProducts(updated);
    }
  };

  const handleToggleStock = (id: string) => {
    const updated = products.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p));
    onSaveProducts(updated);
  };

  const handleToggleDeal = (id: string) => {
    const updated = products.map((p) => (p.id === id ? { ...p, isTodayDeal: !p.isTodayDeal } : p));
    onSaveProducts(updated);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        if (editingProduct) {
          setEditingProduct({ ...editingProduct, image: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name.trim()) {
      alert('Please enter a product title');
      return;
    }

    let updatedList: Product[];
    if (isCreatingNew) {
      updatedList = [editingProduct, ...products];
    } else {
      updatedList = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    }

    onSaveProducts(updatedList);
    setActiveTab('list');
    setEditingProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#080d19] border border-[#d4af37]/30 shadow-2xl text-slate-100 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-[#04060c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[#d4af37]/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                Gadget Galaxy Stock & Offer Manager
              </h2>
              <p className="text-xs text-slate-400">
                Add, edit prices, upload photos, or change stock availability.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.06] bg-[#03050a]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'list' ? 'bg-[#d4af37] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Current Stock ({products.length})
            </button>
            <button
              onClick={handleStartCreate}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'form' && isCreatingNew
                  ? 'bg-[#d4af37] text-slate-950 font-bold'
                  : 'bg-white/[0.04] text-[#e5c378] border border-[#d4af37]/30 hover:bg-white/[0.08]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Device</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset catalog to the default showcase devices?')) {
                onResetToDefault();
              }
            }}
            className="text-[11px] text-slate-400 hover:text-[#e5c378] flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to Default Stock</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {activeTab === 'list' ? (
            <div className="space-y-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#e5c378]">{p.condition}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs text-slate-400">{p.storage}</span>
                        {p.isTodayDeal && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#f3e5ab] border border-[#d4af37]/30">
                            Daily Deal
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white truncate max-w-sm">{p.name}</h4>
                      <div className="text-xs font-mono font-bold text-[#f3e5ab] tabular-nums">
                        ₹{p.price.toLocaleString('en-IN')}{' '}
                        <span className="text-slate-500 line-through text-[11px]">
                          ₹{p.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleToggleStock(p.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                        p.inStock
                          ? 'bg-white/[0.04] border-[#d4af37]/40 text-[#e5c378]'
                          : 'bg-white/[0.02] border-white/10 text-slate-400'
                      }`}
                    >
                      {p.inStock ? 'In Stock' : 'Reserved'}
                    </button>

                    <button
                      onClick={() => handleToggleDeal(p.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                        p.isTodayDeal
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f3e5ab] font-bold'
                          : 'bg-white/[0.02] border-white/10 text-slate-400'
                      }`}
                      title="Toggle Today's Deal"
                    >
                      Deal: {p.isTodayDeal ? 'ON' : 'OFF'}
                    </button>

                    <button
                      onClick={() => handleStartEdit(p)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-red-400 border border-white/10 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            editingProduct && (
              <form onSubmit={handleSaveForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Device Name & Model *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      placeholder="e.g. Apple iPhone 15 Pro (Natural Titanium)"
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value as 'mobiles' | 'laptops',
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="mobiles">Smartphone</option>
                      <option value="laptops">Laptop / MacBook</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Brand</label>
                    <select
                      value={editingProduct.brand}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          brand: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Apple">Apple</option>
                      <option value="Samsung">Samsung</option>
                      <option value="OnePlus">OnePlus</option>
                      <option value="Google">Google Pixel</option>
                      <option value="Dell">Dell</option>
                      <option value="HP">HP</option>
                      <option value="Lenovo">Lenovo</option>
                      <option value="Asus">Asus</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Condition Grade</label>
                    <select
                      value={editingProduct.condition}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          condition: e.target.value as DeviceCondition,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      {CONDITIONS.map((cond) => (
                        <option key={cond} value={cond}>
                          {cond}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Gadget Galaxy Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-sm text-[#f3e5ab] font-mono font-bold focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Original MRP (₹)
                    </label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          originalPrice: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-sm text-slate-300 font-mono focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Storage</label>
                    <input
                      type="text"
                      value={editingProduct.storage}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, storage: e.target.value })
                      }
                      placeholder="e.g. 128 GB, 256 GB, 512 GB SSD"
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">RAM</label>
                    <input
                      type="text"
                      value={editingProduct.ram || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, ram: e.target.value })
                      }
                      placeholder="e.g. 8 GB RAM, 16 GB Unified"
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Battery Health
                    </label>
                    <input
                      type="text"
                      value={editingProduct.batteryHealth || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, batteryHealth: e.target.value })
                      }
                      placeholder="e.g. 98% Original Battery"
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Warranty Term</label>
                    <input
                      type="text"
                      value={editingProduct.warranty}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, warranty: e.target.value })
                      }
                      placeholder="e.g. 6 Months Store Warranty"
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">
                      Product Photo
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={editingProduct.image}
                        onChange={(e) => {
                          setEditingProduct({ ...editingProduct, image: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        placeholder="https://..."
                        className="flex-1 px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                      <label className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#e5c378] border border-[#d4af37]/30 text-xs font-semibold cursor-pointer flex items-center gap-1 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {imagePreview && (
                      <div className="flex items-center gap-3 p-2 rounded-xl bg-black/40 border border-white/5">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <span className="text-xs text-slate-400">Photo preview active</span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2 flex flex-wrap gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                      <input
                        type="checkbox"
                        checked={editingProduct.inStock}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, inStock: e.target.checked })
                        }
                        className="rounded border-slate-700 text-[#d4af37] focus:ring-[#d4af37] w-4 h-4"
                      />
                      <span>In Stock for Store Pickup</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                      <input
                        type="checkbox"
                        checked={editingProduct.isTodayDeal || false}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, isTodayDeal: e.target.checked })
                        }
                        className="rounded border-slate-700 text-[#d4af37] focus:ring-[#d4af37] w-4 h-4"
                      />
                      <span>Highlight as "Today's Offer"</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-200">
                      <input
                        type="checkbox"
                        checked={editingProduct.featured || false}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, featured: e.target.checked })
                        }
                        className="rounded border-slate-700 text-[#d4af37] focus:ring-[#d4af37] w-4 h-4"
                      />
                      <span>Featured Showcase</span>
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Short Description & Physical Notes
                    </label>
                    <textarea
                      rows={2}
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#03050a] border border-white/10 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('list');
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#e5c378] via-[#d4af37] to-[#b88e28] text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save to Inventory</span>
                  </button>
                </div>
              </form>
            )
          )}
        </div>

      </div>
    </div>
  );
};
