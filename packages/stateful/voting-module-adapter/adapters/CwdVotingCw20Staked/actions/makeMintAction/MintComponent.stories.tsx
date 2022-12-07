import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'

import { MintData } from '.'
import { ProfileDisplay } from '../../../../../components'
import { MintComponent } from './MintComponent'

export default {
  title:
    'DAO DAO / packages / stateful / voting-module-adapter / adapters / CwdVotingCw20Staked / actions / makeMintAction / MintComponent',
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
    govTokenSymbol: 'GOV',
    ProfileDisplay: ProfileDisplay,
  },
}
