import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { SegmentedControls } from './SegmentedControls'

export default {
  title: 'DAO DAO / packages / ui / components / SegmentedControls',
  component: SegmentedControls,
} as ComponentMeta<typeof SegmentedControls>

const Template: ComponentStory<typeof SegmentedControls<number>> = (args) => {
  const [selectedIndex, setSelectedIndex] = useState(1)

  return (
    <SegmentedControls
      {...args}
      onSelect={setSelectedIndex}
      selected={selectedIndex}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  tabs: [
    {
      label: 'Proposals',
      value: 0,
    },
    {
      label: 'Treasury & NFTs',
      value: 1,
    },
    {
      label: 'SubDAOs',
      value: 2,
    },
    {
      label: 'Members',
      value: 3,
    },
  ],
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=77%3A9785',
  },
}
