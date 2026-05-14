import { useState } from 'react'
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react'

const ACCENT = '#AE7C4A'
const ACCENT_LIGHT = '#966138'
const CREAM = '#1C2819'       // primary text (dark)
const CHARCOAL = '#F5F7F3'    // modal surface (light)
const CARD = '#FFFFFF'
const BORDER = 'rgba(28,40,25,0.1)'

const serif = { fontFamily: "'Cormorant Garant', Georgia, serif" }
const sans  = { fontFamily: "'DM Sans', system-ui, sans-serif" }

const TOTAL_STEPS = 8

const NEIGHBORHOODS = [
  'Silver Lake / Los Feliz',
  'Brentwood / Pacific Palisades',
  'Santa Monica / Venice',
  'Pasadena / San Marino',
  'Beverly Hills / West Hollywood',
  'Other LA Area',
]

const HOUSEHOLD_OPTIONS = [
  'Single adult', 'Couple / partners', 'Children at home',
  'Elderly family member', 'Pets', 'Multiple properties',
]

const HOME_SIZES = [
  'Apartment / condo (under 1,500 sq ft)',
  'House (1,500–3,000 sq ft)',
  'Larger home (3,000–5,000 sq ft)',
  'Estate / multiple properties',
]

const PAIN_POINTS = [
  'Vendor and contractor chaos',
  'Errand and grocery overload',
  'Calendar and scheduling overwhelm',
  'Home maintenance falling behind',
  'No time to manage household staff',
  'General household disorganization',
  'Preparing for a big life change (move, baby, renovation)',
]

const HOURS_OPTIONS = [
  "I'm not sure yet",
  '5–10 hours/week',
  '10–20 hours/week',
  '20+ hours/week (likely full-time)',
]

const BUDGET_OPTIONS = [
  'Under $1,500/month',
  '$1,500–$3,000/month',
  '$3,000–$5,000/month',
  '$5,000+/month',
  'Not sure — I\'d like guidance',
]

const TIMELINE_OPTIONS = [
  'As soon as possible (within 2–4 weeks)',
  'Within 1–2 months',
  'Just exploring for now',
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SingleSelect({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map(opt => {
        const sel = value === opt
        return (
          <button key={opt} onClick={() => onChange(opt)} style={{
            padding: '14px 20px', borderRadius: 10, textAlign: 'left',
            border: `1px solid ${sel ? ACCENT : BORDER}`,
            background: sel ? `rgba(196,113,58,0.1)` : 'transparent',
            color: sel ? CREAM : 'rgba(28,40,25,0.75)',
            fontSize: 15, cursor: 'pointer', transition: 'all 0.18s',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            ...sans,
          }}
            onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = 'rgba(196,113,58,0.4)'; e.currentTarget.style.color = CREAM } }}
            onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = 'rgba(28,40,25,0.75)' } }}
          >
            <span>{opt}</span>
            {sel && <span style={{ color: ACCENT }}><Check size={16} /></span>}
          </button>
        )
      })}
    </div>
  )
}

