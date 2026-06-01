import { DesignToken, CafeEvent, FAQItem } from '../types';

export const DELIVERABLES = {
  sitemap: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fairycafe.com/</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fairycafe.com/menu</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://fairycafe.com/order</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://fairycafe.com/reservations</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://fairycafe.com/locations-hours</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://fairycafe.com/events</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://fairycafe.com/about</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`,

  robotsTxt: `# Robots.txt for Fairy Cafe (AntiGravity 3.1 Pro Build)
User-agent: *
Allow: /
Disallow: /api/checkout/success
Disallow: /admin/

# Sitemap location
Sitemap: https://fairycafe.com/sitemap.xml`,

  seoMetadata: [
    {
      page: 'Home',
      title: 'Fairy Cafe | Whimsical Coffee, Seasonal Pastries, Cozy Brunch',
      description: 'Step into Fairy Cafe in Evergrove—where organic, locally roasted coffee, magical seasonal pastries, and warm garden vibes make every meal feel enchanted. Book online!',
      h1: 'Coffee, pastries, and a little bit of magic.',
      keywords: 'Evergrove cafe, best brunch Evergrove, fairycore aesthetic, gluten-free pastries, local roasted coffee, whimsical garden tea, family-friendly cafe'
    },
    {
      page: 'Menu',
      title: 'Our Whimsical Menu | Coffee, Teas & Botanical Pastries | Fairy Cafe',
      description: 'Explore the Fairy Cafe menu. Feast on our lavender honey scones, forest mushroom toast, and enchanted rose lattes. Vegan, GF, allergen-friendly options available.',
      h1: 'Sip, nibble, linger—our menu is crafted for tiny delights.',
      keywords: 'fairy latte ingredients, green matcha ceremony, vegan mushroom toast, lemon ricotta pancakes, allergen-free desserts, Evergrove tea menu'
    },
    {
      page: 'Order Online',
      title: 'Order Pickup & Delivery | Fresh Magic Sent To You | Fairy Cafe',
      description: 'Skip the wait! Order our whimsical coffees, artisan teas, and fresh-baked brioches for instant pickup or local delivery in Evergrove. Easy online ordering.',
      h1: 'Bring the magic home.',
      keywords: 'online coffee delivery, quick pickup Evergrove, touchless checkout cafe, bakery delivery'
    },
    {
      page: 'Reservations',
      title: 'Reserve a Table | Cozy Nooks & Sunny Patio | Fairy Cafe',
      description: 'Secure your moment of magic. Book seating at our flagship Evergrove cafe for family brunch, whimsical dates, or garden afternoon fairy tea.',
      h1: 'Reserve your moment of magic.',
      keywords: 'book cafe table Evergrove, reservations fairy cafe, outdoor dining patio, weekend brunch booking'
    },
    {
      page: 'Events',
      title: 'Magical Gatherings & Fairy Tea Parties | Fairy Cafe Events',
      description: 'Join us for fairy tea parties, live acoustic music nights, and children\'s cookie decorating workshops. View upcoming calendar dates and RSVP online.',
      h1: 'Make it a fairy-tale afternoon.',
      keywords: 'family events Evergrove, fairy tea party, live acoustic music cafe, kids workshops'
    },
    {
      page: 'About Our Garden',
      title: 'Our Enchanting Story | Sustainability & Local Sourcing | Fairy Cafe',
      description: 'Meet Fairy Cafe. We are an independent, women-led coffee shop in Evergrove dedicated to brewing joy with sustainable organic supply chains & fair trade cocoa.',
      h1: 'Made with care, served with wonder.',
      keywords: 'organic bean sourcing, sustainable fair trade cafe, Evergrove community, women-led local bakery'
    }
  ],

  designTokens: {
    system: "AntiGravity 3.1 Pro UI Design System Token Registry",
    colors: [
      { name: "$color-forest", hex: "#2E5941", contrast: "AA+ (7.4:1 on Cream)", role: "Primary Brand / Topographies & Deep Borders" },
      { name: "$color-sage", hex: "#9BC1A3", contrast: "AA (4.8:1 on Dark Text)", role: "Secondary Brand / Subtle Backgrounds & Secondary CTAs" },
      { name: "$color-blush", hex: "#F4CFE0", contrast: "Decor-only", role: "Accent Soft Pastels / Highlighting & Delicate Ribbons" },
      { name: "$color-gold", hex: "#C7A774", contrast: "AA (4.5:1 on Forest)", role: "Metallic Highlight / Sparkles, Stars, Active Icons & Borders" },
      { name: "$color-cream", hex: "#FFF7F2", contrast: "Base Bg", role: "Core Page Canvas / Warm, eye-strain reducing background" },
      { name: "$color-dark", hex: "#1C1C1C", contrast: "AA+ (21:1 on Cream)", role: "Primary Body Text / Maximum readability" },
      { name: "$color-success", hex: "#1E9E6A", contrast: "System Node", role: "Positive States / Cart, Booked Alerts" },
      { name: "$color-error", hex: "#C0392B", contrast: "System Node", role: "Alert States / Form Missings, Overbookings" }
    ],
    typography: [
      { name: "$font-display-serif", css: "'Cormorant Garamond', Georgia, serif", scale: "H1: 3.5rem (56px) light-medium. H2: 2.25rem (36px). Letter-spacing: -0.02em." },
      { name: "$font-body-sans", css: "'Inter', sans-serif", scale: "Body: 1rem (16px) regular, high-line/1.625. Micro: 0.875rem (14px) medium." },
      { name: "$font-accent-mono", css: "'JetBrains Mono', monospace", scale: "$tracking-wider, H4-data, precise pricing: 0.8125rem (13px)." }
    ],
    spacing: [
      { name: "$spacing-xs", val: "8px", use: "Inner components padding / Label to input gaps" },
      { name: "$spacing-sm", val: "16px", use: "Cards inner paddings / List gaps" },
      { name: "$spacing-md", val: "24px", use: "Button-gaps / Standard layouts margins" },
      { name: "$spacing-lg", val: "64px", use: "Mobile Sections cushion / Desktop Inner layouts" },
      { name: "$spacing-xl", val: "96px", use: "Desktop Screen Sections Padding / Huge Heroes separation" }
    ],
    borders: [
      { name: "$border-radius-card", val: "24px", use: "Large content cards, Promo banners, Popups" },
      { name: "$border-radius-item", val: "12px", use: "Input boxes, small widgets, cart buttons" },
      { name: "$border-radius-pill", val: "999px", use: "Core CTA Buttons, Category Badges, Tag pills" }
    ],
    shadows: [
      { name: "$shadow-magical-light", val: "0 8px 24px rgba(46, 89, 65, 0.08)", use: "Main cards / Subtle green depth to fit background" },
      { name: "$shadow-glow-active", val: "0 0 15px rgba(199, 167, 116, 0.4)", use: "Buttons on hover / Modal popups fairy dust accent glow" }
    ]
  },

  componentSpec: [
    {
      component: "Primary Button (CTA)",
      tokens: "bg-forest text-cream font-sans font-semibold tracking-wide hover:shadow-glow px-8 py-3.5 rounded-full transition-all duration-300 transform active:scale-95 border border-forest ease-out",
      states: "Default, Hover (Active glow), Active (Slight scale down), Disabled (Opacity 40%, pointer-events none)"
    },
    {
      component: "Secondary Button",
      tokens: "bg-transparent text-forest hover:bg-forest hover:text-cream border border-forest border-opacity-30 rounded-full py-3.5 px-8 transition-colors dura-300 text-sm font-semibold uppercase font-mono tracking-wider",
      states: "Default, Hover (Inverted color states)"
    },
    {
      component: "Menu Category Tab",
      tokens: "font-serif text-lg py-2 border-b-2 transition-all transition-duration-200. Active: border-gold text-forest. Inactive: border-transparent text-gray-400 hover:text-forest",
      states: "Active, Inactive, Hover"
    },
    {
      component: "Reservation Form Input",
      tokens: "rounded-xl border border-gold border-opacity-30 focus:border-focus bg-cream bg-opacity-40 p-3 h-12 w-full font-sans transition-all text-darktext text-sm focus:ring-1 focus:ring-focus",
      states: "Empty, Typing, Focused, Filled Valid, Invalid Error (red border + alert tag below)"
    },
    {
      component: "Product Card grid",
      tokens: "bg-white border rounded-3xl overflow-hidden hover:shadow-magical group relative ring-offset-rose-50 ease-in-out transition-all duration-300",
      states: "Normal loading static state, Hover (Image zooms slightly, shadow shifts)"
    }
  ],

  jsonLd: {
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "@id": "https://fairycafe.com/#restaurant",
      "name": "Fairy Cafe",
      "image": "https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?q=80&w=600",
      "priceRange": "$$",
      "servesCuisine": "Coffee, Specialty Tea, Pastries, Brunch",
      "telephone": "+10005550123",
      "email": "hello@fairycafe.com",
      "url": "https://fairycafe.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Willow Lane",
        "addressLocality": "Evergrove",
        "addressRegion": "ST",
        "postalCode": "00000",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 42.123456,
        "longitude": -71.654321
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "07:30",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Friday",
          "opens": "07:30",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "08:00",
          "closes": "20:00"
        }
      ],
      "menu": "https://fairycafe.com/menu",
      "acceptsReservations": "true",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1248"
      }
    },
    menuSchema: {
      "@context": "https://schema.org",
      "@type": "Menu",
      "name": "Fairy Cafe Whimsical Menu",
      "mainEntityOfPage": "https://fairycafe.com/menu",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "3.50",
        "highPrice": "14.50"
      },
      "hasMenuSection": [
        {
          "@type": "MenuSection",
          "name": "Coffee",
          "hasMenuItem": [
            {
              "@type": "MenuItem",
              "name": "Fairy Latte (Vanilla-Rose)",
              "description": "Double shot espresso with oat milk, organic rose water, and house-made vanilla bean syrup.",
              "offers": { "@type": "Offer", "price": "6.50", "priceCurrency": "USD" },
              "suitableForDietaryRestriction": "https://schema.org/GlutenFreeDiet"
            }
          ]
        },
        {
          "@type": "MenuSection",
          "name": "Brunch",
          "hasMenuItem": [
            {
              "@type": "MenuItem",
              "name": "Forest Mushroom Toast",
              "description": "Enoki, Oyster, and Cremini mushrooms sautéed in white wine garlic oil and fresh thyme on sourdough toasted.",
              "offers": { "@type": "Offer", "price": "14.50", "priceCurrency": "USD" },
              "suitableForDietaryRestriction": "https://schema.org/VeganDiet"
            }
          ]
        }
      ]
    },
    eventsSchema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Summer Solstice Fairy Tea Party",
      "startDate": "2026-06-20T14:00:00-05:00",
      "endDate": "2026-06-20T16:00:00-05:00",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Fairy Cafe flagship patio",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Willow Lane",
          "addressLocality": "Evergrove",
          "addressRegion": "ST",
          "postalCode": "00000",
          "addressCountry": "US"
        }
      },
      "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600",
      "description": "An enchanting afternoon with flower-crown workshops, organic herbal tea flights, and delicate fairy cakes under the lanterns.",
      "offers": {
        "@type": "Offer",
        "price": "35.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-05-01T00:00:00Z"
      }
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where is parking located for Fairy Cafe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fairy Cafe offers free 2-hour parking in the designated municipal garden lot directly behind our shop at 123 Willow Lane. Bicycle racks are available near the floral archway out front."
          }
        },
        {
          "@type": "Question",
          "name": "Do you accommodate gluten-free and vegan allergies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We cater lovingly to our fairy friends with food sensitivities. GF (Gluten-Free), V (Vegan), and DF (Dairy-Free) options are clearly labeled on the menus. Our baristas serve with oat, almond, and coconut milks with thoroughly sanitized steam wands to avoid cross-contamination."
          }
        }
      ]
    }
  },

  analyticsPlan: {
    overview: "Google Analytics 4 (GA4) & Tracking Pixel Instrumentation Plan and Setup Guidelines for Fairy Cafe",
    configuration: "Initialize GA4 with G-E23WILLOW9 on all pages. Ensure Enhanced Measurement tracking is toggled ON for Scroll Depth, Outbound Clicks, and Site Searches.",
    eventTable: [
      { trigger: "Hero: Primary button click", gaEvent: "click_reservation_cta", params: "{ location: 'hero_left', template: 'antigravity_3' }" },
      { trigger: "Hero: Secondary button click", gaEvent: "click_ordering_cta", params: "{ location: 'hero_right', type: 'fast_pickup' }" },
      { trigger: "Newsletter Submit", gaEvent: "lead_generation_newsletter", params: "{ source: 'popup_footer', discount_code: 'GARDEN10', conversion_value: 4.50 }" },
      { trigger: "Category Tab Filter Triggered", gaEvent: "filter_menu", params: "{ category: 'Tea|Coffee|Pastries...', filter: 'GF|V|DF|N' }" },
      { trigger: "Add Item to Cart", gaEvent: "add_to_cart", params: "{ item_id: 'p2', item_name: 'Pistachio Pixie Tart', price: 6.50, quantity: 1 }" },
      { trigger: "Reservations Submit Drafts", gaEvent: "reserve_table_completed", params: "{ party_size: 4, date_time: '2026-06-15 13:00', seating_pref: 'patio' }" },
      { trigger: "Order Checkout Complete", gaEvent: "purchase_online", params: "{ transaction_id: 'FC-812397', value: 18.25, currency: 'USD', items_count: 2, tip: 3.00 }" },
      { trigger: "Location Directions Outbound Map Click", gaEvent: "view_directions_maps", params: "{ platform: 'google_maps', distance: 'local_radius' }" },
      { trigger: "Events Table RSVP Spot Saved", gaEvent: "event_rsvp", params: "{ event_id: 'evt_tea_party', seats_booked: 2, price: 35.00 }" }
    ]
  },

  performanceChecklist: [
    { cat: "Assets & Code Optimization", item: "Convert and serve all imagery as next-gen WebP formats. Apply responsive sizes with lazy loading on all content blocks below-the-fold.", checked: true },
    { cat: "Assets & Code Optimization", item: "Optimize CSS outputs. Combine standard tailwind layers into one stylesheet compiled under 14KB inline-head-critical CSS.", checked: true },
    { cat: "User Accessibility (WCAG 2.1 AA)", item: "Assure a minimum AAA contrast ratio (exceeding AA+ requirement) with black body copy (#1C1C1C) against cream (#FFF7F2), producing a rich 21:1 contrast ratio.", checked: true },
    { cat: "User Accessibility (WCAG 2.1 AA)", item: "Add detailed, rich screen-reader aria labels, structural semantic markup (nav, header, footer, main), and logical focus boundaries with clear #6AA6A6 borders.", checked: true },
    { cat: "Local SEO Audit Actions", item: "Embed structured microdata (JSON-LD schema code) inside the HTML structure representing the restaurant local business listing, pricing, coordinates, and operating hours.", checked: true },
    { cat: "Technical Speed Metrics", item: "Pass Google Core Web Vitals checks: LCP ≤ 2.2s on mobile connections, Cumulative Layout Shift (CLS) of exactly 0.0 with absolute width/height blocks.", checked: true }
  ],

  exportableAssets: [
    { filename: "fairy_cafe_logo_primary.svg", dims: "180px x 60px", alt: "Fairy Cafe Elegant Gold script text logo framed by a tiny crescent moon and wild vines.", format: "Vector SVG" },
    { filename: "rose_strawberry_signature.webp", dims: "1200px x 800px (LCP Optimized)", alt: "Dusky cream ceramic cup containing a pink double strawberry latte topped with rose petals, back-illuminated by soft golden hour bokeh sunshine.", format: "Optimized WebP" },
    { filename: "pastries_glass_case.webp", dims: "800px x 600px", alt: "Close up selective focus view of beautiful lemon verbena tarts, lavender scones, and pistachio pixie tarts beneath a polished glass counter.", format: "Optimized WebP" },
    { filename: "patio_brunch_group.webp", dims: "1200px x 800px", alt: "Four happy young adult female friends laughing and cheering drinks on a wooden garden picnic table adorned with hanging fairy garden string lights.", format: "Optimized WebP" },
    { filename: "family_decorating_workshop.webp", dims: "800px x 600px", alt: "A smiley mother and her young daughter wearing matching fairy wings, placing buttercream stars on flower-shaped sugar cookies in a sunny wood workshop.", format: "Optimized WebP" }
  ],

  faqs: [
    {
      category: "Parking & Access",
      question: "Where is parking located for Fairy Cafe?",
      answer: "Fairy Cafe offers free 2-hour parking in the municipal garden lot directly behind our shop at 123 Willow Lane. Bicycle racks are available near the floral archway out front, and municipal bus line 12 stops right at the Evergrove Crossroads, a brief 2-minute walk from us."
    },
    {
      category: "Allergens & Ingredients",
      question: "Do you accommodate gluten-free and vegan allergies?",
      answer: "Yes! We cater lovingly to our fairy friends with food sensitivities. GF (Gluten-Free), V (Vegan), and DF (Dairy-Free) options are clearly labeled on the menu. Our baristas serve coffee with oat, almond, and coconut milks and thoroughly sanitize steam wands between drinks to avoid cross-contamination. Note that some items contain tree nuts (Pistachio Pixie Tart) which are baked in a separate designated workspace."
    },
    {
      category: "Patio Policies",
      question: "Are pets allowed in the fairy garden patio?",
      answer: "Absolutely! Leashed furry friends, familiars, and garden dogs are very welcome on our outdoor patio. We have fresh water bowls and house-baked, organic oat-and-pumpkin woodland dog cookies at the order bar!"
    },
    {
      category: "Custom Orders",
      question: "Can I order custom whimsical cakes or pastry catering?",
      answer: "We love celebrating your magical moments! Yes, we bake custom floral-pressed vegan cakes and woodland cupcakes for birthdays, bridal showers, or fairy-tale weddings. Please fill out our contact form with 'Custom Cake' selected, and our head pastry chef will connect with you. We request at least 10 days notice for custom orders."
    },
    {
      category: "Digital Connectivity",
      question: "Do you offer Wi-Fi so I can work in the cottage?",
      answer: "Yes, we have high-speed complimentary Wi-Fi! To preserve our calm, restorative woodland magic, we kindly request our remote-working friends to use headphones. Several of our oak tables are equipped with charging outlets underneath."
    },
    {
      category: "Accessibility Features",
      question: "How accessible is Fairy Cafe for strollers and wheelchairs?",
      answer: "Our cottage is fully accessible! We have concrete ramps entering both the main door and our patio, double wide automatic sliding doors, spacious corridors between rustic tables, fully compliant ADA-compliant family restrooms with diaper-changing stations, and plenty of room to dock strollers comfortably."
    }
  ],

  events: [
    {
      id: 'e1',
      title: 'Summer Solstice Fairy Tea Party',
      date: 'Saturday, June 20, 2026',
      time: '2:00 PM – 4:00 PM',
      price: '$35.00',
      description: 'An enchanting afternoon with fresh flower-crown crafting workshops, cold-brewed herbal tea flights, delicate pansy-pressed garden cookies, and serene live cello music.',
      capacityLeft: 6,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600'
    },
    {
      id: 'e2',
      title: 'Acoustic Solitude Under the Glow-Lights',
      date: 'Friday, June 26, 2026',
      time: '6:30 PM – 8:30 PM',
      price: 'Free (Order required)',
      description: 'Linger long over rose woodland lattes while talented local singer-songwriter, Linnea Glen, plays beautiful, relaxing acoustic folk underneath our illuminated garden lanterns.',
      capacityLeft: 18,
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600'
    },
    {
      id: 'e3',
      title: 'Kids Wand-Cookie Decorating Workshop',
      date: 'Sunday, July 5, 2026',
      time: '11:00 AM – 12:30 PM',
      price: '$15.00',
      description: 'A magical cookie decorating experience for children! Includes two fresh wand sugar cookies, organic icing coloring, woodland edible glitter, sprinkles, and a warm Hot Chocolate Cloud.',
      capacityLeft: 8,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600'
    }
  ],

  implementationNotes: `### AntiGravity 3.1 Pro Component Notes

1. **Hydration and Loading Performance**:
   - The platform uses a high-performance, critical-rendering path.
   - Images are pre-loaded server-side and set to display: swap to eliminate Flash of Unstyled Text (FOUT).
   - Bundle payloads are optimized utilizing module split points for components.

2. **React 19 Integration**:
   - High compatibility with React 19 functional boundaries and transition APIs (\`useTransition\`, \`useActionState\`).
   - Hooks utilize strict state initialization to bypass HMR canvas re-renders.

3. **Motion Best Practices**:
   - For fluid micro-animations, import components strictly from \`motion/react\` or use customized layout transition components.
   - Animations leverage \`layoutId\` properties on category toggles for fluid, spring-based sliding lines instead of manual CSS transitions.
   - Scroll animations utilize optimized viewport trackers to bypass browser frame drops on low-end mobile devices.`
};
