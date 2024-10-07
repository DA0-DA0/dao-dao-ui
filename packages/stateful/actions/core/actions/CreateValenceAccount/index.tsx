import { fromUtf8, toUtf8 } from '@cosmjs/encoding'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { HugeDecimal } from '@dao-dao/math'
import {
  tokenQueries,
  valenceRebalancerExtraQueries,
} from '@dao-dao/state/query'
import {
  ActionBase,
  AtomEmoji,
  ChainProvider,
  DaoSupportedChainPickerInput,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  TokenType,
  UnifiedCosmosMsg,
  makeStargateMessage,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { InstantiateMsg as ValenceAccountInstantiateMsg } from '@dao-dao/types/contracts/ValenceAccount'
import { MsgInstantiateContract2 } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import {
  VALENCE_INSTANTIATE2_SALT,
  VALENCE_SUPPORTED_CHAINS,
  getChainAddressForActionOptions,
  getDisplayNameForChainId,
  getSupportedChainConfig,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessages,
  mustGetSupportedChainConfig,
  tokensEqual,
} from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useTokenBalances } from '../../../hooks'
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
  })

  const queryClient = useQueryClient()
  const rebalancer = mustGetSupportedChainConfig(chainId).valence?.rebalancer
  const serviceFee = useQueryLoadingDataWithError(
    valenceRebalancerExtraQueries.rebalancerRegistrationServiceFee(
      queryClient,
      rebalancer
        ? {
            chainId,
            address: rebalancer,
          }
        : undefined
    )
  )
  useEffect(() => {
    setValue(
      (props.fieldNamePrefix + 'serviceFee') as 'serviceFee',
      serviceFee.loading ||
        serviceFee.errored ||
        serviceFee.updating ||
        !serviceFee.data
        ? undefined
        : {
            amount: serviceFee.data.balance,
            denom: serviceFee.data.token.denomOrAddress,
          }
    )
  }, [props.fieldNamePrefix, serviceFee, setValue])

  return (
    <>
      {context.type === ActionContextType.Dao &&
        VALENCE_SUPPORTED_CHAINS.length > 1 && (
          <DaoSupportedChainPickerInput
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
            nativeBalances:
              nativeBalances.loading || serviceFee.loading
                ? { loading: true }
                : {
                    loading: false,
                    updating: nativeBalances.updating,
                    data: nativeBalances.data.map(
                      ({ balance: _balance, ...data }) => {
                        // Subtract service fee from balance for corresponding
                        // token to ensure that they leave enough for the fee.
                        // This value is used as the input max.
                        let balance =
                          !serviceFee.errored &&
                          serviceFee.data &&
                          tokensEqual(data.token, serviceFee.data.token)
                            ? BigInt(_balance) - BigInt(serviceFee.data.balance)
                            : BigInt(_balance)
                        if (balance < 0n) {
                          balance = 0n
                        }

                        return {
                          ...data,
                          balance: balance.toString(),
                        }
                      }
                    ),
                  },
            serviceFee,
          }}
        />
      </ChainProvider>
    </>
  )
}

export class CreateValenceAccountAction extends ActionBase<CreateValenceAccountData> {
  public readonly key = ActionKey.CreateValenceAccount
  public readonly Component = Component

  protected _defaults: CreateValenceAccountData = {
    chainId: VALENCE_SUPPORTED_CHAINS[0],
    funds: [
      {
        denom: 'untrn',
        amount: '10',
        decimals: 6,
      },
    ],
  }

  constructor(options: ActionOptions) {
    super(options, {
      Icon: AtomEmoji,
      label: options.t('title.createValenceAccount'),
      description: options.t('info.createValenceAccountDescription'),
      notReusable: true,
      // The configure rebalancer action is responsible for adding this action.
      programmaticOnly: true,
    })
  }

  encode({
    chainId,
    funds,
    serviceFee,
  }: CreateValenceAccountData): UnifiedCosmosMsg[] {
    const config = getSupportedChainConfig(chainId)
    if (!config?.codeIds?.ValenceAccount || !config?.valence) {
      throw new Error(this.options.t('error.unsupportedValenceChain'))
    }

    const sender = getChainAddressForActionOptions(this.options, chainId)
    if (!sender) {
      throw new Error(
        this.options.t('error.failedToFindChainAccount', {
          chain: getDisplayNameForChainId(chainId),
        })
      )
    }

    const convertedFunds = funds.map(({ denom, amount, decimals }) =>
      HugeDecimal.fromHumanReadable(amount, decimals).toCoin(denom)
    )

    // Add service fee to funds.
    if (serviceFee && serviceFee.amount !== '0') {
      const existing = convertedFunds.find((f) => f.denom === serviceFee.denom)
      if (existing) {
        existing.amount = HugeDecimal.from(existing.amount)
          .plus(serviceFee.amount)
          .toString()
      } else {
        convertedFunds.push({
          denom: serviceFee.denom,
          amount: serviceFee.amount,
        })
      }
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId,
      makeStargateMessage({
        stargate: {
          typeUrl: MsgInstantiateContract2.typeUrl,
          value: {
            sender,
            admin: sender,
            codeId: BigInt(config.codeIds.ValenceAccount),
            label: 'Valence Account',
            msg: toUtf8(
              JSON.stringify({
                services_manager: config.valence.servicesManager,
              } as ValenceAccountInstantiateMsg)
            ),
            funds: convertedFunds
              // Neutron errors with `invalid coins` if the funds list is
              // not alphabetized.
              .sort((a, b) => a.denom.localeCompare(b.denom)),
            salt: toUtf8(VALENCE_INSTANTIATE2_SALT),
            fixMsg: false,
          } as MsgInstantiateContract2,
        },
      })
    )
  }

  match([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): ActionMatch {
    return (
      !!getSupportedChainConfig(chainId)?.codeIds?.ValenceAccount &&
      isDecodedStargateMsg(decodedMessage, MsgInstantiateContract2) &&
      fromUtf8(decodedMessage.stargate.value.salt) === VALENCE_INSTANTIATE2_SALT
    )
  }

  async decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): Promise<CreateValenceAccountData> {
    const funds = await Promise.all(
      (decodedMessage.stargate.value as MsgInstantiateContract2).funds.map(
        async ({ denom, amount }) => {
          const token = await this.options.queryClient.fetchQuery(
            tokenQueries.info(this.options.queryClient, {
              chainId,
              type: TokenType.Native,
              denomOrAddress: denom,
            })
          )

          return {
            denom,
            amount: HugeDecimal.from(amount).toHumanReadableString(
              token.decimals
            ),
            decimals: token.decimals,
          }
        }
      )
    )

    return {
      chainId,
      funds,
    }
  }
}
