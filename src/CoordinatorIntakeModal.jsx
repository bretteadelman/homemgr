import { useState } from 'react'
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react'

const ACCENT = '#7D8C75'
const ACCENT_LIGHT = '#5E6E58'
const CREAM = '#1C2819'       // primary text (dark)
const CHARCOAL = '#F5F7F3'    // modal surface (light)
const BORDER = 'rgba(28,40,25,0.1)'

const serif = { fontFamily: "'Cormorant Garant', Georgia, serif" }
const sans  = { fontFamily: "'DM Sans', system-ui, sans-serif" }

const TOTAL_STEPS = 9

const EXPERIENCE_OPTIONS = [
  'Less than 1 year',
  '1–3 years',
  '3–7 years',
  '7+ years',
]

const ROLE_OPTIONS = [
  'Household / home manager',
  'Personal assistant',
  'Estate manager',
  'Executive / corporate assistant',
  'Property manager',
  'Nanny / family assistant',
  'Other',
]

const SPECIALTIES = [
  'Vendor & contractor management',
  'Household budgeting & bill pay',
  'Staff management & HR',
  'Travel & itinerary planning',
  'Event planning & entertaining',
  'Grocery, errands & shopping',
  'Home maintenance oversight',
  'Calendar & schedule management',
  'Childcare coordination',
  'Pet care coordination',
]

const NEIGHBORHOODS = [
  'Silver Lake / Los Feliz',
  'Brentwood / Pacific Palisades',
  'Santa Monica / Venice',
  'Pasadena / San Marino',
  'Beverly Hills / West Hollywood',
  'Other LA Area',
  'All of LA / Flexible',
]

const AVAILABILITY_OPTIONS = [
  'Part-time only (under 20 hrs/week)',
  'Open to part-time or full-time',
  'Full-time only (35+ hrs/week)',
  'Multiple households / fractional (serving 2–3 families)',
]

const COMPENSATION_OPTIONS = [
  '$20–$28/hr',
  '$28–$38/hr',
  '$38–$50/hr',
  '$50+/hr',
  'I prefer to discuss based on role scope',
]

const REFERENCES_OPTIONS = [
  'Yes, I have references ready',
  'I have some but may need time to gather',
  "I'm new and working on building references",
]

const BACKGROUND_OPTIONS = [
  'Yes, no problem',
  'I have questions about this first',
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
            background: sel ? 'rgba(122,155,118,0.1)' : 'transparent',
            color: sel ? CREAM : 'rgba(250,248,244,0.75)',
            fontSize: 15, cursor: 'pointer', transition: 'all 0.18s',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            ...sans,
          }}
            onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = 'rgba(122,155,118,0.45)'; e.currentTarget.style.color = CREAM } }}
            onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = 'rgba(250,248,244,0.75)' } }}
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
            background: sel ? 'rgba(122,155,118,0.12)' : 'transparent',
            color: sel ? CREAM : atMax ? 'rgba(250,248,244,0.3)' : 'rgba(250,248,244,0.75)',
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

const inputStyle = {
  width: '100%', padding: '13px 16px',
  background: '#FFFFFF', border: '1px solid rgba(28,40,25,0.15)',
  borderRadius: 8, color: '#1C2819', fontSize: 15,
  fontFamily: "'DM Sans', system-ui, sans-serif",
  outline: 'none', transition: 'border-color 0.2s',
}

// ─── Step content ─────────────────────────────────────────────────────────────

