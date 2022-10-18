import { useCallback, useEffect, useState } from 'react'

import { SITE_URL } from '@dao-dao/utils'

export const useNotifyBrowser = () => {
  // Detect window focus state.
  const [windowFocused, setWindowFocused] = useState(true)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onWindowFocus = () => setWindowFocused(true)
    window.addEventListener('focus', onWindowFocus)

    const onWindowBlur = () => setWindowFocused(false)
    window.addEventListener('blur', onWindowBlur)

    return () => {
      window.removeEventListener('focus', onWindowFocus)
      window.removeEventListener('blur', onWindowBlur)
    }
  }, [])

  const [granted, setGranted] = useState(false)
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('Notification' in window) ||
      !window.Notification
    ) {
      return
    }

    setGranted(window.Notification.permission === 'granted')
  }, [])

  const notifyBrowser = useCallback(
    async (title: string, body: string, onClick?: Notification['onclick']) => {
      if (!granted) {
        // Request permission.
        if ((await window.Notification.requestPermission()) !== 'granted') {
          return
        }

        setGranted(true)
      }

      if (windowFocused) {
        return
      }

      // Show notification.
      const notification = new window.Notification(title, {
        body,
        icon: SITE_URL + '/daodao.png',
      })
      // Close after 10 seconds automatically.
      notification.onshow = () =>
        setTimeout(() => {
          notification.close()
        }, 10 * 1000)
      // Trigger onClick when appropriate.
      notification.onclick = onClick ?? null
    },
    [granted, windowFocused]
  )

  return notifyBrowser
}
