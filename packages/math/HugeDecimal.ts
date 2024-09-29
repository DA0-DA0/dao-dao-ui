import { BigNumber } from 'bignumber.js'

const valueToBigNumber = (n: HugeDecimal.Value) =>
  n instanceof BigNumber
    ? n
    : n instanceof HugeDecimal
    ? new BigNumber(n['value'])
    : typeof n === 'bigint'
    ? new BigNumber(n.toString())
    : typeof n === 'object' && 'amount' in n
    ? new BigNumber(n.amount)
    : new BigNumber(n)

interface AmountWrapper {
  amount: string
}

interface Coin {
  amount: string
  denom: string
}

export namespace HugeDecimal {
  export type Value =
    | BigNumber
    | BigNumber.Value
    | bigint
    | HugeDecimal
    | AmountWrapper
}

export class HugeDecimal {
  private value: BigNumber

  /**
   * Returns a new instance of a HugeDecimal object with value `n`, where `n` is
   * a numeric value in base 10.
   *
   * @param n
   */
  constructor(n: HugeDecimal.Value) {
    this.value = valueToBigNumber(n)
  }

  /**
   * Create a HugeDecimal from a value that is already in its base/raw format,
   * which means it does not have decimals and describes an amount of some base
   * unit. For example: `1000000untrn`.
   *
   * @param n the value
   * @returns a HugeDecimal instance
   */
  static from(n: HugeDecimal.Value) {
    const value = valueToBigNumber(n)
    if (!value.isInteger()) {
      throw new Error('Value is not an integer')
    }

    return new HugeDecimal(value)
  }

  /**
   * Create a HugeDecimal from a value that is already in human-readable format,
   * which means it has decimals and describes a human-readable token amount.
   * For example: `1.000000 $NTRN`.
   *
   * @param n the value
   * @param decimals the number of decimals
   * @returns a HugeDecimal instance
   */
  static fromHumanReadable(n: HugeDecimal.Value, decimals: number) {
    // Multiply by 10^decimals to convert to the integer representation.
    return new HugeDecimal(
      valueToBigNumber(n)
        .times(BigNumber(10).pow(decimals))
        .integerValue(BigNumber.ROUND_DOWN)
    )
  }

  /**
   * Returns a HugeDecimal instance with value 0.
   */
  static get zero() {
    return new HugeDecimal(0)
  }

  /**
   * Returns a HugeDecimal instance with value 1.
   */
  static get one() {
    return new HugeDecimal(1)
  }

  toJSON() {
    return this.value.toJSON()
  }

  toNumber() {
    return this.value.toNumber()
  }

  /**
   * Returns a string in base-10 in normal notation.
   */
  toString() {
    return this.value.toString(10)
  }

  valueOf() {
    return this.value.valueOf()
  }

  /**
   * Returns the integer value of this HugeDecimal with decimals truncated.
   */
  trunc() {
    return new HugeDecimal(this.value.integerValue(BigNumber.ROUND_DOWN))
  }

  plus(n: HugeDecimal.Value) {
    return new HugeDecimal(this.value.plus(valueToBigNumber(n)))
  }

  minus(n: HugeDecimal.Value) {
    return new HugeDecimal(this.value.minus(valueToBigNumber(n)))
  }

  times(n: HugeDecimal.Value) {
    return new HugeDecimal(this.value.times(valueToBigNumber(n)))
  }

  div(n: HugeDecimal.Value) {
    return new HugeDecimal(this.value.div(valueToBigNumber(n)))
  }

  isPositive() {
    return this.value.isPositive()
  }

  isZero() {
    return this.value.isZero()
  }

  lt(n: HugeDecimal.Value) {
    return this.value.lt(valueToBigNumber(n))
  }

  lte(n: HugeDecimal.Value) {
    return this.value.lte(valueToBigNumber(n))
  }

  gt(n: HugeDecimal.Value) {
    return this.value.gt(valueToBigNumber(n))
  }

  gte(n: HugeDecimal.Value) {
    return this.value.gte(valueToBigNumber(n))
  }

  eq(n: HugeDecimal.Value) {
    return this.value.eq(valueToBigNumber(n))
  }

  pow(n: HugeDecimal.Value) {
    return new HugeDecimal(this.value.pow(valueToBigNumber(n)))
  }

  abs() {
    return new HugeDecimal(this.value.abs())
  }

