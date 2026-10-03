import {
  Store, ShoppingBag, Building2, PackageSearch, LineChart, Sparkles,
  Compass, PenTool, Hammer, LifeBuoy
} from 'lucide-react';

const S = '/assets';

export const productDetails = {
  teamwear: {
    hero: 'A multi-sport, multi-club apparel marketplace \u2014 every club runs its own branded store from one platform you control.',
    tagline: 'One platform. Every club, its own store.',
    screenshots: [
      { src: `${S}/kookaburra-teamwear.png`, caption: 'Kookaburra Teamwear \u2014 featured clubs across the marketplace' },
      { src: `${S}/kookaburra-teamwear-clubs.png`, caption: 'Browse-by-sport across community clubs nationwide' }
    ],
    workflows: [
      { title: 'Club onboarding', desc: 'Upload crest, choose colours, pick catalogue \u2014 club store lives in under an hour.' },
      { title: 'Season windows', desc: 'Open and close ordering per club with rebate rules baked in.' },
      { title: 'Personalisation', desc: 'Player name, number and logo captured at the cart \u2014 straight to fulfilment.' },
      { title: 'Locker Room', desc: 'Players keep their size profile, kit and order history season to season.' }
    ],
    groups: [
      { title: 'Store & catalogue', items: ['Per-club colours & crest', 'Custom domains', 'Product library', 'Season ordering windows'] },
      { title: 'Personalisation', items: ['Name & number', 'Club logo placement', 'Size profiles', 'Kit builder'] },
      { title: 'Player experience', items: ['Locker Room', 'Order history', 'Team rosters', 'Bulk distribution'] }
    ],
    related: ['b2c', 'b2b']
  },
  b2c: {
    hero: 'A fast, conversion-built consumer storefront tailored to your catalogue and brand.',
    tagline: 'A storefront that sells the way you do.',
    screenshots: [
      { src: `${S}/kookaburra-b2c-hockey-australia.jpg`, caption: 'Hockey Australia consumer storefront \u2014 branded hero and shop merch' }
    ],
    workflows: [
      { title: 'Merchandising', desc: 'Departments, categories and club/team browsing off one catalogue.' },
      { title: 'Promotions', desc: 'Volume discounts, bundles, countdowns and coupon rules.' },
      { title: 'Checkout & payments', desc: 'Guest, express and multi-currency with fraud rules.' },
      { title: 'Post-purchase', desc: 'Self-serve tracking, returns and review capture built in.' }
    ],
    groups: [
      { title: 'Storefront', items: ['Headless-ready', 'Core Web Vitals tuned', 'Content blocks', 'Search & filters'] },
      { title: 'Conversion', items: ['Reviews', 'Wishlist', 'Volume discounts', 'Size guides'] },
      { title: 'Post-purchase', items: ['Order tracking', 'Returns', 'Subscriptions', 'Loyalty hooks'] }
    ],
    related: ['teamwear', 'analytics']
  },
  b2b: {
    hero: 'Ecommerce built for business buyers, with the account controls wholesale actually needs.',
    tagline: 'How trade actually buys \u2014 online.',
    screenshots: [
      { src: `${S}/kookaburra-b2b.png`, caption: 'Kooka Business Portal \u2014 streamline your wholesale ordering' }
    ],
    workflows: [
      { title: 'Account access', desc: 'Multi-account buyers, roles and approval chains.' },
      { title: 'Quick order', desc: 'Size-matrix grids, Excel imports and reusable templates.' },
      { title: 'Approvals', desc: 'PO numbers, terms and credit limit checks before submit.' },
      { title: 'Invoice checkout', desc: 'Invoice or card, on the account\u2019s payment terms.' }
    ],
    groups: [
      { title: 'Buying', items: ['Quick order', 'Size matrix', 'Excel import', 'Order templates'] },
      { title: 'Controls', items: ['Approvals', 'Credit limit', 'Roles', 'PO numbers'] },
      { title: 'Pricing', items: ['Account pricing', 'Payment terms', 'Volume tiers', 'Quotes'] }
    ],
    related: ['procurement', 'analytics']
  },
  procurement: {
    hero: 'End-to-end procurement and supply chain management wired directly into the same order engine \u2014 not a bolt-on.',
    tagline: 'From request to receipt, one flow.',
    screenshots: [
      { src: `${S}/kookaburra-admin-dashboard.png`, caption: 'Admin portal \u2014 KPIs, trends and inventory health at a glance' }
    ],
    workflows: [
      { title: 'Purchase requests', desc: 'Requesters raise, managers approve \u2014 budgets checked automatically.' },
      { title: 'Purchase orders', desc: 'POs against supplier catalogues with agreed pricing and lead times.' },
      { title: 'Receipt & QA', desc: 'Goods-in with quantity and quality checks, three-way matched.' },
      { title: 'Audit trail', desc: 'Every action captured for finance and compliance.' }
    ],
    groups: [
      { title: 'Sourcing', items: ['Supplier catalogues', 'RFQs', 'Contract pricing', 'Lead times'] },
      { title: 'Approvals', items: ['Budgets', 'Approval workflow', 'Delegations', 'Thresholds'] },
      { title: 'Operations', items: ['Goods receipt', 'Three-way match', 'Audit trail', 'Return to vendor'] }
    ],
    related: ['analytics', 'b2b']
  },
  analytics: {
    hero: 'Real-time visibility across sales, orders and fulfilment \u2014 one dashboard instead of exports and guesswork.',
    tagline: '24 report views. One admin.',
    screenshots: [
      { src: `${S}/kookaburra-analytics.png`, caption: 'Reports dashboard \u2014 sales trend, top products, low stock and recent orders' },
      { src: `${S}/kookaburra-admin-dashboard.png`, caption: 'Overview \u2014 revenue by day, revenue by club and inventory health' }
    ],
    workflows: [
      { title: 'Dashboards', desc: 'Sales, inventory and fulfilment KPIs in one operations view.' },
      { title: 'Drill-down', desc: 'From revenue-by-club straight to the individual order and line.' },
      { title: 'Alerts', desc: 'Low-stock, out-of-stock impact and abandoned cart alerts to the right people.' },
      { title: 'Export', desc: 'Excel and PDF exports plus scheduled email digests.' }
    ],
    groups: [
      { title: 'Sales', items: ['Revenue by club', 'Top products', 'Segments & LTV', 'Abandoned carts'] },
      { title: 'Inventory', items: ['Stock status', 'Low stock', 'Inventory value', 'OOS impact'] },
      { title: 'Admin', items: ['Role-based access', 'Excel export', 'PDF export', 'Custom reports'] }
    ],
    related: ['procurement', 'teamwear']
  },
  ai: {
    hero: 'Practical AI built into the suite \u2014 assistants, automation and insight shaped around your catalogues, orders and workflows, not a generic chatbot bolted on.',
    tagline: 'AI that knows your operation.',
    screenshots: [
      { src: `${S}/kookaburra-admin-dashboard.png`, caption: 'AI assistance surfaces the numbers to act on \u2014 not just another dashboard' }
    ],
    workflows: [
      { title: 'Copilots', desc: 'Assistants that know your catalogue, orders and club data.' },
      { title: 'Automation', desc: 'Merchandising, support and ops tasks handled with human review.' },
      { title: 'Insights', desc: 'What to act on today \u2014 not another dashboard to interpret.' },
      { title: 'Guardrails', desc: 'Role-scoped access, audit logs and human-in-the-loop by default.' }
    ],
    groups: [
      { title: 'Assist', items: ['Catalogue Q&A', 'Order lookup', 'Club data recall', 'Draft comms'] },
      { title: 'Automate', items: ['Merchandising', 'Support triage', 'Ops routines', 'Data cleanup'] },
      { title: 'Insight', items: ['Anomaly alerts', 'Trend digests', 'Action lists', 'Forecast hints'] }
    ],
    related: ['analytics', 'b2c']
  }
};

