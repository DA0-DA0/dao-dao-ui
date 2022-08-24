/* eslint-disable i18next/no-literal-string */
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileCardWrapper } from 'components/profile/ProfileCardWrapper'

export default {
  title: 'DAO DAO UI V2 / profile / ProfileCardWrapper',
  component: ProfileCardWrapper,
} as ComponentMeta<typeof ProfileCardWrapper>

const Template: ComponentStory<typeof ProfileCardWrapper> = (args) => (
  <div className="max-w-xs">
    <ProfileCardWrapper {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  imgUrl: '/dog_nft.png',
  walletName: '@wallet_name',
  established: new Date(),
  isMember: true,
  daoName: 'DAO',
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
  imgUrl: '/dog_nft.png',
  walletName: '@wallet_name',
  established: new Date(),
  isMember: true,
  daoName: 'DAO',
  variant: 'compact',
  children: <p>Content!</p>,
}
Compact.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A16345',
  },
}
