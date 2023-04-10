import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'

import { FeeShareComponent, FeeShareData, FeeShareType } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / smart_contracting / FeeShare',
  component: FeeShareComponent,
  decorators: [
    makeReactHookFormDecorator<FeeShareData>({
      contract: '',
      showWithdrawer: false,
      typeUrl: FeeShareType.Register,
      withdrawer: '',
    }),
  ],
} as ComponentMeta<typeof FeeShareComponent>

const Template: ComponentStory<typeof FeeShareComponent> = (args) => (
  <FeeShareComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
}
