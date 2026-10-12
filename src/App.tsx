/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product } from './types';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { DeliveryNoticeBar } from './components/DeliveryNoticeBar';
import { Showroom3DViewer } from './components/Showroom3DViewer';
import { TodaysDeals } from './components/TodaysDeals';
import { ProductCatalog } from './components/ProductCatalog';
import { TradeInEstimator } from './components/TradeInEstimator';
import { RepairServices } from './components/RepairServices';
import { AboutOwner } from './components/AboutOwner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { StoreLocationContact } from './components/StoreLocationContact';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminInventoryModal } from './components/AdminInventoryModal';
import { VerticalContactDock } from './components/VerticalContactDock';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'gadget_galaxy_inventory_v1';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse stored inventory:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to localStorage
  const handleSaveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    } catch (e) {
      console.error('Failed to save inventory to localStorage:', e);
    }
  };

  const handleResetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    } catch (e) {
      console.error('Failed to reset inventory:', e);
    }
  };

  const scrollToDevices = () => {
    const el = document.getElementById('devices');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#03050a] text-slate-100 flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f3e5ab]">
      
      {/* Sticky Navbar */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Cinematic 3D Hero */}
        <Hero3D
          onExploreClick={scrollToDevices}
          onContactClick={scrollToContact}
        />

        {/* Store Pickup / No Home Delivery Policy Notice */}
        <DeliveryNoticeBar />

        {/* Interactive 3D Device Inspection Showroom */}
        <Showroom3DViewer />

        {/* Today's Flash Steals & Offers */}
        <TodaysDeals
          products={products}
          onOpenDetails={(p) => setSelectedProduct(p)}
        />

        {/* Complete Filterable & Searchable Product Catalog */}
        <ProductCatalog
          products={products}
          onOpenDetails={(p) => setSelectedProduct(p)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Sell or Exchange Old Device Valuation Calculator */}
        <TradeInEstimator />

        {/* Certified Mobile & Laptop Hardware Repairs */}
        <RepairServices />

        {/* Meet Ayush Yadav - Founder Gadget Galaxy */}
        <AboutOwner />

        {/* Why Choose Us & 50-Point Quality Guarantee */}
        <WhyChooseUs />

        {/* Store Location (Near Narain Tiraha, Shikohabad) & Contact Form */}
        <StoreLocationContact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Vertical Contact Circles (B&W WhatsApp, Instagram, Call, Directions) */}
      <VerticalContactDock />

      {/* 50-Point Inspection & Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Owner Inventory & Deal Editor Modal */}
      <AdminInventoryModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onSaveProducts={handleSaveProducts}
        onResetToDefault={handleResetToDefault}
      />

    </div>
  );
}
