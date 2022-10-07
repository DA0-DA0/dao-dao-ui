// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { SubQueryDecorator } from '@dao-dao/storybook/decorators'

import { CommandModal } from './CommandModal'
import {
  CommandModalContextView,
  CommandModalContextViewProps,
} from './CommandModalContextView'
import { Default as CommandModalContextViewStory } from './CommandModalContextView.CommandModalContextView.stories'
import { Default as CommandModalContextViewLoaderStory } from './CommandModalContextView.CommandModalContextViewLoader.stories'

export default {
  title: 'DAO DAO / packages / ui / components / CommandModal / CommandModal',
  component: CommandModal,
  decorators: [SubQueryDecorator],
} as ComponentMeta<typeof CommandModal>

const Template: ComponentStory<typeof CommandModal> = (args) => {
  const [filter, setFilter] = useState('')

  return (
    <CommandModal {...args} filter={filter} setFilter={setFilter}>
      <CommandModalContextView
        {...(CommandModalContextViewStory.args as CommandModalContextViewProps)}
      />
    </CommandModal>
  )
}

export const Default = Template.bind({})
Default.args = {
  contexts: [
    {
      name: 'Root context',
      useSections: () => [],
    },
    {
      name: 'Previous',
      useSections: () => [],
    },
    {
      name: 'A DAO',
      imageUrl: '/placeholders/3.svg',
      useSections: () => [],
    },
  ],
  goBack: () => alert('back'),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=774%3A55489',
  },
}

const LoadingTemplate: ComponentStory<typeof CommandModal> = (args) => {
  const [filter, setFilter] = useState('')

  return (
    <CommandModal {...args} filter={filter} setFilter={setFilter}>
      <CommandModalContextViewLoaderStory />
    </CommandModal>
  )
}

export const Loading = LoadingTemplate.bind({})
Loading.args = {
  contexts: [
    {
      name: 'Root context',
      useSections: () => [],
    },
    {
      name: 'Previous',
      useSections: () => [],
    },
    {
      name: 'A DAO',
      imageUrl: '/placeholders/3.svg',
      useSections: () => [],
    },
  ],
  goBack: () => alert('back'),
}
