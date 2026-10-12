export const SHOP_PHONE = '8218974370';
export const SHOP_PHONE_INTL = '+918218974370';
export const SHOP_WHATSAPP_NUMBER = '918218974370';
export const SHOP_INSTAGRAM_HANDLE = 'gadgetgalaxy_skb';
export const SHOP_INSTAGRAM_URL = 'https://instagram.com/gadgetgalaxy_skb';
export const SHOP_EMAIL = 'ayuxhyadav1@gmail.com';
export const SHOP_ADDRESS = 'Near Narain Tiraha, Shikohabad, Uttar Pradesh, 283135';
export const SHOP_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Narain+Tiraha+Shikohabad+Uttar+Pradesh';

export function createWhatsAppProductInquiryUrl(productName: string, price: number, condition: string): string {
  const message = `Hello Ayush! I am visiting your Gadget Galaxy showroom website and interested in:

*${productName}*
• Condition: ${condition}
• Galaxy Price: ₹${price.toLocaleString('en-IN')}

Could you confirm current availability for in-store pickup at your Narain Tiraha, Shikohabad shop?`;

  return `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppTradeInUrl(deviceSummary: string, estimatedValue: string): string {
  const message = `Hello Ayush! I want to sell/exchange my old device at Gadget Galaxy Shikohabad:

• Device: ${deviceSummary}
• Online Estimate: ${estimatedValue}

Can I bring it to your shop near Narain Tiraha for physical evaluation and best cash/exchange offer?`;

  return `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppRepairInquiryUrl(deviceModel: string, issue: string): string {
  const message = `Hello Ayush! I need repair service at Gadget Galaxy Shikohabad:

• Device: ${deviceModel}
• Issue: ${issue}

Please let me know estimated repair cost, part availability, and when I can bring it to your shop near Narain Tiraha.`;

  return `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppGeneralUrl(): string {
  const message = `Hello Ayush! I am contacting Gadget Galaxy, Shikohabad. I want to inquire about available smartphones, laptops, or repair services.`;
  return `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
