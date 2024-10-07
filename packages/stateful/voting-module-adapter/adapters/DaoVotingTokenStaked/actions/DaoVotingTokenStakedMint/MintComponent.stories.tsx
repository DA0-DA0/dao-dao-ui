import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { CHAIN_ID, makeReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'

import { MintComponent, MintData } from './MintComponent'

export default {
  title:
    'DAO DAO / packages / stateful / voting-module-adapter / adapters / DaoVotingTokenStaked / actions / DaoVotingTokenStakedMint',
  component: MintComponent,
  decorators: [
    makeReactHookFormDecorator<MintData>({
      recipient: 'address',
      amount: '100000',
    }),
  ],
} as ComponentMeta<typeof MintComponent>

const Template: ComponentStory<typeof MintComponent> = (args) => (
  <MintComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  options: {
    govToken: {
      source: {
        chainId: CHAIN_ID,
        type: TokenType.Native,
        denomOrAddress: 'factory/wallet/subdenom',
      },
      chainId: CHAIN_ID,
      type: TokenType.Native,
      denomOrAddress: 'factory/wallet/subdenom',
      symbol: 'DENOM',
      decimals: 6,
      imageUrl: '',
    },
    AddressInput,
  },
}
