// Format a percent that has already been converted to percentage units
// (i.e. it is not in decimal form; passing in 5 outputs 5%, not 500%).
// Examples:
// 5       --> 5%
// 5.12345 --> 5.1234%
// 0.15    --> 0.15%
// 23.4852 --> 23.49%
// 23.4952 --> 23.5%
export const formatPercentOf100 = (percentOf100: number) =>
  percentOf100.toLocaleString(undefined, { maximumSignificantDigits: 4 }) + '%'
