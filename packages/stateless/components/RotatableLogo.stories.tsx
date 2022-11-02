import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RotatableLogo } from './RotatableLogo'

export default {
  title: '(OLD DAO DAO) / components / RotatableLogo',
  component: RotatableLogo,
} as ComponentMeta<typeof RotatableLogo>

const Template: ComponentStory<typeof RotatableLogo> = (args) => (
  <RotatableLogo {...args} />
)

export const Default = Template.bind({})
Default.args = {
  initialRotation: 45,
}
