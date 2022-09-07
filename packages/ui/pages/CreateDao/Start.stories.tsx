import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  CreateDaoFormDecorator,
  makeAppLayoutDecorator,
} from '@dao-dao/storybook/decorators'

import { DaoCreateSidebarCard } from '../../components/dao'
import { CreateDaoStart } from './Start'

export default {
  title: 'DAO DAO / packages / ui / pages / CreateDao / CreateDaoStart',
  component: CreateDaoStart,
  decorators: [
    // Direct ancestor of rendered story.
    CreateDaoFormDecorator,
    makeAppLayoutDecorator({
      rightSidebarProps: {
        children: <DaoCreateSidebarCard step={1} />,
      },
    }),
  ],
} as ComponentMeta<typeof CreateDaoStart>

const Template: ComponentStory<typeof CreateDaoStart> = (args) => (
  <CreateDaoStart {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=782%3A44121',
  },
}