export const clients = [
  'Kookaburra Sport', 'Hockey Australia', 'Fremantle Dockers', 'North Melbourne',
  'Cricket NSW', 'Melbourne Storm', 'Western Bulldogs', 'Rugby Australia'
];

export const products = [
  {
    id: 'teamwear',
    icon: Store,
    tag: '01',
    title: 'Teamwear',
    lead: 'A multi-sport, multi-club apparel marketplace \u2014 every club runs its own branded store from one platform you control.',
    bullets: [
      'Per-club branded stores with their own colours and crest',
      'Player name & number personalisation with size runs',
      'Locker Room \u2014 saved kit, sizing and order history per player'
    ],
    features: ['Find Your Club', 'Kit builder', 'Size profile', 'Jersey personalisation', 'Season history']
  },
  {
    id: 'b2c',
    icon: ShoppingBag,
    tag: '02',
    title: 'B2C Web Store',
    lead: 'A fast, conversion-built consumer storefront tailored to your catalogue and brand.',
    bullets: [
      'Merchandising and content built around how you sell',
      'Headless-ready, Core Web Vitals tuned',
      'Promotions, bundles and subscriptions'
    ],
    features: ['Reviews', 'Wishlist', 'Volume discounts', 'Order tracking', 'Returns', 'Size guides']
  },
  {
    id: 'b2b',
    icon: Building2,
    tag: '03',
    title: 'B2B Portal',
    lead: 'Ecommerce built for business buyers, with the account controls wholesale actually needs.',
    bullets: [
      'Account-based pricing, terms and credit limits',
      'Bulk ordering, re-orders and quote requests',
      'Buyer roles and approval workflows'
    ],
    features: ['Quick order', 'Size matrix', 'Excel import', 'Order templates', 'Approvals', 'Credit limit']
  },
  {
    id: 'procurement',
    icon: PackageSearch,
    tag: '04',
    title: 'Procurement & SCM',
    lead: 'End-to-end procurement and supply chain management wired directly into the same order engine \u2014 not a bolt-on.',
    bullets: [
      'Purchase requests to PO to receipt in one flow',
      'Supplier catalogues and inventory linked to the storefront',
      'Budgets, approvals and full audit trail across the supply chain'
    ],
    features: ['Purchase orders', 'Supplier catalogues', 'Audit trail', 'Budgets']
  },
  {
    id: 'analytics',
    icon: LineChart,
    tag: '05',
    title: 'Analytics & Reporting',
    lead: 'Real-time visibility across sales, orders and fulfilment \u2014 one dashboard instead of exports and guesswork.',
    bullets: [
      'Sales, inventory and fulfilment dashboards in one place',
      'Custom reports built around your KPIs',
      'Exportable data feeds for finance and operations teams'
    ],
    features: ['Revenue by club', 'Order drill-down', 'Low stock alerts', 'Excel + PDF export', 'Role-based access']
  },
  {
    id: 'ai',
    icon: Sparkles,
    tag: '06',
    title: 'AI Assistance',
    lead: 'Practical AI built into the suite \u2014 assistants, automation and insight shaped around your catalogues, orders and workflows, not a generic chatbot bolted on.',
    bullets: [
      'Assistants that know your catalogue, orders and club data',
      'Automation for merchandising, support and ops tasks',
      'Insights that surface what to act on, not just another dashboard'
    ],
    features: ['Catalogue-aware', 'Ops automation', 'Insight alerts', 'Workflow copilots']
  }
];

