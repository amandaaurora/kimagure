'use client'

import { useEffect, useState } from 'react'

const phrases = [
  'caprichos · whims',
  'serious play',
  'made fro',
  'made for fun',
  'made for the fun of it',
  'whim-driven development',
]

export default function TypingGloss() {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      setDisplayed(phrases[0])
      return
    }

    let p = 0
    let i = 0
    let deleting = false
    let timerId: ReturnType<typeof setTimeout>

    function tick() {
      const word = phrases[p]
      setDisplayed(word.slice(0, i))

      if (!deleting && i < word.length) {
        i++
        timerId = setTimeout(tick, 90)
      } else if (!deleting && i === word.length) {
        deleting = true
        timerId = setTimeout(tick, 1700)
      } else if (deleting && i > 0) {
        i--
        timerId = setTimeout(tick, 42)
      } else {
        deleting = false
        p = (p + 1) % phrases.length
        timerId = setTimeout(tick, 320)
      }
    }

    timerId = setTimeout(tick, 90)

    return () => clearTimeout(timerId)
  }, [])

  return <span>{displayed}</span>
}
