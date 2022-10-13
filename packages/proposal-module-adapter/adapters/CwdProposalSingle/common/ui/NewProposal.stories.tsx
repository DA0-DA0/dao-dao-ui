import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useActions } from '@dao-dao/actions'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'
import {
  Action,
  ActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes'
import { Loader, Logo, useDaoInfoContext } from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { CwdProposalSingleAdapter } from '../..'
import { matchAdapter as matchProposalModuleAdapter } from '../../../../core'
import { NewProposalForm } from '../../types'
import { makeUseActions as makeUseProposalModuleActions } from '../hooks'
import { NewProposal } from './NewProposal'

export default {
  title:
    'DAO DAO / packages / proposal-module-adapter / adapters / CwdProposalSingle / common / ui / NewProposal',
  component: NewProposal,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof NewProposal>

const Template: ComponentStory<typeof NewProposal> = (args) => {
  const { coreAddress, coreVersion, proposalModules } = useDaoInfoContext()

  const singleChoiceProposalModule = proposalModules.find(
    ({ contractName }) =>
      matchProposalModuleAdapter(contractName)?.id ===
      CwdProposalSingleAdapter.id
  )!

  const {
    hooks: { useActions: useVotingModuleActions },
  } = useVotingModuleAdapter()
  const votingModuleActions = useVotingModuleActions()
  const proposalModuleActions = makeUseProposalModuleActions(
    singleChoiceProposalModule
  )()
  const actions = useActions(
    coreVersion,
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
        options={{
          proposalModule: singleChoiceProposalModule,
          coreAddress,
          Loader,
          Logo,
        }}
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
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=985%3A46068',
  },
}
