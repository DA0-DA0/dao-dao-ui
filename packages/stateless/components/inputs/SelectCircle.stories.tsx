import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { SelectCircle } from './SelectCircle'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / SelectCircle',
  component: SelectCircle,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof SelectCircle>

const Template: ComponentStory<typeof SelectCircle> = (args) => {
  const [selected, setSelected] = useState(true)

  return (
    <SelectCircle
      {...args}
      onSelect={() => setSelected((s) => !s)}
      selected={selected}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
