import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { SuspenseLoader, WalletChainSwitcher } from '@dao-dao/stateful'
import { useLoadedActionsAndCategories } from '@dao-dao/stateful/actions'
import {
  WalletActionsProviderDecorator,
  WalletProviderDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import { AccountTxForm, ActionKey } from '@dao-dao/types'

import { ProfileActions } from './ProfileActions'

export default {
  title: 'DAO DAO / packages / stateless / pages / ProfileActions',
  component: ProfileActions,
  decorators: [
    WalletProviderDecorator,
    makeDappLayoutDecorator(),
    WalletActionsProviderDecorator,
  ],
} as ComponentMeta<typeof ProfileActions>

const Template: ComponentStory<typeof ProfileActions> = (args) => {
  const { loadedActions, categories } = useLoadedActionsAndCategories()

  const formMethods = useForm<AccountTxForm>({
    mode: 'onChange',
    defaultValues: {
      actions: [],
    },
  })

  return (
    <ProfileActions
      {...args}
      categories={categories}
      formMethods={formMethods}
      loadedActions={loadedActions}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  execute: async (data) => {
    console.log('execute!', data)
    alert('executed')
  },
  loading: false,
  SuspenseLoader,
  saves: {
    loading: false,
    data: [
      {
        name: 'Deposit $10',
        description:
          'Send $10 USDC to my DAO. This is a very long description. I wish it were shorter.',
        actions: [
          {
            _id: 'spend1',
            actionKey: ActionKey.Spend,
            data: {},
          },
        ],
      },
    ],
  },
  save: async (data) => {
    alert('save ' + JSON.stringify(data, null, 2))
    return true
  },
  deleteSave: async (data) => {
    alert('delete ' + JSON.stringify(data, null, 2))
    return true
  },
  saving: false,
  WalletChainSwitcher,

  // Overwritten in template.
  categories: [],
  loadedActions: {},
  formMethods: {} as any,
}

export const LoadingSaves = Template.bind({})
LoadingSaves.args = {
  ...Default.args,
  saves: {
    loading: true,
  },
}

export const NoSaves = Template.bind({})
NoSaves.args = {
  ...Default.args,
  saves: {
    loading: false,
    data: [],
  },
}
