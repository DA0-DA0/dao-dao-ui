import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { DaoCardInfo } from '@dao-dao/tstypes'

import { FeaturedDaos } from './FeaturedDaos'

export default {
  title: 'DAO DAO / packages / ui / components / dao / FeaturedDaos',
  component: FeaturedDaos,
} as ComponentMeta<typeof FeaturedDaos>

const Template: ComponentStory<typeof FeaturedDaos> = (args) => {
  const [pinned, setPinned] = useState<string[]>([])

  return (
    <FeaturedDaos
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

let id = 0
const makeFeaturedDao = (): DaoCardInfo => ({
  coreAddress: 'coreAddress' + ++id,
  name: 'Modern DAO ' + id,
  description:
    'This approach allows us to implement a completely custom component design without writing a single line of custom CSS.',
  imageUrl: `/placeholders/${(id % 5) + 1}.svg`,
  established: new Date('May 14, 2022 00:00:00'),

  parentDao: {
    coreAddress: 'parent',
    name: 'parent',
    imageUrl: `/placeholders/${((id + 1) % 5) + 1}.svg`,
  },

  lazyData: {
    loading: false,
    data: {
      isMember: Math.random() < 0.5,
      tokenBalance: 120,
      tokenSymbol: 'JUNO',
      proposalCount: 25,
    },
  },
})

export const Default = Template.bind({})
// Clone object to prevent comparison issues in pages with sorting (like
// `HomeConnected`).
Default.args = {
  featuredDaos: {
    loading: false,
    data: [
      makeFeaturedDao(),
      {
        ...makeFeaturedDao(),
        name: 'DAO DAO',
        established: new Date('August 11, 2022 16:20:00'),
      },
      makeFeaturedDao(),
      {
        ...makeFeaturedDao(),
        established: new Date(),
      },
      {
        ...makeFeaturedDao(),
        name: 'A different DAO',
      },
      makeFeaturedDao(),
      makeFeaturedDao(),
      makeFeaturedDao(),
    ],
  },
}

export const Loading = Template.bind({})
Loading.args = {
  featuredDaos: {
    loading: true,
  },
}
