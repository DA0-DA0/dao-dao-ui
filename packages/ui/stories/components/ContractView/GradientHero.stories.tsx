import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GradientHero } from 'components/GradientHero'

export default {
  title: 'DAO DAO UI V2 / components / GradientHero',
  component: GradientHero,
} as ComponentMeta<typeof GradientHero>

const Template: ComponentStory<typeof GradientHero> = (args) => (
  <GradientHero {...args} />
)

export const Default = Template.bind({})
Default.args = {
  // eslint-disable-next-line i18next/no-literal-string
  children: <p className="p-60 text-center">A lot of content.</p>,
}
