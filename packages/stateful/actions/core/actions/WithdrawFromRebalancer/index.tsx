import { DownArrowEmoji } from '@dao-dao/stateless'
import { AccountType, ChainId, ValenceAccount } from '@dao-dao/types'
import {
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { getAccount } from '@dao-dao/utils'

import { SpendAction } from '../../actions/Spend'

export class WithdrawFromRebalancerAction extends SpendAction {
  public readonly key = ActionKey.WithdrawFromRebalancer

  private valenceAccount: ValenceAccount

  constructor(options: ActionOptions) {
    super(options)

    // Override Spend metadata.
    this._metadata = {
      Icon: DownArrowEmoji,
      label: options.t('title.withdrawFromRebalancer'),
      description: options.t('info.withdrawFromRebalancerDescription'),
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
    this.Component = function WithdrawFromRebalancerActionComponent(props) {
      return <SpendComponent {...props} fromValence noChangeDestination />
    }
  }

  async setup() {
    await super.setup()

    this.defaults = {
      ...this.defaults,
      fromChainId: this.valenceAccount.chainId,
      from: this.valenceAccount.address,
      toChainId: this.options.chain.chain_id,
      to: this.options.address,
    }
  }

  async match(messages: ProcessedMessage[]): Promise<ActionMatch> {
    const match = await super.match(messages)
    if (!match) {
      return false
    }

    const decoded = await this.decode(messages)
    return (
      decoded.fromChainId === this.valenceAccount.chainId &&
      decoded.from === this.valenceAccount.address &&
      decoded.toChainId === this.options.chain.chain_id &&
      decoded.to === this.options.address
    )
  }
}
