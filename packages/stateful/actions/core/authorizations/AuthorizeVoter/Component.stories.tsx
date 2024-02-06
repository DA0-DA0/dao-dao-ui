import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { CHAIN_ID } from '@dao-dao/storybook'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'

import { AuthorizeVoterComponent, AuthorizeVoterData } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / authorizations / AuthorizeVoter',
  component: AuthorizeVoterComponent,
  decorators: [
    makeReactHookFormDecorator<AuthorizeVoterData>({
      chainId: CHAIN_ID,
      voter: '',
      v1: undefined,
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof AuthorizeVoterComponent>

const Template: ComponentStory<typeof AuthorizeVoterComponent> = (args) => (
  <AuthorizeVoterComponent {...args} />
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
