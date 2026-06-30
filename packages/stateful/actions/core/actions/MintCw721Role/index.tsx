import { ActionBase, PersonRaisingHandEmoji } from '@dao-dao/stateless'
import { type GenericToken, TokenType, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  getChainAddressForActionOptions,
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { MintCw721RoleComponent } from './Component'

export type MintCw721RoleData = {
  chainId: string
  collectionAddress: string
  mintMsg: {
    owner: string
    token_id: string
    token_uri?: string | null
    extension: {
      role?: string | null
      weight: string | number
    }
  }
}

export class MintCw721RoleAction extends ActionBase<MintCw721RoleData> {
  public readonly key = ActionKey.MintCw721Role
  public readonly Component = MintCw721RoleComponent

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    super(options, {
      Icon: PersonRaisingHandEmoji,
      label: options.t('title.mintCw721RoleNft'),
      description: options.t('info.mintCw721RoleNftDescription'),
      // Match before the generic Mint NFT action, which also matches mint
      // messages with token_uri set.
      matchPriority: -70,
    })

    this.defaults = {
      chainId: options.chain.chainId,
      collectionAddress: '',
      mintMsg: {
        owner: options.address,
        token_id: '',
        token_uri: '',
        extension: {
          role: '',
          weight: '1',
        },
      },
    }
  }

  async setup() {
    const context = this.options.context

    if (context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    const { dao } = context

    if (!dao.votingModule.getGovernanceTokenQuery) {
      return
    }

    try {
      const governanceToken = (await this.options.queryClient.fetchQuery(
        dao.votingModule.getGovernanceTokenQuery()
      )) as GenericToken

      if (governanceToken.type === TokenType.Cw721) {
        this.defaults = {
          ...this.defaults,
          chainId: governanceToken.chainId,
          collectionAddress: governanceToken.denomOrAddress,
        }
      }
    } catch {
      // Keep the action available even if auto-detecting the DAO's cw721 roles
      // collection fails. The user can still paste the collection address.
    }
  }

  encode({
    chainId,
    collectionAddress,
    mintMsg: {
      owner,
      token_id,
      token_uri,
      extension: { role, weight },
    },
  }: MintCw721RoleData): UnifiedCosmosMsg[] {
    const sender = getChainAddressForActionOptions(this.options, chainId)
    if (!sender) {
      throw new Error('No sender found for chain.')
    }

    const safeIntegerWeight = Number(weight)
    if (!Number.isSafeInteger(safeIntegerWeight) || safeIntegerWeight <= 0) {
      throw new Error('Weight must be a positive safe integer.')
    }

    const msg = {
      mint: {
        owner,
        token_id,
        ...(token_uri ? { token_uri } : {}),
        extension: {
          ...(role ? { role } : {}),
          weight: safeIntegerWeight,
        },
      },
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      makeExecuteSmartContractMessage({
        chainId,
        sender,
        contractAddress: collectionAddress,
        msg,
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    if (
      !objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              mint: {
                owner: {},
                token_id: {},
                extension: {
                  weight: {},
                },
              },
            },
          },
        },
      })
    ) {
      return false
    }

    const extension = decodedMessage.wasm.execute.msg.mint.extension
    const extensionKeys = Object.keys(extension)

    return (
      extensionKeys.every((key) => key === 'role' || key === 'weight') &&
      Number.isSafeInteger(Number(extension.weight)) &&
      Number(extension.weight) > 0
    )
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): MintCw721RoleData {
    const mint = decodedMessage.wasm.execute.msg.mint

    return {
      chainId,
      collectionAddress: decodedMessage.wasm.execute.contract_addr,
      mintMsg: {
        owner: mint.owner,
        token_id: mint.token_id,
        token_uri: mint.token_uri ?? '',
        extension: {
          role: mint.extension.role ?? '',
          weight: mint.extension.weight,
        },
      },
    }
  }
}
