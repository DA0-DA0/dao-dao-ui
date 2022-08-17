import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Switch } from 'components/input/Switch'

export default {
  title: 'DAO DAO UI / input / Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const Default = Template.bind({})
Default.args = {
  "enabled": null // TODO: Fill in default value.
}
