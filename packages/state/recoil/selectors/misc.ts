import { selectorFamily } from 'recoil'

import { FAST_AVERAGE_COLOR_API_TEMPLATE } from '@dao-dao/utils'

export const averageColorSelector = selectorFamily({
  key: 'averageColor',
  get: (url: string) => async () => {
    // Don't attempt to get average color for local images (development server).
    if (!url || url.startsWith('http://localhost')) {
      return undefined
    }

    try {
      const response = await fetch(
        FAST_AVERAGE_COLOR_API_TEMPLATE.replace('URL', url)
      )
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
