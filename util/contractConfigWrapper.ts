import { ConfigResponse as SigConfig } from '@dao-dao/types/contracts/cw3-flex-multisig'
import { ConfigResponse as DaoConfig } from '@dao-dao/types/contracts/cw3-dao'
import { useRecoilValue } from 'recoil'
import { tokenConfig } from 'selectors/daos'

type Config = SigConfig | DaoConfig

/*
 * Wrapper class for unifying some behavior between Dao and Multisig
 * configs. See `ProposalEditor` for example usage.
 */
export class ContractConfigWrapper {
  private base: Config

  constructor(config: Config) {
    this.base = config
  }

  get proposal_deposit(): number {
    if ('gov_token' in this.base) {
      return this.base.config.proposal_deposit as number
    }
    return 0
  }

  get gov_token(): string {
    if ('gov_token' in this.base) {
      return this.base.gov_token as string
    }
    return ''
  }

  get gov_token_symbol() {
    if ('gov_token' in this.base) {
      const tokenInfo = useRecoilValue(tokenConfig(this.gov_token))
      return tokenInfo.symbol
    }
    return ''
  }
}
