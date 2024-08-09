import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { contractQueries } from '@dao-dao/state/query'
import {
  ActionBase,
  BrokenHeartEmoji,
  InputErrorMessage,
  Loader,
} from '@dao-dao/stateless'
import { UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  ContractName,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import { ChooseExistingTokenSwap } from '../stateful/ChooseExistingTokenSwap'
import { WithdrawTokenSwap } from './Component'

export interface WithdrawTokenSwapData {
  // Whether or not the contract has been chosen. When this is `false`, shows
  // form allowing user to enter an existing address. When `true`, it shows the
  // status of the swap. `tokenSwapContractAddress` should be defined and valid
  // when this is `true`.
  contractChosen: boolean
  tokenSwapContractAddress?: string
}

const Component: ActionComponent<undefined, WithdrawTokenSwapData> = (
  props
) => {
  const { t } = useTranslation()
  const { watch, setValue, register } = useFormContext()
  const contractChosen = watch(props.fieldNamePrefix + 'contractChosen')

  const [mounted, setMounted] = useState(false)
  // If `contractChosen` is true on mount during creation, this must have been
  // set by duplicating an existing action. Clear the value so that the user
  // has to confirm again.
  useEffect(() => {
    if (contractChosen && props.isCreating) {
      setValue(props.fieldNamePrefix + 'contractChosen', false)
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
          <WithdrawTokenSwap {...props} />
        ) : (
          <ChooseExistingTokenSwap
            {...props}
            options={{ action: 'withdraw' }}
          />
        )}

        <InputErrorMessage
          className="self-end text-right"
          error={props.errors?.contractChosen}
        />
      </SuspenseLoader>
    </>
  )
}

export class WithdrawTokenSwapAction extends ActionBase<WithdrawTokenSwapData> {
  public readonly key = ActionKey.WithdrawTokenSwap
  public readonly Component = Component

  protected _defaults: WithdrawTokenSwapData = {
    contractChosen: false,
  }

  constructor(options: ActionOptions) {
    super(options, {
      Icon: BrokenHeartEmoji,
      label: options.t('title.withdrawTokenSwap'),
      description: options.t('info.withdrawTokenSwapDescription'),
    })
  }

  encode({
    tokenSwapContractAddress,
  }: WithdrawTokenSwapData): UnifiedCosmosMsg {
    return makeWasmMessage({
      wasm: {
        execute: {
          contract_addr: tokenSwapContractAddress,
          funds: [],
          msg: {
            withdraw: {},
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
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              withdraw: {},
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
      ))
    )
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): WithdrawTokenSwapData {
    return {
      contractChosen: true,
      tokenSwapContractAddress: decodedMessage.wasm.execute.contract_addr,
    }
  }
}
