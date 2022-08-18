import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoCard } from 'components/dao/DaoCard'

export default {
  title: 'DAO DAO UI v2 / dao / DaoCard',
  component: DaoCard,
} as ComponentMeta<typeof DaoCard>

const Template: ComponentStory<typeof DaoCard> = (args) => <DaoCard {...args} />

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=77%3A9575',
  },
}
