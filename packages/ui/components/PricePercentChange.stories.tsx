import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PricePercentChange } from './PricePercentChange'

export default {
  title: 'DAO DAO / packages / ui / components / PricePercentChange',
  component: PricePercentChange,
} as ComponentMeta<typeof PricePercentChange>

const Template: ComponentStory<typeof PricePercentChange> = (args) => (
  <PricePercentChange {...args} />
)

export const Default = Template.bind({})
Default.args = {
  value: 23.45,
}
