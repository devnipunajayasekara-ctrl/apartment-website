/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

// ============== TWEAK DEFAULTS ==============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#B8895A",
  "displayFont": "Cormorant Garamond",
  "uiFont": "Inter",
  "heroOverlay": 0.45,
  "heroHeadline": "Where the city meets serenity.",
  "brandName": "AURELIA",
  "heroVideo": "assets/heronew.mp4"
}/*EDITMODE-END*/;

// ============== DATA ==============
const PROPERTIES = [
  {
    id: 1,
    name: "Marina Penthouse",
    location: "West Bay, Miami",
    price: "$8,400",
    period: "/month",
    bed: 4, bath: 3, sqft: "3,100",
    tag: "Available Now",
    placeholder: "PENTHOUSE • OCEAN VIEW",
    hue: 215,
  },
  {
    id: 2,
    name: "Cliffside Villa",
    location: "Pacific Heights, CA",
    price: "$12,800",
    period: "/month",
    bed: 6, bath: 5, sqft: "5,400",
    tag: "Featured",
    placeholder: "VILLA • SUNSET TERRACE",
    hue: 25,
  },
  {
    id: 3,
    name: "Glasshouse Loft",
    location: "Tribeca, NY",
    price: "$6,950",
    period: "/month",
    bed: 2, bath: 2, sqft: "1,850",
    tag: "Available Now",
    placeholder: "LOFT • SKYLINE",
    hue: 200,
  },
  {
    id: 4,
    name: "Cedar Pavilion",
    location: "Aspen, Colorado",
    price: "$9,200",
    period: "/month",
    bed: 5, bath: 4, sqft: "4,200",
    tag: "Just Listed",
    placeholder: "PAVILION • MOUNTAIN",
    hue: 30,
  },
  {
    id: 5,
    name: "Coral Bay Residence",
    location: "Malibu, CA",
    price: "$14,500",
    period: "/month",
    bed: 5, bath: 5, sqft: "4,800",
    tag: "Available Now",
    placeholder: "BEACHFRONT • POOL",
    hue: 190,
  },
];

const FAQ_CATEGORIES = [
  { id: "leasing", label: "Leasing & Tours", icon: "key" },
  { id: "amenities", label: "Amenities", icon: "spa" },
  { id: "pets", label: "Pets & Policies", icon: "paw" },
  { id: "concierge", label: "Concierge Services", icon: "bell" },
  { id: "billing", label: "Billing & Payments", icon: "card" },
];

const FAQ_DATA = {
  leasing: [
    { q: "What lease terms do you offer at Aurelia?", a: "We offer flexible terms ranging from 6 months to 24 months. Twelve-month leases include a complimentary move-in concierge package, and longer commitments unlock preferred pricing." },
    { q: "How do I schedule a private tour?", a: "Tours can be booked directly through your dedicated residence advisor. Same-week appointments are typically available, and virtual walkthroughs can be arranged within 24 hours." },
    { q: "Is there an application fee?", a: "A non-refundable $150 application fee covers credit verification and a one-on-one consultation. Returning residents are exempt." },
    { q: "Do you accept co-signers and corporate guarantors?", a: "Yes. We partner with most major guarantor services and welcome corporate housing arrangements for executive relocations." },
    { q: "What's included in the move-in package?", a: "White-glove logistics, fresh linens, a stocked pantry kit, and a personalized welcome from your concierge team." },
  ],
  amenities: [
    { q: "Which wellness facilities are on-site?", a: "Each property includes a heated lap pool, an attended fitness studio, a hammam, and a sound-treated meditation pavilion." },
    { q: "Are amenity bookings included in the rent?", a: "Most are. Spa treatments, private dining, and the rooftop terrace are reservable through the resident app at member rates." },
    { q: "Is parking available?", a: "Each residence is paired with two reserved spaces in the secure underground garage, with optional valet for $250/month." },
  ],
  pets: [
    { q: "Are pets welcome?", a: "Aurelia is proudly pet-forward. Two pets per residence with no weight limit, and a private dog run on the third terrace." },
    { q: "Do you offer pet services?", a: "Grooming, dog-walking, and overnight boarding are available through our wellness desk." },
  ],
  concierge: [
    { q: "What services does the concierge offer?", a: "Our 24/7 concierge handles dining reservations, travel coordination, gift sourcing, in-residence chef bookings, and bespoke event planning." },
    { q: "Can the concierge stock my residence before arrival?", a: "Absolutely. Share your preferences and we'll have groceries, florals, and your preferred bath amenities waiting." },
  ],
  billing: [
    { q: "What payment methods are accepted?", a: "ACH transfer, wire, and major credit cards. Annual prepayment unlocks a 4% courtesy discount." },
    { q: "Is renters insurance required?", a: "Yes — we require a minimum $300,000 liability policy. We can connect you with our preferred broker for a same-day quote." },
  ],
};

