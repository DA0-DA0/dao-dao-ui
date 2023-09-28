import { useEffect, useState } from 'react'

export const useServiceWorker = (path = '/sw.js') => {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<unknown>()
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>()

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
      return
    }

    ;(async () => {
      try {
        setRegistration(await navigator.serviceWorker.register(path))
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
