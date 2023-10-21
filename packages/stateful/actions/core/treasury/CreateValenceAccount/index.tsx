import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { waitForAll } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import {
  AtomEmoji,
  ChainPickerInput,
  ChainProvider,
  useCachedLoading,
} from '@dao-dao/stateless'
import { Coin, TokenType } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { InstantiateMsg as ValenceAccountInstantiateMsg } from '@dao-dao/types/contracts/ValenceAccount'
import {
  VALENCE_SUPPORTED_CHAINS,
  actionContextSupportsValence,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  getAccountAddress,
  getSupportedChainConfig,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useTokenBalances } from '../../../hooks'
import { useActionOptions } from '../../../react/context'
import {
  CreateValenceAccountComponent,
  CreateValenceAccountData,
} from './Component'

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()
  const { watch, setValue } = useFormContext<CreateValenceAccountData>()

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const funds = watch((props.fieldNamePrefix + 'funds') as 'funds')

  const nativeBalances = useTokenBalances({
    filter: TokenType.Native,
    // Load selected tokens when not creating in case they are no longer
    // returned in the list of all tokens for the given DAO/wallet after the
    // proposal is made.
    additionalTokens: props.isCreating
      ? undefined
      : funds.map(({ denom }) => ({
          chainId,
          type: TokenType.Native,
          denomOrAddress: denom,
        })),
    allChains: true,
  })

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <ChainPickerInput
          className="mb-4"
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          includeChainIds={VALENCE_SUPPORTED_CHAINS}
          onChange={() => {
            // Reset funds when switching chain.
            setValue((props.fieldNamePrefix + 'funds') as 'funds', [])
          }}
        />
      )}

      <ChainProvider chainId={chainId}>
        <CreateValenceAccountComponent
          {...props}
          options={{
            nativeBalances,
          }}
        />
      </ChainProvider>
    </>
  )
}

const useDefaults: UseDefaults<CreateValenceAccountData> = () => ({
  chainId: VALENCE_SUPPORTED_CHAINS[0],
  funds: [],
})

export const makeCreateValenceAccountAction: ActionMaker<
  CreateValenceAccountData
> = (options) => {
  if (!actionContextSupportsValence(options)) {
    return null
  }

  const {
    t,
    address,
    context,
    chain: { chain_id: currentChainId },
  } = options

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<CreateValenceAccountData> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    const isInstantiateMsg = objectMatchesStructure(msg, {
      wasm: {
        instantiate: {
          code_id: {},
          label: {},
          msg: {
            services_manager: {},
          },
          funds: {},
        },
      },
    })

    const valenceAccountCodeId =
      getSupportedChainConfig(chainId)?.codeIds?.ValenceAccount

    const fundTokens = useCachedLoading(
      isInstantiateMsg
        ? waitForAll(
            (msg.wasm.instantiate.funds as Coin[]).map(({ denom }) =>
              genericTokenSelector({
                chainId,
                type: TokenType.Native,
                denomOrAddress: denom,
              })
            )
          )
        : undefined,
      []
    )

    return valenceAccountCodeId !== undefined && isInstantiateMsg
      ? {
          match: true,
          data: {
            chainId,
            funds: (msg.wasm.instantiate.funds as Coin[]).map(
              ({ denom, amount }) => ({
                denom,
                amount: convertMicroDenomToDenomWithDecimals(
                  amount,
                  (!fundTokens.loading &&
                    fundTokens.data.find(
                      (token) =>
                        token.chainId === chainId &&
                        token.denomOrAddress === denom
                    )?.decimals) ||
                    0
                ),
              })
            ),
          },
        }
      : {
          match: false,
        }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    CreateValenceAccountData
  > = () => {
    const nativeBalances = useTokenBalances({
      filter: TokenType.Native,
      allChains: true,
    })

    return useCallback(
      ({ chainId, funds }) => {
        const config = getSupportedChainConfig(chainId)
        if (!config?.codeIds?.ValenceAccount || !config?.valence) {
          throw new Error(t('error.unsupportedValenceChain'))
        }

        return maybeMakePolytoneExecuteMessage(
          currentChainId,
          chainId,
          makeWasmMessage({
            wasm: {
              instantiate: {
                code_id: config.codeIds.ValenceAccount,
                label: 'Valence Account',
                msg: {
                  services_manager: config.valence.servicesManager,
                } as ValenceAccountInstantiateMsg,
                admin:
                  context.type === ActionContextType.Dao
                    ? getAccountAddress({
                        accounts: context.info.accounts,
                        chainId,
                      })
                    : address,
                funds: funds.map(({ denom, amount }) => ({
                  denom,
                  amount: BigInt(
                    convertDenomToMicroDenomWithDecimals(
                      amount,
                      (!nativeBalances.loading &&
                        nativeBalances.data.find(
                          ({ token }) =>
                            token.chainId === chainId &&
                            token.denomOrAddress === denom
                        )?.token.decimals) ||
                        0
                    )
                  ).toString(),
                })),
              },
            },
          })
        )
      },
      [nativeBalances]
    )
  }

  return {
    key: ActionKey.CreateValenceAccount,
    Icon: AtomEmoji,
    label: t('title.createValenceAccount'),
    description: t('info.createValenceAccountDescription'),
    notReusable: true,
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