export const integrations = [
  { name: 'Sage', role: 'Finance & ERP', desc: 'Orders, invoices and stock levels flow straight into your books.' },
  { name: 'HIVO', role: 'Digital assets', desc: 'Product imagery and brand assets stay in sync across every store.' },
  { name: 'Monday.com', role: 'Work & ops', desc: 'Turn orders and approvals into trackable work automatically.' },
  { name: 'Xero', role: 'Accounting', desc: 'Invoice sync, reconciliation and tax handling wired to every order.' },
  { name: 'Shopify', role: 'Storefront', desc: 'Headless bridge for teams already running Shopify assets.' },
  { name: 'Klaviyo', role: 'Marketing', desc: 'Customer segments and lifecycle flows fed by your order data.' }
];

export const process = [
  { icon: Compass, tag: '01', title: 'Discover', desc: 'We map how your business actually sells, prices, fulfils and reports \u2014 so nothing gets designed against assumptions.' },
  { icon: PenTool, tag: '02', title: 'Design', desc: 'We architect the platform around what we found \u2014 choosing which products, integrations, AI assistance and workflows you actually need, not a fixed template.' },
  { icon: Hammer, tag: '03', title: 'Build', desc: 'We build and configure the suite, connect it to your existing tools, layer in AI assistance, and test it against how your team really works.' },
  { icon: LifeBuoy, tag: '04', title: 'Support', desc: 'You launch with a team that already knows your business \u2014 ongoing support, training and room to extend as you grow.' }
];

export const principles = [
  { tag: '01', title: 'Built around your operation', desc: 'We map how you actually sell, price and fulfil \u2014 then shape the platform to it, instead of handing you a rigid template to work around.' },
  { tag: '02', title: 'End-to-end solution', desc: 'From storefront to procurement to AI assistance, every part of your operation runs through one connected system \u2014 no stitching disconnected tools together.' },
  { tag: '03', title: 'Plugs into your stack', desc: 'We connect to the tools you already run \u2014 from finance and ERP to fulfilment ops \u2014 so commerce isn\u2019t a separate system to manage.' },
  { tag: '04', title: 'Proven, then extended', desc: 'You start on a mature, battle-tested product suite \u2014 and extend it as you grow, without re-platforming or throwing work away.' },
  { tag: '05', title: 'AI that knows your operation', desc: 'Assistants and automation are shaped around how you sell, fulfil and support \u2014 not a generic chatbot dropped onto the storefront.' }
];

