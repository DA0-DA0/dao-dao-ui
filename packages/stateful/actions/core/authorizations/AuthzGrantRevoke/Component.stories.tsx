import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { TokenType } from '@dao-dao/types'
import { NATIVE_DENOM } from '@dao-dao/utils'

import { AuthzGrantRevokeComponent } from './Component'
import {
  AuthorizationTypeUrl,
  AuthzGrantRevokeData,
  FilterTypes,
  LimitTypes,
} from './types'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / authorizations / AuthzGrantRevoke',
  component: AuthzGrantRevokeComponent,
  decorators: [
    makeReactHookFormDecorator<AuthzGrantRevokeData>({
      mode: 'grant',
      authorizationTypeUrl: AuthorizationTypeUrl.Generic,
      customTypeUrl: false,
      grantee: 'juno1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8lyv94w',
      msgTypeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      contract: '',
      filterType: FilterTypes.All,
      filterKeys: '',
      filterMsgs: '{}',
      funds: [],
      limitType: LimitTypes.Calls,
      calls: 10,
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof AuthzGrantRevokeComponent>

const Template: ComponentStory<typeof AuthzGrantRevokeComponent> = (args) => (
  <AuthzGrantRevokeComponent {...args} />
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
    balances: {
      loading: false,
      data: [
        {
          token: {
            type: TokenType.Native,
            denomOrAddress: NATIVE_DENOM,
            decimals: 6,
            symbol: 'JUNO',
            imageUrl: '',
          },
          balance: '1231245124',
        },
        {
          token: {
            type: TokenType.Native,
            denomOrAddress: 'uatom',
            decimals: 6,
            symbol: 'ATOM',
            imageUrl: '',
          },
          balance: '984129741',
        },
      ],
    },
  },
}
