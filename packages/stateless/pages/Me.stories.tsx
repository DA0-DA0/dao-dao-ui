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
  WalletTransactionForm,
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

  const formMethods = useForm<WalletTransactionForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      actionData: [],
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
}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
