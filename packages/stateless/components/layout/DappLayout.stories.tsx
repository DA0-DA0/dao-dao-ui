import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { DockWallet } from '@dao-dao/stateful'
import {
  DappLayoutProps,
  DappNavigationProps,
  PageHeaderProps,
} from '@dao-dao/types'

import { ButtonLink } from '../buttons'
import { DappLayout } from './DappLayout'
import { Default as DappNavigatonStory } from './DappNavigation.stories'
import { PageHeader } from './PageHeader'
import { Default as PageHeaderStory } from './PageHeader.stories'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / DappLayout',
  component: DappLayout,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof DappLayout>

export const DefaultArgs: DappLayoutProps = {
  navigationProps: DappNavigatonStory.args as DappNavigationProps,
  inboxCount: {
    loading: false,
    data: 5,
  },
  connect: () => alert('connect'),
  PageHeader: () => (
    <PageHeader {...(PageHeaderStory.args as PageHeaderProps)} />
  ),
  DockWallet,
  ButtonLink,
  children: (
    <div className="flex grow h-full px-6 items-center justify-center">
      <p>App content</p>
    </div>
  ),
}

const Template: ComponentStory<typeof DappLayout> = (args) => {
  const [compact, setCompact] = useState(false)

  return (
    <DappLayout
      {...args}
      navigationProps={{
        ...args.navigationProps,
        compact,
        setCompact,
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = DefaultArgs
