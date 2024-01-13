export enum DurationUnits {
  Seconds = 'seconds',
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
  Weeks = 'weeks',
  Months = 'months',
  Years = 'years',
  Blocks = 'blocks',
}
export const DurationUnitsValues = Object.values(DurationUnits)
/**
 * Exlude blocks from duration units.
 */
export const DurationUnitsValuesTimeOnly = DurationUnitsValues.filter(
  (unit) => unit !== DurationUnits.Blocks
)

export type DurationWithUnits = {
  value: number
  units: DurationUnits
}
