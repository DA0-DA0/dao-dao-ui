import { DaoAccount } from '../dao'
import { GenericTokenSource } from '../token'

export type DaoTreasuryTarget = {
  // The source that uniquely identifies a token.
  source: GenericTokenSource
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