function StepContent({ step, formData, updateField }) {
  switch (step) {
    case 0:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            How long have you been working in household management?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(250,248,244,0.5)', margin: '0 0 28px' }}>
            Includes roles as a coordinator, personal assistant, or estate/household manager.
          </p>
          <SingleSelect options={EXPERIENCE_OPTIONS} value={formData.experience} onChange={v => updateField('experience', v)} />
        </>
      )
    case 1:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            What best describes your most recent position?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(250,248,244,0.5)', margin: '0 0 28px' }}>Select the closest fit.</p>
          <SingleSelect options={ROLE_OPTIONS} value={formData.recentRole} onChange={v => updateField('recentRole', v)} />
        </>
      )
    case 2:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            What are your strongest areas?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(250,248,244,0.5)', margin: '0 0 28px' }}>Select up to 3.</p>
          <MultiSelect options={SPECIALTIES} value={formData.specialties} onChange={v => updateField('specialties', v)} maxSelect={3} />
        </>
      )
    case 3:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            Which LA neighborhoods are you available to work in?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(250,248,244,0.5)', margin: '0 0 28px' }}>Select all that apply.</p>
          <MultiSelect options={NEIGHBORHOODS} value={formData.neighborhoods} onChange={v => updateField('neighborhoods', v)} />
        </>
      )
    case 4:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            What's your availability?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(250,248,244,0.5)', margin: '0 0 28px' }}>We'll match you with households that fit.</p>
          <SingleSelect options={AVAILABILITY_OPTIONS} value={formData.availability} onChange={v => updateField('availability', v)} />
        </>
      )
    case 5:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            What's your expected compensation?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(250,248,244,0.5)', margin: '0 0 28px' }}>Select your range or preferred approach.</p>
          <SingleSelect options={COMPENSATION_OPTIONS} value={formData.compensation} onChange={v => updateField('compensation', v)} />
        </>
      )
    case 6:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            Can you provide 2–3 professional references?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(250,248,244,0.5)', margin: '0 0 28px' }}>From past households or employers.</p>
          <SingleSelect options={REFERENCES_OPTIONS} value={formData.references} onChange={v => updateField('references', v)} />
        </>
      )
    case 7:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            Background check consent.
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(250,248,244,0.5)', margin: '0 0 16px' }}>
            Helm conducts a background check (via licensed CRA, compliant with California's ICRAA) as part of the vetting process. Are you comfortable proceeding?
          </p>
          <div style={{
            padding: '14px 16px', background: 'rgba(122,155,118,0.06)', border: '1px solid rgba(122,155,118,0.2)',
            borderRadius: 10, fontSize: 13, color: 'rgba(250,248,244,0.55)', lineHeight: 1.6, marginBottom: 20,
          }}>
            Background checks are conducted with your consent and in full compliance with California law. You will be notified and given the right to review any report.
          </div>
          <SingleSelect options={BACKGROUND_OPTIONS} value={formData.backgroundOk} onChange={v => updateField('backgroundOk', v)} />
        </>
      )
    case 8:
      return (
        <>
          <h3 style={{ ...serif, fontSize: 28, fontWeight: 600, color: CREAM, margin: '0 0 8px', lineHeight: 1.2 }}>
            Almost there — how can we reach you?
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(250,248,244,0.5)', margin: '0 0 28px' }}>Our team reviews every application personally.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'rgba(250,248,244,0.5)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>First name *</label>
                <input value={formData.firstName || ''} onChange={e => updateField('firstName', e.target.value)}
                  placeholder="Alex" aria-label="First name" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'rgba(250,248,244,0.5)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Last name *</label>
                <input value={formData.lastName || ''} onChange={e => updateField('lastName', e.target.value)}
                  placeholder="Rivera" aria-label="Last name" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(250,248,244,0.5)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email *</label>
              <input type="email" value={formData.email || ''} onChange={e => updateField('email', e.target.value)}
                placeholder="alex@example.com" aria-label="Email" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(250,248,244,0.5)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Phone *</label>
              <input type="tel" value={formData.phone || ''} onChange={e => updateField('phone', e.target.value)}
                placeholder="(323) 555-0100" aria-label="Phone" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(250,248,244,0.5)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>LinkedIn URL (optional)</label>
              <input value={formData.linkedin || ''} onChange={e => updateField('linkedin', e.target.value)}
                placeholder="linkedin.com/in/yourprofile" aria-label="LinkedIn URL" style={inputStyle} />
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginTop: 4 }}>
              <input type="checkbox" checked={!!formData.agreed} onChange={e => updateField('agreed', e.target.checked)}
                style={{ marginTop: 3, accentColor: ACCENT, width: 16, height: 16, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'rgba(250,248,244,0.55)', lineHeight: 1.55 }}>
                I understand that Helm is a referral and matching platform. I will be employed directly by households, not by Helm. Helm does not charge coordinators any fees.
              </span>
            </label>
          </div>
        </>
      )
    default:
      return null
  }
}

