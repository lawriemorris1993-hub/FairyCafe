/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, ShoppingBag, Terminal, ExternalLink, CalendarDays, MapPin } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  viewMode: 'site' | 'specs';
  setViewMode: (mode: 'site' | 'specs') => void;
  cartCount: number;
}

export default function Header({ currentTab, setCurrentTab, viewMode, setViewMode, cartCount }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Order Online' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'events', label: 'Events' },
    { id: 'about', label: 'About & Gallery' },
    { id: 'contact', label: 'Contact & FAQ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-gold/15 shadow-sm text-darktext">
      {/* Utility Bar informing users about the Spec Console */}
      <div className="bg-forest text-cream font-mono text-[11px] py-1.5 px-4 text-center flex flex-col sm:flex-row justify-center items-center gap-2 relative">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-gold animate-spin" />
          <span>Fairy Cafe AntiGravity 3.1 Pro Interactive Prototype is Active.</span>
        </span>
        <button 
          onClick={() => setViewMode(viewMode === 'specs' ? 'site' : 'specs')}
          className="underline hover:text-gold text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
          id="utility-bar-toggle"
        >
          {viewMode === 'specs' ? '← Back to Live Site' : '⚡ Open Deliverables Specs Portal'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Block */}
          <div 
            onClick={() => { setViewMode('site'); setCurrentTab('home'); }}
            className="flex items-center gap-2 cursor-pointer group"
            id="brand-logo-container"
          >
            <div className="relative w-10 h-10 bg-forest rounded-full flex items-center justify-center shadow-fairy-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-sparkle">
              <span className="text-white text-base text-center leading-none text-magical flex items-center justify-center font-bold">✨</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-serif text-forest font-semibold tracking-tight leading-none group-hover:text-[#9BC1A3] transition-colors">
                Fairy Cafe
              </h1>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold/90 font-medium block mt-0.5 leading-none">
                Evergrove Cottage
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {viewMode === 'site' && (
            <nav className="hidden lg:flex items-center space-x-1.5" id="desktop-links-nav">
              {links.map((link) => (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-3 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${
                    currentTab === link.id
                      ? 'bg-forest/5 text-forest font-bold border-b border-forest'
                      : 'text-slate-600 hover:text-forest hover:bg-forest/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            
            {/* Spec Tracker Mode Toggle */}
            <button
              onClick={() => setViewMode(viewMode === 'specs' ? 'site' : 'specs')}
              id="header-spec-toggle"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all duration-200 cursor-pointer ${
                viewMode === 'specs'
                  ? 'bg-amber-500 text-slate-900 border-amber-600 font-bold shadow-magic'
                  : 'bg-slate-900 text-[#C7A774] border-slate-800 hover:bg-slate-850'
              }`}
              title="Toggle specifications/code deliverables view"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {viewMode === 'specs' ? 'Live Site' : 'Specs / Code'}
              </span>
            </button>

            {/* Live Shopping Cart */}
            {viewMode === 'site' && (
              <button
                onClick={() => setCurrentTab('order')}
                id="header-cart-btn"
                className="relative p-2.5 rounded-full text-forest hover:bg-forest/5 focus:outline-none focus:ring-2 focus:ring-[#6AA6A6] transition-colors"
                aria-label={`${cartCount} items in cart`}
              >
                <ShoppingBag className="w-5 h-5 focus:stroke-[#2E5941]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#1E9E6A] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold animate-pulse shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Primary Reserve Button */}
            {viewMode === 'site' && (
              <button
                onClick={() => setCurrentTab('reservations')}
                id="header-booking-cta"
                className="hidden md:inline-flex items-center gap-1.5 bg-forest text-cream hover:bg-opacity-90 px-5 py-2.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all shadow-fairy-sm active:scale-95"
              >
                <CalendarDays className="w-3.5 h-3.5 text-gold" />
                Reserve Table
              </button>
            )}

            {/* Mobile Hamburger Burger menu */}
            {viewMode === 'site' && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                id="mobile-nav-toggle"
                className="lg:hidden p-2 rounded-full text-forest hover:bg-forest/5 focus:outline-none focus:ring-2 focus:ring-[#6AA6A6]"
                aria-expanded={menuOpen}
                aria-label="Toggle navigation menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && viewMode === 'site' && (
        <div className="lg:hidden bg-cream border-t border-gold/15 p-4 space-y-2 animate-in slide-in-from-top-4 duration-200" id="mobile-menu-drawer">
          {links.map((link) => (
            <button
              key={link.id}
              id={`mobile-nav-link-${link.id}`}
              onClick={() => {
                setCurrentTab(link.id);
                setMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                currentTab === link.id
                  ? 'bg-forest text-cream font-bold'
                  : 'text-slate-600 hover:bg-forest/5 hover:text-forest'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-gold/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setCurrentTab('reservations');
                setMenuOpen(false);
              }}
              id="mobile-reserve-drawer-btn"
              className="w-full bg-forest text-cream py-3 rounded-full text-xs font-sans font-bold tracking-wider uppercase text-center block shadow-fairy-xs"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => {
                setCurrentTab('order');
                setMenuOpen(false);
              }}
              id="mobile-order-drawer-btn"
              className="w-full bg-[#FFFBF8] text-forest border border-forest/30 py-3 rounded-full text-xs font-sans font-bold tracking-wider uppercase text-center block"
            >
              Order Pickup/Delivery
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
