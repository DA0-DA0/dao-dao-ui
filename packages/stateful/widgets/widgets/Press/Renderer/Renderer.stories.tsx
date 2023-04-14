import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ButtonLink } from '@dao-dao/stateless'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook'

import { Renderer } from './Renderer'

export default {
  title: 'DAO DAO / packages / stateful / widgets / widgets / Press / Renderer',
  component: Renderer,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof Renderer>

const Template: ComponentStory<typeof Renderer> = (args) => (
  <Renderer {...args} />
)

export const Default = Template.bind({})
Default.args = {
  postsLoading: {
    loading: false,
    data: [],
  },
  isMember: true,
  ButtonLink,
}
