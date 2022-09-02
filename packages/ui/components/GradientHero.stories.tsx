import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GradientHero } from './GradientHero'

export default {
  title: 'DAO DAO / packages / ui / components / GradientHero',
  component: GradientHero,
} as ComponentMeta<typeof GradientHero>

const Template: ComponentStory<typeof GradientHero> = (args) => (
  <GradientHero {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: <p className="p-60 text-center">A lot of content.</p>,
}
