import { MoneyWingsEmoji } from '@dao-dao/stateless'
import { AccountType, ChainId, ValenceAccount } from '@dao-dao/types'
import {
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { getAccount } from '@dao-dao/utils'

import { SpendAction } from '../../actions/Spend'

export class FundRebalancerAction extends SpendAction {
  public readonly key = ActionKey.FundRebalancer

  private valenceAccount: ValenceAccount

  constructor(options: ActionOptions) {
    super(options)

    // Override Spend metadata.
    this._metadata = {
      Icon: MoneyWingsEmoji,
      label: options.t('title.fundRebalancer'),
      description: options.t('info.fundRebalancerDescription'),
    }

    const valenceAccount = getAccount({
      accounts: options.context.accounts,
      chainId: ChainId.NeutronMainnet,
      types: [AccountType.Valence],
    }) as ValenceAccount
    if (!valenceAccount) {
      throw new Error(options.t('error.noValenceAccount'))
    }

    this.valenceAccount = valenceAccount

    const SpendComponent = this.Component
    this.Component = function FundRebalancerActionComponent(props) {
      return <SpendComponent {...props} noChangeDestination />
    }
  }

  async setup() {
    await super.setup()

    this.defaults = {
      ...this.defaults,
      fromChainId: this.options.chain.chain_id,
      from: this.options.address,
      toChainId: this.valenceAccount.chainId,
      to: this.valenceAccount.address,
    }
  }

  async match(messages: ProcessedMessage[]): Promise<ActionMatch> {
    const match = await super.match(messages)
    if (!match) {
      return false
    }

    const decoded = await this.decode(messages)
    return (
      decoded.toChainId === this.valenceAccount.chainId &&
      decoded.to === this.valenceAccount.address
    )
  }
}
