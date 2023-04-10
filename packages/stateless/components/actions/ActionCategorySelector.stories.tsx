import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useActionCategories } from '@dao-dao/stateful/actions'

import { ActionCategorySelector } from './ActionCategorySelector'

export default {
  title:
    'DAO DAO / packages / stateless / components / actions / ActionCategorySelector',
  component: ActionCategorySelector,
} as ComponentMeta<typeof ActionCategorySelector>

const Template: ComponentStory<typeof ActionCategorySelector> = (args) => {
  const categories = useActionCategories()

  return <ActionCategorySelector {...args} categories={categories} />
}

export const Default = Template.bind({})
Default.args = {
  onSelectCategory: ({ key }) => alert(key),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=986%3A45783',
  },
}
