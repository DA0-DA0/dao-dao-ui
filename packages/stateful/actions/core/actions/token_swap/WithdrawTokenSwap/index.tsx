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
import { WithdrawTokenSwap, WithdrawTokenSwapData } from './Component'

const Component: ActionComponent<undefined, WithdrawTokenSwapData> = (
  props
) => {
  const { t } = useTranslation()
  const { watch, setValue, register } = useFormContext<WithdrawTokenSwapData>()
  const contractChosen = watch(
    (props.fieldNamePrefix + 'contractChosen') as 'contractChosen'
  )

  const [mounted, setMounted] = useState(false)
  // If `contractChosen` is true on mount during creation, this must have been
  // set by duplicating an existing action. Clear the value so that the user
  // has to confirm again.
  useEffect(() => {
    if (contractChosen && props.isCreating) {
      setValue(
        (props.fieldNamePrefix + 'contractChosen') as 'contractChosen',
        false
      )
    }
    setMounted(true)
    // Only run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Manually validate to ensure contract has been chosen.
  useEffect(() => {
    register((props.fieldNamePrefix + 'contractChosen') as 'contractChosen', {
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
        contractQueries.isContract({
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
