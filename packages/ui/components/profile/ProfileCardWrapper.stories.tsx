import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export default {
  title: 'DAO DAO / packages / ui / components / profile / ProfileCardWrapper',
  component: ProfileCardWrapper,
} as ComponentMeta<typeof ProfileCardWrapper>

const Template: ComponentStory<typeof ProfileCardWrapper> = (args) => (
  <div className="max-w-xs">
    <ProfileCardWrapper {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  walletProfile: {
    loading: false,
    data: {
      nonce: 0,
      imageUrl: '/noah.jpg',
      name: 'wallet_name',
      nft: null,
    },
  },
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
  walletProfile: {
    loading: true,
  },
}

export const Compact = Template.bind({})
Compact.args = {
  walletProfile: {
    loading: false,
    data: {
      nonce: 0,
      imageUrl:
        'https://ipfs.stargaze.zone/ipfs/bafybeibnuzc52kmcu4c5pxxwkr3vyp34gsrdomlvw3e66w4ltidr2v4oxi',
      name: 'wallet_name',
      nft: null,
    },
  },
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
  walletProfile: {
    loading: true,
  },
}
