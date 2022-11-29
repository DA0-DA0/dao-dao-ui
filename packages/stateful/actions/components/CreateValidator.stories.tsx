import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { CreateValidatorComponent } from './CreateValidator'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / CreateValidator',
  component: CreateValidatorComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof CreateValidatorComponent>

const Template: ComponentStory<typeof CreateValidatorComponent> = (args) => (
  <CreateValidatorComponent {...args} />
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
