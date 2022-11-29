import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { AuthzExecComponent } from './AuthzExec'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / AuthzExec',
  component: AuthzExecComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof AuthzExecComponent>

const Template: ComponentStory<typeof AuthzExecComponent> = (args) => (
  <AuthzExecComponent {...args} />
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
