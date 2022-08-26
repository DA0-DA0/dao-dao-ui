import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ContractHeader } from 'components/ContractView/ContractHeader'

export default {
  title: 'DAO DAO UI / components / ContractView / ContractHeader',
  component: ContractHeader,
} as ComponentMeta<typeof ContractHeader>

const Template: ComponentStory<typeof ContractHeader> = (args) => (
  <ContractHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: 'Moonphase',
  imgUrl: 'https://moonphase.is/image.svg',
  description: '# What is Moonphase?\nThe moon phase.',
  established: new Date(),
}
