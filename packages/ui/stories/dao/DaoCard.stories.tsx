import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoCard } from 'components/dao/DaoCard'

export default {
  title: 'DAO DAO UI V2 / dao / DaoCard',
  component: DaoCard,
} as ComponentMeta<typeof DaoCard>

const Template: ComponentStory<typeof DaoCard> = (args) => <DaoCard {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'Modern DAO',
  description:
    'This approach allows us to implement a completely custom component design without writing a single line of custom CSS.',
  imageUrl: '/placeholders/1.svg',
  href: '/',
  established: new Date('May 14, 2022 00:00:00'),

  pinned: false,
  onPin: () => null,

  subDaoInfo: {
    parentDaoImageUrl: '/placeholders/2.svg',
    parentDaoHref: '/home',
  },

  junoBalance: 120,
  proposalCount: 25,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=77%3A9575',
  },
}
