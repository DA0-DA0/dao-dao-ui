import { ComponentMeta, ComponentStory } from '@storybook/react'

import { formatDate } from '@dao-dao/utils'

import { DaoHeader } from './DaoHeader'

export default {
  title: 'DAO DAO / packages / ui / components / dao / DaoHeader',
  component: DaoHeader,
} as ComponentMeta<typeof DaoHeader>

const Template: ComponentStory<typeof DaoHeader> = (args) => (
  <DaoHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: 'Modern DAO',
  description:
    'This approach allows us to implement a completely custom component design without writing a single line of custom CSS.',
  imageUrl: '/placeholders/1.svg',
  established: formatDate(new Date('May 14, 2022 00:00:00')),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
