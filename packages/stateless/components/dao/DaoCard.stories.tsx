import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ContractVersion } from '@dao-dao/types'

import { IconButtonLink } from '../icon_buttons'
import { LinkWrapper } from '../LinkWrapper'
import { DaoCard, DaoCardProps } from './DaoCard'

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

export const makeProps = (): DaoCardProps => ({
  chainId: 'uni-5',
  coreAddress: 'daoCoreAddress',
  name: 'Modern DAO',
  description:
    'This approach allows us to implement a completely custom component design without writing a single line of custom CSS.',
  imageUrl: '/placeholders/1.svg',
  established: new Date('May 14, 2022 00:00:00'),
  tokenDecimals: 6,
  tokenSymbol: '',
  showingEstimatedUsdValue: true,

  pinned: false,
  onPin: () => {},

  parentDao: {
    coreAddress: 'parentDaoCoreAddress',
    coreVersion: ContractVersion.V2Alpha,
    name: 'parent',
    imageUrl: '/placeholders/2.svg',
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
  IconButtonLink,
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
