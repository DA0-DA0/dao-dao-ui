import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { ProposalModuleSelectorProps } from '@dao-dao/stateless'
import { Default as ProposalModuleSelectorStory } from '@dao-dao/stateless/components/proposal/ProposalModuleSelector.stories'
import {
  DaoPageWrapperDecorator,
  WalletProviderDecorator,
} from '@dao-dao/storybook/decorators'
import { LoadedActions } from '@dao-dao/types'

import { useActions } from '../../../../../actions'
import { NewProposalForm } from '../../types'
import { NewProposal } from './NewProposal'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / DaoProposalSingle / common / ui / NewProposal',
  component: NewProposal,
  decorators: [DaoPageWrapperDecorator, WalletProviderDecorator],
} as ComponentMeta<typeof NewProposal>

const Template: ComponentStory<typeof NewProposal> = (args) => {
  const actions = useActions()

  // Call relevant action hooks in the same order every time.
  const loadedActions: LoadedActions = actions.reduce(
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
      <NewProposal {...args} actions={actions} loadedActions={loadedActions} />
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
  proposalModuleSelector: (
    <ProposalModuleSelectorStory
      {...(ProposalModuleSelectorStory.args as ProposalModuleSelectorProps)}
    />
  ),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=985%3A46068',
  },
}
