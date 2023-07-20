import { Coin } from '@cosmjs/stargate'
import { ProposalStatus } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { MsgDeposit } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import Long from 'long'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue, waitForAll } from 'recoil'

import {
  genericTokenSelector,
  govProposalSelector,
  govProposalsSelector,
  govQueryParamsSelector,
} from '@dao-dao/state'
import { BankEmoji, useCachedLoading } from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  isDecodedStargateMsg,
  makeStargateMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { PayEntityDisplay } from '../../../../components/PayEntityDisplay'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { useActionOptions } from '../../../react'
import {
  GovernanceDepositData,
  GovernanceDepositComponent as StatelessGovernanceDepositComponent,
} from './Component'

const useDefaults: UseDefaults<GovernanceDepositData> = () => ({
  proposalId: '',
  deposit: [],
})

const Component: ActionComponent<undefined, GovernanceDepositData> = (
  props
) => {
  const { isCreating, fieldNamePrefix } = props
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()
  const { watch, setValue, setError, clearErrors } =
    useFormContext<GovernanceDepositData>()

  const proposalId = watch(
    (props.fieldNamePrefix + 'proposalId') as 'proposalId'
  )

  const proposalOptions = useRecoilValue(
    isCreating
      ? govProposalsSelector({
          status: ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD,
          chainId,
        })
      : constSelector(undefined)
  )

  // Prevent action from being submitted if there are no open proposals.
  useEffect(() => {
    if (proposalOptions && proposalOptions.length === 0) {
      setError((fieldNamePrefix + 'proposalId') as 'proposalId', {
        type: 'manual',
      })
    } else {
      clearErrors((fieldNamePrefix + 'proposalId') as 'proposalId')
    }
  }, [proposalOptions, setError, clearErrors, fieldNamePrefix])

  // If viewing an action where we already selected and voted on a proposal,
  // load just the one we voted on and add it to the list so we can display it.
  const selectedProposal = useRecoilValue(
    !isCreating && proposalId
      ? govProposalSelector({
          proposalId: Number(proposalId),
          chainId,
        })
      : constSelector(undefined)
  )

  const govParams = useRecoilValue(
    govQueryParamsSelector({
      chainId,
    })
  )

  // On proposal change, update deposit to remaining needed.
  useEffect(() => {
    const proposalSelected =
      proposalId &&
      proposalOptions?.find((p) => p.proposalId.toString() === proposalId)
    if (!proposalSelected) {
      return
    }

    const minDeposit = govParams.depositParams.minDeposit[0]
    const missingDeposit =
      BigInt(minDeposit.amount) -
      BigInt(
        proposalSelected.totalDeposit.find(
          ({ denom }) => minDeposit.denom === denom
        )?.amount ?? 0
      )

    if (missingDeposit > 0) {
      setValue((fieldNamePrefix + 'deposit') as 'deposit', [
        {
          denom: minDeposit.denom,
          amount: Number(missingDeposit),
        },
      ])
    }
  }, [proposalId, proposalOptions, govParams, setValue, fieldNamePrefix])

  // Select first proposal once loaded if nothing selected.
  useEffect(() => {
    if (isCreating && proposalOptions?.length && !proposalId) {
      setValue(
        (fieldNamePrefix + 'proposalId') as 'proposalId',
        proposalOptions[0].proposalId.toString()
      )
    }
  }, [isCreating, proposalOptions, proposalId, setValue, fieldNamePrefix])

  const depositTokens = useCachedLoading(
    waitForAll(
      govParams.depositParams.minDeposit.map(({ denom }) =>
        genericTokenSelector({
          type: TokenType.Native,
          denomOrAddress: denom,
          chainId,
        })
      )
    ),
    []
  )

  return (
    <StatelessGovernanceDepositComponent
      {...props}
      options={{
        depositTokens,
        proposals: [
          ...(proposalOptions ?? []),
          ...(selectedProposal ? [selectedProposal] : []),
        ],
        PayEntityDisplay,
        TokenAmountDisplay,
      }}
    />
  )
}

export const makeGovernanceDepositAction: ActionMaker<
  GovernanceDepositData
> = ({ t, address }) => {
  const useTransformToCosmos: UseTransformToCosmos<
    GovernanceDepositData
  > = () =>
    useCallback(
      ({ proposalId, deposit }) =>
        makeStargateMessage({
          stargate: {
            typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
            value: {
              proposalId: Long.fromString(proposalId || '-1'),
              depositor: address,
              amount: deposit.map(({ denom, amount }) => ({
                denom,
                amount: BigInt(amount).toString(),
              })),
            } as MsgDeposit,
          },
        }),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<GovernanceDepositData> = (
    msg: Record<string, any>
  ) =>
    isDecodedStargateMsg(msg) &&
    objectMatchesStructure(msg.stargate.value, {
      proposalId: {},
      depositor: {},
      amount: {},
    }) &&
    // Make sure this is a deposit message.
    msg.stargate.typeUrl === '/cosmos.gov.v1beta1.MsgDeposit' &&
    msg.stargate.value.depositor === address
      ? {
          match: true,
          data: {
            proposalId: msg.stargate.value.proposalId.toString(),
            deposit: (msg.stargate.value.amount as Coin[]).map(
              ({ denom, amount }) => ({
                denom,
                amount: Number(amount),
              })
            ),
          },
        }
      : {
          match: false,
        }

  return {
    key: ActionKey.GovernanceDeposit,
    Icon: BankEmoji,
    label: t('title.depositToGovernanceProposal'),
    description: t('info.depositToGovernanceProposalDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
