import { useState, useEffect } from 'react'
import { Menu, X, Users, Handshake, RefreshCw, ChevronDown, ArrowRight, Check, Star, MapPin } from 'lucide-react'
import FamilyIntakeModal from './FamilyIntakeModal'
import CoordinatorIntakeModal from './CoordinatorIntakeModal'

// ─── Custom SVG icons (lucide-react has no brand icons) ───────────────────────

const IconInstagram = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
)
const IconLinkedin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

// ─── Design tokens ────────────────────────────────────────────────────────────

const S = {
  serif: { fontFamily: "'Cormorant Garant', Georgia, serif" },
  sans:  { fontFamily: "'DM Sans', system-ui, sans-serif" },

  // Palette: #3A532F #B3B7AA #7D8C75 #AE7C4A #744221
  bg:         '#E6E9E2',   // light sage background
  bgAlt:      '#D8DDD4',   // slightly deeper sage for alternating sections
  card:       '#FFFFFF',   // white card surface
  cardBorder: 'rgba(28,40,25,0.1)',

  text:   '#1C2819',       // dark forest green text
  muted:  '#6B7967',       // mid sage-green — readable on light bg

  amber:      '#AE7C4A',   // family CTA (warm amber-brown)
  amberHover: '#966138',   // darken on hover (light bg)
  amberGlow:  'rgba(174,124,74,0.15)',

  sage:      '#7D8C75',    // coordinator accent (medium sage)
  sageHover: '#5E6E58',    // darken on hover
  sageGlow:  'rgba(125,140,117,0.18)',

  forest:    '#3A532F',    // forest green (badge backgrounds, section accents)
  brown:     '#744221',    // dark brown (secondary elements)
}

// ─── Images ───────────────────────────────────────────────────────────────────

const IMG = {
  heroRoom:   'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
  farmhouse:  'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=900&q=80',
  dog:        'https://images.unsplash.com/photo-1543556153-01d3c066a72a?auto=format&fit=crop&w=700&q=80',
  childCam:   'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=80',
  exterior:   'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RESPONSIBILITIES = [
  'Vendor scheduling & follow-up',
  'Grocery & errand management',
  'Household calendar coordination',
  'Contractor oversight',
  'Package & delivery management',
  'Travel & logistics support',
  'Household budget tracking',
  'Staff communication',
  'Home maintenance scheduling',
  'Event & entertaining prep',
  'School & childcare coordination',
  'Moving & project management',
]

const HOW_IT_WORKS = [
  {
    icon: <Users size={26} />,
    label: 'Curated Matching',
    title: 'We do the vetting',
    body: 'Every coordinator in the Helm network is personally screened — background checked, reference verified, and interviewed. You get a curated shortlist, not a browsable database.',
  },
  {
    icon: <Handshake size={26} />,
    label: 'Guided Placement',
    title: 'We support the hire',
    body: 'Helm provides interview guides, salary benchmarking, and contract templates so you hire confidently — and your coordinator starts on solid footing.',
  },
  {
    icon: <RefreshCw size={26} />,
    label: 'Ongoing Relationship',
    title: 'We stay in the picture',
    body: '30, 60, and 90-day check-ins with both sides. If something isn\'t working, we\'ll help you navigate it.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'I went from spending two hours a week wrangling contractors to having Elena handle everything. Game changer.',
    name: 'Maya R.',
    location: 'Silver Lake',
    stars: 5,
    img: IMG.dog,
  },
  {
    quote: 'We had a new coordinator placed and up to speed in under three weeks. The process was remarkably smooth.',
    name: 'James & Priya T.',
    location: 'Brentwood',
    stars: 5,
    img: IMG.childCam,
  },
  {
    quote: 'Worth every penny of the subscription. Our coordinator basically runs our house.',
    name: 'Sarah K.',
    location: 'Pasadena',
    stars: 5,
    img: IMG.farmhouse,
  },
]

const MEMBERSHIP_FEATURES = [
  'Access to Helm\'s vetted coordinator network',
  'Curated match recommendations',
  'Interview guide + salary benchmarking',
  'Contract template library',
  'Payroll & compliance resource guide',
  '30/60/90-day relationship check-ins',
  'Cancel anytime',
]

const PLACEMENT_FEATURES = [
  'Reference check facilitation',
  'Offer letter builder',
  'Workers\' comp setup guidance',
  '30-day placement guarantee (rematch if not a fit)',
]

