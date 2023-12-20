import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  DaoPageWrapperDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { DepositRefundPolicy } from '@dao-dao/types'

import {
  UpdatePreProposeSingleConfigComponent,
  UpdatePreProposeSingleConfigData,
} from './UpdatePreProposeSingleConfigComponent'

export default {
  title:
    'DAO DAO / packages / stateful / proposal-module-adapter / adapters / DaoProposalSingle / common / actions / UpdatePreProposeSingleConfig',
  component: UpdatePreProposeSingleConfigComponent,
  decorators: [
    makeReactHookFormDecorator<UpdatePreProposeSingleConfigData>({
      depositRequired: true,
      depositInfo: {
        amount: Math.pow(10, 6),
        type: 'native',
        denomOrAddress: '',
        token: undefined,
        refundPolicy: DepositRefundPolicy.OnlyPassed,
      },
      anyoneCanPropose: false,
    }),
    DaoPageWrapperDecorator,
  ],
} as ComponentMeta<typeof UpdatePreProposeSingleConfigComponent>

const Template: ComponentStory<typeof UpdatePreProposeSingleConfigComponent> = (
  args
) => <UpdatePreProposeSingleConfigComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  options: {
    governanceToken: undefined,
    cw20AddressError: undefined,
  },
}
