import {
  AccountBalanceRounded,
  EscalatorWarningRounded,
  GavelRounded,
  PeopleAltRounded,
} from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { SuspenseLoader } from '@dao-dao/stateful'
import {
  DaoPageWrapperDecorator,
  makeDappLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import { DaoTabId, TokenCardProps } from '@dao-dao/types'

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
  TreasuryAndNftsTabProps,
} from '../components'
import { Default as DaoInfoBarStory } from '../components/dao/DaoInfoBar.DaoInfoBar.stories'
import { Default as MembersTabStory } from '../components/dao/tabs/MembersTab.stories'
import { Default as ProposalsTabStory } from '../components/dao/tabs/ProposalsTab.stories'
import { Default as SubDaosTabStory } from '../components/dao/tabs/SubDaosTab.stories'
import { Default as TreasuryAndNftsTabStory } from '../components/dao/tabs/TreasuryAndNftsTab.stories'
import { Default as ProfileMemberCardStory } from '../components/profile/ProfileMemberCard.stories'
import { useDaoInfoContext } from '../hooks/useDaoInfoContext'
import { DaoDappTabbedHome } from './DaoDappTabbedHome'

export default {
  title: 'DAO DAO / packages / stateless / pages / DaoDappTabbedHome',
  component: DaoDappTabbedHome,
  decorators: [
    // Direct ancestor of rendered story.
    DaoPageWrapperDecorator,
    makeDappLayoutDecorator(),
  ],
} as ComponentMeta<typeof DaoDappTabbedHome>

const Template: ComponentStory<typeof DaoDappTabbedHome> = (args) => {
  const [following, setFollowing] = useState(false)

  return (
    <DaoDappTabbedHome
      {...args}
      daoInfo={useDaoInfoContext()}
      follow={{
        following,
        onFollow: () => setFollowing((p) => !p),
        updatingFollowing: false,
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  DaoInfoBar: () => (
    <DaoInfoBar {...(DaoInfoBarStory.args as DaoInfoBarProps)} />
  ),
  tabs: [
    {
      id: DaoTabId.Proposals,
      label: 'Proposals',
      Component: () => (
        <ProposalsTabStory {...(ProposalsTabStory.args as ProposalsTabProps)} />
      ),
      Icon: GavelRounded,
    },
    {
      id: DaoTabId.Treasury,
      label: 'Treasury & NFTs',
      Component: () => (
        <TreasuryAndNftsTabStory
          {...(TreasuryAndNftsTabStory.args as TreasuryAndNftsTabProps<
            TokenCardProps,
            NftCardProps
          >)}
        />
      ),
      Icon: AccountBalanceRounded,
    },
    {
      id: DaoTabId.Subdaos,
      label: 'SubDAOs',
      Component: () => (
        <SubDaosTabStory {...(SubDaosTabStory.args as SubDaosTabProps)} />
      ),
      Icon: EscalatorWarningRounded,
    },
    {
      id: DaoTabId.Members,
      label: 'Members',
      Component: () => (
        <MembersTabStory {...(MembersTabStory.args as MembersTabProps)} />
      ),
      Icon: PeopleAltRounded,
    },
  ],
  rightSidebarContent: (
    <ProfileMemberCard
      {...(ProfileMemberCardStory.args as ProfileMemberCardProps)}
    />
  ),
  SuspenseLoader,
  LinkWrapper,
  follow: {
    following: false,
    onFollow: () => alert('follow'),
    updatingFollowing: false,
  },
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
