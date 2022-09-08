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
  imgUrl: '/edamame.png',
  walletName: '@wallet_name',
  established: new Date(),
  underHeaderComponent: <MembershipPill daoName="DAO" isMember={false} />,
  children: <p>Content!</p>,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14674',
  },
}

export const Compact = Template.bind({})
Compact.args = {
  imgUrl:
    'https://cloudflare-ipfs.com/ipfs/bafybeibnuzc52kmcu4c5pxxwkr3vyp34gsrdomlvw3e66w4ltidr2v4oxi',
  walletName: '@wallet_name',
  compact: true,
  children: <p>Content!</p>,
}
Compact.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A16345',
  },
}
