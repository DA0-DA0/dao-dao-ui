import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InboxMainItemRenderer } from '@dao-dao/stateful'
import { makeDappLayoutDecorator } from '@dao-dao/storybook/decorators'

import { Inbox } from './Inbox'

export default {
  title: 'DAO DAO / packages / stateless / pages / Inbox',
  component: Inbox,
  decorators: [makeDappLayoutDecorator()],
} as ComponentMeta<typeof Inbox>

const Template: ComponentStory<typeof Inbox> = (args) => <Inbox {...args} />

export const Default = Template.bind({})
Default.args = {
  InboxMainItemRenderer,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=308%3A29063',
  },
  nextRouter: {
    asPath: '/notifications',
  },
}
