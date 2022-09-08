import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeAppLayoutDecorator,
  makeCreateDaoFormDecorator,
} from '@dao-dao/storybook/decorators'

import { DaoCreateSidebarCard } from '../../components/dao'
import { CreateDaoGovernance } from './Governance'

export default {
  title: 'DAO DAO / packages / ui / pages / CreateDao / Governance',
  component: CreateDaoGovernance,
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
} as ComponentMeta<typeof CreateDaoGovernance>

const Template: ComponentStory<typeof CreateDaoGovernance> = (args) => (
  <CreateDaoGovernance {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=779%3A39683',
  },
}
