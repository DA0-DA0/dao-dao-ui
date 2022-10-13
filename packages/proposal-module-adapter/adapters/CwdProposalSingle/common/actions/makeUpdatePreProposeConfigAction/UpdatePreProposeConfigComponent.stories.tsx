import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook/decorators'
import { DepositRefundPolicy } from '@dao-dao/tstypes'
import { Loader, Logo } from '@dao-dao/ui'

import { Component as UpdatePreProposeConfigComponent } from './index'
import { UpdatePreProposeConfigData } from './UpdatePreProposeConfigComponent'

export default {
  title:
    'DAO DAO / packages / proposal-module-adapter / adapters / CwdProposalSingle / common / actions / makeUpdatePreProposeConfigAction / UpdatePreProposeConfigComponent',
  component: UpdatePreProposeConfigComponent,
  decorators: [
    makeReactHookFormDecorator({
      data: {
        depositRequired: true,
        depositInfo: {
          amount: Math.pow(10, 6),
          type: 'native',
          cw20Address: '',
          cw20Decimals: 6,
          refundPolicy: DepositRefundPolicy.OnlyPassed,
        },
      } as UpdatePreProposeConfigData,
    }),
  ],
} as ComponentMeta<typeof UpdatePreProposeConfigComponent>

const Template: ComponentStory<typeof UpdatePreProposeConfigComponent> = (
  args
) => <UpdatePreProposeConfigComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  coreAddress: 'coreAddress',
  fieldNamePrefix: 'data.',
  allActionsWithData: [],
  index: 0,
  data: {},
  Loader,
  Logo,
  isCreating: true,
}
