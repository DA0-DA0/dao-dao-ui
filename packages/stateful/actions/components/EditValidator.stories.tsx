import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { EditValidatorComponent } from './EditValidator'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / EditValidator',
  component: EditValidatorComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof EditValidatorComponent>

const Template: ComponentStory<typeof EditValidatorComponent> = (args) => (
  <EditValidatorComponent {...args} />
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
