import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { SuspenseLoader } from '@dao-dao/stateful'
import { useCoreActions } from '@dao-dao/stateful/actions'
import {
  WalletProviderDecorator,
  makeActionsProviderDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import {
  ActionContextType,
  ActionsWithData,
  CoreActionKey,
  MeTransactionForm,
} from '@dao-dao/types'

import { ProfileHomeCard, ProfileHomeCardProps } from '../components'
import { Default as ProfileHomeCardStory } from '../components/profile/ProfileHomeCard.stories'
import { Me } from './Me'

export default {
  title: 'DAO DAO / packages / stateless / pages / Me',
  component: Me,
  decorators: [
    WalletProviderDecorator,
    makeDappLayoutDecorator(),
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionContextType.Wallet,
      },
    }),
  ],
} as ComponentMeta<typeof Me>

const Template: ComponentStory<typeof Me> = (args) => {
  const actions = useCoreActions()
  // Call relevant action hooks in the same order every time.
  const actionsWithData: ActionsWithData = actions.reduce(
    (acc, action) => ({
      ...acc,
      [action.key]: {
        action,
        transform: action.useTransformToCosmos(),
        defaults: action.useDefaults(),
      },
    }),
    {}
  )

  const formMethods = useForm<MeTransactionForm>({
    mode: 'onChange',
    defaultValues: {
      actions: [],
    },
  })

  return (
    <Me
      {...args}
      actions={actions}
      actionsWithData={actionsWithData}
      formMethods={formMethods}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  connected: true,
  execute: async (data) => {
    console.log('execute!', data)
    alert('executed')
  },
  loading: false,
  rightSidebarContent: (
    <ProfileHomeCard {...(ProfileHomeCardStory.args as ProfileHomeCardProps)} />
  ),
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
            key: CoreActionKey.Spend,
            data: {},
          },
        ],
      },
    ],
  },
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
