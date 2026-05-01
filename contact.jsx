/* global React */
const { useState } = React;
const { Icon } = window.AureliaCommon;

// Country list (subset, common ones)
const COUNTRIES = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "ZA", name: "South Africa", dial: "+27" },
];

const TITLES = ["Mr.", "Mrs.", "Ms.", "Mx.", "Dr.", "Prof."];

const ContactHero = () => (
  <section className="cpage-hero">
    <div className="cpage-hero__media">
      <img src="assets/contact-hero.jpeg" alt="Aurelia Residences flagship villa"/>
      <div className="cpage-hero__veil"/>
    </div>
    <div className="cpage-hero__top">
      <span>EST. 2014</span>
      <span style={{ textAlign: "right" }}>Concierge<br/>Available 24/7</span>
    </div>
    <div className="cpage-hero__inner">
      <span className="cpage-hero__kicker">GET IN TOUCH</span>
      <h1 className="cpage-hero__title">
        Let's find the residence<br/>that fits your life.
      </h1>
      <p className="cpage-hero__sub">
        Tell us a little about yourself and an Aurelia residence advisor will follow up within one business day — typically much faster.
      </p>
      <a href="#form" className="cpage-hero__cta">
        <span>BEGIN INQUIRY</span>
        <Icon name="arrow" size={13}/>
      </a>
    </div>
    <div className="cpage-hero__corner cpage-hero__corner--left">
      <div>Aurelia Concierge</div>
      <div>Hand-curated residences</div>
      <div>Worldwide</div>
    </div>
    <div className="cpage-hero__corner cpage-hero__corner--right">
      Steadman Avenue<br/>Flagship — SF
    </div>
  </section>
);

