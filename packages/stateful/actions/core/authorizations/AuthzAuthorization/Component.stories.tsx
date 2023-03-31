import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { AuthzAuthorizationComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / authorizations / AuthzAuthorization',
  component: AuthzAuthorizationComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof AuthzAuthorizationComponent>

const Template: ComponentStory<typeof AuthzAuthorizationComponent> = (args) => (
  <AuthzAuthorizationComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: false,
  options: {
    AddressInput,
  },
}
