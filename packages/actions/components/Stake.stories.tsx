import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Loader, Logo } from '@dao-dao/stateless'
import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'
import { NATIVE_DENOM } from '@dao-dao/utils'

import { StakeComponent } from './Stake'

export default {
  title: 'DAO DAO / packages / actions / components / Stake',
  component: StakeComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof StakeComponent>

const Template: ComponentStory<typeof StakeComponent> = (args) => (
  <StakeComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  Loader,
  Logo,
  isCreating: true,
  options: {
    nativeBalances: [
      {
        denom: NATIVE_DENOM,
        amount: '1234567890',
      },
    ],
    nativeDelegatedBalance: {
      denom: NATIVE_DENOM,
      amount: '0',
    },
  },
}
