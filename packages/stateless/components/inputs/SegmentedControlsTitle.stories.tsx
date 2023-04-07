import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'

import { SegmentedControlsTitle } from './SegmentedControlsTitle'

export default {
  title:
    'DAO DAO / packages / stateless / components / inputs / SegmentedControlsTitle',
  component: SegmentedControlsTitle,
  decorators: [
    makeReactHookFormDecorator({
      adding: true,
    }),
  ],
} as ComponentMeta<typeof SegmentedControlsTitle>

const Template: ComponentStory<typeof SegmentedControlsTitle> = (args) => (
  <SegmentedControlsTitle {...args} />
)

export const Editable = Template.bind({})
Editable.args = {
  editable: true,
  fieldName: 'adding',
  tabs: [
    {
      label: 'Add CW20 to treasury',
      value: true,
    },
    {
      label: 'Remove CW20 from treasury',
      value: false,
    },
  ],
}

export const NotEditable = Template.bind({})
NotEditable.args = {
  ...Editable.args,
  editable: false,
}
