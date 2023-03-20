import { useEffect, useState } from 'react'

export const usePlatform = () => {
  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    // Only on browser.
    if (
      typeof navigator === 'undefined' ||
      typeof navigator.platform === 'undefined'
    ) {
      return
    }

    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [setIsMac])

  return {
    isMac,
  }
}
