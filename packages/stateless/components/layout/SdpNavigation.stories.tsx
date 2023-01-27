import {
  AccountBalanceRounded,
  EscalatorWarningRounded,
  GavelRounded,
  PeopleAltRounded,
} from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { makeAppLayoutContextDecorator } from '@dao-dao/storybook/decorators'
import { DaoTabId, SdpNavigationProps } from '@dao-dao/types'

import { LinkWrapper } from '../LinkWrapper'
import { SdpNavigation } from './SdpNavigation'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / SdpNavigation',
  component: SdpNavigation,
  decorators: [makeAppLayoutContextDecorator(true)],
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof SdpNavigation>

const Template: ComponentStory<typeof SdpNavigation> = (args) => {
  const [compact, setCompact] = useState(false)

  return <SdpNavigation {...args} compact={compact} setCompact={setCompact} />
}

// Used in `makeSdpLayoutDecorator` to provide a default layout for the page
// stories. Ensure this has all props.
export const DefaultArgs: SdpNavigationProps = {
  tabs: [
    {
      id: DaoTabId.Proposals,
      label: 'Proposals',
      Icon: GavelRounded,
    },
    {
      id: DaoTabId.Treasury,
      label: 'Treasury & NFTs',
      Icon: AccountBalanceRounded,
    },
    {
      id: DaoTabId.Subdaos,
      label: 'SubDAOs',
      Icon: EscalatorWarningRounded,
    },
    {
      id: DaoTabId.Members,
      label: 'Members',
      Icon: PeopleAltRounded,
    },
  ],
  version: '2.0',
  compact: false,
  setCompact: (compact) => alert(`compact! ${compact}`),
  mountedInBrowser: true,
  LinkWrapper,
}

export const Default = Template.bind({})
Default.args = DefaultArgs
