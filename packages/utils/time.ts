const secPerDay = 24 * 60 * 60
export const secondsToWdhms = (
  seconds: string | number,
  // Set to 5 or more to display all units.
  numUnits = 2,
  // Abbreviate units, automatically turned off if numUnits = 1 when not set.
  abbreviate?: boolean
): string => {
  const secondsInt = Math.ceil(Number(seconds))
  if (secondsInt === 0) {
    return '0 secs'
  }

  // Abbreviate automatically if more than 1 unit and not set.
  abbreviate ??= numUnits > 1

  const w = Math.floor(secondsInt / (secPerDay * 7))
  const d = Math.floor((secondsInt % (secPerDay * 7)) / secPerDay)
  const h = Math.floor((secondsInt % secPerDay) / 3600)
  const m = Math.floor((secondsInt % 3600) / 60)
  const s = Math.floor(secondsInt % 60)

  const wDisplay = w
    ? w + ' ' + (abbreviate ? 'wk' : 'week') + (w === 1 ? '' : 's')
    : null
  const dDisplay = d ? d + ' day' + (d === 1 ? '' : 's') : null
  const hDisplay = h
    ? h + ' ' + (abbreviate ? 'hr' : 'hour') + (h === 1 ? '' : 's')
    : null
  const mDisplay = m
    ? m + ' ' + (abbreviate ? 'min' : 'minute') + (m === 1 ? '' : 's')
    : null
  const sDisplay = s
    ? s + ' ' + (abbreviate ? 'sec' : 'second') + (s === 1 ? '' : 's')
    : null

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
