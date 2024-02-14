import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CHAIN_ID } from '@dao-dao/storybook'
import { ContractVersion, DaoCardProps } from '@dao-dao/types'

import { LinkWrapper } from '../LinkWrapper'
import { DaoCard } from './DaoCard'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoCard',
  component: DaoCard,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof DaoCard>

const Template: ComponentStory<typeof DaoCard> = (args) => (
  <div className="max-w-xs">
    <DaoCard {...args} />
  </div>
)

export const makeProps = (id = 1): DaoCardProps => ({
  chainId: CHAIN_ID,
  coreAddress: 'daoCoreAddress',
  name: 'Modern DAO',
  description:
    'This approach allows us to implement a completely custom component design without writing a single line of custom CSS.',
  imageUrl: `/placeholders/${id % 5}.svg`,
  polytoneProxies: {},
  // Random date in the past 12 months.
  established: new Date(
    Date.now() - Math.floor(Math.random() * 12 * 30 * 24 * 60 * 60 * 1000)
  ),
  tokenDecimals: 6,
  tokenSymbol: '',
  showingEstimatedUsdValue: true,

  follow: {
    following: false,
    onFollow: () => alert('follow'),
    updatingFollowing: false,
  },

  parentDao: {
    chainId: CHAIN_ID,
    coreAddress: 'parentDaoCoreAddress',
    coreVersion: ContractVersion.V2Alpha,
    name: 'parent',
    imageUrl: 'https://moonphase.is/image.svg',
    admin: 'parentDaoCoreAddress',
    registeredSubDao: true,
  },

  lazyData: {
    loading: false,
    data: {
      tokenBalance: 120,
      proposalCount: 25,
      isMember: Math.random() < 0.5,
    },
  },

  showIsMember: true,
  LinkWrapper,
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=77%3A9575',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...makeProps(),
  lazyData: { loading: true },
}
Loading.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=77%3A9575',
  },
}
