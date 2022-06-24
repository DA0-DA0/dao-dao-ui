import { useEffect, useState } from 'react'

export const usePlatform = () => {
  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [setIsMac])

  return {
    isMac,
  }
}
