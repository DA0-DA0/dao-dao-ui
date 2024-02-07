import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { DaoInfoCards } from './DaoInfoCards'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoInfoCards',
  component: DaoInfoCards,
} as ComponentMeta<typeof DaoInfoCards>

const Template: ComponentStory<typeof DaoInfoCards> = (args) => (
  <div className="max-w-2xl">
    <DaoInfoCards {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  cards: [
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
