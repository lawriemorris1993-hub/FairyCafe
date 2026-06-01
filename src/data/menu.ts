import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- COFFEE CATEGORY ---
  {
    id: 'c1',
    name: 'Fairy Latte (Vanilla-Rose)',
    description: 'Our signature double shot espresso with velvety oat milk, organic rose water, and house-made vanilla bean syrup, dusted with organic sugar sparkles.',
    category: 'Coffee',
    price: 6.50,
    calories: 220,
    dietary: ['GF', 'DF'],
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?q=80&w=600'
  },
  {
    id: 'c2',
    name: 'Woodland Cappuccino',
    description: 'Perfectly pulled double shot of locally roasted espresso, thick micro-foam cap, and an organic fair-trade cinnamon forest motif stencil.',
    category: 'Coffee',
    price: 5.50,
    calories: 180,
    dietary: ['GF'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600'
  },
  {
    id: 'c3',
    name: 'Evergrove Cold Brew',
    description: 'Slow-steeped for 18 hours using organic shade-grown rain-forest beans representing caramel undertones, served over solid crystal-clear ice.',
    category: 'Coffee',
    price: 4.75,
    calories: 5,
    dietary: ['V', 'GF', 'DF'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600'
  },
  {
    id: 'c4',
    name: 'Dewdrop Espresso Flight',
    description: 'A sensory journey featuring a shot of single-origin guest espresso, a mini macchiato with textured milk, and a clean sparkling palata-cleansing water cup.',
    category: 'Coffee',
    price: 8.00,
    calories: 10,
    dietary: ['V', 'GF', 'DF'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600'
  },

  // --- TEA CATEGORY ---
  {
    id: 't1',
    name: 'Enchanted Earl Grey',
    description: 'An aromatic blend of organic black teas, cold-pressed bergamot, blue cornflower petals, lavender stems, and a dollop of raw local honey.',
    category: 'Tea',
    price: 5.25,
    calories: 10,
    dietary: ['V', 'GF', 'DF'],
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=600'
  },
  {
    id: 't2',
    name: 'Jasmine Blossom Cascade',
    description: 'Top-grade green tea leaves hand-rolled with fresh jasmine flowers that unfurl beautifully in a glass teapot. Relaxing, floral essence.',
    category: 'Tea',
    price: 5.25,
    calories: 0,
    dietary: ['V', 'GF', 'DF'],
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=600'
  },
  {
    id: 't3',
    name: 'Emerald Matcha Ceremony',
    description: 'Stone-ground Uji matcha whisked to a jade froth with warm pure water and choice of coconut milk or almond milk, sweetened with organic maple syrup.',
    category: 'Tea',
    price: 6.75,
    calories: 80,
    dietary: ['GF'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600'
  },
  {
    id: 't4',
    name: 'Herbal Garden Elixir',
    description: 'A soothing caffeine-free infusion of lemon verbena, dried elderberries, chamomile heads, fresh mint from our patio plan-boxes, and ginger slices.',
    category: 'Tea',
    price: 4.50,
    calories: 0,
    dietary: ['V', 'GF', 'DF'],
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=600'
  },

  // --- PASTRIES CATEGORY ---
  {
    id: 'p1',
    name: 'Lavender Honey Scone',
    description: 'A delightfully crumbly, gluten-free scone infused with culinary English lavender flower heads, drizzled with local wildflower honeycomb glaze.',
    category: 'Pastries',
    price: 5.00,
    calories: 280,
    dietary: ['GF'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600'
  },
  {
    id: 'p2',
    name: 'Pistachio Pixie Tart',
    description: 'Crisp, sweet-crust butter shell filled with rich organic pistachio frangipane, topped with double-ground Sicilian pistachios and gold-leaf flakes.',
    category: 'Pastries',
    price: 6.50,
    calories: 390,
    dietary: ['N'],
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=600'
  },
  {
    id: 'p3',
    name: 'Berry Meringue Cloud',
    description: 'Ultra-light whipped meringue shell with a marshmallow interior, topped with coconut whipped cream, fresh hand-picked blackberries, and sweet edible pansies.',
    category: 'Pastries',
    price: 6.00,
    calories: 180,
    dietary: ['DF'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600'
  },

  // --- BRUNCH CATEGORY ---
  {
    id: 'b1',
    name: 'Forest Mushroom Toast',
    description: 'Enoki, Oyster, and Cremini mushrooms sautéed in white wine garlic oil and fresh thyme on toasted thick-sliced artisan sourdough bread. Finished with microgreens.',
    category: 'Brunch',
    price: 14.50,
    calories: 420,
    dietary: ['V'],
    image: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aec1?q=80&w=600'
  },
  {
    id: 'b2',
    name: 'Lemon Ricotta Pancakes',
    description: 'Three fluffy, cloud-like pancakes folded with fresh lemon zest and whipped farm-fresh ricotta, layered with strawberry compote and organic maple syrup.',
    category: 'Brunch',
    price: 13.50,
    calories: 560,
    dietary: [],
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=600'
  },
  {
    id: 'b3',
    name: 'Evergrove Garden Frittata',
    description: 'Baked egg skillet filled with sun-ripened cherry tomatoes, fresh asparagus tips, goat cheese dollops, and organic baby spinach. Served with baby mixed greens.',
    category: 'Brunch',
    price: 12.50,
    calories: 310,
    dietary: ['GF'],
    image: 'https://images.unsplash.com/photo-1547058886-aa0edd92aab3?q=80&w=600'
  },

  // --- SEASONAL CATEGORY ---
  {
    id: 's1',
    name: 'Summer Strawberry Rose Latte',
    description: 'Cold-pressed strawberry juice, organic rose geranium honey, fresh double espresso, and creamy oat milk shook with ice and organic pink rose petals.',
    category: 'Seasonal',
    price: 7.00,
    calories: 240,
    dietary: ['GF'],
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=600'
  },
  {
    id: 's2',
    name: 'Lemon-Verbena Tart',
    description: 'Crisp pastry shell, lemon verbena herbal curd filling, topped with local wildflower honey meringues and fresh elderflowers. Limited seasonal bake.',
    category: 'Seasonal',
    price: 6.75,
    calories: 310,
    dietary: ['GF'],
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600'
  }
];
