const secPerDay = 24 * 60 * 60
export const secondsToWdhms = (
  seconds: string | number,
  // Set to 5 or more to display all units.
  numUnits = 2
): string => {
  const secondsInt = Math.ceil(Number(seconds))
  if (secondsInt === 0) {
    return '0 secs'
  }

  const w = Math.floor(secondsInt / (secPerDay * 7))
  const d = Math.floor((secondsInt % (secPerDay * 7)) / secPerDay)
  const h = Math.floor((secondsInt % secPerDay) / 3600)
  const m = Math.floor((secondsInt % 3600) / 60)
  const s = Math.floor(secondsInt % 60)

  const wDisplay = w ? w + (w === 1 ? ' wk' : ' wks') : null
  const dDisplay = d ? d + (d === 1 ? ' day' : ' days') : null
  const hDisplay = h ? h + (h === 1 ? ' hr' : ' hrs') : null
  const mDisplay = m ? m + (m === 1 ? ' min' : ' mins') : null
  const sDisplay = s ? s + (s === 1 ? ' sec' : ' secs') : null

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
