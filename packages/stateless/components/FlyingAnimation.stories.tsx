import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FlyingAnimation } from './FlyingAnimation'

export default {
  title: 'DAO DAO / packages / stateless / components / FlyingAnimation',
  component: FlyingAnimation,
} as ComponentMeta<typeof FlyingAnimation>

const Template: ComponentStory<typeof FlyingAnimation> = (args) => (
  <FlyingAnimation {...args} />
)

export const Default = Template.bind({})
Default.args = {
  className: 'w-120 h-40',
}
