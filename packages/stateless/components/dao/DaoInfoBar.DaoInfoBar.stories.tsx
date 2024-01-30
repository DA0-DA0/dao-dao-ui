import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { DaoInfoBar } from './DaoInfoBar'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoInfoBar',
  component: DaoInfoBar,
} as ComponentMeta<typeof DaoInfoBar>

const Template: ComponentStory<typeof DaoInfoBar> = (args) => (
  <div className="max-w-2xl">
    <DaoInfoBar {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      label: 'DAO address',
      value: (
        <CopyToClipboardUnderline
          // Inherit color and font size from parent.
          className="text-[1em] text-inherit"
          takeStartEnd={{
            start: 6,
            end: 4,
          }}
          value="juno4s92kcs51b1hno0jjth4z"
        />
      ),
    },
    {
      label: 'DAO Treasury',
      tooltip:
        'The USD value of treasuries is estimated by summing the value of all tokens held in the treasury that have a known price on Osmosis.',
      value: '35.12 est. USD value',
    },
    {
      label: 'Total supply',
      value: '45.2K $REAL',
    },
    {
      label: 'Total staked',
      value: '0.003234%',
    },
  ],
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A28670',
  },
}
