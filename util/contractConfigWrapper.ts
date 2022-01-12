import { ConfigResponse as SigConfig } from '@dao-dao/types/contracts/cw3-flex-multisig'
import { ConfigResponse as DaoConfig } from '@dao-dao/types/contracts/cw3-dao'
import { useRecoilValue, waitForAll } from 'recoil'
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
    // Must call hooks the same number of times every render so we do
    // this little maneuver. I age ten years every time I have to do
    // this.
    const tokenInfo = useRecoilValue(
      waitForAll(
        (this.gov_token ? [this.gov_token] : []).map((address) =>
          tokenConfig(address)
        )
      )
    )
    return tokenInfo.length ? tokenInfo[0].symbol : ''
  }
}
