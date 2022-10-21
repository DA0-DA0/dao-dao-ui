import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SplashEnterAppButton } from './SplashEnterAppButton'

export default {
  title: 'DAO DAO / packages / stateless / components / splash / SplashEnterAppButton',
  component: SplashEnterAppButton,
} as ComponentMeta<typeof SplashEnterAppButton>

const Template: ComponentStory<typeof SplashEnterAppButton> = (args) => (
  <SplashEnterAppButton {...args} />
)

export const Default = Template.bind({})
Default.args = {}
