/* eslint-disable i18next/no-literal-string */
import { PlusSmIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BalanceCard } from 'components/ContractView/BalanceCard'

import { Default as BalanceIcon } from './BalanceIcon.stories'

export default {
  title: 'DAO DAO UI / ContractView / BalanceCard',
  component: BalanceCard,
} as ComponentMeta<typeof BalanceCard>

const Template: ComponentStory<typeof BalanceCard> = (args) => (
  <BalanceCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  buttonLabel: 'Stake tokens',
  icon: <PlusSmIcon className="w-4 h-4" />,
  loading: false,
  opaque: true,
  title: 'Stake some tokens',
  children: (
    <>
      <div className="flex flex-row gap-2 items-center mb-2">
        <BalanceIcon {...BalanceIcon.args} />

        <p className="font-bold">
          123,456,789 $TOKEN
          <span className="ml-1 secondary-text">unstaked</span>
        </p>
      </div>

      <p className="secondary-text">Stake to join and vote.</p>
    </>
  ),
}
