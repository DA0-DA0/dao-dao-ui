import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GradientWrapper } from './GradientWrapper'

export default {
  title: '(OLD DAO DAO) / components / GradientWrapper',
  component: GradientWrapper,
} as ComponentMeta<typeof GradientWrapper>

const Template: ComponentStory<typeof GradientWrapper> = (args) => (
  <GradientWrapper {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'Some content',
}
