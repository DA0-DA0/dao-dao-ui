import { ActionBase, ChainEmoji } from '@dao-dao/stateless'
import {
  AccountType,
  ActionChainContextType,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import { maybeMakePolytoneExecuteMessages } from '@dao-dao/utils'

import {
  CreateCrossChainAccountComponent as Component,
  CreateCrossChainAccountData,
} from './Component'

export class CreateCrossChainAccountAction extends ActionBase<CreateCrossChainAccountData> {
  public readonly key = ActionKey.CreateCrossChainAccount
  public readonly Component = Component

  constructor(options: ActionOptions) {
    // Only allow using this action in DAOs.
    if (
      options.context.type !== ActionContextType.Dao ||
      // Type-check. If this is a DAO, it must be on a supported chain.
      options.chainContext.type !== ActionChainContextType.Supported
    ) {
      throw new Error('Cannot create cross-chain account in this context.')
    }

    const dao = options.context.dao
    const missingChainIds = Object.keys(
      options.chainContext.config.polytone || {}
    ).filter((chainId) => !(chainId in dao.info.polytoneProxies))

    super(options, {
      Icon: ChainEmoji,
      label: options.t('title.createCrossChainAccount'),
      description: options.t('info.createCrossChainAccountDescription'),
    })

    this.defaults = {
      chainId: missingChainIds[0] || '',
    }
  }

  encode({ chainId }: CreateCrossChainAccountData): UnifiedCosmosMsg[] {
    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId
    )
  }

  match([
    {
      wrappedMessages,
      account: { type },
    },
  ]: ProcessedMessage[]): ActionMatch {
    return type === AccountType.Polytone && wrappedMessages.length === 0
  }

  decode([
    {
      account: { chainId },
    },
  ]: ProcessedMessage[]): CreateCrossChainAccountData {
    return {
      chainId,
    }
  }
}
