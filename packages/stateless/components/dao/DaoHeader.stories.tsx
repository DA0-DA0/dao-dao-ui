import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LinkWrapper } from '../LinkWrapper'
import { DaoHeader } from './DaoHeader'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoHeader',
  component: DaoHeader,
} as ComponentMeta<typeof DaoHeader>

const Template: ComponentStory<typeof DaoHeader> = (args) => (
  <DaoHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  coreAddress: 'modern',
  name: 'Modern DAO',
  description:
    'This approach allows us to implement a completely custom component design without writing a single line of custom CSS.',
  imageUrl: '/placeholders/1.svg',
  LinkWrapper,
}
