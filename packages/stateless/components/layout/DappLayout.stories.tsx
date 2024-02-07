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
  connect: () => alert('connect'),
  DockWallet,
  ButtonLink,
  children: (
    <div className="flex h-full flex-col px-6">
      <PageHeader {...(PageHeaderStory.args as PageHeaderProps)} />

      <div className="flex grow items-center justify-center">
        <p>App content</p>
      </div>
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
