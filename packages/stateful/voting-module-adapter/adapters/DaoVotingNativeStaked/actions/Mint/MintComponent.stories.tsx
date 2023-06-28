import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'

import { MintData } from '.'
import { MintComponent } from './MintComponent'

export default {
  title:
    'DAO DAO / packages / stateful / voting-module-adapter / adapters / DaoVotingNativeStaked / actions / Mint',
  component: MintComponent,
  decorators: [
    makeReactHookFormDecorator<MintData>({
      amount: 100000,
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
      type: TokenType.Native,
      denomOrAddress: 'factory/wallet/subdenom',
      symbol: 'DENOM',
      decimals: 6,
      imageUrl: '',
    },
  },
}
