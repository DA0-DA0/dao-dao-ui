import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import { useActions } from '@dao-dao/actions'
import { CwCoreV0_1_0Selectors, useVotingModule } from '@dao-dao/state'
import {
  Action,
  ActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes'
import { processError } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { BaseNewProposalProps } from '../../../../types'
import { NewProposalData, NewProposalForm } from '../../types'
import { makeUseActions as makeUseProposalModuleActions } from '../hooks'
import {
  NewProposal as StatelessNewProposal,
  NewProposalProps as StatelessNewProposalProps,
} from '../ui/NewProposal'

export type NewProposalProps = BaseNewProposalProps &
  Pick<StatelessNewProposalProps, 'options'>

export const NewProposal = ({ onCreateSuccess, options }: NewProposalProps) => {
  const { connected, address: walletAddress } = useWallet()
  const { isMember = false } = useVotingModule(options.coreAddress, {
    fetchMembership: true,
  })
  const [loading, setLoading] = useState(false)

  // Info about if the DAO is paused.
  const pauseInfo = useRecoilValue(
    CwCoreV0_1_0Selectors.pauseInfoSelector({
      contractAddress: options.coreAddress,
    })
  )
  const isPaused = 'Paused' in pauseInfo

  const {
    hooks: { useActions: useVotingModuleActions },
  } = useVotingModuleAdapter()
  const votingModuleActions = useVotingModuleActions()
  const proposalModuleActions = makeUseProposalModuleActions(
    options.proposalModule
  )()
  const actions = useActions(
    useMemo(
      () => [...votingModuleActions, ...proposalModuleActions],
      [proposalModuleActions, votingModuleActions]
    )
  )

  // Call relevant action hooks in the same order every time.
  const actionsWithData: Partial<
    Record<
      ActionKey,
      {
        action: Action
        transform: ReturnType<UseTransformToCosmos>
        defaults: ReturnType<UseDefaults>
      }
    >
  > = actions.reduce(
    (acc, action) => ({
      ...acc,
      [action.key]: {
        action,
        transform: action.useTransformToCosmos(options.coreAddress),
        defaults: action.useDefaults(options.coreAddress),
      },
    }),
    {}
  )

  const formMethods = useForm<NewProposalForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      actionData: [],
    },
  })

  const depositUnsatisfied = false

  const createProposal = useCallback(
    async (data: NewProposalData) => {
      setLoading(true)
      try {
        // TODO: Fill in.
        console.log(data)

        const proposalId = 'A1'

        onCreateSuccess(proposalId)
      } catch (err) {
        console.error(processError(err))
      } finally {
        setLoading(false)
      }
    },
    [onCreateSuccess]
  )

  return (
    <StatelessNewProposal
      actions={actions}
      actionsWithData={actionsWithData}
      connected={connected}
      createProposal={createProposal}
      depositUnsatisfied={depositUnsatisfied}
      formMethods={formMethods}
      isMember={isMember}
      isPaused={isPaused}
      loading={loading}
      options={options}
    />
  )
}