function MultiSelect({ options, value = [], onChange, maxSelect }) {
  const toggle = (opt) => {
    if (value.includes(opt)) {
      onChange(value.filter(v => v !== opt))
    } else {
      if (maxSelect && value.length >= maxSelect) return
      onChange([...value, opt])
    }
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {options.map(opt => {
        const sel = value.includes(opt)
        const atMax = maxSelect && value.length >= maxSelect && !sel
        return (
          <button key={opt} onClick={() => toggle(opt)} style={{
            padding: '10px 18px', borderRadius: 100,
            border: `1px solid ${sel ? ACCENT : BORDER}`,
            background: sel ? `rgba(196,113,58,0.12)` : 'transparent',
            color: sel ? CREAM : atMax ? 'rgba(28,40,25,0.3)' : 'rgba(28,40,25,0.75)',
            fontSize: 14, cursor: atMax ? 'not-allowed' : 'pointer', transition: 'all 0.18s',
            display: 'flex', alignItems: 'center', gap: 6, ...sans,
          }}>
            {sel && <Check size={12} color={ACCENT} />}
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// ─── Step content ─────────────────────────────────────────────────────────────

function StepContent({ step, formData, updateField }) {
  switch (step) {
    case 0:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            Which LA neighborhood are you in?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(28,40,25,0.5)', margin: '0 0 28px' }}>We match based on your location.</p>
          <SingleSelect options={NEIGHBORHOODS} value={formData.neighborhood} onChange={v => updateField('neighborhood', v)} />
        </>
      )
    case 1:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            Tell us about your household.
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(28,40,25,0.5)', margin: '0 0 28px' }}>Select all that apply.</p>
          <MultiSelect options={HOUSEHOLD_OPTIONS} value={formData.household} onChange={v => updateField('household', v)} />
        </>
      )
    case 2:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            What's your home situation?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(28,40,25,0.5)', margin: '0 0 28px' }}>Select the best description.</p>
          <SingleSelect options={HOME_SIZES} value={formData.homeSize} onChange={v => updateField('homeSize', v)} />
        </>
      )
    case 3:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            What's driving you to find a coordinator?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(28,40,25,0.5)', margin: '0 0 28px' }}>Select your top 2.</p>
          <MultiSelect options={PAIN_POINTS} value={formData.painPoints} onChange={v => updateField('painPoints', v)} maxSelect={2} />
        </>
      )
    case 4:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            How many hours per week do you think you need?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(28,40,25,0.5)', margin: '0 0 28px' }}>You can always refine this with us.</p>
          <SingleSelect options={HOURS_OPTIONS} value={formData.hours} onChange={v => updateField('hours', v)} />
        </>
      )
    case 5:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            What's your expected monthly coordinator budget?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(28,40,25,0.5)', margin: '0 0 28px' }}>Separate from the Helm subscription.</p>
          <SingleSelect options={BUDGET_OPTIONS} value={formData.budget} onChange={v => updateField('budget', v)} />
        </>
      )
    case 6:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            When are you looking to have someone in place?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(28,40,25,0.5)', margin: '0 0 28px' }}>No pressure either way.</p>
          <SingleSelect options={TIMELINE_OPTIONS} value={formData.timeline} onChange={v => updateField('timeline', v)} />
        </>
      )
    case 7:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            Last step — how should we reach you?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(28,40,25,0.5)', margin: '0 0 28px' }}>We'll be in touch within 2 business days.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'rgba(28,40,25,0.5)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>First name *</label>
                <input value={formData.firstName || ''} onChange={e => updateField('firstName', e.target.value)}
                  placeholder="Jane" aria-label="First name" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'rgba(28,40,25,0.5)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Last name *</label>
                <input value={formData.lastName || ''} onChange={e => updateField('lastName', e.target.value)}
                  placeholder="Smith" aria-label="Last name" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(28,40,25,0.5)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email *</label>
              <input type="email" value={formData.email || ''} onChange={e => updateField('email', e.target.value)}
                placeholder="jane@example.com" aria-label="Email" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(28,40,25,0.5)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Phone (optional)</label>
              <input type="tel" value={formData.phone || ''} onChange={e => updateField('phone', e.target.value)}
                placeholder="(310) 555-0100" aria-label="Phone" style={inputStyle} />
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginTop: 4 }}>
              <input type="checkbox" checked={!!formData.agreed} onChange={e => updateField('agreed', e.target.checked)}
                style={{ marginTop: 3, accentColor: ACCENT, width: 16, height: 16, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'rgba(28,40,25,0.5)', lineHeight: 1.55 }}>
                I understand that home coordinators placed through Helm will be my direct W-2 employees, and that the $99/month Helm subscription begins when I'm matched.
              </span>
            </label>
          </div>
        </>
      )
    default:
      return null
  }
}

const inputStyle = {
  width: '100%', padding: '13px 16px',
  background: '#FFFFFF', border: '1px solid rgba(28,40,25,0.15)',
  borderRadius: 8, color: '#1C2819', fontSize: 15,
  fontFamily: "'DM Sans', system-ui, sans-serif",
  outline: 'none', transition: 'border-color 0.2s',
}

// ─── Validation ───────────────────────────────────────────────────────────────

