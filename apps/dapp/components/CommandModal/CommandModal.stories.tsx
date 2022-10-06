// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SubQueryDecorator } from '@dao-dao/storybook/decorators'

import { CommandModal } from './CommandModal'

// TODO: Move component and story to UI package.

export default {
  title: 'DAO DAO / apps / dapp / components / CommandModal',
  component: CommandModal,
  decorators: [SubQueryDecorator],
} as ComponentMeta<typeof CommandModal>

const Template: ComponentStory<typeof CommandModal> = (args) => (
  <CommandModal {...args} />
)

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=774%3A55489',
  },
}
