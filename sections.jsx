/* global React */
const { useState, useRef, useEffect } = React;
const { Icon } = window.AureliaCommon;

// ============== PROPERTY CAROUSEL ==============
const PropertyCarousel = ({ properties }) => {
  const [active, setActive] = useState(1);
  const total = properties.length;

  const next = () => setActive((a) => (a + 1) % total);
  const prev = () => setActive((a) => (a - 1 + total) % total);

  const cardFor = (offset) => {
    const idx = (active + offset + total) % total;
    return properties[idx];
  };

  return (
    <section className="properties" id="properties">
      <div className="properties__head">
        <h2 className="properties__title">
          Find Your Dream<br/>Address Today
        </h2>
        <div className="properties__intro">
          <p>Explore our latest residences in the most sought-after neighborhoods. Each one is handpicked, fully managed, and ready for your move-in date.</p>
          <a href="#" className="properties__view-all">View all 142 residences <Icon name="arrow" size={13}/></a>
        </div>
      </div>

      <div className="carousel">
        <div className="carousel__track">
          {[-1, 0, 1].map((offset) => {
            const p = cardFor(offset);
            const isActive = offset === 0;
            return (
              <article
                key={`${offset}-${p.id}`}
                className={`prop-card ${isActive ? "prop-card--active" : "prop-card--side"}`}
                onClick={() => !isActive && (offset > 0 ? next() : prev())}
              >
                <div className="prop-card__media">
                  <img src={["assets/apartments1.jpg","assets/apartment2.jpg","assets/apartment3.jpg"][(p.id - 1) % 3]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <span className="prop-card__tag">
                    <span className="prop-card__tag-dot"/>{p.tag}
                  </span>
                  {!isActive && <div className="prop-card__veil"/>}
                </div>
                <div className="prop-card__body">
                  <div className="prop-card__row">
                    <div>
                      <h3 className="prop-card__name">{p.name}</h3>
                      <div className="prop-card__loc"><Icon name="pin" size={11}/> {p.location}</div>
                    </div>
                    <div className="prop-card__price">
                      {p.price}<span>{p.period}</span>
                    </div>
                  </div>
                  <p className="prop-card__desc">A meticulously composed residence with open living, private outdoor space, and the kind of natural light you remember.</p>
                  <div className="prop-card__meta-row">
                    <div className="prop-card__meta">
                      <span className="prop-card__meta-item"><Icon name="sqft" size={13}/> {p.sqft} ft²</span>
                      <span className="prop-card__meta-item"><Icon name="bed" size={13}/> {p.bed} Bed</span>
                      <span className="prop-card__meta-item"><Icon name="bath" size={13}/> {p.bath} Bath</span>
                    </div>
                    <a className="btn btn--ghost" href="contact.html">Book Now</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="carousel__controls">
          <button className="carousel__btn" onClick={prev} aria-label="Previous">
            <Icon name="arrow-left" size={16}/>
          </button>
          <div className="carousel__dots">
            {properties.map((_, i) => (
              <button
                key={i}
                className={`carousel__dot ${i === active ? "carousel__dot--on" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button className="carousel__btn carousel__btn--solid" onClick={next} aria-label="Next">
            <Icon name="arrow" size={16}/>
          </button>
        </div>
      </div>
    </section>
  );
};

// ============== FAQ ==============
const FAQ = ({ categories, data }) => {
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const [openIdx, setOpenIdx] = useState(0);
  const items = data[activeCat] || [];

  return (
    <section className="faq" id="faq">
      <div className="faq__head">
        <h2 className="faq__title">Frequently Asked Questions</h2>
        <p className="faq__sub">Answers to your questions, every step of the way.</p>
      </div>

      <div className="faq__body">
        <aside className="faq__side">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`faq__cat ${activeCat === c.id ? "faq__cat--on" : ""}`}
              onClick={() => { setActiveCat(c.id); setOpenIdx(0); }}
            >
              <Icon name={c.icon} size={15}/>
              <span>{c.label}</span>
            </button>
          ))}
          <div className="faq__side-card">
            <div className="faq__side-card-title">Still have questions?</div>
            <p>Speak with a residence advisor — typically &lt; 4 minute response.</p>
            <a href="#cta" className="faq__side-card-link">Start a conversation <Icon name="arrow" size={11}/></a>
          </div>
        </aside>

        <div className="faq__list">
          <div className="faq__list-label">{categories.find((c) => c.id === activeCat)?.label}</div>
          {items.map((item, i) => {
            const open = i === openIdx;
            return (
              <button
                key={i}
                className={`faq__item ${open ? "faq__item--open" : ""}`}
                onClick={() => setOpenIdx(open ? -1 : i)}
              >
                <div className="faq__item-row">
                  <span className="faq__q">{item.q}</span>
                  <span className="faq__chev"><Icon name="chevron" size={16}/></span>
                </div>
                {open && <p className="faq__a">{item.a}</p>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============== JOURNEY CTA ==============
const JourneyCTA = () => (
  <section className="journey" id="cta">
    <div className="journey__inner">
      <div className="journey__visual">
        <img src="assets/apartmentscta.jpeg" alt="Aurelia Residences" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div className="journey__copy">
        <h2 className="journey__title">
          Start Your Journey<br/>To A New Home<br/>With <em>Aurelia.</em>
        </h2>
        <p className="journey__body">
          The best residences don't stay listed for long. Tell us how you live, and we'll send a tailored shortlist within 24 hours — no spam, no pressure.
        </p>
        <div className="journey__row">
          <button className="btn btn--light">Get Started <Icon name="arrow" size={13}/></button>
          <span className="journey__note">Or call our concierge: +1 (415) 980 2046</span>
        </div>
      </div>
    </div>

    <div className="connect">
      <div className="connect__left">
        <h3 className="connect__title">
          Connect With Us To<br/>
          Discover Exclusive<br/>
          Residence Opportunities.
        </h3>
        <a href="contact.html" className="btn btn--light" style={{ marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "10px" }}>
          Get a Consultation <Icon name="arrow" size={13}/>
        </a>
      </div>
      <div className="connect__right">
        <a href="contact.html" className="connect__card">
          <div className="connect__card-top">
            <span>Free Consultation</span>
            <Icon name="arrow-up" size={14}/>
          </div>
          <p>A 30-minute call with a residence advisor to scope budget, neighborhood, and timing.</p>
        </a>
        <a href="contact.html" className="connect__card">
          <div className="connect__card-top">
            <span>Book a Private Tour</span>
            <Icon name="arrow-up" size={14}/>
          </div>
          <p>Walk a curated shortlist with your advisor. Virtual or in-person, weekdays and weekends.</p>
        </a>
      </div>
    </div>
  </section>
);

// ============== FOOTER ==============
const Footer = ({ brand }) => (
  <footer className="footer">
    <div className="footer__top">
      <a href="#top" className="footer__brand">
        <span className="footer__brand-mark">◈</span>
        <span>{brand}</span>
      </a>
      <nav className="footer__nav">
        <a href="#top">Home</a>
        <a href="#about">About</a>
        <a href="#properties">Residences <Icon name="chevron" size={11}/></a>
        <a href="#cta">Concierge</a>
        <a href="#faq">Journal</a>
      </nav>
    </div>

    <div className="footer__grid">
      <div className="footer__col">
        <h5>Contact</h5>
        <a href="tel:+14159802046"><Icon name="phone" size={12}/> +1 (415) 980 2046</a>
        <a href="mailto:hello@aureliaresidences.com"><Icon name="mail" size={12}/> hello@aureliaresidences.com</a>
      </div>
      <div className="footer__col">
        <h5>Our Locations</h5>
        <p>123 Steadman Avenue<br/>San Francisco, CA 94108</p>
        <p>40 Mercer Street, Floor 5<br/>New York, NY 10013</p>
      </div>
      <div className="footer__col">
        <h5>Residences</h5>
        <a href="#">Featured Listings</a>
        <a href="#">Skyline Penthouses</a>
        <a href="#">Coastal Villas</a>
        <a href="#">Pied-à-terre</a>
      </div>
      <div className="footer__col">
        <h5>Company</h5>
        <a href="#">Our Advisors</a>
        <a href="#">Press</a>
        <a href="#">Careers</a>
        <a href="#">Journal</a>
      </div>
    </div>

    <div className="footer__bottom">
      <span>© 2026 Aurelia Residences. All rights reserved.</span>
      <div>
        <a href="#">Terms & Conditions</a>
        <a href="#">Privacy Policy</a>
      </div>
    </div>
  </footer>
);

window.AureliaSections = { PropertyCarousel, FAQ, JourneyCTA, Footer };