const COORDINATOR_BENEFITS = [
  'Consistent part-time or full-time placements',
  'Pre-negotiated, fair compensation expectations',
  'Contract and employment structure guidance',
  'A network of peers in the coordinator community',
  'No mass applications — selective, curated introductions only',
]

const FAQS = [
  {
    q: 'What exactly does a home coordinator do?',
    a: 'It depends on your household\'s needs — but typically: vendor and contractor scheduling, grocery and errand management, household calendar oversight, package and delivery coordination, light personal assistant work, and ongoing household logistics. Your coordinator is not a cleaner or nanny — they\'re an organizer and operator.',
  },
  {
    q: 'How long does matching take?',
    a: 'Most families receive their first coordinator introduction within 7–10 business days of completing their intake. Full placement typically happens within 2–4 weeks.',
  },
  {
    q: 'Is the coordinator my employee?',
    a: 'Yes. Helm facilitates the match and supports the hiring process, but your coordinator is employed directly by your household as a W-2 employee. We guide you through every step of setting that up correctly, including workers\' comp and payroll.',
  },
  {
    q: 'What if it\'s not a good fit?',
    a: 'We offer a 30-day rematch guarantee. If the placement isn\'t working within the first 30 days, we\'ll re-match you at no additional placement fee.',
  },
  {
    q: 'How many hours per week does a coordinator typically work?',
    a: 'Most Helm placements are 10–20 hours per week. Some families grow into full-time arrangements over time.',
  },
  {
    q: 'Is Helm available outside Los Angeles?',
    a: 'We\'re launching in LA first. Join the waitlist and we\'ll notify you when we expand to your city.',
  },
]

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({ onOpenFamily, onOpenCoordinator }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'For Coordinators', href: '#for-coordinators' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  const base = { padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', ...S.sans }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: scrolled ? 'rgba(224,228,218,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? `1px solid ${S.cardBorder}` : '1px solid transparent',
      transition: 'all 0.35s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Logo */}
          <div style={{ ...S.serif, fontSize: 30, fontWeight: 600, letterSpacing: '-0.5px', color: S.text, userSelect: 'none' }}>
            Helm
          </div>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
            {links.map(l => (
              <a key={l.label} href={l.href} style={{ color: S.muted, fontSize: 14, textDecoration: 'none', transition: 'color 0.2s', ...S.sans }}
                onMouseEnter={e => e.currentTarget.style.color = S.text}
                onMouseLeave={e => e.currentTarget.style.color = S.muted}
              >{l.label}</a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div style={{ display: 'flex', gap: 10 }} className="hidden md:flex">
            <button onClick={onOpenCoordinator} style={{ ...base, background: 'transparent', color: S.text, border: `1px solid ${S.cardBorder}` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = S.sage; e.currentTarget.style.color = S.text; e.currentTarget.style.background = S.sageGlow }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = S.cardBorder; e.currentTarget.style.background = 'transparent' }}
            >Join as a Coordinator</button>
            <button onClick={onOpenFamily} style={{ ...base, background: S.amber, color: '#fff', border: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = S.amberHover; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = S.amber; e.currentTarget.style.transform = 'translateY(0)' }}
            >Find a Coordinator</button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(v => !v)} className="flex md:hidden"
            style={{ background: 'none', border: 'none', color: S.text, cursor: 'pointer', padding: 8, display: 'flex' }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ padding: '12px 0 24px', borderTop: `1px solid ${S.cardBorder}` }}>
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '13px 0', color: S.muted, fontSize: 15, textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              <button onClick={() => { onOpenCoordinator(); setMenuOpen(false) }} style={{ ...base, background: 'transparent', color: S.text, border: `1px solid ${S.cardBorder}`, textAlign: 'center' }}>
                Join as a Coordinator
              </button>
              <button onClick={() => { onOpenFamily(); setMenuOpen(false) }} style={{ ...base, background: S.amber, color: '#fff', border: 'none', textAlign: 'center' }}>
                Find a Coordinator
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ onOpenFamily, onOpenCoordinator }) {
  const hoods = ['Silver Lake', 'Brentwood', 'Pasadena', 'Santa Monica', 'Los Feliz']

  return (
    <section style={{
      minHeight: '100vh', paddingTop: 72, display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', background: S.bg,
    }}>
      {/* Subtle top-right texture */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, right: 0, width: '55%', height: '100%', pointerEvents: 'none',
        background: 'linear-gradient(135deg, transparent 40%, rgba(58,83,47,0.07) 100%)',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 28px', width: '100%', position: 'relative', zIndex: 2 }}>
        {/* Two-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid">

          {/* Left: text */}
          <div>
            {/* Location badge */}
            <div className="fade-in-up" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '5px 14px', borderRadius: 100,
              background: 'rgba(58,83,47,0.1)', border: `1px solid rgba(58,83,47,0.25)`,
              marginBottom: 32,
            }}>
              <MapPin size={12} color={S.sage} />
              <span style={{ fontSize: 11, color: S.sage, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
                Los Angeles
              </span>
            </div>

            {/* Headline */}
            <h1 className="fade-in-up delay-100" style={{
              ...S.serif, fontSize: 'clamp(48px, 5.5vw, 80px)', fontWeight: 600,
              lineHeight: 1.06, letterSpacing: '-0.5px', color: S.text,
              margin: '0 0 26px',
            }}>
              Your household,<br />
              <em style={{ fontStyle: 'italic', color: S.amber }}>expertly</em>{' '}
              coordinated.
            </h1>

            {/* Sub */}
            <p className="fade-in-up delay-200" style={{
              fontSize: 17, lineHeight: 1.7, color: S.muted,
              margin: '0 0 44px', maxWidth: 520,
            }}>
              Helm matches Los Angeles families with vetted home coordinators — dedicated professionals who manage the details so you don't have to.
            </p>

            {/* CTAs */}
            <div className="fade-in-up delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginBottom: 48 }}>
              <button onClick={onOpenFamily} style={{
                padding: '16px 32px', background: S.amber, color: '#fff',
                border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.25s', ...S.sans,
                display: 'flex', alignItems: 'center', gap: 8,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = S.amberHover; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 40px ${S.amberGlow}` }}
                onMouseLeave={e => { e.currentTarget.style.background = S.amber; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                Find Your Coordinator <ArrowRight size={16} />
              </button>
              <a onClick={e => { e.preventDefault(); onOpenCoordinator() }} href="#" style={{
                fontSize: 14, color: S.muted, textDecoration: 'none',
                transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 6,
              }}
                onMouseEnter={e => e.currentTarget.style.color = S.text}
                onMouseLeave={e => e.currentTarget.style.color = S.muted}
              >
                Are you a coordinator? Apply here <ArrowRight size={13} />
              </a>
            </div>

            {/* Neighborhoods */}
            <div className="fade-in-up delay-400" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: 'rgba(179,183,170,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Trusted by families in
              </span>
              {hoods.map((n, i) => (
                <span key={n} style={{ fontSize: 12, color: 'rgba(179,183,170,0.6)' }}>
                  {n}{i < hoods.length - 1 && <span style={{ color: 'rgba(179,183,170,0.25)', marginLeft: 6 }}>·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <div className="fade-in-up delay-200 hero-photo-col" style={{ position: 'relative' }}>
            {/* Main photo */}
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
              border: `1px solid rgba(125,140,117,0.15)`,
              aspectRatio: '4/5',
            }}>
              <img
                src={IMG.heroRoom}
                alt="Warm California living room"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="eager"
              />
            </div>
            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: 28, left: -24,
              background: '#FFFFFF', border: `1px solid ${S.cardBorder}`,
              borderRadius: 14, padding: '14px 20px',
              boxShadow: '0 8px 32px rgba(28,40,25,0.12)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: S.amberGlow, border: `1px solid rgba(174,124,74,0.3)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: S.amber,
              }}>
                <Check size={18} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: S.text, ...S.sans }}>7–10 days to match</div>
                <div style={{ fontSize: 11, color: S.muted, marginTop: 2 }}>Average placement timeline</div>
              </div>
            </div>
            {/* Top-right accent */}
            <div style={{
              position: 'absolute', top: -16, right: -16,
              background: S.forest, borderRadius: 12,
              padding: '10px 16px', border: `1px solid rgba(58,83,47,0.4)`,
            }}>
              <div style={{ fontSize: 11, color: 'rgba(179,183,170,0.8)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>LA families</div>
              <div style={{ ...S.serif, fontSize: 26, fontWeight: 600, color: '#E6E9E2', lineHeight: 1 }}>200+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function ResponsibilityTicker() {
  const doubled = [...RESPONSIBILITIES, ...RESPONSIBILITIES]
  return (
    <div style={{ background: S.card, borderTop: `1px solid ${S.cardBorder}`, borderBottom: `1px solid ${S.cardBorder}`, padding: '20px 0', overflow: 'hidden' }} className="ticker-wrapper">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: 13, color: S.muted, padding: '4px 24px', letterSpacing: '0.01em', ...S.sans }}>{item}</span>
            <span style={{ color: S.amber, fontSize: 9, opacity: 0.7 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ padding: 'clamp(80px,10vw,140px) 28px', background: S.bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: S.amber, marginBottom: 16, fontWeight: 500 }}>How It Works</div>
          <h2 style={{ ...S.serif, fontSize: 'clamp(36px,5vw,56px)', fontWeight: 600, lineHeight: 1.1, margin: '0 0 20px', color: S.text }}>
            Thoughtfully matched.<br />Genuinely supported.
          </h2>
          <p style={{ fontSize: 17, color: S.muted, maxWidth: 480, margin: '0 auto' }}>
            We do the hard work of finding, vetting, and supporting the right person for your household.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {HOW_IT_WORKS.map((p, i) => (
            <div key={i} className={`reveal reveal-d${i + 1}`} style={{
              background: S.card, border: `1px solid ${S.cardBorder}`, borderRadius: 18,
              padding: '40px 36px', transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 2px 16px rgba(28,40,25,0.06)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(174,124,74,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(28,40,25,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = S.cardBorder; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(28,40,25,0.06)' }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 12, marginBottom: 28,
                background: 'rgba(174,124,74,0.1)', border: '1px solid rgba(174,124,74,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.amber,
              }}>{p.icon}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(179,183,170,0.45)', marginBottom: 10, fontWeight: 500 }}>{p.label}</div>
              <h3 style={{ ...S.serif, fontSize: 26, fontWeight: 600, color: S.text, margin: '0 0 14px', lineHeight: 1.2 }}>{p.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: S.muted, margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function PricingSection() {
  return (
    <section id="pricing" style={{ padding: 'clamp(80px,10vw,140px) 28px', background: S.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: S.amber, marginBottom: 16, fontWeight: 500 }}>Pricing</div>
          <h2 style={{ ...S.serif, fontSize: 'clamp(36px,5vw,56px)', fontWeight: 600, lineHeight: 1.1, margin: '0 0 16px', color: S.text }}>
            Simple, transparent pricing.
          </h2>
          <p style={{ fontSize: 17, color: S.muted, maxWidth: 440, margin: '0 auto' }}>
            No hidden fees. You only pay the placement fee when we find your person.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>
          {/* Membership */}
          <div className="reveal reveal-d1" style={{ background: S.card, border: `1px solid ${S.cardBorder}`, borderRadius: 20, padding: '44px 40px' }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: S.muted, marginBottom: 12, fontWeight: 500 }}>Household Membership</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                <span style={{ ...S.serif, fontSize: 58, fontWeight: 600, color: S.text, lineHeight: 1 }}>$99</span>
                <span style={{ fontSize: 16, color: S.muted }}>/month</span>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(179,183,170,0.55)', margin: 0 }}>Billed monthly. Cancel anytime.</p>
            </div>
            <div style={{ height: 1, background: S.cardBorder, marginBottom: 28 }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {MEMBERSHIP_FEATURES.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: S.muted, lineHeight: 1.5 }}>
                  <span style={{ color: S.amber, marginTop: 2, flexShrink: 0 }}><Check size={14} /></span>
                  {f}
                </li>
              ))}
            </ul>
            <button style={{
              width: '100%', padding: '15px 24px', background: S.amber, color: '#fff',
              border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', ...S.sans,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = S.amberHover; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = S.amber; e.currentTarget.style.transform = 'translateY(0)' }}
            >Get Started</button>
          </div>

          {/* Placement */}
          <div className="reveal reveal-d2" style={{
            background: S.card, border: `1px solid rgba(174,124,74,0.35)`, borderRadius: 20, padding: '44px 40px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div aria-hidden style={{
              position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%',
              background: `radial-gradient(circle, ${S.amberGlow} 0%, transparent 70%)`, pointerEvents: 'none',
            }} />
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: S.amber, marginBottom: 12, fontWeight: 500 }}>Placement Fee</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                <span style={{ ...S.serif, fontSize: 58, fontWeight: 600, color: S.text, lineHeight: 1 }}>$500</span>
                <span style={{ fontSize: 16, color: S.muted }}>one-time</span>
              </div>
              <p style={{ fontSize: 14, color: S.amber, margin: 0, fontWeight: 500 }}>Only charged on successful hire.</p>
            </div>
            <div style={{ height: 1, background: 'rgba(174,124,74,0.2)', marginBottom: 28 }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {PLACEMENT_FEATURES.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: S.muted, lineHeight: 1.5 }}>
                  <span style={{ color: S.amber, marginTop: 2, flexShrink: 0 }}><Check size={14} /></span>
                  {f}
                </li>
              ))}
            </ul>
            <div style={{
              padding: '14px 18px', background: 'rgba(174,124,74,0.07)', borderRadius: 10,
              border: '1px solid rgba(174,124,74,0.2)', fontSize: 13, color: S.muted, lineHeight: 1.55,
            }}>
              Included with your membership — no separate checkout required.
            </div>
          </div>
        </div>

        <div className="reveal" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'rgba(179,183,170,0.45)', margin: 0 }}>
            <span style={{ color: S.sage }}>Coordinators join for free.</span> Helm is free to apply and free to match — coordinators pay nothing.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) 28px', background: S.bg }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: S.amber, marginBottom: 16, fontWeight: 500 }}>Testimonials</div>
          <h2 style={{ ...S.serif, fontSize: 'clamp(36px,5vw,56px)', fontWeight: 600, lineHeight: 1.1, margin: 0, color: S.text }}>
            What LA families are saying.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`reveal reveal-d${i + 1}`} style={{
              background: S.card, border: `1px solid ${S.cardBorder}`, borderRadius: 18,
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
            }}>
              {/* Photo */}
              <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={t.img}
                  alt=""
                  aria-hidden
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(34,48,31,0.85) 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 14, left: 16, display: 'flex', gap: 3 }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={12} fill={S.amber} color={S.amber} />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div style={{ padding: '24px 28px 28px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={{ ...S.serif, fontSize: 19, lineHeight: 1.58, color: S.text, margin: 0, fontStyle: 'italic', flexGrow: 1 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(174,124,74,0.15)', border: '1px solid rgba(174,124,74,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: S.amber, fontSize: 13, fontWeight: 600, ...S.serif,
                  }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: S.text }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: S.muted }}>{t.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── For Coordinators ─────────────────────────────────────────────────────────

function ForCoordinatorsSection({ onOpenCoordinator }) {
  return (
    <section id="for-coordinators" style={{ position: 'relative', overflow: 'hidden', background: S.bgAlt }}>
      {/* Full-bleed background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG.exterior})`,
        backgroundSize: 'cover', backgroundPosition: 'center 40%',
        opacity: 0.12,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${S.bgAlt} 40%, rgba(58,83,47,0.75) 100%)`,
      }} />

      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(80px,10vw,140px) 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center' }}>

            {/* Left: text — sits on lighter part of gradient */}
            <div className="reveal">
              <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: S.forest, marginBottom: 20, fontWeight: 500 }}>For Coordinators</div>
              <h2 style={{ ...S.serif, fontSize: 'clamp(36px,5vw,52px)', fontWeight: 600, lineHeight: 1.1, margin: '0 0 20px', color: S.text }}>
                Build a career,<br />not a gig.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.72, color: S.muted, margin: '0 0 36px', maxWidth: 480 }}>
                Helm connects experienced household coordinators with LA families who value them. Consistent hours, fair pay, and households that are set up for a real working relationship.
              </p>
              <button onClick={onOpenCoordinator} style={{
                padding: '15px 30px', background: S.forest, color: '#E6E9E2',
                border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.25s', ...S.sans,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2A3D23'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(58,83,47,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background = S.forest; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                Apply to Join the Network <ArrowRight size={15} />
              </button>
            </div>

            {/* Right: benefits list — sits on darker forest-green gradient, use light text */}
            <div className="reveal reveal-d1">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {COORDINATOR_BENEFITS.map((b, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    padding: '16px 18px',
                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 12,
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                      background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E6E9E2',
                    }}>
                      <Check size={12} />
                    </span>
                    <span style={{ fontSize: 14, color: 'rgba(230,233,226,0.88)', lineHeight: 1.55 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" style={{ padding: 'clamp(80px,10vw,140px) 28px', background: S.bg }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: S.amber, marginBottom: 16, fontWeight: 500 }}>FAQ</div>
          <h2 style={{ ...S.serif, fontSize: 'clamp(36px,5vw,52px)', fontWeight: 600, lineHeight: 1.1, margin: 0, color: S.text }}>
            Questions? Good.
          </h2>
        </div>

        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{
                border: `1px solid ${isOpen ? 'rgba(174,124,74,0.4)' : S.cardBorder}`,
                borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.25s',
                background: isOpen ? 'rgba(174,124,74,0.04)' : 'transparent',
              }}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} style={{
                  width: '100%', padding: '22px 24px', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: 16,
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: S.text, lineHeight: 1.4, ...S.sans }}>{faq.q}</span>
                  <span style={{ color: isOpen ? S.amber : S.muted, transition: 'all 0.25s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0 }}>
                    <ChevronDown size={20} />
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 24px 22px', fontSize: 15, lineHeight: 1.72, color: S.muted }}>{faq.a}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  // Footer stays dark — hardcode light text to be independent of page theme
  const FT = { text: '#E6E9E2', muted: '#B3B7AA', faint: 'rgba(179,183,170,0.35)' }
  const lnk = { color: FT.muted, fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }

  return (
    <footer style={{ background: '#1C2819', borderTop: '1px solid rgba(125,140,117,0.2)', padding: 'clamp(48px,6vw,80px) 28px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 48, marginBottom: 56 }}>

          <div>
            <div style={{ ...S.serif, fontSize: 28, fontWeight: 600, color: FT.text, marginBottom: 10 }}>Helm</div>
            <p style={{ fontSize: 14, color: FT.faint, lineHeight: 1.65, margin: 0, maxWidth: 220 }}>
              Your household, expertly coordinated.
            </p>
          </div>

          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.13em', textTransform: 'uppercase', color: FT.faint, marginBottom: 20, fontWeight: 500 }}>Navigate</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['How It Works','#how-it-works'],['For Coordinators','#for-coordinators'],['Pricing','#pricing'],['FAQ','#faq']].map(([l,h]) => (
                <a key={l} href={h} style={lnk}
                  onMouseEnter={e => e.currentTarget.style.color = FT.text}
                  onMouseLeave={e => e.currentTarget.style.color = FT.muted}
                >{l}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.13em', textTransform: 'uppercase', color: FT.faint, marginBottom: 20, fontWeight: 500 }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Privacy Policy','Terms of Service'].map(l => (
                <a key={l} href="#" style={lnk}
                  onMouseEnter={e => e.currentTarget.style.color = FT.text}
                  onMouseLeave={e => e.currentTarget.style.color = FT.muted}
                >{l}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(179,183,170,0.35)', marginBottom: 20, fontWeight: 500 }}>Contact</div>
            <a href="mailto:hello@helmliving.com" style={{ ...lnk, display: 'block', marginBottom: 20 }}
              onMouseEnter={e => e.currentTarget.style.color = FT.text}
              onMouseLeave={e => e.currentTarget.style.color = FT.muted}
            >hello@helmliving.com</a>
            <div style={{ display: 'flex', gap: 12 }}>
              {[{ Icon: IconInstagram, label: 'Instagram' }, { Icon: IconLinkedin, label: 'LinkedIn' }].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} style={{
                  width: 36, height: 36, borderRadius: 8, background: 'rgba(179,183,170,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: FT.muted, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(179,183,170,0.2)'; e.currentTarget.style.color = FT.text }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(179,183,170,0.1)'; e.currentTarget.style.color = FT.muted }}
                ><Icon size={16} /></a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: 'rgba(125,140,117,0.15) 1px solid', paddingTop: 28, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <p style={{ fontSize: 12, color: 'rgba(179,183,170,0.4)', margin: 0, maxWidth: 680, lineHeight: 1.6 }}>
            Helm is a referral and matching service. Home coordinators are employed directly by households. Helm is not an employer or staffing agency.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(179,183,170,0.3)', margin: 0 }}>© {new Date().getFullYear()} Helm Living, Inc.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [familyOpen, setFamilyOpen] = useState(false)
  const [coordOpen, setCoordOpen]   = useState(false)

  useScrollReveal()

  useEffect(() => {
    document.body.style.overflow = (familyOpen || coordOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [familyOpen, coordOpen])

  const openFamily = () => setFamilyOpen(true)
  const openCoord  = () => setCoordOpen(true)

  return (
    <>
      <Navbar onOpenFamily={openFamily} onOpenCoordinator={openCoord} />
      <main>
        <HeroSection onOpenFamily={openFamily} onOpenCoordinator={openCoord} />
        <ResponsibilityTicker />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <ForCoordinatorsSection onOpenCoordinator={openCoord} />
        <FAQSection />
      </main>
      <Footer />
      {familyOpen && <FamilyIntakeModal onClose={() => setFamilyOpen(false)} />}
      {coordOpen  && <CoordinatorIntakeModal onClose={() => setCoordOpen(false)} />}
    </>
  )
}
