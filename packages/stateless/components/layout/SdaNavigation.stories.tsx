import {
  AccountBalanceRounded,
  EscalatorWarningRounded,
  GavelRounded,
  PeopleAltRounded,
} from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { makeAppContextDecorator } from '@dao-dao/storybook/decorators'
import { DaoTabId, SdaNavigationProps } from '@dao-dao/types'

import { LinkWrapper } from '../LinkWrapper'
import { SdaNavigation } from './SdaNavigation'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / SdaNavigation',
  component: SdaNavigation,
  decorators: [makeAppContextDecorator(true)],
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof SdaNavigation>

const Template: ComponentStory<typeof SdaNavigation> = (args) => {
  const [compact, setCompact] = useState(false)

  return <SdaNavigation {...args} compact={compact} setCompact={setCompact} />
}

// Used in `makeSdaLayoutDecorator` to provide a default layout for the page
// stories. Ensure this has all props.
export const DefaultArgs: SdaNavigationProps = {
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
      id: DaoTabId.SubDaos,
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
