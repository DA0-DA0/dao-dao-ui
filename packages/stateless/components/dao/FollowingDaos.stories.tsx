import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { FeaturedDaos as FeaturedDaosScrollerStory } from '../HorizontalScroller.stories'
import { IconButtonLink } from '../icon_buttons'
import { LinkWrapper } from '../LinkWrapper'
import { DaoCard } from './DaoCard'
import { FollowingDaos } from './FollowingDaos'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / FollowingDaos',
  component: FollowingDaos,
} as ComponentMeta<typeof FollowingDaos>

const Template: ComponentStory<typeof FollowingDaos> = (args) => {
  const [following, setFollowing] = useState<string[]>([])

  return (
    <FollowingDaos
      {...args}
      DaoCard={(props) => (
        <DaoCard
          {...props}
          IconButtonLink={IconButtonLink}
          LinkWrapper={LinkWrapper}
          follow={{
            following: following.includes(props.coreAddress),
            updatingFollowing: false,
            onFollow: () =>
              setFollowing((current) =>
                current.includes(props.coreAddress)
                  ? current.filter((a) => a !== props.coreAddress)
                  : [...current, props.coreAddress]
              ),
          }}
        />
      )}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  followingDaos: {
    loading: false,
    data: FeaturedDaosScrollerStory.args!.items!,
  },
}
