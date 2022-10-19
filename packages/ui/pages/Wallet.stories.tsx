import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { useWalletActions } from '@dao-dao/actions'
import {
  WalletProviderDecorator,
  makeAppLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import {
  Action,
  ActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes'

import { ProfileHomeCard, ProfileHomeCardProps } from '../components'
import { Default as ProfileHomeCardStory } from '../components/profile/ProfileHomeCard.stories'
import { Wallet, WalletForm } from './Wallet'

export default {
  title: 'DAO DAO / packages / ui / pages / Wallet',
  component: Wallet,
  decorators: [WalletProviderDecorator, makeAppLayoutDecorator()],
} as ComponentMeta<typeof Wallet>

const Template: ComponentStory<typeof Wallet> = (args) => {
  const walletActions = useWalletActions()
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
  > = walletActions.reduce(
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

  const formMethods = useForm<WalletForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      actionData: [],
    },
  })

  return (
    <Wallet
      {...args}
      actions={walletActions}
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
}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
