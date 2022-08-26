import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MobileHeader } from 'components/ContractView/MobileHeader'

export default {
  title: 'DAO DAO UI / components / ContractView / MobileHeader',
  component: MobileHeader,
} as ComponentMeta<typeof MobileHeader>

const Template: ComponentStory<typeof MobileHeader> = (args) => (
  <MobileHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  contractAddress: 'junoabcdefxyz',
  name: 'Moonphase',
  member: true,
  pinned: true,
  imageUrl: 'https://moonphase.is/image.svg',
}
