import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeAppLayoutDecorator } from '@dao-dao/storybook/decorators/makeAppLayoutDecorator'
import { makeCreateDaoFormDecorator } from '@dao-dao/storybook/decorators/makeCreateDaoFormDecorator'

import { DaoCreateSidebarCard } from '../../components/dao/create/DaoCreateSidebarCard'
import { CreateDaoVoting } from './Voting'

export default {
  title: 'DAO DAO / packages / ui / pages / CreateDao / Voting',
  component: CreateDaoVoting,
  decorators: [
    // Direct ancestor of rendered story.
    makeCreateDaoFormDecorator({
      name: 'Evil Cow DAO',
      description: "There are evil cows all over the place. Let's milk 'em!",
      imageUrl: '/dog_nft.png',
    }),
    makeAppLayoutDecorator({
      rightSidebarProps: {
        children: <DaoCreateSidebarCard step={1} />,
      },
    }),
  ],
} as ComponentMeta<typeof CreateDaoVoting>

const Template: ComponentStory<typeof CreateDaoVoting> = (args) => (
  <CreateDaoVoting {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=782%3A45636',
  },
}
