import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { HandshakeEmoji } from '../../emoji'
import { DaoStructureCard } from './DaoStructureCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / create / DaoStructureCard',
  component: DaoStructureCard,
} as ComponentMeta<typeof DaoStructureCard>

const Template: ComponentStory<typeof DaoStructureCard> = (args) => {
  const [selected, setSelected] = useState(false)

  return (
    <div className="max-w-xs">
      <DaoStructureCard
        {...args}
        onSelect={() => setSelected((s) => !s)}
        selected={selected}
      />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  Icon: HandshakeEmoji,
  name: 'Spiritual DAO',
  description:
    'Astrally projected organization existing in a liminal space between the reality of human mortality and the nature of non-dual existence. You may find yourself dissolving into the universal energy source shortlty after joining.',
  supplies: 'Soul bonds',
  membership: 'By blood sacrifice',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=782%3A44211',
  },
}
