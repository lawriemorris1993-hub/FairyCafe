/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Mail, X, CheckCircle2, Sparkles } from 'lucide-react';
import { animate } from 'motion';

interface NewsletterPopupProps {
  onSignUp: (email: string) => void;
}

export default function NewsletterPopup({ onSignUp }: NewsletterPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Show the popup after 8 seconds (fast enough for high conversion during the demo)
    const timer = setTimeout(() => {
      const hasSignedUp = localStorage.getItem('fairy_cafe_newsletter_signed');
      if (!hasSignedUp) {
        setIsOpen(true);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please scatter your email address to unlock the magic.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Sip... that email address looks a bit incomplete.');
      return;
    }

    // Success
    setSubmitted(true);
    onSignUp(email);
    localStorage.setItem('fairy_cafe_newsletter_signed', 'true');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
      id="newsletter-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-popup-title"
    >
      <div 
        className="relative w-full max-w-lg bg-cream rounded-[32px] overflow-hidden shadow-2xl border border-gold/30 p-8 md:p-10 text-darktext animate-in fade-in zoom-in duration-300"
        id="newsletter-modal-content"
      >
        {/* Sparkle Background Accents */}
        <div className="absolute top-4 left-6 text-gold/30 animate-pulse">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute bottom-6 right-6 text-gold/30 animate-pulse delay-75">
          <Sparkles className="w-6 h-6" />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-forest hover:bg-forest/5 focus:outline-none focus:ring-2 focus:ring-focus"
          aria-label="Close dialog"
          id="close-newsletter-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Content */}
        {!submitted ? (
          <div className="space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[#C7A774] font-semibold flex items-center gap-1.5 justify-center md:justify-start">
              <Sparkles className="w-3.5 h-3.5" /> Welcome to our garden list
            </span>
            <h3 id="promo-popup-title" className="text-3xl md:text-4xl font-serif text-forest font-semibold tracking-tight text-center md:text-left leading-tight">
              Get <span className="italic relative font-medium">10% off</span> your first pastry
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed text-center md:text-left">
              Join our garden newsletter to receive magical seasonal menu release guides, exclusive secret invitations to afternoon fairy tea parties, and our 10% pastry gift.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 mt-4" id="newsletter-popup-form" noValidate>
              <div className="relative">
                <label htmlFor="newsletter-popup-email" className="sr-only">Email address</label>
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="newsletter-popup-email"
                  placeholder="Enter your email fairy friend..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-[#FFFBF8] border ${
                    error ? 'border-error-state focus:ring-error-state' : 'border-gold/30 focus:border-focus'
                  } rounded-2xl font-sans text-sm outline-none transition-all placeholder:text-slate-400 text-darktext focus:ring-1 focus:ring-focus h-12`}
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-popup-error" : undefined}
                />
              </div>

              {error && (
                <p id="newsletter-popup-error" className="text-xs text-error-state font-mono flex items-center gap-1" role="alert">
                  <span>●</span> {error}
                </p>
              )}

              <button
                type="submit"
                id="newsletter-popup-submit"
                className="w-full bg-forest text-cream py-3.5 rounded-full font-sans font-semibold text-sm hover:shadow-sparkle transition-all duration-300 transform active:scale-[0.98]"
              >
                Reveal My 10% Pastry Gift
              </button>
            </form>

            {/* Compliance Note */}
            <p className="text-[11px] text-slate-400 mt-2 text-center md:text-left leading-normal">
              By joining, you consent to receive garden updates. We honor privacy and data protection rights, never sell details, and support instant 1-click unsubscribe links. GDPR & CCPA compliant.
            </p>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto w-16 h-16 bg-success-state/10 rounded-full flex items-center justify-center text-success-state animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 id="promo-popup-title" className="text-3xl font-serif text-forest font-semibold tracking-tight">
              The magic is unlocked!
            </h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
              Check your woodland inbox. Here is your secret pastry garden discount code to use during your next checkout:
            </p>
            <div className="bg-[#FFFBF8] border-2 border-dashed border-gold/40 p-4 rounded-2xl max-w-xs mx-auto text-center font-mono">
              <span className="text-emerald-600 font-bold text-xl tracking-wider uppercase">GARDEN10</span>
              <span className="block text-[10px] text-slate-400 mt-1 uppercase">Apply at pickup or checkout online</span>
            </div>
            <button
              onClick={handleClose}
              id="newsletter-success-close"
              className="mt-6 font-mono text-xs uppercase text-slate-500 hover:text-forest tracking-wider underline underline-offset-4 font-semibold"
            >
              Continue Exploring the Cottage
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
