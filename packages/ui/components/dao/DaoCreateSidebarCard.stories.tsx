import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoCreateSidebarCard } from './DaoCreateSidebarCard'

export default {
  title: 'DAO DAO / packages / ui / components / dao / DaoCreateSidebarCard',
  component: DaoCreateSidebarCard,
} as ComponentMeta<typeof DaoCreateSidebarCard>

const Template: ComponentStory<typeof DaoCreateSidebarCard> = (args) => (
  <div className="max-w-xs">
    <DaoCreateSidebarCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  step: 3,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=782%3A45694',
  },
}
