/**
 * All website copy lives here, so the site can be edited without touching components.
 *
 * Any text written as [FILL: ...] renders as a visible placeholder chip on the page.
 * Replace it with the real value and the chip disappears.
 */

export const site = {
  name: "Frictionless Tech",
  wordmark: "FRICTIONLESS TECH",
  tagline: "Redefining Retail. Eliminating Checkout Queues.",
  descriptor: "Smart Retail Solutions",
  title: "Frictionless Tech | RFID Checkout for Smart Retail",
  description:
    "Frictionless Tech is building an RFID checkout gate that reads tagged products as shoppers walk through and prepares the bill automatically. Starting in Bengaluru.",
  /** Update this value if Vercel assigns a different production domain or a custom domain is connected. */
  url: "https://frictionless-tech-website.vercel.app",
  email: "frictionlesstech2026@gmail.com",
  phone: "+91 99015 41729",
  location: "Bengaluru, Karnataka, India",
  // No company LinkedIn page has been provided; omit the link until one is available.
  linkedin: "",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Solution", href: "#solution" },
  { label: "Benefits", href: "#benefits" },
  { label: "Technology", href: "#technology" },
  { label: "Our Team", href: "#team" },
  { label: "Contact Us", href: "#contact" },
];

export const home = {
  eyebrow: "Smart Retail Solutions",
  headline: "Redefining Retail. Eliminating Checkout Queues.",
  subhead:
    "We're building an RFID checkout gate for supermarkets and stores. Shoppers walk through with their basket, the gate picks up every tagged product, and the bill is prepared on screen. No unloading the trolley. No scanning items one by one.",
  primaryCta: { label: "Explore Our Solution", href: "#solution" },
  secondaryCta: { label: "Contact Us", href: "#contact" },
  microcopy: "Run a store or a retail chain? We're planning our first pilots in Bengaluru.",
  visualLabel: "Conceptual visual",
  band: "Walk through. Get billed. Keep moving.",
  bringTitle: "What We Bring to Retail",
  bring: [
    {
      title: "Smart Product Identification",
      body: "Every tagged product carries its own ID. Our readers are built to pick it up wherever it sits: in a hand, a bag, a basket or a trolley. Nothing needs to be lined up under a scanner.",
      icon: "tag",
    },
    {
      title: "Faster Checkout Experience",
      body: "Fewer manual steps between the aisle and the exit. The system builds the bill from what it detects, so staff can focus on helping customers and collecting payment.",
      icon: "gate",
    },
    {
      title: "Retail Automation",
      body: "One tag connects the shelf, the bill and the stock count. Each completed sale is designed to update inventory on its own, giving store owners a clearer picture of what's actually on the shelves.",
      icon: "stock",
    },
  ],
  bringCta: { label: "See how it works", href: "#how-it-works" },
} as const;

export const about = {
  eyebrow: "About Us",
  title: "We started at the billing counter.",
  paragraphs: [
    "Frictionless Tech is an early-stage retail technology startup developing RFID-based checkout for supermarkets and organised retail.",
    "Anyone who has shopped on a weekend evening knows the scene. One counter, one scanner, a queue that barely moves, and every item passing through by hand. Shoppers wait. Staff rush to keep up. We believe that wait can be designed out of the store.",
    "So we're building a checkout system that pairs RFID hardware with our own software. It handles product identification, billing and exit verification as one connected flow. We're starting with stores in Bengaluru, then expanding across Karnataka.",
  ],
  vision: {
    title: "Our Vision",
    body: "Shopping that keeps pace with the shopper. We see a future where buying groceries is faster, simpler and smarter because the store does the counting.",
  },
  mission: {
    title: "Our Mission",
    body: "To give retailers checkout technology that is practical to adopt and dependable to run, so their teams spend less time at the scanner and their customers spend less time in line.",
  },
  valuesTitle: "Our Core Values",
  values: [
    { title: "Innovation", body: "We look for the simpler way to do a hard thing, then we build it." },
    { title: "Efficiency", body: "Every step we take out of checkout is time handed back to someone." },
    { title: "Customer Experience", body: "We judge our work from the shopper's side of the counter." },
    { title: "Reliability", body: "A checkout has to work on the busiest day of the year. We design for that day." },
    { title: "Continuous Improvement", body: "We test in real conditions, listen to store owners and keep refining." },
  ],
};

