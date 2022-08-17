import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FormCard } from 'components/FormCard'

export default {
  title: 'DAO DAO UI / FormCard',
  component: FormCard,
} as ComponentMeta<typeof FormCard>

const Template: ComponentStory<typeof FormCard> = (args) => (
  <FormCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: null, // TODO: Fill in default value.
}
