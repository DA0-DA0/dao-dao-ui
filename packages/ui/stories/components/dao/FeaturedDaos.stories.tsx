import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { DaoCardInfo, FeaturedDaos } from 'components/dao'

export default {
  title: 'DAO DAO UI V2 / components / dao / FeaturedDaos',
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

const featuredDao: DaoCardInfo = {
  coreAddress: 'coreAddress',
  name: 'Modern DAO',
  description:
    'This approach allows us to implement a completely custom component design without writing a single line of custom CSS.',
  imageUrl: '/placeholders/1.svg',
  href: '/',
  established: new Date('May 14, 2022 00:00:00'),

  subDaoInfo: {
    parentDaoImageUrl: '/placeholders/2.svg',
    parentDaoHref: '/home',
  },

  tokenBalance: 120,
  tokenSymbol: 'JUNO',
  proposalCount: 25,
}

export const Default = Template.bind({})
// Clone object to prevent comparison issues in pages with sorting (like
// `HomeConnected`).
Default.args = {
  featuredDaos: [
    featuredDao,
    {
      ...featuredDao,
      name: 'DAO DAO',
      established: new Date('August 11, 2022 16:20:00'),
    },
    { ...featuredDao },
    {
      ...featuredDao,
      established: new Date(),
    },
    {
      ...featuredDao,
      name: 'A different DAO',
    },
    { ...featuredDao },
    { ...featuredDao },
    { ...featuredDao },
  ],
}
