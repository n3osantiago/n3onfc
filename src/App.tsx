import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Send,
  Download,
  Share2,
  Copy,
  Check,
  Sparkles,
  Zap,
  CreditCard,
  QrCode,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  X
} from 'lucide-react';

// Product images generated
import imgGoogleReview from './assets/images/nfc_google_review_card_1791989015059.jpg';
import imgCustomSocial from './assets/images/custom_nfc_social_cards_1791989016737.jpg';
import imgCustomWebsite from './assets/images/custom_website_business_1791989968470.jpg';

const CONTACT_INFO = {
  name: 'Neo',
  brand: 'DPHub Official',
  title: 'NFC Card Specialist & Custom Web Solutions',
  phone: '09771686786',
  intlPhone: '+639771686786',
  whatsappRaw: '09771686786',
  whatsappUser: 'n3o.nfc',
  telegram: '@dphubofficial',
  telegramLink: 'https://t.me/dphubofficial',
  whatsappLink: 'https://wa.me/639771686786?text=Hi%20Neo%2C%20I%20scanned%20your%20DPHub%20NFC%20card%20and%20would%20like%20to%20inquire.',
  viberNumber: '09771686786',
  viberLink: 'viber://chat?number=%2B639771686786',
  smsLink: 'sms:+639771686786?body=Hi%20Neo%20(DPHub)%2C%20I%20just%20scanned%20your%20NFC%20card%20and%20would%20like%20to%20inquire.',
  callLink: 'tel:+639771686786',
};

