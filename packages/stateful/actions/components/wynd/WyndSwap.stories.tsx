import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeActionsProviderDecorator,
  makeDaoInfo,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { ActionOptionsContextType, TokenType } from '@dao-dao/types'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  getJunoIbcUsdc,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import { WyndSwapComponent, WyndSwapData } from './WyndSwap'

const usdc = getJunoIbcUsdc()

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / wynd / WyndSwap',
  component: WyndSwapComponent,
  decorators: [
    makeReactHookFormDecorator<WyndSwapData>({
      tokenIn: {
        type: TokenType.Native,
        denomOrAddress: NATIVE_DENOM,
        symbol: nativeTokenLabel(NATIVE_DENOM),
        decimals: NATIVE_DECIMALS,
        imageUrl: nativeTokenLogoURI(NATIVE_DENOM),
      },
      tokenInAmount: 0,
      tokenOut: {
        type: TokenType.Cw20,
        denomOrAddress: usdc.juno_denom,
        symbol: usdc.symbol,
        decimals: usdc.decimals,
        imageUrl: usdc.logoURI,
      },
      tokenOutAmount: 0,
      minOutAmount: 0,
      swapOperations: undefined,
    }),
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionOptionsContextType.Dao,
        info: makeDaoInfo(),
      },
    }),
  ],
} as ComponentMeta<typeof WyndSwapComponent>

const Template: ComponentStory<typeof WyndSwapComponent> = (args) => (
  <WyndSwapComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  options: {
    balances: [],
    wyndTokens: [],
    simulatingValue: undefined,
    estUsdPrice: { loading: true },
  },
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
}