// ============== ICONS ==============
const Icon = ({ name, size = 16, stroke = "currentColor", fill = "none" }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill, stroke, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "arrow":
      return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case "arrow-up":
      return <svg {...props}><path d="M7 17 17 7M9 7h8v8" /></svg>;
    case "arrow-left":
      return <svg {...props}><path d="M19 12H5M11 5l-7 7 7 7" /></svg>;
    case "chevron":
      return <svg {...props}><path d="m6 9 6 6 6-6" /></svg>;
    case "phone":
      return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>;
    case "play":
      return <svg {...props} fill="currentColor" stroke="none"><path d="M8 5v14l11-7z" /></svg>;
    case "bed":
      return <svg {...props}><path d="M2 9v9M22 18V11a2 2 0 0 0-2-2H10v9M2 14h20" /><circle cx="6" cy="13" r="2" /></svg>;
    case "bath":
      return <svg {...props}><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 10h18v5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-5ZM6 19l-1 2M18 19l1 2" /></svg>;
    case "sqft":
      return <svg {...props}><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" /></svg>;
    case "instagram":
      return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" /></svg>;
    case "x":
      return <svg {...props}><path d="M4 4l16 16M20 4 4 20" /></svg>;
    case "linkedin":
      return <svg {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" /></svg>;
    case "search":
      return <svg {...props}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>;
    case "key":
      return <svg {...props}><path d="m21 2-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>;
    case "spa":
      return <svg {...props}><path d="M12 2c0 5-4 7-4 11a4 4 0 0 0 8 0c0-4-4-6-4-11zM4 18c2 1 4 3 8 3s6-2 8-3" /></svg>;
    case "paw":
      return <svg {...props}><circle cx="5" cy="10" r="2" /><circle cx="9" cy="5" r="2" /><circle cx="15" cy="5" r="2" /><circle cx="19" cy="10" r="2" /><path d="M12 22a5 5 0 0 1-5-5c0-3 2-4 3-6 .5-1 1-2 2-2s1.5 1 2 2c1 2 3 3 3 6a5 5 0 0 1-5 5z" /></svg>;
    case "bell":
      return <svg {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9zM10.3 21a2 2 0 0 0 3.4 0" /></svg>;
    case "card":
      return <svg {...props}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>;
    case "check":
      return <svg {...props}><path d="M20 6 9 17l-5-5" /></svg>;
    case "mail":
      return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>;
    case "pin":
      return <svg {...props}><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z" /><circle cx="12" cy="10" r="3" /></svg>;
    default: return null;
  }
};

// ============== NAV ==============
const Nav = ({ brand, activePage = "home" }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const homePath = activePage === "home" ? "#top" : "index.html";

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <a href={homePath} className="nav__brand">
            <span className="nav__brand-mark">◈</span>
            <span className="nav__brand-name">{brand}</span>
            <span className="nav__brand-sub">RESIDENCES</span>
          </a>
          <nav className="nav__pills">
            <a className={`nav__pill ${activePage === "home" ? "nav__pill--active" : ""}`} href={homePath}>Home</a>
            <a className="nav__pill" href={activePage === "home" ? "#properties" : "index.html#properties"}>Residences</a>
            <a className="nav__pill" href={activePage === "home" ? "#about" : "index.html#about"}>Philosophy</a>
            <a className="nav__pill" href={activePage === "home" ? "#faq" : "index.html#faq"}>Journal</a>
            <a className={`nav__pill ${activePage === "contact" ? "nav__pill--active" : ""}`} href="contact.html">Contact</a>
          </nav>
          <div className="nav__right">
            <a className="nav__social" href="#" aria-label="Instagram"><Icon name="instagram" size={15} /></a>
            <a className="nav__social" href="#" aria-label="X"><Icon name="x" size={15} /></a>
            <a className="nav__social" href="#" aria-label="LinkedIn"><Icon name="linkedin" size={15} /></a>
            <a className="nav__cta" href="contact.html">
              <Icon name="phone" size={13} />
              <span>+1 (415) 980 2046</span>
            </a>
            <button className="nav__burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <button className="mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
        <a href={homePath} onClick={() => setMenuOpen(false)}>Home</a>
        <a href={activePage === "home" ? "#properties" : "index.html#properties"} onClick={() => setMenuOpen(false)}>Residences</a>
        <a href={activePage === "home" ? "#about" : "index.html#about"} onClick={() => setMenuOpen(false)}>Philosophy</a>
        <a href={activePage === "home" ? "#faq" : "index.html#faq"} onClick={() => setMenuOpen(false)}>Journal</a>
        <a href="contact.html" onClick={() => setMenuOpen(false)}>Contact</a>
        <a href="contact.html" className="mobile-menu__cta" onClick={() => setMenuOpen(false)}>Book a Tour</a>
      </div>
    </>
  );
};

