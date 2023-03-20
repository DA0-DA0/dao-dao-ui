const secPerDay = 24 * 60 * 60
export const secondsToWdhms = (
  seconds: string | number,
  // Set to 5 or more to display all units.
  numUnits = 2
): string => {
  const secondsInt = Math.ceil(Number(seconds))
  if (secondsInt === 0) {
    return '0 seconds'
  }

  const w = Math.floor(secondsInt / (secPerDay * 7))
  const d = Math.floor((secondsInt % (secPerDay * 7)) / secPerDay)
  const h = Math.floor((secondsInt % secPerDay) / 3600)
  const m = Math.floor((secondsInt % 3600) / 60)
  const s = Math.floor(secondsInt % 60)

  const wDisplay = w ? w + ' ' + 'week' + (w === 1 ? '' : 's') : null
  const dDisplay = d ? d + ' day' + (d === 1 ? '' : 's') : null
  const hDisplay = h ? h + ' ' + 'hour' + (h === 1 ? '' : 's') : null
  const mDisplay = m ? m + ' ' + 'minute' + (m === 1 ? '' : 's') : null
  const sDisplay = s ? s + ' ' + 'second' + (s === 1 ? '' : 's') : null

  return (
    [wDisplay, dDisplay, hDisplay, mDisplay, sDisplay]
      // Ignore empty values.
      .filter(Boolean)
      // Only keep certain precision of units.
      .slice(0, numUnits)
      // Separate with commas.
      .join(', ')
  )
}

// Converts Date to string from the current point with no sign.
// Example: dateToWdhms(new Date(Date.now() + 1000)) === '1 second'
//          dateToWdhms(new Date(Date.now() - 1000)) === '1 second'
export const dateToWdhms = (date: Date, numUnits = 2) =>
  secondsToWdhms(Math.abs(date.getTime() - Date.now()) / 1000, numUnits)

// Converts number in seconds to time format mm:ss. Clock format.
export const secondsToMmSs = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`