  /**
   * Returns a human-readable BigNumber instance with `decimals` decimal places.
   * This is only meant to be used internally for formatting, since we don't
   * want to encourage creating HugeDecimal instances with decimal places.
   * Ideally, the underlying value is always in raw integer format.
   *
   * @param decimals the number of decimal places
   * @returns human-readable BigNumber instance
   */
  private toHumanReadable(decimals: number): HugeDecimal {
    return new HugeDecimal(this.value.div(BigNumber(10).pow(decimals)))
  }

  /**
   * Returns a human-readable number with `decimals` decimal places.
   *
   * @param decimals the number of decimal places
   * @returns human-readable number
   */
  toHumanReadableNumber(decimals: number): number {
    return this.toHumanReadable(decimals).value.toNumber()
  }

  /**
   * Returns a human-readable string with `decimals` decimal places.
   *
   * @param decimals the number of decimal places
   * @returns human-readable string
   */
  toHumanReadableString(decimals: number): string {
    return this.toHumanReadable(decimals).value.toFormat(decimals)
  }

  /**
   * Returns an internationalized human-readable string with abbreviation of
   * large numbers.
   *
   * @returns an internationalized human-readable string
   */
  toInternationalizedHumanReadableString({
    decimals,
    showFullAmount = true,
    minDecimals = 0,
  }: {
    /**
     * The number of decimals used to make this number human-readable.
     */
    decimals: number
    /**
     * Whether or not to show the full amount. Large numbers will be abbreviated
     * if this is false. Defaults to true.
     */
    showFullAmount?: boolean
    /**
     * The minimum number of decimal places to show. Defaults to the smallest
     * number of non-zero decimal places less than or equal to `decimals`.
     */
    minDecimals?: number
  }): string {
    // Get the decimal separator for the current locale.
    const decimalSeparator = (1.1).toLocaleString()[1]

    // Use BigInt for integer part of the number, and add the decimals manually.
    // If the number is too large to fit within the size of Number, must use
    // this BigInt approach even when not showing the full amount.
    if (showFullAmount || this.gte(Number.MAX_SAFE_INTEGER)) {
      const human = this.toHumanReadable(decimals)

      const int = human.trunc()
      const dec = human.minus(int)

      // Show at least minDecimals, up to the exact number of decimal places in
      // the original number, if showing the full amount. If not showing the
      // full amount, this number must be very large (based on the conditional
      // above), and thus none (0) of the actual decimal places are shown, since
      // the large part of the number will be abbreviated (e.g. 1,234.5678 gets
      // converted into 1.23K, and the 0.5678 are hidden).
      const decimalPlacesToShow = showFullAmount
        ? Math.max(
            dec.value.toFormat({ decimalSeparator }).split(decimalSeparator)[1]
              ?.length ?? 0,
            minDecimals
          )
        : 0

      const intStr = BigInt(int.toString()).toLocaleString(
        undefined,
        showFullAmount
          ? undefined
          : {
              notation: 'compact',
              // Cap minDecimals to 20, which is the maximum allowed.
              maximumFractionDigits: Math.min(
                Math.max(2, minDecimals),
                20
              ) as 20,
            }
      )
      const decStr =
        decimalPlacesToShow > 0
          ? decimalSeparator +
            dec.value
              .toFormat(decimalPlacesToShow, { decimalSeparator })
              .split(decimalSeparator)[1]
          : ''

      return intStr + decStr
    }
    // If entire number can fit within the size of Number and not showing the
    // full amount, use Number for compact internationalized formatting.
    else {
      const human = this.toHumanReadableNumber(decimals)
      return human.toLocaleString(undefined, {
        notation: 'compact',
        minimumFractionDigits: minDecimals || (human >= 1000 ? 2 : undefined),
        maximumFractionDigits: Math.max(
          minDecimals,
          human >= 1000 ? 2 : decimals
        ),
      })
    }
  }

  /**
   * Returns a Coin object with the amount and denom.
   *
   * @param denom the denom
   * @returns Coin object
   */
  toCoin(denom: string): Coin {
    return {
      amount: this.toString(),
      denom,
    }
  }

  /**
   * Returns an array containing a single Coin object with the amount and denom.
   *
   * @param denom the denom
   * @returns array containing a single Coin object
   */
  toCoins(denom: string): Coin[] {
    return [this.toCoin(denom)]
  }

  /**
   * Returns the USD value.
   *
   * @param decimals the number of decimals
   * @param usdUnitPrice the USD unit price of the token (with decimals)
   * @returns USD value
   */
  toUsdValue(decimals: number, usdUnitPrice: BigNumber.Value) {
    return this.value
      .div(BigNumber(10).pow(decimals))
      .times(usdUnitPrice)
      .toNumber()
  }
}
