export enum DurationUnits {
  Seconds = 'seconds',
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
  Weeks = 'weeks',
  Months = 'months',
  Years = 'years',
}
export const DurationUnitsValues = Object.values(DurationUnits)

export interface DurationWithUnits {
  value: number
  units: DurationUnits
}
