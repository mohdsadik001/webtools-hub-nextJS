'use client'

import { useEffect } from 'react'

export default function RecaptchaWrapper({ children }) {
  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      // Clean up
      const existingScript = document.querySelector('script[src*="recaptcha"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return <>{children}</>
}
