import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SwitchCard } from 'components/input/Switch'

export default {
  title: 'DAO DAO UI / input / SwitchCard',
  component: SwitchCard,
} as ComponentMeta<typeof SwitchCard>

const Template: ComponentStory<typeof SwitchCard> = (args) => <SwitchCard {...args} />

export const Default = Template.bind({})
Default.args = {
  "enabled": null // TODO: Fill in default value.
}
