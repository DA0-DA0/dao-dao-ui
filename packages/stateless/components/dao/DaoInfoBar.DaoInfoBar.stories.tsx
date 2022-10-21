import {
  AccountBalanceOutlined,
  CurrencyExchangeOutlined,
  LayersOutlined,
  Link,
  PaymentsOutlined,
} from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { DaoInfoBar } from './DaoInfoBar'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoInfoBar',
  component: DaoInfoBar,
} as ComponentMeta<typeof DaoInfoBar>

const Template: ComponentStory<typeof DaoInfoBar> = (args) => (
  <DaoInfoBar {...args} className="max-w-2xl" />
)

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      Icon: Link,
      label: 'DAO address',
      value: (
        <CopyToClipboardUnderline
          // Inherit color and font size from parent.
          className="text-[1em] text-inherit"
          takeStartEnd={{
            start: 6,
            end: 4,
          }}
          value="juno4s92kcs51b1hno0jjth4z"
        />
      ),
    },
    {
      Icon: AccountBalanceOutlined,
      label: 'DAO Treasury',
      value: '35.12 $USDC',
    },
    {
      Icon: PaymentsOutlined,
      label: 'Total supply',
      value: '497 $DOG',
    },
    {
      Icon: LayersOutlined,
      label: 'Total staked',
      value: '8.249%',
    },
    {
      Icon: CurrencyExchangeOutlined,
      label: 'Staking APR',
      value: '103.23%',
    },
  ],
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A28670',
  },
}
