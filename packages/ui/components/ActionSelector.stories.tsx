import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useActions } from '@dao-dao/actions'

import { ActionSelector } from './ActionSelector'

export default {
  title: '(OLD DAO DAO) / components / ActionSelector',
  component: ActionSelector,
} as ComponentMeta<typeof ActionSelector>

const Template: ComponentStory<typeof ActionSelector> = (args) => {
  const actions = useActions()

  return <ActionSelector {...args} actions={actions} />
}

export const Default = Template.bind({})
Default.args = {}
