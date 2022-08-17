import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FormSwitchCard } from 'components/input/Switch'

export default {
  title: 'DAO DAO UI / input / FormSwitchCard',
  component: FormSwitchCard,
} as ComponentMeta<typeof FormSwitchCard>

const Template: ComponentStory<typeof FormSwitchCard> = (args) => (
  <FormSwitchCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldName: null, // TODO: Fill in default value.
  watch: null, // TODO: Fill in default value.
  setValue: null, // TODO: Fill in default value.
}
