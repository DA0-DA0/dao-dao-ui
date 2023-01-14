import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'

import { useDaoInfoContext } from '../../../hooks/useDaoInfoContext'
import { ButtonLink } from '../../buttons'
import { IconButtonLink } from '../../icon_buttons'
import { LinkWrapper } from '../../LinkWrapper'
import { DaoCard } from '../DaoCard'
import { makeProps as makeDaoCardProps } from '../DaoCard.stories'
import { SubDaosTab } from './SubDaosTab'

export default {
  title:
    'DAO DAO / packages / stateless / components / dao / tabs / SubDaosTab',
  component: SubDaosTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof SubDaosTab>

const Template: ComponentStory<typeof SubDaosTab> = (args) => {
  const [pinned, setPinned] = useState<string[]>([])

  return (
    <SubDaosTab
      {...args}
      DaoCard={(props) => (
        <DaoCard
          {...props}
          IconButtonLink={IconButtonLink}
          LinkWrapper={LinkWrapper}
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
      daoInfo={useDaoInfoContext()}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  isMember: true,
  subDaos: {
    loading: false,
    data: [
      {
        ...makeDaoCardProps(1),
        name: 'Development Fund',
        description: 'Manages our development and strategy.',
      },
      {
        ...makeDaoCardProps(2),
        name: 'Validator',
        description: 'Runs our validator.',
      },
      {
        ...makeDaoCardProps(3),
        name: 'Security',
        description: 'Protects us from those who seek to destroy us.',
      },
      {
        ...makeDaoCardProps(4),
        name: 'Meme Machine',
        description: 'Generates memeable content for the sake of the memes.',
      },
    ],
  },
  createSubDaoHref: '#',
  upgradeToV2Href: '#',
  ButtonLink,
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  subDaos: { loading: true },
}
