import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  DaoPageWrapperDecorator,
  WalletProviderDecorator,
} from '@dao-dao/storybook/decorators'

import { useActions, useLoadActions } from '../../../../../actions'
import { NewProposalForm } from '../../types'
import { NewProposal } from './NewProposal'

export default {
  title:
    'DAO DAO / packages / proposal-module-adapter / adapters / DaoProposalMultiple / common / ui / NewProposal',
  component: NewProposal,
  decorators: [DaoPageWrapperDecorator, WalletProviderDecorator],
} as ComponentMeta<typeof NewProposal>

const Template: ComponentStory<typeof NewProposal> = (args) => {
  const actions = useActions()
  const loadedActions = useLoadActions(actions)

  const formMethods = useForm<NewProposalForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
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
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=985%3A46068',
  },
}