export const stats = [
  { value: '$XXM', label: 'GMV processed through the platform', note: 'placeholder' },
  { value: 'XXX+', label: 'Clubs & brands live on StacCraft', note: 'placeholder' },
  { value: '99.9%', label: 'Platform uptime', note: 'placeholder' },
  { value: 'XXd', label: 'Typical time to first store live', note: 'placeholder' }
];

export const caseStudy = {
  title: 'Kookaburra Sport',
  subtitle: 'Four connected systems \u00b7 Bespoke stack',
  chips: ['Teamwear marketplace', 'B2C storefront', 'B2B wholesale portal', 'Analytics & fulfilment'],
  challenge: 'Club kit, consumer retail and trade orders lived in separate places \u2014 so catalogue, size runs and season windows were hard to run as one operation.',
  solution: 'A bespoke stack on one order engine: per-club teamwear stores, licensed stores for Hockey Australia, Fremantle Dockers and North Melbourne, a B2C storefront, and a B2B portal for wholesale and retail partners.',
  outcome: 'Clubs, consumers and trade buyers order through connected systems shaped to how Kookaburra actually sells \u2014 without re-platforming each channel.',
  image: '/assets/photo-1649520937981-763d6a14de7d.jpg'
};

export const caseModules = [
  {
    tag: 'Teamwear',
    title: 'Teamwear marketplace',
    sub: 'Community clubs + licensed partner stores',
    text: 'Hundreds of Australian clubs each get their own branded store, alongside licensed stores for Hockey Australia, Fremantle Dockers and North Melbourne.',
    bullets: [
      'Find Your Club search and browse-by-sport across community clubs nationwide',
      'Per-club colours, crest, catalogue and season order windows',
      'Name, number and club logo personalisation at the point of order',
      'Locker Room \u2014 kit builder, saved size profile and season order history per player'
    ],
    chips: ['Find Your Club', 'Kit builder', 'Size profile', 'Jersey personalisation', 'Season history'],
    image: '/assets/photo-1600364769293-40c659a6c3c0.jpg'
  },
  {
    tag: 'B2C',
    title: 'Consumer storefront',
    sub: 'Cricket, hockey and licensed replica',
    text: 'A conversion-built storefront shaped around the catalogue \u2014 departments, categories and club stores in one shopping experience.',
    bullets: [
      'Departments, categories and club/team browsing off a single catalogue',
      'Ratings and reviews, wishlists and saved favourites',
      'Volume discounts, promo callouts and countdown offers',
      'Self-serve order tracking and return requests after purchase'
    ],
    chips: ['Reviews', 'Wishlist', 'Volume discounts', 'Order tracking', 'Returns', 'Size guides'],
    image: '/assets/photo-1441984904996-e0b6ba687e04.jpg'
  },
  {
    tag: 'B2B',
    title: 'Wholesale & retail portal',
    sub: 'Retail partners, wholesale and club committees',
    text: 'Account-based ordering built for how trade actually buys \u2014 size grids, spreadsheets and sign-off, on the same engine as the club stores.',
    bullets: [
      'Multi-account access \u2014 buyers choose which account they are ordering for',
      'Quick order with size-matrix grids, bulk stock orders and Excel template import',
      'Draft orders, reusable order templates and PO numbers on every order',
      'Approval workflow and invoice checkout against account payment terms'
    ],
    chips: ['Quick order', 'Size matrix', 'Excel import', 'Order templates', 'Approvals', 'Credit limit'],
    image: '/assets/photo-1607123130585-485f5375a79a.jpg'
  },
  {
    tag: 'Analytics',
    title: 'Analytics & fulfilment',
    sub: 'Admin portal \u00b7 24 report views',
    text: 'One operations view across club, consumer and trade \u2014 sales, stock and fulfilment without export gymnastics.',
    bullets: [
      'Sales, revenue by day and revenue by club, with drill-down to the individual order',
      'Stock status, low stock, inventory value and out-of-stock impact',
      'Customer segments, lifetime value, acquisition and abandoned carts',
      'Every report exportable to Excel or PDF for finance and ops'
    ],
    chips: ['Revenue by club', 'Order drill-down', 'Low stock alerts', 'Excel + PDF export', 'Role-based access'],
    image: '/assets/photo-1483985988355-763728e1935b.jpg'
  }
];

export const testimonial = {
  quote: 'What we needed wasn\u2019t another off-the-shelf store. It was a platform shaped around how the business actually runs \u2014 clubs, consumers and trade on one stack \u2014 and that\u2019s what StacCraft delivered.',
  author: 'Operations lead',
  role: 'Kookaburra Sport'
};

export const heroImages = {
  main: '/assets/photo-1783945339973-1e65ec4047d2.jpg',
  side: '/assets/photo-1577212017308-55c4d60d2609.jpg',
  side2: '/assets/photo-1655089131279-8029e8a21ac6.jpg'
};
