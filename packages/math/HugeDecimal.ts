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

  toString() {
    return this.value.toString()
  }

  valueOf() {
    return this.value.valueOf()
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
   * Returns a human-readable number with `decimals` decimal places.
   *
   * @param decimals the number of decimal places
   * @returns human-readable number
   */
  toHumanReadableNumber(decimals: number): number {
    return this.value.div(BigNumber(10).pow(decimals)).toNumber()
  }

  /**
   * Returns a human-readable string with `decimals` decimal places.
   *
   * @param decimals the number of decimal places
   * @returns human-readable string
   */
  toHumanReadableString(decimals: number): string {
    return this.value.div(BigNumber(10).pow(decimals)).toFormat(decimals)
  }

  /**
   * Returns a Coin object with the amount and denom.
   *
   * @param denom the denom
   * @returns Coin object
   */
  toCoin(denom: string): Coin {
    return {
      amount: this.value.toString(),
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
}
