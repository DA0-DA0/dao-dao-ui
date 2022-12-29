import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { TokenDepositModal } from './TokenDepositModal'

export default {
  title:
    'DAO DAO / packages / stateless / components / modals / TokenDepositModal',
  component: TokenDepositModal,
} as ComponentMeta<typeof TokenDepositModal>

const Template: ComponentStory<typeof TokenDepositModal> = (args) => {
  const [amount, setAmount] = useState(1)

  return <TokenDepositModal {...args} amount={amount} setAmount={setAmount} />
}

export const Default = Template.bind({})
Default.args = {
  visible: true,
  tokenSymbol: 'JUNO',
  tokenDecimals: 6,
  tokenImageUrl: '/juno.png',
  loadingBalance: {
    loading: false,
    data: {
      amount: 12345.6789,
      timestamp: new Date(),
    },
  },
  onDeposit: (amount) => alert(amount),
}
