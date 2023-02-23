import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  WALLET_PROFILE_DATA,
  WALLET_PROFILE_DATA_LOADING,
} from '@dao-dao/storybook'

import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export default {
  title:
    'DAO DAO / packages / stateless / components / profile / ProfileCardWrapper',
  component: ProfileCardWrapper,
} as ComponentMeta<typeof ProfileCardWrapper>

const Template: ComponentStory<typeof ProfileCardWrapper> = (args) => (
  <div className="max-w-xs">
    <ProfileCardWrapper {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  walletProfileData: WALLET_PROFILE_DATA,
  underHeaderComponent: <MembershipPill daoName="DAO" isMember={false} />,
  children: <p>Content!</p>,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14674',
  },
}

export const DefaultLoading = Template.bind({})
DefaultLoading.args = {
  ...Default.args,
  walletProfileData: WALLET_PROFILE_DATA_LOADING,
}

export const Compact = Template.bind({})
Compact.args = {
  walletProfileData: WALLET_PROFILE_DATA,
  compact: true,
  children: <p>Content!</p>,
}
Compact.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A16345',
  },
}

export const CompactLoading = Template.bind({})
CompactLoading.args = {
  ...Compact.args,
  walletProfileData: WALLET_PROFILE_DATA_LOADING,
}
