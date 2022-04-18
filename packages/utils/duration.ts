import { Duration } from '@dao-dao/types/contracts/cw3-dao'
import { secondsToWdhms } from './time'

export const durationIsNonZero = (d: Duration) => {
  if ('height' in d) {
    return d.height !== 0
  }
  return d.time !== 0
}

export const humanReadableDuration = (d: Duration) => {
  if ('height' in d) {
    return `${d.height} blocks`
  }
  if (d.time == 0) {
    return '0 seconds'
  }
  return `${secondsToWdhms(d.time.toString())}`
}
