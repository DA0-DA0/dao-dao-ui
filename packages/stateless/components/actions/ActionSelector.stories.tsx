import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useCoreActions } from '@dao-dao/stateful/actions'

import { ActionSelector } from './ActionSelector'

export default {
  title:
    'DAO DAO / packages / stateless / components / actions / ActionSelector',
  component: ActionSelector,
} as ComponentMeta<typeof ActionSelector>

const Template: ComponentStory<typeof ActionSelector> = (args) => {
  const actions = useCoreActions()

  return <ActionSelector {...args} actions={actions} />
}

export const Default = Template.bind({})
Default.args = {
  onSelectAction: ({ key }) => alert(key),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=986%3A45783',
  },
}