// ============== HERO ==============
const Hero = ({ headline, brand, overlay, video }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [video]);
  return (
    <section className="hero" id="top">
      <div className="hero__media">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="">
          <source src={video} type="video/mp4" />
        </video>
        <div className="hero__veil" style={{ background: `linear-gradient(180deg, rgba(0,0,0,${overlay * 0.7}) 0%, rgba(0,0,0,${overlay * 0.3}) 35%, rgba(0,0,0,${overlay * 0.85}) 100%)` }} />
      </div>

      <div className="hero__top">
        <span className="hero__eyebrow">EST. 2014</span>
        <span className="hero__eyebrow hero__eyebrow--right">Showing<br />The Future Of Living</span>
      </div>

      <div className="hero__copy">
        <span className="hero__kicker">REFINED RENTAL LIVING</span>
        <h1 className="hero__title">
          UPGRADE YOUR LIFE<br />
          WITH ARCHITECTURE<br />
          THAT BREATHES
        </h1>
        <p className="hero__sub">{headline}</p>
      </div>

      <h2 className="hero__wordmark" aria-hidden>{brand}</h2>

      <div className="hero__stats">
        <div className="hero__stat">
          <div className="hero__stat-num">5.9K<span>+</span></div>
          <div className="hero__stat-label">Residents calling Aurelia<br />home around the world.</div>
        </div>
        <div className="hero__stat">
          <div className="hero__stat-num">$2.1B<span>+</span></div>
          <div className="hero__stat-label">In curated residences placed<br />since our founding.</div>
        </div>
      </div>

      <div className="hero__cta-row">
        <button className="hero__btn hero__btn--ghost" onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}>
          <span>DISCOVER MORE</span>
          <Icon name="arrow" size={13} />
        </button>
        <a className="hero__btn hero__btn--solid" href="contact.html">
          <span>BOOK NOW</span>
          <Icon name="arrow" size={13} />
        </a>
      </div>

      <div className="hero__corner hero__corner--left">
        <div>Press Certified</div>
        <div>Forbes 25, Architectural Digest</div>
        <div>2024 Honoree</div>
      </div>
      <div className="hero__corner hero__corner--right">
        Welcome To The Future<br />Of Living
      </div>
    </section>
  );
};

// ============== EXCELLENCE ==============
const Excellence = () => (
  <section className="excellence" id="about">
    <div className="excellence__head">
      <h2 className="excellence__title">
        Experience Excellence<br />
        In Every Square Foot
      </h2>
    </div>
    <div className="excellence__grid">
      <div className="excellence__col excellence__col--left">
        <h3>Your trusted partner in finding the perfect address.</h3>
        <p>At Aurelia Residences, we believe a home should be more than a lease — it should be the backdrop to the best chapters of your life. Every residence is hand-selected, hospitality-managed, and ready the moment you arrive.</p>
        <button className="btn btn--dark">About Us <Icon name="arrow" size={13} /></button>
        <div className="excellence__partners">
          <span className="excellence__partners-label">In Partnership With</span>
          <div className="excellence__partners-row">
            <span className="partner-mark">◇ Halcyon</span>
            <span className="partner-mark">▲ Boltshift</span>
            <span className="partner-mark">⬡ Quotient</span>
          </div>
        </div>
      </div>

      <div className="excellence__col excellence__col--mid">
        <div className="excellence__photo">
          <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
            <source src="assets/ups.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="excellence__col excellence__col--right">
        <div className="excellence__feature">
          <h4>Concierge Guidance</h4>
          <p>Dedicated residence advisors translate your tastes into a shortlist of a few perfect matches — no scrolling, no compromise.</p>
        </div>
        <div className="excellence__divider" />
        <div className="excellence__feature">
          <h4>An Uncommon Selection</h4>
          <p>From skyline penthouses to coastal pavilions, every residence is vetted for craft, light, and the small details that make a place feel like yours.</p>
        </div>
        <div className="excellence__divider" />
        <div className="excellence__reviews">
          <div className="excellence__avatars">
            <span /><span /><span /><span />
          </div>
          <div>
            <div className="excellence__rating">
              <span className="excellence__stars">★★★★★</span>
              <span className="excellence__score">4.9</span>
            </div>
            <div className="excellence__rating-label">From 1,240+ resident reviews</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

window.AureliaCommon = { Icon, Nav, Hero, Excellence, PROPERTIES, FAQ_CATEGORIES, FAQ_DATA, TWEAK_DEFAULTS };

