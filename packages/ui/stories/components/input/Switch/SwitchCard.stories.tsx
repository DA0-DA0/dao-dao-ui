import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SwitchCard } from 'components/input/Switch'

export default {
  title: 'DAO DAO UI / components / input / SwitchCard',
  component: SwitchCard,
} as ComponentMeta<typeof SwitchCard>

const Template: ComponentStory<typeof SwitchCard> = (args) => (
  <SwitchCard {...args} />
)

export const On = Template.bind({})
On.args = {
  enabled: true,
  onLabel: undefined,
  offLabel: undefined,
}

export const Off = Template.bind({})
Off.args = {
  enabled: false,
  onLabel: undefined,
  offLabel: undefined,
}
