import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useDaoInfoContext } from '@dao-dao/stateless'
import {
  DaoPageWrapperDecorator,
  WalletProviderDecorator,
} from '@dao-dao/storybook/decorators'
import {
  Action,
  ActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'

import { useCoreActions } from '../../../../../actions'
import { useVotingModuleAdapter } from '../../../../../voting-module-adapter'
import { matchAdapter as matchProposalModuleAdapter } from '../../../../core'
import { CwdProposalSingleAdapter } from '../../index'
import { NewProposalForm } from '../../types'
import { makeUseActions as makeUseProposalModuleActions } from '../hooks'
import { NewProposal } from './NewProposal'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / CwdProposalSingle / common / ui / NewProposal',
  component: NewProposal,
  decorators: [DaoPageWrapperDecorator, WalletProviderDecorator],
} as ComponentMeta<typeof NewProposal>

const Template: ComponentStory<typeof NewProposal> = (args) => {
  const { chainId, coreAddress, proposalModules } = useDaoInfoContext()

  const singleChoiceProposalModule = proposalModules.find(
    ({ contractName }) =>
      matchProposalModuleAdapter(contractName)?.id ===
      CwdProposalSingleAdapter.id
  )!

  const {
    hooks: { useActions: useVotingModuleActions },
  } = useVotingModuleAdapter()
  const votingModuleActions = useVotingModuleActions()
  const proposalModuleActions = makeUseProposalModuleActions({
    chainId,
    proposalModule: singleChoiceProposalModule,
    coreAddress,
  })()
  const actions = useCoreActions(
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
        transform: (data: unknown) => {
          console.log('transform', action, data)
          return {
            placeholder: action.key,
          }
        },
        defaults: {},
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

  return (
    <FormProvider {...formMethods}>
      <NewProposal
        {...args}
        actions={actions}
        actionsWithData={actionsWithData}
      />
    </FormProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  createProposal: async (data) => {
    console.log(data)
    alert('submit')
  },
  loading: false,
  isPaused: false,
  isMember: true,
  depositUnsatisfied: false,
  connected: true,
  drafts: [],
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=985%3A46068',
  },
}
