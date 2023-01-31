import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook'

import { Breadcrumbs } from './Breadcrumbs'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / Breadcrumbs',
  component: Breadcrumbs,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof Breadcrumbs>

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
)

export const Default = Template.bind({})
Default.args = {
  current: 'Dog Dao',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A28662',
  },
}
