import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Switch } from './Switch'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const On = Template.bind({})
On.args = {
  enabled: true,
}

export const Off = Template.bind({})
Off.args = {
  enabled: false,
}