const ContactForm = () => {
  const [form, setForm] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    country: "US",
    email: "",
    phoneCountry: "US",
    phone: "",
    methods: { email: true, whatsapp: false },
    inquiry: "",
    budget: "",
    privacy: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = true;
    if (!form.lastName.trim()) errs.lastName = true;
    if (!form.email.includes("@")) errs.email = true;
    if (!form.phone.trim()) errs.phone = true;
    if (!form.inquiry.trim()) errs.inquiry = true;
    if (!form.privacy) errs.privacy = true;
    if (!form.methods.email && !form.methods.whatsapp) errs.methods = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const dial = COUNTRIES.find((c) => c.code === form.phoneCountry)?.dial;

  if (submitted) {
    return (
      <section className="cform">
        <div className="cform__success">
          <div className="cform__success-icon"><Icon name="check" size={28}/></div>
          <h2>Thank you, {form.firstName}.</h2>
          <p>An Aurelia residence advisor will be in touch via {form.methods.email && form.methods.whatsapp ? "email or WhatsApp" : form.methods.whatsapp ? "WhatsApp" : "email"} within one business day.</p>
          <button className="btn btn--dark" onClick={() => { setSubmitted(false); setForm({ ...form, firstName: "", lastName: "", email: "", phone: "", inquiry: "", privacy: false }); }}>
            Submit another inquiry <Icon name="arrow" size={13}/>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="cform" id="form">
      <div className="cform__head">
        <span className="cform__step">01 / INQUIRY FORM</span>
        <h2>Send us your inquiry</h2>
        <p>All fields marked with an asterisk (*) are required.</p>
      </div>

      <form className="cform__form" onSubmit={handleSubmit} noValidate>
        {/* Name row */}
        <div className="cform__row cform__row--three">
          <div className="cform__field">
            <label>Title</label>
            <select value={form.title} onChange={(e) => set("title", e.target.value)}>
              {TITLES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className={`cform__field ${errors.firstName ? "cform__field--err" : ""}`}>
            <label>First name *</label>
            <input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Your first name"/>
          </div>
          <div className={`cform__field ${errors.lastName ? "cform__field--err" : ""}`}>
            <label>Last name *</label>
            <input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Your last name"/>
          </div>
        </div>

        {/* Country of residence */}
        <div className="cform__field">
          <label>Country of residence *</label>
          <select value={form.country} onChange={(e) => set("country", e.target.value)}>
            {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </div>

        {/* Email */}
        <div className={`cform__field ${errors.email ? "cform__field--err" : ""}`}>
          <label>Email address *</label>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com"/>
        </div>

        {/* Phone with country code */}
        <div className={`cform__field ${errors.phone ? "cform__field--err" : ""}`}>
          <label>Contact number *</label>
          <div className="cform__phone">
            <select className="cform__phone-code" value={form.phoneCountry} onChange={(e) => set("phoneCountry", e.target.value)}>
              {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.code} {c.dial}</option>)}
            </select>
            <span className="cform__phone-prefix">{dial}</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="000 000 0000"
            />
          </div>
        </div>

        {/* Budget */}
        <div className="cform__field">
          <label>Budget range (per month)</label>
          <select value={form.budget} onChange={(e) => set("budget", e.target.value)}>
            <option value="">Select a range — optional</option>
            <option>Under $5,000</option>
            <option>$5,000 – $10,000</option>
            <option>$10,000 – $20,000</option>
            <option>$20,000+</option>
          </select>
        </div>

        {/* Preferred contact method */}
        <div className={`cform__field ${errors.methods ? "cform__field--err" : ""}`}>
          <label>Preferred method of contact *</label>
          <div className="cform__checks">
            <label className="cform__check">
              <input
                type="checkbox"
                checked={form.methods.email}
                onChange={(e) => set("methods", { ...form.methods, email: e.target.checked })}
              />
              <span className="cform__check-box"/>
              <span><Icon name="mail" size={14}/> Email</span>
            </label>
            <label className="cform__check">
              <input
                type="checkbox"
                checked={form.methods.whatsapp}
                onChange={(e) => set("methods", { ...form.methods, whatsapp: e.target.checked })}
              />
              <span className="cform__check-box"/>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-1-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.2 2.9.1.2 2 3.1 4.9 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                WhatsApp
              </span>
            </label>
          </div>
        </div>

        {/* Inquiry */}
        <div className={`cform__field ${errors.inquiry ? "cform__field--err" : ""}`}>
          <label>Your inquiry *</label>
          <textarea
            rows={5}
            value={form.inquiry}
            onChange={(e) => set("inquiry", e.target.value)}
            placeholder="Tell us about the residence you're seeking — neighborhood, timing, household, anything else we should know."
          />
        </div>

        {/* Privacy */}
        <label className={`cform__privacy ${errors.privacy ? "cform__privacy--err" : ""}`}>
          <input
            type="checkbox"
            checked={form.privacy}
            onChange={(e) => set("privacy", e.target.checked)}
          />
          <span className="cform__check-box"/>
          <span>I confirm that I have read and agree to the <a href="#">Privacy Policy</a> of Aurelia Residences and consent to being contacted regarding my inquiry. *</span>
        </label>

        <div className="cform__submit-row">
          <button type="submit" className="btn btn--dark cform__submit">
            Send inquiry <Icon name="arrow" size={13}/>
          </button>
          <span className="cform__note">We respond within one business day.</span>
        </div>
      </form>
    </section>
  );
};

const ContactInfo = () => (
  <section className="cinfo">
    <div className="cinfo__head">
      <span className="cinfo__step">02 / OUR DETAILS</span>
      <h2>Contact information</h2>
      <p>Prefer to reach us directly? Here's where to find us.</p>
    </div>
    <div className="cinfo__grid">
      <div className="cinfo__card">
        <div className="cinfo__icon"><Icon name="pin" size={18}/></div>
        <h4>Address</h4>
        <p>123 Steadman Avenue<br/>Floor 14, Suite 1402<br/>San Francisco, CA 94108<br/>United States</p>
        <a href="https://maps.google.com" target="_blank" rel="noopener">Get directions <Icon name="arrow" size={11}/></a>
      </div>
      <div className="cinfo__card">
        <div className="cinfo__icon"><Icon name="mail" size={18}/></div>
        <h4>Email</h4>
        <p>General inquiries<br/><a href="mailto:hello@aureliaresidences.com">hello@aureliaresidences.com</a></p>
        <p>Press &amp; partnerships<br/><a href="mailto:press@aureliaresidences.com">press@aureliaresidences.com</a></p>
      </div>
      <div className="cinfo__card">
        <div className="cinfo__icon"><Icon name="phone" size={18}/></div>
        <h4>Contact number</h4>
        <p>Concierge line<br/><a href="tel:+14159802046">+1 (415) 980 2046</a></p>
        <p>International<br/><a href="tel:+442045770000">+44 20 4577 0000</a></p>
        <span className="cinfo__hours">Mon–Sat · 7 AM – 9 PM PT</span>
      </div>
    </div>
  </section>
);

const ContactMap = () => (
  <section className="cmap">
    <div className="cmap__head">
      <span className="cinfo__step">03 / FIND US</span>
      <h2>Visit our flagship office</h2>
      <p>Tours by appointment. Drop-ins welcome on Wednesdays from 11 AM – 4 PM.</p>
    </div>
    <div className="cmap__frame">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=-122.412%2C37.789%2C-122.395%2C37.798&amp;layer=mapnik&amp;marker=37.7937%2C-122.4036"
        loading="lazy"
        title="Aurelia Residences office location map"
      ></iframe>
      <div className="cmap__pin-card">
        <div className="cmap__pin-tag">AURELIA · SF</div>
        <h4>Steadman Avenue Flagship</h4>
        <p>123 Steadman Avenue, Floor 14<br/>San Francisco, CA 94108</p>
        <a className="btn btn--dark" href="https://www.google.com/maps/search/?api=1&query=123+Steadman+Avenue+San+Francisco" target="_blank" rel="noopener">
          Open in Google Maps <Icon name="arrow-up" size={12}/>
        </a>
      </div>
    </div>
  </section>
);

window.ContactPage = { ContactHero, ContactForm, ContactInfo, ContactMap };
