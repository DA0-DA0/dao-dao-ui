import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { DaoCard } from './DaoCard'
import { Default as FeaturedDaosStory } from './FeaturedDaos.stories'
import { PinnedDaos } from './PinnedDaos'

export default {
  title: 'DAO DAO / packages / ui / components / dao / PinnedDaos',
  component: PinnedDaos,
} as ComponentMeta<typeof PinnedDaos>

const Template: ComponentStory<typeof PinnedDaos> = (args) => {
  const [pinned, setPinned] = useState<string[]>([])

  return (
    <PinnedDaos
      {...args}
      DaoCard={(props) => (
        <DaoCard
          {...props}
          onPin={() =>
            setPinned((current) =>
              current.includes(props.coreAddress)
                ? current.filter((a) => a !== props.coreAddress)
                : [...current, props.coreAddress]
            )
          }
          pinned={pinned.includes(props.coreAddress)}
        />
      )}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  pinnedDaos: { loading: false, data: FeaturedDaosStory.args!.featuredDaos! },
}
