export type DeviceCategory = 'all' | 'mobiles' | 'laptops' | 'refurbished' | 'deals';

export type DeviceCondition = 
  | 'Brand New (Sealed)'
  | 'Refurbished (Mint A+)'
  | 'Second-Hand (Pristine A)'
  | 'Second-Hand (Very Good B+)'
  | 'Open Box (Like New)';

export interface Product {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'OnePlus' | 'Google' | 'Dell' | 'HP' | 'Lenovo' | 'Asus' | 'Other';
  category: 'mobiles' | 'laptops';
  condition: DeviceCondition;
  price: number; // in INR
  originalPrice: number; // in INR
  storage: string; // e.g. "256 GB"
  ram?: string; // e.g. "8 GB RAM" or "16 GB Unified"
  processor?: string; // e.g. "A17 Pro" or "M3 Pro" or "Snapdragon 8 Gen 2"
  batteryHealth?: string; // e.g. "97% Original Battery"
  warranty: string; // e.g. "6 Months Galaxy Warranty" or "Official Apple till Dec 2026"
  accessoriesIncluded: string[]; // e.g. ["Original Box", "20W Fast Charger", "Tax Invoice"]
  image: string;
  inStock: boolean;
  isTodayDeal?: boolean;
  dealDiscountNote?: string; // e.g. "Save ₹18,000 Today"
  featured?: boolean;
  description: string;
  inspectionScore?: number; // out of 50
  colorFinish?: string;
}

export interface RepairServiceItem {
  id: string;
  title: string;
  category: 'mobile' | 'laptop';
  priceEstimate: string;
  timeEstimate: string;
  description: string;
  warranty: string;
  iconName: string;
}

export interface TradeInOption {
  deviceType: 'iphone' | 'android' | 'macbook' | 'windows-laptop';
  brand: string;
  model: string;
  storage: string;
  condition: 'flawless' | 'good' | 'average' | 'cracked-screen';
  hasBoxAndBill: boolean;
}
