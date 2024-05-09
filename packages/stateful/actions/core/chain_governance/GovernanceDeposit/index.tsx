import { Coin } from '@cosmjs/stargate'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue, waitForAll } from 'recoil'

import {
  genericTokenSelector,
  govParamsSelector,
  govProposalSelector,
  govProposalsSelector,
} from '@dao-dao/state'
import {
  BankEmoji,
  DaoSupportedChainPickerInput,
  Loader,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { ChainId, TokenType, makeStargateMessage } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { ProposalStatus } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgDeposit } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/tx'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { GovProposalActionDisplay } from '../../../../components'
import { SuspenseLoader } from '../../../../components/SuspenseLoader'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { GovActionsProvider, useActionOptions } from '../../../react'
import {
  GovernanceDepositData,
  GovernanceDepositComponent as StatelessGovernanceDepositComponent,
} from './Component'

const Component: ActionComponent<undefined, GovernanceDepositData> = (
  props
) => {
  const { context } = useActionOptions()
  const { setValue } = useFormContext<GovernanceDepositData>()

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onChange={() => {
            // Clear fields on chain change.
            setValue((props.fieldNamePrefix + 'proposalId') as 'proposalId', '')
            setValue((props.fieldNamePrefix + 'deposit') as 'deposit', [])
          }}
          onlyDaoChainIds
        />
      )}

      <SuspenseLoader fallback={<Loader />}>
        <GovActionsProvider>
          <InnerComponent {...props} />
        </GovActionsProvider>
      </SuspenseLoader>
    </>
  )
}

const InnerComponent: ActionComponent<undefined, GovernanceDepositData> = (
  props
) => {
  const { isCreating, fieldNamePrefix } = props
  const { chain_id: chainId } = useChain()
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
    if (proposalOptions && proposalOptions.proposals.length === 0) {
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
    govParamsSelector({
      chainId,
    })
  )

  // On proposal change, update deposit to remaining needed.
  useEffect(() => {
    const proposalSelected =
      proposalId &&
      proposalOptions?.proposals.find((p) => p.id.toString() === proposalId)
    if (!proposalSelected) {
      return
    }

    const minDeposit = govParams.minDeposit[0]
    const missingDeposit =
      BigInt(minDeposit.amount) -
      BigInt(
        proposalSelected.proposal.totalDeposit.find(
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
    if (isCreating && proposalOptions?.proposals.length && !proposalId) {
      setValue(
        (fieldNamePrefix + 'proposalId') as 'proposalId',
        proposalOptions.proposals[0].id.toString()
      )
    }
  }, [isCreating, proposalOptions, proposalId, setValue, fieldNamePrefix])

  const depositTokens = useCachedLoading(
    waitForAll(
      govParams.minDeposit.map(({ denom }) =>
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
          ...(proposalOptions?.proposals ?? []),
          ...(selectedProposal ? [selectedProposal] : []),
        ],
        TokenAmountDisplay,
        GovProposalActionDisplay,
      }}
    />
  )
}

export const makeGovernanceDepositAction: ActionMaker<GovernanceDepositData> = (
  options
) => {
  const {
    t,
    chain: { chain_id: currentChainId },
    context,
  } = options

  if (
    // Governance module cannot participate in governance.
    context.type === ActionContextType.Gov ||
    // Neutron does not use the x/gov module.
    currentChainId === ChainId.NeutronMainnet ||
    currentChainId === ChainId.NeutronTestnet
  ) {
    return null
  }

  const useDefaults: UseDefaults<GovernanceDepositData> = () => ({
    chainId: currentChainId,
    proposalId: '',
    deposit: [],
  })

  const useTransformToCosmos: UseTransformToCosmos<
    GovernanceDepositData
  > = () =>
    useCallback(
      ({ chainId, proposalId, deposit }) =>
        maybeMakePolytoneExecuteMessage(
          currentChainId,
          chainId,
          makeStargateMessage({
            stargate: {
              typeUrl: MsgDeposit.typeUrl,
              value: {
                proposalId: BigInt(proposalId || '0'),
                depositor: getChainAddressForActionOptions(options, chainId),
                amount: deposit.map(({ denom, amount }) => ({
                  denom,
                  amount: BigInt(amount).toString(),
                })),
              } as MsgDeposit,
            },
          })
        ),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<GovernanceDepositData> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    return isDecodedStargateMsg(msg) &&
      objectMatchesStructure(msg.stargate.value, {
        proposalId: {},
        depositor: {},
        amount: {},
      }) &&
      // Make sure this is a deposit message.
      msg.stargate.typeUrl === MsgDeposit.typeUrl
      ? {
          match: true,
          data: {
            chainId,
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
