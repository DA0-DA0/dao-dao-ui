import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoCard } from '@dao-dao/stateful'
import { ContractVersion, DaoCardInfo } from '@dao-dao/types'
import { CHAIN_ID } from '@dao-dao/utils'

import { HorizontalScroller } from './HorizontalScroller'

export default {
  title: 'DAO DAO / packages / stateless / components / HorizontalScroller',
  component: HorizontalScroller,
} as ComponentMeta<typeof HorizontalScroller>

const Template: ComponentStory<typeof HorizontalScroller<DaoCardInfo>> = (
  args
) => <HorizontalScroller {...args} />

let id = 0
const makeFeaturedDao = (): DaoCardInfo => ({
  chainId: CHAIN_ID,
  coreAddress: 'coreAddress' + ++id,
  name: 'Modern DAO ' + id,
  description:
    'This approach allows us to implement a completely custom component design without writing a single line of custom CSS.',
  imageUrl: `/placeholders/${(id % 5) + 1}.svg`,
  established: new Date('May 14, 2022 00:00:00'),
  tokenSymbol: 'JUNO',
  showingEstimatedUsdValue: false,
  tokenDecimals: 6,

  parentDao: {
    coreAddress: 'parent',
    coreVersion: ContractVersion.V2Alpha,
    name: 'parent',
    imageUrl: `/placeholders/${((id + 1) % 5) + 1}.svg`,
    registeredSubDao: true,
  },

  lazyData: {
    loading: false,
    data: {
      isMember: Math.random() < 0.5,
      tokenBalance: 120,
      proposalCount: 25,
    },
  },
})

export const FeaturedDaos = Template.bind({})
// Clone object to prevent comparison issues in pages with sorting (like
// `HomeConnected`).
FeaturedDaos.args = {
  Component: DaoCard,
  items: {
    loading: false,
    data: [
      makeFeaturedDao(),
      {
        ...makeFeaturedDao(),
        name: 'DAO DAO',
        established: new Date('August 11, 2022 16:20:00'),
      },
      makeFeaturedDao(),
      {
        ...makeFeaturedDao(),
        established: new Date(),
      },
      {
        ...makeFeaturedDao(),
        name: 'A different DAO',
      },
      makeFeaturedDao(),
      makeFeaturedDao(),
      makeFeaturedDao(),
    ],
  },
}

export const Loading = Template.bind({})
Loading.args = {
  Component: DaoCard,
  items: {
    loading: true,
  },
}
