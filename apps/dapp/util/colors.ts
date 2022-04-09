import axios from 'axios'
import { getAverageColor } from 'fast-average-color-node'

export const getFastAverageColor = async (url: string) => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  })
  const buffer = Buffer.from(response.data, 'binary')

  const result = await getAverageColor(buffer)
  return result.rgb
}
