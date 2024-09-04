import {
  ActionBase,
  ArtistPaletteEmoji,
  DaoSupportedChainPickerInput,
  useActionOptions,
} from '@dao-dao/stateless'
import { ChainId, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  getChainAddressForActionOptions,
  getSupportedChainConfig,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  CreateNftCollectionActionData,
  CreateNftCollectionAction as CreateNftCollectionComponent,
} from '../../../../components'

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          excludeChainIds={[ChainId.StargazeMainnet, ChainId.StargazeTestnet]}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />
      )}

      <CreateNftCollectionComponent {...props} />
    </>
  )
}

export class CreateNftCollectionAction extends ActionBase<CreateNftCollectionActionData> {
  public readonly key = ActionKey.CreateNftCollection
  public readonly Component = Component

  constructor(options: ActionOptions) {
    // Need to be on a supported chain to create an NFT collection.
    if (
      options.chainContext.type !== ActionChainContextType.Supported ||
      !options.chainContext.config.codeIds.Cw721Base
    ) {
      throw new Error(
        'Creating NFT collections on this chain is not supported.'
      )
    }

    super(options, {
      Icon: ArtistPaletteEmoji,
      label: options.t('title.createNftCollection'),
      description: options.t('info.createNftCollectionDescription', {
        context: options.context.type,
      }),
    })

    this.defaults = {
      chainId: options.chain.chain_id,
      name: '',
      symbol: '',
    }
  }

  encode({
    chainId,
    name,
    symbol,
  }: CreateNftCollectionActionData): UnifiedCosmosMsg[] {
    if (
      chainId === ChainId.StargazeMainnet ||
      chainId === ChainId.StargazeTestnet
    ) {
      throw new Error(
        this.options.t('error.cannotUseCreateNftCollectionOnStargaze')
      )
    }

    const creator = getChainAddressForActionOptions(this.options, chainId)
    if (!creator) {
      throw new Error('Creator address not found for this chain.')
    }

    const codeId = getSupportedChainConfig(chainId)?.codeIds.Cw721Base
    if (!codeId) {
      throw new Error('NFT code ID not found for this chain.')
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId,
      makeWasmMessage({
        wasm: {
          instantiate: {
            admin: creator,
            code_id: codeId,
            funds: [],
            label: name,
            msg: {
              minter: creator,
              name,
              symbol,
            },
          },
        },
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return objectMatchesStructure(decodedMessage, {
      wasm: {
        instantiate: {
          code_id: {},
          label: {},
          msg: {
            minter: {},
            name: {},
            symbol: {},
          },
          funds: {},
        },
      },
    })
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): CreateNftCollectionActionData {
    return {
      chainId,
      name: decodedMessage.wasm.instantiate.name,
      symbol: decodedMessage.wasm.instantiate.symbol,
    }
  }
}
