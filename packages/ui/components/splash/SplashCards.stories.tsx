import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SplashCards } from './SplashCards'

export default {
  title: 'DAO DAO / packages / ui / components / splash / SplashCards',
  component: SplashCards,
} as ComponentMeta<typeof SplashCards>

const Template: ComponentStory<typeof SplashCards> = (_args) => <SplashCards />

export const Default = Template.bind({})
Default.args = {}
