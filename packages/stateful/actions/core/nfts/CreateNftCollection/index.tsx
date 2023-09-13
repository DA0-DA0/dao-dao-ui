import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { CameraEmoji, ChainProvider } from '@dao-dao/stateless'
import { ChainId } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  MAINNET,
  STARGAZE_MAINNET_BASE_MINTER_FACTORY,
  STARGAZE_MAINNET_VENDING_MINTER_FACTORY,
  STARGAZE_TESTNET_BASE_MINTER_FACTORY,
  STARGAZE_TESTNET_VENDING_MINTER_FACTORY,
  decodePolytoneExecuteMsg,
  getSupportedChainConfig,
  makePolytoneExecuteMessage,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  InstantiateNftCollectionAction,
  InstantiateNftCollectionData,
  Trans,
} from '../../../../components'

const Component: ActionComponent = (props) => {
  const { watch } = useFormContext<InstantiateNftCollectionData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  return (
    <ChainProvider chainId={chainId}>
      <InstantiateNftCollectionAction
        {...props}
        options={{
          Trans,
        }}
      />
    </ChainProvider>
  )
}

export const makeCreateNftCollectionAction: ActionMaker<
  InstantiateNftCollectionData
> = ({ t, address, chain: { chain_id: currentChainId }, context }) => {
  const useDefaults: UseDefaults<InstantiateNftCollectionData> = () => ({
    chainId: currentChainId,
    minter: address,
    name: '',
    symbol: '',
    collectionInfo: {
      type: 'base',
      description: '',
      explicitContent: false,
      image: '',
      royalties: 5,
    },
  })

  const useTransformToCosmos: UseTransformToCosmos<
    InstantiateNftCollectionData
  > = () =>
    useCallback(
      ({
        chainId,
        name,
        symbol,
        collectionInfo: {
          type,
          description,
          explicitContent,
          externalLink,
          image,
          startTradingDate,
          royalties,
        } = {} as any,
      }: InstantiateNftCollectionData) => {
        const creator =
          context.type !== ActionContextType.Dao || currentChainId === chainId
            ? address
            : context.info.polytoneProxies[chainId] ?? ''

        const createMsg = makeWasmMessage({
          wasm:
            chainId === ChainId.StargazeMainnet ||
            chainId === ChainId.StargazeTestnet
              ? {
                  execute: {
                    contract_addr: MAINNET
                      ? type === 'base'
                        ? STARGAZE_MAINNET_BASE_MINTER_FACTORY
                        : STARGAZE_MAINNET_VENDING_MINTER_FACTORY
                      : type === 'base'
                      ? STARGAZE_TESTNET_BASE_MINTER_FACTORY
                      : STARGAZE_TESTNET_VENDING_MINTER_FACTORY,
                    funds: [],
                    msg: {
                      create_minter: {
                        init_msg: {},
                        collection_params: {
                          code_id: 999999,
                          name,
                          symbol,
                          info: {
                            creator,
                            description,
                            image,
                            external_link: externalLink,
                            explicit_content: explicitContent,
                            start_trading_time:
                              startTradingDate &&
                              !isNaN(Date.parse(startTradingDate))
                                ? // milliseconds => nanoseconds
                                  Math.round(
                                    new Date(startTradingDate).getTime() * 1e6
                                  ).toString()
                                : null,
                            royalty_info: royalties
                              ? {
                                  payment_address: creator,
                                  share: (royalties / 100).toFixed(2),
                                }
                              : null,
                          },
                        },
                      },
                    },
                  },
                }
              : {
                  instantiate: {
                    admin: creator,
                    code_id:
                      getSupportedChainConfig(chainId)?.codeIds.Cw721Base ?? -1,
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

        if (chainId === currentChainId) {
          return createMsg
        } else {
          return makePolytoneExecuteMessage(currentChainId, chainId, createMsg)
        }
      },
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<
    InstantiateNftCollectionData
  > = (msg: Record<string, any>) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    if (
      chainId === ChainId.StargazeMainnet ||
      chainId === ChainId.StargazeTestnet
    ) {
      if (
        !objectMatchesStructure(msg, {
          wasm: {
            execute: {
              contract_addr: {},
              funds: {},
              msg: {
                create_minter: {
                  init_msg: {},
                  collection_params: {},
                },
              },
            },
          },
        })
      ) {
        return {
          match: false,
        }
      }

      const factory = msg.wasm.execute.contract_addr
      const type =
        chainId === ChainId.StargazeMainnet
          ? factory === STARGAZE_MAINNET_BASE_MINTER_FACTORY
            ? 'base'
            : STARGAZE_MAINNET_VENDING_MINTER_FACTORY
            ? 'vending'
            : undefined
          : factory === STARGAZE_TESTNET_BASE_MINTER_FACTORY
          ? 'base'
          : STARGAZE_TESTNET_VENDING_MINTER_FACTORY
          ? 'vending'
          : undefined
      if (!type) {
        return {
          match: false,
        }
      }

      const collectionParams =
        msg.wasm.execute.msg.create_minter.collection_params

      return objectMatchesStructure(collectionParams, {
        code_id: {},
        name: {},
        symbol: {},
        info: {
          creator: {},
          description: {},
          image: {},
        },
      })
        ? {
            match: true,
            data: {
              chainId,
              name: collectionParams.name,
              symbol: collectionParams.symbol,
              collectionInfo: {
                type,
                description: collectionParams.info.description,
                explicitContent:
                  collectionParams.info.explicit_content || false,
                externalLink: collectionParams.info.external_link,
                image: collectionParams.info.image,
                royalties: collectionParams.info.royalty_info
                  ? parseFloat(collectionParams.info.royalty_info.share) * 100
                  : 0,
                startTradingDate: collectionParams.info.start_trading_time
                  ? new Date(
                      // nanoseconds => milliseconds
                      Number(collectionParams.info.start_trading_time) / 1e6
                    ).toLocaleString()
                  : undefined,
              },
            },
          }
        : {
            match: false,
          }
    } else {
      return objectMatchesStructure(msg, {
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
        ? {
            match: true,
            data: {
              chainId,
              name: msg.wasm.instantiate.name,
              symbol: msg.wasm.instantiate.symbol,
            },
          }
        : {
            match: false,
          }
    }
  }

  return {
    key: ActionKey.CreateNftCollection,
    Icon: CameraEmoji,
    label: t('title.createNftCollection'),
    description: t('info.createNftCollectionDescription', {
      context: context.type,
    }),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
