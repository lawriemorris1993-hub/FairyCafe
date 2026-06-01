/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, FormEvent } from 'react';
import { MENU_ITEMS } from './data/menu';
import { DELIVERABLES } from './data/deliverables';
import { MenuItem, CartItem, Reservation, OrderCheckout, AnalyticsEvent, FAQItem, CafeEvent } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsletterPopup from './components/NewsletterPopup';
import SpecsDashboard from './components/SpecsDashboard';

import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Coffee, 
  ShoppingBag, 
  X, 
  ChevronDown, 
  HelpCircle, 
  Info, 
  ArrowRight, 
  RotateCcw,
  Star,
  Check,
  Send,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Phone,
  Mail
} from 'lucide-react';

export default function App() {
  // Views
  const [viewMode, setViewMode] = useState<'site' | 'specs'>('site');
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Interactive Live State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState<string[]>([]);
  const [analyticsLogs, setAnalyticsLogs] = useState<AnalyticsEvent[]>([]);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Modal / Form States
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactReason, setContactReason] = useState('General Inquiry');
  const [contactMsg, setContactMsg] = useState('');
  const [contactFormError, setContactFormError] = useState('');

  // Active FAQ Accordion id
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Reservation Flow
  const [resName, setResName] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('2026-06-05');
  const [resTime, setResTime] = useState('12:00 PM');
  const [resParty, setResParty] = useState(2);
  const [resSeat, setResSeat] = useState<'indoor' | 'patio' | 'no-preference'>('no-preference');
  const [resNotes, setResNotes] = useState('');
  const [resOccasion, setResOccasion] = useState('');
  const [resDeposit, setResDeposit] = useState(false);
  const [resError, setResError] = useState('');
  const [resConfirmed, setResConfirmed] = useState<Reservation | null>(null);

  // Order Flow state
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [orderName, setOrderName] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [orderSlot, setOrderSlot] = useState('As soon as possible (15-20 mins)');
  const [orderTip, setOrderTip] = useState<number>(18); // percentage or absolute
  const [orderCustomTip, setOrderCustomTip] = useState('');
  const [orderSms, setOrderSms] = useState(true);
  const [orderPayment, setOrderPayment] = useState<'card' | 'apple-pay' | 'google-pay'>('card');
  const [orderError, setOrderError] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);
  
  // Custom modifiers during quick add
  const [modifyingItem, setModifyingItem] = useState<MenuItem | null>(null);
  const [chosenMilk, setChosenMilk] = useState('Oat Milk');
  const [extraRose, setExtraRose] = useState(false);
  const [fairySparkles, setFairySparkles] = useState(true);

  // RSVP state
  const [rsvpedEventId, setRsvpedEventId] = useState<string | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpParty, setRsvpParty] = useState(1);
  const [rsvpConfirmed, setRsvpConfirmed] = useState<string | null>(null);

  // Live Analytics Pixel Logger
  const logAnalytics = (eventName: string, parameters: Record<string, any>) => {
    const freshLog: AnalyticsEvent = {
      id: `ev-${Math.random().toString(36).substring(2, 11)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + '.' + String(new Date().getMilliseconds()).padStart(3, '0'),
      eventName,
      parameters
    };
    setAnalyticsLogs(prev => [freshLog, ...prev].slice(0, 50));
  };

  // Log page view when tabs shift
  useEffect(() => {
    logAnalytics('page_view', { 
      page_title: currentTab,
      view_mode: viewMode,
      url: `https://fairycafe.com/${currentTab}`
    });
    // Scroll to top
    window.scrollTo(0, 0);
  }, [currentTab, viewMode]);

  // Capture scrolling indicators for exit intent popup trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !hasScrolled) {
        setHasScrolled(true);
        logAnalytics('scroll_halfway', { threshold_percentage: 50 });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const toggleDietaryFilter = (tag: string) => {
    setSelectedDietaryFilters(prev => {
      const next = prev.includes(tag) ? prev.filter(f => f !== tag) : [...prev, tag];
      logAnalytics('filter_menu', { 
        active_tags: next, 
        toggle_tag: tag 
      });
      return next;
    });
  };

  // Interactive menu items filtered in real-time
  const filteredMenuItems = useMemo(() => {
    if (selectedDietaryFilters.length === 0) return MENU_ITEMS;
    return MENU_ITEMS.filter(item => 
      selectedDietaryFilters.some(filter => item.dietary.includes(filter as any))
    );
  }, [selectedDietaryFilters]);

  // Quick Cart calculation
  const subtotal = useMemo(() => {
    return cart.reduce((accum, curr) => accum + (curr.item.price * curr.quantity), 0);
  }, [cart]);

  const calculatedTipAmount = useMemo(() => {
    if (orderCustomTip) return parseFloat(orderCustomTip) || 0;
    return parseFloat((subtotal * (orderTip / 100)).toFixed(2)) || 0;
  }, [subtotal, orderTip, orderCustomTip]);

  const computedTax = useMemo(() => {
    return parseFloat((subtotal * 0.0825).toFixed(2));
  }, [subtotal]);

  const totalAmount = useMemo(() => {
    return parseFloat((subtotal + computedTax + calculatedTipAmount).toFixed(2));
  }, [subtotal, computedTax, calculatedTipAmount]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((accum, curr) => accum + curr.quantity, 0);
  }, [cart]);

  // Cart operations
  const handleAddToCart = (item: MenuItem, isQuick = true) => {
    if (isQuick && (item.category === 'Coffee' || item.category === 'Tea')) {
      // Prompt modifier wizard for drinks!
      setModifyingItem(item);
      return;
    }

    addToCartProcess(item, 1, []);
  };

  const addToCartProcess = (item: MenuItem, qty: number, mods: string[]) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(ci => ci.item.id === item.id && JSON.stringify(ci.selectedModifiers) === JSON.stringify(mods));
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += qty;
        return next;
      }
      return [...prev, { item, quantity: qty, selectedModifiers: mods }];
    });

    logAnalytics('add_to_cart', {
      item_id: item.id,
      item_name: item.name,
      category: item.category,
      price: item.price,
      quantity: qty,
      modifiers: mods
    });

    // Automatically transition to the order screen for better conversion feedback
    if (currentTab !== 'order') {
      setCurrentTab('order');
    }
    setModifyingItem(null);
  };

  const handleUpdateCartQty = (idx: number, delta: number) => {
    setCart(prev => {
      const next = [...prev];
      next[idx].quantity += delta;
      if (next[idx].quantity <= 0) {
        logAnalytics('remove_from_cart', {
          item_id: next[idx].item.id,
          item_name: next[idx].item.name
        });
        next.splice(idx, 1);
      } else {
        logAnalytics('update_cart_quantity', {
          item_id: next[idx].item.id,
          item_name: next[idx].item.name,
          new_qty: next[idx].quantity
        });
      }
      return next;
    });
  };

  // Submit reservations logic
  const handleBookTable = (e: FormEvent) => {
    e.preventDefault();
    setResError('');

    if (!resName || !resEmail || !resPhone) {
      setResError('Please complete all form fields so we can clear your table.');
      return;
    }

    if (!resDeposit && (resParty >= 6 || ['Saturday', 'Sunday'].some(d => resDate.includes(d) || true))) {
      // If weekend or large party, alert policy consent is required
      setResError('Please review and accept our deposit terms for weekend/large table reservations.');
      return;
    }

    const details: Reservation = {
      name: resName,
      email: resEmail,
      phone: resPhone,
      date: resDate,
      time: resTime,
      partySize: resParty,
      seatingPreference: resSeat,
      specialNotes: resNotes,
      occasion: resOccasion,
      acceptedDepositPolicy: resDeposit
    };

    setResConfirmed(details);
    logAnalytics('reserve_table_completed', {
      party_size: resParty,
      booking_date: resDate,
      booking_time: resTime,
      seating_preference: resSeat,
      has_occasion: !!resOccasion
    });
  };

  // Submit actual order checkouts
  const handleFinalCheckout = (e: FormEvent) => {
    e.preventDefault();
    setOrderError('');

    if (!orderName || !orderEmail || !orderPhone) {
      setOrderError('Please populate your name, email, and coordinates for pickup notification.');
      return;
    }

    if (orderType === 'delivery' && !orderAddress) {
      setOrderError('Please provide a physical delivery garden address.');
      return;
    }

    const tId = 'FC-' + Math.floor(100000 + Math.random() * 900000);
    const details = {
      transactionId: tId,
      name: orderName,
      email: orderEmail,
      phone: orderPhone,
      type: orderType,
      address: orderAddress,
      timeSlot: orderSlot,
      paymentMethod: orderPayment,
      tip: calculatedTipAmount,
      total: totalAmount,
      items: cart
    };

    setOrderConfirmed(details);
    logAnalytics('purchase_online', {
      transaction_id: tId,
      value: totalAmount,
      currency: 'USD',
      items_count: cart.length,
      delivery_type: orderType,
      tip_amount: calculatedTipAmount
    });

    // Flush cart
    setCart([]);
  };

  // Submit RSVP bookings
  const handleRsvpSubmit = (e: FormEvent, event: CafeEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) return;

    setRsvpConfirmed(event.id);
    logAnalytics('event_rsvp', {
      event_id: event.id,
      event_title: event.title,
      reserved_seats: rsvpParty,
      price_paid: event.price
    });
  };

  // Submit Contact requests
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactFormError('');

    if (!contactName || !contactEmail || !contactMsg) {
      setContactFormError('Please write your magical name, email, and message inquiry.');
      return;
    }

    setContactSubmitted(true);
    logAnalytics('lead_generation_newsletter', {
      source: 'contact_form_reason',
      value: contactReason,
      has_message: true
    });
  };

  return (
    <div className="bg-[#FFF7F2] min-h-screen text-darktext selection:bg-[#F4CFE0] selection:text-forest overflow-x-hidden antialiased flex flex-col justify-between">
      
      {/* Floating Sparkle Notifications */}
      <NewsletterPopup 
        onSignUp={(email) => {
          logAnalytics('lead_generation_newsletter', {
            source: 'popup_modal_exit_intent',
            discount_code: 'GARDEN10',
            recipient_email: email
          });
        }} 
      />

      {/* Main Structural Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        viewMode={viewMode} 
        setViewMode={setViewMode}
        cartCount={totalCartCount}
      />

      {/* RENDER MODAL CONTAINER: DRINK MODIFIERS */}
      {modifyingItem && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm" id="modifier-modal">
          <div className="bg-cream border border-gold/30 rounded-3xl p-6 max-w-md w-full relative shadow-2xl animate-in zoom-in-95 duration-200 text-darktext">
            <button 
              onClick={() => setModifyingItem(null)} 
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-forest/5 text-slate-400 hover:text-forest"
              id="close-mod-btn"
            >
              <X className="w-5 h-5" />
            </button>
            
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold text-center block">Signature Blend Customizer</span>
            <h4 className="text-xl font-serif text-forest font-semibold text-center mt-1">{modifyingItem.name}</h4>
            <p className="text-xs text-slate-500 text-center mt-1">{modifyingItem.description}</p>
            
            {/* Custom options */}
            <div className="space-y-4 mt-6">
              
              {/* Milk Options */}
              <div>
                <span className="text-xs font-mono text-slate-500 block mb-2 font-bold uppercase">Choice of Milk (Select One)</span>
                <div className="grid grid-cols-3 gap-2">
                  {['Oat Milk', 'Almond Milk', 'Coconut Milk'].map((milk) => (
                    <button
                      key={milk}
                      onClick={() => setChosenMilk(milk)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                        chosenMilk === milk 
                          ? 'bg-forest text-cream border-forest shadow-sm' 
                          : 'bg-white text-slate-700 border-gold/20 hover:border-forest/30'
                      }`}
                    >
                      {milk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extras checkbox */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono text-slate-500 block font-bold uppercase">Botanical Additions</span>
                
                <label className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-gold/15 cursor-pointer hover:bg-forest/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={extraRose}
                    onChange={(e) => setExtraRose(e.target.checked)}
                    className="accent-forest w-4 h-4"
                  />
                  <div className="text-xs leading-none">
                    <span className="font-semibold block text-[#2E5941]">Extra Rose Geranium Water (+$0.50)</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">Enhances biological floral undertones</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-gold/15 cursor-pointer hover:bg-forest/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={fairySparkles}
                    onChange={(e) => setFairySparkles(e.target.checked)}
                    className="accent-forest w-4 h-4"
                  />
                  <div className="text-xs leading-none">
                    <span className="font-semibold block text-[#2E5941]">Edible Golden Dust & Crystal Sugar (Free)</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">Perfect for matching Instagram optics</span>
                  </div>
                </label>
              </div>

            </div>

            <button
              onClick={() => {
                const finalMods = [chosenMilk];
                if (extraRose) finalMods.push('Extra Rose Water (+$0.50)');
                if (fairySparkles) finalMods.push('Gold Flake Sugar Sprinkles');
                
                const finalItem = {
                  ...modifyingItem,
                  price: extraRose ? modifyingItem.price + 0.50 : modifyingItem.price
                };
                addToCartProcess(finalItem, 1, finalMods);
              }}
              id="confirm-modifiers-btn"
              className="w-full bg-forest text-cream py-3 rounded-full text-xs font-sans font-bold uppercase tracking-widest mt-6 hover:shadow-sparkle transition-all"
            >
              Add to Basket
            </button>
          </div>
        </div>
      )}

      {/* CHANNELS ACCORDING TO VIEW MODE TOGGLE */}
      {viewMode === 'specs' ? (
        <main className="flex-1">
          <SpecsDashboard analyticsLogs={analyticsLogs} clearLogs={() => setAnalyticsLogs([])} />
        </main>
      ) : (
        <main className="flex-1">
          
          {/* ======================================= */}
          {/* SCREEN: HOME */}
          {/* ======================================= */}
          {currentTab === 'home' && (
            <div id="screen-home" className="space-y-16 pb-20 animate-in fade-in duration-300">
              
              {/* Giant Hero with soft rose backdrops */}
              <section className="relative bg-gradient-to-b from-[#FFFDFB] to-[#FFF7F2] pt-12 md:pt-20 pb-20 border-b border-gold/10">
                
                {/* Micro Ambient Glow elements */}
                <div className="absolute top-1/4 left-10 w-48 h-48 bg-[#F4CFE0]/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-[#9BC1A3]/25 rounded-full blur-3xl -z-10 animate-pulse"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    
                    {/* Left text column */}
                    <div className="space-y-6 md:max-w-xl">
                      
                      <div className="inline-flex items-center gap-2 bg-forest/5 border border-forest/15 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-forest tracking-wide">
                        <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
                        <span>Voted Best Cozy Escape in Evergrove</span>
                      </div>

                      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-forest tracking-tight leading-tight md:leading-[1.1]">
                        Coffee, pastries, and a little bit{" "}
                        <span className="italic relative font-medium text-magical text-emerald-800">Of magic.</span>
                      </h2>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Step into Fairy Cafe—where seasonal flavors, cozy nooks, and friendly smiles make every visit feel enchanted. Whimsical coffee, seasonal pastries, cozy brunch.
                      </p>

                      {/* Dual CTA buttons block */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center md:justify-start">
                        <button
                          onClick={() => setCurrentTab('reservations')}
                          id="hero-primary-cta"
                          className="w-full sm:w-auto bg-forest text-cream hover:bg-opacity-95 text-xs font-sans font-extrabold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform active:scale-95 hover:shadow-sparkle"
                        >
                          Reserve a Table
                        </button>
                        <button
                          onClick={() => setCurrentTab('order')}
                          id="hero-secondary-cta"
                          className="w-full sm:w-auto bg-white text-forest border border-forest/30 hover:border-forest hover:bg-forest/5 text-xs font-sans font-extrabold uppercase tracking-widest px-8 py-4 rounded-full transition-all text-center block active:scale-95"
                        >
                          Order Pickup or Delivery
                        </button>
                      </div>

                      {/* Ratings Trust snippet element */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center gap-2.5 justify-center md:justify-start text-xs border-t border-gold/10 mt-6 select-none">
                        <div className="flex items-center gap-1 text-[#C7A774]" id="trust-stars-list">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-4 h-4 fill-[#C7A774]" />
                          ))}
                        </div>
                        <span className="font-mono text-slate-500 font-bold block pb-1 md:pb-0">
                          4.8★ from 1,200+ happy guests
                        </span>
                        <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400 font-mono uppercase tracking-widest ml-4 border-l border-gold/20 pl-4">
                          <span>Cozy Spaces</span> &middot; <span>Gourmet Guide</span>
                        </div>
                      </div>

                    </div>

                    {/* Right column: Gorgeous large visual hero banner image of signature latte */}
                    <div className="relative">
                      
                      <div className="absolute inset-0 bg-[#FFFBF8] border border-gold/20 p-2.5 rounded-[40px] shadow-fairy-md transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <img 
                          src="https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?q=80&w=700" 
                          alt="Dusky pink double signature rose strawberry latte on an oak tabletop back-illuminated by soft glowing afternoon sunshine."
                          className="w-full h-[400px] object-cover rounded-[32px] select-none pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="absolute -bottom-5 -left-5 bg-white border border-gold/20 p-4 rounded-3xl shadow-lg flex items-center gap-3 max-w-xs animate-bounce" style={{ animationDuration: '4s' }}>
                        <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center font-bold">🥐</div>
                        <div>
                          <span className="font-serif font-bold block text-sm">Flaky Pistachio Tart</span>
                          <span className="text-[10px] uppercase font-mono text-gold font-bold">Baked Fresh Daily</span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </section>

              {/* Section: 3 USP Cards */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-2 mb-10">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C7A774] font-bold">The Cottage Experience</span>
                  <h3 className="text-3xl font-serif text-forest font-semibold leading-tight">Crafted with Whimsy, Brewed for Smiles</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="bg-white border border-gold/15 p-6 rounded-3xl shadow-fairy-sm hover:shadow-fairy-md hover:border-forest/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-forest/5 rounded-2xl flex items-center justify-center text-forest text-2xl mb-4 font-bold select-none">
                      ☕
                    </div>
                    <h4 className="font-serif text-lg text-forest font-bold mb-1.5">Locally roasted, fairy-smooth espresso</h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      We pull single-origin beans sourced collaboratively from fair-trade micro-lots. Brewed lovingly with flawless extraction limits.
                    </p>
                  </div>

                  <div className="bg-white border border-gold/15 p-6 rounded-3xl shadow-fairy-sm hover:shadow-fairy-md hover:border-forest/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-forest/5 rounded-2xl flex items-center justify-center text-forest text-2xl mb-4 font-bold select-none">
                      🌸
                    </div>
                    <h4 className="font-serif text-lg text-forest font-bold mb-1.5">Whimsical, seasonal pastries—baked fresh daily</h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      Delicate lavender treats, sweet botanical tarts, and flaky GF croissants rolled at dawn by our skilled artisan kitchen.
                    </p>
                  </div>

                  <div className="bg-white border border-gold/15 p-6 rounded-3xl shadow-fairy-sm hover:shadow-fairy-md hover:border-forest/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-forest/5 rounded-2xl flex items-center justify-center text-forest text-2xl mb-4 font-bold select-none">
                      🏡
                    </div>
                    <h4 className="font-serif text-lg text-forest font-bold mb-1.5">Cozy brunch, sunny patio, and friendly vibes</h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      Unwind amidst pressed ferns, hanging lanterns, and our secret cottage blooming garden. Families and furry familiars welcome.
                    </p>
                  </div>

                </div>
              </section>

              {/* Section: Interactive Seasonal Promo Banner with countdown! */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-forest rounded-[40px] text-cream p-8 md:p-12 relative overflow-hidden shadow-xl border border-gold/30">
                  
                  {/* Decorative background vines/leaves/gold sparkles */}
                  <div className="absolute top-0 right-0 p-4 text-[#FFF7F2]/10 select-none pointer-events-none transform translate-x-10 -translate-y-6">
                    <span className="text-9xl">✨</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
                    <div>
                      <span className="bg-gold/15 text-gold border border-gold/25 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest leading-none">
                        Now serving: Limited Summer Release
                      </span>
                      <h4 className="text-3xl md:text-4xl font-serif text-white font-bold tracking-tight leading-tight mt-3">
                        Summer Fairy Garden Menu Is Here!
                      </h4>
                      <p className="text-[#9BC1A3] text-sm leading-relaxed mt-2.5 max-w-md">
                        Feast on our seasonal Strawberry Rose Latte and lavender-infused Lemon-Verbena Tart. Crafted with ingredients gathered locally at dawn.
                      </p>

                      <div className="flex items-center gap-3 mt-6">
                        <button
                          onClick={() => {
                            setSelectedDietaryFilters(['GF']);
                            setCurrentTab('menu');
                          }}
                          id="promo-explore-cta"
                          className="bg-gold text-forest hover:bg-[#FFF7F2] font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-all outline-none"
                        >
                          Explore Garden Menu
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#FFF7F2]/5 rounded-3xl p-6 border border-white/10 text-center space-y-4 max-w-sm mx-auto lg:ml-auto">
                      <span className="font-mono text-[10px] text-gold uppercase tracking-wider block font-bold leading-none">Seasonal Pastries Remaining Today</span>
                      <div className="grid grid-cols-2 gap-2 text-center text-white">
                        <div className="bg-[#FFF7F2]/5 p-3 rounded-2xl border border-white/5">
                          <span className="text-3xl font-serif font-bold text-white block">4</span>
                          <span className="text-[9px] font-mono text-slate-300 uppercase">Rose Crepes Left</span>
                        </div>
                        <div className="bg-[#FFF7F2]/5 p-3 rounded-2xl border border-white/5">
                          <span className="text-3xl font-serif font-bold text-white block">7</span>
                          <span className="text-[9px] font-mono text-slate-300 uppercase">Verbena Tarts Left</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#9BC1A3] font-mono leading-none block">Replenished daily at 7:30 AM &middot; Fresh guarantee</span>
                    </div>

                  </div>
                </div>
              </section>

              {/* Section: Signature Carousel Showcase */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#C7A774] font-bold">Guest Favorites</span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-forest font-semibold leading-tight">Signature Delicacies</h3>
                  </div>
                  <button 
                    onClick={() => setCurrentTab('menu')}
                    className="text-xs uppercase text-forest font-bold font-mono tracking-widest flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    View Entire Menu <ChevronRight className="w-4 h-4 text-gold" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MENU_ITEMS.slice(0, 3).map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-3xl overflow-hidden border border-gold/15 shadow-fairy-sm hover:shadow-fairy-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="relative h-48 overflow-hidden select-none">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-[#FFF7F2] border border-gold/20 font-mono text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full">
                          +${item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h4 className="font-serif text-base text-forest font-bold leading-snug">{item.name}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
                        </div>
                        <div className="pt-4 flex items-center justify-between border-t border-gold/10 mt-4">
                          <span className="font-mono text-xs text-[#C7A774] font-semibold">{item.calories} Calories</span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="bg-forest text-cream hover:bg-[#9BC1A3] py-1.5 px-3.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold transition-all transform active:scale-95 cursor-pointer flex items-center gap-1"
                          >
                            Add +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Local SEO Map Card */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-gold/15 rounded-[40px] overflow-hidden shadow-fairy-md grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left Column Map graphic placeholder */}
                  <div className="lg:col-span-7 bg-[#FFFBF8]/40 h-[320px] lg:h-auto border-r border-gold/10 relative p-8 flex flex-col justify-between min-h-[300px]">
                    
                    {/* Custom aesthetic map layout sketch */}
                    <div className="absolute inset-0 bg-cream/40 flex items-center justify-center opacity-85 select-none pointer-events-none">
                      <div className="w-full h-full border-4 border-dashed border-gold/15 rounded-[32px] p-6 flex items-center justify-center relative overflow-hidden">
                        
                        {/* Fake roads background */}
                        <div className="absolute top-1/3 left-0 w-full h-1 bg-gold/10"></div>
                        <div className="absolute top-2/3 left-0 w-full h-1 bg-gold/10"></div>
                        <div className="absolute left-1/3 top-0 w-1 h-full bg-gold/10"></div>
                        
                        {/* Actual map pin indicator */}
                        <div className="relative text-center scale-110">
                          <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center shadow-fairy-md text-white animate-pulse">
                            ☕
                          </div>
                          <span className="font-serif font-bold text-xs mt-1 block tracking-tight text-forest">Fairy Cafe Cottage</span>
                        </div>

                      </div>
                    </div>

                    <div className="relative z-10">
                      <span className="bg-[#FFF7F2] border border-gold/20 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full text-[#C7A774] uppercase tracking-widest">
                        Interactive Maps Embed
                      </span>
                    </div>

                    {/* directions button trigger */}
                    <div className="relative z-10 flex gap-2">
                      <a 
                        href="https://google.com/maps" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-forest text-cream font-mono text-[11px] font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:shadow-glow transition-all"
                      >
                        <MapPin className="w-3.5 h-3.5" /> Direct G-Maps Pack
                      </a>
                    </div>

                  </div>

                  {/* Right Description Column */}
                  <div className="lg:col-span-5 p-8 md:p-10 space-y-6 flex flex-col justify-center">
                    <div className="space-y-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#C7A774] block font-bold leading-none">Find us in Evergrove</span>
                      <h3 className="text-2xl font-serif text-forest font-semibold leading-tight">The Garden Cottage</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Centered near Evergrove municipal garden path crossroads. Free dedicated 2-hour parking directly in the cottage garden rear field plots.
                      </p>
                    </div>

                    <div className="space-y-3 font-mono text-xs text-slate-600">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-darktext block font-sans">Physical Address:</strong>
                          <span>123 Willow Lane, Evergrove, ST 00000</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-darktext block font-sans">Peak Wait Times:</strong>
                          <span>Sat-Sun: 10:30am - 12:45pm (Reservations strongly suggested)</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gold/15 flex items-center gap-3">
                      <button 
                        onClick={() => setCurrentTab('reservations')}
                        className="text-xs font-sans text-forest hover:text-gold uppercase tracking-widest font-extrabold flex items-center gap-1"
                      >
                        Secure Table Seating Now <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </section>

            </div>
          )}

          {/* ======================================= */}
          {/* SCREEN: MENU */}
          {/* ======================================= */}
          {currentTab === 'menu' && (
            <div id="screen-menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300">
              
              {/* Menu Headers */}
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="font-mono text-xs uppercase tracking-widest text-[#C7A774] font-bold">Organic Craft Blend Menu</span>
                <h2 className="text-4xl font-serif text-forest font-semibold tracking-tight">Sip, nibble, linger</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  “Sip, nibble, linger—our menu is crafted for tiny delights and big smiles.” Choose from our magical lattes, local roasted cold-brews, botanical teas, or flourless pastries.
                </p>
              </div>

              {/* Filtering Controls */}
              <div className="bg-white border border-gold/15 p-4 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Allergy Legend list */}
                <div className="flex flex-wrap gap-2 justify-center" id="allergy-button-selectors">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center gap-1 mr-1">
                    <SlidersHorizontal className="w-3.5 h-3.5" /> Dietary Filters:
                  </span>
                  {[
                    { id: 'V', label: 'Vegan (V)' },
                    { id: 'GF', label: 'Gluten-Free (GF)' },
                    { id: 'DF', label: 'Dairy-Free (DF)' },
                    { id: 'N', label: 'Contains Nuts (N)' }
                  ].map((filter) => {
                    const isSelected = selectedDietaryFilters.includes(filter.id);
                    return (
                      <button
                        key={filter.id}
                        onClick={() => toggleDietaryFilter(filter.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer select-none transition-colors ${
                          isSelected 
                            ? 'bg-forest text-cream font-bold border border-forest' 
                            : 'bg-cream/40 text-slate-600 border border-gold/15 hover:border-forest/20'
                        }`}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                  {selectedDietaryFilters.length > 0 && (
                    <button
                      onClick={() => { setSelectedDietaryFilters([]); logAnalytics('filter_menu', { active_tags: [] }); }}
                      className="text-xs font-mono underline text-slate-400 hover:text-forest ml-2"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="text-xs font-mono text-slate-400">
                  Showing {filteredMenuItems.length} of {MENU_ITEMS.length} delicacies
                </div>
              </div>

              {/* Core Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="menu-items-grid">
                {filteredMenuItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white border border-gold/15 rounded-3xl overflow-hidden shadow-fairy-xs hover:shadow-fairy-sm transition-all duration-300 flex flex-col justify-between group"
                  >
                    
                    {/* Item Image */}
                    <div className="relative h-44 overflow-hidden select-none">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-[#FFF7F2] border border-gold/20 flex items-center gap-1.5 py-1 px-2.5 rounded-full font-mono text-[10px] font-extrabold text-[#C7A774]">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="absolute bottom-3 right-3 flex gap-1">
                        {item.dietary.map((d) => (
                          <span 
                            key={d} 
                            className="w-5 h-5 rounded-full font-mono text-[9px] font-bold bg-[#2E5941] text-[#FFF7F2] flex items-center justify-center border border-[#FFF7F2]/20"
                            title={`${d} Certified`}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description Block */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-serif text-base text-forest font-bold leading-tight">{item.name}</h3>
                          <span className="bg-sage/10 text-forest font-mono text-[9px] px-2 py-0.5 rounded border border-sage/15 uppercase font-bold tracking-wider">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">
                          {item.description}
                        </p>
                      </div>

                      <div className="border-t border-gold/10 pt-4 mt-4 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 text-[10px] font-semibold">{item.calories ? `${item.calories} Calories` : 'Nutrient Fresh'}</span>
                        <button
                          onClick={() => handleAddToCart(item)}
                          id={`add-btn-${item.id}`}
                          className="bg-forest text-cream hover:bg-[#9BC1A3] py-2 px-5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                        >
                          Add to Basket
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Menu Allergens notes block */}
              <div className="bg-white/40 rounded-3xl border border-gold/15 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-forest">Food Allergy Warning & Safeguards</h4>
                  <p className="text-slate-500 leading-relaxed max-w-2xl">
                    Our baristas serve with individual clean pitchers for oat, almond, or coconut milks. However, note that we share ovens and breadboards. If you hold severe physical celiac or tree nut sensitivities, let our cashier counter know.
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap" id="menu-legends-panels">
                  <span className="bg-[#2E5941] text-[#FFF7F2] font-mono text-[9.5px] px-2 py-1 rounded font-semibold border border-gold/10">V = Vegan (Plant components only)</span>
                  <span className="bg-[#2E5941] text-[#FFF7F2] font-mono text-[9.5px] px-2 py-1 rounded font-semibold border border-gold/10">GF = Gluten-Free</span>
                  <span className="bg-[#2E5941] text-[#FFF7F2] font-mono text-[9.5px] px-2 py-1 rounded font-semibold border border-gold/10">DF = Dairy-Free</span>
                </div>
              </div>

            </div>
          )}

          {/* ======================================= */}
          {/* SCREEN: ORDER ONLINE */}
          {/* ======================================= */}
          {currentTab === 'order' && (
            <div id="screen-order" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
              
              {/* Order Confirmation Screen */}
              {orderConfirmed ? (
                <div className="max-w-xl mx-auto bg-white border-2 border-[#1E9E6A]/30 rounded-[36px] overflow-hidden shadow-2xl p-8 md:p-10 space-y-6 text-center text-darktext">
                  <div className="mx-auto w-14 h-14 bg-success-state/10 text-[#1E9E6A] rounded-full flex items-center justify-center text-3xl font-bold animate-bounce">
                    ✨
                  </div>
                  
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#1E9E6A] font-bold">Transaction Confirmed</span>
                    <h2 className="text-3xl font-serif text-[#2E5941] font-bold tracking-tight">The cottage kitchen has received your order!</h2>
                    <p className="text-xs text-slate-500 font-mono">Invoice Number: <span className="font-bold text-darktext">{orderConfirmed.transactionId}</span></p>
                  </div>

                  {/* Summary card details */}
                  <div className="bg-[#FFF7F2] border border-gold/15 rounded-2xl p-5 text-left text-xs font-mono space-y-2.5">
                    <div className="flex justify-between border-b border-gold/10 pb-1.5">
                      <span>Order For:</span>
                      <span className="font-bold font-sans text-darktext">{orderConfirmed.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-gold/10 pb-1.5">
                      <span>Fulfillment Mode:</span>
                      <span className="font-bold font-sans uppercase text-darktext">{orderConfirmed.type}</span>
                    </div>
                    {orderConfirmed.type === 'delivery' && (
                      <div className="flex justify-between border-b border-gold/10 pb-1.5">
                        <span>Delivery Address:</span>
                        <span className="font-bold font-sans text-right max-w-[200px] text-darktext">{orderConfirmed.address}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-gold/10 pb-1.5">
                      <span>Target Time Window:</span>
                      <span className="font-bold font-sans text-darktext">{orderConfirmed.timeSlot}</span>
                    </div>
                    <div className="flex justify-between font-sans border-b border-gold/10 pb-1.5 text-xs">
                      <span>Interactive Tips:</span>
                      <span className="font-mono">${orderConfirmed.tip.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-sans font-extrabold text-sm text-forest pb-1">
                      <span>Grand Total Charged:</span>
                      <span className="font-mono">${orderConfirmed.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed text-center">
                    Check your email inbox at <span className="font-bold">{orderConfirmed.email}</span>. We've shot over a printable digital receipt containing progress alerts. If you gave SMS consent, we will text your phone on prep milestones!
                  </p>

                  <div className="pt-4 flex gap-3 text-center justify-center">
                    <button
                      onClick={() => setOrderConfirmed(null)}
                      className="bg-forest text-cream font-mono text-[11px] font-bold uppercase tracking-wider py-3 px-6 rounded-full"
                    >
                      Browse Recipes Again
                    </button>
                    <a
                      href="https://google.com/maps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FFFBF8] border border-gold/25 text-forest font-mono text-[11px] font-bold uppercase tracking-wider py-3 px-6 rounded-full flex items-center justify-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5" /> GPS Directions
                    </a>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  
                  {/* Left Column: Cart items basket & Form */}
                  <div className="lg:col-span-7 space-y-8">
                    
                    {/* Header */}
                    <div className="space-y-1">
                      <h2 className="text-3xl font-serif text-forest font-bold tracking-tight">Magical Ordering Console</h2>
                      <p className="text-slate-500 text-sm leading-normal">
                        Browse categories, load basket, choose tip coefficients, and clear transaction with modern secure methods!
                      </p>
                    </div>

                    {/* Integrated Basket overview */}
                    <div className="bg-white border border-gold/15 rounded-3xl p-6 shadow-fairy-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-gold/10 pb-3">
                        <h3 className="font-serif text-lg font-bold text-forest">Your Cottage Basket</h3>
                        <span className="text-[11px] font-mono text-slate-500">{totalCartCount} Delicacies</span>
                      </div>

                      {cart.length === 0 ? (
                        <div className="text-center py-10 space-y-3">
                          <ShoppingBag className="w-10 h-10 text-gold/30 mx-auto animate-bounce" />
                          <p className="text-sm font-semibold text-slate-400">Your basket is currently empty of delights.</p>
                          <button
                            onClick={() => setCurrentTab('menu')}
                            className="bg-forest text-cream py-2 px-5 rounded-full text-xs font-mono uppercase tracking-wider font-bold inline-block cursor-pointer"
                          >
                            Browse Food Menu
                          </button>
                        </div>
                      ) : (
                        <div className="divide-y divide-gold/10 space-y-4 pr-1">
                          {cart.map((item, idx) => (
                            <div key={idx} className="flex items-start justify-between gap-4 pt-3.5 first:pt-0">
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                  <strong className="text-sm font-semibold text-darktext block">{item.item.name}</strong>
                                  {item.selectedModifiers.length > 0 && (
                                    <span className="bg-sage/10 text-forest text-[9px] px-1.5 py-0.5 rounded font-mono">Custom</span>
                                  )}
                                </div>
                                {item.selectedModifiers.length > 0 && (
                                  <div className="text-[10px] text-slate-400 font-mono">
                                    Adds: {item.selectedModifiers.join(', ')}
                                  </div>
                                )}
                                <span className="text-xs font-mono font-bold text-gold inline-block mt-0.5">
                                  ${item.item.price.toFixed(2)} each
                                </span>
                              </div>

                              <div className="flex items-center gap-2.5">
                                <button
                                  onClick={() => handleUpdateCartQty(idx, -1)}
                                  className="w-7 h-7 bg-[#FFF7F2] border border-gold/20 hover:border-forest/20 text-slate-700 font-mono text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer select-none"
                                >
                                  -
                                </button>
                                <span className="font-mono text-xs text-darktext align-middle">{item.quantity}</span>
                                <button
                                  onClick={() => handleUpdateCartQty(idx, 1)}
                                  className="w-7 h-7 bg-[#FFF7F2] border border-gold/20 hover:border-forest/20 text-slate-700 font-mono text-xs font-bold rounded-lg flex items-center justify-center cursor-pointer select-none"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Simple Checkout Form block (Hidden if cart is empty to boost UX flow) */}
                    {cart.length > 0 && (
                      <form onSubmit={handleFinalCheckout} className="bg-white border border-gold/15 rounded-3xl p-6 shadow-fairy-sm space-y-5" id="checkout-form">
                        <h3 className="font-serif text-lg font-bold text-forest border-b border-gold/10 pb-2.5">Fulfillment Details</h3>

                        <div className="grid grid-cols-2 gap-3.5 text-xs font-mono">
                          <button
                            type="button"
                            onClick={() => { setOrderType('pickup'); logAnalytics('order_type_change', { val: 'pickup' }); }}
                            className={`py-3.5 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                              orderType === 'pickup' ? 'bg-forest text-[#FFF7F2] border-forest shadow' : 'bg-transparent text-slate-500 border-gold/20 hover:border-forest/20'
                            }`}
                          >
                            Fast Cottage Pickup
                          </button>
                          <button
                            type="button"
                            onClick={() => { setOrderType('delivery'); logAnalytics('order_type_change', { val: 'delivery' }); }}
                            className={`py-3.5 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                              orderType === 'delivery' ? 'bg-forest text-[#FFF7F2] border-forest shadow' : 'bg-transparent text-slate-500 border-gold/20 hover:border-forest/20'
                            }`}
                          >
                            Local Town Delivery
                          </button>
                        </div>

                        {/* General Inputs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="order-name" className="text-xs font-mono font-bold text-slate-500 block mb-1 uppercase">Full Name</label>
                            <input
                              type="text"
                              id="order-name"
                              placeholder="E.g., Audrey Glen"
                              value={orderName}
                              onChange={(e) => setOrderName(e.target.value)}
                              className="w-full bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 text-xs outline-none focus:border-focus focus:ring-1 focus:ring-focus h-12"
                            />
                          </div>

                          <div>
                            <label htmlFor="order-email" className="text-xs font-mono font-bold text-slate-500 block mb-1 uppercase">Email address</label>
                            <input
                              type="email"
                              id="order-email"
                              placeholder="audrey@gmail.com"
                              value={orderEmail}
                              onChange={(e) => setOrderEmail(e.target.value)}
                              className="w-full bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 text-xs outline-none focus:border-focus focus:ring-1 focus:ring-focus h-12"
                            />
                          </div>

                          <div>
                            <label htmlFor="order-phone" className="text-xs font-mono font-bold text-slate-500 block mb-1 uppercase">Phone Number</label>
                            <input
                              type="tel"
                              id="order-phone"
                              placeholder="(555) 012-3456"
                              value={orderPhone}
                              onChange={(e) => setOrderPhone(e.target.value)}
                              className="w-full bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 text-xs outline-none focus:border-focus focus:ring-1 focus:ring-focus h-12"
                            />
                          </div>

                          <div>
                            <label htmlFor="order-slot" className="text-xs font-mono font-bold text-slate-500 block mb-1 uppercase">Fulfillment Window</label>
                            <select
                              id="order-slot"
                              value={orderSlot}
                              onChange={(e) => setOrderSlot(e.target.value)}
                              className="w-full bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 text-xs outline-none focus:border-focus focus:ring-1 focus:ring-focus h-12"
                            >
                              <option>As soon as possible (15-20 mins)</option>
                              <option>In 30 Minutes</option>
                              <option>In 1 Hour</option>
                              <option>Choose Afternoon Tea slot (3:15 PM)</option>
                            </select>
                          </div>
                        </div>

                        {orderType === 'delivery' && (
                          <div className="animate-in slide-in-from-top-2 duration-150">
                            <label htmlFor="order-address" className="text-xs font-mono font-bold text-slate-500 block mb-1 uppercase">Cottage Delivery Address</label>
                            <textarea
                              id="order-address"
                              placeholder="Street name, suite, coordinates..."
                              value={orderAddress}
                              onChange={(e) => setOrderAddress(e.target.value)}
                              className="w-full bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 text-xs outline-none focus:border-focus focus:ring-1 focus:ring-focus min-h-16"
                              required
                            />
                          </div>
                        )}

                        {/* Payment selection */}
                        <div>
                          <span className="text-xs font-mono text-slate-500 block mb-2 font-bold uppercase">Payment Instrument</span>
                          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                            {[
                              { id: 'card', label: 'Credit Card' },
                              { id: 'apple-pay', label: 'Apple Pay' },
                              { id: 'google-pay', label: 'Google Pay' }
                            ].map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => setOrderPayment(p.id as any)}
                                className={`py-3.5 rounded-xl border text-center transition-all cursor-pointer font-bold ${
                                  orderPayment === p.id ? 'bg-forest text-[#FFF7F2] border-forest' : 'bg-transparent text-slate-500 border-gold/20 hover:border-forest/20'
                                }`}
                              >
                                {p.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Tip coefficient selection */}
                        <div className="border-t border-gold/10 pt-4">
                          <span className="text-xs font-mono text-slate-500 block mb-2 font-bold uppercase">Support our fairy crew (Tip)</span>
                          <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                            {[15, 18, 20].map((percentage) => (
                              <button
                                key={percentage}
                                type="button"
                                onClick={() => { setOrderTip(percentage); setOrderCustomTip(''); }}
                                className={`py-2 rounded-xl border text-center transition-all cursor-pointer font-semibold ${
                                  orderTip === percentage && !orderCustomTip ? 'bg-forest text-[#FFF7F2] border-forest' : 'bg-transparent text-slate-500 border-gold/15 hover:border-forest/20'
                                }`}
                              >
                                {percentage}%
                              </button>
                            ))}
                            <input
                              type="number"
                              placeholder="Custom"
                              value={orderCustomTip}
                              onChange={(e) => { setOrderCustomTip(e.target.value); setOrderTip(0); }}
                              className="bg-cream border border-gold/15 rounded-xl text-center text-xs outline-none focus:border-focus"
                            />
                          </div>
                        </div>

                        {/* SMS consent checklist */}
                        <label className="flex items-start gap-2.5 cursor-pointer bg-[#FFFBF8]/50 p-3 rounded-2xl border border-gold/15">
                          <input
                            type="checkbox"
                            checked={orderSms}
                            onChange={(e) => setOrderSms(e.target.checked)}
                            className="accent-forest w-4 h-4 mt-0.5 shrink-0"
                          />
                          <span className="text-[11px] text-slate-500 leading-normal">
                            I consent to receive automatic progress message notifications (SMS) compiled by Fairy Cafe. Messaging rates apply. Unsubscribe any time.
                          </span>
                        </label>

                        {orderError && (
                          <div className="text-xs text-error-state font-mono flex items-center gap-1.5" role="alert">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{orderError}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          id="checkout-submit"
                          className="w-full bg-forest text-cream font-sans font-semibold text-sm uppercase tracking-widest py-4 rounded-full hover:shadow-sparkle transition-all transform active:scale-95"
                        >
                          Complete Secure Transaction (${totalAmount.toFixed(2)})
                        </button>
                      </form>
                    )}

                  </div>

                  {/* Right Column: Calculations overview card */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-cream border-2 border-gold/30 rounded-[32px] p-6 shadow-md text-darktext space-y-5">
                      <h3 className="font-serif text-lg font-bold text-forest border-b border-gold/15 pb-2">Order Calculations Summary</h3>
                      
                      <div className="space-y-2.5 font-mono text-xs text-slate-500 border-b border-gold/10 pb-4">
                        <div className="flex justify-between">
                          <span>Subtotal amount:</span>
                          <span className="font-bold text-darktext">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Local state taxes (8.25%):</span>
                          <span className="font-bold text-darktext">${computedTax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Crew Tips added:</span>
                          <span className="font-bold text-darktext">${calculatedTipAmount.toFixed(2)}</span>
                        </div>
                        {orderType === 'delivery' && (
                          <div className="flex justify-between">
                            <span>Delivery fee:</span>
                            <span className="text-emerald-600 font-bold">FREE ($0.00)</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between font-serif font-black text-lg text-forest pt-1">
                        <span>Grand Total:</span>
                        <span className="font-mono">${totalAmount.toFixed(2)}</span>
                      </div>

                      <div className="bg-white p-3 rounded-2xl border border-gold/15 text-[11px] text-slate-500 leading-normal flex items-start gap-2 select-none">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>Transactions secured utilizing modern client-side standards. No raw details leave this application. Stripe/Apple-Pay compliant.</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ======================================= */}
          {/* SCREEN: RESERVATIONS */}
          {/* ======================================= */}
          {currentTab === 'reservations' && (
            <div id="screen-reservations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
              
              {/* Confirmed Ticket Receipt display */}
              {resConfirmed ? (
                <div className="max-w-xl mx-auto bg-white border-2 border-[#1E9E6A]/30 rounded-[36px] overflow-hidden shadow-2xl p-8 md:p-10 space-y-6 text-center text-darktext">
                  <div className="mx-auto w-14 h-14 bg-success-state/10 text-success-state rounded-full flex items-center justify-center text-3xl font-bold animate-bounce">
                    🥀
                  </div>

                  <div className="space-y-1">
                    <span className="bg-success-state/15 text-success-state border border-success-state/25 font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest leading-none">
                      Table Booking Locked
                    </span>
                    <h2 className="text-3xl font-serif text-forest font-bold mt-2">See you in the garden, {resConfirmed.name}!</h2>
                    <p className="text-xs text-slate-500 font-mono">Reference Code: <span className="font-bold text-darktext">T-RE{Math.floor(100+Math.random()*900)}</span></p>
                  </div>

                  {/* Receipt table stats */}
                  <div className="bg-[#FFF7F2] border border-gold/15 rounded-2xl p-5 text-left text-xs font-mono space-y-2.5">
                    <div className="flex justify-between border-b border-gold/10 pb-1.5 font-sans">
                      <span>Date Scheduled:</span>
                      <span className="font-bold text-darktext font-mono">{resConfirmed.date}</span>
                    </div>
                    <div className="flex justify-between border-b border-gold/10 pb-1.5 font-sans">
                      <span>Arrival Target:</span>
                      <span className="font-bold text-darktext font-mono">{resConfirmed.time}</span>
                    </div>
                    <div className="flex justify-between border-b border-gold/10 pb-1.5 font-sans">
                      <span>Party Capacity:</span>
                      <span className="font-bold text-darktext font-mono">{resConfirmed.partySize} Guests</span>
                    </div>
                    <div className="flex justify-between font-sans">
                      <span>Zone Assigned:</span>
                      <span className="font-bold text-[#2E5941] capitalize">{resConfirmed.seatingPreference} Room</span>
                    </div>
                  </div>

                  {/* Micro diagrams of reserved table spots */}
                  <div className="border border-gold/15 rounded-xl p-3 text-[11px] text-slate-500 leading-normal bg-[#FFFBF8] select-none">
                    <span className="font-semibold block text-forest font-sans">Garden Cottage Table Map:</span>
                    <div className="flex justify-center gap-2 mt-2">
                      <div className="bg-forest text-cream font-mono px-2 py-1 rounded border border-forest font-bold">Cottage T-4</div>
                      <div className="bg-gold/15 text-[#C7A774] font-mono px-2 py-1 rounded border border-gold/25">Tea Gazebo</div>
                      <div className="bg-gold/15 text-[#C7A774] font-mono px-2 py-1 rounded border border-gold/25">Sunny Bench</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed text-center">
                    “Running late? We’ll hold your table for 10 minutes.” We’ve dispatched an email receipt featuring your booking confirmation code. To customize adjustments, dial <span className="font-bold">(000) 555-0123</span>.
                  </p>

                  <div className="pt-4 flex gap-2.5 justify-center">
                    <button
                      onClick={() => setResConfirmed(null)}
                      className="bg-forest text-cream font-mono text-[11px] font-bold uppercase tracking-wider py-3 px-6 rounded-full"
                    >
                      Hold Another Spot
                    </button>
                    <button
                      onClick={() => setCurrentTab('menu')}
                      className="bg-transparent border border-forest/30 text-forest font-mono text-[11px] font-bold uppercase tracking-wider py-3 px-6 rounded-full hover:bg-forest/5"
                    >
                      Pre-order Food
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  
                  {/* Left Column Form: reservations details */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-3xl font-serif text-forest font-black tracking-tight">Reserve your moment of magic.</h2>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Secure table seating under the illuminated lanterns at our flagship Evergrove Cottage. We accommodate dates, family feasts, or whimsical tea.
                      </p>
                    </div>

                    <form onSubmit={handleBookTable} className="bg-white border border-gold/15 rounded-[32px] p-6 shadow-fairy-sm space-y-5" id="reservations-form">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                        
                        <div>
                          <label htmlFor="res-name" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Your Full Name</label>
                          <input
                            type="text"
                            id="res-name"
                            placeholder="I.e., Linnea Glen"
                            value={resName}
                            onChange={(e) => setResName(e.target.value)}
                            className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 h-12 w-full text-xs font-sans text-darktext outline-none focus:border-focus"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="res-email" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Contact Email</label>
                          <input
                            type="email"
                            id="res-email"
                            placeholder="linnea@gmail.com"
                            value={resEmail}
                            onChange={(e) => setResEmail(e.target.value)}
                            className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 h-12 w-full text-xs font-sans text-darktext outline-none focus:border-focus"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="res-phone" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Phone Number</label>
                          <input
                            type="tel"
                            id="res-phone"
                            placeholder="(000) 555-0123"
                            value={resPhone}
                            onChange={(e) => setResPhone(e.target.value)}
                            className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 h-12 w-full text-xs font-sans text-darktext outline-none focus:border-focus"
                            required
                          />
                        </div>

                        {/* Party size indicator */}
                        <div>
                          <label htmlFor="res-party" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Guest party size</label>
                          <select
                            id="res-party"
                            value={resParty}
                            onChange={(e) => setResParty(parseInt(e.target.value))}
                            className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 h-12 w-full text-xs font-sans text-darktext outline-none focus:border-focus"
                          >
                            <option value="1">1 Person (Quiet cottage bench)</option>
                            <option value="2">2 Guests (Whimsical corner nook)</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests (Standard family table)</option>
                            <option value="6">6 Guests (Spacious rose patio)</option>
                            <option value="8">8 Guests (Full-party booking)</option>
                          </select>
                        </div>

                        {/* Date selection */}
                        <div>
                          <label htmlFor="res-date" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Target Date</label>
                          <input
                            type="date"
                            id="res-date"
                            value={resDate}
                            onChange={(e) => setResDate(e.target.value)}
                            className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 h-12 w-full text-xs font-sans text-darktext outline-none focus:border-focus"
                            required
                          />
                        </div>

                        {/* Hours selection */}
                        <div>
                          <label htmlFor="res-time" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Target Time Window</label>
                          <select
                            id="res-time"
                            value={resTime}
                            onChange={(e) => setResTime(e.target.value)}
                            className="bg-[#FFFBF8] border border-[#C7A774]/30 rounded-xl p-3 h-12 w-full text-xs font-sans text-darktext outline-none focus:border-[#6AA6A6]"
                          >
                            <option>8:00 AM (Early flower dawn)</option>
                            <option>10:15 AM (Brunch rush)</option>
                            <option>12:00 PM (Linger long lunch)</option>
                            <option>2:30 PM (Quiet study hour)</option>
                            <option>4:15 PM (Botanical afternoon tea)</option>
                            <option>6:00 PM (Lantern sunset glow)</option>
                          </select>
                        </div>

                        {/* Seating preference room */}
                        <div>
                          <label htmlFor="res-seat" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Seating preferences</label>
                          <select
                            id="res-seat"
                            value={resSeat}
                            onChange={(e) => setResSeat(e.target.value as any)}
                            className="bg-[#FFFBF8] border border-[#C7A774]/30 rounded-xl p-3 h-12 w-full text-xs font-sans text-darktext outline-none focus:border-[#6AA6A6]"
                          >
                            <option value="no-preference">No preference (Quickest seating)</option>
                            <option value="indoor">Cottage interior (Pressed-ferns & cozy books)</option>
                            <option value="patio">Sunny cottage patio (Adjacent to wild vines)</option>
                          </select>
                        </div>

                        {/* Occasion details */}
                        <div>
                          <label htmlFor="res-occasion" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Special celebration?</label>
                          <select
                            id="res-occasion"
                            value={resOccasion}
                            onChange={(e) => setResOccasion(e.target.value)}
                            className="bg-[#FFFBF8] border border-[#C7A774]/30 rounded-xl p-3 h-12 w-full text-xs font-sans text-darktext outline-none focus:border-[#6AA6A6]"
                          >
                            <option value="">No special occasion</option>
                            <option value="Birthday">Birthday garden feast</option>
                            <option value="Anniversary">Anniversary tea date</option>
                            <option value="Family celebration">Family celebration getaway</option>
                          </select>
                        </div>

                      </div>

                      {/* Area notes with nice microcopy prompts */}
                      <div>
                        <label htmlFor="res-notes" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Any specific wishes, notes or accommodations?</label>
                        <textarea
                          id="res-notes"
                          placeholder="“Need a high chair? Tell us in the notes.” Or vegetarian dietary preferences..."
                          value={resNotes}
                          onChange={(e) => setResNotes(e.target.value)}
                          className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 w-full text-xs font-sans text-darktext outline-none focus:border-focus min-h-16"
                        />
                      </div>

                      {/* Deposit policy consent section */}
                      <div className="bg-[#FFFBF8] shadow-inner p-4 rounded-2xl border border-gold/15 space-y-2.5">
                        <span className="font-serif font-bold text-xs text-forest block">Deposit & Lateness Policy:</span>
                        <p className="text-[10px] leading-normal text-slate-500">
                          To protect our botanical settings and tiny crew, weekend nooks are locked with a simulated secure card hold. &ldquo;Running late? We&rsquo;ll hold your table for 10 minutes.&rdquo;
                        </p>
                        <label className="flex items-center gap-2.5 cursor-pointer mt-1">
                          <input
                            type="checkbox"
                            checked={resDeposit}
                            onChange={(e) => setResDeposit(e.target.checked)}
                            className="accent-forest w-4 h-4 shrink-0"
                            required
                          />
                          <span className="text-[10px] text-slate-600 font-semibold leading-tight">
                            I understand and accept the deposit hold terms and 10-minute hold limits.
                          </span>
                        </label>
                      </div>

                      {resError && (
                        <div className="text-xs text-error-state font-mono flex items-center gap-1.5" role="alert">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{resError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        id="reservations-submit"
                        className="w-full bg-forest text-cream py-4 rounded-full font-sans font-bold text-xs uppercase tracking-widest hover:shadow-sparkle transition-all transform active:scale-95"
                      >
                        Lock in booking target
                      </button>
                    </form>

                  </div>

                  {/* Right Column: peak times wait chart and transit guides */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Peak hours widget */}
                    <div className="bg-cream border-2 border-[#C7A774]/30 rounded-[32px] p-6 shadow-md text-darktext space-y-4">
                      <h3 className="font-serif text-lg font-bold text-forest border-b border-[#C7A774]/15 pb-2 inline-flex items-center gap-1.5">
                        <Users className="w-4 h-4" /> Flagship Peak Waiting Guides
                      </h3>
                      <p className="text-xs text-slate-500 leading-normal">
                        To bypass long wait queues, inspect our estimated peak hours below for our flagship Evergrove Cottage:
                      </p>

                      <div className="space-y-2.5 pt-2">
                        {[
                          { day: 'Mon - Thu', status: 'Moderate wait periods (10-15 mins)', color: 'bg-[#1E9E6A]/20 text-[#1E9E6A]' },
                          { day: 'Friday Evening', status: 'Peak cozy rush hour (15-30 mins)', color: 'bg-amber-500/20 text-amber-700' },
                          { day: 'Saturday Brunch', status: 'Extremely busy period (Booking advised)', color: 'bg-[#C0392B]/10 text-red-500' },
                          { day: 'Sunday All-Day', status: 'High family crowding (Booking advised)', color: 'bg-[#C0392B]/10 text-red-500' }
                        ].map((wk, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs leading-none">
                            <span className="font-mono font-semibold">{wk.day}</span>
                            <span className={`px-2.5 py-1 rounded font-mono text-[9px] font-bold ${wk.color}`}>{wk.status}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-gold/15 text-[11px] text-slate-400 font-sans leading-normal">
                        Note: We reserve 35% of cottage tables for random walk-in garden friends. If bookings are full, lingering guests can sign our local physical clipboard out front.
                      </div>
                    </div>

                    {/* Stroller information card */}
                    <div className="bg-white p-5 rounded-2xl border border-gold/15 space-y-2 text-xs">
                      <h4 className="font-serif font-bold text-forest">Accompaniments & Accessibility</h4>
                      <p className="text-slate-500 leading-normal text-[11px]">
                        Looking for high chairs, floral wheelchair ramps or dog-bowls? Mention it clearly in your reservation forms and details! Our cottage coordinates ramp access to restrooms and outdoor spaces.
                      </p>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* ======================================= */}
          {/* SCREEN: EVENTS */}
          {/* ======================================= */}
          {currentTab === 'events' && (
            <div id="screen-events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-300">
              
              {/* Event Landing headers */}
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="font-mono text-xs uppercase tracking-widest text-[#C7A774] font-bold">Upcoming Cottage Calendar</span>
                <h2 className="text-4xl font-serif text-forest font-semibold tracking-tight">Make it a fairy-tale afternoon.</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Join us for fairy tea parties, secret acoustic folk music nights, and children&rsquo;s wand cookie crafting workshops in our lantern-lit cottage garden.
                </p>
              </div>

              {/* RSVP Tickets Receipt */}
              {rsvpConfirmed && (
                <div className="max-w-md mx-auto bg-white border border-gold/25 rounded-3xl p-6 text-center text-darktext space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 bg-success-state/10 text-success-state rounded-full flex items-center justify-center text-2xl mx-auto animate-bounce">
                    🎟️
                  </div>
                  <h3 className="text-xl font-serif text-forest font-bold">You are registered!</h3>
                  <p className="text-xs text-slate-500 font-mono">Receipt Code: <span className="font-bold text-darktext">EV-TICK{Math.floor(1000+Math.random()*9000)}</span></p>
                  
                  <div className="bg-[#FFF7F2] p-4 rounded-xl border border-gold/15 text-xs text-left font-mono space-y-1.5">
                    <div><strong>Guest:</strong> {rsvpName}</div>
                    <div><strong>Confirmed Email:</strong> {rsvpEmail}</div>
                    <div><strong>Spots Selected:</strong> {rsvpParty} tickets</div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal">
                    Check your email inbox shortly. We've dispatched a digital ticket displaying your entry barcode. If ticket pricing applies, it will be added to your booking file.
                  </p>

                  <button
                    onClick={() => { setRsvpConfirmed(null); setRsvpedEventId(null); }}
                    className="w-full bg-forest text-[#FFF7F2] font-mono text-xs uppercase font-bold py-2.5 rounded-full"
                  >
                    Clear Confirmation
                  </button>
                </div>
              )}

              {/* Event Listings Grid */}
              {!rsvpConfirmed && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {DELIVERABLES.events.map((evt) => (
                    <div 
                      key={evt.id} 
                      className="bg-white rounded-3xl overflow-hidden border border-gold/15 shadow-fairy-sm hover:shadow-fairy-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="relative h-48 select-none overflow-hidden">
                        <img 
                          src={evt.image} 
                          alt={evt.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-y-0 inset-x-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-4 text-white">
                          <span className="font-mono text-xs text-gold font-bold block">{evt.date}</span>
                          <span className="font-serif text-base font-bold text-white block mt-0.5">{evt.title}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                        <div className="space-y-2">
                          <div className="flex justify-between font-mono text-[10px] text-[#C7A774] font-bold border-b border-gold/10 pb-1.5">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {evt.time}</span>
                            <span>{evt.price}</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed font-sans">{evt.description}</p>
                        </div>

                        {/* Event RSVP trigger buttons */}
                        <div className="border-t border-gold/10 pt-4">
                          {rsvpedEventId === evt.id ? (
                            <form onSubmit={(e) => handleRsvpSubmit(e, evt)} className="space-y-2">
                              <input
                                type="text"
                                placeholder="Your Name"
                                value={rsvpName}
                                onChange={(e) => setRsvpName(e.target.value)}
                                className="bg-[#FFFBF8] border border-gold/20 rounded-xl px-3 py-1.5 text-xs w-full outline-none"
                                required
                              />
                              <input
                                type="email"
                                placeholder="Your Email"
                                value={rsvpEmail}
                                onChange={(e) => setRsvpEmail(e.target.value)}
                                className="bg-[#FFFBF8] border border-gold/20 rounded-xl px-3 py-1.5 text-xs w-full outline-none"
                                required
                              />
                              <div className="flex gap-2">
                                <select
                                  value={rsvpParty}
                                  onChange={(e) => setRsvpParty(parseInt(e.target.value))}
                                  className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-1 text-xs outline-none flex-1"
                                >
                                  <option value="1">1 Ticket</option>
                                  <option value="2">2 Tickets</option>
                                  <option value="4">4 Tickets</option>
                                </select>
                                <button
                                  type="submit"
                                  id={`rsvp-submit-${evt.id}`}
                                  className="bg-forest text-cream py-1.5 px-4 rounded-xl text-[10px] uppercase font-mono tracking-wider font-bold"
                                >
                                  Confirm
                                </button>
                              </div>
                            </form>
                          ) : (
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-mono text-[#C0392B] font-bold tracking-tight text-[10px] uppercase">{evt.capacityLeft} spots left!</span>
                              <button
                                onClick={() => { setRsvpedEventId(evt.id); logAnalytics('click_ticket_details', { event_id: evt.id }); }}
                                className="bg-forest text-cream hover:bg-[#9BC1A3] py-2 px-5 rounded-full text-[10px] font-bold uppercase tracking-widest font-sans transform active:scale-95 transition-all text-center"
                              >
                                Save my spot
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ======================================= */}
          {/* SCREEN: ABOUT & GALLERY */}
          {/* ======================================= */}
          {currentTab === 'about' && (
            <div id="screen-about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-in fade-in duration-300">
              
              {/* Brand story */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-5 relative">
                  <div className="absolute inset-0 bg-[#FFFBF8] border border-gold/15 p-2 rounded-[32px] transform -rotate-1">
                    <img 
                      src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600" 
                      alt="Close-up selective focus photography showcasing freshly piped berry meringues set on a rustic oak serving tray."
                      className="w-full h-[400px] object-cover rounded-[24px] select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C7A774] font-bold">About our garden</span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-forest font-semibold tracking-tight leading-tight">Made with care, served with wonder.</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    “We’re an independent cafe brewing joy with locally roasted beans, seasonal bakes, and a team who knows your name.” Established in the quiet crossroads of Evergrove, we represent a botanical sanctuary connecting community, coffee crops, and confectionery art.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-white border border-gold/15 p-4 rounded-2xl">
                      <span className="font-bold text-forest block font-serif text-sm">100% Sourced Honestly</span>
                      <p className="text-slate-500 leading-normal text-[11.5px] mt-1">Our coffee beans are imported collaboratively from fully transparent shade-grown micro-lots, ensuring fair payments to farmers.</p>
                    </div>
                    <div className="bg-white border border-[#C7A774]/15 p-4 rounded-2xl">
                      <span className="font-bold text-forest block font-serif text-sm">Community Gardens</span>
                      <p className="text-slate-500 leading-normal text-[11.5px] mt-1">All our botanical tea herbs (mint, elderflower, rose geranium leaves) are plucked fresh from our patio planters.</p>
                    </div>
                  </div>
                </div>

              </section>

              {/* Sourcing and metrics section */}
              <section className="bg-forest rounded-[36px] p-8 md:p-12 text-cream border border-gold/25 shadow-xl relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center relative z-10 font-serif">
                  <div className="space-y-1">
                    <span className="text-4xl font-black text-gold">100%</span>
                    <strong className="block text-sm font-sans uppercase tracking-wider text-slate-200">Fair Trade & Organic Cocoa</strong>
                  </div>
                  <div className="space-y-1 border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0">
                    <span className="text-4xl font-black text-gold">Zero</span>
                    <strong className="block text-sm font-sans uppercase tracking-wider text-slate-200">Single-use Plastic Cups</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="text-4xl font-black text-gold">1/2 Mile</span>
                    <strong className="block text-sm font-sans uppercase tracking-wider text-slate-200">Sourcing radius for dairy / oats</strong>
                  </div>
                </div>
              </section>

              {/* Image gallery grid */}
              <section className="space-y-6">
                <div className="text-center">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C7A774] font-bold">Pressed memories</span>
                  <h3 className="text-3xl font-serif text-forest font-semibold mt-1">Our Cottage Gallery</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="gallery-image-sets">
                  {[
                    { id: 1, img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=400", label: "Berry Meringue cakes details" },
                    { id: 2, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400", label: "Glistening iced cold-brew pints" },
                    { id: 3, img: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=400", label: "Fresh blooming jasmine teapots" },
                    { id: 4, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400", label: " تازه baked organic scones baskets" }
                  ].map((gal) => (
                    <div key={gal.id} className="relative aspect-square rounded-3xl overflow-hidden border border-gold/15 group cursor-zoom-in shadow-sm select-none">
                      <img 
                        src={gal.img} 
                        alt={gal.label} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                        <span className="text-[10px] font-mono text-white uppercase tracking-wider">{gal.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}

          {/* ======================================= */}
          {/* SCREEN: CONTACT & FAQ */}
          {/* ======================================= */}
          {currentTab === 'contact' && (
            <div id="screen-contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-in fade-in duration-300">
              
              {/* Form & details */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                
                {/* Contact form left */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="space-y-1">
                    <h2 className="text-3xl font-serif text-forest font-bold tracking-tight">Questions, wishes, or feedback?</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Scatter us an inquiry email below, and our woodland cottage baristas or head baker will address you within 24 hours.
                    </p>
                  </div>

                  {contactSubmitted ? (
                    <div className="bg-white border-2 border-[#1E9E6A]/30 rounded-3xl p-8 text-center text-darktext space-y-4 shadow">
                      <div className="w-12 h-12 bg-success-state/10 text-[#1E9E6A] rounded-full flex items-center justify-center text-xl mx-auto">
                        ✨
                      </div>
                      <h3 className="text-2xl font-serif text-forest font-bold">Your wish has been received!</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Thank you for coordinating with Fairy Cafe, <span className="font-semibold">{contactName}</span>. A copy of this inquiry has been routed to <strong>hello@fairycafe.com</strong>.
                      </p>
                      <button
                        onClick={() => { setContactSubmitted(false); setContactMsg(''); }}
                        className="text-xs font-mono uppercase bg-forest text-cream py-2 px-5 rounded-full"
                      >
                        Send Another Note
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="bg-white border border-gold/15 p-6 rounded-3xl space-y-4" id="contact-form">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Your Name</label>
                          <input
                            type="text"
                            id="contact-name"
                            placeholder="linnea"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 h-11 w-full text-xs outline-none focus:border-focus"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Your Email</label>
                          <input
                            type="email"
                            id="contact-email"
                            placeholder="linnea@gmail.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 h-11 w-full text-xs outline-none focus:border-focus"
                            required
                          />
                        </div>
                      </div>

                      {/* Reason selector drop-down */}
                      <div>
                        <label htmlFor="contact-reason" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1 font-bold">Reason for Inquiry</label>
                        <select
                          id="contact-reason"
                          value={contactReason}
                          onChange={(e) => setContactReason(e.target.value)}
                          className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 h-11 w-full text-xs outline-none focus:border-focus"
                        >
                          <option>General Inquiry / Quick question</option>
                          <option>Custom Cake / Pastry Catering Request</option>
                          <option>Private Tea Party Event Rental</option>
                          <option>Press / Partnership Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contact-msg" className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Write your Message</label>
                        <textarea
                          id="contact-msg"
                          placeholder="Tell us what you desire, or details of physical allergy accommodations..."
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          className="bg-[#FFFBF8] border border-gold/20 rounded-xl p-3 w-full text-xs outline-none focus:border-focus min-h-24"
                          required
                        />
                      </div>

                      {contactFormError && (
                        <p className="text-xs text-error-state font-mono" role="alert">● {contactFormError}</p>
                      )}

                      <button
                        type="submit"
                        id="contact-submit-btn"
                        className="w-full bg-forest text-cream font-mono text-xs uppercase font-bold py-3.5 rounded-full hover:shadow-sparkle transition-all transform active:scale-95"
                      >
                        Dispatch Note to Cottage
                      </button>
                    </form>
                  )}

                </div>

                {/* Details card right */}
                <div className="lg:col-span-5 p-6 bg-cream border-2 border-gold/30 rounded-[32px] flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#C7A774] block font-bold leading-none">Immediate contacts</span>
                    <h3 className="font-serif text-lg font-bold text-forest border-b border-gold/15 pb-2">The Cottage Dispatch</h3>
                    
                    <div className="space-y-4 font-mono text-xs text-slate-600">
                      <div className="flex gap-2">
                        <Phone className="w-4 h-4 text-gold shrink-0" />
                        <div>
                          <strong className="text-darktext block font-sans text-xs">Telephone Hotline:</strong>
                          <a href="tel:+10005550123" className="hover:text-forest transition-colors font-bold">(000) 555-0123</a>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Mail className="w-4 h-4 text-gold shrink-0" />
                        <div>
                          <strong className="text-darktext block font-sans text-xs">E-Mail Address:</strong>
                          <a href="mailto:hello@fairycafe.com" className="hover:text-forest transition-colors font-bold">hello@fairycafe.com</a>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <MapPin className="w-4 h-4 text-gold shrink-0" />
                        <div>
                          <strong className="text-darktext block font-sans text-xs font-bold">Physical Coordinates:</strong>
                          <span>123 Willow Lane, Evergrove, ST 00000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-gold/15 text-[11px] text-slate-400 mt-6 leading-relaxed select-none">
                    Are you a local acoustic musician or pastry decorator looking to host workshops? Write &lsquo;Private Tea Party Event Rental&rsquo; and we will coordinate!
                  </div>
                </div>

              </section>

              {/* FAQ Accordions matching requirements */}
              <section className="space-y-6">
                <div className="text-center">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C7A774] font-bold">General Answers</span>
                  <h3 className="text-3xl font-serif text-forest font-semibold mt-1 font-serif">Frequently Asked Questions</h3>
                </div>

                <div className="max-w-3xl mx-auto divide-y divide-gold/15 border-y border-gold/15">
                  {DELIVERABLES.faqs.map((faq, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div key={idx} className="py-2 animate-in fade-in duration-300">
                        <button
                          onClick={() => {
                            const next = isOpen ? null : idx;
                            setActiveFaq(next);
                            logAnalytics('click_faq_accordion', { question: faq.question, is_opened: next !== null });
                          }}
                          id={`faq-btn-${idx}`}
                          className="w-full flex justify-between items-center py-3 text-left font-sans text-sm font-semibold hover:text-forest focus:outline-none text-darktext cursor-pointer"
                          aria-expanded={isOpen}
                        >
                          <span className="pr-4">{faq.question}</span>
                          <span className="text-[#C7A774] font-mono text-lg font-bold">{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen && (
                          <div className="pb-4 pt-1 pr-6 text-xs text-slate-500 leading-relaxed font-sans animate-in slide-in-from-top-1 duration-150">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>
          )}

        </main>
      )}

      {/* FOOTER */}
      <Footer 
        setCurrentTab={(tab) => {
          setViewMode('site');
          setCurrentTab(tab);
        }} 
        onFooterSignUp={(email) => {
          logAnalytics('lead_generation_newsletter', {
            source: 'footer_email_form',
            discount_code: 'GARDEN10',
            recipient_email: email
          });
        }}
      />

    </div>
  );
}
