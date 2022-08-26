import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GradientWrapper } from 'components/GradientWrapper'

export default {
  title: 'DAO DAO UI / components / GradientWrapper',
  component: GradientWrapper,
} as ComponentMeta<typeof GradientWrapper>

const Template: ComponentStory<typeof GradientWrapper> = (args) => (
  <GradientWrapper {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'Some content',
}