export const solution = {
  eyebrow: "Our Solution",
  title: "A checkout you walk through.",
  intro:
    "At most billing counters today, every product is scanned one at a time. During peak hours, that single step decides how long the queue gets. Our RFID-based checkout is designed to remove it. Products carry RFID tags, the gate reads them together, and the bill comes together while the shopper is still walking.",
  stepsTitle: "How It Works",
  steps: [
    {
      title: "RFID Product Tagging",
      body: "Each product is fitted with an RFID tag that holds a unique ID, linked to its record in the store's product database.",
    },
    {
      title: "Automatic Product Detection",
      body: "As the shopper passes through the reading area, the gate's RFID readers are designed to detect the tagged products they're carrying, whether in hand, in bags, in baskets or in trolleys.",
    },
    {
      title: "Product Identification",
      body: "Our software matches each tag ID against the product database and confirms exactly what's in the basket.",
    },
    {
      title: "Bill Generation",
      body: "The system totals the detected products and shows a draft bill on the gate's POS screen for the shopper to review.",
    },
    {
      title: "Payment and Exit Verification",
      body: "The shopper pays, and the exit-verification step confirms the purchase before they leave the store.",
    },
  ],
  objectiveTitle: "Our Objective",
  objective:
    "To reduce how much retail depends on manual product scanning, and to make checkout smoother for everyone on both sides of the counter.",
  cta: { label: "Request a demo", href: "#contact" },
};

export const benefits = {
  eyebrow: "Benefits",
  title: "Less time at the counter. More time for everything else.",
  intro: "Here's what our system is designed to deliver once it's running in a store.",
  groups: [
    {
      id: "owners",
      title: "For Retail Owners",
      points: [
        "Move shoppers through checkout more efficiently.",
        "Aim for shorter waiting times, especially during peak hours.",
        "Rely less on manual barcode scanning.",
        "Identify products by tag, with no need to line each one up under a scanner.",
        "Take a practical first step toward automating store operations.",
        "Give your regular customers a better reason to come back.",
      ],
    },
    {
      id: "customers",
      title: "For Customers",
      points: [
        "A checkout that asks far less of you.",
        "Less time standing in line at the billing counter.",
        "No unpacking the trolley so each item can be scanned.",
        "A modern way to shop.",
        "Quicker store visits, from the first aisle to the exit.",
      ],
    },
    {
      id: "businesses",
      title: "For Retail Businesses",
      paragraph:
        "For supermarkets, department stores and other organised retail environments, our checkout is designed as a building block for modernisation. A single tag per product links billing with stock, which lays the groundwork for live inventory visibility today and smarter planning tools later.",
    },
  ],
  cta: { label: "Talk to us about a pilot", href: "#contact" },
};

export const technology = {
  eyebrow: "Technology",
  title: "Hardware and software, designed as one system.",
  intro:
    "A small tag on every product, a gate you simply walk through, and our own software tying them together. Here is what makes the checkout work.",
  /** The three parts of the checkout, shown as stacked cards and as a list. */
  pieces: [
    {
      label: "The tag",
      chips: ["On every product", "Its own ID"],
      title: "RFID product tags",
      body: "Every product carries a small tag with its own ID, so the store knows exactly what is in the basket without lining anything up under a scanner.",
    },
    {
      label: "The gate",
      chips: ["Walk through", "Two sensors"],
      title: "The checkout gate",
      body: "Shoppers walk through with their basket. Readers in the gate are designed to pick up the tagged products they carry, and our design uses two sensors to reduce missed reads.",
    },
    {
      label: "The bill",
      chips: ["On screen", "Ready to pay"],
      title: "The bill on screen",
      body: "The products the gate detects become a draft bill on the gate's screen, ready to review and pay before the shopper heads out.",
    },
  ],
  approachTitle: "Our Approach",
  approach: [
    {
      title: "Modular from the start.",
      body: "Hardware and software are built as separate layers, so we can improve one without rebuilding the other.",
    },
    {
      title: "Start small, then scale.",
      body: "We begin in selected store areas and bring RFID, billing and the database together step by step.",
    },
    {
      title: "Built for real shelves.",
      body: "Liquids and metal packaging can interfere with RFID signals. We plan for that with careful tag placement, category-specific handling, repeated detection and database checks.",
    },
  ],
  prototypeTitle: "See an early version",
  prototype: [
    { label: "Prototype web app", href: "https://smart-shop-rfid.vercel.app/" },
    { label: "Video walkthrough", href: "https://youtu.be/gjpguC0N1lA" },
  ],
};

