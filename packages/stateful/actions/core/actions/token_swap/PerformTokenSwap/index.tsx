import { coins } from '@cosmjs/amino'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { contractQueries } from '@dao-dao/state/query'
import {
  ActionBase,
  HandshakeEmoji,
  InputErrorMessage,
  Loader,
  SegmentedControls,
} from '@dao-dao/stateless'
import { UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionComponent,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  ContractName,
  decodeJsonFromBase64,
  encodeJsonToBase64,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import { ChooseExistingTokenSwap } from '../stateful/ChooseExistingTokenSwap'
import { InstantiateTokenSwap } from '../stateful/InstantiateTokenSwap'
import { PerformTokenSwapData } from '../types'
import { PerformTokenSwapComponent } from './Component'

// This action requires the user to first instantiate a token swap contract
// themself, and then the user can use this action to propose funding that token
// swap to the DAO. The token swap contract instantiator is irrelevant, so
// there's no reason to make the DAO submit two proposals (one to instantiate
// and one to fund). Thus, this action has a preliminary step, in which the user
// enters the token swap contract instantiation information and executes the
// instantiation. Once done, the action is ready to submit.

// Use common key to identify CW20s being sent to token swaps from this DAO DAO
// action. This is passed into the `msg` parameter of the CW20 `send` execute
// variant, since it can take arbitrary JSON. This allows us to detect if a CW20
// send was a result of a token swap funding action in order to display this
// action accordingly.
const CW20_SEND_MSG_KEY = 'dao_dao_initiate_token_swap'

const Component: ActionComponent<undefined, PerformTokenSwapData> = (props) => {
  const { t } = useTranslation()
  const { watch, setValue, register } = useFormContext()
  const contractChosen = watch(props.fieldNamePrefix + 'contractChosen')

  const [creatingNew, setCreatingNew] = useState(true)
  const [mounted, setMounted] = useState(false)
  // If `contractChosen` is true on mount during creation, this must have been
  // set by duplicating an existing action. In this case, we want to default
  // to using the existing contract since the address is filled in, and clear
  // `contractChosen` so the user has to confirm the contract. This may be
  // used to quickly perform a token swap with an existing contract.
  useEffect(() => {
    if (!mounted && contractChosen && props.isCreating) {
      setValue(props.fieldNamePrefix + 'contractChosen', false)
      setCreatingNew(false)
    }
    setMounted(true)
    // Only run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Manually validate to ensure contract has been chosen.
  useEffect(() => {
    register(props.fieldNamePrefix + 'contractChosen', {
      validate: (value) => !!value || t('error.tokenSwapContractNotChosen'),
    })
  }, [props.fieldNamePrefix, register, t])

  return (
    <>
      <SuspenseLoader fallback={<Loader />} forceFallback={!mounted}>
        {contractChosen ? (
          <PerformTokenSwapComponent {...props} />
        ) : (
          <>
            <SegmentedControls<boolean>
              onSelect={setCreatingNew}
              selected={creatingNew}
              tabs={[
                {
                  label: t('form.createNewTokenSwap'),
                  value: true,
                },
                {
                  label: t('form.fundExistingTokenSwap'),
                  value: false,
                },
              ]}
            />

            <p className="max-w-prose">{t('info.tokenSwapExplanation')}</p>

            {creatingNew ? (
              <InstantiateTokenSwap {...props} />
            ) : (
              <ChooseExistingTokenSwap
                {...props}
                options={{ action: 'fund' }}
              />
            )}
          </>
        )}

        <InputErrorMessage
          className="self-end text-right"
          error={props.errors?.contractChosen}
        />
      </SuspenseLoader>
    </>
  )
}

export class PerformTokenSwapAction extends ActionBase<PerformTokenSwapData> {
  public readonly key = ActionKey.PerformTokenSwap
  public readonly Component = Component

  protected _defaults: PerformTokenSwapData = {
    contractChosen: false,
  }

  constructor(options: ActionOptions) {
    // Check we're on a supported chain. Code IDs are needed to instantiate a swap.
    if (options.chainContext.type !== ActionChainContextType.Supported) {
      throw new Error('Unsupported chain')
    }

    super(options, {
      Icon: HandshakeEmoji,
      label: options.t('title.tokenSwap'),
      description: options.t('info.tokenSwapDescription'),
    })
  }

  encode({
    tokenSwapContractAddress,
    selfParty,
  }: PerformTokenSwapData): UnifiedCosmosMsg {
    // Should never happen if form validation is working correctly.
    if (!tokenSwapContractAddress || !selfParty) {
      throw new Error(this.options.t('error.loadingData'))
    }

    // Convert amount to micro amount.
    const amount = HugeDecimal.fromHumanReadable(
      selfParty.amount,
      selfParty.decimals
    ).toString()

    return selfParty.type === 'cw20'
      ? makeWasmMessage({
          wasm: {
            execute: {
              // Execute CW20 send message.
              contract_addr: selfParty.denomOrAddress,
              funds: [],
              msg: {
                send: {
                  amount,
                  contract: tokenSwapContractAddress,
                  msg: encodeJsonToBase64({
                    // Use common key to identify CW20s being sent to token
                    // swaps from this DAO DAO action.
                    [CW20_SEND_MSG_KEY]: {},
                  }),
                },
              },
            },
          },
        })
      : makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: tokenSwapContractAddress,
              funds: coins(amount, selfParty.denomOrAddress),
              msg: {
                fund: {},
              },
            },
          },
        })
  }

  async match([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): Promise<ActionMatch> {
    return (
      // Native
      (objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              fund: {},
            },
          },
        },
      }) &&
        (await this.options.queryClient.fetchQuery(
          contractQueries.isContract(this.options.queryClient, {
            chainId,
            address: decodedMessage.wasm.execute.contract_addr,
            nameOrNames: ContractName.CwTokenSwap,
          })
        ))) ||
      // CW20
      (objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              send: {
                amount: {},
                contract: {},
                msg: {},
              },
            },
          },
        },
      }) &&
        // Use common key to identify CW20s being sent to token swaps from this
        // DAO DAO action.
        CW20_SEND_MSG_KEY in
          decodeJsonFromBase64(
            decodedMessage.wasm.execute.msg.send.msg,
            true
          ) &&
        (await this.options.queryClient.fetchQuery(
          contractQueries.isContract(this.options.queryClient, {
            chainId,
            address: decodedMessage.wasm.execute.msg.send.contract,
            nameOrNames: ContractName.CwTokenSwap,
          })
        )))
    )
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): PerformTokenSwapData {
    return objectMatchesStructure(decodedMessage, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            fund: {},
          },
        },
      },
    })
      ? // Native
        {
          contractChosen: true,
          tokenSwapContractAddress: decodedMessage.wasm.execute.contract_addr,
        }
      : // CW20
        {
          contractChosen: true,
          tokenSwapContractAddress:
            decodedMessage.wasm.execute.msg.send.contract,
        }
  }
}
