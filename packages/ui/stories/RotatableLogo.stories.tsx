import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RotatableLogo } from 'components/RotatableLogo'

export default {
  title: 'DAO DAO UI / RotatableLogo',
  component: RotatableLogo,
} as ComponentMeta<typeof RotatableLogo>

const Template: ComponentStory<typeof RotatableLogo> = (args) => <RotatableLogo {...args} />

export const Default = Template.bind({})
Default.args = {
  "initialRotation": null // TODO: Fill in default value.
}
