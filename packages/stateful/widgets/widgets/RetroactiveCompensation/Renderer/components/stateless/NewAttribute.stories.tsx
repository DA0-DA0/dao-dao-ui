import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'
import { TokenType } from '@dao-dao/types'
import { NATIVE_TOKEN, getFallbackImage } from '@dao-dao/utils'

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
    NATIVE_TOKEN,
    {
      type: TokenType.Native,
      denomOrAddress: 'uatom',
      decimals: 6,
      symbol: 'ATOM',
      imageUrl:
        'https://raw.githubusercontent.com/CosmosContracts/junoswap-asset-list/main/images/atom.png',
    },
    {
      type: TokenType.Cw20,
      denomOrAddress: 'junoCw20DaoAddress',
      decimals: 6,
      symbol: 'DAO',
      imageUrl: '/daodao.png',
    },
    {
      type: TokenType.Cw20,
      denomOrAddress: 'junoAnotherCw20',
      decimals: 6,
      symbol: 'SOME-CW20',
      imageUrl: getFallbackImage(),
    },
  ],
})

export const Default = Template.bind({})
Default.args = {
  index: 0,
  onRemove: () => alert('remove'),
  ...makeTokenProps(),
}
