import { useEffect, useState } from 'react'

export const useServiceWorker = (path = '/sw.js') => {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<unknown>()
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>()

  useEffect(() => {
    if (typeof navigator === 'undefined') {
      return
    }

    // If no `serviceWorker`, unsupported. We're ready but there is no service
    // worker registration to save.
    if (!('serviceWorker' in navigator)) {
      setReady(true)
      return
    }

    ;(async () => {
      try {
        const registration = await navigator.serviceWorker.register(path)
        await registration.update()
        setRegistration(registration)
      } catch (err) {
        console.error('Service Worker registration failed', err)
        setError(err)
      } finally {
        setReady(true)
      }
    })()
  }, [path])

  return {
    ready,
    error,
    registration,
  }
}