// ─── Validation ───────────────────────────────────────────────────────────────

function canProceed(step, formData) {
  switch (step) {
    case 0: return !!formData.experience
    case 1: return !!formData.recentRole
    case 2: return formData.specialties?.length > 0
    case 3: return formData.neighborhoods?.length > 0
    case 4: return !!formData.availability
    case 5: return !!formData.compensation
    case 6: return !!formData.references
    case 7: return !!formData.backgroundOk
    case 8: return formData.firstName && formData.lastName && formData.email && formData.phone && formData.agreed
    default: return true
  }
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function CoordinatorIntakeModal({ onClose }) {
  const [step, setStep]     = useState(0)
  const [submitted, setSub] = useState(false)
  const [formData, setData] = useState({ specialties: [], neighborhoods: [] })

  const updateField = (key, val) => setData(d => ({ ...d, [key]: val }))
  const progress    = ((step + 1) / TOTAL_STEPS) * 100

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(s => s + 1)
  }
  const handleBack = () => setStep(s => Math.max(0, s - 1))

  const handleSubmit = () => {
    console.log('[Helm] Coordinator application:', formData)
    setSub(true)
  }

  return (
    <div role="dialog" aria-modal="true" aria-label="Apply as a coordinator"
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
        border: `1px solid rgba(125,140,117,0.25)`,
        overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
      }}>

        {submitted ? (
          <div style={{ padding: '60px 48px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: 'rgba(122,155,118,0.15)',
              border: `2px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: ACCENT, marginBottom: 28,
            }}>
              <Check size={28} />
            </div>
            <h3 style={{ ...serif, fontSize: 34, fontWeight: 600, color: CREAM, margin: '0 0 16px' }}>
              Application received.
            </h3>
            <p style={{ fontSize: 16, color: 'rgba(250,248,244,0.62)', lineHeight: 1.65, margin: '0 0 36px', maxWidth: 400 }}>
              Thank you for applying. Our team reviews every application personally. We'll be in touch within 5 business days.
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
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(250,248,244,0.4)', letterSpacing: '0.05em', marginBottom: 2, ...sans }}>
                    Step {step + 1} of {TOTAL_STEPS}
                  </div>
                  <div style={{ fontSize: 11, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
                    Coordinator Application
                  </div>
                </div>
                <button onClick={onClose} aria-label="Close" style={{
                  background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8,
                  width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(250,248,244,0.6)', cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = CREAM }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(250,248,244,0.6)' }}
                ><X size={16} /></button>
              </div>

              {/* Progress bar */}
              <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
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
                borderRadius: 8, color: step === 0 ? 'rgba(250,248,244,0.2)' : 'rgba(250,248,244,0.7)',
                fontSize: 14, cursor: step === 0 ? 'default' : 'pointer', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 6, ...sans,
              }} disabled={step === 0}><ArrowLeft size={15} /> Back</button>

              {step < TOTAL_STEPS - 1 ? (
                <button onClick={handleNext} disabled={!canProceed(step, formData)} style={{
                  padding: '12px 28px', background: canProceed(step, formData) ? ACCENT : 'rgba(122,155,118,0.3)',
                  border: 'none', borderRadius: 8, color: CREAM,
                  fontSize: 14, fontWeight: 500, cursor: canProceed(step, formData) ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6, ...sans,
                }}
                  onMouseEnter={e => { if (canProceed(step, formData)) { e.currentTarget.style.background = ACCENT_LIGHT; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                  onMouseLeave={e => { if (canProceed(step, formData)) { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = 'translateY(0)' } }}
                >Continue <ArrowRight size={15} /></button>
              ) : (
                <button onClick={handleSubmit} disabled={!canProceed(step, formData)} style={{
                  padding: '12px 28px', background: canProceed(step, formData) ? ACCENT : 'rgba(122,155,118,0.3)',
                  border: 'none', borderRadius: 8, color: CREAM,
                  fontSize: 14, fontWeight: 500, cursor: canProceed(step, formData) ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s', ...sans,
                }}>Submit My Application</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
