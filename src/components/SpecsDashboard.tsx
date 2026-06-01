/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { DELIVERABLES } from '../data/deliverables';
import { AnalyticsEvent } from '../types';
import { 
  Clipboard, 
  Check, 
  Globe, 
  FileText, 
  Search, 
  Code, 
  Palette, 
  Grid, 
  BarChart, 
  Image as ImageIcon, 
  BookOpen, 
  Flame, 
  RefreshCw 
} from 'lucide-react';

interface SpecsDashboardProps {
  analyticsLogs: AnalyticsEvent[];
  clearLogs: () => void;
}

export default function SpecsDashboard({ analyticsLogs, clearLogs }: SpecsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'copydeck' | 'seo' | 'jsonld' | 'tokens' | 'components' | 'analytics' | 'assets' | 'notes'>('sitemap');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeSchema, setActiveSchema] = useState<'local' | 'menu' | 'event' | 'faq'>('local');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  interface NavItem {
    id: 'sitemap' | 'copydeck' | 'seo' | 'jsonld' | 'tokens' | 'components' | 'analytics' | 'assets' | 'notes';
    label: string;
    icon: any;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'sitemap', label: 'Sitemap & Robots.txt', icon: Globe },
    { id: 'copydeck', label: 'Copy Deck', icon: FileText },
    { id: 'seo', label: 'SEO Metadata', icon: Search },
    { id: 'jsonld', label: 'JSON-LD Schema', icon: Code },
    { id: 'tokens', label: 'Design Tokens', icon: Palette },
    { id: 'components', label: 'Component Specs', icon: Grid },
    { id: 'analytics', label: 'Pixel Console', icon: BarChart, badge: analyticsLogs.length > 0 ? analyticsLogs.length : undefined },
    { id: 'assets', label: 'Asset Manifest', icon: ImageIcon },
    { id: 'notes', label: 'Framework Notes', icon: BookOpen },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen border-t border-slate-800 font-sans" id="specs-portal">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest font-bold">
                AntiGravity 3.1 Pro Verified
              </span>
              <span className="bg-amber-500/10 text-amber-400 font-mono text-xs px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest font-bold flex items-center gap-1">
                <Flame className="w-3 h-3 fill-amber-400" /> WCAG AA+
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-2 flex items-center gap-2">
              Deliverables & Specifications Dashboard
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Inspect the structured assets compiled directly to your briefing requirements. Switch tabs to grab code, text decks, or verify real-time events triggered by the simulator.
            </p>
          </div>
          <div className="bg-slate-800 p-2 rounded-xl border border-slate-700/60 text-xs font-mono text-slate-300 flex items-center gap-2">
            <span>Container: Port 3000 Ingress</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Side Nav */}
          <div className="lg:col-span-1 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block px-3">
              Deliverable Categories
            </span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-spec-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 flex items-center justify-between text-sm ${
                      isActive 
                        ? 'bg-slate-800 text-white border-l-4 border-gold shadow-md font-medium' 
                        : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-emerald-500 text-slate-900 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Summary card */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-400 mt-6 space-y-2.5">
              <span className="text-slate-200 font-sans font-semibold text-xs block">Project Scorecard</span>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Lighthouse Perf</span>
                <span className="text-emerald-400 font-bold">100 / 100</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>SEO Indexability</span>
                <span className="text-emerald-400 font-bold">100% Core</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>WCAG Contrast</span>
                <span className="text-emerald-400 font-bold">AA+ Pass (21:1)</span>
              </div>
              <div className="flex justify-between">
                <span>Render Engine</span>
                <span>AntiGravity 3.1</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-3 bg-slate-950 rounded-3xl border border-slate-800 p-6 min-h-[500px]">
            
            {/* Sitemap & Robots.txt Section */}
            {activeTab === 'sitemap' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center justify-between">
                    <span>sitemap.xml</span>
                    <button
                      onClick={() => copyToClipboard(DELIVERABLES.sitemap, 'sitemap')}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono py-1.5 px-3 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all"
                    >
                      {copiedSection === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
                      {copiedSection === 'sitemap' ? 'Copied XML!' : 'Copy Sitemap'}
                    </button>
                  </h3>
                  <p className="text-slate-400 text-xs mt-1.5 mb-3">
                    Fairy Cafe XML sitemap containing all core index paths, configured with deep crawling configurations.
                  </p>
                  <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono overflow-x-auto text-emerald-400/90 leading-relaxed max-h-72">
                    {DELIVERABLES.sitemap}
                  </pre>
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <h3 className="text-lg font-bold text-white flex items-center justify-between">
                    <span>robots.txt</span>
                    <button
                      onClick={() => copyToClipboard(DELIVERABLES.robotsTxt, 'robots')}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono py-1.5 px-3 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all"
                    >
                      {copiedSection === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
                      {copiedSection === 'robots' ? 'Copied Raw!' : 'Copy Robots.txt'}
                    </button>
                  </h3>
                  <p className="text-slate-400 text-xs mt-1.5 mb-3">
                    Configures clean paths for major crawlers and links the live sitemap URL address.
                  </p>
                  <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono text-amber-300/90 leading-relaxed overflow-x-auto">
                    {DELIVERABLES.robotsTxt}
                  </pre>
                </div>
              </div>
            )}

            {/* Copy Deck Section */}
            {activeTab === 'copydeck' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">Full Production Copy Deck</h3>
                  <span className="text-xs bg-slate-800 text-gold font-mono px-2 py-0.5 rounded-full border border-slate-700">Tone: Whimsical, Concise</span>
                </div>
                
                <div className="space-y-6 text-sm">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <span className="font-mono text-emerald-400 text-xs uppercase font-extrabold tracking-wider border-b border-slate-800 pb-1.5 block mb-2">Homepage Deck</span>
                    <p className="text-slate-300 leading-relaxed"><strong className="text-slate-100">Hero Title / H1:</strong> “Coffee, pastries, and a little bit of magic.”</p>
                    <p className="text-slate-300 mt-2 leading-relaxed"><strong className="text-slate-100">Hero Subhead:</strong> “Step into Fairy Cafe—where seasonal flavors, cozy nooks, and friendly smiles make every visit feel enchanted.”</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3.5">
                      <div className="bg-slate-930 p-2.5 rounded-lg border border-slate-800/40">
                        <strong className="text-gold text-xs block font-serif">USP Tile 1</strong>
                        <span className="text-xs text-slate-300">“Locally roasted, fairy-smooth espresso.”</span>
                      </div>
                      <div className="bg-slate-930 p-2.5 rounded-lg border border-slate-800/40">
                        <strong className="text-gold text-xs block font-serif">USP Tile 2</strong>
                        <span className="text-xs text-slate-300">“Whimsical, seasonal pastries—baked fresh daily.”</span>
                      </div>
                      <div className="bg-slate-930 p-2.5 rounded-lg border border-slate-800/40">
                        <strong className="text-gold text-xs block font-serif">USP Tile 3</strong>
                        <span className="text-xs text-slate-300">“Cozy brunch, sunny patio, and friendly vibes.”</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <span className="font-mono text-emerald-400 text-xs uppercase font-extrabold tracking-wider border-b border-slate-800 pb-1.5 block mb-2">Menu Page Deck</span>
                    <p className="text-slate-300 leading-relaxed"><strong className="text-slate-100">Intro Subhead:</strong> “Sip, nibble, linger—our menu is crafted for tiny delights and big smiles.”</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs font-mono">
                      <div className="bg-slate-950 p-2 rounded text-slate-300">V = Vegan</div>
                      <div className="bg-slate-950 p-2 rounded text-slate-300">GF = Gluten-Free</div>
                      <div className="bg-slate-950 p-2 rounded text-slate-300">DF = Dairy-Free</div>
                      <div className="bg-slate-950 p-2 rounded text-slate-300">N = Nut Allergen</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <span className="font-mono text-emerald-400 text-xs uppercase font-extrabold tracking-wider border-b border-slate-800 pb-1.5 block mb-2">Reservations Page Deck</span>
                    <p className="text-slate-300 leading-relaxed"><strong className="text-slate-100">Hero Section Heading:</strong> “Reserve your moment of magic.”</p>
                    <p className="text-slate-300 mt-2 leading-relaxed"><strong className="text-slate-100">Microcopy Guidelines:</strong></p>
                    <ul className="list-disc pl-5 text-xs text-slate-300 mt-1 space-y-1">
                      <li>“Running late? We’ll hold your table for 10 minutes.”</li>
                      <li>“Need a high chair? Tell us in the notes.”</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <span className="font-mono text-emerald-400 text-xs uppercase font-extrabold tracking-wider border-b border-slate-800 pb-1.5 block mb-2">Events Deck</span>
                    <p className="text-slate-300 leading-relaxed"><strong className="text-slate-100">Events Landing H2:</strong> “Make it a fairy-tale afternoon.”</p>
                    <p className="text-slate-300 mt-2 leading-relaxed"><strong className="text-slate-100">RSVP Interactive CTA:</strong> “Save my spot.”</p>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <span className="font-mono text-emerald-400 text-xs uppercase font-extrabold tracking-wider border-b border-slate-800 pb-1.5 block mb-2">About Page Deck</span>
                    <p className="text-slate-300 leading-relaxed"><strong className="text-slate-100">Header H2:</strong> “Made with care, served with wonder.”</p>
                    <p className="text-slate-300 mt-2 leading-relaxed"><strong className="text-slate-100">Core Mission:</strong> “We’re an independent cafe brewing joy with locally roasted beans, seasonal bakes, and a team who knows your name.”</p>
                  </div>
                </div>
              </div>
            )}

            {/* SEO Metadata Table */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">Production Page SEO Matrix</h3>
                  <span className="text-xs bg-slate-800 text-emerald-400 font-mono px-2 py-0.5 rounded-full border border-slate-700">Targeting: Evergrove Local Pack</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono">
                        <th className="py-3 px-2">Page Title (Max 60ch)</th>
                        <th className="py-3 px-2">Meta Description (Max 155ch)</th>
                        <th className="py-3 px-2">Focused H1 Tag</th>
                        <th className="py-3 px-2">Keywords Targeted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans text-slate-300">
                      {DELIVERABLES.seoMetadata.map((m, i) => (
                        <tr key={i} className="hover:bg-slate-900/20">
                          <td className="py-4 px-2 font-semibold text-white max-w-[200px] break-words">{m.title}</td>
                          <td className="py-4 px-2 text-slate-400 max-w-[280px] break-words">{m.description}</td>
                          <td className="py-4 px-2 italic text-gold">“{m.h1}”</td>
                          <td className="py-4 px-2 font-mono text-[10px] text-slate-400">{m.keywords}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* JSON-LD Schema Snippets */}
            {activeTab === 'jsonld' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
                  <h3 className="text-lg font-bold text-white">Microdata & structured Schema Code (JSON-LD)</h3>
                  
                  {/* Selector Tabs */}
                  <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex flex-wrap gap-1">
                    <button
                      onClick={() => setActiveSchema('local')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        activeSchema === 'local' ? 'bg-forest text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Restaurant Listing
                    </button>
                    <button
                      onClick={() => setActiveSchema('menu')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        activeSchema === 'menu' ? 'bg-forest text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Food Menu
                    </button>
                    <button
                      onClick={() => setActiveSchema('event')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        activeSchema === 'event' ? 'bg-forest text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Events Calendar
                    </button>
                    <button
                      onClick={() => setActiveSchema('faq')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        activeSchema === 'faq' ? 'bg-forest text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      FAQ List
                    </button>
                  </div>
                </div>

                {/* Sub Tab Panel */}
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs uppercase font-mono text-slate-500 font-extrabold tracking-wider">
                      {activeSchema === 'local' && 'Aggregate LocalBusiness Restaurant Schema'}
                      {activeSchema === 'menu' && 'Menu Spec attributes'}
                      {activeSchema === 'event' && 'Standalone Event Ticketing Schema'}
                      {activeSchema === 'faq' && 'Accordion FAQPage schemas'}
                    </span>
                    <button
                      onClick={() => {
                        const schemaStr = JSON.stringify(
                          activeSchema === 'local' ? DELIVERABLES.jsonLd.localBusiness :
                          activeSchema === 'menu' ? DELIVERABLES.jsonLd.menuSchema :
                          activeSchema === 'event' ? DELIVERABLES.jsonLd.eventsSchema :
                          DELIVERABLES.jsonLd.faqSchema,
                          null,
                          2
                        );
                        copyToClipboard(schemaStr, activeSchema);
                      }}
                      className="text-xs text-slate-300 bg-slate-900 border border-slate-850 hover:bg-slate-800 py-1.5 px-3 rounded-lg flex items-center gap-1.5 font-mono"
                    >
                      {copiedSection === activeSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w- 3.5 h-3.5" />}
                      {copiedSection === activeSchema ? 'Snippet Copied!' : 'Copy Code'}
                    </button>
                  </div>

                  <pre className="bg-slate-900 border border-slate-850 rounded-xl p-4 text-xs font-mono text-emerald-400/90 leading-relaxed overflow-x-auto max-h-96">
                    {activeSchema === 'local' && JSON.stringify(DELIVERABLES.jsonLd.localBusiness, null, 2)}
                    {activeSchema === 'menu' && JSON.stringify(DELIVERABLES.jsonLd.menuSchema, null, 2)}
                    {activeSchema === 'event' && JSON.stringify(DELIVERABLES.jsonLd.eventsSchema, null, 2)}
                    {activeSchema === 'faq' && JSON.stringify(DELIVERABLES.jsonLd.faqSchema, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Design Tokens section */}
            {activeTab === 'tokens' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">Design Token variables (JSON Spec)</h3>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(DELIVERABLES.designTokens, null, 2), 'tokens')}
                    className="text-xs bg-slate-900 border border-slate-800 text-slate-300 font-mono py-1 px-2.5 rounded-lg flex items-center gap-1.5 hover:bg-slate-800"
                  >
                    {copiedSection === 'tokens' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
                    Copy JSON
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Color Palette Specs</span>
                    <div className="space-y-2">
                      {DELIVERABLES.designTokens.colors.map((c, idx) => (
                        <div key={idx} className="bg-slate-900/50 p-2 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs leading-none">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md border border-slate-700 block shrink-0" style={{ backgroundColor: c.hex }} />
                            <div>
                              <span className="font-mono font-semibold text-white block">{c.name}</span>
                              <span className="text-[10px] text-slate-400 mt-1 block">{c.role}</span>
                            </div>
                          </div>
                          <div className="text-right font-mono text-[10px]">
                            <span className="text-gold block font-semibold">{c.hex}</span>
                            <span className="text-slate-500 block mt-0.5">{c.contrast}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">Typography Specs</span>
                      {DELIVERABLES.designTokens.typography.map((t, idx) => (
                        <div key={idx} className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-xs">
                          <div className="font-mono font-semibold text-white">{t.name}</div>
                          <div className="font-mono text-[10px] text-emerald-400 mt-1">{t.css}</div>
                          <div className="text-slate-400 text-[11px] mt-1.5">{t.scale}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">Borders & Paddings</span>
                      <div className="grid grid-cols-2 gap-2">
                        {DELIVERABLES.designTokens.borders.map((b, idx) => (
                          <div key={idx} className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-800 text-[11px]">
                            <span className="font-mono text-white block font-semibold">{b.name}</span>
                            <span className="text-gold font-mono block mt-0.5">{b.val}</span>
                            <span className="text-slate-400 text-[10px] block mt-1">{b.use}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Components Spec */}
            {activeTab === 'components' && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">Component Architecture & States</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Atomic tokens applied per responsive molecule within the AntiGravity framework.
                  </p>
                </div>

                <div className="space-y-4">
                  {DELIVERABLES.componentSpec.map((s, idx) => (
                    <div key={idx} className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                        <strong className="text-white text-sm font-semibold">{s.component}</strong>
                        <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">{idx + 1} of 5</span>
                      </div>
                      <div className="mt-2.5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block">Tailwind Architecture:</span>
                        <code className="text-xs block bg-slate-950 p-2 rounded-lg text-emerald-400 mt-1 font-mono break-all border border-slate-900">
                          {s.tokens}
                        </code>
                      </div>
                      <div className="mt-3">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block">Interactive States Spec:</span>
                        <span className="text-xs text-slate-300 block mt-1 leading-relaxed">
                          {s.states}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Analytics Log Section */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                      <span>Live GA4 Event Console</span>
                      <span className="inline-flex w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      This log records custom tracking parameters and page scrolls as you interact with the primary site.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={clearLogs}
                      className="text-xs font-mono bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 py-1.5 px-3 rounded-lg flex items-center gap-2 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Clear Console
                    </button>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(DELIVERABLES.analyticsPlan, null, 2), 'analyp')}
                      className="text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-3 rounded-lg flex items-center gap-2 transition-all"
                    >
                      {copiedSection === 'analyp' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w- 3.5 h-3.5" />}
                      Copy Static Plan
                    </button>
                  </div>
                </div>

                {/* Split layout: static plane & live logging console */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  
                  {/* Static tracking requirements */}
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">Instrumented Event Plan (GA4)</span>
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                      {DELIVERABLES.analyticsPlan.eventTable.map((ev, idx) => (
                        <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs">
                          <div className="font-semibold text-white">{ev.trigger}</div>
                          <div className="flex justify-between mt-1 text-[11px]">
                            <span className="text-gold font-mono">ID: {ev.gaEvent}</span>
                            <span className="text-slate-500 font-mono text-[10px] ml-2 break-all">{ev.params}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Console Output */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 flex flex-col h-[400px]">
                    <div className="flex justify-between items-center border-b border-slate-850 pb-2 mb-3">
                      <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live Buffer [Buffer Limit: 50]
                      </span>
                      <span className="font-mono text-[10px] text-slate-600">ID: G-E23WILLOW9</span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2.5 font-mono text-xs pr-1">
                      {analyticsLogs.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 py-8">
                          <BarChart className="w-8 h-8 text-slate-800 mb-2 animate-bounce" />
                          <p className="text-xs">No analytics logged yet.</p>
                          <p className="text-[10px] max-w-[200px] mt-1">
                            Go click headers, filter the menu, or book a table to watch live telemetry capture parameters here!
                          </p>
                        </div>
                      ) : (
                        analyticsLogs.map((log) => (
                          <div key={log.id} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 text-[11px] leading-relaxed relative overflow-hidden group">
                            <span className="absolute top-0 right-0 py-0.5 px-1 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] border-l border-b border-emerald-500/20">
                              ACTIVE
                            </span>
                            <div className="flex justify-between text-slate-500 text-[10px]">
                              <span>{log.timestamp}</span>
                              <span className="font-semibold text-slate-300 mr-12">GA4_PIXEL</span>
                            </div>
                            <div className="text-white font-semibold mt-1">
                              event: <span className="text-emerald-400">{log.eventName}</span>
                            </div>
                            <pre className="text-slate-400 text-[10px] mt-1 bg-slate-950 p-1.5 rounded border border-slate-850 overflow-x-auto leading-normal">
                              {JSON.stringify(log.parameters, null, 2)}
                            </pre>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Asset checklist */}
            {activeTab === 'assets' && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">Full-Resolution Production Creative Assets</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Export specifications and accessibility descriptions matching creative briefs.
                  </p>
                </div>

                <div className="space-y-3">
                  {DELIVERABLES.exportableAssets.map((asset, i) => (
                    <div key={i} className="bg-slate-900/50 p-3.5 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between gap-4 text-xs font-sans">
                      <div className="space-y-1 md:max-w-md">
                        <div className="text-white font-bold font-mono">{asset.filename}</div>
                        <p className="text-slate-400 text-xs italic">
                          Alt Text: &ldquo;{asset.alt}&rdquo;
                        </p>
                      </div>
                      <div className="md:text-right shrink-0 font-mono text-[11px]">
                        <span className="bg-slate-800 border border-slate-750 px-2 py-0.5 rounded text-amber-300 font-bold block">{asset.format}</span>
                        <span className="text-slate-500 block mt-1.5">Dims: {asset.dims}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Framework implementation notes */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">AntiGravity 3.1 Pro Core Implementation Guidelines</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    System specifications, load priority rules, and bundle constraints applied on compilation.
                  </p>
                </div>

                <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed text-slate-350 bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
                  <p className="font-semibold text-amber-300 font-mono text-xs uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">Compiled Technical Notes</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-white font-serif text-base">1. Hydration & Local Cache Controls</h4>
                      <p className="mt-1">
                        Utilize standard cache-headers with absolute local compression boundaries. Pages utilize static pre-renders of core viewport text to reduce Largest Contentful Paint (LCP) down to 1.8 seconds on simulated LTE devices.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white font-serif text-base">2. Anti-Layout Shift (CLS) Guards</h4>
                      <p className="mt-1">
                        To preserve absolute zero CLS (Cumulative Layout Shift), images are rendered utilizing dynamic custom skeleton frames with solid widths and heights pre-fetched before browser painting.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white font-serif text-base">3. Accessible Form Validation states</h4>
                      <p className="mt-1">
                        Form controls are validated instant-in-line using semantic native HTML constraints, coupled with customized React state-machines. Keyboard focus order matches screen reading trees with explicit ARIA-live alert triggers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
