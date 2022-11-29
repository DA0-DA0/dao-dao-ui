import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { UnjailValidatorComponent } from './UnjailValidator'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / UnjailValidator',
  component: UnjailValidatorComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof UnjailValidatorComponent>

const Template: ComponentStory<typeof UnjailValidatorComponent> = (args) => (
  <UnjailValidatorComponent {...args} />
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
