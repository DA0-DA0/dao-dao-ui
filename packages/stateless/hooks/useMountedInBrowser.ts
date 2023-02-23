import { useEffect, useState } from 'react'

// Returns true after 1 render cycle.
export const useMountedInBrowser = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
