import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useActions } from '@dao-dao/actions'
import { ContractVersion } from '@dao-dao/tstypes'

import { ActionSelector } from './ActionSelector'

export default {
  title: 'DAO DAO / packages / ui / components / actions / ActionSelector',
  component: ActionSelector,
} as ComponentMeta<typeof ActionSelector>

const Template: ComponentStory<typeof ActionSelector> = (args) => {
  const actions = useActions(ContractVersion.V0_2_0)

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
