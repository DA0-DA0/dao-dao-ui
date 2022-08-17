import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GradientHero } from 'components/ContractView/GradientHero'

export default {
  title: 'DAO DAO UI / ContractView / GradientHero',
  component: GradientHero,
} as ComponentMeta<typeof GradientHero>

const Template: ComponentStory<typeof GradientHero> = (args) => (
  <GradientHero {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: null, // TODO: Fill in default value.
}
