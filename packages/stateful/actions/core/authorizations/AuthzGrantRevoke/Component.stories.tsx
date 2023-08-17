import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GenericAuthorization } from '@dao-dao/protobuf/codegen/cosmos/authz/v1beta1/authz'
import { MsgDelegate } from '@dao-dao/protobuf/codegen/cosmos/staking/v1beta1/tx'
import {
  AllowAllMessagesFilter,
  MaxCallsLimit,
} from '@dao-dao/protobuf/codegen/cosmwasm/wasm/v1/authz'
import { AddressInput } from '@dao-dao/stateless'
import { CHAIN_ID } from '@dao-dao/storybook'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { TokenType } from '@dao-dao/types'
import { getNativeTokenForChainId } from '@dao-dao/utils'

import { AuthzGrantRevokeComponent } from './Component'
import { AuthzGrantRevokeData } from './types'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / authorizations / AuthzGrantRevoke',
  component: AuthzGrantRevokeComponent,
  decorators: [
    makeReactHookFormDecorator<AuthzGrantRevokeData>({
      mode: 'grant',
      authorizationTypeUrl: GenericAuthorization.typeUrl,
      customTypeUrl: false,
      grantee: 'junoContract',
      msgTypeUrl: MsgDelegate.typeUrl,
      contract: '',
      filterTypeUrl: AllowAllMessagesFilter.typeUrl,
      filterKeys: '',
      filterMsgs: '{}',
      funds: [],
      limitTypeUrl: MaxCallsLimit.typeUrl,
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
          token: getNativeTokenForChainId(CHAIN_ID),
          balance: '1231245124',
        },
        {
          token: {
            chainId: CHAIN_ID,
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
