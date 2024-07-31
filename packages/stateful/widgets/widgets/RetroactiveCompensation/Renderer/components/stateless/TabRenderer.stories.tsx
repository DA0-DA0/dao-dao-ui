import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook'

import { ButtonLink } from '../../../../../../components'
import { TabRenderer } from './TabRenderer'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / RetroactiveCompensation / components / stateless / TabRenderer',
  component: TabRenderer,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof TabRenderer>

const Template: ComponentStory<typeof TabRenderer> = (args) => (
  <TabRenderer {...args} />
)

export const Default = Template.bind({})
Default.args = {
  isMember: true,
  ButtonLink,
}
