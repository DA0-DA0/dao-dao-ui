import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoCard, DaoCardProps } from 'components/dao/DaoCard'

export default {
  title: 'DAO DAO UI V2 / components / dao / DaoCard',
  component: DaoCard,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof DaoCard>

const Template: ComponentStory<typeof DaoCard> = (args) => (
  <div className="max-w-xs">
    <DaoCard {...args} />
  </div>
)

export const makeProps = (): DaoCardProps => ({
  coreAddress: 'daoCoreAddress',
  name: 'Modern DAO',
  description:
    'This approach allows us to implement a completely custom component design without writing a single line of custom CSS.',
  imageUrl: '/placeholders/1.svg',
  href: '/',
  established: new Date('May 14, 2022 00:00:00'),

  pinned: false,
  onPin: () => {},

  parentDao: {
    href: '#',
    imageUrl: '/placeholders/2.svg',
  },

  tokenBalance: 120,
  tokenSymbol: 'JUNO',
  proposalCount: 25,

  isMember: true,
})

export const Default = Template.bind({})
Default.args = makeProps()

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=77%3A9575',
  },
}
