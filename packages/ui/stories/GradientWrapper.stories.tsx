import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GradientWrapper } from 'components/GradientWrapper'

export default {
  title: 'DAO DAO UI / GradientWrapper',
  component: GradientWrapper,
} as ComponentMeta<typeof GradientWrapper>

const Template: ComponentStory<typeof GradientWrapper> = (args) => (
  <GradientWrapper {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: null, // TODO: Fill in default value.
}
