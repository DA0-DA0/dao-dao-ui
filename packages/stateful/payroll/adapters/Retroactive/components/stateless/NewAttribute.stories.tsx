import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'

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
  'nativeDenoms' | 'cw20TokenInfos'
> => ({
  nativeDenoms: ['ujuno', 'uatom'],
  cw20TokenInfos: [
    {
      address: 'junoDAO',
      info: {
        name: 'DAO',
        symbol: 'DAO',
        decimals: 6,
        total_supply: '100000000000',
      },
    },
    {
      address: 'junoUSDC',
      info: {
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        total_supply: '100000000000',
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
