import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { makeReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { CHAIN_ID } from '@dao-dao/utils'

import { MintData } from '.'
import { MintComponent } from './MintComponent'

export default {
  title:
    'DAO DAO / packages / stateful / voting-module-adapter / adapters / DaoVotingCw20Staked / actions / Mint',
  component: MintComponent,
  decorators: [
    makeReactHookFormDecorator<MintData>({
      amount: 100000,
      to: '',
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
      chainId: CHAIN_ID,
      type: TokenType.Cw20,
      denomOrAddress: 'gov',
      symbol: 'GOV',
      decimals: 6,
      imageUrl: '',
    },
    AddressInput,
  },
}
