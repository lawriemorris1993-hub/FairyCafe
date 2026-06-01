/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'Coffee' | 'Tea' | 'Pastries' | 'Brunch' | 'Seasonal';
  price: number;
  calories?: number;
  dietary: Array<'V' | 'GF' | 'DF' | 'N'>; // Vegan, Gluten-Free, Dairy-Free, Nuts
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedModifiers: string[];
}

export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  seatingPreference: 'indoor' | 'patio' | 'no-preference';
  specialNotes?: string;
  occasion?: string;
  acceptedDepositPolicy: boolean;
}

export interface OrderCheckout {
  id?: string;
  name: string;
  email: string;
  phone: string;
  type: 'pickup' | 'delivery';
  address?: string;
  timeSlot: string;
  paymentMethod: 'card' | 'apple-pay' | 'google-pay';
  tip: number;
  smsConsent: boolean;
  notes?: string;
}

export interface EventRSVP {
  eventId: string;
  name: string;
  email: string;
  partySize: number;
}

export interface NewsletterSignUp {
  email: string;
  timestamp: string;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  eventName: string;
  parameters: Record<string, any>;
}

export interface DesignToken {
  category: string;
  values: Array<{
    name: string;
    value: string;
    description: string;
  }>;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface CafeEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  price: string;
  description: string;
  capacityLeft: number;
  image: string;
}