// Generate vCard download
function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Neo - DPHub Official
N:Official;Neo;DPHub;;
ORG:DPHub Official
TITLE:NFC Card Specialist & Custom Web Solutions
TEL;TYPE=CELL,VOICE:+639771686786
X-TELEGRAM:https://t.me/dphubofficial
X-WHATSAPP:+639771686786
NOTE:Please text first before calling (09771686786). Provider of NFC Google Review Cards, Custom NFC Social Cards, and Custom Websites for Businesses.
URL:https://t.me/dphubofficial
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Neo_DPHub_NFC_Contact.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function App() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showCallNotice, setShowCallNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'google' | 'custom' | 'website'>('all');

  // Quick inquiry state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryBusiness, setInquiryBusiness] = useState('');
  const [inquiryService, setInquiryService] = useState('NFC Google Review Card');
  const [inquiryChannel, setInquiryChannel] = useState<'whatsapp' | 'telegram' | 'viber' | 'sms'>('whatsapp');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2200);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DPHub Official | NFC Cards & Business Automation',
          text: 'Connect with Neo at DPHub Official for NFC Google Review cards, custom NFC smart cards, and business automation.',
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed, fallback to copy
        copyToClipboard(window.location.href, 'Link Copied');
      }
    } else {
      copyToClipboard(window.location.href, 'Card Link Copied');
    }
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const namePart = inquiryName.trim() ? `My name is ${inquiryName.trim()}` : `Hi Neo`;
    const businessPart = inquiryBusiness.trim() ? ` from ${inquiryBusiness.trim()}` : '';
    const message = `${namePart}${businessPart}. I scanned your NFC card and I am interested in: ${inquiryService}. Let's discuss details!`;
    const encoded = encodeURIComponent(message);

    if (inquiryChannel === 'whatsapp') {
      window.open(`https://wa.me/639771686786?text=${encoded}`, '_blank');
    } else if (inquiryChannel === 'telegram') {
      copyToClipboard(message, 'Message Copied for Telegram');
      window.open('https://t.me/dphubofficial', '_blank');
    } else if (inquiryChannel === 'viber') {
      copyToClipboard(message, 'Message Copied for Viber');
      window.location.href = `viber://chat?number=%2B639771686786`;
    } else {
      window.location.href = `sms:+639771686786?body=${encoded}`;
    }
  };

  const portfolioItems = [
    {
      id: 'google-review-cards',
      category: 'google',
      categoryLabel: 'Google Maps Growth',
      title: 'NFC Google Review Tap Cards',
      tagline: 'Get 5-Star Reviews in 1 Tap — No Typing, No Searching',
      image: imgGoogleReview,
      highlights: [
        'Instant Google Maps review pop-up when customers tap',
        'Works with all modern iPhones & Android devices',
        'Durable waterproof PVC/Matte card with custom QR backup',
        'Proven to increase weekly 5-star ratings by up to 300%'
      ],
      idealFor: 'Restaurants, Cafes, Salons, Clinics, Auto Shops & Retail Stores',
      ctaText: 'Inquire for Your Store',
      recommendedFor: 'Highest ROI for Local Businesses'
    },
    {
      id: 'custom-nfc-cards',
      category: 'custom',
      categoryLabel: 'Smart Networking',
      title: 'Custom NFC Cards for Social & Business',
      tagline: 'One Card That Shares Everything — Forever',
      image: imgCustomSocial,
      highlights: [
        'Instant tap to your Instagram, TikTok, LinkedIn, or link hub',
        'Custom engraved logo, matte black, metallic, or full-color finish',
        'Update your contact details anytime without reprinting',
        'Zero app download needed for anyone scanning your card'
      ],
      idealFor: 'Entrepreneurs, Executives, Realtors, Creators & Sales Teams',
      ctaText: 'Order Custom Design',
      recommendedFor: 'Executive Personal Branding'
    },
    {
      id: 'custom-websites',
      category: 'website',
      categoryLabel: 'Web Development',
      title: 'Custom Website for Businesses',
      tagline: 'Modern, Fast & High-Converting Websites Tailored for Your Brand',
      image: imgCustomWebsite,
      highlights: [
        'High-converting landing pages, portfolio & business showcase sites',
        'Direct WhatsApp, Viber, Telegram & contact click-to-chat integration',
        'Mobile-first responsive design optimized for speed and clarity',
        'If you have anything in your mind, you can DM me we will talk about it!'
      ],
      idealFor: 'Local Businesses, Shops, Clinics, Service Providers & Brands',
      ctaText: 'Inquire for Custom Website',
      recommendedFor: 'Custom Tailored Digital Presence'
    }
  ];

  const filteredPortfolio = activeTab === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification */}
      {copiedItem && (
        <div className="fixed top-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-slate-950 font-medium text-xs rounded-xl shadow-xl shadow-amber-500/20 animate-in fade-in slide-in-from-top-3 duration-200">
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{copiedItem} copied to clipboard!</span>
        </div>
      )}

      {/* Main Top Navigation Bar (Strict 3-zone contract) */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Zone 1: Single element wordmark */}
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
            </div>
            <span className="font-bold tracking-tight text-white text-base">
              DPHub <span className="text-amber-400 font-medium">NFC</span>
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#quick-connect" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Direct Channels
            </a>
            <a href="#services-portfolio" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              NFC & Websites
            </a>
            <a href="#quick-inquiry" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Quick Inquiry
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowQrModal(true)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="View QR Code"
              aria-label="View QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Share Card"
              aria-label="Share Business Card"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={downloadVCard}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-sm shadow-amber-500/20 whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Contact</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Container: Responsive Desktop 2-Column Split / Mobile Stack */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* ================= LEFT COLUMN: DIGITAL BUSINESS CARD & DIRECT CHANNELS ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-5">
            
            {/* PHYSICAL NFC CARD VISUALIZATION CONTAINER */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 p-6 shadow-2xl shadow-black/80">
              {/* Subtle NFC wave background watermark */}
              <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full border border-amber-500/10 pointer-events-none" />
              <div className="absolute -right-14 -top-14 w-56 h-56 rounded-full border border-amber-500/10 pointer-events-none" />

              {/* Card Header Tag */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
                  <CreditCard className="w-4 h-4" />
                  <span>Verified NFC Smart Card</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>Ready to Connect</span>
                </div>
              </div>

              {/* Profile Bio */}
              <div className="flex items-start gap-4 mb-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20">
                    <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-xl font-bold text-amber-400">
                      N3O
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1 rounded-full shadow-md">
                    <Zap className="w-3 h-3 fill-slate-950" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-white tracking-tight truncate">
                      {CONTACT_INFO.name}
                    </h1>
                    <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
                      {CONTACT_INFO.brand}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    NFC Google Cards & Custom Websites
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                    <span>Manila & Nationwide</span>
                    <span>·</span>
                    <span>Direct Inquiries</span>
                  </p>
                </div>
              </div>

              {/* Special Lead Generation Notice: Text First Before Calling */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-5 text-xs text-amber-200/90 flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-amber-300 font-semibold">Fast Response Notice:</strong> Please send a text or DM first before calling mobile <span className="font-mono font-bold text-white">{CONTACT_INFO.phone}</span> for prompt assistance! If you have anything in your mind, you can DM me we will talk about it.
                </div>
              </div>

              {/* Primary One-Tap Action Buttons */}
              <div id="quick-connect" className="space-y-2.5">
                {/* 1. Auto Save Contact Button (Prompt priority) */}
                <button
                  onClick={downloadVCard}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-between hover:bg-amber-400 active:scale-[0.99] transition-all shadow-lg shadow-amber-500/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-950/15 flex items-center justify-center">
                      <Download className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                    </div>
                    <div className="text-left">
                      <div className="leading-tight">Save Contact to Phone</div>
                      <div className="text-[10px] text-slate-950/70 font-medium">Auto-downloads vCard to iOS & Android</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                {/* 2. WhatsApp Direct Link */}
                <a
                  href={CONTACT_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-white font-medium text-xs flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center font-bold shadow-md shadow-emerald-900/30">
                      <MessageSquare className="w-4 h-4 fill-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">DM on WhatsApp</div>
                      <div className="text-[11px] text-slate-300 font-mono">{CONTACT_INFO.phone} · @{CONTACT_INFO.whatsappUser}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#25D366]" />
                </a>

                {/* 3. Telegram Direct Link */}
                <a
                  href={CONTACT_INFO.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#229ED9]/15 hover:bg-[#229ED9]/25 border border-[#229ED9]/30 text-white font-medium text-xs flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#229ED9] text-white flex items-center justify-center font-bold shadow-md shadow-sky-900/30">
                      <Send className="w-4 h-4 fill-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">Chat on Telegram</div>
                      <div className="text-[11px] text-slate-300 font-mono">{CONTACT_INFO.telegram}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#229ED9]" />
                </a>

                {/* 4. Viber Direct Link & Copy */}
                <div className="w-full py-3 px-4 rounded-xl bg-[#7360F2]/15 border border-[#7360F2]/30 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#7360F2] text-white flex items-center justify-center font-bold shadow-md shadow-indigo-900/30">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white text-xs">Chat on Viber</div>
                      <div className="text-[11px] text-slate-300 font-mono">{CONTACT_INFO.viberNumber}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={CONTACT_INFO.viberLink}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-[#7360F2] text-white rounded-md hover:bg-[#604dec] transition-colors"
                    >
                      Open
                    </a>
                    <button
                      onClick={() => copyToClipboard(CONTACT_INFO.viberNumber, 'Viber Number')}
                      className="p-1.5 text-slate-300 hover:text-white rounded-md bg-slate-900/80 border border-slate-700"
                      title="Copy Viber Number"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 5. SMS First & Mobile Call Row */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={CONTACT_INFO.smsLink}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Send SMS (Text)</span>
                  </a>

                  <button
                    onClick={() => setShowCallNotice(true)}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call Mobile</span>
                  </button>
                </div>
              </div>

              {/* Direct Details Quick Copy Bar */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-slate-300">{CONTACT_INFO.phone}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(CONTACT_INFO.phone, 'Mobile Number')}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy #</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(CONTACT_INFO.telegram, 'Telegram Handle')}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy TG</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges Strip (2 columns) */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-amber-400 font-bold text-sm">1-Tap</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Instant NFC Sync</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-emerald-400 font-bold text-sm">5★ Rating</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Review Cards</div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: SERVICES & PORTFOLIO ================= */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Section Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Professional Portfolio & Services</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-balance">
                High-Conversion NFC Cards & Custom Websites
              </h2>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Empowering businesses with contactless Google 5-star review generation, executive digital business cards, and custom websites. If you have anything in your mind, you can DM me we will talk about it.
              </p>
            </div>

            {/* Filter Tabs (Interactive Segmented Control) */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Solutions (3)
              </button>
              <button
                onClick={() => setActiveTab('google')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'google'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Google Review Cards
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'custom'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Custom Social Cards
              </button>
              <button
                onClick={() => setActiveTab('website')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'website'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Custom Websites
              </button>
            </div>

            {/* Portfolio Grid Cards */}
            <div id="services-portfolio" className="space-y-6">
              {filteredPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all group"
                >
                  {/* Image banner with overlay */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-400 rounded-md">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                        {item.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Content & Features */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-xs text-slate-400">
                        <span className="text-slate-300 font-medium">Best for: </span>
                        <span>{item.idealFor}</span>
                      </div>

                      <button
                        onClick={() => {
                          setInquiryService(item.title);
                          const el = document.getElementById('quick-inquiry');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>{item.ctaText}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= SEAMLESS QUICK INQUIRY FORM (LEAD GEN) ================= */}
            <div id="quick-inquiry" className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" />
                <span>Instant Inquiry & Pricing</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Ready to Boost Reviews, Order NFC Cards, or Build a Custom Website?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose your desired product below. If you have anything in your mind, you can DM me we will talk about it! Your details will be formatted directly into a pre-filled message on WhatsApp, Telegram, or Viber.
              </p>

              <form onSubmit={handleSendInquiry} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Michael Tan"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Business / Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Cafe / Realty Corp"
                      value={inquiryBusiness}
                      onChange={(e) => setInquiryBusiness(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Service of Interest</label>
                  <select
                    value={inquiryService}
                    onChange={(e) => setInquiryService(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="NFC Google Review Card (5-Star Booster)">NFC Google Review Card (5-Star Booster)</option>
                    <option value="Custom NFC Social Media Card">Custom NFC Social Media Card</option>
                    <option value="Executive Metal/Matte NFC Business Card">Executive Metal/Matte NFC Business Card</option>
                    <option value="Custom Website for Businesses">Custom Website for Businesses</option>
                    <option value="Custom Project Idea (Let's talk!)">Custom Project Idea (Let's talk!)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Preferred Direct Chat Channel</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setInquiryChannel('whatsapp')}
                      className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all ${
                        inquiryChannel === 'whatsapp'
                          ? 'bg-[#25D366]/20 border-[#25D366] text-[#25D366]'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInquiryChannel('telegram')}
                      className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all ${
                        inquiryChannel === 'telegram'
                          ? 'bg-[#229ED9]/20 border-[#229ED9] text-[#229ED9]'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Telegram</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInquiryChannel('viber')}
                      className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all ${
                        inquiryChannel === 'viber'
                          ? 'bg-[#7360F2]/20 border-[#7360F2] text-[#7360F2]'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Viber</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInquiryChannel('sms')}
                      className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all ${
                        inquiryChannel === 'sms'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>SMS Text</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 active:scale-[0.99] transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry via {inquiryChannel.toUpperCase()}</span>
                </button>
              </form>
            </div>

            {/* How It Works 3-Step Strip */}
            <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                How DPHub NFC Cards Work
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-amber-400 font-bold text-xs">Step 01. Tap Card</div>
                  <p className="text-xs text-slate-400">Customer taps any smartphone near your branded NFC card.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-amber-400 font-bold text-xs">Step 02. Instant Action</div>
                  <p className="text-xs text-slate-400">Google Review page or social links open automatically in browser.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-amber-400 font-bold text-xs">Step 03. Boost Revenue</div>
                  <p className="text-xs text-slate-400">Collect 5-star ratings and capture leads effortlessly 24/7.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-6 px-4 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">{CONTACT_INFO.brand}</span>
            <span>·</span>
            <span>NFC & Web Solutions</span>
            <span>·</span>
            <span>Manila, Philippines</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              WhatsApp
            </a>
            <a href={CONTACT_INFO.telegramLink} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              Telegram
            </a>
            <button onClick={downloadVCard} className="hover:text-amber-400">
              Save Contact (.vcf)
            </button>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM QUICK-ACTION BAR (Height capped under 15% viewport height) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-2.5">
        <div className="grid grid-cols-4 gap-2">
          <a
            href={CONTACT_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span className="text-[10px] font-semibold mt-1">WhatsApp</span>
          </a>

          <a
            href={CONTACT_INFO.telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9]/20 transition-colors"
          >
            <Send className="w-5 h-5 fill-current" />
            <span className="text-[10px] font-semibold mt-1">Telegram</span>
          </a>

          <a
            href={CONTACT_INFO.viberLink}
            className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-[#7360F2]/10 text-[#7360F2] hover:bg-[#7360F2]/20 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] font-semibold mt-1">Viber</span>
          </a>

          <button
            onClick={downloadVCard}
            className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span className="text-[10px] mt-1">Save</span>
          </button>
        </div>
      </div>

      {/* MODAL: Call Notice (Text first preference) */}
      {showCallNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Phone className="w-4 h-4" />
                <span>Call Mobile Confirmation</span>
              </div>
              <button
                onClick={() => setShowCallNotice(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              We highly recommend <strong className="text-amber-400">sending a text message first</strong> with your name and inquiry before calling, as we are often in client setup meetings.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono font-bold text-white text-sm">
              {CONTACT_INFO.phone}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={CONTACT_INFO.smsLink}
                onClick={() => setShowCallNotice(false)}
                className="py-2.5 px-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs text-center hover:bg-amber-400 transition-colors"
              >
                Text First (SMS)
              </a>
              <a
                href={CONTACT_INFO.callLink}
                onClick={() => setShowCallNotice(false)}
                className="py-2.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-medium text-xs text-center hover:bg-slate-700 transition-colors"
              >
                Call Anyway
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: QR Code Scan fallback */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xs rounded-2xl bg-slate-900 border border-slate-800 p-5 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Scan QR Code
              </span>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Clean SVG QR Representation */}
            <div className="p-4 bg-white rounded-xl inline-block shadow-lg mx-auto">
              <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none">
                {/* Simulated clean QR matrix */}
                <rect width="100" height="100" fill="white" />
                {/* Top-left position finder */}
                <rect x="10" y="10" width="24" height="24" fill="#090d16" />
                <rect x="14" y="14" width="16" height="16" fill="white" />
                <rect x="18" y="18" width="8" height="8" fill="#090d16" />

                {/* Top-right position finder */}
                <rect x="66" y="10" width="24" height="24" fill="#090d16" />
                <rect x="70" y="14" width="16" height="16" fill="white" />
                <rect x="74" y="18" width="8" height="8" fill="#090d16" />

                {/* Bottom-left position finder */}
                <rect x="10" y="66" width="24" height="24" fill="#090d16" />
                <rect x="14" y="70" width="16" height="16" fill="white" />
                <rect x="18" y="74" width="8" height="8" fill="#090d16" />

                {/* Data modules */}
                <rect x="38" y="12" width="6" height="6" fill="#090d16" />
                <rect x="48" y="14" width="8" height="6" fill="#090d16" />
                <rect x="40" y="24" width="14" height="6" fill="#090d16" />
                <rect x="14" y="38" width="8" height="6" fill="#090d16" />
                <rect x="28" y="38" width="6" height="12" fill="#090d16" />
                <rect x="42" y="38" width="16" height="16" fill="#f59e0b" />
                <rect x="66" y="38" width="10" height="8" fill="#090d16" />
                <rect x="80" y="42" width="8" height="6" fill="#090d16" />
                <rect x="38" y="60" width="8" height="8" fill="#090d16" />
                <rect x="52" y="62" width="14" height="6" fill="#090d16" />
                <rect x="72" y="66" width="16" height="8" fill="#090d16" />
                <rect x="42" y="76" width="12" height="12" fill="#090d16" />
                <rect x="62" y="80" width="8" height="8" fill="#090d16" />
                <rect x="76" y="80" width="12" height="8" fill="#090d16" />
              </svg>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-white">DPHub NFC Business Card</p>
              <p className="text-[11px] text-slate-400">
                Point any smartphone camera to open this digital business card
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(window.location.href, 'Link')}
              className="w-full py-2 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Copy Link Instead
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
