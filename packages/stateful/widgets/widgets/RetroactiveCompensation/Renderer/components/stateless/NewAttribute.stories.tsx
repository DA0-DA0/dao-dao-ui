import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID, makeReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { getFallbackImage, getNativeTokenForChainId } from '@dao-dao/utils'

import { NewAttribute, NewAttributeProps } from './NewAttribute'

export default {
  title:
    'DAO DAO / packages / stateful / payroll / adapters / Retroactive / components / stateless / NewAttribute',
  component: NewAttribute,
  decorators: [
    makeReactHookFormDecorator({
      attributes: [],
    }),
  ],
  excludeStories: ['makeTokenProps'],
} as ComponentMeta<typeof NewAttribute>

const Template: ComponentStory<typeof NewAttribute> = (args) => (
  <NewAttribute {...args} />
)

export const makeTokenProps = (): Pick<
  NewAttributeProps,
  'availableTokens'
> => ({
  availableTokens: [
    getNativeTokenForChainId(CHAIN_ID),
    {
      chainId: CHAIN_ID,
      type: TokenType.Native,
      denomOrAddress: 'uatom',
      decimals: 6,
      symbol: 'ATOM',
      imageUrl:
        'https://raw.githubusercontent.com/CosmosContracts/junoswap-asset-list/main/images/atom.png',
      source: {
        chainId: CHAIN_ID,
        denomOrAddress: 'uatom',
      },
    },
    {
      chainId: CHAIN_ID,
      type: TokenType.Cw20,
      denomOrAddress: 'junoCw20DaoAddress',
      decimals: 6,
      symbol: 'DAO',
      imageUrl: '/daodao.png',
      source: {
        chainId: CHAIN_ID,
        denomOrAddress: 'junoCw20DaoAddress',
      },
    },
    {
      chainId: CHAIN_ID,
      type: TokenType.Cw20,
      denomOrAddress: 'junoAnotherCw20',
      decimals: 6,
      symbol: 'SOME-CW20',
      imageUrl: getFallbackImage(),
      source: {
        chainId: CHAIN_ID,
        denomOrAddress: 'junoAnotherCw20',
      },
    },
  ],
})

export const Default = Template.bind({})
Default.args = {
  index: 0,
  onRemove: () => alert('remove'),
  ...makeTokenProps(),
}