export type Founder = { name: string; role: string; bio: string; photo: string | null; linkedin: string | null };

export const team = {
  eyebrow: "Our Team",
  title: "The people behind Frictionless Tech.",
  intro:
    "We're a team working to make retail operations smarter. Between us we cover hardware, software, business and operations, and we care about building things that hold up in a real store on a busy day.",
  founders: [
    {
      name: "Anmol RJ",
      role: "Founder",
      bio: "Guides the vision and direction of Frictionless Tech, bringing the team together to build a simpler retail checkout experience.",
      photo: "/team/anmol-rj.webp",
      linkedin: null,
    },
    {
      name: "Samarth Houde",
      role: "Chief Financial Officer (CFO)",
      bio: "Oversees financial planning, budgeting and financial strategy as the company develops its retail technology solution.",
      photo: "/team/samarth-houde.webp",
      linkedin: null,
    },
    {
      name: "Anmol Dsouza",
      role: "Chief Executive Officer (CEO)",
      bio: "Leads the company's overall execution, business priorities and growth strategy.",
      photo: "/team/anmol-dsouza.webp",
      linkedin: null,
    },
    {
      name: "Vibha",
      role: "Chief Operating Officer (COO)",
      bio: "Coordinates day-to-day operations and helps turn the company's plans into organised, practical execution.",
      photo: "/team/vibha.webp",
      linkedin: null,
    },
    {
      name: "Jayant Kushagra Singh",
      role: "Chief Technology Officer (CTO)",
      bio: "Leads the technology direction, including the software and hardware integration behind the RFID checkout system.",
      photo: "/team/jayant-kushagra-singh.webp",
      linkedin: null,
    },
  ] as Founder[],
  groups: [
    { title: "Technology", body: "Jayant Kushagra Singh (CTO) leads the technology direction for the RFID checkout platform, including its software and hardware integration." },
    { title: "Business and Operations", body: "Anmol RJ (Founder), Anmol Dsouza (CEO), Samarth Houde (CFO) and Vibha (COO) lead the company's vision, execution, financial planning and operations." },
  ],
  cta: { label: "Work with us", href: "#contact" },
};

export const contact = {
  eyebrow: "Contact Us",
  title: "Let's talk about your checkout.",
  intro:
    "Run a store or a retail chain and want a faster checkout? Investing in retail technology, mentoring early-stage teams or building something we could work on together? Tell us a little about yourself and we'll get back to you.",
  enquiryTypes: ["Retail business", "Investor", "Technology partner", "Incubator or mentor", "Something else"],
  submit: "Prepare Email",
  success: `Your email app should open with a draft addressed to ${site.email}. Review the message and press Send to complete your enquiry. If it does not open, use the Email link in the contact details above.`,
  errors: {
    name: "Please add your name.",
    email: "That email address looks incomplete.",
    type: "Choose the option closest to your enquiry.",
    message: "Tell us a little about what you need.",
  },
  privacy: "This form prepares an email in your email app. Nothing is sent until you press Send.",
};

export const footer = {
  quickLinks: [
    { label: "Home", href: "/#home" },
    { label: "About Us", href: "/#about" },
    { label: "Our Solution", href: "/#solution" },
    { label: "Technology", href: "/#technology" },
    { label: "Our Team", href: "/#team" },
    { label: "Contact Us", href: "/#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and Conditions", href: "/terms" },
  ],
  copyright: "© 2026 Frictionless Tech. All Rights Reserved.",
};