function canProceed(step, formData) {
  switch (step) {
    case 0: return !!formData.neighborhood
    case 1: return formData.household?.length > 0
    case 2: return !!formData.homeSize
    case 3: return formData.painPoints?.length > 0
    case 4: return !!formData.hours
    case 5: return !!formData.budget
    case 6: return !!formData.timeline
    case 7: return formData.firstName && formData.lastName && formData.email && formData.agreed
    default: return true
  }
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function FamilyIntakeModal({ onClose }) {
  const [step, setStep]     = useState(0)
  const [submitted, setSub] = useState(false)
  const [formData, setData] = useState({ household: [], painPoints: [] })

  const updateField = (key, val) => setData(d => ({ ...d, [key]: val }))
  const progress    = ((step + 1) / TOTAL_STEPS) * 100

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(s => s + 1)
  }
  const handleBack = () => setStep(s => Math.max(0, s - 1))

  const handleSubmit = () => {
    console.log('[Helm] Family intake submission:', formData)
    setSub(true)
  }

  return (
    <div role="dialog" aria-modal="true" aria-label="Find your coordinator"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      className="modal-backdrop"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}>
      <div className="modal-panel" style={{
        background: CHARCOAL, borderRadius: 20, width: '100%', maxWidth: 600,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        border: `1px solid ${BORDER}`, overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
      }}>

        {submitted ? (
          /* Confirmation screen */
          <div style={{ padding: '60px 48px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: 'rgba(196,113,58,0.15)',
              border: `2px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: ACCENT, marginBottom: 28,
            }}>
              <Check size={28} />
            </div>
            <h3 style={{ ...serif, fontSize: 34, fontWeight: 600, color: CREAM, margin: '0 0 16px' }}>
              You're on your way.
            </h3>
            <p style={{ fontSize: 16, color: 'rgba(28,40,25,0.6)', lineHeight: 1.65, margin: '0 0 36px', maxWidth: 400 }}>
              We'll be in touch within 2 business days with your coordinator introduction.
            </p>
            <button onClick={onClose} style={{
              padding: '14px 32px', background: ACCENT, color: CREAM, border: 'none', borderRadius: 10,
              fontSize: 15, fontWeight: 500, cursor: 'pointer', ...sans,
            }}>Close</button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ padding: '24px 28px 0', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: 'rgba(28,40,25,0.4)', letterSpacing: '0.05em', ...sans }}>
                  Step {step + 1} of {TOTAL_STEPS}
                </div>
                <button onClick={onClose} aria-label="Close" style={{
                  background: 'rgba(28,40,25,0.06)', border: 'none', borderRadius: 8,
                  width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(28,40,25,0.6)', cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(28,40,25,0.08)'; e.currentTarget.style.color = CREAM }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(28,40,25,0.06)'; e.currentTarget.style.color = 'rgba(28,40,25,0.6)' }}
                ><X size={16} /></button>
              </div>

              {/* Progress bar */}
              <div style={{ height: 3, background: 'rgba(28,40,25,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                <div className="progress-bar" style={{
                  height: '100%', borderRadius: 99, background: ACCENT,
                  width: `${progress}%`, transition: 'width 0.35s ease',
                }} />
              </div>
            </div>

            {/* Step content */}
            <div style={{ padding: '32px 28px', flex: 1, overflowY: 'auto' }}>
              <StepContent step={step} formData={formData} updateField={updateField} />
            </div>

            {/* Footer nav */}
            <div style={{
              padding: '20px 28px 24px', borderTop: `1px solid ${BORDER}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
            }}>
              <button onClick={handleBack} style={{
                padding: '12px 20px', background: 'transparent', border: `1px solid ${BORDER}`,
                borderRadius: 8, color: step === 0 ? 'rgba(28,40,25,0.2)' : 'rgba(28,40,25,0.7)',
                fontSize: 14, cursor: step === 0 ? 'default' : 'pointer', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 6, ...sans,
              }}
                disabled={step === 0}
              ><ArrowLeft size={15} /> Back</button>

              {step < TOTAL_STEPS - 1 ? (
                <button onClick={handleNext} disabled={!canProceed(step, formData)} style={{
                  padding: '12px 28px', background: canProceed(step, formData) ? ACCENT : 'rgba(196,113,58,0.3)',
                  border: 'none', borderRadius: 8, color: CREAM,
                  fontSize: 14, fontWeight: 500, cursor: canProceed(step, formData) ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6, ...sans,
                }}
                  onMouseEnter={e => { if (canProceed(step, formData)) { e.currentTarget.style.background = ACCENT_LIGHT; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                  onMouseLeave={e => { if (canProceed(step, formData)) { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = 'translateY(0)' } }}
                >Continue <ArrowRight size={15} /></button>
              ) : (
                <button onClick={handleSubmit} disabled={!canProceed(step, formData)} style={{
                  padding: '12px 28px', background: canProceed(step, formData) ? ACCENT : 'rgba(196,113,58,0.3)',
                  border: 'none', borderRadius: 8, color: CREAM,
                  fontSize: 14, fontWeight: 500, cursor: canProceed(step, formData) ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s', ...sans,
                }}>Request My Match</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
