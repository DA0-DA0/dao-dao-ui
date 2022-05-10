import { atom } from 'recoil'

// Utility atom to store if the app is running in the browser
// (as opposed to being rendered on the server). The intended
// use is to set it to true immediately on _app mount (likely in a
// useEffect call) which marks one render cycle completing.
export const mountedInBrowserAtom = atom({
  key: 'inBrowser',
  default: false,
})
