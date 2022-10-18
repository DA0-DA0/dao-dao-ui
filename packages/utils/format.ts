// Format a percent that has already been converted to percentage units
// (i.e. it is not in decimal form; passing in 5 outputs 5%, not 500%).
// Examples:
// 5       --> 5%
// 5.12345 --> 5.1234%
// 0.15    --> 0.15%
// 23.4852 --> 23.49%
// 23.4952 --> 23.5%
export const formatPercentOf100 = (percentOf100: number) =>
  percentOf100.toLocaleString(undefined, {
    maximumSignificantDigits: 4,
  }) + '%'

export const dateFormatterNoDay = new Intl.DateTimeFormat('default', {
  month: 'long',
  day: undefined,
  year: 'numeric',
})
export const dateFormatterNoYear = new Intl.DateTimeFormat('default', {
  month: 'long',
  day: 'numeric',
  year: undefined,
})

// If this year, add date in month and ignore year.
// Otherwise, add year and ignore date in month.
export const formatDate = (date: Date) =>
  date.getFullYear() === new Date().getFullYear()
    ? dateFormatterNoYear.format(date)
    : dateFormatterNoDay.format(date)

// Select number of decimal digits, rounding down / truncating.
export const toFixedDown = (value: Number, digits: Number) => {
  const re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)')
  const matches = value.toString().match(re)
  return matches ? parseFloat(matches[1]) : value.valueOf()
}
