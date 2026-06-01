/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, Sparkles, Check } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onFooterSignUp: (email: string) => void;
}

export default function Footer({ setCurrentTab, onFooterSignUp }: FooterProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide an email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address.');
      return;
    }

    onFooterSignUp(email);
    setSuccess(true);
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream/90 pt-16 pb-8 border-t border-[#FFF7F2]/10 font-sans" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-[#FFF7F2]/10 pb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white">Fairy Cafe</h3>
            </div>
            <p className="text-xs text-[#9BC1A3] leading-relaxed">
              Step into Evergrove&rsquo;s secret cottage of whimsy. Brewing organic, locally sourced fair-trade coffee and seasonal artisan pastries since 2018.
            </p>
            
            {/* Social handles */}
            <div className="flex items-center gap-3 pt-2" id="footer-social-panel">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#FFF7F2]/5 hover:bg-[#FFF7F2]/10 hover:text-white transition-colors" aria-label="Visit our Instagram page">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#FFF7F2]/5 hover:bg-[#FFF7F2]/10 hover:text-white transition-colors" aria-label="Visit our Pinterest page">
                <span className="font-mono text-xs font-bold leading-none select-none">P</span>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#FFF7F2]/5 hover:bg-[#FFF7F2]/10 hover:text-white transition-colors" aria-label="Visit our TikTok page">
                <span className="font-mono text-xs font-bold leading-none select-none">T</span>
              </a>
              <a href="https://google.com/maps" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#FFF7F2]/5 hover:bg-[#FFF7F2]/10 hover:text-white transition-colors" aria-label="Find us on Google Maps">
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick link columns */}
          <div>
            <h4 className="font-mono text-xs text-[#C7A774] font-bold uppercase tracking-widest border-b border-white/5 pb-2 mb-3">
              Explore the cottage
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-white transition-all hover:underline underline-offset-4 cursor-pointer">Home</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('menu')} className="hover:text-white transition-all hover:underline underline-offset-4 cursor-pointer">Interactive Menu</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('order')} className="hover:text-white transition-all hover:underline underline-offset-4 cursor-pointer">Order for Pickup/Delivery</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('reservations')} className="hover:text-white transition-all hover:underline underline-offset-4 cursor-pointer">Book a Rose Table</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('events')} className="hover:text-white transition-all hover:underline underline-offset-4 cursor-pointer">Upcoming Workshops</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:text-white transition-all hover:underline underline-offset-4 cursor-pointer">Brand Story & Gallery</button>
              </li>
            </ul>
          </div>

          {/* Core Contacts info */}
          <div className="space-y-3.5">
            <h4 className="font-mono text-xs text-[#C7A774] font-bold uppercase tracking-widest border-b border-white/5 pb-2">
              Garden Locations
            </h4>
            <div className="space-y-3 text-xs pr-2">
              <a 
                href="https://google.com/maps" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-2 hover:text-[#FFF7F2] transition-colors"
                id="footer-directions-cta"
              >
                <MapPin className="w-4 h-4 text-[#C7A774] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Flagship Cottage</span>
                  <span className="text-[#9BC1A3]">123 Willow Lane, Evergrove, ST 00000</span>
                  <span className="block text-[10px] underline underline-offset-2 mt-0.5 text-gold font-semibold">Get Directions</span>
                </div>
              </a>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C7A774]" />
                <a href="tel:+10005550123" className="hover:text-white transition-colors">(000) 555-0123</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C7A774]" />
                <a href="mailto:hello@fairycafe.com" className="hover:text-white transition-colors">hello@fairycafe.com</a>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-[#C7A774] font-bold uppercase tracking-widest border-b border-white/5 pb-2">
              Join our garden list
            </h4>
            <p className="text-[11px] text-[#9BC1A3] leading-relaxed">
              Get news on fairy tea party reservations and unlock **10% off** your first pastry!
            </p>

            {!success ? (
              <form onSubmit={handleSubscribe} className="space-y-2" id="footer-newsletter-form">
                <div className="relative">
                  <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="footer-newsletter-email"
                    placeholder="fairyfriend@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FFFBF8]/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/60 outline-none transition-all placeholder:text-[#9BC1A3]/50"
                  />
                </div>
                {error && <span className="text-[10px] text-red-300 font-mono block">{error}</span>}
                <button
                  type="submit"
                  id="footer-newsletter-submit"
                  className="w-full py-2 bg-[#FFF7F2] text-forest font-semibold text-xs rounded-full hover:bg-gold hover:text-forest transition-all shadow-md transform active:scale-95 cursor-pointer"
                >
                  Sign Up & Save 10%
                </button>
              </form>
            ) : (
              <div className="bg-[#FFFBF8]/5 border border-white/10 rounded-xl p-3 text-center space-y-1">
                <div className="text-emerald-300 flex items-center justify-center gap-1 text-xs">
                  <Check className="w-4 h-4" /> Signed Up!
                </div>
                <div className="text-[10px] text-white font-mono leading-none pt-1">
                  DISCOUNT CODE: <span className="text-gold font-bold">GARDEN10</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Dynamic hours specifications & accessibility banner */}
        <div className="py-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 text-xs border-b border-[#FFF7F2]/10">
          <div className="max-w-xl">
            <h5 className="font-bold text-white mb-0.5 font-serif">Flagship Operating Hours</h5>
            <span className="text-[#9BC1A3] text-[11px] leading-relaxed block">
              Mon–Thu: 7:30 AM – 6:00 PM &middot; Friday: 7:35 AM – 8:00 PM &middot; Saturday & Sunday: 8:00 AM – 8:00 PM
            </span>
          </div>
          <div className="bg-[#FFF7F2]/5 rounded-xl border border-white/10 p-3 text-[11px] leading-relaxed text-[#9BC1A3] max-w-md">
            <span className="font-semibold text-white block mb-0.5">ADA Accessibility Statement</span>
            We are dedicated to providing an accessible, welcoming experience to all garden friends. Our website strictly follows WCAG 2.1 AA accessibility principles, and our cottage holds a barrier-free layout. If you experience visual or keyboard barrier blocks, please contact us.
          </div>
        </div>

        {/* Legal bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#9BC1A3]">
          <div>
            &copy; {currentYear} Fairy Cafe, Inc. All rights reserved. Made under AntiGravity 3.1 Pro.
          </div>
          <div className="flex flex-wrap justify-center gap-4" id="footer-legal-links">
            <a href="#privacy" className="hover:text-white hover:underline underline-offset-2">Privacy Policy</a>
            <a href="#terms" className="hover:text-white hover:underline underline-offset-2">Terms of Service</a>
            <a href="#refund" className="hover:text-white hover:underline underline-offset-2">Refund Policy</a>
            <a href="#accessibility" className="hover:text-white hover:underline underline-offset-2">Accessibility Statement</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
