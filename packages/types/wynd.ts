export type WyndPoolToken = {
  amount: string
} & (
  | {
      native: string
    }
  | {
      token: string
    }
)
export type WyndPool = [WyndPoolToken, WyndPoolToken]
export type WyndPools = Record<string, WyndPool>

export type WyndPrice = {
  asset: string
  priceInJuno: number
  priceInEur: number
  priceInUsd: number
}
export type WyndPrices = WyndPrice[]
