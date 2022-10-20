// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useRef, useState } from 'react'

import { SubQueryDecorator } from '@dao-dao/storybook/decorators'

import { CommandModal } from './CommandModal'
import {
  CommandModalContextView,
  CommandModalContextViewProps,
} from './CommandModalContextView'
import {
  Empty as CommandModalContextViewEmptyStory,
  Default as CommandModalContextViewStory,
} from './CommandModalContextView.CommandModalContextView.stories'
import { Default as CommandModalContextViewLoaderStory } from './CommandModalContextView.CommandModalContextViewLoader.stories'

export default {
  title: 'DAO DAO / packages / ui / components / CommandModal / CommandModal',
  component: CommandModal,
  decorators: [SubQueryDecorator],
} as ComponentMeta<typeof CommandModal>

const Template: ComponentStory<typeof CommandModal> = (args) => {
  const [filter, setFilter] = useState('')
  const searchBarRef = useRef<HTMLInputElement>(null)

  return (
    <CommandModal
      {...args}
      filter={filter}
      searchBarRef={searchBarRef}
      setFilter={setFilter}
    >
      <CommandModalContextView
        {...(CommandModalContextViewStory.args as CommandModalContextViewProps)}
      />
    </CommandModal>
  )
}

export const Default = Template.bind({})
Default.args = {
  visible: true,
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
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=774%3A55489',
  },
}

const EmptyTemplate: ComponentStory<typeof CommandModal> = (args) => {
  const [filter, setFilter] = useState('nothing')
  const searchBarRef = useRef<HTMLInputElement>(null)

  return (
    <CommandModal
      {...args}
      filter={filter}
      searchBarRef={searchBarRef}
      setFilter={setFilter}
    >
      <CommandModalContextView
        {...(CommandModalContextViewEmptyStory.args as CommandModalContextViewProps)}
      />
    </CommandModal>
  )
}

export const Empty = EmptyTemplate.bind({})
Empty.args = Default.args

const LoadingTemplate: ComponentStory<typeof CommandModal> = (args) => {
  const [filter, setFilter] = useState('')
  const searchBarRef = useRef<HTMLInputElement>(null)

  return (
    <CommandModal
      {...args}
      filter={filter}
      searchBarRef={searchBarRef}
      setFilter={setFilter}
    >
      <CommandModalContextViewLoaderStory />
    </CommandModal>
  )
}

export const Loading = LoadingTemplate.bind({})
Loading.args = {
  ...Default.args,
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
}
