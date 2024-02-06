import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { CHAIN_ID } from '@dao-dao/storybook'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'

import { DeauthorizeVoterComponent, DeauthorizeVoterData } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / authorizations / DeauthorizeVoter',
  component: DeauthorizeVoterComponent,
  decorators: [
    makeReactHookFormDecorator<DeauthorizeVoterData>({
      chainId: CHAIN_ID,
      voter: '',
      v1: undefined,
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof DeauthorizeVoterComponent>

const Template: ComponentStory<typeof DeauthorizeVoterComponent> = (args) => (
  <DeauthorizeVoterComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
  options: {
    AddressInput,
  },
}
