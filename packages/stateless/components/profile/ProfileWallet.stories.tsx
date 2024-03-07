import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileAddChains, WalletTokenLine } from '@dao-dao/stateful'
import { TokenCardProps } from '@dao-dao/types'

import { makeProps as makeTokenCardProps } from '../token/TokenCard.stories'
import { ProfileWallet } from './ProfileWallet'

export default {
  title: 'DAO DAO / packages / stateless / pages / profile / ProfileWallet',
  component: ProfileWallet,
} as ComponentMeta<typeof ProfileWallet<TokenCardProps>>

const Template: ComponentStory<typeof ProfileWallet<TokenCardProps>> = (
  args
) => <ProfileWallet {...args} />

export const Default = Template.bind({})
Default.args = {
  accounts: {
    loading: false,
    errored: false,
    data: [],
  },
  tokens: {
    loading: false,
    errored: false,
    data: [makeTokenCardProps(true), makeTokenCardProps()],
  },
  hiddenTokens: {
    loading: false,
    errored: false,
    data: [],
  },
  TokenLine: WalletTokenLine,
  ProfileAddChains,
}

export const Loading = Template.bind({})
Loading.args = {
  accounts: {
    loading: true,
    errored: false,
  },
  tokens: {
    loading: true,
    errored: false,
  },
  hiddenTokens: {
    loading: true,
    errored: false,
  },
  TokenLine: WalletTokenLine,
  ProfileAddChains,
}
