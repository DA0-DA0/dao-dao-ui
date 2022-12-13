import { selectorFamily } from 'recoil'

export const averageColorSelector = selectorFamily({
  key: 'averageColor',
  get: (url: string) => async () => {
    if (!url || url.startsWith('http://localhost')) {
      return undefined
    }

    try {
      const response = await fetch(`https://fac.withoutdoing.com/${url}`)
      const color = await response.text()
      // Validate color format.
      if (!color.startsWith('#')) {
        return undefined
      }

      return color
    } catch (err) {
      console.error(err)
    }
  },
})
