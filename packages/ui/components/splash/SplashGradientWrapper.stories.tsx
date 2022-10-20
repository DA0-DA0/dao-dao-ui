import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SplashGradientWrapper } from './SplashGradientWrapper'

export default {
  title:
    'DAO DAO / packages / ui / components / splash / SplashGradientWrapper',
  component: SplashGradientWrapper,
} as ComponentMeta<typeof SplashGradientWrapper>

const Template: ComponentStory<typeof SplashGradientWrapper> = (args) => (
  <SplashGradientWrapper {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'Some content',
}
