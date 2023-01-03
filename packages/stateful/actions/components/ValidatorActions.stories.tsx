import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { ValidatorActionsComponent } from './ValidatorActions'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / ValidatorActions',
  component: ValidatorActionsComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ValidatorActionsComponent>

const Template: ComponentStory<typeof ValidatorActionsComponent> = (args) => (
  <ValidatorActionsComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    formattedJsonDisplayProps: {
      jsonLoadable: {
        state: 'loading',
      } as any,
    },
  },
}
