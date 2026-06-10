'use client'

import { useState } from 'react'
import styles from '../page.module.css'

// ── Inline icon components ──────────────────────────────────────────────────

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </svg>
  )
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

// ── Spark SVGs (absolutely positioned at pill corners) ───────────────────────

function Sparks() {
  return (
    <>
      {/* Yellow cluster — top-left, fanning up-left */}
      <svg
        className={styles.sparkTL}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="26"
          y1="28"
          x2="21"
          y2="14"
          stroke="#F4E64A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="26"
          x2="11"
          y2="13"
          stroke="#F4E64A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="22"
          y1="24"
          x2="6"
          y2="19"
          stroke="#F4E64A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
      {/* Pink cluster — bottom-right, fanning down-right */}
      <svg
        className={styles.sparkBR}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="4"
          y1="2"
          x2="9"
          y2="16"
          stroke="#FF8FB0"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="6"
          y1="4"
          x2="19"
          y2="17"
          stroke="#FF8FB0"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="6"
          x2="24"
          y2="11"
          stroke="#FF8FB0"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function ContactButton() {
  const [email, setEmail] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  function reveal() {
    if (revealed) return
    setRevealed(true)
    if (email) return
    fetch('/api/contact')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<{ email: string }>
      })
      .then(({ email: addr }) => {
        setEmail(addr)
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          // next dev has no Pages Function, so /api/contact 404s. Show a clearly-fake
          // placeholder so the pill is visible while developing. This branch is
          // dead-code-eliminated from the production build (NODE_ENV === 'production'),
          // so the real address is still never in the static output.
          setEmail('you@example.dev')
        } else {
          console.warn('Contact fetch failed:', err)
          setFailed(true)
        }
      })
  }

  async function copy() {
    if (!email) return
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.warn('Clipboard copy failed:', err)
    }
  }

  function handleClick() {
    reveal()
    if (email) {
      copy()
    }
  }

  return (
    <div
      className={`${styles.contact}${email ? ' ' + styles.ready : ''}`}
      onMouseEnter={reveal}
      onFocus={reveal}
    >
      <Sparks />
      <button
        type="button"
        className={styles.pill}
        onClick={handleClick}
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
      >
        <span className={styles.sayHello}>say hello</span>
        {revealed && email && !failed && (
          <span className={styles.emailRow}>
            <EnvelopeIcon className={styles.icon} />
            <span className={styles.addr}>{email}</span>
            {copied ? (
              <CheckIcon className={styles.icon} />
            ) : (
              <CopyIcon className={styles.icon} />
            )}
          </span>
        )}
      </button>
    </div>
  )
}
