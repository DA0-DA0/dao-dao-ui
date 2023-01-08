import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { SuspenseLoader } from '@dao-dao/stateful'
import {
  DaoPageWrapperDecorator,
  makeAppLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import { DaoMemberCardProps } from '@dao-dao/types'

import {
  DaoInfoBar,
  DaoInfoBarProps,
  LinkWrapper,
  MembersTabProps,
  NftCardProps,
  ProfileMemberCard,
  ProfileMemberCardProps,
  ProposalsTabProps,
  SubDaosTabProps,
  TokenCardProps,
  TreasuryAndNftsTabProps,
} from '../components'
import { Default as DaoInfoBarStory } from '../components/dao/DaoInfoBar.DaoInfoBar.stories'
import { Default as MembersTabStory } from '../components/dao/tabs/MembersTab.stories'
import { Default as ProposalsTabStory } from '../components/dao/tabs/ProposalsTab.stories'
import { Default as SubDaosTabStory } from '../components/dao/tabs/SubDaosTab.stories'
import { Default as TreasuryAndNftsTabStory } from '../components/dao/tabs/TreasuryAndNftsTab.stories'
import { Default as ProfileMemberCardStory } from '../components/profile/ProfileMemberCard.stories'
import { useDaoInfoContext } from '../hooks/useDaoInfoContext'
import { DaoHome } from './DaoHome'

export default {
  title: 'DAO DAO / packages / stateless / pages / DaoHome',
  component: DaoHome,
  decorators: [
    // Direct ancestor of rendered story.
    DaoPageWrapperDecorator,
    makeAppLayoutDecorator(),
  ],
} as ComponentMeta<typeof DaoHome>

const Template: ComponentStory<typeof DaoHome> = (args) => {
  const [pinned, setPinned] = useState(false)

  return (
    <DaoHome
      {...args}
      daoInfo={useDaoInfoContext()}
      onPin={() => setPinned((p) => !p)}
      pinned={pinned}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  daoInfoBar: <DaoInfoBar {...(DaoInfoBarStory.args as DaoInfoBarProps)} />,
  proposalsTab: (
    <ProposalsTabStory {...(ProposalsTabStory.args as ProposalsTabProps)} />
  ),
  treasuryAndNftsTab: (
    <TreasuryAndNftsTabStory
      {...(TreasuryAndNftsTabStory.args as TreasuryAndNftsTabProps<
        TokenCardProps,
        NftCardProps
      >)}
    />
  ),
  subDaosTab: (
    <SubDaosTabStory {...(SubDaosTabStory.args as SubDaosTabProps)} />
  ),
  membersTab: (
    <MembersTabStory
      {...(MembersTabStory.args as MembersTabProps<DaoMemberCardProps>)}
    />
  ),
  rightSidebarContent: (
    <ProfileMemberCard
      {...(ProfileMemberCardStory.args as ProfileMemberCardProps)}
    />
  ),
  SuspenseLoader,
  LinkWrapper,
  onConfigure: () => alert('configure'),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A28615',
  },
  nextRouter: {
    asPath: '/dao/core1',
  },
}
