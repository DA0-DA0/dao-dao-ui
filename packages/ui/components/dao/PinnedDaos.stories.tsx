import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

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
      isDaoPinned={(coreAddress) => pinned.includes(coreAddress)}
      onPin={(coreAddress) =>
        setPinned((current) =>
          current.includes(coreAddress)
            ? current.filter((a) => a !== coreAddress)
            : [...current, coreAddress]
        )
      }
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  pinnedDaos: { loading: false, data: FeaturedDaosStory.args!.featuredDaos! },
}
