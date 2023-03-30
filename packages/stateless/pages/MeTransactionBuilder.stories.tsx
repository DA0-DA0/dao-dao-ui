import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { SuspenseLoader } from '@dao-dao/stateful'
import { useLoadedActionsAndCategories } from '@dao-dao/stateful/actions'
import {
  WalletActionsProviderDecorator,
  WalletProviderDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import { CoreActionKey, MeTransactionForm } from '@dao-dao/types'

import { MeTransactionBuilder } from './MeTransactionBuilder'

export default {
  title: 'DAO DAO / packages / stateless / pages / MeTransactionBuilder',
  component: MeTransactionBuilder,
  decorators: [
    WalletProviderDecorator,
    makeDappLayoutDecorator(),
    WalletActionsProviderDecorator,
  ],
} as ComponentMeta<typeof MeTransactionBuilder>

const Template: ComponentStory<typeof MeTransactionBuilder> = (args) => {
  const { loadedActions, categories } = useLoadedActionsAndCategories()

  const formMethods = useForm<MeTransactionForm>({
    mode: 'onChange',
    defaultValues: {
      actions: [],
    },
  })

  return (
    <MeTransactionBuilder
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
            actionKey: CoreActionKey.Spend,
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
