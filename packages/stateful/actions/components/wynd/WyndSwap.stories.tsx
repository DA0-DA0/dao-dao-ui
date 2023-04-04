import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook/decorators'
import { NATIVE_TOKEN, getJunoIbcUsdc } from '@dao-dao/utils'

import { AddressInput } from '../../../components'
import { WyndSwapComponent, WyndSwapData } from './WyndSwap'

const usdc = getJunoIbcUsdc()

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / wynd / WyndSwap',
  component: WyndSwapComponent,
  decorators: [
    makeReactHookFormDecorator<WyndSwapData>({
      tokenIn: {
        ...NATIVE_TOKEN,
      },
      tokenInAmount: 0,
      tokenOut: {
        ...usdc,
      },
      tokenOutAmount: 0,
      minOutAmount: 0,
      swapOperations: undefined,
      receiver: '',
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
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
    loadingBalances: {
      loading: false,
      data: [],
    },
    loadingWyndTokens: {
      loading: false,
      data: [],
    },
    simulatingValue: undefined,
    estUsdPrice: { loading: true },
    AddressInput,
  },
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
}
