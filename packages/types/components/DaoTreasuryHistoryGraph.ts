import { DaoAccount } from '../dao'

export type DaoTreasuryTarget = {
  symbol: string
  targets: {
    timestamp: Date
    // Proportion between 0 and 1.
    target: number
  }[]
}

export type DaoTreasuryHistoryGraphProps = {
  filter?: Partial<DaoAccount>
  targets?: DaoTreasuryTarget[]
  className?: string
}
