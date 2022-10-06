// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { SubQueryDecorator } from '@dao-dao/storybook/decorators'
import {
  ActionHitId,
  CommandState,
  CommandStateType,
  Hit,
  HitType,
} from '@dao-dao/tstypes'

import { CommandModal } from './CommandModal'

export default {
  title: 'DAO DAO / packages / ui / components / CommandModal',
  component: CommandModal,
  decorators: [SubQueryDecorator],
} as ComponentMeta<typeof CommandModal>

const Template: ComponentStory<typeof CommandModal> = (args) => {
  const [filter, setFilter] = useState('')
  const [commandState, setCommandState] = useState<CommandState>({
    type: CommandStateType.Home,
  })

  const onChoice = (hit: Hit) => {
    if (hit.hitType === HitType.Daos) {
      setCommandState({
        type: CommandStateType.DaoChosen,
        ...hit,
      })
    }
  }

  return (
    <CommandModal
      {...args}
      baseHits={[
        {
          icon: '➕',
          id: ActionHitId.CreateDao,
          name: 'Create a DAO',
          navigatesOnSelect: true,
          hitType: HitType.AppActions,
        },
        {
          icon: '🗺',
          id: ActionHitId.NavigateDao,
          name: 'Navigate to DAO',
          hitType: HitType.AppActions,
        },
        {
          id: 'coreAddress1',
          name: 'Some DAO',
          imageUrl: '/placeholders/1.svg',
          hitType: HitType.Daos,
          navigatesOnSelect: false,
        },
        {
          id: 'coreAddress2',
          name: 'Another DAO',
          imageUrl: '/placeholders/2.svg',
          hitType: HitType.Daos,
          navigatesOnSelect: false,
        },
        {
          id: 'coreAddress3',
          name: 'Nothing',
          imageUrl: '/placeholders/3.svg',
          hitType: HitType.Daos,
          navigatesOnSelect: false,
        },
        {
          id: 'coreAddress4',
          name: 'Yet another DAO',
          imageUrl: '/placeholders/4.svg',
          hitType: HitType.Daos,
          navigatesOnSelect: false,
        },
        {
          id: 'coreAddress5',
          name: 'Seriously, another DAO',
          imageUrl: '/placeholders/5.svg',
          hitType: HitType.Daos,
          navigatesOnSelect: false,
        },
      ]}
      commandState={commandState}
      filter={filter}
      onChoice={onChoice}
      setCommandState={setCommandState}
      setFilter={setFilter}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  commandState: { type: CommandStateType.Home },
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=774%3A55489',
  },
}
