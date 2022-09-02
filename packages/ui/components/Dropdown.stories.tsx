import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Dropdown } from './Dropdown'

export default {
  title: 'DAO DAO / packages / ui / components / Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

const TemplateSingle: ComponentStory<typeof Dropdown<number>> = (args) => {
  const [selected, setSelected] = useState<number>()

  return <Dropdown {...args} onSelect={setSelected} selected={selected} />
}

const TemplateMultiple: ComponentStory<typeof Dropdown<number>> = (args) => {
  const [selected, setSelected] = useState<number[]>([])

  return (
    <Dropdown
      {...args}
      // Toggle.
      onSelect={(value) =>
        setSelected((current) =>
          current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value]
        )
      }
      selected={selected}
    />
  )
}

export const Default = TemplateSingle.bind({})
Default.args = {
  placeholder: 'Select something',
  options: [
    {
      label: 'An option',
      value: 0,
    },
    {
      label: 'Another option',
      value: 1,
    },
    {
      label: 'A third option',
      value: 2,
    },
    {
      label: '?????',
      value: 3,
    },
  ],
}

export const DefaultMany = TemplateSingle.bind({})
DefaultMany.args = {
  placeholder: 'Select something',
  options: [
    {
      label: 'An option',
      value: 0,
    },
    {
      label: 'Another option',
      value: 1,
    },
    {
      label: 'A third option',
      value: 2,
    },
    {
      label: '!!!',
      value: 3,
    },
    {
      label: 'Are',
      value: 4,
    },
    {
      label: 'you',
      value: 5,
    },
    {
      label: 'scrolling',
      value: 6,
    },
    {
      label: 'yet?',
      value: 7,
    },
    {
      label: 'Why',
      value: 8,
    },
    {
      label: 'not',
      value: 9,
    },
    {
      label: '???',
      value: 10,
    },
  ],
}

export const Multiple = TemplateMultiple.bind({})
Multiple.args = {
  placeholder: 'Select a few',
  keepOpenOnSelect: true,
  options: [
    {
      label: 'An option',
      value: 0,
    },
    {
      label: 'Another option',
      value: 1,
    },
    {
      label: 'A third option',
      value: 2,
    },
    {
      label: '?????',
      value: 3,
    },
  ],
}
