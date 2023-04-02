import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { ProposalModuleSelectorProps } from '@dao-dao/stateless'
import { Default as ProposalModuleSelectorStory } from '@dao-dao/stateless/components/proposal/ProposalModuleSelector.stories'
import {
  DaoPageWrapperDecorator,
  WalletProviderDecorator,
} from '@dao-dao/storybook/decorators'

import { useLoadedActionsAndCategories } from '../../../../../../actions'
import { SuspenseLoader } from '../../../../../../components/SuspenseLoader'
import { NewProposalForm } from '../../../types'
import { NewProposal } from './NewProposal'

export default {
  title:
    'DAO DAO / packages / proposal-module-adapter / adapters / DaoProposalMultiple / common / components / NewProposal',
  component: NewProposal,
  decorators: [DaoPageWrapperDecorator, WalletProviderDecorator],
} as ComponentMeta<typeof NewProposal>

const Template: ComponentStory<typeof NewProposal> = (args) => {
  const { loadedActions, categories } = useLoadedActionsAndCategories()

  const formMethods = useForm<NewProposalForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  })

  return (
    <FormProvider {...formMethods}>
      <NewProposal
        {...args}
        categories={categories}
        loadedActions={loadedActions}
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
  proposalModuleSelector: (
    <ProposalModuleSelectorStory
      {...(ProposalModuleSelectorStory.args as ProposalModuleSelectorProps)}
    />
  ),
  SuspenseLoader,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=985%3A46068',
  },
}
